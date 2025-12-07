"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TechPhase {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface TechPhaseBarProps {
    phases: TechPhase[];
    currentPhaseId: string;
    className?: string;
}

export function TechPhaseBar({ phases, currentPhaseId, className }: TechPhaseBarProps) {
    const currentIndex = phases.findIndex(p => p.id === currentPhaseId);
    // If not found, default to -1 (nothing started) or adjust logic
    const safeCurrentIndex = currentIndex >= 0 ? currentIndex : -1;

    return (
        <div className={cn("w-full", className)}>
            <div className="relative">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-border/30 -translate-y-1/2" />
                
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 h-px bg-primary/50 -translate-y-1/2 transition-all duration-500"
                     style={{ width: `${(Math.max(0, safeCurrentIndex) / (phases.length - 1)) * 100}%` }}
                />

                {/* Nodes */}
                <div className="relative flex justify-between">
                    {phases.map((phase, index) => {
                        const isPast = index < safeCurrentIndex;
                        const isCurrent = index === safeCurrentIndex;
                        // const isFuture = index > safeCurrentIndex;

                        return (
                            <div key={phase.id} className="flex flex-col items-center gap-2 group">
                                <motion.div
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background z-10 transition-all duration-300",
                                        isCurrent ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(255,88,0,0.4)] scale-110" :
                                        isPast ? "border-success bg-success/5" :
                                        "border-muted bg-background"
                                    )}
                                >
                                    <div className={cn(
                                        "text-xs transition-colors",
                                        isCurrent ? "text-primary" :
                                        isPast ? "text-success" : "text-muted-foreground"
                                    )}>
                                        {phase.icon || (index + 1)}
                                    </div>
                                </motion.div>
                                
                                <div className={cn(
                                    "text-[9px] font-mono uppercase tracking-widest absolute top-10 whitespace-nowrap transition-colors duration-300",
                                    isCurrent ? "text-primary font-bold" :
                                    isPast ? "text-success/80" : "text-muted-foreground/40"
                                )}>
                                    {phase.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Spacer for labels */}
            <div className="h-6" />
        </div>
    );
}
