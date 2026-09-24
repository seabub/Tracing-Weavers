"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/login-form";

type State = { error?: string; done?: string };

/**
 * The two things an account lets you change: the password, and the email
 * address it is kept under.
 *
 * Both ask for the current password. Changing the address that identifies the
 * account is exactly as sensitive as changing the password — without that
 * check, anyone who walked up to an unlocked laptop could move a certificate
 * to their own address and keep it.
 */
export function ProfileForms({ email }: { email: string }) {
    const router = useRouter();

    const [currentPw, setCurrentPw] = useState("");
    const [nextPw, setNextPw] = useState("");
    const [pwState, setPwState] = useState<State>({});
    const [pwBusy, setPwBusy] = useState(false);

    const [newEmail, setNewEmail] = useState("");
    const [emailPw, setEmailPw] = useState("");
    const [emailState, setEmailState] = useState<State>({});
    const [emailBusy, setEmailBusy] = useState(false);

    async function post(payload: Record<string, string>): Promise<State> {
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const raw = await res.text();
        try {
            const body = JSON.parse(raw) as { error?: string; changed?: string; email?: string };
            if (!res.ok) return { error: body.error ?? `Failed (HTTP ${res.status}).` };
            return {
                done:
                    body.changed === "password"
                        ? "Password changed."
                        : `Email address changed to ${body.email}.`,
            };
        } catch {
            return { error: `Failed (HTTP ${res.status}).` };
        }
    }

    async function changePassword(event: React.FormEvent) {
        event.preventDefault();
        setPwState({});
        setPwBusy(true);
        try {
            const result = await post({ action: "password", current: currentPw, next: nextPw });
            setPwState(result);
            if (result.done) {
                setCurrentPw("");
                setNextPw("");
            }
        } catch {
            setPwState({
                error: navigator.onLine
                    ? "The request did not reach the server."
                    : "This device has no internet connection.",
            });
        } finally {
            setPwBusy(false);
        }
    }

    async function changeEmail(event: React.FormEvent) {
        event.preventDefault();
        setEmailState({});
        setEmailBusy(true);
        try {
            const result = await post({ action: "email", email: newEmail, password: emailPw });
            setEmailState(result);
            if (result.done) {
                setNewEmail("");
                setEmailPw("");
                router.refresh();
            }
        } catch {
            setEmailState({
                error: navigator.onLine
                    ? "The request did not reach the server."
                    : "This device has no internet connection.",
            });
        } finally {
            setEmailBusy(false);
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* ── password ── */}
            <section className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                <div className="eyebrow">Password</div>
                <p className="mt-2 text-[15px] text-muted-foreground">
                    The password that protects your certificates.
                </p>

                <form onSubmit={changePassword} className="mt-5 space-y-4">
                    <Field
                        label="Current password"
                        value={currentPw}
                        onChange={setCurrentPw}
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <Field
                        label="New password"
                        value={nextPw}
                        onChange={setNextPw}
                        type="password"
                        autoComplete="new-password"
                        required
                    />

                    <Notice state={pwState} />

                    <Button type="submit" disabled={pwBusy} className="w-full">
                        {pwBusy ? "Changing…" : "Change password"}
                    </Button>
                </form>
            </section>

            {/* ── email ── */}
            <section className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                <div className="eyebrow">Email address</div>
                <p className="mt-2 text-[15px] text-muted-foreground">
                    Currently <span className="text-ink">{email}</span>. This is
                    what your certificates are kept under.
                </p>

                <form onSubmit={changeEmail} className="mt-5 space-y-4">
                    <Field
                        label="New email address"
                        value={newEmail}
                        onChange={setNewEmail}
                        type="email"
                        placeholder="name@example.org"
                        autoComplete="email"
                        required
                    />
                    <Field
                        label="Your password"
                        value={emailPw}
                        onChange={setEmailPw}
                        type="password"
                        autoComplete="current-password"
                        required
                    />

                    <Notice state={emailState} />

                    <Button type="submit" disabled={emailBusy} className="w-full">
                        {emailBusy ? "Changing…" : "Change email address"}
                    </Button>
                </form>
            </section>
        </div>
    );
}

function Notice({ state }: { state: State }) {
    if (!state.error && !state.done) return null;
    return (
        <p
            role={state.error ? "alert" : "status"}
            className={
                state.error
                    ? "rounded-md bg-bt-red/6 p-3 text-[15px] text-bt-red shadow-[0_0_0_1px_rgba(174,24,0,.28)]"
                    : "rounded-md bg-success/8 p-3 text-[15px] text-success shadow-[0_0_0_1px_rgba(62,107,46,.25)]"
            }
        >
            {state.error ?? state.done}
        </p>
    );
}