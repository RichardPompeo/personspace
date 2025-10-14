import { cva } from "class-variance-authority";

export const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
      variant: {
        default: "text-primary",
        accent: "text-accent",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);
