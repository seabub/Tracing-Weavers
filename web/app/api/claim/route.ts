import { NextResponse } from "next/server";
import { issuePassport } from "@/lib/claim";

export async function POST(request: Request) {
    let body: Record<string, unknown>;

    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
    }

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
}