import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants = {
            primary:
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(255,88,0,0.3)] hover:shadow-[0_0_30px_rgba(255,88,0,0.6)] border-primary/50",
            secondary:
                "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 backdrop-blur-sm border-white/10 hover:border-white/20",
            ghost: "hover:bg-white/5 text-foreground hover:text-primary",
            danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-lg",
        };

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border cursor-pointer",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
