"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/copy";

type Mode = "login" | "register";

/**
 * Sign in, or make an account.
 *
 * One form with two modes rather than two pages: the fields only differ by
 * name and organisation, and a visitor who guessed the wrong mode should be
 * one click from the right one, not a page away. The password is the proof
 * that a certificate belongs to someone — which is why claiming now needs an
 * account at all.
 *
 * On success it goes to /traces: that is where the certificates are, and it is
 * the reason anyone signs in.
 */
export default function LoginForm({ next }: { next?: string }) {
    const router = useRouter();
    const [mode, setMode] = useState<Mode>("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [outlet, setOutlet] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    const target = next && next.startsWith("/") ? next : "/collection";

    async function submit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);
        setBusy(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    mode === "register"
                        ? { action: "register", name, email, password, outlet }
                        : { action: "login", email, password },
                ),
            });

            /* Read as text first, so a server message (a missing signing
               secret, a storage problem) reaches the screen. */
            const raw = await res.text();
            let body: { error?: string } = {};
            try {
                body = JSON.parse(raw) as typeof body;
            } catch {
                body = {};
            }

            if (!res.ok) {
                setError(body.error ?? `Could not sign in (HTTP ${res.status}).`);
                return;
            }

            router.push(target);
            router.refresh();
        } catch {
            setError(
                navigator.onLine
                    ? "The request did not reach the server. Try again in a moment."
                    : "This phone has no internet connection.",
            );
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
                <Field
                    label={t.claimName}
                    value={name}
                    onChange={setName}
                    placeholder="Dinny Jusuf"
                    autoComplete="name"
                    required
                />
            )}

            <Field
                label={t.claimEmail}
                value={email}
                onChange={setEmail}
                placeholder="name@example.org"
                type="email"
                autoComplete="email"
                required
            />

            <Field
                label="Password"
                value={password}
                onChange={setPassword}
                type="password"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                required
            />

            {mode === "register" && (
                <Field
                    label={t.claimOutlet}
                    value={outlet}
                    onChange={setOutlet}
                    placeholder="Foundation, studio, shop"
                    autoComplete="organization"
                />
            )}

            {error && (
                <p
                    role="alert"
                    className="rounded-md bg-bt-red/6 p-3 text-[15px] text-bt-red shadow-[0_0_0_1px_rgba(174,24,0,.28)]"
                >
                    {error}
                </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={busy}>
                {busy
                    ? mode === "register"
                        ? "Creating your account…"
                        : "Signing in…"
                    : mode === "register"
                      ? "Create account"
                      : t.signInButton}
            </Button>

            <p className="pt-1 text-[14px] text-muted-foreground">
                {mode === "register" ? (
                    <>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setMode("login");
                                setError(null);
                            }}
                            className="text-bt-red underline underline-offset-2 hover:text-bt-red-bright"
                        >
                            Sign in
                        </button>
                    </>
                ) : (
                    <>
                        No account yet?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setMode("register");
                                setError(null);
                            }}
                            className="text-bt-red underline underline-offset-2 hover:text-bt-red-bright"
                        >
                            Create one
                        </button>{" "}
                        — it takes a minute, and it is what a certificate is
                        kept under.
                    </>
                )}
            </p>
        </form>
    );
}

export function Field({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required,
    autoComplete,
    name,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    name?: string;
}) {
    return (
        <label className="block">
            <span className="label">{label}</span>
            <input
                type={type}
                name={name}
                required={required}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-md bg-white px-3 text-[15px] shadow-[var(--ring)] transition-shadow duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:shadow-[0_0_0_2px_var(--bt-red)]"
            />
        </label>
    );
}