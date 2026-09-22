import Link from "next/link";
import { notFound } from "next/navigation";
import { attr, getRecord, recordVisual } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { currentIdentity } from "@/lib/session";
import { resolveTag } from "@/lib/tags";
import { t } from "@/lib/copy";
import { safeDecode } from "@/lib/safe";
import { PassportClaim } from "@/components/passport/PassportClaim";
import { PassportLeaf } from "@/components/passport/passport-leaf";
import { ClaimBar } from "@/components/passport/claim-bar";
import { RecordTraits } from "@/components/records/RecordTraits";
import { ClothTabs } from "@/components/cloth-tabs";
import { JourneyStrip } from "@/components/journey-strip";
import { CornerBrackets, ThreadRule } from "@/components/motif/marks";
import { Reveal } from "@/components/ui/reveal";
export const dynamic = "force-dynamic";

/* The fact table of a record: Indonesian label, English gloss, and the source
   attribute. Same order as the artwork, so the card and the page agree. */
const FACTS: string[] = [
    "Maker",
    "Origin",
    "Material",
    "Technique",
    "Dye",
    "Weeks on the loom",
    "Dye baths",
];

/**
 * LEARN surface with one Configure action: where an NFC tap lands, on a phone,
 * one-handed. The artwork leads (it is the object), the facts follow as
 * hairline rows, and the claim is reachable by thumb. On desktop the cloth
 * stays put while the story scrolls beside it.
 */
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
    /* Two queries on purpose: `issued` is the row list the holder is matched
       against (any status), while the quota counts only what the claim path
       counts — a revoked passport must not read as "sold out" while the API
       would still issue. */
    const issued = await store.listByRecord(record.code);
    const issuedCount = await store.issuableCount(record.code);
    const remaining = Math.max(record.supply - issuedCount, 0);
    const identity = await currentIdentity();

    const tagCode = tag ? safeDecode(tag).trim().toUpperCase() : undefined;
    const tagEntry = tag ? resolveTag(tag)?.entry : undefined;

    const mine = identity
        ? issued.find(
              (p) =>
                  (p.email ?? "").trim().toLowerCase() ===
                  identity.email.trim().toLowerCase(),
          )
        : undefined;

    const maker = String(attr(record, "Maker") ?? record.title.split(" · ")[0]);
    const step = attr(record, "Journey step");
    const soldOut = remaining <= 0;

    return (
        <div className={mine ? undefined : "pb-28 lg:pb-0"}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                    href="/"
                    className="inline-block min-h-6 py-1 text-[14px] text-muted-foreground hover:text-ink"
                >
                    ← {t.backToRecords}
                </Link>
                {tagCode && (
                    <span className="data text-bt-red">
                        {t.tagRead}: {tagCode}
                        {tagEntry?.position ? ` · ${tagEntry.position}` : ""}
                    </span>
                )}
            </div>

            <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
                {/* the cloth, and what it is made of */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <figure className="relative overflow-hidden rounded-xl bg-ink shadow-[var(--ring)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={recordVisual(record)}
                            alt={record.title}
                            className="aspect-4/5 w-full object-cover"
                            draggable={false}
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent px-5 pt-24 pb-6">
                            <div className="data text-[13px] text-salmon">{record.code}</div>
                            <div className="display mt-2 text-[clamp(1.7rem,6vw,2.15rem)] text-white">
                                {maker}
                            </div>
                            <div className="mt-2 text-[15px] text-white/75">
                                {String(attr(record, "Origin") ?? "")}
                                {record.supply > 1
                                    ? ` · ${t.supplyShared.replace("{n}", String(record.supply))}`
                                    : ` · ${t.supplyUnique}`}
                            </div>
                        </figcaption>
                    </figure>
                    {record.photoCredit && (
                        <p className="mt-3 text-[13px] text-ink-2">
                            Photo: {record.photoCredit}
                        </p>
                    )}

                    <ClothTabs
                        className="mt-6"
                        items={[
                            {
                                id: "material",
                                label: "Material",
                                body: (
                                    <>
                                        <span className="text-ink">
                                            {String(attr(record, "Material") ?? "Not recorded yet")}
                                        </span>{" "}
                                        from community gardens, dyed without synthetic thread.
                                    </>
                                ),
                            },
                            {
                                id: "technique",
                                label: "Technique",
                                body: (
                                    <>
                                        <span className="text-ink">
                                            {String(attr(record, "Technique") ?? "Not recorded yet")}
                                        </span>. The warp is tied and dyed before weaving, so the pattern appears as the cloth does. One weaver, one loom, one length.
                                    </>
                                ),
                            },
                            {
                                id: "motif",
                                label: "Motif",
                                gloss: "What the motif may tell",
                                body: (
                                    <>
                                        This motif is worn at family ceremonies. The community decides how much may be recorded; the rest stays with the weaver.
                                    </>
                                ),
                            },
                        ]}
                    />
                </div>

                {/* the story, the facts, the action */}
                <div className="space-y-9">
                    <header>
                        <div className="eyebrow">{record.collection ?? "Jejak"}</div>
                        <h1 className="mt-3">{record.title.split(" · ")[0]}</h1>
                        {record.subtitle && (
                            <p className="mt-2 text-[14px] uppercase tracking-[.14em] text-muted-foreground">
                                {record.subtitle}
                            </p>
                        )}
                        <p className="mt-4 max-w-[58ch] text-[17px] text-muted-foreground">
                            {record.description}
                        </p>
                    </header>

                    <dl>
                        {FACTS.map((key) => {
                            const value = attr(record, key);
                            if (value === undefined) return null;
                            return (
                                <div
                                    key={key}
                                    className="flex items-baseline justify-between gap-6 border-t border-border py-3"
                                >
                                    <dt className="label">{key}</dt>
                                    <dd className="num text-right text-[17px]">
                                        {String(value)}
                                    </dd>
                                </div>
                            );
                        })}
                        <div className="flex items-baseline justify-between gap-6 border-t border-border py-3">
                            <dt className="label">{t.issued}</dt>
                                                        <dd className="num text-right text-[17px]">
                                {issuedCount} / {record.supply}
                            </dd>
                        </div>
                    </dl>

                    {mine ? (
                        <div className="space-y-4">
                            <div className="eyebrow">{t.yourPassport}</div>
                            <PassportLeaf passport={mine} record={record} className="max-w-md" />
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

            {/* where this piece sits in the three-year path */}
            <section className="mt-16">
                <ThreadRule className="h-2 w-full text-stone" aria-hidden />
                <div className="mt-8">
                    <div className="eyebrow">{t.journeyEyebrow}</div>
                    <h2 className="mt-3">{t.journeyTitle}</h2>
                    <Reveal summary="See the seven stages" className="mt-4">
                        <JourneyStrip
                            activeStep={step ? String(step) : undefined}
                            className="mt-2"
                        />
                    </Reveal>
                </div>
            </section>

            {/* thumb-reachable action, phone only, only while it is useful */}
            {!mine && <ClaimBar remaining={remaining} soldOut={soldOut} />}
        </div>
    );
}