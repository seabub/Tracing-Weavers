"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ProductRecord } from "@/lib/records";

const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] },
    },
};

export default function RecordCard({ record }: { record: ProductRecord }) {
    const shared = record.supply > 1;

    return (
        <motion.div variants={item} className="h-full">
            <Link href={`/record/${record.code}`} className="block h-full">
                <Card className="lift h-full pt-0">
                    <CardHeader className="relative p-0">
                        <div className="aspect-square w-full overflow-hidden bg-paper">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={record.image}
                                alt={record.title}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                draggable={false}
                            />
                        </div>
                        {shared && (
                            <div className="absolute top-3 right-3">
                                <Badge variant="accent">Shared · {record.supply}</Badge>
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-2 pt-5">
                        <div className="eyebrow">{record.collection ?? "Record"}</div>
                        <h3 className="display truncate text-xl">{record.title}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {record.description}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-4">
                        <Button className="pointer-events-none w-full">
                            Read the record →
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}