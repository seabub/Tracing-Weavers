import { NfcReader } from "@/components/nfc/nfc-reader";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { tagCount } from "@/lib/tags";
import { siteUrl, brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { WarpField, WeftCrossing, ThreadRule } from "@/components/motif/marks";

export const metadata = { title: "Tempel tag" };

const STEPS = [
    {
        title: "Cari tag-nya",
        body: "Chip NTAG213 dijahit di tepi kain atau dicetak di label; QR cadangan ada di kemasan.",
    },
    {
        title: "Tempelkan ponsel",
        body: "iPhone membaca dari layar kunci tanpa aplikasi. Android perlu NFC aktif, lalu tempel dan tap notifikasi.",
    },
    {
        title: "Tap banner-nya",
        body: "Ponsel menawarkan tautan. Isinya hanya kode jejak — tanpa pemasangan aplikasi, tanpa akun.",
    },
    {
        title: "Baca, lalu klaim",
        body: "Jejaknya terbuka: penenun, bahan, lama pengerjaan. Taruh namamu di sana dan paspornya jadi milikmu.",
    },
];

export default function ScanPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <div className="eyebrow">{t.scanEyebrow}</div>
            <h1 className="display mt-5 text-3xl sm:text-5xl">
                {t.scanTitleA}
                <br />
                <span className="text-gradient">{t.scanTitleB}</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-base text-muted-foreground">
                {tagCount} {t.scanLead}
            </p>

            <WeftCrossing className="mt-10 h-16 w-full text-stone" aria-hidden />

            <ol className="mt-10 grid gap-8 sm:grid-cols-2">
                {STEPS.map((step, i) => (
                    <li
                        key={step.title}
                        className="rise border-t border-border pt-4"
                        style={{ ["--i" as string]: String(i) }}
                    >
                        <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                            {"0" + (i + 1)}
                        </div>
                        <div className="display mt-2 text-xl">{step.title}</div>
                        <p className="mt-2 text-base text-muted-foreground">{step.body}</p>
                    </li>
                ))}
            </ol>

            <div className="mt-12 grid gap-6">
                <NfcReader />

                <div className="cloth rounded-xl border border-border bg-card p-6">
                    <div className="eyebrow">Kode tag</div>
                    <p className="mt-3 text-base text-muted-foreground">
                        Tidak bisa membaca tag? Ketik kode yang tercetak di
                        sebelahnya.
                    </p>
                    <TagLookupForm className="mt-5 max-w-md" />
                </div>

                <div className="ink-band cloth relative overflow-hidden rounded-xl p-6" data-theme="dark">
                    <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                    <div className="relative">
                        <div className="eyebrow">Untuk tim lapangan</div>
                        <p className="mt-3 max-w-[60ch] text-base text-white/75">
                            Tulis tiap tag dengan{" "}
                            <code className="text-salmon">
                                {siteUrl}/t/&lt;KODE_TAG&gt;
                            </code>{" "}
                            sebagai NDEF URI, lalu tambahkan kodenya ke{" "}
                            <code className="text-salmon">data/tags.json</code>.
                            Daftar URL-nya keluar dari{" "}
                            <code className="text-salmon">npm run nfc:urls</code>.
                        </p>
                    </div>
                </div>
            </div>

            <ThreadRule className="mt-14 h-2 w-full text-stone" aria-hidden />
            <p className="footnote mt-6">
                {brand} · satu tag, satu jejak, satu kain
            </p>
        </div>
    );
}