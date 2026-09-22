import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import { passportStore } from "@/lib/store";
import { signingConfigured } from "@/lib/passport";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { siteUrl } from "@/lib/brand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * One-call diagnosis of a deployment. Open it in the browser or:
 *   curl -s https://<domain>/api/health | jq
 *
 * `store.writable: false` is the answer to "why did my claim fail?" — a
 * deployed filesystem is read-only, so PASSPORT_STORE has to be `kv`.
 */
export async function GET() {
    const store = passportStore();

    const kvUrl = Boolean(
        process.env.KV_REST_API_URL ??
            process.env.UPSTASH_REDIS_REST_URL ??
            process.env.STORAGE_URL,
    );
    const kvToken = Boolean(
        process.env.KV_REST_API_TOKEN ??
            process.env.UPSTASH_REDIS_REST_TOKEN ??
            process.env.STORAGE_TOKEN,
    );

    let writable: boolean | "unknown" = "unknown";
    if (store.backend === "file") {
        try {
            await fs.access(process.cwd(), fs.constants.W_OK);
            writable = !process.env.VERCEL;
        } catch {
            writable = false;
        }
    } else {
        writable = kvUrl && kvToken;
    }

    let issued: number | null = null;
    try {
        issued = (await store.all()).length;
    } catch {
        issued = null;
    }

    const problems: string[] = [];
    if (!signingConfigured()) {
        problems.push("PASSPORT_SIGNING_SECRET is not set — passports cannot be signed.");
    }
    if (store.backend === "file" && process.env.VERCEL) {
        problems.push(
            "PASSPORT_STORE=file on Vercel: the filesystem is read-only, so claims will fail. Set PASSPORT_STORE=kv.",
        );
    }
    if (store.backend === "kv" && !(kvUrl && kvToken)) {
        problems.push(
            "PASSPORT_STORE=kv but the Redis REST url/token are missing — connect Upstash and redeploy.",
        );
    }
    if (/localhost|127\.0\.0\.1/.test(siteUrl) && process.env.VERCEL) {
        problems.push(
            "NEXT_PUBLIC_SITE_URL still points at localhost — the URLs written onto tags will be wrong.",
        );
    }

    return NextResponse.json({
        ok: problems.length === 0,
        store: { backend: store.backend, writable },
        kv: { url: kvUrl, token: kvToken },
        signing: signingConfigured(),
        site: siteUrl,
        data: { records: records.length, tags: tagCount, passports: issued },
        problems,
        runtime: { node: process.version, vercel: Boolean(process.env.VERCEL) },
    });
}