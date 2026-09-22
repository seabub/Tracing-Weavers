"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tabs with a seamless colour transition.
 *
 * Two copies of the tab list are stacked: the base one at rest, and an overlay
 * copy already styled as active. The overlay is clipped to the width of the
 * active tab and the clip animates, so the highlight moves across the row as
 * one surface instead of three colour transitions racing each other.
 *
 * Keyboard operation is the full tab pattern, not a row of buttons that happen
 * to look like tabs: one Tab stop for the row, Arrow keys to move between tabs,
 * Home/End for the ends, and the panel is wired to its tab with id +
 * aria-labelledby. Before this, all three were separate Tab stops and the arrow
 * keys did nothing.
 */
export function ClothTabs({
    items,
    className,
}: {
    items: { id: string; label: string; gloss?: string; body: React.ReactNode }[];
    className?: string;
}) {
    const [index, setIndex] = useState(0);
    const reduce = useReducedMotion();
    const base = useId();
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const n = items.length;

    const tabId = (i: number) => `${base}-tab-${items[i].id}`;
    const panelId = (i: number) => `${base}-panel-${items[i].id}`;

    function move(to: number) {
        const next = (to + n) % n;
        setIndex(next);
        tabs.current[next]?.focus();
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                event.preventDefault();
                move(index + 1);
                break;
            case "ArrowLeft":
            case "ArrowUp":
                event.preventDefault();
                move(index - 1);
                break;
            case "Home":
                event.preventDefault();
                move(0);
                break;
            case "End":
                event.preventDefault();
                move(n - 1);
                break;
            default:
                break;
        }
    }

    const left = (index * 100) / n;
    const right = 100 - ((index + 1) * 100) / n;

    return (
        <div className={className}>
            <div
                role="tablist"
                onKeyDown={onKeyDown}
                className="relative rounded-md bg-card p-1 shadow-[var(--ring)]"
            >
                <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                    {items.map((item, i) => (
                        <button
                            key={item.id}
                            ref={(el) => {
                                tabs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={tabId(i)}
                            aria-controls={panelId(i)}
                            aria-selected={i === index}
                            tabIndex={i === index ? 0 : -1}
                            onClick={() => setIndex(i)}
                            className="pressable relative z-10 h-10 rounded-sm text-[14px] uppercase tracking-[.12em] text-ink-2 hover:text-ink"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-1 grid"
                    style={{
                        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                        clipPath: `inset(0 ${right}% 0 ${left}%)`,
                        transition: reduce
                            ? "none"
                            : "clip-path var(--dur-base) var(--ease-out)",
                    }}
                >
                    {items.map((item) => (
                        <span
                            key={item.id}
                            className="flex h-10 items-center justify-center rounded-sm bg-ink text-[14px] uppercase tracking-[.12em] text-white"
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>

            <motion.div
                key={items[index].id}
                id={panelId(index)}
                aria-labelledby={tabId(index)}
                tabIndex={0}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="mt-5"
                role="tabpanel"
            >
                {items[index].gloss && (
                    <div lang="id" className="label text-bt-red">
                        {items[index].gloss}
                    </div>
                )}
                <div className={cn("mt-2 text-[17px] leading-relaxed text-muted-foreground")}>
                    {items[index].body}
                </div>
            </motion.div>
        </div>
    );
}