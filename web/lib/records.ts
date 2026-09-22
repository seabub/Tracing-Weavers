import recordsJson from "@/data/records.json";

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
    const wanted = decodeURIComponent(code).trim().toUpperCase();
    return records.find((r) => r.code.toUpperCase() === wanted);
}

export function attr(record: ProductRecord, name: string) {
    return record.attributes?.find(
        (a) => a.trait_type.toLowerCase() === name.toLowerCase(),
    )?.value;
}

export const collectionName = (record: ProductRecord) =>
    record.collection ?? "Digital Product Passport";