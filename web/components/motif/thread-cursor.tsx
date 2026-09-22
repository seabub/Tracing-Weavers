"use client";

import { useEffect, useRef } from "react";

/**
 * A knot of thread that follows the pointer.
 *
 * The cursor trail from the Framer marketplace, in this material's terms: a
 * small red ring that lags a little behind the real cursor, as if a thread were
 * being drawn after it. It is decoration and nothing else, so:
 *
 *  · it never appears on touch devices (no pointer to follow)
 *  · it is skipped entirely under prefers-reduced-motion
 *  · it is aria-hidden and pointer-events-none, so it can never intercept a click
 *
 * One rAF loop, one transform per frame, and it stops as soon as the pointer
 * leaves the window.
 */
export function ThreadCursor() {
    const knot = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || calm) return;

        const node = knot.current;
        if (!node) return;

        let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let current = { ...target };
        let frame = 0;
        let visible = false;

        const onMove = (event: PointerEvent) => {
            target = { x: event.clientX, y: event.clientY };
            if (!visible) {
                visible = true;
                node.style.opacity = "1";
            }
        };

        const onLeave = () => {
            visible = false;
            node.style.opacity = "0";
        };

        const tick = () => {
            current.x += (target.x - current.x) * 0.16;
            current.y += (target.y - current.y) * 0.16;
            node.style.transform = `translate3d(${current.x - 7}px, ${current.y - 7}px, 0)`;
            frame = window.requestAnimationFrame(tick);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
        frame = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return (
        <div
            ref={knot}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-[70] h-3.5 w-3.5 rounded-full opacity-0 shadow-[0_0_0_1.5px_var(--bt-red)] transition-opacity duration-200"
        />
    );
}