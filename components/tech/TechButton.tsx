"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Visual style variant
     * @default "primary"
     */
    variant?: "primary" | "secondary" | "ghost";
    /**
     * Size of the button
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * If true, shows a spinner and disables interactivity
     * @default false
     */
    loading?: boolean;
}

/**
 * A highly styled, interactive button component with Tech-UI aesthetics.
 * Features sharp corners, monospace font, and loading states.
 */

export const TechButton = React.forwardRef<HTMLButtonElement, TechButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            loading = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || loading;

        const variants = {
            primary:
                "bg-primary text-background hover:bg-primary/90 border-primary",
            secondary:
                "bg-transparent text-primary border-primary hover:bg-primary/10",
            ghost:
                "bg-transparent text-muted-foreground border-transparent hover:text-primary hover:border-primary/50",
        };

        const sizes = {
            sm: "h-7 px-3 text-[10px]",
            md: "h-9 px-4 text-xs",
            lg: "h-11 px-6 text-sm",
        };

        return (
            <button
                className={cn(
                    // Base styles - sharp corners, monospace, uppercase
                    "relative inline-flex items-center justify-center",
                    "font-mono uppercase tracking-wider",
                    "border transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                    // Disabled state
                    "disabled:pointer-events-none disabled:opacity-40",
                    // Variant and size
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                disabled={isDisabled}
                {...props}
            >
                {loading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-3 w-3 border border-current border-t-transparent animate-spin" />
                    </span>
                )}
                <span className={cn(loading && "opacity-0")}>{children}</span>
            </button>
        );
    }
);

TechButton.displayName = "TechButton";
