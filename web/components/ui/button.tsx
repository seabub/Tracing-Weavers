import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* One accent (morinda red, salmon on ink). Labels are title case, not shouted
   caps — the brand uses letterspaced caps for eyebrows only, so spending them
   on every button wastes the signal. Press feedback is scale(.975). */
const buttonVariants = cva(
    "pressable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[.01em] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary: "bg-bt-red text-white hover:bg-bt-red-bright",
                secondary: "bg-ink text-white hover:bg-ink/90",
                outline: "bg-card text-ink shadow-[var(--ring)] hover:shadow-[var(--ring-hover)]",
                ghost: "bg-transparent text-ink-2 hover:text-ink hover:bg-ink/5",
                inverse: "bg-salmon text-ink hover:bg-[#FFB3A4]",
                inverseGhost: "bg-transparent text-white shadow-[0_0_0_1px_rgba(255,255,255,.35)] hover:bg-white/10",
            },
            size: {
                sm: "h-9 px-3.5 text-[15px]",
                md: "h-11 px-5 text-base",
                lg: "h-13 px-6 text-[17px]",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: { variant: "primary", size: "md" },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };