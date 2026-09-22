import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { passportStore } from "@/lib/store";
import { brand } from "@/lib/brand";

export default function Footer() {
    const year = new Date().getFullYear();
    const backend = passportStore().backend;

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="grid gap-8 sm:grid-cols-3">
                    <div>
                        <div className="eyebrow">What this is</div>
                        <p className="mt-3 max-w-[34ch] text-base text-muted-foreground">
                            {brand} — a record of provenance attached to a
                            physical product. Tap the tag, read where it came
                            from, claim it as yours.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">No chain</div>
                        <p className="mt-3 text-base text-muted-foreground">
                            No wallet, no token to trade, no gas. A passport is
                            a signed record in this app, held against your name.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Records</div>
                        <p className="mt-3 text-base text-muted-foreground">
                            {records.length} record
                            {records.length === 1 ? "" : "s"} · {tagCount} tags
                            registered · store: {backend}
                        </p>
                        <Link
                            href="/scan"
                            className="mt-3 inline-block text-[12px] uppercase tracking-[.18em]"
                        >
                            Read a tag →
                        </Link>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-[12px] uppercase tracking-[.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>© {year} {brand} · targets, not promises</span>
                    <span>[CONTACT NAME · EMAIL]</span>
                </div>
            </div>
        </footer>
    );
}