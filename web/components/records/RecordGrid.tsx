"use client";

import { motion } from "framer-motion";
import RecordCard from "./RecordCard";
import type { ProductRecord } from "@/lib/records";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export default function RecordGrid({ records }: { records: ProductRecord[] }) {
    if (!records.length) {
        return (
            <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
                <p className="display text-2xl">No records yet</p>
                <p className="mx-auto mt-3 max-w-[46ch] text-base text-muted-foreground">
                    Records appear here as soon as the first products are
                    published from the field.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            {records.map((record) => (
                <RecordCard key={record.code} record={record} />
            ))}
        </motion.div>
    );
}