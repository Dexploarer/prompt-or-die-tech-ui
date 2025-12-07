"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    size?: "sm" | "md";
}

const sizeStyles = {
    sm: {
        track: "w-8 h-4",
        thumb: "w-3 h-3",
        translate: "translate-x-4",
    },
    md: {
        track: "w-10 h-5",
        thumb: "w-4 h-4",
        translate: "translate-x-5",
    },
};

export function Switch({
    checked = false,
    onChange,
    label,
    size = "md",
    disabled,
    className,
    ...props
}: SwitchProps) {
    const styles = sizeStyles[size];

    return (
        <label
            className={cn(
                "inline-flex items-center gap-2 cursor-pointer",
                disabled && "cursor-not-allowed opacity-50",
                className
            )}
        >
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange?.(!checked)}
                className={cn(
                    "relative inline-flex items-center rounded-full transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    styles.track,
                    checked ? "bg-primary" : "bg-border"
                )}
                {...props}
            >
                <span
                    className={cn(
                        "inline-block rounded-full bg-foreground transition-transform duration-200",
                        "translate-x-0.5",
                        styles.thumb,
                        checked && styles.translate
                    )}
                />
            </button>
            {label && (
                <span className="text-sm text-foreground">{label}</span>
            )}
        </label>
    );
}
