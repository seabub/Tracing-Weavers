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

    const URL_NAMES = ["KV_REST_API_URL", "UPSTASH_REDIS_REST_URL", "STORAGE_URL"];
    const TOKEN_NAMES = ["KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN", "STORAGE_TOKEN"];

    /* Report which names are present — never their values. This is what tells
       you whether the Marketplace integration's prefix matches what we read. */
    const found = [...URL_NAMES, ...TOKEN_NAMES].filter((name) => Boolean(process.env[name]));
    const kvUrl = URL_NAMES.some((name) => Boolean(process.env[name]));
    const kvToken = TOKEN_NAMES.some((name) => Boolean(process.env[name]));

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
    if (issued === null) {
        problems.push(
            "The store was configured but did not answer — check the Redis url/token (open the database in Upstash and confirm it is running).",
        );
    }
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
            "PASSPORT_STORE=kv but no Redis env var was found. Connect Upstash (Vercel → Storage → Marketplace) and redeploy — or rename the two variables it created to KV_REST_API_URL and KV_REST_API_TOKEN.",
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
        kv: { url: kvUrl, token: kvToken, namesFound: found },
        signing: signingConfigured(),
        site: siteUrl,
        data: { records: records.length, tags: tagCount, passports: issued },
        problems,
        runtime: { node: process.version, vercel: Boolean(process.env.VERCEL) },
    });
}