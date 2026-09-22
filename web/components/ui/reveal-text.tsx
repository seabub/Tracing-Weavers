"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A line of type that rises out of its own baseline as it comes into view.
 *
 * The marketplace "Text Reveal" in this material's terms: each word sits in a
 * band of its own and is lifted out of it, 40ms apart, once — the heading is
 * read once, so the animation happens once and never again. Under
 * `prefers-reduced-motion` the words are simply there.
 *
 * It takes a plain string rather than children on purpose: splitting arbitrary
 * markup into words would break links and emphasis, and a heading that needs
 * markup does not need this.
 */
export function RevealText({
    text,
    as: Tag = "span",
    className,
    delay = 0,
    accentFrom,
    accentClass = "text-bt-red",
}: {
    text: string;
    as?: "span" | "h1" | "h2" | "h3" | "p";
    className?: string;
    delay?: number;
    /** Word index from which the line takes the accent colour. */
    accentFrom?: number;
    /** Which accent: morinda red on paper, salmon on ink. */
    accentClass?: string;
}) {
    const reduce = useReducedMotion();
    const words = text.split(" ");

    if (reduce) {
        return (
            <Tag className={className}>
                {words.map((word, i) => (
                    <span
                        key={`${word}-${i}`}
                        className={
                            accentFrom !== undefined && i >= accentFrom
                                ? accentClass
                                : undefined
                        }
                    >
                        {word}
                        {i < words.length - 1 ? " " : ""}
                    </span>
                ))}
            </Tag>
        );
    }

    return (
        <Tag className={className}>
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    /* The band the word is lifted out of. `pb` leaves room for
                       descenders, which a plain overflow-hidden would shave. */
                    className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                    <motion.span
                        className={`inline-block ${
                            accentFrom !== undefined && i >= accentFrom
                                ? accentClass
                                : ""
                        }`}
                        initial={{ y: "108%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true, margin: "-12%" }}
                        transition={{
                            duration: 0.62,
                            delay: delay + i * 0.04,
                            ease: [0.23, 1, 0.32, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 ? <span>&nbsp;</span> : null}
                </span>
            ))}
        </Tag>
    );
}
