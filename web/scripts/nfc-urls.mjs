/**
 * The URLs to write onto the tags.
 *
 *   npm run nfc:urls              # table + data/tags.csv
 *   npm run nfc:urls -- --json    # machine-readable, for a bulk tag writer
 *
 * A tag carries ONE url: `${NEXT_PUBLIC_SITE_URL}/t/<TAG_CODE>`. Everything
 * else — which record, which maker — is resolved by the site, so a tag can be
 * re-pointed without touching the physical object.
 *
 * Writing the chip needs hardware (a phone with NFC Tools, an ACR122U/PN532
 * reader, or a Flipper Zero): nothing in Node can talk to an NFC reader
 * without a native driver, so this prints the payload list, not the write.
 * Write an NDEF "URI" record and lock the tag read-only before it goes into
 * the product.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function loadEnv() {
    for (const file of [".env.local", ".env"]) {
        try {
            for (const rawLine of readFileSync(resolve(root, file), "utf8").split("\n")) {
                const line = rawLine.trim();
                if (!line || line.startsWith("#")) continue;
                const eq = line.indexOf("=");
                if (eq === -1) continue;
                const key = line.slice(0, eq).trim();
                const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
                if (!(key in process.env)) process.env[key] = value;
            }
        } catch {
            /* file absent — fine */
        }
    }
}

loadEnv();

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const records = JSON.parse(readFileSync(resolve(root, "data/records.json"), "utf8")).records;
const tags = JSON.parse(readFileSync(resolve(root, "data/tags.json"), "utf8")).tags;

const title = (code) =>
    records.find((r) => r.code.toUpperCase() === String(code).toUpperCase())?.title ?? "";

const rows = Object.entries(tags).map(([code, entry]) => ({
    tag_code: code,
    url: `${site}/t/${code}`,
    record: entry.record ?? "",
    title: title(entry.record),
    position: entry.position ?? "",
    label: entry.label ?? "",
    weaver: entry.weaver ?? "",
    site: entry.site ?? "",
}));

if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ site, tags: rows }, null, 2));
} else {
    const pad = (value, width) => String(value).padEnd(width);
    console.log(`\nWrite these onto the tags (NDEF URI record):\n`);
    console.log(`${pad("TAG", 18)}${pad("RECORD", 10)}${pad("URL", 44)}WHERE`);
    console.log("─".repeat(112));
    for (const row of rows) {
        console.log(
            `${pad(row.tag_code, 18)}${pad(row.record, 10)}${pad(row.url, 44)}${row.position}`,
        );
    }
    console.log("");
}

const header = "tag_code,url,record,title,position,label,weaver,site\n";
const body = rows
    .map((r) =>
        [
            r.tag_code,
            r.url,
            r.record,
            r.title,
            r.position,
            r.label,
            r.weaver,
            r.site,
        ]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(","),
    )
    .join("\n");

writeFileSync(resolve(root, "data/tags.csv"), header + body + "\n");
console.log(`wrote data/tags.csv (${rows.length} tags for ${site})\n`);
