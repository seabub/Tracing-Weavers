"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { rememberLocalPassport } from "@/lib/local-passports";
import { t } from "@/lib/copy";
import type { Passport } from "@/lib/types";

type ClaimResponse = { passport?: Passport; error?: string };

/* The claim form. No wallet, no signature prompt: a name and an email, then the
   server issues a signed passport. The dialog enters in 240ms from scale .96
   and leaves in 160ms — exits are always faster than entries, and nothing ever
   appears from scale(0). */
export function PassportClaim({
    code,
    title,
    supply,
    remaining,
    identity,
    tagCode,
}: {
    code: string;
    title: string;
    supply: number;
    remaining: number | null;
    identity: { name: string; email: string; outlet?: string } | null;
    tagCode?: string;
}) {
    const [name, setName] = useState(identity?.name ?? "");
    const [email, setEmail] = useState(identity?.email ?? "");
    const [outlet, setOutlet] = useState(identity?.outlet ?? "");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [issued, setIssued] = useState<Passport | null>(null);
    

    const soldOut = remaining !== null && remaining <= 0;

    async function submit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        if (!name.trim() || !email.trim()) {
            setError("A name and an email are needed to issue the passport.");
            return;
        }

        setBusy(true);
        try {
            const res = await fetch("/api/claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, name, email, outlet, tag: tagCode }),
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
                        body.error ?? `The passport could not be issued (HTTP ${res.status}).`,
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
                <p className="mt-2 text-[16px] text-muted-foreground">{t.claimLead}</p>

                <dl className="mt-5">
                    <Row label="Record" value={code} mono />
                    <Row label="Supply"
                        value={
                            supply > 1
                                ? t.supplyShared.replace("{n}", String(supply))
                                : t.supplyUnique
                        }
                    />
                    <Row
                        label={t.remaining}
                        value={remaining === null ? "—" : String(Math.max(remaining, 0))}
                    />
                    {tagCode && <Row label={t.tagRead} value={tagCode} mono />}
                </dl>

                {issued ? (
                    <div className="mt-5 rounded-md bg-success/8 p-4 shadow-[0_0_0_1px_rgba(62,107,46,.25)]">
                        <div className="text-[11px] uppercase tracking-[.2em] text-success">
                            {t.claimedEyebrow}
                        </div>
                                                <p className="data mt-2 text-[15px] text-ink">{issued.id}</p>
                        <Link
                            href={`/verify/${issued.id}`}
                            className="mt-3 inline-block min-h-6 py-1 text-[14px] font-medium text-ink hover:text-bt-red"
                        >
                            {t.viewPassport} →
                        </Link>
                        <p className="mt-2 text-[15px] text-muted-foreground">
                            {t.claimedNote}
                        </p>
                    </div>
                                ) : soldOut ? (
                    <p className="mt-6 rounded-md bg-card p-4 text-[16px] text-muted-foreground shadow-[var(--ring)]">
                        {t.claimSoldOut}. {t.claimOnePerCloth}.
                    </p>
                ) : (
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <Field
                            label={t.claimName}
                            value={name}
                            onChange={setName}
                            placeholder="Dinny Jusuf"
                            autoComplete="name"
                            required
                        />
                        <Field
                            label={t.claimEmail}
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="name@example.org"
                            autoComplete="email"
                            required
                        />
                        <Field
                            label={t.claimOutlet}
                            value={outlet}
                            onChange={setOutlet}
                            placeholder="Foundation, studio, shop"
                            autoComplete="organization"
                        />

                        {error && (
                            <p role="alert"
                                className="rounded-md bg-bt-red/6 p-3 text-[15px] text-bt-red shadow-[0_0_0_1px_rgba(174,24,0,.28)]">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={busy || soldOut}
                        >
                            {soldOut ? t.claimSoldOut : busy ? t.claimBusy : t.claimButton}
                        </Button>
                    </form>
                )}

                <p className="mt-5 border-t border-border pt-4 text-[14px] leading-relaxed text-muted-foreground">
                    {t.claimFine}
                </p>
            </section>

        </>
    );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5">
            <dt className="label">{label}</dt>
            <dd className={mono ? "data text-ink" : "num text-[17px]"}>{value}</dd>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required,
    autoComplete,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
}) {
    return (
        <label className="block">
            <span className="label">{label}</span>
            <input
                type={type}
                required={required}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-md bg-white px-3 text-[17px] shadow-[var(--ring)] transition-shadow duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:shadow-[0_0_0_2px_var(--bt-red)]"
            />
        </label>
    );
}