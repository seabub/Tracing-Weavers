import Link from "next/link";
import LoginForm from "@/components/login-form";
import { brand, siteUrl } from "@/lib/brand";
import { t } from "@/lib/copy";
import { PartnerNodes, WarpField } from "@/components/motif/marks";

export const metadata = { title: "Buka paspor saya" };

export default function Login() {
    return (
        <div className="grid min-h-screen md:grid-cols-2">
            {/* ink panel: the wordmark set in type, threads as the only ground */}
            <div
                className="ink-band cloth relative hidden flex-col justify-between overflow-hidden p-10 md:flex"
                data-theme="dark"
            >
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                <div className="eyebrow relative">
                    {brand} · {t.brandLine}
                </div>

                <div className="relative max-w-md">
                    <h1 className="text-[clamp(2rem,3.4vw,2.75rem)] text-white">
                        Pengetahuan penenun, dicatat dengan nama.
                    </h1>
                    <p className="mt-5 text-[17px] text-white/75">
                        Masuk untuk membaca jejak sebuah kain dan menyimpan paspor
                        yang terbit untukmu.
                    </p>
                </div>

                <div className="relative flex items-center gap-4">
                    <PartnerNodes className="h-7 w-32 text-salmon" aria-hidden />
                    <span className="text-[12px] uppercase tracking-[.12em] text-white/50">
                        ICM × TBN × Torajamelo
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
                <div className="mx-auto w-full max-w-sm">
                    <div className="eyebrow">{t.signInEyebrow}</div>
                    <h2 className="mt-3">{t.signInTitle}</h2>
                    <p className="mt-3 text-[17px] text-muted-foreground">{t.signInLead}</p>

                    <div className="mt-7 rounded-lg bg-card p-6 shadow-[var(--ring)]">
                        <LoginForm />
                    </div>

                    <Link
                        href="/"
                        className="mt-6 inline-block text-[14px] text-muted-foreground hover:text-ink"
                    >
                        Baca jejak tanpa masuk →
                    </Link>

                    <p className="data mt-8 text-muted-foreground">
                        {siteUrl.replace(/^https?:\/\//, "")}
                    </p>
                </div>
            </div>
        </div>
    );
}