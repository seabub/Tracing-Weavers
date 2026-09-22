import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { Identity } from "@/lib/types";

/**
 * Identity without a wallet and without passwords.
 *
 * A holder gives a name + email at claim time (or at /login); the identity is
 * stored in a signed, httpOnly cookie and used to look up their passports.
 * It is deliberately the minimum needed to hand someone back their passport —
 * no password, no verification email, no third-party account. If you later
 * want real sign-in, replace this file with your auth provider: nothing else
 * in the app reads the cookie.
 */

const COOKIE = "dpp_session";

export type { Identity } from "@/lib/types";

function secret() {
    const value = process.env.PASSPORT_SIGNING_SECRET;
    if (!value) {
        if (process.env.NODE_ENV === "production") {
            throw new Error(
                "PASSPORT_SIGNING_SECRET is not set — sessions cannot be signed in production.",
            );
        }
        return "dev-only-insecure-secret-change-me";
    }
    return value;
}

function b64url(input: Buffer | string) {
    return Buffer.from(input)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function mac(payload: string) {
    return b64url(createHmac("sha256", secret()).update(`session:${payload}`).digest());
}

export function encodeIdentity(identity: Identity) {
    const payload = b64url(JSON.stringify(identity));
    return `${payload}.${mac(payload)}`;
}

export function decodeIdentity(token: string | undefined): Identity | null {
    if (!token) return null;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = mac(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    try {
        const parsed = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
        if (!parsed?.name || !parsed?.email) return null;
        return parsed as Identity;
    } catch {
        return null;
    }
}

export const sessionCookieName = COOKIE;

/** Read the signed-in identity (server components, route handlers). */
export async function currentIdentity(): Promise<Identity | null> {
    const jar = await cookies();
    return decodeIdentity(jar.get(COOKIE)?.value);
}