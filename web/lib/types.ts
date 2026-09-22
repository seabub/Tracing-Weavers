/**
 * Types shared between server and client.
 * Kept free of any import so a client component can pull them in without
 * dragging node:fs or node:crypto into the browser bundle.
 */

export type Identity = { name: string; email: string; outlet?: string };

export type PassportPayload = {
    id: string;
    /** the record this passport belongs to, e.g. "BT-0042" */
    code: string;
    /** the holder's name as given at claim time */
    holder: string;
    /** the email the passport was issued to — the key the collection uses */
    email?: string;
    outlet?: string;
    issuedAt: string;
    /** 1-based position within the record's supply */
    serial: number;
};

export type Passport = PassportPayload & {
    status: "issued" | "revoked";
    /** tag codes that opened this record (what the holder actually tapped) */
    tags?: string[];
};