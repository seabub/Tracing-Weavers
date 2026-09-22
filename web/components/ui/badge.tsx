import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Pills for status, letterspaced caps — status colour used sparingly.
   `indigo` and `amber` are the brand's reserved dye colours, so they only
   appear where they mean something (dye, to-confirm). */
const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-normal uppercase tracking-[.14em]",
    {
        variants: {
            variant: {
                default: "border-stone bg-white text-muted-foreground",
                accent: "border-bt-red text-bt-red bg-blush",
                indigo: "border-indigo-bt/40 text-indigo-bt bg-indigo-bt/5",
                amber: "border-amber-bt text-[#8a6100] bg-amber-bt/5",
                positive: "border-success text-success bg-success/5",
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