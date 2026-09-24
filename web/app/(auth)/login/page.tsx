import Link from "next/link";
import LoginForm from "@/components/login-form";
import { brand, siteUrl } from "@/lib/brand";
import { PartnerNodes, WarpField } from "@/components/motif/marks";

export const metadata = { title: "Sign in" };

export default async function Login({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>;
}) {
    const { next } = await searchParams;

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            {/* ink panel: the wordmark set in type, threads as the only ground */}
            <div
                className="ink-band cloth relative hidden flex-col justify-between overflow-hidden p-10 md:flex"
                data-theme="dark"
            >
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                <div className="eyebrow relative">
                    {brand} · Trace every thread
                </div>

                <div className="relative max-w-md">
                    <p className="display text-[clamp(2rem,3.4vw,2.75rem)] leading-tight text-white">
                        A certificate needs a name to belong to.
                    </p>
                    <p className="mt-5 text-[17px] text-white/75">
                        Reading a record is open to anyone. Claiming it is not —
                        a certificate saying “issued to you” has to be issued to
                        someone who can be proved.
                    </p>
                </div>

                <div className="relative flex items-center gap-4">
                    <PartnerNodes className="h-7 w-32 text-salmon" aria-hidden />
                    <span className="text-[12px] tracking-[.12em] uppercase text-white/50">
                        ICM × TBN × Torajamelo
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
                <div className="mx-auto w-full max-w-sm">
                    <div className="eyebrow">Account</div>
                    <h1 className="mt-3">Sign in, or make one.</h1>
                    <p className="mt-3 text-[15px] text-muted-foreground">
                        Your certificates are kept under this account, so it
                        needs a password.
                    </p>

                    <div className="mt-7 rounded-lg bg-card p-6 shadow-[var(--ring)]">
                        <LoginForm next={next} />
                    </div>

                    <Link
                        href="/"
                        className="mt-6 inline-block text-[14px] text-muted-foreground hover:text-ink"
                    >
                        Read records without an account →
                    </Link>

                    <p className="num mt-8 text-[12px] tracking-[.06em] uppercase text-muted-foreground">
                        {siteUrl.replace(/^https?:\/\//, "")}
                    </p>
                </div>
            </div>
        </div>
    );
}