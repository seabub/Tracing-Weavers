import Link from "next/link";
import { getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { readPassportToken } from "@/lib/passport";
import { PassportCard } from "@/components/passport/PassportCard";
import { Badge } from "@/components/ui/badge";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Verify" };

/**
 * Verification, two ways:
 *  · the store knows the id (the normal case) → show the issued passport
 *  · a holder presents ?t=<token> and the store is empty or elsewhere → the
 *    signature still proves the passport was issued here, without a database.
 */
export default async function VerifyPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ t?: string }>;
}) {
    const { id } = await params;
    const { t } = await searchParams;

    const stored = await passportStore().get(decodeURIComponent(id));
    const fromToken = t ? (readPassportToken(t) as Passport | null) : null;

    const passport = stored ?? (fromToken ? { ...fromToken, status: "issued" as const } : null);

    if (!passport) {
        return (
            <div className="mx-auto max-w-2xl">
                <div className="eyebrow">Not found</div>
                <h1 className="display mt-5 text-3xl">
                    No passport with this id.
                </h1>
                <p className="mt-5 max-w-[48ch] text-base text-muted-foreground">
                    Check the characters, or open the record and read the tag
                    again. Passports look like{" "}
                    <span className="font-medium text-foreground">
                        DPP-BT0042-0001-XXXX
                    </span>
                    .
                </p>
                <Link href="/" className="mt-6 inline-block text-[12px] uppercase tracking-[.18em]">
                    ← All records
                </Link>
            </div>
        );
    }

    const record = getRecord(passport.code);

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
                <Badge variant={stored ? "positive" : "amber"}>
                    {stored ? "Verified in the register" : "Verified by signature only"}
                </Badge>
                {passport.status === "revoked" && <Badge>Revoked</Badge>}
            </div>

            <PassportCard passport={passport} record={record} />

            <div className="rounded-xl border border-border bg-card p-6">
                <div className="eyebrow">What this page proves</div>
                <p className="mt-3 text-base text-muted-foreground">
                    {stored
                        ? "This passport was issued by this app and is held in its register against the name shown. The record it points at is in the app's own data file, so the two can be checked against each other."
                        : "The register did not return this id — either the store is not configured on this deployment, or the id came from somewhere else. The signature in the link still shows the passport was issued by this app; open the record to cross-check the holder."}
                </p>
                {record && (
                    <Link
                        href={`/record/${record.code}`}
                        className="mt-5 inline-block text-[12px] uppercase tracking-[.18em]"
                    >
                        Open the record →
                    </Link>
                )}
            </div>
        </div>
    );
}