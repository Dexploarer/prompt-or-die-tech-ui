"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TechInput = React.forwardRef<HTMLInputElement, TechInputProps>(
    ({ className, label, error, disabled, type = "text", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block mb-1.5 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            // Base styles
                            "flex h-9 w-full px-3 py-2",
                            "bg-background border border-border",
                            "font-mono text-xs text-foreground",
                            // Placeholder
                            "placeholder:text-muted-foreground/50",
                            // Focus state
                            "focus:outline-none focus:border-primary",
                            // Error state
                            error && "border-destructive focus:border-destructive",
                            // Disabled state
                            "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-muted/20",
                            // Transition
                            "transition-colors duration-200",
                            className
                        )}
                        ref={ref}
                        disabled={disabled}
                        {...props}
                    />
                    {/* Small square indicator on right side */}
                    <div
                        className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5",
                            error
                                ? "bg-destructive"
                                : disabled
                                  ? "bg-muted-foreground/30"
                                  : "bg-border"
                        )}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-[9px] font-mono text-destructive uppercase tracking-wider">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

TechInput.displayName = "TechInput";
