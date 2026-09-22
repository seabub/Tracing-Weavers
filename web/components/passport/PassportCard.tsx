import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Passport } from "@/lib/types";
import type { ProductRecord } from "@/lib/records";
import { siteUrl } from "@/lib/brand";

const issuedOn = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

/** The passport as an artefact: a hairline record card with a seal, the id in
 *  display type and a verify link that can be read off a screen or a print. */
export function PassportCard({
    passport,
    record,
}: {
    passport: Passport;
    record?: ProductRecord;
}) {
    const revoked = passport.status === "revoked";

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_10px_rgba(32,30,29,.05)]">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="eyebrow">{revoked ? "Revoked" : "Passport"}</div>
                <Badge variant={revoked ? "default" : "accent"}>
                    {revoked ? "Revoked" : "Issued once"}
                </Badge>
            </div>

            <h3 className="display mt-3 text-2xl">{passport.id}</h3>

            <div className="mt-4 space-y-3 text-sm">
                <Row label="Held by" value={passport.holder} />
                {passport.outlet && <Row label="Organisation" value={passport.outlet} />}
                <Row
                    label="Record"
                    value={
                        record
                            ? `${record.title.split(" · ")[0]} · ${passport.code}`
                            : passport.code
                    }
                />
                {record?.subtitle && <Row label="Origin" value={record.subtitle} />}
                <Row label="Serial" value={`${passport.serial} of ${record?.supply ?? "—"}`} />
                <Row label="Issued" value={issuedOn(passport.issuedAt)} />
                {passport.tags?.length ? (
                    <Row label="Tag read" value={passport.tags.join(", ")} />
                ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
                <Link
                    href={`/verify/${passport.id}`}
                    className="text-[12px] uppercase tracking-[.18em]"
                >
                    Verify →
                </Link>
                {record && (
                    <Link
                        href={`/record/${record.code}`}
                        className="text-[12px] uppercase tracking-[.18em]"
                    >
                        Read the record →
                    </Link>
                )}
            </div>

            <p className="mt-4 text-[12px] uppercase tracking-[.12em] text-muted-foreground">
                {siteUrl}/verify/{passport.id}
            </p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4 border-t border-border pt-2.5">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium">{value}</span>
        </div>
    );
}