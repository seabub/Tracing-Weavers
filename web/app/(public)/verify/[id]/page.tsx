import Link from "next/link";
import { getRecord } from "@/lib/records";
import { passportStore } from "@/lib/store";
import { readPassportToken } from "@/lib/passport";
import { PassportCard } from "@/components/passport/PassportCard";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/copy";
import { CornerBrackets, ValueLoop } from "@/components/motif/marks";
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

    const passport = stored ?? (fromToken ? { ...fromToken, status: "issued" as const } : null);

    if (!passport) {
        return (
            <div className="mx-auto max-w-2xl">
                <div className="eyebrow">Tidak ditemukan</div>
                <h1 className="display mt-5 text-3xl">{t.verifyMissing}</h1>
                <p className="mt-5 max-w-[48ch] text-base text-muted-foreground">
                    {t.verifyMissingNote}{" "}
                    <span className="font-medium text-foreground">
                        DPP-BT0042-0001-XXXX
                    </span>
                    .
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block text-[12px] uppercase tracking-[.18em]"
                >
                    ← {t.backToRecords}
                </Link>
            </div>
        );
    }

    const record = getRecord(passport.code);

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
                <Badge variant={stored ? "positive" : "amber"}>
                    {stored ? t.verifyStored : t.verifySignature}
                </Badge>
                {passport.status === "revoked" && <Badge>Dicabut</Badge>}
            </div>

            <PassportCard passport={passport} record={record} />

            <div className="cloth relative overflow-hidden rounded-xl border border-border bg-card p-6">
                <CornerBrackets
                    aria-hidden
                    className="pointer-events-none absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] text-stone"
                />
                <div className="relative">
                    <div className="flex items-start justify-between gap-6">
                        <div className="eyebrow">{t.verifyProves}</div>
                        <ValueLoop className="h-10 w-20 text-stone" aria-hidden />
                    </div>
                    <p className="mt-3 max-w-[62ch] text-base text-muted-foreground">
                        {stored
                            ? "Paspor ini diterbitkan oleh aplikasi ini dan tercatat atas nama yang tertera. Jejak yang ditunjuknya ada di berkas data aplikasi, jadi keduanya bisa dicocokkan."
                            : "Daftar tidak mengembalikan id ini — mungkin penyimpanannya belum disiapkan pada deployment ini, atau id-nya datang dari tempat lain. Tanda tangan pada tautannya tetap menunjukkan paspor ini terbit dari aplikasi ini; buka jejaknya untuk mencocokkan pemegangnya."}
                    </p>
                    {record && (
                        <Link
                            href={`/record/${record.code}`}
                            className="mt-5 inline-block text-[12px] uppercase tracking-[.18em]"
                        >
                            {t.recordEyebrow} →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}