import Link from "next/link";
import { getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { readPassportToken } from "@/lib/passport";
import { PassportCard } from "@/components/passport/PassportCard";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/copy";
import { ValueLoop } from "@/components/motif/marks";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Periksa paspor" };

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
    const { t: token } = await searchParams;

    const stored = await passportStore().get(decodeURIComponent(id));
    const fromToken = token ? (readPassportToken(token) as Passport | null) : null;

    const passport =
        stored ?? (fromToken ? { ...fromToken, status: "issued" as const } : null);

    if (!passport) {
        return (
            <div className="mx-auto max-w-2xl">
                <div className="eyebrow">Tidak ditemukan</div>
                <h1 className="mt-4">{t.verifyMissing}</h1>
                <p className="mt-4 max-w-[48ch] text-[17px] text-muted-foreground">
                    {t.verifyMissingNote}{" "}
                    <span className="data text-ink">DPP-BT0042-0001-XXXX</span>.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block text-[14px] text-muted-foreground hover:text-ink"
                >
                    ← {t.backToRecords}
                </Link>
            </div>
        );
    }

    const record = getRecord(passport.code);

    return (
        <div className="mx-auto max-w-2xl space-y-7">
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant={stored ? "positive" : "amber"}>
                    {stored ? t.verifyStored : t.verifySignature}
                </Badge>
                {passport.status === "revoked" && <Badge>Dicabut</Badge>}
            </div>

            <PassportCard passport={passport} record={record} />

            <section className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                <div className="flex items-start justify-between gap-6">
                    <h2 className="eyebrow">{t.verifyProves}</h2>
                    <ValueLoop className="h-9 w-16 text-stone" aria-hidden />
                </div>
                <p className="mt-3 max-w-[62ch] text-[16px] text-muted-foreground">
                    {stored
                        ? "Paspor ini terbit dari aplikasi ini, atas nama yang tertera. Jejak yang ditunjuknya ada di berkas data, jadi keduanya bisa dicocokkan."
                        : "Daftar sedang tidak menjawab, tapi tanda tangan di tautannya membuktikan paspor ini terbit dari aplikasi ini. Buka jejaknya untuk mencocokkan pemegangnya."}
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