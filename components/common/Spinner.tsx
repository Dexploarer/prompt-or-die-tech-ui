"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "foreground" | "muted";
}

const sizeStyles = {
    sm: "w-4 h-4 border",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2",
};

const colorStyles = {
    primary: "border-primary border-t-transparent",
    foreground: "border-foreground border-t-transparent",
    muted: "border-muted-foreground border-t-transparent",
};

export function Spinner({
    size = "md",
    color = "primary",
    className,
    ...props
}: SpinnerProps) {
    return (
        <div
            className={cn(
                "animate-spin rounded-full",
                sizeStyles[size],
                colorStyles[color],
                className
            )}
            role="status"
            aria-label="Loading"
            {...props}
        />
    );
}
