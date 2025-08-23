import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  asChild?: boolean;
}

const variantStyles: Record<string, string> = {
  default: "bg-black text-white hover:opacity-90",
  outline: "border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  secondary: "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700",
  ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-800"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn("px-4 py-2 rounded-lg text-sm transition inline-flex items-center", variantStyles[variant], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
