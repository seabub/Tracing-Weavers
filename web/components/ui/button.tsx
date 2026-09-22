import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* One accent (morinda red, salmon on ink), uppercase letterspaced label,
   rounded like the Alto app. Press feedback comes from `.pressable` —
   scale(.975) on :active — and hover only fires on a real pointer. */
const buttonVariants = cva(
    "pressable inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg font-medium uppercase tracking-[.12em] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary:
                    "bg-bt-red text-white border border-bt-red hover:bg-bt-red-bright hover:border-bt-red-bright",
                secondary: "bg-transparent text-ink border border-ink hover:bg-ink/6",
                outline:
                    "bg-transparent text-ink border border-stone hover:border-ink hover:bg-white",
                ghost:
                    "bg-transparent text-bt-red border border-transparent hover:text-bt-red-bright",
                inverse: "bg-salmon text-ink border border-salmon hover:bg-[#FFB3A4] hover:border-[#FFB3A4]",
                inverseGhost:
                    "bg-transparent text-white border border-white/45 hover:bg-white/10",
            },
            size: {
                sm: "h-9 px-3.5 text-sm",
                md: "h-11 px-5 text-base",
                lg: "h-14 px-7 text-lg",
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