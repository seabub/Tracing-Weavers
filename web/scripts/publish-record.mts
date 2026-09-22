/**
 * Publish a record — the non-blockchain replacement for "minting".
 *
 *   npm run publish              # validate data/records.json, report, fix nothing
 *   npm run publish -- --fix     # add the missing tag rows + write the artwork
 *
 * There is nothing to deploy to and no key to sign with: a record is a row in
 * data/records.json, its artwork is an SVG in public/records/, and the tags
 * that open it are rows in data/tags.json. This script checks all three agree
 * before you commit.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const RECORDS = resolve(root, "data/records.json");
const TAGS = resolve(root, "data/tags.json");

const fix = process.argv.includes("--fix");

type RecordRow = {
    code: string;
    title: string;
    description: string;
    image: string;
    supply: number;
    perHolder?: number;
    attributes?: { trait_type: string; value: string | number }[];
};

type Tag = {
    record: string;
    label?: string;
    weaver?: string;
    site?: string;
    position?: string;
};

const recordsFile = JSON.parse(readFileSync(RECORDS, "utf8")) as { records: RecordRow[] };
const tagsFile = JSON.parse(readFileSync(TAGS, "utf8")) as {
    tags: Record<string, Tag>;
};

const problems: string[] = [];
const seen = new Set<string>();

for (const record of recordsFile.records) {
    const where = `[${record.code ?? "?"}]`;

    if (!record.code) problems.push(`${where} missing "code"`);
    if (!record.title) problems.push(`${where} missing "title"`);
    if (!record.description) problems.push(`${where} missing "description"`);
    if (!record.image) problems.push(`${where} missing "image"`);
    if (!Number.isInteger(record.supply) || record.supply < 1) {
        problems.push(`${where} "supply" must be a whole number ≥ 1`);
    }
    if (record.perHolder && record.perHolder > record.supply) {
        problems.push(`${where} "perHolder" is larger than "supply"`);
    }
    if (record.code && seen.has(record.code)) {
        problems.push(`${where} duplicate code`);
    }
    if (record.code) seen.add(record.code);

    if (record.image?.startsWith("/records/")) {
        const file = resolve(root, "public", record.image.replace(/^\//, ""));
        if (!existsSync(file)) {
            problems.push(
                `${where} artwork missing: ${record.image} — run \`npm run record:svg\``,
            );
        }
    }

    const tags = Object.entries(tagsFile.tags).filter(
        ([, tag]) => tag.record?.toUpperCase() === record.code?.toUpperCase(),
    );

    console.log(
        `• ${record.code}  ${record.title}\n   supply ${record.supply}${
            record.perHolder ? ` · per holder ${record.perHolder}` : ""
        } · ${record.attributes?.length ?? 0} traits · ${
            tags.length ? `${tags.length} tag(s): ${tags.map(([c]) => c).join(", ")}` : "NO TAG"
        }`,
    );

    if (tags.length === 0 && fix) {
        tagsFile.tags[record.code] = {
            record: record.code,
            label: record.title.split(" · ")[0],
        };
        console.log(`   + added tag ${record.code} → record ${record.code}`);
    }
}

const orphanTags = Object.entries(tagsFile.tags).filter(
    ([, tag]) =>
        !recordsFile.records.some(
            (r) => r.code?.toUpperCase() === tag.record?.toUpperCase(),
        ),
);
for (const [code, tag] of orphanTags) {
    problems.push(`tag ${code} points at unknown record "${tag.record}"`);
}

if (fix) {
    writeFileSync(RECORDS, `${JSON.stringify(recordsFile, null, 2)}\n`);
    writeFileSync(TAGS, `${JSON.stringify(tagsFile, null, 2)}\n`);
}

console.log(
    `\n${recordsFile.records.length} record(s), ${Object.keys(tagsFile.tags).length} tag(s)`,
);

if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const problem of problems) console.error(`  ✗ ${problem}`);
    process.exit(1);
}

console.log("\nAll good — commit data/records.json, data/tags.json and public/records/.\n");
