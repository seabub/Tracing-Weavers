import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Pills for status. The dye colours (nila, kunyit) only appear where they mean
   something — a dye reference or a "to confirm" mark. */
const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] tracking-[.06em] shadow-[var(--ring)]",
    {
        variants: {
            variant: {
                default: "bg-card text-muted-foreground",
                accent: "bg-blush text-bt-red shadow-[0_0_0_1px_rgba(174,24,0,.18)]",
                indigo: "bg-indigo-bt/8 text-indigo-bt shadow-[0_0_0_1px_rgba(43,58,103,.2)]",
                amber: "bg-amber-bt/12 text-[#7a5600] shadow-[0_0_0_1px_rgba(236,164,6,.3)]",
                positive: "bg-success/10 text-success shadow-[0_0_0_1px_rgba(62,107,46,.25)]",
                ink: "bg-ink text-white",
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