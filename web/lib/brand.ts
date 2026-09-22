/** Public brand config — safe in both server and client components. */

export const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const brand = process.env.NEXT_PUBLIC_BRAND ?? "Digital Product Passport";

/** The one URL that goes onto a physical tag. */
export function tagUrl(tagCode: string) {
    return `${siteUrl}/t/${encodeURIComponent(tagCode.trim().toUpperCase())}`;
}

export function recordUrl(code: string) {
    return `${siteUrl}/record/${encodeURIComponent(code)}`;
}

export function verifyUrl(passportId: string) {
    return `${siteUrl}/verify/${encodeURIComponent(passportId)}`;
}