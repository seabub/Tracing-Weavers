"use client";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "framer-motion";

/**
 * Thumb-reachable claim action for the surface that actually matters: an NFC
 * tap lands on a phone, one-handed, in the field. The bar exists only while the
 * visitor has something to claim, and it hands off to the real form rather than
 * duplicating it — no second submit path to keep in sync.
 */
export function ClaimBar({
    remaining,
    soldOut,
}: {
    remaining: number | null;
    soldOut: boolean;
}) {
    const reduce = useReducedMotion();

    return (
        <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/98 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden">
            <div className="mx-auto flex max-w-5xl items-center gap-4">
                <div className="min-w-0">
                    <div className="data text-muted-foreground">Tersisa</div>
                    <div className="num text-[19px] leading-tight">
                        {remaining === null ? "—" : Math.max(remaining, 0)}
                    </div>
                </div>
                <Button
                    size="lg"
                    className="flex-1"
                    disabled={soldOut}
                    onClick={() => {
                        const target = document.getElementById("claim");
                        if (!target) return;
                        target.scrollIntoView({
                            behavior: reduce ? "auto" : "smooth",
                            block: "start",
                        });
                        target
                            .querySelector<HTMLInputElement>("input")
                            ?.focus({ preventScroll: true });
                    }}
                >
                    {soldOut ? "Semua paspor terbit" : "Klaim jejak ini"}
                </Button>
            </div>
        </div>
    );
}