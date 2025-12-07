"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    onChange?: (checked: boolean) => void;
}

export const TechRadio = React.forwardRef<HTMLInputElement, TechRadioProps>(
    ({ className, label, checked, onChange, disabled, ...props }, ref) => {
        return (
            <label
                className={cn(
                    "inline-flex items-center gap-2 cursor-pointer group",
                    disabled && "cursor-not-allowed opacity-50",
                    className
                )}
            >
                <div className="relative w-4 h-4 flex items-center justify-center">
                    <input
                        type="radio"
                        ref={ref}
                        checked={checked}
                        disabled={disabled}
                        onChange={(e) => onChange?.(e.target.checked)}
                        className="peer sr-only"
                        {...props}
                    />
                    
                    {/* Outer Diamond/Square Reticle */}
                    <div className={cn(
                        "absolute inset-0 border rotate-45 transition-colors duration-200",
                        checked ? "border-primary" : "border-border group-hover:border-primary/50"
                    )} />
                    
                    {/* Inner Square */}
                    <div className={cn(
                        "w-2 h-2 bg-primary transition-all duration-200",
                        checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )} />
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

TechRadio.displayName = "TechRadio";
