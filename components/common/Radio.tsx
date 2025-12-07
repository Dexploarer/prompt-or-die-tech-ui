"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioGroupProps {
    value?: string;
    onChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    value: string;
}

const RadioGroupContext = React.createContext<{
    value?: string;
    onChange?: (value: string) => void;
}>({});

export function RadioGroup({ value, onChange, children, className }: RadioGroupProps) {
    return (
        <RadioGroupContext.Provider value={{ value, onChange }}>
            <div className={cn("space-y-2", className)} role="radiogroup">
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ className, label, value, disabled, ...props }, ref) => {
        const context = React.useContext(RadioGroupContext);
        const isChecked = context.value === value;

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
                        type="radio"
                        ref={ref}
                        value={value}
                        checked={isChecked}
                        disabled={disabled}
                        onChange={() => context.onChange?.(value)}
                        className="peer sr-only"
                        {...props}
                    />
                    <div
                        className={cn(
                            "w-4 h-4 rounded-full border border-border bg-background transition-all duration-200",
                            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50",
                            isChecked && "border-primary"
                        )}
                    >
                        {/* Inner dot */}
                        <div
                            className={cn(
                                "absolute inset-1 rounded-full bg-primary transition-transform duration-200",
                                isChecked ? "scale-100" : "scale-0"
                            )}
                        />
                    </div>
                </div>
                {label && (
                    <span className="text-sm text-foreground">{label}</span>
                )}
            </label>
        );
    }
);

Radio.displayName = "Radio";
