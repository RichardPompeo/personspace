import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white shadow hover:bg-green-500/80 dark:bg-green-600 dark:hover:bg-green-600/80",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/80 dark:bg-yellow-600 dark:hover:bg-yellow-600/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
