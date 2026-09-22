import Link from "next/link";
import { notFound } from "next/navigation";
import { attr, getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { currentIdentity } from "@/lib/session";
import { resolveTag } from "@/lib/tags";
import { t } from "@/lib/copy";
import { PassportClaim } from "@/components/passport/PassportClaim";
import { RecordTraits } from "@/components/records/RecordTraits";
import { PassportCard } from "@/components/passport/PassportCard";
import { ClothTabs } from "@/components/cloth-tabs";
import { JourneyStrip } from "@/components/journey-strip";
import { Badge } from "@/components/ui/badge";
import { ThreadRule, CornerBrackets } from "@/components/motif/marks";

export const dynamic = "force-dynamic";

export default async function RecordPage({
    params,
    searchParams,
}: {
    params: Promise<{ code: string }>;
    searchParams: Promise<{ tag?: string }>;
}) {
    const { code } = await params;
    const { tag } = await searchParams;

    const record = getRecord(code);
    if (!record) notFound();

    const store = passportStore();
    const issued = await store.listByRecord(record.code);
    const remaining = Math.max(record.supply - issued.length, 0);
    const identity = await currentIdentity();

    const tagCode = tag ? decodeURIComponent(tag).trim().toUpperCase() : undefined;
    const tagEntry = tag ? resolveTag(tag)?.entry : undefined;

    const mine = identity
        ? issued.find(
              (p) =>
                  (p.email ?? "").trim().toLowerCase() ===
                  identity.email.trim().toLowerCase(),
          )
        : undefined;

    const step = attr(record, "Journey step");

    return (
        <>
            <Link
                href="/"
                className="mb-8 inline-flex items-center text-[12px] uppercase tracking-[.18em] text-muted-foreground hover:text-bt-red"
            >
                ← {t.backToRecords}
            </Link>

            {tagCode && (
                <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <Badge variant="accent">{t.tagRead}</Badge>
                    <span className="text-sm">
                        {tagCode}
                        {tagEntry?.position ? ` · ${tagEntry.position}` : ""}
                    </span>
                </div>
            )}

            <div className="grid gap-10 md:grid-cols-2">
                {/* ── the cloth ── */}
                <div>
                    <div className="relative overflow-hidden rounded-xl border border-border bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={record.image}
                            alt={record.title}
                            className="aspect-square w-full object-cover"
                            draggable={false}
                        />
                        <CornerBrackets className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-white/70" />
                    </div>

                    <div className="mt-6">
                        <ClothTabs
                            items={[
                                {
                                    id: "bahan",
                                    label: "Bahan",
                                    gloss: "Material",
                                    body: (
                                        <>
                                            <strong className="font-medium text-foreground">
                                                {String(attr(record, "Material") ?? "—")}
                                            </strong>{" "}
                                            — kapas tumbuh di kebun komunitas,
                                            dipintal dengan tangan, diwarnai tanpa
                                            benang sintetis.
                                        </>
                                    ),
                                },
                                {
                                    id: "teknik",
                                    label: "Teknik",
                                    gloss: "Technique",
                                    body: (
                                        <>
                                            <strong className="font-medium text-foreground">
                                                {String(attr(record, "Technique") ?? "—")}
                                            </strong>{" "}
                                            — benang lusi diikat dan dicelup
                                            sebelum ditenun, sehingga polanya
                                            muncul saat kainnya jadi. Satu
                                            penenun, satu alat tenun, satu helai.
                                        </>
                                    ),
                                },
                                {
                                    id: "motif",
                                    label: "Motif",
                                    gloss: "Apa yang motif boleh ceritakan",
                                    body: (
                                        <>
                                            Motif ini dipakai di upacara keluarga.
                                            Komunitas yang memutuskan bagian mana
                                            yang boleh dicatat dan ditampilkan;
                                            sebagian maknanya tetap tinggal bersama
                                            penenun.
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* ── the record ── */}
                <div className="space-y-10">
                    <div>
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="eyebrow">{record.collection ?? "Jejak"}</span>
                            <span className="footnote">{record.code}</span>
                        </div>
                        <h1 className="display mt-4 text-3xl sm:text-4xl">{record.title}</h1>
                        {record.subtitle && (
                            <p className="mt-3 text-[13px] uppercase tracking-[.14em] text-muted-foreground">
                                {record.subtitle}
                            </p>
                        )}
                        <p className="mt-5 text-base text-muted-foreground">
                            {record.description}
                        </p>
                    </div>

                    <dl className="grid grid-cols-2 gap-x-8">
                        <Field label={t.fieldMaker} value={String(attr(record, "Maker") ?? "—")} />
                        <Field label={t.fieldOrigin} value={String(attr(record, "Origin") ?? "—")} />
                        <Field
                            label="Kuota"
                            value={
                                record.supply > 1
                                    ? t.supplyShared.replace("{n}", String(record.supply))
                                    : t.supplyUnique
                            }
                        />
                        <Field label={t.issued} value={String(issued.length)} />
                    </dl>

                    {mine ? (
                        <div className="space-y-4">
                            <div className="eyebrow">{t.yourPassport}</div>
                            <PassportCard passport={mine} record={record} />
                        </div>
                    ) : (
                        <PassportClaim
                            code={record.code}
                            title={record.title}
                            supply={record.supply}
                            remaining={remaining}
                            identity={identity}
                            tagCode={tagCode}
                        />
                    )}

                    <RecordTraits attributes={record.attributes} />
                </div>
            </div>

            {/* ── where this piece sits in the three-year path ── */}
            <section className="mt-16">
                <ThreadRule className="h-2 w-full text-stone" aria-hidden />
                <div className="mt-10">
                    <div className="eyebrow">{t.journeyEyebrow}</div>
                    <h2 className="display mt-3 text-2xl">{t.journeyTitle}</h2>
                    <JourneyStrip activeStep={step ? String(step) : undefined} className="mt-8" />
                </div>
            </section>
        </>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-t border-border py-3">
            <dt className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                {label}
            </dt>
            <dd className="mt-1 font-medium">{value}</dd>
        </div>
    );
}