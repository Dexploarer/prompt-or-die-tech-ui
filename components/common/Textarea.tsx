"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
    label?: string;
    error?: string;
    showCount?: boolean;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, showCount, maxLength, value, onChange, disabled, ...props }, ref) => {
        const charCount = typeof value === "string" ? value.length : 0;

        return (
            <div className="w-full">
                {label && (
                    <label className="block mb-1.5 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        className={cn(
                            // Base styles
                            "flex min-h-[80px] w-full px-3 py-2 resize-none",
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
                        maxLength={maxLength}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                </div>
                <div className="flex justify-between mt-1.5">
                    {error ? (
                        <p className="text-[9px] font-mono text-destructive uppercase tracking-wider">
                            {error}
                        </p>
                    ) : (
                        <span />
                    )}
                    {showCount && maxLength && (
                        <span className="text-[9px] font-mono text-muted-foreground tabular-nums">
                            {charCount}/{maxLength}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
