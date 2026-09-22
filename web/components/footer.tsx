import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { ThreadRule, TallyMarks } from "@/components/motif/marks";
import { Reveal } from "@/components/ui/reveal";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <div className="grid gap-10 sm:grid-cols-3">
                    <div>
                        <div className="eyebrow">Jejak yang menempel</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            Tag di tepi kain menyimpan satu halaman tentang
                            penenunnya.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Tanpa rantai blok</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            Tanpa dompet, tanpa token, tanpa gas. Catatan
                            bertanda tangan atas namamu.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Jejak tercatat</div>
                        <div className="mt-3 flex items-center gap-3 text-[17px] text-muted-foreground">
                            <TallyMarks className="h-5 w-20 text-bt-red" />
                            <span className="num">
                                {records.length} jejak · {tagCount} {t.tagsCount}
                            </span>
                        </div>

                    </div>
                </div>

                <ThreadRule className="mt-10 h-2 w-full text-stone" aria-hidden />

                <div className="mt-6 flex flex-col gap-2 text-[13px] uppercase tracking-[.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {year} {brand} · ICM × TBN × Torajamelo
                    </span>
                    <span>Adonara · Lembata · Manggarai</span>
                </div>

                <Reveal summary="Catatan penerbitan" className="mt-4 border-border">
                    Foto masih placeholder dari berkas design system. Ganti dengan
                    fotografi komunitas berlisensi sebelum terbit (brief §6). Motif
                    hanya tampil dengan izin komunitas.
                </Reveal>
            </div>
        </footer>
    );
}