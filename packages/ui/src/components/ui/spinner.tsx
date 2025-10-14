import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { spinnerVariants } from "./spinner-variants";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          className,
        )}
        {...props}
      >
        <div
          className={cn(spinnerVariants({ size, variant }))}
          role="status"
          aria-label={label || "Loading"}
        >
          <span className="sr-only">{label || "Loading..."}</span>
        </div>
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
