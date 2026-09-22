"use client";

import { useEffect, useState } from "react";
import { PassportCard } from "@/components/passport/PassportCard";
import { readLocalPassports } from "@/lib/local-passports";
import type { Passport } from "@/lib/types";
import type { ProductRecord } from "@/lib/records";

/** Server-issued passports plus anything this browser was handed and the
 *  store has not returned yet (or cannot, when no KV is configured). */
export function PassportShelf({
    issued,
    records,
}: {
    issued: Passport[];
    records: ProductRecord[];
}) {
    const [merged, setMerged] = useState<Passport[]>(issued);

    useEffect(() => {
        const local = readLocalPassports();
        const byId = new Map<string, Passport>();
        for (const passport of [...issued, ...local]) {
            byId.set(passport.id, passport);
        }
        setMerged(
            [...byId.values()].sort((a, b) =>
                a.issuedAt < b.issuedAt ? 1 : -1,
            ),
        );
    }, [issued]);

    if (!merged.length) return null;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {merged.map((passport) => (
                <PassportCard
                    key={passport.id}
                    passport={passport}
                    record={records.find((r) => r.code === passport.code)}
                />
            ))}
        </div>
    );
}