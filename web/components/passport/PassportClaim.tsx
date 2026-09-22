"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { rememberLocalPassport } from "@/lib/local-passports";
import { t } from "@/lib/copy";
import type { Passport } from "@/lib/types";

type ClaimResponse = { passport?: Passport; error?: string };

/* The claim form — the whole point of the product. No wallet, no signature
   prompt: a name and an email, then the server issues a signed passport.
   The dialog enters in 240ms and leaves in 160ms (exits are always faster),
   scales from 0.96 rather than 0, and stays centred because a modal has no
   trigger to grow out of. */
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
            const body = (await res.json()) as ClaimResponse;

            if (!res.ok || !body.passport) {
                setError(body.error ?? "Paspor gagal diterbitkan. Coba lagi.");
                return;
            }

            rememberLocalPassport(body.passport);
            setIssued(body.passport);
        } catch {
            setError("Sambungan terputus sebelum paspor terbit.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="cloth rounded-xl border border-border bg-card p-6 shadow-[0_2px_10px_rgba(32,30,29,.05)]">
                <div className="eyebrow">{t.claimEyebrow}</div>

                <div className="mt-4 space-y-0 text-sm">
                    <Row label="Jejak" value={code} />
                    <Row
                        label="Kuota"
                        value={supply > 1 ? t.supplyShared.replace("{n}", String(supply)) : t.supplyUnique}
                    />
                    <Row
                        label={t.remaining}
                        value={remaining === null ? "—" : String(Math.max(remaining, 0))}
                    />
                    {tagCode && <Row label={t.tagRead} value={tagCode} />}
                </div>

                {issued ? (
                    <div className="mt-6 rounded-lg border border-success/40 bg-success/5 p-4">
                        <div className="text-[11px] uppercase tracking-[.2em] text-success">
                            {t.claimedEyebrow}
                        </div>
                        <p className="display mt-2 text-lg">{issued.id}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {t.claimedNote}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={submit} className="mt-6 space-y-5">
                        <p className="text-[15px] leading-relaxed text-muted-foreground">
                            {t.claimLead}
                        </p>

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
                            <p className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
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

                <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                    {t.claimFine}
                </p>
            </div>

            <AnimatePresence>
                {issued && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.16 } }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
                        onClick={() => setIssued(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.98,
                                transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
                            }}
                            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center"
                            style={{ boxShadow: "var(--shadow-float)" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="eyebrow">{t.claimedEyebrow}</div>
                            <h3 className="display mt-3 text-2xl">
                                {title.split(" · ")[0]}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                kini tersimpan di paspor{" "}
                                <span className="font-medium text-foreground">{name}</span>.
                            </p>
                            <p className="display mt-4 text-base">{issued.id}</p>
                            <div className="mt-5 grid gap-2">
                                <Link href={`/verify/${issued.id}`}>
                                    <Button className="w-full">{t.viewPassport}</Button>
                                </Link>
                                <Button
                                    variant="outline"
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

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 first:border-t-0">
            <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                {label}
            </span>
            <span className="font-medium">{value}</span>
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
            <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                {label}
            </span>
            <input
                type={type}
                required={required}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-white px-3 text-base outline-none transition-colors duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-bt-red"
            />
        </label>
    );
}