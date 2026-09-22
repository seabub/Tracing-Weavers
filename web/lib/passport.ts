import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { PassportPayload } from "@/lib/types";

/**
 * A passport is the thing a holder receives when they claim a record:
 *
 *   DPP-0042-7K2Q      readable id      (DPP · record code · 4-char check)
 *   <token>            signed proof     (HMAC over the id + payload)
 *
 * The token makes a passport verifiable without a database: /verify/<id>
 * looks the id up in the store, and if the store has nothing (or is not
 * configured) it can still check the signature the holder presents.
 * Server-only: uses node:crypto.
 */

const SECRET =
    process.env.PASSPORT_SIGNING_SECRET ??
    (process.env.NODE_ENV === "production"
        ? ""
        : "dev-only-insecure-secret-change-me");

export function signingConfigured() {
    return Boolean(SECRET);
}

function secret() {
    if (!SECRET) {
        throw new Error(
            "PASSPORT_SIGNING_SECRET is not set — passports cannot be signed in production.",
        );
    }
    return SECRET;
}

export type { PassportPayload } from "@/lib/types";

function b64url(input: Buffer | string) {
    return Buffer.from(input)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function sign(data: string) {
    return b64url(createHmac("sha256", secret()).update(data).digest());
}

export function passportId(code: string, serial: number) {
    const stem = code.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    /* 6 random bytes (48 bits), not 3: /verify/<id> is public and the rest of an
       id is guessable (record code + serial), so the random tail is the only
       thing standing between an id and an enumeration script. */
    const check = b64url(randomBytes(6)).slice(0, 8).toUpperCase();
    return `DPP-${stem}-${String(serial).padStart(4, "0")}-${check}`;
}

export function passportToken(payload: PassportPayload) {
    const body = b64url(JSON.stringify(payload));
    return `${body}.${sign(body)}`;
}

export function readPassportToken(token: string): PassportPayload | null {
    /* Without a key we cannot verify a signature, and that is not an error: the
       verification page simply falls back to the store. Throwing here used to
       500 /verify/<id>?t=… on a deployment whose secret was missing. */
    if (!SECRET) return null;

    const [body, mac] = token.split(".");
    if (!body || !mac) return null;

    const expected = sign(body);
    const a = Buffer.from(mac);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    try {
        return JSON.parse(Buffer.from(body, "base64").toString("utf8"));
    } catch {
        return null;
    }
}