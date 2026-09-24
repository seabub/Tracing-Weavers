import { NextResponse } from "next/server";
import {
    AccountExistsError,
    accountStore,
    hashPassword,
    normaliseEmail,
    verifyPassword,
} from "@/lib/accounts";
import { clearSession, currentIdentity, setSession } from "@/lib/session";
import { signingConfigured } from "@/lib/passport";
import { allowRequest, guardRequest, tooMany } from "@/lib/request-guard";

/**
 * Accounts, in one route.
 *
 *   POST { action: "register", name, email, password, outlet? }
 *   POST { action: "login",    email, password }
 *   POST { action: "password", current, next }     needs a session
 *   POST { action: "email",    email, password }   needs a session
 *   DELETE                                          sign out
 *
 * One route rather than four files because every branch shares the same body
 * parsing, rate limiting and error shape — the parts that are easy to get
 * subtly different across copies.
 *
 * Passwords never leave this process: they arrive over TLS, get scrypt-hashed
 * here, and the plaintext is not logged, stored, or returned.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 200;
const MAX_NAME = 100;
const MAX_OUTLET = 100;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bad(error: string, status = 400) {
    return NextResponse.json(
        { error },
        { status, headers: { "Cache-Control": "no-store" } },
    );
}

function ok(payload: Record<string, unknown>) {
    return NextResponse.json(payload, {
        headers: { "Cache-Control": "no-store" },
    });
}

export async function POST(request: Request) {
    const guard = guardRequest(request);
    if (!guard.ok) return guard.response;

    if (!signingConfigured()) {
        return bad(
            "PASSPORT_SIGNING_SECRET is not set on this deployment, so a session cannot be signed. Add it in Vercel, then redeploy.",
            503,
        );
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const action = String(body.action ?? "").trim();

    /* A tighter bucket for the two actions that take a password, so guessing is
       not free. */
    const scope =
        action === "login" ? "login" : action === "password" ? "password" : "auth";
    const limit = action === "login" ? 10 : 20;
    if (!allowRequest(request, { limit, windowMs: 60_000, scope })) {
        return tooMany();
    }

    const email = normaliseEmail(String(body.email ?? ""));
    const password = String(body.password ?? "");
    const store = accountStore();

    /* ── register ───────────────────────────────────────────────────── */
    if (action === "register") {
        const name = String(body.name ?? "").trim();
        const outlet = String(body.outlet ?? "").trim();

        if (name.length < 2 || name.length > MAX_NAME) {
            return bad("A name is needed, between 2 and 100 characters.");
        }
        if (!EMAIL_RE.test(email) || email.length > 254) {
            return bad("That email address does not look right.");
        }
        if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
            return bad(`Use a password of at least ${MIN_PASSWORD} characters.`);
        }
        if (outlet.length > MAX_OUTLET) {
            return bad("The organisation name is too long.");
        }

        try {
            const account = await store.create({ name, email, password, outlet });
            await setSession({
                name: account.name,
                email: account.email,
                outlet: account.outlet,
            });
            return ok({ account });
        } catch (cause) {
            if (cause instanceof AccountExistsError) {
                return bad(
                    "An account already exists for that address. Sign in instead.",
                    409,
                );
            }
            console.error("[auth/register] failed:", (cause as Error)?.message ?? cause);
            return bad("The account could not be created because of a storage problem.", 500);
        }
    }

    /* ── login ──────────────────────────────────────────────────────── */
    if (action === "login") {
        if (!EMAIL_RE.test(email) || !password) {
            return bad("An email and a password are needed.");
        }

        const account = await store.get(email).catch(() => null);
        /* One message for both "no such account" and "wrong password": telling
           them apart turns this endpoint into a directory of who is a member. */
        const wrong = bad("That email and password do not match an account.", 401);

        if (!account) {
            /* Still spend the time, so timing does not reveal existence. */
            await verifyPassword(password, "scrypt$00$00");
            return wrong;
        }
        if (!(await verifyPassword(password, account.passwordHash))) return wrong;

        await setSession({
            name: account.name,
            email: account.email,
            outlet: account.outlet,
        });
        const { passwordHash: _ignored, ...safe } = account;
        return ok({ account: safe });
    }

    /* ── the two signed-in actions ──────────────────────────────────── */
    const identity = await currentIdentity();
    if (!identity) return bad("Sign in first.", 401);

    if (action === "password") {
        const current = String(body.current ?? "");
        const next = String(body.next ?? "");

        if (next.length < MIN_PASSWORD || next.length > MAX_PASSWORD) {
            return bad(`Use a password of at least ${MIN_PASSWORD} characters.`);
        }
        if (next === current) {
            return bad("The new password is the same as the current one.");
        }

        const account = await store.get(identity.email).catch(() => null);
        if (!account) return bad("That account no longer exists.", 404);
        if (!(await verifyPassword(current, account.passwordHash))) {
            return bad("The current password is not right.", 401);
        }

        await store.save({ ...account, passwordHash: await hashPassword(next) });
        return ok({ changed: "password" });
    }

    if (action === "email") {
        const next = normaliseEmail(String(body.email ?? ""));
        const current = String(body.password ?? "");

        if (!EMAIL_RE.test(next) || next.length > 254) {
            return bad("That email address does not look right.");
        }
        if (next === identity.email) {
            return bad("That is already your email address.");
        }

        const account = await store.get(identity.email).catch(() => null);
        if (!account) return bad("That account no longer exists.", 404);
        /* Changing the address that identifies the account is as sensitive as
           changing the password, so it asks for the password too. */
        if (!(await verifyPassword(current, account.passwordHash))) {
            return bad("Your password is needed to change the email address.", 401);
        }
        if (await store.get(next).catch(() => null)) {
            return bad("Another account already uses that address.", 409);
        }

        await store.remove(account.email);
        const moved = { ...account, email: next };
        await store.save(moved);
        await setSession({
            name: moved.name,
            email: moved.email,
            outlet: moved.outlet,
        });
        return ok({ changed: "email", email: next });
    }

    return bad(`Unknown action "${action}".`);
}

export async function DELETE() {
    await clearSession();
    return ok({ account: null });
}
