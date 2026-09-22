import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { passportStore } from "@/lib/store";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { ThreadRule, TallyMarks } from "@/components/motif/marks";

export default function Footer() {
    const year = new Date().getFullYear();
    const backend = passportStore().backend;

    return (
        <footer className="mt-20 border-t border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <div className="grid gap-10 sm:grid-cols-3">
                    <div>
                        <div className="eyebrow">Jejak yang menempel</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            Jejak asal-usul yang menempel pada kainnya. Tempel
                            tag, baca namanya, simpan jadi milikmu.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Tanpa rantai blok</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            Tanpa dompet, tanpa token untuk dijual, tanpa gas.
                            Paspor adalah catatan bertanda tangan atas namamu.
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
                        <p className="mt-2 text-[13px] text-muted-foreground/70">
                            disimpan di: {backend}
                        </p>
                    </div>
                </div>

                <ThreadRule className="mt-10 h-2 w-full text-stone" aria-hidden />

                <div className="mt-6 flex flex-col gap-2 text-[13px] uppercase tracking-[.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {year} {brand} · ICM × TBN × Torajamelo
                    </span>
                    <span>Adonara · Lembata · Manggarai</span>
                </div>

                <p className="mt-3 text-[12px] text-muted-foreground/70">
                    Foto masih placeholder dari berkas design system —
                    ganti dengan fotografi komunitas berlisensi sebelum terbit
                    (brief §6). Motif hanya tampil dengan izin komunitas.
                </p>
            </div>
        </footer>
    );
}