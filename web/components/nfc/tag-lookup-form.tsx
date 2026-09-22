"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/** Manual fallback when a phone refuses to read the tag (or the tag is gone):
 *  type the code printed next to it. */
export function TagLookupForm({ className }: { className?: string }) {
        const [code, setCode] = useState("");
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <form
            className={className}
            onSubmit={(e) => {
                e.preventDefault();
                const trimmed = code.trim();
                                if (!trimmed) return;
                startTransition(() =>
                    router.push(`/t/${encodeURIComponent(trimmed)}`),
                );
            }}
        >
            <label className="block">
                <span className="label">Tag code</span>
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="BT-0042"
                    autoComplete="off"
                    className="data mt-1.5 h-11 w-full rounded-md bg-white px-3 text-[15px] shadow-[var(--ring)] transition-shadow duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:shadow-[0_0_0_2px_var(--bt-red)]"
                />
            </label>
            <Button type="submit" size="lg" className="mt-4 w-full sm:w-auto" disabled={pending}>
                Open the record
            </Button>
        </form>
    );
}