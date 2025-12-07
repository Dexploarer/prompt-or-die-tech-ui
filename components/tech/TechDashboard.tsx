"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechDashboardProps {
    children: React.ReactNode;
    columns?: number;
    gap?: number;
    className?: string;
    title?: string;
}

export function TechDashboard({ 
    children, 
    columns = 3, 
    gap = 4, 
    className,
    title = "MISSION DASHBOARD"
}: TechDashboardProps) {
    return (
        <div className={cn("w-full bg-background min-h-screen p-4 sm:p-6", className)}>
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold">
                        ★
                     </div>
                     <div>
                         <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
                         <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex gap-4">
                             <span>SYS: ONLINE</span>
                             <span>NET: SECURE</span>
                         </div>
                     </div>
                </div>
                <div className="hidden sm:flex gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={cn("w-1 h-4 skew-x-12", i < 8 ? "bg-primary" : "bg-muted-foreground/20")} />
                    ))}
                </div>
            </div>

            {/* Grid Layout */}
            <div 
                className={cn("grid auto-rows-min", 
                    columns === 1 && "grid-cols-1",
                    columns === 2 && "grid-cols-1 md:grid-cols-2",
                    columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                    columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                )}
                style={{ gap: `${gap * 0.25}rem` }}
            >
                {children}
            </div>
        </div>
    );
}
