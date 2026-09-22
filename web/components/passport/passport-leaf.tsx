import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/copy";
import { siteUrl } from "@/lib/brand";
import type { Passport } from "@/lib/types";
import { recordVisual, type ProductRecord } from "@/lib/records";

const issuedOn = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
    });

/**
 * One leaf of the passport: a square page, the way a passport page is.
 *
 * The square is the point. A record card that grows with its content looks like
 * a web card; a page that is always 1:1 looks like an object you could hold,
 * stack, and turn — which is what the book around it does. So the layout is
 * fixed: artwork band on top, the identity block, four facts, and the address
 * line at the foot. Content that does not fit is dropped, not squeezed.
 */
export function PassportLeaf({
    passport,
    record,
    className,
}: {
    passport: Passport;
    record?: ProductRecord;
    className?: string;
}) {
    const revoked = passport.status === "revoked";

    return (
        <article
            className={`cloth relative flex aspect-square w-full flex-col overflow-hidden rounded-lg bg-card shadow-[var(--ring)] ${className ?? ""}`}
        >
            {/* the cloth itself, as the page's header band */}
            <div className="relative h-[38%] shrink-0 overflow-hidden bg-ink">
                                {record && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={recordVisual(record)}
                        alt={record.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/92 to-transparent px-4 pt-10 pb-3">
                    <span className="data text-[12px] text-salmon">
                        {record?.code ?? passport.code}
                    </span>
                    <Badge variant={revoked ? "default" : "accent"}>
                        {revoked ? "Revoked" : "Issued"}
                    </Badge>
                </div>
            </div>

            {/* the identity block */}
            <div className="flex min-h-0 flex-1 flex-col px-4 pt-3 pb-3 sm:px-5">
                <div className="eyebrow">{revoked ? "Revoked" : "Passport"}</div>
                <p className="data mt-1 text-[13px] break-all text-ink sm:text-[14px]">
                    {passport.id}
                </p>

                <p className="display mt-2 truncate text-[clamp(1.25rem,4.6vw,1.6rem)] leading-tight">
                    {passport.holder}
                </p>
                {passport.outlet && (
                    <p className="truncate text-[14px] text-muted-foreground">
                        {passport.outlet}
                    </p>
                )}

                <dl className="mt-auto">
                    <Row
                        label={t.recordEyebrow}
                        value={record ? record.title.split(" · ")[0] : passport.code}
                    />
                    <Row
                        label="Position"
                        value={`${passport.serial} / ${record?.supply ?? "—"}`}
                    />
                    <Row label={t.claimedIssued} value={issuedOn(passport.issuedAt)} />
                </dl>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-2.5">
                    <Link
                        href={`/verify/${passport.id}`}
                        className="min-h-6 py-1 text-[13px] font-medium text-ink hover:text-bt-red"
                    >
                        Check the passport →
                    </Link>
                    {record && (
                        <Link
                            href={`/record/${record.code}`}
                            className="min-h-6 py-1 text-[13px] text-muted-foreground hover:text-ink"
                        >
                            Read the record →
                        </Link>
                    )}
                </div>
                <span className="data mt-1.5 truncate text-[11px] text-muted-foreground">
                    {siteUrl.replace(/^https?:\/\//, "")}/verify/{passport.id}
                </span>
            </div>
        </article>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline justify-between gap-3 border-t border-border py-1.5 first:border-t-0">
            <dt className="label">{label}</dt>
            <dd className="num truncate text-right text-[14px]">{value}</dd>
        </div>
    );
}