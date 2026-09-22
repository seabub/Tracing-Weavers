import Link from "next/link";
import LoginForm from "@/components/login-form";
import { brand, siteUrl } from "@/lib/brand";
import { t } from "@/lib/copy";
import { WarpField, PartnerNodes } from "@/components/motif/marks";

export const metadata = { title: "Buka paspor saya" };

export default function Login() {
    return (
        <div className="grid min-h-screen md:grid-cols-2">
            {/* ink panel: the wordmark set in type, threads as the only ground */}
            <div className="ink-band cloth relative hidden flex-col justify-between overflow-hidden p-12 md:flex" data-theme="dark">
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/12" />
                <div className="relative eyebrow">{brand} · {t.brandLine}</div>

                <div className="relative">
                    <h1 className="display text-5xl">
                        Pengetahuan penenun,
                        <br />
                        dicatat dengan nama.
                    </h1>
                    <p className="mt-6 max-w-[38ch] text-base text-white/75">
                        Masuk untuk membaca jejak sebuah kain dan menyimpan
                        paspor yang terbit untukmu.
                    </p>
                </div>

                <div className="relative flex items-center gap-4">
                    <PartnerNodes className="h-8 w-40 text-salmon" aria-hidden />
                    <span className="text-[12px] uppercase tracking-[.12em] text-white/50">
                        ICM × TBN × Torajamelo
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
                <div className="mx-auto w-full max-w-md">
                    <div className="eyebrow">{t.signInEyebrow}</div>
                    <h2 className="display mt-4 text-3xl">{t.signInTitle}</h2>
                    <p className="mt-3 text-base text-muted-foreground">{t.signInLead}</p>

                    <div className="cloth mt-8 rounded-xl border border-border bg-card p-6">
                        <LoginForm />
                    </div>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-[12px] uppercase tracking-[.18em] text-muted-foreground">
                            atau
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <Link
                        href="/"
                        className="pressable inline-block rounded-lg border border-stone px-5 py-3 text-[13px] font-medium uppercase tracking-[.12em] hover:border-ink hover:bg-white"
                    >
                        Baca jejak tanpa masuk
                    </Link>

                    <p className="footnote mt-8">{siteUrl.replace(/^https?:\/\//, "")}</p>
                </div>
            </div>
        </div>
    );
}