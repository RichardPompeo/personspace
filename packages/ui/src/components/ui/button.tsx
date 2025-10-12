import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-slate-900 shadow-[0_15px_35px_-18px_rgba(142,181,240,0.75)] hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-18px_rgba(142,181,240,0.85)] active:translate-y-0 disabled:shadow-none",
        secondary:
          "border border-white/10 bg-surface/80 text-text hover:-translate-y-0.5 hover:border-accent hover:bg-surface",
        ghost: "text-text hover:bg-white/10",
        destructive: "bg-danger text-white shadow-[0_12px_25px_-18px_rgba(201,33,33,0.7)] hover:bg-danger/90",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "px-3 py-2 text-xs",
        lg: "px-6 py-3 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
