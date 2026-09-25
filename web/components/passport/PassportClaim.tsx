"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { rememberLocalPassport } from "@/lib/local-passports";
import { ClaimNotice } from "@/components/passport/claim-notice";
import { PassportLeaf } from "@/components/passport/passport-leaf";
import { getRecord } from "@/lib/records";
import { t } from "@/lib/copy";
import type { Passport } from "@/lib/types";

type ClaimResponse = { passport?: Passport; error?: string };

/**
 * Claiming a certificate.
 *
 * An account is required, and the name and email come from the session — the
 * form no longer asks for them. That is the point: a certificate saying
 * "issued to X" has to be issued to someone who can be proved, or it is a
 * label anyone could print. So a signed-out visitor gets one button that goes
 * to sign-in and comes straight back here.
 */
export function PassportClaim({
    code,
    title,
    supply,
    remaining,
    identity,
}: {
    code: string;
    title: string;
    supply: number;
    remaining: number | null;
    identity: { name: string; email: string; outlet?: string } | null;
}) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [issued, setIssued] = useState<Passport | null>(null);
    const [showNotice, setShowNotice] = useState(false);

    const soldOut = remaining !== null && remaining <= 0;
    const clothName = title.split(" · ")[0];

    /* The count on screen has to move the moment the claim lands: leaving
       "still available 1" next to a certificate just issued is a lie the
       holder can see. */
    const available =
        remaining === null
            ? null
            : Math.max(remaining - (issued ? 1 : 0), 0);

    async function claim() {
        setError(null);
        setBusy(true);
        try {
            const res = await fetch("/api/claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            /* Read as text first: an error page (HTML) must not turn into a
               vague "connection dropped", which hides what to fix. */
            const raw = await res.text();
            let body: ClaimResponse & { detail?: string; hint?: string } = {};
            try {
                body = JSON.parse(raw) as typeof body;
            } catch {
                body = {};
            }

            if (!res.ok || !body.passport) {
                setError(
                    [
                        body.error ?? `The certificate could not be issued (HTTP ${res.status}).`,
                        body.detail,
                        body.hint,
                    ]
                        .filter(Boolean)
                        .join(" "),
                );
                return;
            }

            rememberLocalPassport(body.passport);
            setIssued(body.passport);
            setShowNotice(true);
        } catch {
            setError(
                navigator.onLine
                    ? "The request did not reach the server. Try again; if it keeps failing, open /api/health on this deployment."
                    : "This phone has no internet connection.",
            );
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <section
                id="claim"
                className="scroll-mt-24 rounded-lg bg-card p-6 shadow-[var(--ring)]"
            >
                <div className="eyebrow">{t.claimEyebrow}</div>
                <h2 className="mt-3 text-[22px]">{t.claimTitle}</h2>
                {/* The lead is the one line that differs by state: telling a
                    signed-in holder to sign in reads as a bug. */}
                <p className="mt-2 text-[15px] text-muted-foreground">
                    {!identity
                        ? t.claimLead
                        : issued
                          ? "Issued to you, and kept under your account."
                          : "It will be issued to you and kept under your account."}
                </p>

                <dl className="mt-5">
                    <Row label="Record" value={code} mono />
                    {/* A one-of-one cloth already reads "the only one" in the
                        caption above, so supply and remaining would both be
                        restating it. They only carry information when there is
                        more than one to go round. */}
                    {supply > 1 && !issued && (
                        <Row
                            label="Supply"
                            value={t.supplyShared.replace("{n}", String(supply))}
                        />
                    )}
                    {supply > 1 && (
                        <Row
                            label={t.remaining}
                            value={available === null ? "—" : String(available)}
                        />
                    )}
                    {identity && (
                        <Row label="Kept under" value={identity.email} />
                    )}
                </dl>

                {issued ? (
                    /* The certificate itself, here, the moment it is issued —
                       claiming and then being handed a bare id made the
                       holder go and look for what they had just got. */
                    <div className="mt-5">
                        <div className="rounded-md bg-success/8 p-4 shadow-[0_0_0_1px_rgba(62,107,46,.25)]">
                            <div className="text-[11px] tracking-[.2em] uppercase text-success">
                                {t.claimedEyebrow}
                            </div>
                            <p className="mt-1.5 text-[15px] text-ink">
                                This certificate is yours, kept under your account.
                            </p>
                        </div>

                        <div className="mt-4">
                            <PassportLeaf
                                passport={issued}
                                record={getRecord(issued.code)}
                            />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                            <Link
                                href="/collection"
                                className="min-h-6 py-1 text-[14px] font-medium text-ink hover:text-bt-red"
                            >
                                See it in your traces →
                            </Link>
                            <Link
                                href={`/verify/${issued.id}`}
                                className="min-h-6 py-1 text-[14px] text-muted-foreground hover:text-ink"
                            >
                                Check the certificate →
                            </Link>
                        </div>

                        <p className="mt-2 text-[15px] text-muted-foreground">
                            {t.claimedNote}
                        </p>
                    </div>
                ) : soldOut ? (
                    <p className="mt-6 rounded-md bg-card p-4 text-[15px] text-muted-foreground shadow-[var(--ring)]">
                        {t.claimSoldOut}. {t.claimOnePerCloth}.
                    </p>
                ) : identity ? (
                    <div className="mt-6">
                        {error && (
                            <p
                                role="alert"
                                className="mb-4 rounded-md bg-bt-red/6 p-3 text-[15px] text-bt-red shadow-[0_0_0_1px_rgba(174,24,0,.28)]"
                            >
                                {error}
                            </p>
                        )}
                        <Button
                            size="lg"
                            className="w-full"
                            disabled={busy}
                            onClick={claim}
                        >
                            {busy ? t.claimBusy : t.claimButton}
                        </Button>
                        <p className="mt-3 text-[14px] text-muted-foreground">
                            Issued to{" "}
                            <span className="text-ink">{identity.name}</span>. Change
                            that from your{" "}
                            <Link
                                href="/profile"
                                className="underline underline-offset-2"
                            >
                                profile
                            </Link>
                            .
                        </p>
                    </div>
                ) : (
                    <div className="mt-6">
                        <Link
                            href={`/login?next=${encodeURIComponent(`/record/${encodeURIComponent(code)}`)}`}
                            className="block"
                        >
                            <Button size="lg" className="w-full">
                                Sign in to claim
                            </Button>
                        </Link>
                        <p className="mt-3 text-[14px] text-muted-foreground">
                            No account yet? The same page makes one — an email and
                            a password, nothing else.
                        </p>
                    </div>
                )}

                <p className="mt-5 border-t border-border pt-4 text-[14px] leading-relaxed text-muted-foreground">
                    {t.claimFine}
                </p>
            </section>

            {showNotice && issued && (
                <ClaimNotice
                    passportId={issued.id}
                    clothName={clothName}
                    onClose={() => setShowNotice(false)}
                />
            )}
        </>
    );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5">
            <dt className="label">{label}</dt>
            <dd className={mono ? "num text-[15px] text-ink" : "num text-[15px]"}>{value}</dd>
        </div>
    );
}