import { t } from "@/lib/copy";
import { JourneyChain } from "@/components/motif/marks";
import { cn } from "@/lib/utils";

/**
 * The programme's seven steps in Indonesian with the English word kept
 * alongside. `activeStep` marks where this particular piece sits — the record
 * says which step it is on, so the chain is data, not decoration. Laid out as
 * compact rows: a number, a name, a note. No tiles.
 */
export function JourneyStrip({
    activeStep,
    tone = "light",
    className,
}: {
    activeStep?: string;
    tone?: "light" | "ink";
    className?: string;
}) {
    const norm = (value: string) => value.trim().toLowerCase();
    const activeIndex = t.steps.findIndex((s) => norm(s.id) === norm(activeStep ?? ""));

    return (
        <div className={className}>
            <JourneyChain
                aria-hidden
                className={cn("h-5 w-full", tone === "ink" ? "text-salmon" : "text-bt-red")}
                activeCount={activeIndex < 0 ? t.steps.length : activeIndex}
            />

            <ol className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {t.steps.map((step, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <li
                            key={step.id}
                            className={cn(
                                "flex items-baseline gap-4 border-t py-3",
                                isActive
                                    ? tone === "ink"
                                        ? "border-salmon"
                                        : "border-bt-red"
                                    : "border-border",
                            )}
                        >
                            <span
                                className={cn(
                                    "data w-6 shrink-0",
                                    tone === "ink" ? "text-salmon" : "text-bt-red",
                                )}
                            >
                                {"0" + (i + 1)}
                            </span>
                            <span className="min-w-0">
                                <span
                                    className={cn(
                                        "text-[16px] font-medium uppercase tracking-[.08em]",
                                        tone === "ink" ? "text-white" : "text-ink",
                                    )}
                                >
                                    {step.id_label}
                                </span>
                                                                
                                {isActive && (
                                    <span
                                        className={cn(
                                            "ml-2 text-[12px] uppercase tracking-[.14em]",
                                            tone === "ink" ? "text-salmon" : "text-bt-red",
                                        )}
                                    >
                                                                                · this record
                                    </span>
                                )}
                                <span
                                    className={cn(
                                        "mt-0.5 block text-[15px] leading-snug",
                                        tone === "ink" ? "text-white/70" : "text-muted-foreground",
                                    )}
                                >
                                    {step.note}
                                </span>
                            </span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}