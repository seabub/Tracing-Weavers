import { cookies } from "next/headers";
import { getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { passportId, passportToken, signingConfigured } from "@/lib/passport";
import { encodeIdentity, sessionCookieName } from "@/lib/session";
import type { Passport } from "@/lib/types";

/**
 * Issuing a passport — the one write in the app.
 *
 * Rules, in order: the record must exist; a name and an email are required;
 * the record's supply must not be exhausted; one person cannot take more than
 * the record allows. The serial is the position within the supply, so the
 * first holder of a single-item record is always serial 1 of 1.
 */

export type IssueInput = {
    code: string;
    name: string;
    email: string;
    outlet?: string;
    tag?: string;
};

export type IssueResult =
    | { ok: true; passport: Passport; token: string }
    | { ok: false; status: number; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function issuePassport(input: IssueInput): Promise<IssueResult> {
    /* Pre-flight: signing is what makes the passport and the session cookie
       meaningful. Without the secret we must fail BEFORE writing, otherwise a
       holder ends up with a passport in the store, an error on screen, and no
       way to tell what happened. */
    if (!signingConfigured()) {
        return {
            ok: false,
            status: 503,
            error:
                "Paspor belum bisa diterbitkan: PASSPORT_SIGNING_SECRET belum diset di deployment ini. Tambahkan variabel itu di Vercel (nilai: hasil `openssl rand -hex 32`), lalu redeploy.",
        };
    }

    const record = getRecord(input.code ?? "");
    if (!record) {
        return { ok: false, status: 404, error: "That record does not exist." };
    }

    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();

    if (!name || name.length < 2) {
        return { ok: false, status: 400, error: "A name is needed to put the passport in your name." };
    }
    if (!email || !EMAIL.test(email)) {
        return { ok: false, status: 400, error: "A valid email address is needed." };
    }

    const store = passportStore();

    const issued = await store.issuableCount(record.code);
    if (issued >= record.supply) {
        return {
            ok: false,
            status: 409,
            error:
                record.supply === 1
                    ? "This record has already been claimed — it belongs to one product."
                    : "All passports for this record have been issued.",
        };
    }

    const perHolder = record.perHolder ?? 1;
    const mine = (await store.listByHolder(email)).filter(
        (p) => p.code === record.code && p.status === "issued",
    );
    if (mine.length >= perHolder) {
        return {
            ok: false,
            status: 409,
            error: "You already hold this passport. Open your collection to see it.",
        };
    }

    const serial = issued + 1;
    const payload = {
        id: passportId(record.code, serial),
        code: record.code,
        holder: name,
        email,
        outlet: input.outlet?.trim() || undefined,
        issuedAt: new Date().toISOString(),
        serial,
    };

    const passport: Passport = {
        ...payload,
        status: "issued",
        tags: input.tag ? [input.tag.toUpperCase()] : undefined,
    };

    await store.save(passport);

    // Signing the holder in means the passport is waiting for them next visit.
    const jar = await cookies();
    jar.set(sessionCookieName, encodeIdentity({ name, email, outlet: passport.outlet }), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
    });

    return { ok: true, passport, token: passportToken(payload) };
}