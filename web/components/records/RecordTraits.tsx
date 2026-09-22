"use client";

import { motion } from "framer-motion";

type Attribute = { trait_type?: string; value?: unknown };

/* Traits as one row per attribute — label in letterspaced caps, value in the
   body face. Same anatomy as the app this is modelled on, typography from the
   design system. */
export function RecordTraits({ attributes }: { attributes?: Attribute[] }) {
    if (!attributes?.length) return null;

    return (
        <div>
            <div className="eyebrow">Traits</div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {attributes.map((attribute, i) => (
                    <motion.div
                        key={`${attribute.trait_type}-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="rounded-lg border border-border bg-card p-4"
                    >
                        <p className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                            {attribute.trait_type}
                        </p>
                        <p className="mt-1.5 text-base font-medium">
                            {String(attribute.value)}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}