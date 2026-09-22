"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type BookLeaf = { id: string; label: string; content: ReactNode };

/**
 * The passport as a small book you turn.
 *
 * One leaf per tag that was claimed, so the book is as long as the holder's
 * collection: the cover, then a page per passport. The turn is a 3D rotation
 * about the left edge (the spine), 720ms on the app's ease-out curve, and the
 * leaf that has been turned is clipped away — so the next page is what you see
 * underneath, the way a real page turn works.
 *
 * Everything works without the animation: the buttons, the arrow keys and a
 * swipe all move the same index, and `prefers-reduced-motion` swaps instantly.
 */
export function PassportBook({
    leaves,
    className,
}: {
    leaves: BookLeaf[];
    className?: string;
}) {
    const [page, setPage] = useState(0);
    const reduce = useReducedMotion();
    const touch = useRef<{ x: number; y: number } | null>(null);
    const last = leaves.length - 1;

    const go = useCallback(
        (delta: number) => setPage((p) => Math.min(Math.max(p + delta, 0), last)),
        [last],
    );

    useEffect(() => {
        function onKey(event: KeyboardEvent) {
            if (event.key === "ArrowRight") go(1);
            if (event.key === "ArrowLeft") go(-1);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

        const leafCount = Math.max(last, 0);
    const atStart = page === 0;
    const atEnd = page === last;

    return (
        <div className={className}>
            <div
                className="relative [perspective:1800px]"
                onPointerDown={(e) => {
                    touch.current = { x: e.clientX, y: e.clientY };
                }}
                onPointerUp={(e) => {
                    const start = touch.current;
                    touch.current = null;
                    if (!start) return;
                    const dx = e.clientX - start.x;
                    if (Math.abs(dx) < 44) return;
                    go(dx < 0 ? 1 : -1);
                }}
            >
                {/* the leaves */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    {leaves.map((leaf, i) => {
                        const turned = i < page;
                        return (
                            <motion.div
                                key={leaf.id}
                                aria-hidden={i !== page}
                                initial={false}
                                animate={{ rotateY: turned ? -180 : 0 }}
                                transition={
                                    reduce
                                        ? { duration: 0 }
                                        : { duration: 0.72, ease: [0.23, 1, 0.32, 1] }
                                }
                                style={{
                                    transformOrigin: "left center",
                                    transformStyle: "preserve-3d",
                                    zIndex: turned ? i : leaves.length - i,
                                    pointerEvents: i === page ? "auto" : "none",
                                }}
                                className="absolute inset-0"
                            >
                                {leaf.content}
                            </motion.div>
                        );
                    })}

                    {/* the spine: a hairline, plus the shadow the page leaves behind */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-ink/25"
                    />
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink/22 to-transparent"
                        initial={false}
                        animate={{ opacity: page > 0 ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                {/* the edge of the pages still to come */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 rounded-lg bg-card shadow-[var(--ring)]" />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    onClick={() => go(-1)}
                    disabled={atStart}
                    aria-label="Previous page"
                >
                    ← Back
                </Button>

                                <p
                    aria-live="polite"
                    className="data text-center text-[13px] text-muted-foreground"
                >
                    {page === 0
                        ? `Cover · ${leafCount} ${leafCount === 1 ? "leaf" : "leaves"}`
                        : `${leaves[page].label} · ${page} / ${leafCount}`}
                </p>

                                <Button onClick={() => go(1)} disabled={atEnd} aria-label="Next page">
                    Turn →
                </Button>
            </div>

            <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
                {leaves.map((leaf, i) => (
                    <button
                        key={leaf.id}
                        type="button"
                        tabIndex={-1}
                        onClick={() => setPage(i)}
                        className={`h-1.5 w-6 rounded-full transition-colors duration-200 ${
                            i === page ? "bg-bt-red" : "bg-stone"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}