/**
 * Passport artwork — one SVG per record, in the Beyond Tenun language: ink
 * ground, a warp field drawn as structure (not decoration), letterspaced
 * salmon eyebrow, black display headline, hairline rows.
 *
 *   npm run record:svg                 # every record in data/records.json
 *   npm run record:svg -- BT-0042      # one of them
 *
 * Writes public/records/<CODE>.svg. `image` in data/records.json points there,
 * so run this before publishing a new record. Rasterise to PNG at 2× if a
 * channel ever refuses SVG.
 *
 * The layout adapts to the content: the trait table goes to two columns once
 * it would crowd the page, and the description only gets the lines that are
 * actually left above the footer. Every record is geometry-checked before it
 * is written, so a long description can never run off the card.
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
const FOOTER_RULE = H - M - 96; // 1158
const BODY_MAX = FOOTER_RULE - 24; // nothing may sit below this

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

const FONT_DISPLAY = "Hanken Grotesk, Telegraf, Helvetica Neue, Arial, sans-serif";
const FONT_BODY = "Archivo Narrow, Arial Narrow, Helvetica Neue, Arial, sans-serif";

function warpField() {
    const lines = [];
    for (let i = 0; i < 22; i++) {
        const x = i * 49 + 22;
        const heavy = i % 5 === 0;
        lines.push(
            `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#FFFFFF" stroke-opacity="${
                heavy ? 0.14 : 0.06
            }" stroke-width="${heavy ? 2 : 1}"/>`,
        );
    }
    return lines.join("");
}

function seal(cx, cy, r) {
    const parts = [
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#FF9783" stroke-width="1.5"/>`,
        `<circle cx="${cx}" cy="${cy}" r="${r * 0.7}" fill="none" stroke="#FF9783" stroke-opacity=".7"/>`,
        `<line x1="${cx - r * 0.44}" y1="${cy}" x2="${cx + r * 0.44}" y2="${cy}" stroke="#FF9783" stroke-width="2.5"/>`,
    ];
    for (let i = 0; i < 6; i++) {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        parts.push(
            `<line x1="${cx + r * 0.7 * Math.cos(a)}" y1="${cy + r * 0.7 * Math.sin(a)}" x2="${
                cx + r * Math.cos(a)
            }" y2="${cy + r * Math.sin(a)}" stroke="#FF9783" stroke-width="2"/>`,
        );
    }
    return parts.join("");
}

/** Rows of the trait table, laid out in one or two columns. */
function traitTable(rows, top) {
    const columns = rows.length > 6 ? 2 : 1;
    const perColumn = Math.ceil(rows.length / columns);
    const rowHeight = columns === 2 ? 58 : 62;
    const columnWidth = (W - M * 2 - 60) / columns;

    const parts = [];
    let bottom = top;

    for (let c = 0; c < columns; c++) {
        const x0 = M + c * (columnWidth + 60);
        const x1 = x0 + columnWidth;
        const slice = rows.slice(c * perColumn, (c + 1) * perColumn);

        slice.forEach(([label, value], i) => {
            const ry = top + 44 + i * rowHeight;
            parts.push(
                `<line x1="${x0}" y1="${ry}" x2="${x1}" y2="${ry}" stroke="#FFFFFF" stroke-opacity=".18"/>` +
                    `<text x="${x0}" y="${ry + 36}" font-family="${FONT_BODY}" font-size="${
                        columns === 2 ? 22 : 26
                    }" letter-spacing="3" fill="#FFFFFF" fill-opacity=".62">${esc(
                        label.toUpperCase(),
                    )}</text>` +
                    `<text x="${x1}" y="${ry + 36}" text-anchor="end" font-family="${FONT_BODY}" font-size="${
                        columns === 2 ? 25 : 30
                    }" fill="#FFFFFF">${esc(value)}</text>`,
            );
            bottom = Math.max(bottom, ry + 36);
        });
    }

    return { svg: parts.join(""), bottom };
}

function render(record) {
    const rows = (record.attributes ?? [])
        .slice(0, 10)
        .map((a) => [String(a.trait_type), String(a.value)]);

    const maker = attr(record, "Maker") ?? record.title.split(" · ")[0];
    const headline = wrap(maker, 17).slice(0, 2);

    const contacts = [];

    /* eyebrow + rule */
    contacts.push(M + 22, M + 48);
    /* THE RECORD label */
    contacts.push(M + 122);

    let y = 470;
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

    /* description takes whatever is left above the footer rule */
    const bodyTop = y + 74;
    const room = Math.floor((BODY_MAX - bodyTop) / 44) + 1;
    const wrapped = wrap(record.description, rows.length > 6 ? 74 : 62);
    const kept = wrapped.slice(0, Math.max(room, 0));
    const trimmed = kept.length < wrapped.length;
    if (trimmed && kept.length) kept[kept.length - 1] += " …";

    const body = kept
        .map(
            (line, i) =>
                `<text x="${M}" y="${bodyTop + i * 44}" font-family="${FONT_BODY}" font-size="28" fill="#FFFFFF" fill-opacity=".75">${esc(
                    line,
                )}</text>`,
        )
        .join("");
    contacts.push(bodyTop + Math.max(kept.length - 1, 0) * 44);

    /* The seal is decoration, so it only appears when a genuinely free band is
       left above the footer — never overlapping the table, the copy or a rule. */
    const lastContent = Math.max(...contacts);
    const band = BODY_MAX - lastContent;
    const sealRadius = 70;
    const sealY = lastContent + 30 + sealRadius;
    const sealSvg =
        band >= sealRadius * 2 + 30
            ? `<g transform="translate(${W - M - sealRadius * 2}, ${
                  sealY - sealRadius
              })">${seal(sealRadius, sealRadius, sealRadius)}</g>`
            : "";
    if (sealSvg) contacts.push(sealY + sealRadius);

    const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
        /\/$/,
        "",
    );

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(
        record.title,
    )}">
  <rect width="${W}" height="${H}" fill="#201E1D"/>
  <g>${warpField()}</g>

  <text x="${M}" y="${M + 22}" font-family="${FONT_BODY}" font-size="22" letter-spacing="9" fill="#FF9783">DIGITAL PRODUCT PASSPORT</text>
  <text x="${W - M}" y="${M + 22}" text-anchor="end" font-family="${FONT_BODY}" font-size="22" letter-spacing="6" fill="#FFFFFF" fill-opacity=".62">${esc(
        record.code,
    )}</text>
  <line x1="${M}" y1="${M + 48}" x2="${W - M}" y2="${M + 48}" stroke="#AE1800" stroke-width="2"/>

  <text x="${M}" y="${M + 122}" font-family="${FONT_BODY}" font-size="24" letter-spacing="7" fill="#FFFFFF" fill-opacity=".62">THE RECORD</text>

  ${headLines}
  ${table.svg}
  ${body}

  ${sealSvg}

  <line x1="${M}" y1="${FOOTER_RULE}" x2="${W - M}" y2="${FOOTER_RULE}" stroke="#FFFFFF" stroke-opacity=".18"/>
  <text x="${M}" y="${H - M + 4}" font-family="${FONT_BODY}" font-size="24" letter-spacing="3" fill="#FFFFFF" fill-opacity=".62">The record travels with the product. Value returns to the household that made it.</text>
  <text x="${M}" y="${H - M + 44}" font-family="${FONT_BODY}" font-size="24" letter-spacing="3" fill="#FF9783">${site}/record/${esc(
        record.code,
    )}</text>
</svg>
`;

    /* geometry check: nothing may cross the footer rule or leave the card */
    const lowest = Math.max(...contacts);
    const problems = [];
    if (lowest > BODY_MAX) {
        problems.push(`content reaches y=${lowest}, past the ${BODY_MAX} limit`);
    }
    if (H - M + 44 > H - 10) {
        problems.push("footer link sits outside the card");
    }
    if (trimmed) {
        problems.push(
            `description trimmed to ${kept.length}/${wrapped.length} lines to fit`,
        );
    }

    return { svg, problems, lowest };
}

mkdirSync(resolve(root, "public/records"), { recursive: true });

let failed = 0;
for (const record of selected) {
    const { svg, problems, lowest } = render(record);
    const out = resolve(root, "public/records", `${record.code}.svg`);
    writeFileSync(out, svg);

    const notes = problems.filter((p) => !p.startsWith("description trimmed"));
    console.log(
        `wrote public/records/${record.code}.svg  ·  lowest content y=${Math.round(lowest)} of ${BODY_MAX}${
            problems.length ? `  ·  ${problems.join("; ")}` : ""
        }`,
    );
    failed += notes.length;
}

if (failed) {
    console.error(`\n${failed} layout problem(s) — shorten a description or drop traits.`);
    process.exit(1);
}
console.log("");