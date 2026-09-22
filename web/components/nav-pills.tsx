"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The three surfaces of the app as one pill of navigation.
 *
 * The marketplace's "Pill Dropdown Nav", minus the dropdown: there are only
 * three places to be, so hiding two of them behind a menu would be theatre.
 * The pill is a single shared element that moves between the items
 * (`layoutId`), which is why the highlight slides instead of three backgrounds
 * fading in and out of each other.
 *
 * It fits a phone: the labels are short, the row never wraps, and the current
 * page is the one thing that is legible at a glance.
 */
const ITEMS = [
    { href: "/", label: "Records" },
    { href: "/scan", label: "Tap" },
    { href: "/collection", label: "Passport" },
];

export function NavPills({ className }: { className?: string }) {
    const path = usePathname() ?? "/";
    const reduce = useReducedMotion();

    const current =
        ITEMS.map((item) => item.href)
            .filter((href) => (href === "/" ? path === "/" : path.startsWith(href)))
            .sort((a, b) => b.length - a.length)[0] ??
        (path.startsWith("/record") || path.startsWith("/t/") ? "/" : "");

    return (
        <nav
            aria-label="Sections"
            className={`flex items-center gap-0.5 rounded-full bg-muted/70 p-1 ${className ?? ""}`}
        >
            {ITEMS.map((item) => {
                const on = item.href === current;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={on ? "page" : undefined}
                        className="pressable relative rounded-full px-3 py-1.5 text-[13px] tracking-[.08em] uppercase"
                    >
                        {on && (
                            <motion.span
                                layoutId="nav-pill"
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-card shadow-[var(--ring)]"
                                transition={
                                    reduce
                                        ? { duration: 0 }
                                        : { type: "spring", duration: 0.32, bounce: 0.15 }
                                }
                            />
                        )}
                        <span className={`relative ${on ? "text-ink" : "text-ink-3"}`}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
