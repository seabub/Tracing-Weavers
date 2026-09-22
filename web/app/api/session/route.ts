import { NextResponse } from "next/server";
import { clearSession, setSession } from "@/lib/session";
import { allowRequest, guardRequest, tooMany } from "@/lib/request-guard";
import { signingConfigured } from "@/lib/passport";

/**
 * Identify a holder, so a form can be prefilled and a visitor greeted.
 *
 * This is deliberately NOT authentication: no password, no verification email,
 * and typing somebody else's address proves nothing. It also no longer grants
 * anything — /collection lists the passports in the signed held-passport cookie
 * (set when a passport is issued here, or when its verification link is opened),
 * so a typed email cannot read another person's passports. The upgrade path, if
 * the programme wants it, is an emailed one-time code.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMIT = { name: 100, email: 254, outlet: 100 };

export async function POST(request: Request) {
    const guard = guardRequest(request);
    if (!guard.ok) return guard.response;

    if (!allowRequest(request, { limit: 10, windowMs: 60_000, scope: "session" })) {
        return tooMany();
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const outlet = String(body.outlet ?? "").trim();

    if (name.length < 2 || name.length > LIMIT.name) {
        return NextResponse.json(
            { error: "A name is needed, between 2 and 100 characters." },
            { status: 400 },
        );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > LIMIT.email) {
        return NextResponse.json(
            { error: "That email address does not look right." },
            { status: 400 },
        );
    }
    if (outlet.length > LIMIT.outlet) {
        return NextResponse.json(
            { error: "The organisation name is too long." },
            { status: 400 },
        );
    }

    if (!signingConfigured()) {
        return NextResponse.json(
            {
                error:
                    "PASSPORT_SIGNING_SECRET is not set on this deployment, so a session cannot be signed. Add it in Vercel, then redeploy.",
            },
            { status: 503 },
        );
    }

    await setSession({ name, email, outlet: outlet || undefined });

    return NextResponse.json(
        { identity: { name, email, outlet: outlet || undefined } },
        { headers: { "Cache-Control": "no-store" } },
    );
}

/** Sign out: forget the greeting AND the held passports on this browser. */
export async function DELETE() {
    await clearSession();
    return NextResponse.json(
        { identity: null },
        { headers: { "Cache-Control": "no-store" } },
    );
}