import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { ThreadRule, TallyMarks } from "@/components/motif/marks";
import { Reveal } from "@/components/ui/reveal";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <div className="grid gap-10 sm:grid-cols-3">
                    <div>
                        <div className="eyebrow">The record that travels</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            A tag at the edge of the cloth holds one page about the weaver.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">No blockchain</div>
                        <p className="mt-3 max-w-[34ch] text-[17px] text-muted-foreground">
                            No wallet, no token, no gas. A signed record kept under your name.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Records written</div>
                        <div className="mt-3 flex items-center gap-3 text-[17px] text-muted-foreground">
                            <TallyMarks className="h-5 w-20 text-bt-red" />
                            <span className="num">
                                {records.length} {t.recordsCount} · {tagCount} {t.tagsCount}
                            </span>
                        </div>

                    </div>
                </div>

                <ThreadRule className="mt-10 h-2 w-full text-stone" aria-hidden />

                <div className="mt-6 flex flex-col gap-2 text-[13px] uppercase tracking-[.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {year} {brand} · ICM × TBN × Torajamelo
                    </span>
                    <span>Adonara · Lembata · Manggarai</span>
                </div>

                <Reveal summary="Publishing note" className="mt-4 border-border">
                    Photographs are still placeholders from the design system. Replace them with licensed community photography before publication (brief §6). Motifs appear only with the community's permission.
                </Reveal>
            </div>
        </footer>
    );
}