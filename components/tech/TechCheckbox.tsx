"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    onChange?: (checked: boolean) => void;
}

export const TechCheckbox = React.forwardRef<HTMLInputElement, TechCheckboxProps>(
    ({ className, label, checked, onChange, disabled, ...props }, ref) => {
        return (
            <label
                className={cn(
                    "inline-flex items-center gap-2 cursor-pointer group",
                    disabled && "cursor-not-allowed opacity-50",
                    className
                )}
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        ref={ref}
                        checked={checked}
                        disabled={disabled}
                        onChange={(e) => onChange?.(e.target.checked)}
                        className="peer sr-only"
                        {...props}
                    />
                    {/* Checkbox Box */}
                    <div
                        className={cn(
                            "w-4 h-4 border border-border bg-background transition-all duration-200 relative",
                            "peer-focus-visible:ring-1 peer-focus-visible:ring-primary",
                            "group-hover:border-primary/50",
                            "peer-checked:border-primary peer-checked:bg-primary/10"
                        )}
                    >
                        {/* Corner pip */}
                        <div className="absolute -top-px -right-px w-1 h-1 bg-border group-hover:bg-primary/50 peer-checked:bg-primary transition-colors" />
                        
                        {/* Checkmark */}
                        <div className={cn(
                            "absolute inset-0 flex items-center justify-center text-primary transition-all duration-200",
                            checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        )}>
                            <div className="w-2 h-2 bg-primary shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]" />
                        </div>
                    </div>
                </div>
                {label && (
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wide">
                        {label}
                    </span>
                )}
            </label>
        );
    }
);

TechCheckbox.displayName = "TechCheckbox";
