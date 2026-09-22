import tagsJson from "@/data/tags.json";
import { getRecord, type ProductRecord } from "@/lib/records";

/**
 * The tag registry — the only thing that turns a physical object into a
 * record. A tag carries either a printed code ("BT-0042") or the chip's own
 * UID ("04A1B2C3D4E5F6"); several tags may point at the same record, and a
 * tag can be re-pointed without touching the physical object.
 */

export type TagEntry = {
    /** which record this tag opens */
    record: string;
    label?: string;
    weaver?: string;
    site?: string;
    /** free note, e.g. where the chip is sewn in */
    position?: string;
};

export const tags: Record<string, TagEntry> = (
    tagsJson as { tags: Record<string, TagEntry> }
).tags;

/** Tags get written by hand and by different tools, so normalise before
 *  lookup: "bt-0042 ", "04:a1:b2" and "04A1B2" all have to hit. */
export function normalizeTagCode(raw: string) {
    return decodeURIComponent(raw)
        .trim()
        .replace(/[\s:._-]/g, "")
        .toUpperCase();
}

const index: Record<string, TagEntry> = Object.fromEntries(
    Object.entries(tags).map(([code, entry]) => [normalizeTagCode(code), entry]),
);

export type ResolvedTag = {
    tagCode: string;
    entry: TagEntry;
    record: ProductRecord;
};

export function resolveTag(raw: string): ResolvedTag | null {
    const tagCode = normalizeTagCode(raw);
    const entry = index[tagCode];
    if (!entry) return null;

    const record = getRecord(entry.record);
    if (!record) return null;

    return { tagCode, entry, record };
}

/** The canonical tag for a record — what the QR on the packaging encodes. */
export function tagForRecord(code: string) {
    return (
        Object.keys(tags).find(
            (t) => tags[t].record.toUpperCase() === code.toUpperCase(),
        ) ?? null
    );
}

export const tagCount = Object.keys(tags).length;