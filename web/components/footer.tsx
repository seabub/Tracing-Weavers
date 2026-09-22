import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import { t } from "@/lib/copy";
import { ThreadRule, TallyMarks } from "@/components/motif/marks";
import { Reveal } from "@/components/ui/reveal";

/* The footer is on every page, so every line of it is paid for four times over
   on a phone. Three stacked paragraphs became two short ones side by side and a
   count; the publishing note stays, folded. */
export default function Footer() {
    return (
        <footer className="mt-12 border-t border-border sm:mt-16">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
                <div className="grid gap-x-10 gap-y-5 sm:grid-cols-3">
                    <div>
                        <div className="eyebrow">The record that travels</div>
                        <p className="mt-2 max-w-[34ch] text-[15px] leading-snug text-muted-foreground">
                            A tag at the edge of the cloth holds one page about the
                            weaver.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">No blockchain</div>
                        <p className="mt-2 max-w-[34ch] text-[15px] leading-snug text-muted-foreground">
                            No wallet, no token, no gas. A signed record kept under
                            your name.
                        </p>
                    </div>

                    <div>
                        <div className="eyebrow">Records written</div>
                        <div className="mt-2 flex items-center gap-3 text-[15px] text-muted-foreground">
                            <TallyMarks className="h-4 w-16 text-bt-red" aria-hidden />
                            <span className="num">
                                {records.length} {t.recordsCount} · {tagCount}{" "}
                                {t.tagsCount}
                            </span>
                        </div>
                    </div>
                </div>

                <ThreadRule className="mt-6 h-2 w-full text-stone" aria-hidden />

                <div className="mt-4 flex flex-col gap-1 text-[12px] tracking-[.12em] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>© {brand} · ICM × TBN × Torajamelo</span>
                    <span>Adonara · Lembata · Manggarai</span>
                </div>

                <Reveal summary="Publishing note" className="mt-3 border-border">
                    Photographs are still placeholders from the design system. Replace
                    them with licensed community photography before publication (brief
                    §6). Motifs appear only with the community&apos;s permission.
                </Reveal>
            </div>
        </footer>
    );
}
