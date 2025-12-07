"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KVDisplayProps {
    entries: Record<string, string | number | React.ReactNode>;
    variant?: "default" | "compact";
    className?: string;
}

export function KVDisplay({
    entries,
    variant = "default",
    className,
}: KVDisplayProps) {
    return (
        <div className={cn("w-full", className)}>
            <div className={cn("grid", variant === "default" ? "gap-4" : "gap-2")}>
                {Object.entries(entries).map(([key, value]) => (
                    <div
                        key={key}
                        className={cn(
                            "flex justify-between items-baseline border-b border-border/20 border-dotted",
                            variant === "default" ? "pb-2" : "pb-1"
                        )}
                    >
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                            {key}
                        </span>
                        <span className="text-xs font-mono font-medium text-foreground text-right pl-4">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
