"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * A toast that appears after a passport is claimed.
 *
 * It is not a generic "success" banner — it says what just happened ("You
 * now hold the record for [cloth name]"), where to find it, and what to do
 * next.  The animation is a soft slide-up from the bottom that holds for
 * eight seconds, so there is time to read it, and a close button so it
 * never traps anyone.
 *
 * The notification is keyed on the passport id: claiming the same cloth
 * twice on the same page never stacks two copies of the same message.
 */
export function ClaimNotice({
    passportId,
    clothName,
    onClose,
}: {
    passportId: string;
    clothName: string;
    onClose: () => void;
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 400); // wait for exit animation
        }, 8000);
        return () => clearTimeout(timer);
    }, [visible, onClose]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 60, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-md rounded-xl bg-ink p-5 text-white shadow-[0_18px_44px_rgba(32,30,29,.35)] sm:right-6 sm:left-auto sm:w-96"
                    data-theme="dark"
                >
                    <button
                        onClick={() => {
                            setVisible(false);
                            setTimeout(onClose, 400);
                        }}
                        className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:text-white"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <div className="eyebrow">Congratulations</div>
                    <p className="mt-2 text-[16px] leading-snug text-white/90">
                        You now hold the digital record for{" "}
                        <span className="text-salmon">{clothName}</span>.
                    </p>
                    <p className="mt-2 text-[14px] text-white/65">
                        It is saved in{" "}
                        <Link
                            href="/collection"
                            className="underline decoration-white/30 underline-offset-2 hover:text-salmon"
                            onClick={() => {
                                setVisible(false);
                                setTimeout(onClose, 400);
                            }}
                        >
                            your traces
                        </Link>{" "}
                        — one page per weave, bound as a book you can open
                        anywhere.
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}