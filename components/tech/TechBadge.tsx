"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "error" | "warning";
}

export function TechBadge({
    className,
    variant = "default",
    children,
    ...props
}: TechBadgeProps) {
    const variants = {
        default: "bg-border/50 text-muted-foreground border-border",
        success: "bg-success/10 text-success border-success/30",
        error: "bg-destructive/10 text-destructive border-destructive/30",
        warning: "bg-warning/10 text-warning border-warning/30",
    };

    return (
        <span
            className={cn(
                // Base styles - sharp corners, small
                "inline-flex items-center gap-1.5 px-2 py-0.5",
                "border",
                "font-mono text-[9px] uppercase tracking-wider",
                // Variant
                variants[variant],
                className
            )}
            {...props}
        >
            {/* Small square indicator */}
            <span
                className={cn(
                    "w-1 h-1 shrink-0",
                    variant === "default" && "bg-muted-foreground",
                    variant === "success" && "bg-success",
                    variant === "error" && "bg-destructive",
                    variant === "warning" && "bg-warning"
                )}
            />
            {children}
        </span>
    );
}
