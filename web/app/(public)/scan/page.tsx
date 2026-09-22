import { NfcReader } from "@/components/nfc/nfc-reader";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { tagCount } from "@/lib/tags";
import { siteUrl } from "@/lib/brand";
import { t } from "@/lib/copy";
import { ThreadRule, WarpField, WeftCrossing } from "@/components/motif/marks";
import { Reveal } from "@/components/ui/reveal";

export const metadata = { title: "Tempel tag" };

const STEPS = [
    {
        title: "Cari tag-nya",
        body: "Chip NTAG213 dijahit di tepi kain; QR cadangan ada di kemasan.",
    },
    {
        title: "Tempelkan ponsel",
        body: "iPhone membacanya dari layar kunci. Android: aktifkan NFC, tempel, lalu tap notifikasi.",
    },
    {
        title: "Tap banner-nya",
        body: "Isinya tautan ke jejak kainnya. Tanpa aplikasi, tanpa akun.",
    },
    {
        title: "Baca, lalu klaim",
        body: "Penenunnya siapa, bahannya apa, berapa lama. Taruh namamu di sana, paspornya jadi milikmu.",
    },
];

/* CONFIGURE surface: how to do the one thing, then the two ways to do it. */
export default function ScanPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <header>
                <div className="eyebrow">{t.scanEyebrow}</div>
                <h1 className="mt-4">
                    {t.scanTitleA} <span className="text-bt-red">{t.scanTitleB}</span>
                </h1>
                <p className="mt-4 max-w-[54ch] text-[17px] text-muted-foreground">
                    {tagCount} {t.scanLead}
                </p>
            </header>

            <WeftCrossing className="mt-10 h-14 w-full text-stone" aria-hidden />

            <ol className="mt-8">
                {STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-5 border-t border-border py-4">
                        <span className="data w-6 shrink-0 pt-1 text-bt-red">
                            {"0" + (i + 1)}
                        </span>
                        <span>
                            <span className="block text-[19px] leading-tight">
                                {step.title}
                            </span>
                            <span className="mt-1 block text-[16px] text-muted-foreground">
                                {step.body}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>

            <div className="mt-10 grid gap-5">
                <NfcReader />

                <div className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <div className="eyebrow">Kode tag</div>
                    <p className="mt-3 text-[17px] text-muted-foreground">
                        Tag tidak terbaca? Ketik kode yang tercetak di sebelahnya.
                    </p>
                    <TagLookupForm className="mt-5 max-w-md" />
                </div>

                <div
                    className="ink-band cloth relative overflow-hidden rounded-lg p-6"
                    data-theme="dark"
                >
                    <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                    <div className="relative">
                        <div className="eyebrow">Untuk tim lapangan</div>
                        <p className="mt-3 max-w-[60ch] text-[16px] text-white/75">
                            Satu tag, satu URL, satu baris di berkas tag.
                        </p>
                        <Reveal tone="ink" summary="Cara menulis tag" className="mt-4">
                            <p>
                                Tulis tiap tag dengan{" "}
                                <code className="data text-salmon">
                                    {siteUrl}/t/&lt;KODE_TAG&gt;
                                </code>{" "}
                                sebagai NDEF URI, lalu tambahkan kodenya ke{" "}
                                <code className="data text-salmon">data/tags.json</code>.
                                Daftar URL-nya keluar dari{" "}
                                <code className="data text-salmon">npm run nfc:urls</code>.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>

            <ThreadRule className="mt-14 h-2 w-full text-stone" aria-hidden />
        </div>
    );
}