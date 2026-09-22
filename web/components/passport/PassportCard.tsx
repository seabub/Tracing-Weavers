import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/copy";
import { siteUrl } from "@/lib/brand";
import type { Passport } from "@/lib/types";
import type { ProductRecord } from "@/lib/records";

const issuedOn = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

/**
 * The passport as an artefact: a numbered record card. The id is set in the
 * data register so it reads as something you could read out loud, quote, or
 * check against a register — which is the whole point of a passport.
 */
export function PassportCard({
    passport,
    record,
}: {
    passport: Passport;
    record?: ProductRecord;
}) {
    const revoked = passport.status === "revoked";

    return (
        <article className="cloth overflow-hidden rounded-lg bg-card shadow-[var(--ring)]">
            {record?.image && (
                <div className="border-b border-border bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={record.image}
                        alt={`Lembar jejak ${record.code}`}
                        className="h-28 w-full object-cover object-top sm:h-32"
                        draggable={false}
                    />
                </div>
            )}
            <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                <div>
                    <div className="eyebrow">{revoked ? "Dicabut" : "Paspor"}</div>
                    <p className="data mt-2 text-[15px] text-ink">{passport.id}</p>
                </div>
                <Badge variant={revoked ? "default" : "accent"}>
                    {revoked ? "Dicabut" : "Terbit"}
                </Badge>
            </header>

            <div className="px-5 py-4">
                <p className="text-[19px] leading-tight">{passport.holder}</p>
                {passport.outlet && (
                    <p className="text-[15px] text-muted-foreground">{passport.outlet}</p>
                )}

                <dl className="mt-4">
                    <Row
                        label={t.recordEyebrow}
                        value={record ? record.title.split(" · ")[0] : passport.code}
                    />
                    {record?.subtitle && <Row label={t.fieldOrigin} value={record.subtitle} />}
                    <Row
                        label="Urutan"
                        value={`${passport.serial} / ${record?.supply ?? "—"}`}
                    />
                    <Row label={t.claimedIssued} value={issuedOn(passport.issuedAt)} />
                    {passport.tags?.length ? (
                        <Row label={t.tagRead} value={passport.tags.join(", ")} />
                    ) : null}
                </dl>
            </div>

            <footer className="flex flex-wrap items-center gap-5 border-t border-border px-5 py-3.5">
                <Link
                    href={`/verify/${passport.id}`}
                    className="text-[14px] font-medium text-ink hover:text-bt-red"
                >
                    Periksa paspor →
                </Link>
                {record && (
                    <Link
                        href={`/record/${record.code}`}
                        className="text-[14px] text-muted-foreground hover:text-ink"
                    >
                        Baca jejaknya →
                    </Link>
                )}
                <span className="data ml-auto hidden text-muted-foreground sm:inline">
                    {siteUrl.replace(/^https?:\/\//, "")}/verify/{passport.id}
                </span>
            </footer>
        </article>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 first:border-t-0">
            <dt className="label">{label}</dt>
            <dd className="num text-right text-[16px]">{value}</dd>
        </div>
    );
}