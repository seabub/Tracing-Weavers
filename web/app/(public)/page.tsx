import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import RecordGrid from "@/components/records/RecordGrid";
import { JourneyStrip } from "@/components/journey-strip";
import { ThreadRule, WarpField, ValueLoop } from "@/components/motif/marks";

/* The natural dyes the weavers actually use — the brand's reserved data
   colours, so nothing here is decoration: each swatch names a dyestuff. */
const DYES = [
    { name: "Nila", en: "Indigo leaf", hex: "#2B3A67", note: "daun indigo, direndam berhari-hari" },
    { name: "Mengkudu", en: "Morinda root", hex: "#AE1800", note: "akar mengkudu, merah yang tahan lama" },
    { name: "Kunyit", en: "Turmeric", hex: "#ECA406", note: "kunyit, kuning hangat" },
    { name: "Tanah", en: "Clay & bark", hex: "#F29A6A", note: "tanah liat dan kulit kayu" },
];

export default function Home() {
    return (
        <>
            {/* ── hero: ink ground, warp field as the quiet ground ── */}
            <section className="ink-band cloth relative overflow-hidden rounded-2xl px-6 py-14 sm:px-12 sm:py-20" data-theme="dark">
                <WarpField className="pointer-events-none absolute inset-x-0 top-0 h-full w-full text-white/12" />
                <div className="relative max-w-3xl">
                    <div className="eyebrow rise">{t.homeEyebrow}</div>
                    <h1 className="display rise mt-5 text-4xl sm:text-6xl" style={{ ["--i" as string]: "1" }}>
                        {t.homeTitleA} <span className="text-gradient">{t.homeTitleB}</span>.
                    </h1>
                    <p
                        className="rise mt-6 max-w-[56ch] text-lg text-white/75"
                        style={{ ["--i" as string]: "2" }}
                    >
                        {t.homeLead}
                    </p>
                    <div
                        className="rise mt-9 flex flex-wrap gap-3"
                        style={{ ["--i" as string]: "3" }}
                    >
                        <a
                            href="/scan"
                            className="pressable rounded-lg border border-salmon bg-salmon px-6 py-3 text-[13px] font-medium uppercase tracking-[.12em] text-ink"
                        >
                            {t.readTag}
                        </a>
                        <a
                            href="/login"
                            className="pressable rounded-lg border border-white/45 px-6 py-3 text-[13px] font-medium uppercase tracking-[.12em] text-white"
                        >
                            {t.openPassport}
                        </a>
                    </div>
                    <p className="footnote mt-8 text-white/50">
                        {records.length} jejak · {tagCount} {t.tagsCount} · Adonara · Lembata · Manggarai
                    </p>
                </div>
            </section>

            {/* ── the records ── */}
            <section className="mt-14">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
                    <div>
                        <div className="eyebrow">{t.recordsEyebrow}</div>
                        <h2 className="display mt-2 text-2xl">{t.recordsTitle}</h2>
                    </div>
                    <span className="footnote hidden sm:block">
                        {records.length} {t.recordsCount}
                    </span>
                </div>
                <RecordGrid records={records} />
            </section>

            {/* ── the seven steps of the programme ── */}
            <section className="mt-16">
                <ThreadRule className="h-2 w-full text-stone" aria-hidden />
                <div className="mt-10">
                    <div className="eyebrow">{t.journeyEyebrow}</div>
                    <h2 className="display mt-3 max-w-[26ch] text-3xl">
                        {t.journeyTitle}
                    </h2>
                    <p className="mt-4 max-w-[56ch] text-base text-muted-foreground">
                        {t.journeyLead}
                    </p>
                    <JourneyStrip className="mt-10" />
                </div>
            </section>

            {/* ── natural dyes: the colours of this page have origins ── */}
            <section className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="eyebrow">{t.dyeEyebrow}</div>
                        <p className="mt-3 max-w-[56ch] text-base text-muted-foreground">
                            {t.dyeLead}
                        </p>
                    </div>
                    <ValueLoop className="h-10 w-28 text-stone" aria-hidden />
                </div>

                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {DYES.map((dye, i) => (
                        <li key={dye.name} className="rise" style={{ ["--i" as string]: String(i) }}>
                            <div
                                className="h-16 w-full rounded-md border border-border"
                                style={{ background: dye.hex }}
                                aria-hidden
                            />
                            <div className="display mt-3 text-lg">{dye.name}</div>
                            <div className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                                {dye.en}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{dye.note}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── what a passport is, and is not ── */}
            <section className="mt-16">
                <div className="eyebrow">{t.beforeEyebrow}</div>
                <h2 className="display mt-3 max-w-[26ch] text-3xl">{t.beforeTitle}</h2>

                <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {t.explain.map((item, i) => (
                        <div
                            key={item.title}
                            className="rise border-t border-border pt-4"
                            style={{ ["--i" as string]: String(i) }}
                        >
                            <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                                {item.title}
                            </div>
                            <p className="mt-3 text-base text-muted-foreground">{item.body}</p>
                        </div>
                    ))}
                </div>

                <p className="footnote mt-10">
                    {brand} · sasaran yang akan diukur selama tiga tahun, bukan janji
                </p>
            </section>
        </>
    );
}