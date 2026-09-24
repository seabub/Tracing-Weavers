import { NextResponse } from "next/server";
import { issuePassport } from "@/lib/claim";
import { accountStore } from "@/lib/accounts";
import { currentIdentity } from "@/lib/session";
import { allowRequest, guardRequest, tooMany } from "@/lib/request-guard";

/* Node runtime on purpose: the file store uses node:fs and signing uses
   node:crypto, so this handler must not be bundled for the edge. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const guard = guardRequest(request);
    if (!guard.ok) return guard.response;

    if (!allowRequest(request, { limit: 20, windowMs: 60_000, scope: "claim" })) {
        return tooMany();
    }

    /* Claiming needs an account. The certificate is kept under a name and an
       email, so those come from the signed-in session — never from the request
       body, which anybody can write. Before this, a claim was anonymous: no
       account, nothing to prove the certificate belonged to anyone. */
    const identity = await currentIdentity();
    /* A session alone is not enough. Sessions issued before accounts existed
       are still valid signatures, so the account is checked too — otherwise an
       old cookie would claim without anyone having proved anything. */
    const account = identity
        ? await accountStore()
              .get(identity.email)
              .catch(() => null)
        : null;

    if (!identity || !account) {
        return NextResponse.json(
            {
                error:
                    "Sign in to claim this certificate. It is kept under your name and email, so it needs an account.",
                signIn: true,
            },
            { status: 401, headers: { "Cache-Control": "no-store" } },
        );
    }

    let body: Record<string, unknown>;
    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json(
            { error: "The request body could not be read." },
            { status: 400 },
        );
    }

    try {
        const result = await issuePassport({
            code: String(body.code ?? ""),
            /* From the account only — never from the request body. */
            name: account.name,
            email: account.email,
            outlet: account.outlet,
            tag: body.tag ? String(body.tag) : undefined,
        });

        if (!result.ok) {
            return NextResponse.json(
                { error: result.error },
                { status: result.status, headers: { "Cache-Control": "no-store" } },
            );
        }

        return NextResponse.json(
            { passport: result.passport, token: result.token },
            { status: 201, headers: { "Cache-Control": "no-store" } },
        );
    } catch (cause) {
        /* Never let this become an HTML 500: the holder has to be able to read
           what went wrong and what to do. The detail (paths, Redis errors) is
           logged, not returned — it used to leak filesystem paths to anyone. */
        console.error("[claim] failed:", (cause as Error)?.message ?? cause);

        return NextResponse.json(
            {
                error: "The passport could not be issued because of a storage problem.",
                hint:
                    "Open /api/health on this deployment: `store.backend` must be `kv` and " +
                    "`store.writable` harus true.",
            },
            { status: 500, headers: { "Cache-Control": "no-store" } },
        );
    }
}