import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Pills for status, letterspaced caps — status colour used sparingly. */
const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-normal uppercase tracking-[.14em]",
    {
        variants: {
            variant: {
                default: "border-stone bg-white text-muted-foreground",
                accent: "border-bt-red text-bt-red bg-blush",
                amber: "border-amber-bt text-[#8a6100] bg-transparent",
                positive: "border-success text-success bg-transparent",
                inverse: "border-white/45 text-white bg-transparent",
            },
        },
        defaultVariants: { variant: "default" },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };