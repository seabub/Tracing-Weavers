"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A number that counts itself up when it comes into view.
 *
 * The odometer from the Framer marketplace, but the numbers here are only ever
 * real ones from data/records.json — it counts what exists, it never invents a
 * figure. Reduced motion shows the final value immediately, and the same value
 * is in the DOM from the first render, so it is never a lie to a crawler or a
 * screen reader.
 */
export function StatCounter({
    value,
    label,
    className,
}: {
    value: number;
    label: string;
    className?: string;
}) {
    const reduce = useReducedMotion();
    const node = useRef<HTMLSpanElement | null>(null);
    const [shown, setShown] = useState(reduce ? value : 0);

    useEffect(() => {
        if (reduce) {
            setShown(value);
            return;
        }

        const target = node.current;
        if (!target) return;

        let frame = 0;
        let started = false;

        const run = () => {
            const duration = 900;
            const start = performance.now();

            const tick = (now: number) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
                setShown(Math.round(value * eased));
                if (t < 1) frame = window.requestAnimationFrame(tick);
            };
            frame = window.requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && !started) {
                        started = true;
                        run();
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.4 },
        );

        observer.observe(target);
        return () => {
            observer.disconnect();
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [reduce, value]);

    return (
        <span className={className}>
            <span ref={node} className="num">
                {shown}
            </span>{" "}
            {label}
        </span>
    );
}