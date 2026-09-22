import Link from "next/link";
import { currentIdentity } from "@/lib/session";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { Button } from "@/components/ui/button";
import { NavPills } from "@/components/nav-pills";
import { SignOutButton } from "@/components/sign-out-button";

/* Solid ground, hairline rule, and a selvedge under it — the header's only
   ornament. No blur, no glass: the cloth is opaque.

   The three surfaces live in one pill of navigation (components/nav-pills),
   which also tells you where you are — so on a phone the header is a name, a
   pill, and nothing else. */
export default async function Header() {
    const identity = await currentIdentity();

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
                <Link
                    href="/"
                    className="flex min-h-6 min-w-0 shrink items-baseline gap-2.5 py-2"
                >
                    <span className="display truncate text-[16px] sm:text-[19px]">
                        {brand}
                    </span>
                    <span className="hidden text-[10px] tracking-[.28em] uppercase text-bt-red lg:inline">
                        {t.brandLine}
                    </span>
                </Link>

                <div className="flex shrink-0 items-center gap-2">
                    <NavPills />

                    {identity ? (
                        <SignOutButton />
                    ) : (
                        <Button asChild size="sm" className="hidden sm:inline-flex">
                            <Link href="/login">{t.signIn}</Link>
                        </Button>
                    )}
                </div>
            </div>
            <div className="selvedge" aria-hidden />
        </header>
    );
}
