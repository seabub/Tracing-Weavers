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
            <h1 className="display mt-5 text-3xl sm:text-4xl">
                Tag ini belum tersambung
                <br />
                ke sebuah jejak.
            </h1>
            <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
                Tag terbaca{" "}
                <span className="font-medium text-foreground">{tag}</span>. Kodenya
                belum ada di daftar, atau kainnya belum dicatat.
            </p>

            <div className="mt-10 rounded-xl border border-border bg-card p-6">
                <div className="eyebrow">Cara lain membacanya</div>
                <p className="mt-3 text-base text-muted-foreground">
                    Ketik kode yang tercetak di sebelah tag.
                </p>
                <Link
                    href="/scan"
                    className="mt-5 inline-block text-[12px] uppercase tracking-[.18em]"
                >
                    Buka pembacanya →
                </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border-t border-border pt-4">
                    <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                        Tim lapangan
                    </div>
                    <p className="mt-2 text-base text-muted-foreground">
                        Tambahkan kodenya ke{" "}
                        <span className="font-medium">data/tags.json</span> beserta
                        jejak yang harus dibuka, lalu deploy ulang.
                    </p>
                </div>
                <div className="border-t border-border pt-4">
                    <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                        Lihat yang lain
                    </div>
                    <p className="mt-2 text-base text-muted-foreground">
                        <Link href="/">{t.backToRecords} →</Link>
                    </p>
                </div>
            </div>

            <ThreadRule className="mt-12 h-2 w-full text-stone" aria-hidden />
        </div>
    );
}