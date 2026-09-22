import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { readPassportToken } from "@/lib/passport";
import { heldIds } from "@/lib/session";
import { safeDecode } from "@/lib/safe";
import { PassportCard } from "@/components/passport/PassportCard";
import { HoldButton } from "@/components/passport/hold-button";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/copy";
import { ValueLoop } from "@/components/motif/marks";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Check a passport" };

/**
 * Verification, two ways:
 *  · the store knows the id (the normal case) → show the issued passport
 *  · the store is empty or elsewhere and the holder presents ?t=<token> → the
 *    signature still proves the passport was issued here, without a database.
 *
 * The token must be FOR THE ID IN THE URL. Before this, the page took whatever
 * payload the token carried and rendered it under the requested id, so anyone
 * holding one passport could repaint it as any other id. A stored "revoked"
 * also always wins over a token that says "issued".
 *
 * An id that resolves to nothing is a 404 now, not a 200 with an apology.
 */
export default async function VerifyPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ t?: string }>;
}) {
    const { id } = await params;
    const { t: token } = await searchParams;
    const wanted = safeDecode(id).trim();

    const stored = await passportStore()
        .get(wanted)
        .catch(() => null);

    const fromToken = token ? readPassportToken(token) : null;
    const proven = fromToken && fromToken.id === wanted ? fromToken : null;

    const passport: Passport | null =
        stored ?? (proven ? { ...proven, status: "issued" as const } : null);

    if (!passport) notFound();

    const record = getRecord(passport.code);
    const alreadyHeld = (await heldIds()).includes(passport.id);

    return (
        <div className="mx-auto max-w-2xl space-y-7">
            <div className="flex flex-wrap items-center gap-2">
                <h1 className="eyebrow">{t.verifyEyebrow}</h1>
                <Badge variant={stored ? "positive" : "amber"}>
                    {stored ? t.verifyStored : t.verifySignature}
                </Badge>
                {passport.status === "revoked" && <Badge>Revoked</Badge>}
            </div>

            <PassportCard passport={passport} record={record} />

            {!alreadyHeld && (
                <div>
                    <HoldButton id={passport.id} token={token} />
                    <p className="mt-1 text-[13px] text-muted-foreground">
                        Save it so this passport appears in your collection on this device.
                    </p>
                </div>
            )}

            <section className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                <div className="flex items-start justify-between gap-6">
                    <h2 className="eyebrow">{t.verifyProves}</h2>
                    <ValueLoop className="h-9 w-16 text-stone" aria-hidden />
                </div>
                <p className="mt-3 max-w-[62ch] text-[16px] text-muted-foreground">
                    {stored
                        ? "This passport was issued by this app, under the name shown. The record it points at is in the data file, so the two can be checked against each other."
                        : "The register is not answering, but the signature on the link proves this passport was issued by this app. Open the record to match the holder."}
                </p>
                {record && (
                    <Link
                        href={`/record/${record.code}`}
                        className="mt-5 inline-block text-[14px] text-muted-foreground hover:text-ink"
                    >
                        {t.recordEyebrow} →
                    </Link>
                )}
            </section>
        </div>
    );
}