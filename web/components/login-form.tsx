"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
                setError(body.error ?? "Could not sign you in.");
                return;
            }

            router.push("/collection");
            router.refresh();
        } catch {
            setError("The network dropped. Try again.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <label className="block">
                <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                    Full name
                </span>
                <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dinny Jusuf"
                    className="mt-2 h-11 w-full rounded-lg border border-border bg-white px-3 text-base outline-none transition-colors focus:border-bt-red"
                />
            </label>

            <label className="block">
                <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                    Email
                </span>
                <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 h-11 w-full rounded-lg border border-border bg-white px-3 text-base outline-none transition-colors focus:border-bt-red"
                />
            </label>

            <label className="block">
                <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                    Organisation · optional
                </span>
                <input
                    value={outlet}
                    onChange={(e) => setOutlet(e.target.value)}
                    placeholder="Foundation, studio, store"
                    className="mt-2 h-11 w-full rounded-lg border border-border bg-white px-3 text-base outline-none transition-colors focus:border-bt-red"
                />
            </label>

            {error && (
                <p className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                </p>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Opening…" : "Open my passports"}
            </Button>
        </form>
    );
}