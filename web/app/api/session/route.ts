import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encodeIdentity, sessionCookieName } from "@/lib/session";
import { signingConfigured } from "@/lib/passport";

/** Identify a holder so their passports can be listed back to them.
 *  No password and no verification email on purpose — the minimum needed to
 *  return a passport. Swap in a real auth provider when the programme needs
 *  one; only lib/session.ts reads this cookie. */
export async function POST(request: Request) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const outlet = String(body.outlet ?? "").trim();

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return NextResponse.json(
            { error: "A name and a valid email address are needed." },
            { status: 400 },
        );
    }

    if (!signingConfigured()) {
        return NextResponse.json(
            {
                error:
                    "PASSPORT_SIGNING_SECRET belum diset di deployment ini, jadi sesi tidak bisa ditandatangani. Tambahkan variabel itu di Vercel, lalu redeploy.",
            },
            { status: 503 },
        );
    }

    const jar = await cookies();
    jar.set(
        sessionCookieName,
        encodeIdentity({ name, email, outlet: outlet || undefined }),
        {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 180,
        },
    );

    return NextResponse.json({ identity: { name, email, outlet: outlet || undefined } });
}

export async function DELETE() {
    const jar = await cookies();
    jar.delete(sessionCookieName);
    return NextResponse.json({ identity: null });
}