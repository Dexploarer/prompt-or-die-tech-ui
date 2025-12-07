"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, checked, onChange, disabled, ...props }, ref) => {
        return (
            <label
                className={cn(
                    "inline-flex items-center gap-2 cursor-pointer",
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
                    <div
                        className={cn(
                            "w-4 h-4 border border-border bg-background transition-all duration-200",
                            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50",
                            "peer-checked:bg-primary peer-checked:border-primary"
                        )}
                    >
                        {/* Checkmark */}
                        <svg
                            className={cn(
                                "w-4 h-4 text-background stroke-3 transition-opacity duration-200",
                                checked ? "opacity-100" : "opacity-0"
                            )}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
                {label && (
                    <span className="text-sm text-foreground">{label}</span>
                )}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";
