import Link from "next/link";
import { notFound } from "next/navigation";
import { attr, getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { currentIdentity } from "@/lib/session";
import { resolveTag } from "@/lib/tags";
import { PassportClaim } from "@/components/passport/PassportClaim";
import { RecordTraits } from "@/components/records/RecordTraits";
import { PassportCard } from "@/components/passport/PassportCard";
import { Badge } from "@/components/ui/badge";

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

    return (
        <>
            <Link
                href="/"
                className="mb-8 inline-flex items-center text-[12px] uppercase tracking-[.18em] text-muted-foreground hover:text-bt-red"
            >
                ← All records
            </Link>

            {tagCode && (
                <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <Badge variant="accent">Tag read</Badge>
                    <span className="text-sm">
                        {tagCode}
                        {tagEntry?.position ? ` · ${tagEntry.position}` : ""}
                    </span>
                </div>
            )}

            <div className="grid gap-10 md:grid-cols-2">
                <div>
                    <div className="overflow-hidden rounded-xl border border-border bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={record.image}
                            alt={record.title}
                            className="aspect-square w-full object-cover"
                            draggable={false}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <div className="eyebrow">{record.collection ?? "Record"}</div>
                        <h1 className="display mt-4 text-3xl sm:text-4xl">
                            {record.title}
                        </h1>
                        {record.subtitle && (
                            <p className="mt-3 text-[13px] uppercase tracking-[.14em] text-muted-foreground">
                                {record.subtitle}
                            </p>
                        )}
                        <p className="mt-4 text-base text-muted-foreground">
                            {record.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                        <Field label="Record" value={record.code} />
                        <Field
                            label="Supply"
                            value={record.supply > 1 ? `${record.supply} holders` : "1 of 1"}
                        />
                        <Field label="Issued" value={String(issued.length)} />
                        <Field label="Maker" value={String(attr(record, "Maker") ?? "—")} />
                    </div>

                    {mine ? (
                        <div className="space-y-3">
                            <div className="eyebrow">Your passport</div>
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
        </>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-t border-border pt-2.5">
            <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                {label}
            </span>
            <p className="mt-1 font-medium">{value}</p>
        </div>
    );
}