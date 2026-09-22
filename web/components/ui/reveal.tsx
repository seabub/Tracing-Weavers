import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A disclosure for the copy that earns its length.
 *
 * The visitor should not have to scroll past an explanation to reach the cloth.
 * Anything longer than a line lives behind this: whoever wants the story opens
 * it on purpose, and whoever does not, never sees it.
 *
 * Native <details>/<summary> on purpose — keyboard operation, screen-reader
 * semantics and in-page search all work without a line of JavaScript, and the
 * marker is hidden so it reads as a quiet text link, matching "Baca jejaknya →".
 */
export function Reveal({
    summary,
    children,
    tone = "paper",
    className,
}: {
    summary: string;
    children: ReactNode;
    tone?: "paper" | "ink";
    className?: string;
}) {
    return (
        <details
            className={cn(
                "group border-t pt-3",
                tone === "ink" ? "border-white/18" : "border-border",
                className,
            )}
        >
            <summary
                className={cn(
                    "flex w-fit cursor-pointer list-none items-center gap-2 text-[14px] transition-colors duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] [&::-webkit-details-marker]:hidden",
                    tone === "ink"
                        ? "text-white/70 hover:text-white"
                        : "text-muted-foreground hover:text-ink",
                )}
            >
                <span
                    aria-hidden
                    className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-90 motion-reduce:transition-none"
                >
                    →
                </span>
                <span>{summary}</span>
            </summary>

            <div
                className={cn(
                    "mt-3 max-w-[62ch] space-y-3 text-[16px] leading-relaxed",
                    tone === "ink" ? "text-white/72" : "text-muted-foreground",
                )}
            >
                {children}
            </div>
        </details>
    );
}