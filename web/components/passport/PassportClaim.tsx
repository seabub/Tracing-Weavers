"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
    const reduce = useReducedMotion();

    const soldOut = remaining !== null && remaining <= 0;

    async function submit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        if (!name.trim() || !email.trim()) {
            setError("Nama dan email diperlukan untuk menerbitkan paspor.");
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
                        body.error ?? `Paspor gagal diterbitkan (HTTP ${res.status}).`,
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
                    ? "Permintaan tidak sampai ke server. Coba lagi; kalau tetap gagal, buka /api/health di deployment ini."
                    : "Ponsel sedang tanpa sambungan internet.",
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
                    <Row label="Jejak" value={code} mono />
                    <Row
                        label="Kuota"
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
                        <p className="mt-2 text-[15px] text-muted-foreground">
                            {t.claimedNote}
                        </p>
                    </div>
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
                            placeholder="nama@contoh.org"
                            autoComplete="email"
                            required
                        />
                        <Field
                            label={t.claimOutlet}
                            value={outlet}
                            onChange={setOutlet}
                            placeholder="Yayasan, studio, toko"
                            autoComplete="organization"
                        />

                        {error && (
                            <p className="rounded-md bg-destructive/8 p-3 text-[15px] text-destructive shadow-[0_0_0_1px_rgba(236,48,19,.25)]">
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

            <AnimatePresence>
                {issued && (
                    <motion.div
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.16 } }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
                        onClick={() => setIssued(null)}
                    >
                        <motion.div
                            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.98,
                                transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
                            }}
                            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full max-w-sm rounded-xl bg-card p-6 text-center"
                            style={{ boxShadow: "var(--shadow-float)" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="eyebrow">{t.claimedEyebrow}</div>
                            <h3 className="mt-3 text-[26px]">{title.split(" · ")[0]}</h3>
                            <p className="mt-2 text-[15px] text-muted-foreground">
                                tersimpan di paspor{" "}
                                <span className="text-ink">{name}</span>.
                            </p>
                            <p className="data mt-4 text-[15px] text-ink">{issued.id}</p>
                            <div className="mt-5 grid gap-2">
                                <Link href={`/verify/${issued.id}`}>
                                    <Button className="w-full">{t.viewPassport}</Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => setIssued(null)}
                                >
                                    {t.stayHere}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
                className="mt-1.5 h-11 w-full rounded-md bg-white px-3 text-[17px] outline-none shadow-[var(--ring)] transition-shadow duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus:shadow-[0_0_0_1px_var(--bt-red)]"
            />
        </label>
    );
}