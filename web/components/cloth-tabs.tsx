"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Tabs with a seamless colour transition.
 *
 * Two copies of the tab list are stacked: the base one in the resting style,
 * and an overlay copy already styled as active. The overlay is clipped to the
 * width of the active tab and the clip animates on change, so the colour moves
 * across the row as one surface instead of four separate colour transitions
 * racing each other. 200ms, custom ease-out, interruptible because it is a
 * transition rather than a keyframe.
 */
export function ClothTabs({
    items,
    className,
}: {
    items: { id: string; label: string; gloss?: string; body: React.ReactNode }[];
    className?: string;
}) {
    const [index, setIndex] = useState(0);
    const n = items.length;

    const left = (index * 100) / n;
    const right = 100 - ((index + 1) * 100) / n;

    return (
        <div className={className}>
            <div className="relative rounded-lg border border-border bg-white p-1">
                <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
                >
                    {items.map((item, i) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-pressed={i === index}
                            className="pressable relative z-10 h-10 rounded-md text-[12px] uppercase tracking-[.16em] text-ink-2"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-1 grid transition-[clip-path] duration-[200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                        clipPath: `inset(0 ${right}% 0 ${left}%)`,
                    }}
                >
                    {items.map((item) => (
                        <span
                            key={item.id}
                            className="flex h-10 items-center justify-center rounded-md bg-bt-red text-[12px] uppercase tracking-[.16em] text-white"
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>

            <div key={items[index].id} className="mt-6 rise" style={{ ["--i" as string]: "0" }}>
                {items[index].gloss && (
                    <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                        {items[index].gloss}
                    </div>
                )}
                <div className={cn("mt-3 text-base leading-relaxed text-muted-foreground")}>
                    {items[index].body}
                </div>
            </div>
        </div>
    );
}