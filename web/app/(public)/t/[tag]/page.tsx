import Link from "next/link";
import { redirect } from "next/navigation";
import { resolveTag } from "@/lib/tags";
import { t } from "@/lib/copy";
import { ThreadRule } from "@/components/motif/marks";

export const dynamic = "force-dynamic";

/**
 * The NFC / QR landing route.
 *
 * A tag is written with exactly one URL: `${NEXT_PUBLIC_SITE_URL}/t/<TAG_CODE>`.
 * The code is resolved against data/tags.json and forwarded to the record, so a
 * tag can be re-pointed without rewriting the physical chip.
 */
export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;
    const resolved = resolveTag(tag);

    if (resolved) {
        redirect(`/record/${resolved.record.code}?tag=${encodeURIComponent(tag)}`);
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="eyebrow">Tag belum dikenali</div>
            <h1 className="mt-4">Tag ini belum tersambung ke sebuah jejak.</h1>
            <p className="mt-4 max-w-[52ch] text-[17px] text-muted-foreground">
                Tag terbaca <span className="data text-ink">{tag}</span>. Kodenya
                belum ada di daftar, atau kainnya belum dicatat.
            </p>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <div className="eyebrow">Cara lain membacanya</div>
                    <p className="mt-3 text-[16px] text-muted-foreground">
                        Ketik kode yang tercetak di sebelah tag.
                    </p>
                    <Link href="/scan" className="mt-4 inline-block text-[14px]">
                        Buka pembacanya →
                    </Link>
                </div>
                <div className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <div className="eyebrow">Tim lapangan</div>
                    <p className="mt-3 text-[16px] text-muted-foreground">
                        Tambahkan kodenya ke{" "}
                        <span className="data text-ink">data/tags.json</span> beserta
                        jejak yang harus dibuka, lalu deploy ulang.
                    </p>
                </div>
            </div>

            <ThreadRule className="mt-12 h-2 w-full text-stone" aria-hidden />

            <Link
                href="/"
                className="mt-6 inline-block text-[14px] text-muted-foreground hover:text-ink"
            >
                ← {t.backToRecords}
            </Link>
        </div>
    );
}