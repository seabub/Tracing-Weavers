"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { rememberLocalPassport } from "@/lib/local-passports";
import type { Passport } from "@/lib/types";

type ClaimResponse = {
    passport?: Passport;
    error?: string;
};

/* The claim form — the whole point of the product. No wallet, no signature
   prompt: a name and an email, then the server issues a signed passport. */
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
            setError("A name and an email are needed to put the passport in your name.");
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
                setError(body.error ?? "The passport could not be issued. Try again.");
                return;
            }

            rememberLocalPassport(body.passport);
            setIssued(body.passport);
        } catch {
            setError("The network dropped before the passport was issued.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_10px_rgba(32,30,29,.05)]">
                <div className="eyebrow">The passport</div>

                <div className="mt-4 space-y-3 text-sm">
                    <Row label="Record" value={code} />
                    <Row label="Issued from" value={supply > 1 ? `up to ${supply}` : "single item"} />
                    <Row
                        label="Still available"
                        value={remaining === null ? "—" : String(Math.max(remaining, 0))}
                    />
                    {tagCode && <Row label="Tag read" value={tagCode} />}
                </div>

                {issued ? (
                    <div className="mt-5 rounded-lg border border-success/40 bg-success/5 p-4">
                        <div className="text-[11px] uppercase tracking-[.2em] text-success">
                            Issued
                        </div>
                        <p className="display mt-2 text-lg">{issued.id}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Held by {issued.holder}. This passport is verifiable
                            at the link below, and it stays in your collection.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={submit} className="mt-5 space-y-4">
                        <Field
                            label="Full name"
                            value={name}
                            onChange={setName}
                            placeholder="Dinny Jusuf"
                            required
                        />
                        <Field
                            label="Email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="you@example.com"
                            required
                        />
                        <Field
                            label="Organisation · optional"
                            value={outlet}
                            onChange={setOutlet}
                            placeholder="Foundation, studio, store"
                        />

                        {error && (
                            <p className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={busy || soldOut}
                        >
                            {soldOut
                                ? "All passports issued"
                                : busy
                                  ? "Issuing your passport…"
                                  : "Claim this record"}
                        </Button>
                    </form>
                )}

                <div className="mt-5 flex flex-wrap gap-4">
                    {issued && (
                        <Link
                            href={`/verify/${issued.id}`}
                            className="text-[12px] uppercase tracking-[.18em]"
                        >
                            Verify this passport →
                        </Link>
                    )}
                    <Link
                        href={issued ? "/collection" : "/login"}
                        className="text-[12px] uppercase tracking-[.18em]"
                    >
                        {issued ? "My passports →" : "Already claimed? Sign in →"}
                    </Link>
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                    This is not ownership of the physical product, and not an
                    investment. The record travels with the product; the object
                    and its design stay with the maker.
                </p>
            </div>

            <AnimatePresence>
                {issued && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-float,0_18px_44px_rgba(32,30,29,.18))]"
                        >
                            <div className="eyebrow">Claimed</div>
                            <h3 className="display mt-3 text-2xl">
                                {title.split(" · ")[0]}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                is now on the passport of{" "}
                                <span className="font-medium text-foreground">{name}</span>.
                            </p>
                            <p className="display mt-4 text-base">{issued.id}</p>
                            <div className="mt-5 grid gap-2">
                                <Link href={`/verify/${issued.id}`}>
                                    <Button className="w-full">See the passport</Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setIssued(null)}
                                >
                                    Stay on this record
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
        <div className="flex justify-between gap-4 border-t border-border pt-2.5">
            <span className="text-muted-foreground">{label}</span>
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
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
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
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-white px-3 text-base outline-none transition-colors focus:border-bt-red"
            />
        </label>
    );
}