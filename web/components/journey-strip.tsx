import { t } from "@/lib/copy";
import { JourneyChain } from "@/components/motif/marks";
import { cn } from "@/lib/utils";

/**
 * The programme's seven steps, in Indonesian with the English word kept
 * alongside (the design system's rule: Indonesian terms stay Indonesian, with
 * a light gloss). `activeStep` highlights where this particular piece sits —
 * the record says which step it is on, so the chain is data, not decoration.
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
    const activeIndex = t.steps.findIndex((s) => norm(s.label) === norm(activeStep ?? ""));

    return (
        <div className={cn(className)}>
            <JourneyChain
                aria-hidden
                className={cn("h-6 w-full", tone === "ink" ? "text-salmon" : "text-bt-red")}
                activeCount={activeIndex < 0 ? t.steps.length : activeIndex}
            />

            <ol className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                {t.steps.map((step, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <li
                            key={step.id}
                            className={cn(
                                "rise border-t pt-3",
                                isActive
                                    ? tone === "ink"
                                        ? "border-salmon"
                                        : "border-bt-red"
                                    : "border-border",
                            )}
                            style={{ ["--i" as string]: String(i) }}
                        >
                            <div
                                className={cn(
                                    "text-[11px] uppercase tracking-[.2em]",
                                    tone === "ink" ? "text-salmon" : "text-bt-red",
                                )}
                            >
                                {"0" + (i + 1)}
                                {isActive ? " · jejak ini" : ""}
                            </div>
                            <div
                                className={cn(
                                    "display mt-2 text-lg uppercase tracking-[.06em]",
                                    tone === "ink" ? "text-white" : "text-ink",
                                )}
                            >
                                {step.id_label}
                                <span
                                    className={cn(
                                        "ml-2 text-[11px] font-normal tracking-[.2em]",
                                        tone === "ink" ? "text-white/55" : "text-ink-3",
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                            <p
                                className={cn(
                                    "mt-2 text-[15px] leading-snug",
                                    tone === "ink" ? "text-white/70" : "text-muted-foreground",
                                )}
                            >
                                {step.note}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}