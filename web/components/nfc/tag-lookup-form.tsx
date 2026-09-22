"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/** Manual fallback when a phone refuses to read the tag (or the tag is gone):
 *  type the code printed next to it. */
export function TagLookupForm({ className }: { className?: string }) {
    const [code, setCode] = useState("");
    const router = useRouter();

    return (
        <form
            className={className}
            onSubmit={(e) => {
                e.preventDefault();
                const trimmed = code.trim();
                if (!trimmed) return;
                router.push(`/t/${encodeURIComponent(trimmed)}`);
            }}
        >
            <label className="block">
                <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                    Tag code
                </span>
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="BT-0042"
                    className="mt-2 h-11 w-full rounded-lg border border-border bg-white px-3 text-base tracking-[.06em] outline-none transition-colors focus:border-bt-red"
                />
            </label>
            <Button type="submit" className="mt-5 w-full sm:w-auto">
                Open the record
            </Button>
        </form>
    );
}