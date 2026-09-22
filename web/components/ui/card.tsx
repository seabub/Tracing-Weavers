import * as React from "react";
import { cn } from "@/lib/utils";

/* Warm ivory surface on the paper ground, hairline ring instead of a border +
   shadow — depth is colour and containment here, not floating cards. */
const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { cloth?: boolean; flat?: boolean }
>(({ className, cloth, flat, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "bg-card text-card-foreground rounded-lg flex flex-col overflow-hidden",
            !flat && "shadow-[var(--ring)]",
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