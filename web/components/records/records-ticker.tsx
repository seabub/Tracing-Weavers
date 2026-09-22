"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { ProductRecord } from "@/lib/records";
import { attr } from "@/lib/records";

/**
 * The selvedge: everything recorded, running past like a woven edge.
 *
 * Framer's draggable ticker, in this material's terms. It drifts on its own,
 * stops when you point at it or focus it, and can be dragged — throw it and it
 * keeps going. The list is real content, so the duplicate track is aria-hidden
 * and the first copy is the one a screen reader reads. Anyone who asked for less
 * motion gets the same list as a plain wrapped row instead.
 */
export function RecordsTicker({
    records,
    className,
}: {
    records: ProductRecord[];
    className?: string;
}) {
    const reduce = useReducedMotion();
    const track = useRef<HTMLDivElement | null>(null);
    const [paused, setPaused] = useState(false);
    const drag = useRef<{ x: number; offset: number; moved: boolean } | null>(null);
    const offset = useRef(0);

    const items = records.map((record) => ({
        code: record.code,
        maker: String(attr(record, "Maker") ?? record.collection ?? "Shared record"),
        origin: String(attr(record, "Origin") ?? ""),
    }));

    useEffect(() => {
        if (reduce) return;
        let frame = 0;
        let last = performance.now();

        const step = (now: number) => {
            const dt = Math.min(now - last, 48);
            last = now;

            if (!paused && !drag.current) offset.current -= dt * 0.022; // ~22px/s

            const node = track.current;
            if (node) {
                const half = node.scrollWidth / 2;
                if (half > 0) {
                    while (offset.current <= -half) offset.current += half;
                    while (offset.current > 0) offset.current -= half;
                    node.style.transform = `translate3d(${offset.current}px,0,0)`;
                }
            }
            frame = window.requestAnimationFrame(step);
        };

        frame = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(frame);
    }, [paused, reduce]);

    if (reduce) {
        return (
            <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className ?? ""}`}>
                {items.map((item) => (
                    <li key={item.code} className="data text-[13px] text-muted-foreground">
                        <Link href={`/record/${item.code}`} className="hover:text-ink">
                            {item.code}
                        </Link>{" "}
                        · {item.maker}
                    </li>
                ))}
            </ul>
        );
    }

    const trackItems = [...items, ...items];

    return (
        <div
            className={`relative overflow-hidden ${className ?? ""}`}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onPointerDown={(e) => {
                drag.current = { x: e.clientX, offset: offset.current, moved: false };
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            }}
            onPointerMove={(e) => {
                const d = drag.current;
                if (!d) return;
                d.moved = true;
                offset.current = d.offset + (e.clientX - d.x);
            }}
            onPointerUp={() => {
                drag.current = null;
            }}
        >
            <div
                ref={track}
                className="flex w-max touch-pan-y items-center gap-8 py-3 will-change-transform"
            >
                {trackItems.map((item, i) => (
                    <span
                        key={`${item.code}-${i}`}
                        aria-hidden={i >= items.length}
                        className="data flex shrink-0 items-center gap-2 text-[13px] whitespace-nowrap text-muted-foreground"
                    >
                        <span className="text-bt-red">{item.code}</span>
                        <span className="text-ink">{item.maker}</span>
                        {item.origin && <span>· {item.origin}</span>}
                    </span>
                ))}
            </div>

            {/* the edges fade, so the row reads as a length of cloth leaving frame */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
            />
        </div>
    );
}