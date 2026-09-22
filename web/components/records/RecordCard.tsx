import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CornerBrackets } from "@/components/motif/marks";
import { attr, type ProductRecord } from "@/lib/records";

/* One mark per surface: the artwork gets corner brackets (the design system's
   frame for photos), the card body gets the cloth ground. Nothing else. */
export default function RecordCard({
    record,
    index = 0,
}: {
    record: ProductRecord;
    index?: number;
}) {
    const shared = record.supply > 1;
    const origin = attr(record, "Origin");

    return (
        <div
            className="rise h-full"
            style={{ ["--i" as string]: String(index % 6) }}
        >
            <Link href={`/record/${record.code}`} className="block h-full">
                <Card cloth className="lift h-full pt-0">
                    <CardHeader className="relative p-0">
                        <div className="relative aspect-square w-full overflow-hidden bg-paper">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={record.image}
                                alt={record.title}
                                className="h-full w-full object-cover"
                                draggable={false}
                            />
                            <CornerBrackets className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-white/70" />
                        </div>
                        {shared && (
                            <div className="absolute top-3 right-3">
                                <Badge variant="accent">Bersama · {record.supply}</Badge>
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-2 pt-5">
                        <div className="flex items-baseline justify-between gap-3">
                            <span className="eyebrow">{record.collection ?? "Jejak"}</span>
                            <span className="footnote shrink-0">{record.code}</span>
                        </div>
                        <h3 className="display text-xl leading-tight">{record.title}</h3>
                        {origin && (
                            <p className="text-[15px] text-muted-foreground">
                                {String(origin)}
                            </p>
                        )}
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {record.description}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-4">
                        <Button className="pointer-events-none w-full">
                            Baca jejaknya →
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}