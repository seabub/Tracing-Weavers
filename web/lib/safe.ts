/**
 * Decode once, tolerate garbage.
 *
 * Route params arrive already decoded from Next, so a second
 * `decodeURIComponent` on a value containing a stray "%" throws URIError and
 * turns the page into a blank 500. Verified before the fix:
 * `GET /record/BT-0042?tag=%25` → 500. Anything that cannot be decoded is
 * simply used as it came.
 */
export function safeDecode(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}