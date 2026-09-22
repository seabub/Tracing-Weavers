import { NextResponse } from "next/server";

/**
 * Two guards for the write endpoints: same-origin JSON, and a light rate limit.
 *
 * Why both: before this, `POST /api/session` accepted `Content-Type: text/plain`
 * with no Origin check, so any page could silently re-point a visitor's session
 * with a no-preflight cross-site request. And nothing limited how often the one
 * write endpoint could be called.
 *
 * The limiter is BEST-EFFORT and deliberately not a security boundary: it counts
 * in process memory, so a serverless deployment has one counter per instance and
 * loses them on recycle. It stops the obvious case (a script hammering a single
 * endpoint from one place) and nothing more. Put a real limiter at the edge if
 * this ever needs to hold.
 */

type Verdict = { ok: true } | { ok: false; response: NextResponse };

export function guardRequest(request: Request): Verdict {
    const type = request.headers.get("content-type") ?? "";
    if (!type.includes("application/json")) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "Requests must be sent as JSON." },
                { status: 415 },
            ),
        };
    }

    /* Modern browsers send Sec-Fetch-Site; when it says cross-site, refuse. */
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "Requests from other sites are refused." },
                { status: 403 },
            ),
        };
    }

    /* Fallback for clients that send Origin instead. */
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
        try {
            if (new URL(origin).host !== host) {
                return {
                    ok: false,
                    response: NextResponse.json(
                        { error: "Requests from other sites are refused." },
                        { status: 403 },
                    ),
                };
            }
        } catch {
            return {
                ok: false,
                response: NextResponse.json(
                    { error: "The origin could not be read." },
                    { status: 403 },
                ),
            };
        }
    }

    return { ok: true };
}

const hits = new Map<string, number[]>();

function clientKey(request: Request) {
    const header = request.headers;
    return (
        header.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        header.get("x-real-ip") ||
        "unknown"
    );
}

/** True when this caller may proceed. */
export function allowRequest(
    request: Request,
    { limit, windowMs, scope }: { limit: number; windowMs: number; scope: string },
) {
    const key = `${scope}:${clientKey(request)}`;
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((at) => now - at < windowMs);

    if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
    }

    recent.push(now);
    hits.set(key, recent);

    if (hits.size > 2000) {
        for (const [k, v] of hits) {
            if (!v.some((at) => now - at < windowMs)) hits.delete(k);
        }
    }
    return true;
}

export const tooMany = () =>
    NextResponse.json(
        {
            error:
                "Too many attempts from this connection. Wait a moment and try again.",
        },
        { status: 429, headers: { "Cache-Control": "no-store" } },
    );