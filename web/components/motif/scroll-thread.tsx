"use client";

import { useEffect, useState } from "react";

/**
 * The warp thread across the top of the page: how far through the cloth you are.
 *
 * A 2px line whose width is the reading position, updated from one rAF tick
 * rather than a scroll listener that re-renders. Decorative (aria-hidden) — the
 * page is perfectly readable without it, which is also why it does not animate
 * for anyone who has asked for less motion.
 */
export function ScrollThread() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        };

        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
        >
            <div
                className="h-full origin-left bg-bt-red motion-reduce:transition-none"
                style={{
                    transform: `scaleX(${progress})`,
                    transition: "transform 120ms linear",
                }}
            />
        </div>
    );
}