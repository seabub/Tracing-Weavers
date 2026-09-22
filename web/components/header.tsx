import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { currentIdentity } from "@/lib/session";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";

/* No logo file was supplied for the programme, so the mark is set in type —
   the same rule the design system's wordmark guideline follows. */
export default async function Header() {
    const identity = await currentIdentity();

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-baseline gap-3">
                    <span className="display text-lg leading-none sm:text-xl">
                        {brand}
                    </span>
                    <span className="hidden text-[11px] uppercase tracking-[.32em] text-bt-red sm:inline">
                        Seed to Loom
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Link
                        href="/scan"
                        className="hidden text-[12px] uppercase tracking-[.18em] text-ink-2 hover:text-bt-red sm:inline"
                    >
                        Read a tag
                    </Link>

                    {identity ? (
                        <Link href="/collection">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <LayoutGrid className="h-4 w-4" />
                                <span className="hidden sm:inline">My passports</span>
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">Open my passport</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}