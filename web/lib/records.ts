import recordsJson from "@/data/records.json";
import { safeDecode } from "@/lib/safe";

/**
 * A record is the passport's subject: one product, one origin story.
 * It is a plain JSON file in the repo (data/records.json) — no chain, no
 * dashboard. Publishing = adding a row here (see `npm run publish`).
 */

export type RecordAttribute = { trait_type: string; value: string | number };

export type ProductRecord = {
    code: string;
    title: string;
    subtitle?: string;
    description: string;
    /** documentary photo for the page — hands, cloth, looms */
    photo?: string;
    /** who took it, under whose permission; shown under the photo */
    photoCredit?: string;
    /** the record sheet drawn by `npm run record:svg` — passport + print */
    image: string;
    collection?: string;
    /** How many passports this record may ever issue. 1 = unique item. */
    supply: number;
    /** How many one account may hold. */
    perHolder?: number;
    attributes?: RecordAttribute[];
};

export const records: ProductRecord[] = (recordsJson as { records: ProductRecord[] })
    .records;

export function getRecord(code: string): ProductRecord | undefined {
    const wanted = safeDecode(code).trim().toUpperCase();
    return records.find((r) => r.code.toUpperCase() === wanted);
}

export function attr(record: ProductRecord, name: string) {
    return record.attributes?.find(
        (a) => a.trait_type.toLowerCase() === name.toLowerCase(),
    )?.value;
}

export const collectionName = (record: ProductRecord) =>
    record.collection ?? "Digital Product Passport";

/** The object itself: the photo when there is one, else the record sheet. */
export const recordVisual = (record: ProductRecord) => record.photo ?? record.image;