"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechFrame } from "./TechFrame";

export interface TechTreeNode {
    id: string;
    label: string;
    tier: number;
    status: "locked" | "available" | "completed" | "active";
    description?: string;
    icon?: React.ReactNode;
}

export interface TechTreeProps {
    nodes: TechTreeNode[];
    onNodeClick?: (node: TechTreeNode) => void;
    className?: string;
}

export function TechTree({ nodes, onNodeClick, className }: TechTreeProps) {
    // Group nodes by tier
    const tiers = React.useMemo(() => {
        const groups: Record<number, TechTreeNode[]> = {};
        nodes.forEach((node) => {
            if (!groups[node.tier]) groups[node.tier] = [];
            groups[node.tier].push(node);
        });
        return groups;
    }, [nodes]);

    const sortedTiers = Object.keys(tiers).map(Number).sort((a, b) => a - b);

    return (
        <TechFrame className={cn("p-6", className)} variant="default">
            <div className="space-y-8">
                {sortedTiers.map((tier) => (
                    <div key={tier} className="relative">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                                Tier {tier}
                            </span>
                            <div className="h-px flex-1 bg-border/30" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {tiers[tier].map((node) => {
                                const isClickable = !!onNodeClick;
                                const isActive = node.status === "active";
                                const isCompleted = node.status === "completed";
                                const isLocked = node.status === "locked";

                                return (
                                    <div
                                        key={node.id}
                                        onClick={() => isClickable && !isLocked && onNodeClick(node)}
                                        className={cn(
                                            "relative p-3 border transition-all duration-300 group",
                                            isClickable && !isLocked && "cursor-pointer hover:border-primary/50",
                                            isLocked && "border-border/10 bg-black/20 opacity-60 cursor-not-allowed",
                                            isCompleted && "border-success/30 bg-success/5",
                                            isActive && "border-primary/50 bg-primary/10",
                                            !isActive && !isCompleted && !isLocked && "border-border/30 bg-black/40"
                                        )}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className={cn(
                                                        "w-1.5 h-1.5 transition-colors",
                                                        isCompleted ? "bg-success" :
                                                        isActive ? "bg-primary animate-pulse" :
                                                        isLocked ? "bg-muted-foreground/30" : "bg-muted-foreground"
                                                    )} 
                                                />
                                                <span className={cn(
                                                    "text-xs font-mono font-medium",
                                                    isCompleted ? "text-success" :
                                                    isActive ? "text-primary" : "text-foreground"
                                                )}>
                                                    {node.label}
                                                </span>
                                            </div>
                                            {node.icon && (
                                                <span className="text-muted-foreground/50">{node.icon}</span>
                                            )}
                                        </div>
                                        
                                        {node.description && (
                                            <div className="text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
                                                {node.description}
                                            </div>
                                        )}

                                        {/* Corner Decorations */}
                                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-transparent group-hover:border-primary/30 transition-colors" />
                                        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-transparent group-hover:border-primary/30 transition-colors" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </TechFrame>
    );
}
