/**
 * Cloth record — the record artwork, one SVG per record.
 *
 * Tenun structure first: warp pinstripes on an ink ground, a woven band where
 * one weft thread is carried across, a selvedge edge, tally marks for the
  * count, hairline rows of English labels and values.
 *
 *   npm run record:svg                 # every record in data/records.json
 *   npm run record:svg -- BT-0042      # one of them
 *
 * Writes public/records/<CODE>.svg — `image` in data/records.json points there,
 * so run this before publishing a new record.
 *
 * The layout adapts: the trait table goes two-column once it would crowd the
 * page, the description only takes the lines that fit above the footer, and
 * the seal appears only when a free band is left. Every record is
 * geometry-checked (nothing crosses the footer rule, no label collides with
 * its value) before the file is written.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const all = JSON.parse(readFileSync(resolve(root, "data/records.json"), "utf8")).records;

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const selected = only.length
    ? all.filter((r) => only.includes(r.code.toUpperCase()))
    : all;

if (selected.length === 0) {
    console.error(`No record matched: ${only.join(", ")}`);
    process.exit(1);
}

const W = 1080;
const H = 1350;
const M = 96;
const FOOTER_RULE = H - M - 96;
const BODY_MAX = FOOTER_RULE - 24;

const esc = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const attr = (record, name) =>
    (record.attributes ?? []).find(
        (a) => String(a.trait_type).toLowerCase() === name.toLowerCase(),
    )?.value;

function wrap(text, max) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
        if ((line + " " + word).trim().length > max && line) {
            lines.push(line);
            line = word;
        } else {
            line = (line + " " + word).trim();
        }
    }
    if (line) lines.push(line);
    return lines;
}

/* Archivo Narrow is condensed: ~0.47em average advance. Good enough to catch a
   label that would run into its value. */
const textWidth = (text, size, letterSpacing = 0) =>
    String(text).length * (size * 0.47 + letterSpacing);

const FONT_DISPLAY = "Hanken Grotesk, Telegraf, Helvetica Neue, Arial, sans-serif";
const FONT_BODY = "Archivo Narrow, Arial Narrow, Helvetica Neue, Arial, sans-serif";

/* The sheet prints the English label. One column has room for a gloss; two
   columns use the label alone. `npm run record:svg` fails if any label would
   reach its value. */
const ROWS = [
        { id: "MAKER", gloss: "", key: "Maker" },
    { id: "ORIGIN", gloss: "", key: "Origin" },
    { id: "MATERIAL", gloss: "", key: "Material" },
    { id: "TECHNIQUE", gloss: "", key: "Technique" },
    { id: "DYE", gloss: "", key: "Dye" },
    { id: "WEEKS ON THE LOOM", gloss: "", key: "Weeks on the loom" },
    { id: "DYE BATHS", gloss: "", key: "Dye baths" },
    { id: "JOURNEY STAGE", gloss: "", key: "Journey step" },
];

function warpGround() {
    const lines = [];
    for (let i = 0; i < 22; i++) {
        const x = i * 49 + 22;
        const heavy = i % 5 === 0;
        lines.push(
            `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#FFFFFF" stroke-opacity="${
                heavy ? 0.13 : 0.055
            }" stroke-width="${heavy ? 2 : 1}"/>`,
        );
    }
    return lines.join("");
}

/** Woven band: weft lines with one thread carried across — the record's
 *  "how it works" mark, drawn as structure. */
function wovenBand(y) {
    const parts = [];
    for (let i = 0; i < 4; i++) {
        parts.push(
            `<line x1="${M}" y1="${y + i * 12}" x2="${W - M}" y2="${y + i * 12}" stroke="#FFFFFF" stroke-opacity=".14" stroke-width="1"/>`,
        );
    }
    parts.push(
        `<line x1="${M}" y1="${y + 24}" x2="${W - M}" y2="${y + 24}" stroke="#AE1800" stroke-width="2.5"/>`,
    );
    return parts.join("");
}

function tally(x, y, groups = 4) {
    const parts = [];
    for (let g = 0; g < groups; g++) {
        for (let i = 0; i < 5; i++) {
            parts.push(
                `<line x1="${x + g * 20 + i * 3.4}" y1="${i === 4 ? 2 : 5}" x2="${
                    x + g * 20 + i * 3.4
                }" y2="${y}" stroke="#FF9783" stroke-width="1.5"/>`,
            );
        }
    }
    return parts.join("");
}

function seal(cx, cy, r) {
    const parts = [
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#FF9783" stroke-width="1.5"/>`,
        `<circle cx="${cx}" cy="${cy}" r="${r * 0.68}" fill="none" stroke="#FF9783" stroke-opacity=".65"/>`,
        `<line x1="${cx - r * 0.42}" y1="${cy}" x2="${cx + r * 0.42}" y2="${cy}" stroke="#FF9783" stroke-width="2.5"/>`,
    ];
    for (let i = 0; i < 6; i++) {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        parts.push(
            `<line x1="${cx + r * 0.68 * Math.cos(a)}" y1="${cy + r * 0.68 * Math.sin(a)}" x2="${
                cx + r * Math.cos(a)
            }" y2="${cy + r * Math.sin(a)}" stroke="#FF9783" stroke-width="2"/>`,
        );
    }
    return parts.join("");
}

function traitTable(rows, top) {
    const columns = rows.length > 6 ? 2 : 1;
    const perColumn = Math.ceil(rows.length / columns);
    const rowHeight = columns === 2 ? 58 : 62;
    const gap = 56;
    const columnWidth = (W - M * 2 - (columns - 1) * gap) / columns;

    const parts = [];
    const problems = [];
    let bottom = top;

    for (let c = 0; c < columns; c++) {
        const x0 = M + c * (columnWidth + gap);
        const x1 = x0 + columnWidth;
        const slice = rows.slice(c * perColumn, (c + 1) * perColumn);

        slice.forEach((row, i) => {
            const ry = top + 44 + i * rowHeight;
            const label = columns === 2 || !row.gloss ? row.id : `${row.id} · ${row.gloss}`;
            const labelSize = columns === 2 ? 20 : 24;
            const valueSize = columns === 2 ? 24 : 29;
            const tracking = columns === 2 ? 1.5 : 2.5;

            const labelWidth = textWidth(label, labelSize, tracking);
            const valueWidth = textWidth(row.value, valueSize, 0);
            if (labelWidth + valueWidth + 16 > columnWidth) {
                problems.push(
                    `row "${label}" (${Math.round(labelWidth)}+${Math.round(
                        valueWidth,
                    )}px) is too wide for a ${Math.round(columnWidth)}px column`,
                );
            }

            parts.push(
                `<line x1="${x0}" y1="${ry}" x2="${x1}" y2="${ry}" stroke="#FFFFFF" stroke-opacity=".18"/>` +
                    `<text x="${x0}" y="${ry + 35}" font-family="${FONT_BODY}" font-size="${labelSize}" letter-spacing="${tracking}" fill="#FFFFFF" fill-opacity=".62">${esc(
                        label,
                    )}</text>` +
                    `<text x="${x1}" y="${ry + 35}" text-anchor="end" font-family="${FONT_BODY}" font-size="${valueSize}" fill="#FFFFFF">${esc(
                        row.value,
                    )}</text>`,
            );
            bottom = Math.max(bottom, ry + 35);
        });
    }

    return { svg: parts.join(""), bottom, problems };
}

function render(record) {
    const rows = ROWS.map((row) => ({
        id: row.id,
        gloss: row.gloss,
        value: String(attr(record, row.key) ?? "Belum dicatat"),
    }));

    const maker = attr(record, "Maker") ?? record.title.split(" · ")[0];
    const headline = wrap(maker, 17).slice(0, 2);

    const contacts = [M + 22, M + 48, M + 122, M + 190];

    let y = 500;
    const headLines = headline
        .map(
            (line, i) =>
                `<text x="${M}" y="${y + i * 104}" font-family="${FONT_DISPLAY}" font-weight="900" font-size="104" letter-spacing="-2" fill="#FFFFFF">${esc(
                    line,
                )}</text>`,
        )
        .join("");
    y += headline.length * 104;
    contacts.push(y);

    const table = traitTable(rows, y);
    y = table.bottom;

    const bodyTop = y + 74;
    const room = Math.floor((BODY_MAX - bodyTop) / 44) + 1;
    const wrapped = wrap(record.description, rows.length > 6 ? 74 : 62);
    const kept = wrapped.slice(0, Math.max(room, 0));
    const trimmed = kept.length < wrapped.length;
    if (trimmed && kept.length) kept[kept.length - 1] += " …";

    const body = kept
        .map(
            (line, i) =>
                `<text x="${M}" y="${bodyTop + i * 44}" font-family="${FONT_BODY}" font-size="28" fill="#FFFFFF" fill-opacity=".74">${esc(
                    line,
                )}</text>`,
        )
        .join("");
    contacts.push(bodyTop + Math.max(kept.length - 1, 0) * 44);

    /* the seal only appears when a genuinely free band is left above the rule */
    const lastContent = Math.max(...contacts);
    const band = BODY_MAX - lastContent;
    const sealRadius = 68;
    const sealY = lastContent + 28 + sealRadius;
    const hasSeal = band >= sealRadius * 2 + 28;
    if (hasSeal) contacts.push(sealY + sealRadius);

    const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
        /\/$/,
        "",
    );

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(
        record.title,
    )}">
  <rect width="${W}" height="${H}" fill="#201E1D"/>
  <defs>
    <linearGradient id="warp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000"/>
      <stop offset="0.17" stop-color="#000"/>
      <stop offset="0.27" stop-color="#fff"/>
    </linearGradient>
    <mask id="warp-mask"><rect width="${W}" height="${H}" fill="url(#warp)"/></mask>
  </defs>
  <g mask="url(#warp-mask)">${warpGround()}</g>

  <text x="${M}" y="${M + 22}" font-family="${FONT_BODY}" font-size="22" letter-spacing="8" fill="#FF9783">CLOTH RECORD · DIGITAL PRODUCT PASSPORT</text>
  <text x="${W - M}" y="${M + 22}" text-anchor="end" font-family="${FONT_BODY}" font-size="22" letter-spacing="5" fill="#FFFFFF" fill-opacity=".62">${esc(
        record.code,
    )}</text>
  <line x1="${M}" y1="${M + 48}" x2="${W - M}" y2="${M + 48}" stroke="#AE1800" stroke-width="2"/>

  ${wovenBand(M + 60)}
  <g>${tally(M, M + 178, 4)}</g>

  <text x="${M}" y="${M + 122}" font-family="${FONT_BODY}" font-size="23" letter-spacing="7" fill="#FFFFFF" fill-opacity=".62">RECORD OF ONE LENGTH</text>

  ${headLines}
  ${table.svg}
  ${body}

  ${
      hasSeal
          ? `<g transform="translate(${W - M - sealRadius * 2}, ${sealY - sealRadius})">${seal(
                sealRadius,
                sealRadius,
                sealRadius,
            )}</g>`
          : ""
  }

  <line x1="${M}" y1="${FOOTER_RULE}" x2="${W - M}" y2="${FOOTER_RULE}" stroke="#FFFFFF" stroke-opacity=".18"/>
  <text x="${M}" y="${H - M + 4}" font-family="${FONT_BODY}" font-size="24" letter-spacing="2" fill="#FFFFFF" fill-opacity=".62">The record travels with the cloth. Value returns to the weaver's household.</text>
  <text x="${M}" y="${H - M + 44}" font-family="${FONT_BODY}" font-size="24" letter-spacing="2" fill="#FF9783">${site}/record/${esc(
        record.code,
    )}</text>
</svg>
`;

    const problems = [...table.problems];
    if (lastContent > BODY_MAX) {
        problems.push(`content reaches y=${Math.round(lastContent)}, past ${BODY_MAX}`);
    }
    if (trimmed) {
        problems.push(`description trimmed to ${kept.length}/${wrapped.length} lines`);
    }

    return { svg, problems, lowest: lastContent };
}

mkdirSync(resolve(root, "public/records"), { recursive: true });

let failed = 0;
for (const record of selected) {
    const { svg, problems, lowest } = render(record);
    writeFileSync(resolve(root, "public/records", `${record.code}.svg`), svg);

    const fatal = problems.filter((p) => !p.startsWith("description trimmed"));
    console.log(
        `public/records/${record.code}.svg  ·  lowest y=${Math.round(lowest)}/${BODY_MAX}${
            problems.length ? `  ·  ${problems.join("; ")}` : ""
        }`,
    );
    failed += fatal.length;
}

if (failed) {
    console.error(`\n${failed} layout problem(s) — shorten a label or a value.`);
    process.exit(1);
}
console.log("");