# Beyond Tenun Design System

Beyond Tenun — Seed to Loom is a three-year impact-partnership program (USD 1M ambition) reviving weaving ("tenun") and the ancestral intelligence behind it in Adonara, Lembata and Manggarai, East Nusa Tenggara, Indonesia. It is delivered by three equal collaborators — Impact Creative Management (ICM), Transformational Business Network (TBN) and Torajamelo — with local communities at the center. The hero narrative: "Humanizing Artificial Intelligence through Ancestral Intelligence. From local resilience to human flourishing." The near-term moment is TBN Conference 2026 (24–25 September 2026), where the program is pitched to funders, foundations and strategic partners.

This system captures the visual and verbal language of the fundraising deck and the conference brief so every deck, one-pager, booth panel, prototype and follow-up feels like one campaign.

## Sources
- `uploads/Beyond Tenun Fundraising Deck v3.pdf` — 24-slide Canva deck (1920×1080). Fonts and colours sampled from the file; slide text extracted to `research/deck-text.md`; embedded photos extracted to `research/deck-images/` and curated into `assets/imagery/`.
- `uploads/Brief_Agency_TBN_Conference_2026_Beyond_Tenun_FIN(1).docx` — creative & production brief (14 deliverables). Text in `research/brief-text.md`.
- `uploads/Executive_Summary_BEYOND_TENUN_EN.md` — executive summary (challenge, big idea, pillars, three-year journey, impact areas).
- `uploads/Gemini_Generated_Image_*.jpeg`, `uploads/LocalImpactHub.png` — supplied imagery (AI-generated reference images of weavers, cloth, a Flores village, and the Local Impact Hub illustration).
- No Figma, codebase, logo files or font files were provided.

## Surfaces represented
1. **Fundraising / investor deck** (`ui_kits/deck/`) — the primary artifact; seven slide archetypes.
2. **Traceable Weaver mobile experience** (`ui_kits/traceable-weaver/`) — the NFC/QR demo from brief §5.10, with clearly marked demo content.
3. **Lead capture / QR landing** (`ui_kits/lead-capture/`) — brief §5.13.
Other brief deliverables (one-pagers, booth panels, roundtable kit, video) reuse the same tokens and components.

## Content fundamentals
- **Voice:** calm, declarative, editorial. Short sentences, often in pairs or triads: "A place, not a program." "Restore. Regenerate. Flourish." "Tenun is the entry point, not the destination."
- **Person:** "we" for the partnership ("We go to the ground first."), "the community"/"communities" as the subject wherever possible. Funders are addressed as partners, never donors. Second person is rare.
- **Framing rules (from the guardrail slide):** community at the center; not a weaving project; technology as enabler, not hero; targets, not promises ("program targets to be measured over the three-year pilot, not guaranteed outcomes"); the ask is a partnership — no equity, round, donation or crowdfunding language.
- **Never invent figures.** Approved numbers only: 580 weavers mapped, >1,000 sociopreneurs, >5 social enterprises, USD 1M / 3 years, USD 20,000 assessment, USD 100,000 per community per year. Unknowns are shown as bracketed placeholders: "[balance · to confirm]", "[CONTACT NAME · EMAIL]".
- **Casing:** eyebrows and footers are UPPERCASE, letterspaced. Headlines are sentence case. Step names (SEED, LOOM, TRACE…) are uppercase. "Beyond Tenun" and "Seed to Loom" in title case in prose, all-caps in lock-ups.
- **Separators:** " · " between places, roles and sources ("Adonara · Lembata · Manggarai"); " → " between journey steps; " × " between partners.
- **Indonesian terms** stay in Indonesian with light gloss where needed: Tenun, Kain Tenun, Dinas Pendidikan, Kebun Kapas Rakyat. "Ancestral intelligence" is lowercase in running text, capitalized only in titles.
- **Emoji:** never.
- **Lists** open with a bold lead-in and a regular sentence: "**Livelihood interrupted** — Income from land and loom stops while the cost of living carries on."
- **Not this / This** contrasts are a recurring device; keep them balanced and specific.

## Visual foundations
- **Colour:** two grounds — ink `#201E1D` and paper `#F3F2F2` — with white cards. One accent, red `#AE1800` (`#EC3013` for hover/emphasis). On ink, red becomes salmon `#FF9783`. Blush `#FFF2EF` is the only tinted surface. Amber `#ECA406` marks "to confirm"; clay `#F29A6A` and indigo `#2B3A67` are reserved for data/dye references. No blue/green semantic set — status colours are used sparingly and never decoratively.
- **Type:** Telegraf Black for headlines (regular weight for sub-heads), Archivo Narrow for everything else, Biro Script Plus once — for "beyond" in the program mark. Telegraf and Biro Script are licensed; substituted with **Hanken Grotesk 900/400** and **Caveat** until files are supplied (see Caveats). Headlines lead tight (.98–1.08) with −.02em tracking; eyebrows are 13px with .42em tracking; body 19px/1.4 at 1920 width.
- **Spacing:** 4px base scale. Slide master 1920×1080 with 120px side margins, 96px top, 48px gutters. Headline top-left, supporting copy or photo right, footer hairline at the bottom of the content box.
- **Backgrounds:** solid ink or paper. Photography is documentary and warm (hands, cloth, looms, bamboo, thatch), full-bleed or in a hard-edged column; never rounded, never tilted. Text sits on photos only with a scrim (`--scrim-bottom`, `--scrim-left`). The Local Impact Hub illustration is the single illustrated asset. No patterns or textures are drawn — the tenun motifs live in the photos, not in graphics.
- **Shape:** flat and square. Radius 0 on cards, buttons and badges; 4px only on dialogs; pills only for Tag and Switch. No shadows except `--shadow-float` on dialogs/toasts. 1px stone rules (`#CFC8BB`) divide lists and tables; a 2px red top rule marks a step.
- **Motion:** minimal. 120–220ms ease-out colour/border transitions; no bounces, no parallax. Slides cut, they don't animate.
- **Hover:** primary buttons brighten to `#EC3013`; secondary/ghost get a 6% ink wash; links shift red → bright red. **Press:** 1px downward nudge. **Focus:** red underline/border.
- **Transparency/blur:** none, apart from scrims and the dialog overlay (60% ink). No glass effects.
- **Imagery colour:** warm, saturated naturals — red cloth, indigo, ochre wood, straw. Filter `saturate(.92) contrast(1.04)` keeps photos consistent. No black-and-white treatment.
- **Cards:** white on paper, 1px stone border, 24px padding, optional 16:9 photo header, footer in letterspaced caps.
- **Data:** hairline tables, right-aligned figures, the total in red display type. Diagrams are typographic (numbers, arrows, dots) rather than iconographic.

## Iconography
The deck uses **no icon set**. Structure is carried by typography: two-digit numerals in red, arrows (→) between steps, middots (·) between items, × between partners, and hairlines. Chevrons in components are drawn from CSS borders. No icon font, no SVG sprite, no emoji. If icons become necessary (mobile prototype navigation), use Lucide from CDN at 1.5px stroke and keep them ink-coloured and rare — flag this as an addition. Logos: no logo files were supplied for Beyond Tenun, ICM, TBN or Torajamelo; all marks are set in type (`guidelines/brand-wordmark.html`, `guidelines/brand-partners.html`).

## Graphic elements
Ten line marks in `assets/graphics/`, drawn from weave *structure* rather than from any community motif — the brief is explicit that communities decide which motifs may be recorded or shown, so none are reproduced here. All are single-colour and use `currentColor`: **inline the SVG** (as an `<img>` it renders black) so it picks up red on paper, salmon on ink.

| Mark | What it is | Where it works |
|---|---|---|
| `warp-field` | 48 vertical threads, every sixth heavier | full-bleed header band, poster ground, booth panel |
| `weft-crossing` | warp/weft grid with one weft thread carried across | "how it works" diagrams, section openers |
| `thread-rule` | hairline that frays into dashes | end-of-section divider |
| `value-loop` | six nodes on a dashed circle, one arrowhead, open centre | the loop slide, impact pages |
| `journey-chain` | seven ticks and arrows on a baseline, last tick heavy | Seed → Flourish strip, footers |
| `seed-scatter` | dot field thickening left to right | Restore → Flourish progression, quiet backgrounds |
| `corner-brackets` | four framing corners | photo and quote frames |
| `tally-marks` | five hand-count groups | weaver counts, cohort numbers |
| `horizon-band` | three lines of rising weight | title slides, one-pager foot |
| `partner-nodes` | one filled node, three outlined, dashed links | ICM × TBN × Torajamelo around the community |

Rules: one mark per surface, at low contrast or as a quiet ground; never fill them, never colour two marks differently in the same layout, never rotate them. They are structure, not decoration.

## Components
Standard set authored from the deck's visual language (no component source was provided).
- `components/forms/` — **Button**, **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
- `components/content/` — **Eyebrow**, **Stat**, **Step**, **Card**, **Tag**, **Badge**, **Quote**
- `components/overlay/` — **Tabs**, **Dialog**, **Toast**, **Tooltip**
All accept `inverse` for ink grounds. Namespace: `window.BeyondTenunDesignSystem_9d918e`.

Intentional additions beyond a standard set: Eyebrow, Stat, Step and Quote — the deck's four recurring typographic devices.

## Index
- `styles.css` — entry; imports `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`
- `guidelines/` — 17 specimen cards (Colors ×5, Type ×5, Spacing ×3, Brand ×4)
- `components/` — forms, content, overlay (each with `.jsx`, `.d.ts`, `.prompt.md`, and a card)
- `ui_kits/deck/` — slide archetypes + click-through deck
- `ui_kits/traceable-weaver/` — mobile demo prototype (`index.html` click-through; `stage.html` animated conference showpiece: explain → scan → record → journey → claim a Cloth Record)
- `ui_kits/lead-capture/` — QR landing form
- `templates/pitch-deck/PitchDeck.dc.html` — four-slide deck template consuming projects can start from
- `templates/poster/Poster.dc.html` — main announcement poster, 1240×1754 (A-series at 150dpi; scales to A2/A1)
- `templates/booklet/Booklet.dc.html` — eight-page A5 conference booklet (874×1240 per page, print-enabled)
- `assets/imagery/` — 8 photos; `assets/illustrations/local-impact-hub.png`; `assets/graphics/` — 10 line marks + card
- `research/` — extracted deck text, brief text, deck images
- `thumbnail.html`, `SKILL.md`

## Caveats
- Fonts: Telegraf → Hanken Grotesk, Biro Script Plus → Caveat. Supply the licensed files to replace the Google Fonts import in `tokens/fonts.css` with `@font-face`.
- The deck PDF could not be rasterised here, so slide layouts were rebuilt from extracted text, sampled colours and font names rather than pixel reference.
- No logos supplied; none drawn.
- Photos in `assets/imagery/` include AI-generated reference images from the uploads — replace with licensed community photography before publication (brief §6).
