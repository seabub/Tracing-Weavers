import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { currentIdentity } from "@/lib/session";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { Button } from "@/components/ui/button";

/* Solid ground, hairline rule, and a selvedge under it — the header's only
   ornament. No blur, no glass: the cloth is opaque. */
export default async function Header() {
    const identity = await currentIdentity();

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link href="/" className="flex min-w-0 items-baseline gap-2.5">
                    <span className="display truncate text-[17px] sm:text-[19px]">
                        {brand}
                    </span>
                    <span className="hidden text-[10px] uppercase tracking-[.28em] text-bt-red sm:inline">
                        {t.brandLine}
                    </span>
                </Link>

                <nav className="flex items-center gap-1 sm:gap-3">
                    <Link
                        href="/scan"
                        className="hidden rounded-md px-3 py-2 text-[15px] text-ink-2 hover:text-ink sm:inline"
                    >
                        {t.readTag}
                    </Link>

                    {identity ? (
                        <Link href="/collection">
                            <Button variant="ghost" size="sm" className="gap-2 text-ink">
                                <LayoutGrid className="h-4 w-4" />
                                <span className="hidden sm:inline">{t.myPassports}</span>
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">{t.openPassport}</Button>
                        </Link>
                    )}
                </nav>
            </div>
            <div className="selvedge" aria-hidden />
        </header>
    );
}