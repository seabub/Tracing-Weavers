import Link from "next/link";
import LoginForm from "@/components/login-form";
import { brand, siteUrl } from "@/lib/brand";

export const metadata = { title: "Open my passport" };

export default function Login() {
    return (
        <div className="grid min-h-screen md:grid-cols-2">
            <div
                className="ink-band hidden flex-col justify-between p-12 md:flex"
                data-theme="dark"
            >
                <div className="eyebrow">{brand} · Seed to Loom</div>

                <div>
                    <h1 className="display text-5xl">
                        Maker knowledge,
                        <br />
                        credited by name.
                    </h1>
                    <p className="mt-6 max-w-[38ch] text-base text-white/75">
                        Sign in to read the record of a product and to keep the
                        passports issued to you.
                    </p>
                </div>

                <p className="text-[12px] uppercase tracking-[.12em] text-white/50">
                    {siteUrl.replace(/^https?:\/\//, "")}
                </p>
            </div>

            <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
                <div className="mx-auto w-full max-w-md">
                    <div className="eyebrow">Sign in</div>
                    <h2 className="display mt-4 text-3xl">
                        No wallet. No password.
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Your name and email are all a passport needs. Use the
                        same email you claimed with.
                    </p>

                    <div className="mt-8 rounded-xl border border-border bg-card p-6">
                        <LoginForm />
                    </div>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-[12px] uppercase tracking-[.18em] text-muted-foreground">
                            or
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <Link
                        href="/"
                        className="inline-block rounded-lg border border-stone px-5 py-3 text-[13px] uppercase tracking-[.12em] font-medium transition-colors hover:border-ink hover:bg-white"
                    >
                        Read a record without signing in
                    </Link>
                </div>
            </div>
        </div>
    );
}