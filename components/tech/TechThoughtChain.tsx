"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface TechThoughtStep {
    id: string;
    text: string;
    status: "pending" | "thinking" | "completed";
    details?: string;
}

export interface TechThoughtChainProps {
    steps: TechThoughtStep[];
    className?: string;
}

export function TechThoughtChain({ steps, className }: TechThoughtChainProps) {
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

    const toggle = (id: string) => {
        const next = new Set(expandedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setExpandedIds(next);
    };

    return (
        <div className={cn("space-y-2 font-mono text-xs", className)}>
            {steps.map((step, i) => {
                const isExpanded = expandedIds.has(step.id);
                const isThinking = step.status === "thinking";
                const isCompleted = step.status === "completed";

                return (
                    <div key={step.id} className="relative pl-4 border-l border-border/20">
                        {/* Dot Indicator */}
                        <div className={cn(
                            "absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border transition-colors bg-background",
                            isThinking ? "border-primary bg-primary animate-pulse" :
                            isCompleted ? "border-success bg-success" :
                            "border-muted-foreground/30"
                        )} />

                        <div 
                            className="cursor-pointer hover:bg-white/5 p-1 rounded transition-colors"
                            onClick={() => step.details && toggle(step.id)}
                        >
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "font-medium",
                                    isThinking ? "text-primary" :
                                    isCompleted ? "text-success" : "text-muted-foreground"
                                )}>
                                    {step.text}
                                </span>
                                {isThinking && <span className="text-[10px] animate-pulse">...</span>}
                                {step.details && (
                                    <span className="text-[9px] text-muted-foreground/50 ml-auto">
                                        {isExpanded ? "[-]" : "[+]"}
                                    </span>
                                )}
                            </div>
                        </div>

                        <AnimatePresence>
                            {isExpanded && step.details && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-1 pb-2 pl-2 text-[10px] text-muted-foreground/70 italic leading-relaxed whitespace-pre-wrap border-l border-dashed border-border/20 ml-1">
                                        {step.details}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
