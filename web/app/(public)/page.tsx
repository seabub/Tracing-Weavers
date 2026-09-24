import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { RecordGallery } from "@/components/records/record-gallery";
import { JourneyRail } from "@/components/journey-rail";
import { ThreadRule, WarpField } from "@/components/motif/marks";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { RevealText } from "@/components/ui/reveal-text";
import { StatCounter } from "@/components/records/stat-counter";

/* The four dyestuffs the weavers actually use — the brand's reserved dye
   colours, so each swatch is a material, not a decoration. */
const DYES = [
    { name: "Indigo", hex: "#2B3A67", note: "indigo leaf, steeped for days" },
    { name: "Morinda", hex: "#AE1800", note: "morinda root, a red that lasts" },
    { name: "Turmeric", hex: "#ECA406", note: "turmeric, a warm yellow" },
    { name: "Clay", hex: "#F29A6A", note: "clay and tree bark" },
];

/**
 * Explore surface, written for a phone held in one hand.
 *
 * Length is the design constraint here: this page used to run a masthead, a
 * ticker, a grid, a list of dyes as rows, and then two full chapters side by
 * side — most of a metre of scrolling before anything could be tapped. It is
 * now four screens at most. The catalogue is a rail you drag instead of a
 * column you scroll, the dyes are one line, and the chapter that explains the
 * programme carries the seven stages inline as a rail rather than as a
 * disclosure that opened a two-column list.
 */
export default function Home() {
    return (
        <>
            {/* masthead — a photo band with a scrim, framing the catalogue */}
            <section
                className="relative mt-4 overflow-hidden rounded-xl bg-ink"
                data-theme="dark"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/imagery/weaving-hands-loom.jpg"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 to-ink/40" />
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/8" />

                <div className="relative max-w-2xl px-6 py-10 sm:px-10 sm:py-14">
                    <div className="eyebrow">{t.homeEyebrow}</div>
                    <RevealText
                        as="h1"
                        className="mt-3 text-[clamp(2rem,7vw,3rem)] text-white"
                        text={`${t.homeTitleA} ${t.homeTitleB}.`}
                        accentFrom={2}
                        accentClass="text-salmon"
                    />
                    <p className="mt-3 max-w-[46ch] text-[16px] text-white/80">
                        {t.homeLead}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
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

            {/* the catalogue — a rail on a phone, a grid on a desk */}
            <section className="mt-10 sm:mt-12">
                <div className="mb-4 flex items-end justify-between gap-4 border-b border-border pb-3">
                    <div>
                        <div className="eyebrow">{t.recordsEyebrow}</div>
                        <h2 className="mt-2">{t.recordsTitle}</h2>
                    </div>
                    <span className="data shrink-0 pb-1 text-muted-foreground">
                        <StatCounter value={records.length} label={t.recordsCount} /> ·
                        <StatCounter value={tagCount} label={t.tagsCount} />
                    </span>
                </div>
                <RecordGallery records={records} />
            </section>

            {/* the dyes — one line of materials, not a section */}
            <section className="mt-10 border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="eyebrow shrink-0">{t.dyeEyebrow}</div>
                    <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        {DYES.map((dye) => (
                            <li
                                key={dye.name}
                                className="flex items-center gap-2"
                                title={dye.note}
                            >
                                <span
                                    aria-hidden
                                    className="h-5 w-5 shrink-0 rounded-sm shadow-[var(--ring)]"
                                    style={{ background: dye.hex }}
                                />
                                <span className="text-[15px]">{dye.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* one chapter: what a passport is, and the path it follows */}
            <section
                className="ink-band cloth mt-10 rounded-xl px-6 py-9 sm:mt-14 sm:px-10 sm:py-12"
                data-theme="dark"
            >
                <div className="eyebrow">{t.journeyEyebrow}</div>
                <RevealText
                    as="h2"
                    className="mt-3 max-w-[24ch] text-white"
                    text={t.journeyTitle}
                />
                <p className="mt-2 max-w-[48ch] text-[15px] text-white/70">
                    {t.journeyLead}
                </p>

                <JourneyRail className="mt-5" tone="ink" autoPlay />

                <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-3">
                    {t.explain.map((item) => (
                        <div key={item.title} className="border-t border-white/18 pt-3">
                            <dt className="text-[11px] tracking-[.2em] uppercase text-salmon">
                                {item.title}
                            </dt>
                            <dd className="mt-1.5 text-[15px] leading-snug text-white/72">
                                {item.body}
                            </dd>
                        </div>
                    ))}
                </dl>

                {/* the story earns its length, so it is offered, not imposed */}
                <Reveal tone="ink" summary="Why this matters" className="mt-7">
                    <p>
                        In Adonara a weaver&apos;s name rarely appears anywhere: the
                        cloth is sold, the motifs are photographed, the price is noted,
                        the name is not. Yet one length can mean eleven weeks of work,
                        three dye baths, and a motif only certain families may wear.
                    </p>
                    <p>
                        This record writes the name down. Every cloth that leaves the
                        garden and the loom carries one page: who made it, from what,
                        for how long. That page goes wherever the cloth goes.
                    </p>
                </Reveal>

                <p className="mt-8 border-t border-white/18 pt-4 text-[12px] tracking-[.12em] uppercase text-white/50">
                    {brand} · All rights reserved · Confidential
                </p>
            </section>

            <ThreadRule className="mt-10 h-2 w-full text-stone" aria-hidden />
        </>
    );
}
