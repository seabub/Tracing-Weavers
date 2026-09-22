import { promises as fs } from "node:fs";
import path from "node:path";
import type { Identity, Passport, PassportPayload } from "@/lib/types";

/**
 * Where issued passports live.
 *
 *   file (default)  data/passports.json — zero setup for local dev and for a
 *                   self-hosted box. NOT usable on Vercel: its filesystem is
 *                   read-only apart from /tmp.
 *   kv              Redis over REST — the Upstash integration from Vercel's
 *                   Marketplace (Storage → Upstash). No SDK, plain fetch, so
 *                   nothing extra to install. Set PASSPORT_STORE=kv and let the
 *                   integration inject the url + token.
 *
 * Postgres (Neon, Supabase, Prisma Postgres, Nile, Turso) is not wired up: the
 * storage interface below is the seam. A passport is one append-only table —
 *
 *   create table passports (
 *     id text primary key, code text not null, holder text not null,
 *     email text, outlet text, issued_at timestamptz not null,
 *     serial int not null, status text not null default 'issued', tags text[]
 *   );
 *
 * — and the five methods below become SQL. Nothing outside this file changes.
 */

export type { Passport, Identity } from "@/lib/types";

export interface PassportStore {
    backend: "file" | "kv";
    issuableCount(code: string): Promise<number>;
    listByHolder(email: string): Promise<Passport[]>;
    listByRecord(code: string): Promise<Passport[]>;
    all(): Promise<Passport[]>;
    get(id: string): Promise<Passport | null>;
    save(passport: Passport): Promise<void>;
}

/* ───────────────────────── file backend ───────────────────────── */

const FILE = path.join(process.cwd(), "data", "passports.json");

type FileShape = { _comment?: string; passports: Passport[] };

async function readFileStore(): Promise<FileShape> {
    try {
        const raw = await fs.readFile(FILE, "utf8");
        const parsed = JSON.parse(raw) as FileShape;
        return { ...parsed, passports: parsed.passports ?? [] };
    } catch {
        return { passports: [] };
    }
}

async function writeFileStore(data: FileShape) {
    try {
        await fs.mkdir(path.dirname(FILE), { recursive: true });
        await fs.writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    } catch (cause) {
        const detail = (cause as Error)?.message ?? "unknown error";
        throw new Error(
            process.env.VERCEL
                ? "The passport store is set to `file`, which cannot be written on a deployment (Vercel's filesystem is read-only). Connect Upstash from Vercel → Storage → Marketplace, then set PASSPORT_STORE=kv and redeploy."
                : `Could not write ${FILE}: ${detail}. Locally that usually means the directory is not writable, or PASSPORT_STORE points at kv without the Redis env vars.`,
        );
    }
}

const fileStore: PassportStore = {
    backend: "file",
    async issuableCount(code) {
        const { passports } = await readFileStore();
        return passports.filter((p) => p.code === code && p.status === "issued").length;
    },
    async listByHolder(email) {
        const { passports } = await readFileStore();
        const wanted = email.trim().toLowerCase();
        return passports.filter(
            (p) =>
                (p.email ?? "").trim().toLowerCase() === wanted ||
                (!p.email && p.holder.trim().toLowerCase() === wanted),
        );
    },
    async listByRecord(code) {
        const { passports } = await readFileStore();
        return passports.filter((p) => p.code === code);
    },
    async all() {
        return (await readFileStore()).passports;
    },
    async get(id) {
        const { passports } = await readFileStore();
        return passports.find((p) => p.id === id) ?? null;
    },
    async save(passport) {
        const data = await readFileStore();
        data.passports = [
            ...data.passports.filter((p) => p.id !== passport.id),
            passport,
        ];
        await writeFileStore(data);
    },
};

/* ─────────────────────────── kv backend ─────────────────────────── */

/* Vercel's KV product is served by Upstash now, and the Marketplace install
   injects whatever the "Custom Prefix" field said. Accept every name it
   plausibly produces — it is the same REST endpoint either way, and no SDK is
   needed: KV_REST_API_* (the KV-era names), UPSTASH_REDIS_REST_* (Upstash's
   own), and STORAGE_* (what the prefix field defaults to). */
function kvConfig() {
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
            "PASSPORT_STORE=kv is set, but no Redis REST url/token was found. Install Upstash from Vercel → Storage → Marketplace and connect it to this project, then redeploy. It injects either KV_REST_API_URL / KV_REST_API_TOKEN, UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, or <prefix>_URL / <prefix>_TOKEN depending on the prefix you typed in the connect dialog.",
        );
    }
    return { url, token };
}

async function kvCommand<T>(command: (string | number)[]): Promise<T> {
    const { url, token } = kvConfig();
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

    const body = (await res.json()) as { result: T };
    return body.result;
}

const PASSPORT_KEY = (id: string) => `dpp:passport:${id}`;
const RECORD_SET = (code: string) => `dpp:record:${code}`;
const HOLDER_SET = (email: string) => `dpp:holder:${email.trim().toLowerCase()}`;

const kvStore: PassportStore = {
    backend: "kv",
    async issuableCount(code) {
        return Number(await kvCommand<number>(["SCARD", RECORD_SET(code)])) || 0;
    },
    async listByHolder(email) {
        return readIds(await kvCommand<string[]>(["SMEMBERS", HOLDER_SET(email)]));
    },
    async listByRecord(code) {
        return readIds(await kvCommand<string[]>(["SMEMBERS", RECORD_SET(code)]));
    },
    async all() {
        const ids = await kvCommand<string[]>(["KEYS", "dpp:passport:*"]);
        return readIds((ids ?? []).map((k) => k.replace("dpp:passport:", "")));
    },
    async get(id) {
        const raw = await kvCommand<string | null>(["GET", PASSPORT_KEY(id)]);
        return raw ? (JSON.parse(raw) as Passport) : null;
    },
    async save(passport) {
        await kvCommand(["SET", PASSPORT_KEY(passport.id), JSON.stringify(passport)]);
        await kvCommand(["SADD", RECORD_SET(passport.code), passport.id]);
        const holderKey = passport.email ?? passport.holder;
        if (holderKey) {
            await kvCommand(["SADD", HOLDER_SET(holderKey), passport.id]);
        }
    },
};

async function readIds(ids: string[] | null): Promise<Passport[]> {
    if (!ids?.length) return [];
    const many = await Promise.all(ids.map((id) => kvStore.get(id)));
    return many.filter((p): p is Passport => Boolean(p));
}

/* ──────────────────────────── selector ──────────────────────────── */

export function passportStore(): PassportStore {
    return process.env.PASSPORT_STORE === "kv" ? kvStore : fileStore;
}