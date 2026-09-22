import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import RecordGrid from "@/components/records/RecordGrid";
import { JourneyStrip } from "@/components/journey-strip";
import { ThreadRule, WarpField } from "@/components/motif/marks";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/* The four dyestuffs the weavers actually use — the brand's reserved dye
   colours, so each swatch is a material, not a decoration. */
const DYES = [
    { name: "Nila", en: "Indigo", hex: "#2B3A67", note: "daun indigo, direndam berhari-hari" },
    { name: "Mengkudu", en: "Morinda", hex: "#AE1800", note: "akar mengkudu, merah yang tahan lama" },
    { name: "Kunyit", en: "Turmeric", hex: "#ECA406", note: "kunyit, kuning hangat" },
    { name: "Tanah", en: "Clay", hex: "#F29A6A", note: "tanah liat dan kulit kayu" },
];

/**
 * Explore surface: a compact masthead that frames the catalogue, then the
 * records. One ink chapter below carries what a passport is and where the
 * seven steps go — chapters, not a pile of equal-weight sections.
 */
export default function Home() {
    return (
        <>
            {/* masthead — a photo band with a scrim, framing the catalogue */}
            <section
                className="relative mt-6 overflow-hidden rounded-xl bg-ink"
                data-theme="dark"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/imagery/tenun-hanging.jpg"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 to-ink/40" />
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/8" />

                <div className="relative max-w-2xl px-6 py-14 sm:px-10 sm:py-16">
                    <div className="eyebrow">{t.homeEyebrow}</div>
                    <h1 className="mt-4 text-[clamp(2rem,7vw,3rem)] text-white">
                        {t.homeTitleA} <span className="text-salmon">{t.homeTitleB}</span>.
                    </h1>
                    <p className="mt-4 max-w-[52ch] text-[17px] text-white/80">
                        {t.homeLead}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Link href="/scan">
                            <Button variant="inverse">{t.readTag}</Button>
                        </Link>
                        <Link
                            href="/login"
                            className="text-[15px] text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
                        >
                            {t.openPassport}
                        </Link>
                    </div>
                </div>
            </section>

            {/* the catalogue */}
            <section className="mt-14">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
                    <div>
                        <div className="eyebrow">{t.recordsEyebrow}</div>
                        <h2 className="mt-2">{t.recordsTitle}</h2>
                    </div>
                    <span className="data shrink-0 pb-1 text-muted-foreground">
                        {records.length} {t.recordsCount} · {tagCount} {t.tagsCount}
                    </span>
                </div>
                <RecordGrid records={records} />
            </section>

            {/* the dyes — data, not tiles */}
            <section className="mt-16">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="eyebrow">{t.dyeEyebrow}</div>
                    <p className="text-[15px] text-muted-foreground">{t.dyeLead}</p>
                </div>
                <ul className="mt-4 grid gap-x-7 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                    {DYES.map((dye) => (
                        <li key={dye.name} className="flex items-center gap-3">
                            <span
                                aria-hidden
                                className="h-9 w-9 shrink-0 rounded-sm shadow-[var(--ring)]"
                                style={{ background: dye.hex }}
                            />
                            <span className="min-w-0">
                                <span className="block text-[17px] leading-tight">
                                    {dye.name}
                                    <span className="data ml-2 text-muted-foreground">
                                        {dye.en}
                                    </span>
                                </span>
                                <span className="block text-[14px] leading-snug text-muted-foreground">
                                    {dye.note}
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* chapter: what a passport is, and where the seven steps go */}
            <section
                className="ink-band cloth mt-16 rounded-xl px-6 py-12 sm:px-10"
                data-theme="dark"
            >
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                    <div>
                        <div className="eyebrow">{t.beforeEyebrow}</div>
                        <h2 className="mt-3 max-w-[22ch] text-white">{t.beforeTitle}</h2>

                        <dl className="mt-8">
                            {t.explain.map((item) => (
                                <div
                                    key={item.title}
                                    className="border-t border-white/18 py-4"
                                >
                                    <dt className="text-[11px] uppercase tracking-[.2em] text-salmon">
                                        {item.title}
                                    </dt>
                                    <dd className="mt-2 text-[16px] leading-relaxed text-white/72">
                                        {item.body}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* the story earns its length, so it is offered, not imposed */}
                        <Reveal tone="ink" summary="Kenapa ini penting" className="mt-6">
                            <p>
                                Di Adonara, nama penenun jarang muncul di mana pun:
                                kainnya dijual, motifnya difoto, harganya dicatat —
                                namanya tidak. Padahal satu helai bisa berarti sebelas
                                minggu kerja, tiga kali celup, dan motif yang hanya boleh
                                dipakai keluarga tertentu.
                            </p>
                            <p>
                                Jejak ini menuliskannya. Setiap kain yang keluar dari kebun
                                dan alat tenun membawa satu halaman: siapa yang
                                mengerjakannya, dari bahan apa, berapa lama. Halaman itu
                                ikut ke mana kainnya pergi.
                            </p>
                        </Reveal>
                    </div>

                    <div>
                        <div className="eyebrow">{t.journeyEyebrow}</div>
                        <h2 className="mt-3 max-w-[20ch] text-white">{t.journeyTitle}</h2>
                        <p className="mt-3 max-w-[46ch] text-[16px] text-white/70">
                            {t.journeyLead}
                        </p>
                        <JourneyStrip className="mt-6" tone="ink" />
                    </div>
                </div>

                <p className="mt-10 border-t border-white/18 pt-4 text-[12px] uppercase tracking-[.12em] text-white/50">
                    {brand} · tiga tahun yang diukur, bukan janji.
                </p>
            </section>

            <ThreadRule className="mt-16 h-2 w-full text-stone" aria-hidden />
        </>
    );
}