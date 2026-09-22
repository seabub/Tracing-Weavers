import { getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { passportId, passportToken, signingConfigured } from "@/lib/passport";
import { holdPassports, setSession } from "@/lib/session";
import type { Passport, PassportPayload } from "@/lib/types";

/**
 * Issuing a passport — the one write in the app.
 *
 * Order of checks: signing must be possible; the record must exist; name and
 * email must be sane and bounded (an unbounded name let a 5 MB value be written
 * into the store); then the store reserves the serial atomically, which is
 * where supply and per-holder limits are actually enforced. Two holders racing
 * for the last slot can no longer both win.
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

/* Every field that reaches the store has a ceiling. */
const LIMIT = { name: 100, email: 254, outlet: 100, tag: 32 };

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
                "The passport cannot be issued yet: PASSPORT_SIGNING_SECRET is not set on this deployment. Add that variable in Vercel (value: the output of `openssl rand -hex 32`), then redeploy.",
        };
    }

    const record = getRecord(input.code ?? "");
    if (!record) {
        return { ok: false, status: 404, error: "That record does not exist." };
    }

    const name = (input.name ?? "").trim();
    const email = (input.email ?? "").trim().toLowerCase();
    const outlet = input.outlet?.trim() || undefined;
    const tag = input.tag?.trim().toUpperCase() || undefined;

    if (name.length < 2 || name.length > LIMIT.name) {
        return {
            ok: false,
            status: 400,
            error: "A name is needed, between 2 and 100 characters.",
        };
    }
    if (!EMAIL.test(email) || email.length > LIMIT.email) {
        return { ok: false, status: 400, error: "That email address does not look right." };
    }
    if (outlet && outlet.length > LIMIT.outlet) {
        return { ok: false, status: 400, error: "The organisation name is too long." };
    }
    if (tag && tag.length > LIMIT.tag) {
        return { ok: false, status: 400, error: "The tag code is too long." };
    }

    const outcome = await passportStore().issue(
        {
            code: record.code,
            holder: name,
            email,
            outlet,
            issuedAt: new Date().toISOString(),
            tags: tag ? [tag] : undefined,
            supply: record.supply,
            perHolder: record.perHolder ?? 1,
        },
        (serial) => passportId(record.code, serial),
    );

    if (!outcome.ok) {
        return {
            ok: false,
            status: 409,
            error:
                outcome.reason === "one_per_holder"
                    ? "You already hold the passport for this cloth. Open your collection to see it."
                    : record.supply === 1
                      ? "This record has been claimed. There is only one passport for the cloth."
                      : "All passports for this record have been issued.",
        };
    }

    const passport = outcome.passport;
    const payload: PassportPayload = {
        id: passport.id,
        code: passport.code,
        holder: passport.holder,
        email: passport.email,
        outlet: passport.outlet,
        issuedAt: passport.issuedAt,
        serial: passport.serial,
    };

    /* The holder keeps it: the session for the greeting, the held cookie for the
       listing. Nothing here grants access to anybody else's passports. */
    await setSession({ name, email, outlet: passport.outlet });
    await holdPassports([passport.id]);

    return { ok: true, passport, token: passportToken(payload) };
}