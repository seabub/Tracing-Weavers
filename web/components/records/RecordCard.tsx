import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { attr, recordVisual, type ProductRecord } from "@/lib/records";

/**
 * Explore surface: the artwork does the work, the metadata sits under it in
 * two registers — code (machine), title (display), origin (warm
 * grey) — and the action is a quiet text link. Four red buttons in a grid is
 * noise; one hairline and an arrow is enough.
 */
export default function RecordCard({
    record,
    index = 0,
}: {
    record: ProductRecord;
    index?: number;
}) {
    const origin = attr(record, "Origin");

    return (
        <article className="rise" style={{ ["--i" as string]: String(index % 6) }}>
            <Link href={`/record/${encodeURIComponent(record.code)}`} className="group block">
                <div className="relative overflow-hidden rounded-lg bg-ink shadow-[var(--ring)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={recordVisual(record)}
                        alt={record.title}
                        className="sheen aspect-4/5 w-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02] motion-reduce:transition-none"
                        draggable={false}
                    />
                    {record.supply > 1 && (
                        <div className="absolute top-3 right-3">
                            <Badge variant="ink" className="bg-ink/80 backdrop-blur-none">
                                Shared · {record.supply}
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="data text-bt-red">{record.code}</span>
                    <span className="text-[13px] text-muted-foreground">
                        {record.collection ?? "Record"}
                    </span>
                </div>

                {/* text-ink on purpose: inside the link the heading inherited
                    the anchor's morinda, so every card shouted its title in the
                    accent colour and the code beside it lost its job. */}
                <h3 className="mt-1.5 text-[19px] leading-tight text-ink">
                    {record.title.split(" · ")[0]}
                </h3>

                {origin && (
                    <p className="mt-1 text-[15px] text-muted-foreground">
                        {origin}
                    </p>
                )}

                <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-[15px] text-ink group-hover:text-bt-red">
                    Read the record
                    <span
                        aria-hidden
                        className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                        →
                    </span>
                </div>
            </Link>
        </article>
    );
}