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
                            {brand} — jejak asal-usul yang menempel pada benda
                            fisik. Tempel tag, baca jejaknya, simpan jadi milikmu.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Tanpa rantai blok</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            Tidak ada dompet, tidak ada token untuk dijual, tidak
                            ada gas. Paspor adalah catatan bertanda tangan, tersimpan
                            atas namamu.
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
                            penyimpanan: {backend}
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
                    Foto di halaman ini masih placeholder dari berkas design
                    system — ganti dengan fotografi komunitas berlisensi sebelum
                    dipublikasikan (brief §6). Motif hanya ditampilkan dengan izin
                    komunitas.
                </p>
            </div>
        </footer>
    );
}