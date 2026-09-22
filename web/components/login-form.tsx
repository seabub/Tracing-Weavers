"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/copy";

/** The whole sign-in: a name and an email. No password, no wallet. */
export default function LoginForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [outlet, setOutlet] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    async function submit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);
        setBusy(true);

        try {
            const res = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, outlet }),
            });
            const body = await res.json();

            if (!res.ok) {
                setError(body.error ?? "Tidak bisa masuk. Coba lagi.");
                return;
            }

            router.push("/collection");
            router.refresh();
        } catch {
            setError("Sambungan terputus. Coba lagi.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-5">
            <Field label={t.claimName} value={name} onChange={setName} placeholder="Dinny Jusuf" autoComplete="name" required />
            <Field label={t.claimEmail} value={email} onChange={setEmail} placeholder="nama@contoh.org" type="email" autoComplete="email" required />
            <Field label={t.claimOutlet} value={outlet} onChange={setOutlet} placeholder="Yayasan, studio, toko" autoComplete="organization" />

            {error && (
                <p className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={busy}>
                {busy ? "Membuka…" : t.signInButton}
            </Button>
        </form>
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