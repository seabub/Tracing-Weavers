import { records } from "@/lib/records";
import { brand } from "@/lib/brand";
import { ThreadRule, TallyMarks } from "@/components/motif/marks";

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-border sm:mt-16">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-[48ch]">
                        <div className="eyebrow">{brand}</div>
                        <p className="mt-2 text-[15px] leading-snug text-muted-foreground">
                            Tracing every thread back to the hands that wove it.
                            A digital record for handwoven cloth from Adonara,
                            Lembata and Manggarai — one page per weave, from
                            seed to loom and beyond.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-[15px] text-muted-foreground sm:pt-5">
                        <TallyMarks className="h-4 w-16 text-bt-red" aria-hidden />
                        <span className="num">
                            {records.length} records across four collections
                        </span>
                    </div>
                </div>

                <ThreadRule className="mt-6 h-2 w-full text-stone" aria-hidden />

                <p className="mt-4 text-[12px] tracking-[.12em] uppercase text-muted-foreground">
                    &copy; {brand} &middot; All rights reserved &middot; Confidential &middot; Adonara &middot; Lembata &middot; Manggarai
                </p>
            </div>
        </footer>
    );
}