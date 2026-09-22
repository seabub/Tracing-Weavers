import { NextResponse } from "next/server";
import { issuePassport } from "@/lib/claim";

/* Node runtime on purpose: the file store uses node:fs and signing uses
   node:crypto, so this handler must not be bundled for the edge. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    let body: Record<string, unknown>;

    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
    }

    try {
        const result = await issuePassport({
            code: String(body.code ?? ""),
            name: String(body.name ?? ""),
            email: String(body.email ?? ""),
            outlet: body.outlet ? String(body.outlet) : undefined,
            tag: body.tag ? String(body.tag) : undefined,
        });

        if (!result.ok) {
            return NextResponse.json({ error: result.error }, { status: result.status });
        }

        return NextResponse.json(
            { passport: result.passport, token: result.token },
            { status: 201 },
        );
    } catch (cause) {
        /* Never let this become an HTML 500: the holder has to be able to read
           what actually went wrong and what to do about it. */
        const detail = (cause as Error)?.message ?? "Unknown error";
        console.error("[claim] failed:", detail);

        return NextResponse.json(
            {
                error: "Paspor gagal diterbitkan karena masalah di penyimpanan.",
                detail,
                hint:
                    "Buka /api/health: `store.backend` harus `kv` dan " +
                    "`store.writable` harus true. Artinya Upstash sudah " +
                    "terhubung dan PASSPORT_STORE=kv sudah diset, lalu redeploy.",
            },
            { status: 500 },
        );
    }
}