"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechMetricProps {
    label: string;
    value: string | number;
    trend?: number; // percentage (e.g. 5, -12)
    className?: string;
}

export function TechMetric({ label, value, trend, className }: TechMetricProps) {
    return (
        <div className={cn("p-4 border border-border/50 bg-card/20", className)}>
            <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1.5">
                {label}
            </div>
            <div className="flex items-end justify-between">
                <div className="text-2xl font-mono font-medium tabular-nums text-foreground">
                    {value}
                </div>
                {trend !== undefined && (
                    <div
                        className={cn(
                            "text-[10px] font-mono mb-1",
                            trend > 0 ? "text-success" : trend < 0 ? "text-destructive" : "text-muted-foreground"
                        )}
                    >
                        {trend > 0 ? "+" : ""}
                        {trend}%
                    </div>
                )}
            </div>
        </div>
    );
}

export interface TechDataListProps {
    title: string;
    data: { label: string; value: string | React.ReactNode }[];
    className?: string;
}

export function TechDataList({ title, data, className }: TechDataListProps) {
    return (
        <div className={cn("p-4 border border-border/50 bg-card/20", className)}>
            <div className="text-xs font-mono uppercase tracking-wider mb-4 text-foreground/80">
                {title}
            </div>
            <div className="space-y-2.5">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs border-b border-border/30 pb-2 last:border-0 last:pb-0">
                        <span className="font-mono text-muted-foreground">{item.label}</span>
                        <span className="font-mono text-foreground font-medium tabular-nums">
                            {item.value}
                        </span>
                    </div>
                ))}
                {data.length === 0 && (
                    <div className="text-[10px] text-muted-foreground/40 text-center py-2 font-mono uppercase">
                        No Data
                    </div>
                )}
            </div>
        </div>
    );
}
