"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatBarProps {
    label: string;
    value: number;
    max: number;
    color?: "primary" | "success" | "error";
    showValue?: boolean;
    className?: string;
}

export function StatBar({
    label,
    value,
    max,
    color = "primary",
    showValue = true,
    className,
}: StatBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colorStyles = {
        primary: {
            bar: "bg-primary",
            glow: "shadow-[0_0_8px_rgba(255,88,0,0.4)]",
        },
        success: {
            bar: "bg-success",
            glow: "shadow-[0_0_8px_rgba(34,197,94,0.4)]",
        },
        error: {
            bar: "bg-destructive",
            glow: "shadow-[0_0_8px_rgba(239,68,68,0.4)]",
        },
    };

    const styles = colorStyles[color];

    return (
        <div className={cn("w-full", className)}>
            <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    {label}
                </span>
                {showValue && (
                    <span className="text-[10px] font-mono text-foreground tabular-nums">
                        {value}/{max}
                    </span>
                )}
            </div>
            <div className="relative h-2 bg-border/50 overflow-hidden">
                {/* Background track */}
                <div className="absolute inset-0 bg-muted/30" />
                {/* Fill bar */}
                <div
                    className={cn(
                        "absolute inset-y-0 left-0 transition-all duration-300",
                        styles.bar,
                        percentage > 0 && styles.glow
                    )}
                    style={{ width: `${percentage}%` }}
                />
                {/* Edge indicator - small square at the end of the bar */}
                {percentage > 0 && (
                    <div
                        className={cn(
                            "absolute top-0 w-0.5 h-full bg-foreground/80",
                            "transition-all duration-300"
                        )}
                        style={{ left: `${percentage}%`, transform: "translateX(-100%)" }}
                    />
                )}
            </div>
        </div>
    );
}
