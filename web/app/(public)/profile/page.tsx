import Link from "next/link";
import { currentIdentity, heldIds } from "@/lib/session";
import { passportStore } from "@/lib/store";
import { t } from "@/lib/copy";
import { brand } from "@/lib/brand";
import { PassportLeaf } from "@/components/passport/passport-leaf";
import { records } from "@/lib/records";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "My profile" };

/**
 * A profile — the simplest possible digital wallet.
 *
 * No sign-up, no password, no crypto: the email you claimed with IS your
 * wallet.  Every passport issued to that email appears here, and the ids
 * this browser has proved it holds (via the signed hold cookie) are
 * listed alongside — so a passport claimed on another device shows up as
 * soon as you open its verification link and save it.
 */
export default async function ProfilePage() {
    const [identity, ids] = await Promise.all([currentIdentity(), heldIds()]);
    const store = passportStore();

    // Server-issued passports for this email
    const serverIssued = identity
        ? await store.listByHolder(identity.email).catch(() => [] as Passport[])
        : [];

    // Passports held on this device (verified via hold cookie)
    const held = (
        await Promise.all(ids.map((id) => store.get(id).catch(() => null)))
    ).filter((p): p is Passport => Boolean(p));

    // Merge: dedupe by id
    const all = new Map<string, Passport>();
    for (const p of [...serverIssued, ...held]) all.set(p.id, p);
    const passports = [...all.values()].sort(
        (a, b) => (a.issuedAt < b.issuedAt ? 1 : -1),
    );

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <header className="border-b border-border pb-5">
                <div className="eyebrow">My profile</div>
                <h1 className="mt-3">
                    {identity ? identity.name || identity.email : "Your digital wallet"}
                </h1>
                {identity ? (
                    <p className="mt-2 text-[16px] text-muted-foreground">
                        {identity.email} ·{" "}
                        {passports.length === 0
                            ? "No traces yet"
                            : `${passports.length} trace${passports.length === 1 ? "" : "s"} held`}
                    </p>
                ) : (
                    <p className="mt-2 max-w-[48ch] text-[16px] text-muted-foreground">
                        Sign in with the email you claimed with, and every
                        passport issued to it appears here — no password, no
                        wallet, just your name.
                    </p>
                )}
            </header>

            {!identity ? (
                <div className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <div className="eyebrow">{t.signInEyebrow}</div>
                    <p className="mt-3 text-[17px] text-muted-foreground">
                        {t.signInLead}
                    </p>
                    <Link href="/login" className="mt-5 inline-block">
                        <span className="pressable inline-flex h-11 items-center justify-center rounded-md bg-bt-red px-5 text-base font-medium text-white hover:bg-bt-red-bright">
                            {t.signInButton}
                        </span>
                    </Link>
                </div>
            ) : passports.length === 0 ? (
                <div className="rounded-lg px-6 py-14 text-center shadow-[var(--ring)]">
                    <p className="display text-2xl">No traces yet</p>
                    <p className="mx-auto mt-3 max-w-[46ch] text-[17px] text-muted-foreground">
                        Claim a record and your passport appears here — one
                        page per weave, bound as a book you can open anywhere.
                    </p>
                    <Link
                        href="/"
                        className="mt-5 inline-block text-[14px] text-muted-foreground hover:text-ink"
                    >
                        Browse the collection →
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {passports.map((passport) => {
                        const record = records.find(
                            (r) => r.code === passport.code,
                        );
                        return (
                            <PassportLeaf
                                key={passport.id}
                                passport={passport}
                                record={record}
                            />
                        );
                    })}
                </div>
            )}

            {identity && (
                <div className="rounded-lg bg-card p-5 shadow-[var(--ring)]">
                    <div className="eyebrow">About your wallet</div>
                    <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground">
                        This is not a crypto wallet. Your email is your
                        identity — every passport issued to it is yours.
                        Passports claimed on another device appear here once
                        you open the verification link and save them to this
                        device. The record travels with the cloth, including
                        when it changes hands.
                    </p>
                    <p className="mt-3 text-[12px] uppercase tracking-[.12em] text-muted-foreground">
                        &copy; {brand} &middot; All rights reserved &middot;
                        Confidential
                    </p>
                </div>
            )}
        </div>
    );
}