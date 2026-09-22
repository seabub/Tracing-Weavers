import { NextResponse } from "next/server";
import { passportStore } from "@/lib/store";

/**
 * A spot-check for the field team, and the diagnostic the deploy notes mention.
 *
 * It used to answer with EVERY passport — holder name, email, outlet — to
 * anyone who asked, and `?email=` made it an enumeration oracle: curl it once
 * and you have the whole holder list. Now:
 *
 *   without PASSPORT_ADMIN_TOKEN  counts only (still enough to answer "is the
 *                                 store connected and how many are issued")
 *   with it (Authorization: Bearer) the full rows, for an admin who needs them
 *
 * Emails are never part of the summary, and the response is never cacheable.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" };

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code")?.toUpperCase();
    const expected = process.env.PASSPORT_ADMIN_TOKEN;
    const presented = request.headers.get("authorization") ?? "";
    const isAdmin = Boolean(expected) && presented === `Bearer ${expected}`;

    const store = passportStore();

    try {
        if (isAdmin) {
            const passports = code
                ? await store.listByRecord(code)
                : await store.all();
            return NextResponse.json(
                { backend: store.backend, scope: code ?? "all", count: passports.length, passports },
                { headers: NO_STORE },
            );
        }

        const all = await store.all();
        const passports = code ? all.filter((p) => p.code === code) : all;

        return NextResponse.json(
            {
                backend: store.backend,
                scope: code ?? "all",
                count: passports.length,
                note: "Counts only. The full list needs an Authorization: Bearer PASSPORT_ADMIN_TOKEN header.",
            },
            { headers: NO_STORE },
        );
    } catch (cause) {
        return NextResponse.json(
            {
                backend: store.backend,
                error: "The passport list could not be read.",
                hint: "Check /api/health.",
                detail: process.env.NODE_ENV === "production" ? undefined : String(cause),
            },
            { status: 503, headers: NO_STORE },
        );
    }
}