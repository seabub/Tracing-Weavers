"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PassportLeaf } from "@/components/passport/passport-leaf";
import { PassportBook, type BookLeaf } from "@/components/passport/passport-book";
import { readLocalPassports } from "@/lib/local-passports";
import { WarpField } from "@/components/motif/marks";
import { brand } from "@/lib/brand";
import type { Passport } from "@/lib/types";
import type { ProductRecord } from "@/lib/records";

/**
 * The holder's passports, as a book you turn: a cover, then one leaf per tag
 * that was claimed, so the book is as long as the collection.
 *
 * Server-issued passports plus anything this browser was handed and the store
 * has not returned yet (or cannot, when no store is configured). The empty state
 * lives here, not in the page: the page only knows the server list, so a holder
 * whose passports exist solely in this browser used to see "No passports here
 * yet" printed directly above their own passport.
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

    const holder = merged[0]?.holder ?? "Holder";

    const leaves: BookLeaf[] = [
        {
            id: "cover",
            label: "Cover",
            content: (
                <div
                    className="ink-band cloth relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg p-6 text-white sm:p-8"
                    data-theme="dark"
                >
                    <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                    <div className="relative">
                        <div className="eyebrow">{brand}</div>
                        <p className="mt-3 max-w-[22ch] text-[clamp(1.5rem,5.6vw,2.1rem)] leading-tight">
                            {holder}
                        </p>
                    </div>
                    <div className="relative">
                        <p className="num text-[clamp(3rem,14vw,5rem)] leading-none text-salmon">
                            {merged.length}
                        </p>
                        <p className="mt-1 text-[14px] text-white/70">
                            {merged.length === 1
                                ? "passport in this book"
                                : "passports in this book"}
                        </p>
                    </div>
                                        <p className="relative text-[12px] uppercase tracking-[.16em] text-white/50">
                        One leaf per claimed tag
                    </p>
                </div>
            ),
        },
        ...merged.map((passport, i) => ({
            id: passport.id,
            label: `Leaf ${i + 1} of ${merged.length}`,
            content: (
                <PassportLeaf
                    passport={passport}
                    record={records.find((r) => r.code === passport.code)}
                />
            ),
        })),
    ];

    return (
        <div className="mx-auto max-w-lg">
            <PassportBook leaves={leaves} />
        </div>
    );
}