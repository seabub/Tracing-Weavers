"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import RecordCard from "@/components/records/RecordCard";
import { attr, type ProductRecord } from "@/lib/records";

/**
 * The catalogue, two shapes in one component.
 *
 * On a phone it is a rail: the records lie side by side and you drag through
 * them, one snap per card, so four records cost one screen instead of four.
 * From `sm` up the same records lay out as the grid they always were — there is
 * room, so nothing is hidden behind a gesture.
 *
 * Above them, the districts as filters (the marketplace's "Filterable
 * Gallery"): tapping one keeps the cards that come from it and animates the
 * rest out, and the count next to the heading follows the filter, because a
 * filter that leaves a stale number behind is worse than no filter.
 */
export function RecordGallery({
    records,
    className,
}: {
    records: ProductRecord[];
    className?: string;
}) {
    const reduce = useReducedMotion();
    const [place, setPlace] = useState<string>("All");
    const rail = useRef<HTMLDivElement | null>(null);

    const places = useMemo(() => {
        const found = new Set<string>();
        for (const record of records) {
            const origin = attr(record, "Origin");
            if (origin) found.add(String(origin));
        }
        return ["All", ...[...found].sort()];
    }, [records]);

    const shown = useMemo(
        () =>
            place === "All"
                ? records
                : records.filter((r) => String(attr(r, "Origin") ?? "") === place),
        [records, place],
    );

    if (!records.length) {
        return (
            <div className="rounded-lg px-6 py-16 text-center shadow-[var(--ring)]">
                <p className="display text-2xl">No records yet</p>
                <p className="mx-auto mt-3 max-w-[46ch] text-[17px] text-muted-foreground">
                    Records appear as soon as the first cloth is registered, from
                    Adonara, Lembata and Manggarai.
                </p>
            </div>
        );
    }

    return (
        <div className={className}>
            {places.length > 2 && (
                <div
                    role="group"
                    aria-label="Filter by district"
                    className="-mx-4 mb-5 flex gap-1.5 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
                >
                    {places.map((name) => {
                        const on = name === place;
                        return (
                            <button
                                key={name}
                                type="button"
                                aria-pressed={on}
                                onClick={() => {
                                    setPlace(name);
                                    rail.current?.scrollTo({ left: 0, behavior: "smooth" });
                                }}
                                className="pressable relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] tracking-[.1em] uppercase"
                            >
                                {on && (
                                    <motion.span
                                        layoutId="record-filter-pill"
                                        aria-hidden
                                        className="absolute inset-0 rounded-full bg-ink"
                                        transition={
                                            reduce
                                                ? { duration: 0 }
                                                : {
                                                      type: "spring",
                                                      duration: 0.34,
                                                      bounce: 0.18,
                                                  }
                                        }
                                    />
                                )}
                                <span
                                    className={`relative ${
                                        on ? "text-white" : "text-ink-2 hover:text-ink"
                                    }`}
                                >
                                    {name}
                                    {name !== "All" && (
                                        <span className="ml-1.5 opacity-60">
                                            {
                                                records.filter(
                                                    (r) =>
                                                        String(
                                                            attr(r, "Origin") ?? "",
                                                        ) === name,
                                                ).length
                                            }
                                        </span>
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* the rail on a phone, the grid from sm up — one list, two shapes */}
            <div
                ref={rail}
                className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-x-7 [&::-webkit-scrollbar]:hidden"
            >
                <AnimatePresence initial={false} mode="popLayout">
                    {shown.map((record, i) => (
                        <motion.div
                            key={record.code}
                            layout={!reduce}
                            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                            className="w-[78%] shrink-0 snap-start sm:w-auto"
                        >
                            <RecordCard record={record} index={i} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <p className="mt-1 text-[13px] text-muted-foreground sm:hidden">
                {shown.length} {shown.length === 1 ? "record" : "records"} · drag
                sideways
            </p>
        </div>
    );
}
