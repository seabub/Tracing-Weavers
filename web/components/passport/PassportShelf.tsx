"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PassportCard } from "@/components/passport/PassportCard";
import { readLocalPassports } from "@/lib/local-passports";
import type { Passport } from "@/lib/types";
import type { ProductRecord } from "@/lib/records";

/**
 * Server-issued passports plus anything this browser was handed and the store
 * has not returned yet (or cannot, when no store is configured).
 *
 * The empty state lives here, not in the page: the page only knows the server
 * list, so a holder whose passports exist solely in this browser used to see
 * "Belum ada paspor di sini" printed directly above their own passport card.
 */
export function PassportShelf({
    issued,
    records,
    emptyState,
}: {
    issued: Passport[];
    records: ProductRecord[];
    emptyState?: ReactNode;
}) {
    const [merged, setMerged] = useState<Passport[]>(issued);
    /* Items that were in the server list at first paint. Only those get the
       entrance stagger: anything merged in later is already on screen, and
       re-animating it makes the page flicker every time it refreshes. */
    const [first] = useState(() => new Set(issued.map((p) => p.id)));

    useEffect(() => {
        const byId = new Map<string, Passport>();
        for (const passport of [...issued, ...readLocalPassports()]) {
            byId.set(passport.id, passport);
        }
        setMerged(
            [...byId.values()].sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : -1)),
        );
    }, [issued]);

    if (!merged.length) return <>{emptyState ?? null}</>;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {merged.map((passport, i) => (
                <div
                    key={passport.id}
                    className={first.has(passport.id) ? "rise" : undefined}
                    style={
                        first.has(passport.id)
                            ? { ["--i" as string]: String(i) }
                            : undefined
                    }
                >
                    <PassportCard
                        passport={passport}
                        record={records.find((r) => r.code === passport.code)}
                    />
                </div>
            ))}
        </div>
    );
}