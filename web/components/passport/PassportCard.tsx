import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CornerBrackets } from "@/components/motif/marks";
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

/** The passport as an artefact: a woven-paper record card, bilingual rows,
 *  corner brackets for a frame, and a verify link you can read off a screen
 *  or a print. */
export function PassportCard({
    passport,
    record,
}: {
    passport: Passport;
    record?: ProductRecord;
}) {
    const revoked = passport.status === "revoked";

    return (
        <div className="cloth relative rounded-xl border border-border bg-card p-6 shadow-[0_2px_10px_rgba(32,30,29,.05)]">
            <CornerBrackets
                aria-hidden
                className="pointer-events-none absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] text-stone"
            />

            <div className="relative flex flex-wrap items-baseline justify-between gap-3">
                <div className="eyebrow">{revoked ? "Dicabut" : "Paspor"}</div>
                <Badge variant={revoked ? "default" : "accent"}>
                    {revoked ? "Dicabut" : "Terbit sekali"}
                </Badge>
            </div>

            <h3 className="display relative mt-3 text-2xl">{passport.id}</h3>

            <div className="relative mt-5 space-y-0 text-sm">
                <Row label={t.claimedHolder} value={passport.holder} />
                {passport.outlet && <Row label="Lembaga" value={passport.outlet} />}
                <Row
                    label={t.recordEyebrow}
                    value={
                        record
                            ? `${record.title.split(" · ")[0]} · ${passport.code}`
                            : passport.code
                    }
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
            </div>

            <div className="relative mt-5 flex flex-wrap gap-5 border-t border-border pt-4">
                <Link
                    href={`/verify/${passport.id}`}
                    className="text-[12px] uppercase tracking-[.18em]"
                >
                    Periksa paspor →
                </Link>
                {record && (
                    <Link
                        href={`/record/${record.code}`}
                        className="text-[12px] uppercase tracking-[.18em]"
                    >
                        Baca jejaknya →
                    </Link>
                )}
            </div>

            <p className="relative mt-4 text-[12px] uppercase tracking-[.12em] text-muted-foreground">
                {siteUrl.replace(/^https?:\/\//, "")}/verify/{passport.id}
            </p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 first:border-t-0">
            <span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                {label}
            </span>
            <span className="text-right font-medium">{value}</span>
        </div>
    );
}