import * as React from "react";
import { cn } from "@/lib/utils";

/* White surface on the tinted ground, hairline stone border, Alto's radius.
   `cloth` lets the warp/weft ground show through at under 5% so the card
   reads as woven paper rather than as a texture swatch. */
const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { cloth?: boolean }
>(({ className, cloth, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "bg-card text-card-foreground border border-border rounded-xl shadow-[0_2px_10px_rgba(32,30,29,.05)] flex flex-col overflow-hidden",
            cloth && "cloth",
            className,
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-0 grow", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-6", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };