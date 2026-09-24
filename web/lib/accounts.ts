import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

/**
 * Accounts — the thing that was missing.
 *
 * The first version had no accounts at all: a name and an email typed into a
 * form, stored in a cookie, proving nothing. That is fine for reading a record
 * (public, any visitor) but wrong the moment claiming means "this certificate
 * is mine": the certificate has to belong to something that can be proved.
 *
 * So an account is name + email + a password hash. The password is the proof.
 * Exactly like the passport store, there are two backends behind one interface:
 *
 *   file (default)  data/accounts.json — local dev and self-hosted
 *   kv              Redis over REST — the only one that works on Vercel, and
 *                   the one that is correct under concurrent writes
 *
 * The hash is scrypt (node:crypto, no dependency), stored as
 * `scrypt$<salt-hex>$<hash-hex>`. Verification is timing-safe.
 */

export type Account = {
    name: string;
    /** lower-cased; the key */
    email: string;
    outlet?: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;
};

/** What the outside world may see — never the hash. */
export type PublicAccount = Omit<Account, "passwordHash">;

export interface AccountStore {
    backend: "file" | "kv";
    get(email: string): Promise<Account | null>;
    /** Fails when the email is taken. */
    create(input: {
        name: string;
        email: string;
        password: string;
        outlet?: string;
    }): Promise<PublicAccount>;
    /** Replaces the stored account. Used by email change and password change. */
    save(account: Account): Promise<void>;
    remove(email: string): Promise<void>;
    count(): Promise<number>;
}

const SCRYPT_KEYLEN = 64;
const scryptAsync = promisify(scrypt) as (
    password: string,
    salt: Buffer,
    keylen: number,
) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16);
    const derived = await scryptAsync(password, salt, SCRYPT_KEYLEN);
    return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export async function verifyPassword(
    password: string,
    stored: string,
): Promise<boolean> {
    const [scheme, saltHex, hashHex] = stored.split("$");
    if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
    try {
        const derived = await scryptAsync(
            password,
            Buffer.from(saltHex, "hex"),
            SCRYPT_KEYLEN,
        );
        const expected = Buffer.from(hashHex, "hex");
        if (expected.length !== derived.length) return false;
        return timingSafeEqual(expected, derived);
    } catch {
        return false;
    }
}

export const normaliseEmail = (email: string) => email.trim().toLowerCase();

function publicView(account: Account): PublicAccount {
    const { passwordHash: _ignored, ...rest } = account;
    return rest;
}

/* ───────────────────────── file backend ───────────────────────── */

const FILE = path.join(process.cwd(), "data", "accounts.json");

type FileShape = { _comment?: string; accounts: Account[] };

async function readFileStore(): Promise<FileShape> {
    try {
        const raw = await fs.readFile(FILE, "utf8");
        const parsed = JSON.parse(raw) as FileShape;
        return { ...parsed, accounts: parsed.accounts ?? [] };
    } catch (cause) {
        if ((cause as NodeJS.ErrnoException)?.code === "ENOENT") {
            return { accounts: [] };
        }
        throw new Error(
            `The account store at ${FILE} could not be read: ${(cause as Error)?.message}`,
        );
    }
}

async function writeFileStore(data: FileShape) {
    const tmp = `${FILE}.tmp`;
    try {
        await fs.mkdir(path.dirname(FILE), { recursive: true });
        await fs.writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
        await fs.rename(tmp, FILE);
    } catch (cause) {
        await fs.rm(tmp, { force: true }).catch(() => {});
        throw new Error(
            process.env.VERCEL
                ? "The account store is set to `file`, which cannot be written on a deployment. Use the kv backend (PASSPORT_STORE=kv)."
                : `Could not write ${FILE}: ${(cause as Error)?.message}`,
        );
    }
}

let fileLock: Promise<unknown> = Promise.resolve();
function withFileLock<T>(work: () => Promise<T>): Promise<T> {
    const run = fileLock.then(work, work);
    fileLock = run.then(
        () => undefined,
        () => undefined,
    );
    return run;
}

const fileStore: AccountStore = {
    backend: "file",
    async get(email) {
        const wanted = normaliseEmail(email);
        const { accounts } = await readFileStore();
        return accounts.find((a) => a.email === wanted) ?? null;
    },
    async create({ name, email, password, outlet }) {
        return withFileLock(async () => {
            const data = await readFileStore();
            const wanted = normaliseEmail(email);
            if (data.accounts.some((a) => a.email === wanted)) {
                throw new AccountExistsError();
            }
            const now = new Date().toISOString();
            const account: Account = {
                name: name.trim(),
                email: wanted,
                outlet: outlet?.trim() || undefined,
                passwordHash: await hashPassword(password),
                createdAt: now,
                updatedAt: now,
            };
            data.accounts = [...data.accounts, account];
            await writeFileStore(data);
            return publicView(account);
        });
    },
    async save(account) {
        await withFileLock(async () => {
            const data = await readFileStore();
            const wanted = normaliseEmail(account.email);
            const next = { ...account, email: wanted, updatedAt: new Date().toISOString() };
            const index = data.accounts.findIndex((a) => a.email === wanted);
            if (index === -1) data.accounts = [...data.accounts, next];
            else data.accounts[index] = next;
            await writeFileStore(data);
        });
    },
    async remove(email) {
        await withFileLock(async () => {
            const data = await readFileStore();
            const wanted = normaliseEmail(email);
            data.accounts = data.accounts.filter((a) => a.email !== wanted);
            await writeFileStore(data);
        });
    },
    async count() {
        return (await readFileStore()).accounts.length;
    },
};

/* ─────────────────────────── kv backend ─────────────────────────── */

const ACCOUNT_KEY = (email: string) => `dpp:account:${normaliseEmail(email)}`;
/* an index of emails, so "how many accounts" never needs KEYS */
const ACCOUNT_INDEX = "dpp:accounts";

async function kvCommand<T>(command: (string | number)[]): Promise<T> {
    const url = (
        process.env.KV_REST_API_URL ??
        process.env.UPSTASH_REDIS_REST_URL ??
        process.env.STORAGE_URL ??
        ""
    ).replace(/\/$/, "");
    const token =
        process.env.KV_REST_API_TOKEN ??
        process.env.UPSTASH_REDIS_REST_TOKEN ??
        process.env.STORAGE_TOKEN;

    if (!url || !token) {
        throw new Error(
            "The account store needs the Redis REST url/token. Install Upstash from Vercel → Storage → Marketplace and connect it, then redeploy.",
        );
    }

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`KV command failed (${res.status}): ${await res.text()}`);
    }
    return ((await res.json()) as { result: T }).result;
}

const kvStore: AccountStore = {
    backend: "kv",
    async get(email) {
        const raw = await kvCommand<string | null>(["GET", ACCOUNT_KEY(email)]);
        return raw ? (JSON.parse(raw) as Account) : null;
    },
    async create({ name, email, password, outlet }) {
        const wanted = normaliseEmail(email);
        const now = new Date().toISOString();
        const account: Account = {
            name: name.trim(),
            email: wanted,
            outlet: outlet?.trim() || undefined,
            passwordHash: await hashPassword(password),
            createdAt: now,
            updatedAt: now,
        };
        /* SET NX decides uniqueness atomically: two parallel registrations for
           the same address cannot both win. */
        const created = await kvCommand<string | null>([
            "SET",
            ACCOUNT_KEY(wanted),
            JSON.stringify(account),
            "NX",
        ]);
        if (created === null) throw new AccountExistsError();
        await kvCommand(["SADD", ACCOUNT_INDEX, wanted]);
        return publicView(account);
    },
    async save(account) {
        const wanted = normaliseEmail(account.email);
        const next = { ...account, email: wanted, updatedAt: new Date().toISOString() };
        await kvCommand(["SET", ACCOUNT_KEY(wanted), JSON.stringify(next)]);
        await kvCommand(["SADD", ACCOUNT_INDEX, wanted]);
    },
    async remove(email) {
        const wanted = normaliseEmail(email);
        await kvCommand(["DEL", ACCOUNT_KEY(wanted)]);
        await kvCommand(["SREM", ACCOUNT_INDEX, wanted]);
    },
    async count() {
        return Number(await kvCommand<number>(["SCARD", ACCOUNT_INDEX])) || 0;
    },
};

/* ──────────────────────────── selector ──────────────────────────── */

export class AccountExistsError extends Error {
    constructor() {
        super("An account already exists for that email address.");
        this.name = "AccountExistsError";
    }
}

export function accountStore(): AccountStore {
    return process.env.PASSPORT_STORE === "kv" ? kvStore : fileStore;
}