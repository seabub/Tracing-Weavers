import { NextResponse } from "next/server";
import { passportStore } from "@/lib/store";
import { readPassportToken } from "@/lib/passport";
import { holdPassports } from "@/lib/session";
import { allowRequest, guardRequest, tooMany } from "@/lib/request-guard";

/**
 * Put a passport into this browser's collection.
 *
 * Proof of possession, not of identity: the id must either exist in the store or
 * come with the signed token that was issued with it. That is what makes a
 * second device work — the holder opens their own verification link
 * (/verify/<id>?t=…) and saves it there — without letting anyone claim an id
 * they only guessed.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const guard = guardRequest(request);
    if (!guard.ok) return guard.response;

    if (!allowRequest(request, { limit: 30, windowMs: 60_000, scope: "hold" })) {
        return tooMany();
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const id = String(body.id ?? "").trim();
    const token = body.token ? String(body.token) : null;

    if (!id || id.length > 120) {
        return NextResponse.json(
            { error: "That passport id could not be read." },
            { status: 400, headers: { "Cache-Control": "no-store" } },
        );
    }

    let proven = Boolean(await passportStore().get(id));

    if (!proven && token) {
        const payload = readPassportToken(token);
        /* The token must be FOR THIS id: signing a passport does not authorise
           pasting its token onto a different id. */
        proven = Boolean(payload && payload.id === id);
    }

    if (!proven) {
        return NextResponse.json(
            { error: "That passport could not be matched to the id or the link." },
            { status: 403, headers: { "Cache-Control": "no-store" } },
        );
    }

    const held = await holdPassports([id]);
    return NextResponse.json({ held }, { headers: { "Cache-Control": "no-store" } });
}