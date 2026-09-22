"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis, the marketplace's smooth-scroll component, as this app's scroller.
 *
 * Two decisions worth writing down:
 *
 *  · `prefers-reduced-motion` disables it entirely. Smoothed scrolling is the
 *    one effect most likely to make someone ill, and it is decoration.
 *  · touch is left alone (`syncTouch: false`). A phone already scrolls the way
 *    its owner expects; overriding that costs frames and gains nothing. This is
 *    a wheel and trackpad refinement only.
 *
 * The header is `position: sticky`, which keeps working because Lenis scrolls
 * the window rather than a transformed wrapper.
 */
export function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 0.9,
            wheelMultiplier: 1,
            smoothWheel: true,
            syncTouch: false,
            easing: (x: number) => 1 - Math.pow(1 - x, 3),
        });

        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        /* In-page anchors and the skip link must still land where they point. */
        const onClick = (event: MouseEvent) => {
            const anchor = (event.target as HTMLElement | null)?.closest?.(
                'a[href^="#"]',
            ) as HTMLAnchorElement | null;
            if (!anchor) return;
            const id = anchor.getAttribute("href")?.slice(1);
            const target = id ? document.getElementById(id) : null;
            if (!target) return;
            event.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
        };
        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("click", onClick);
            lenis.destroy();
        };
    }, []);

    return null;
}
