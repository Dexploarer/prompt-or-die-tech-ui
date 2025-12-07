"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechTab {
    id: string;
    label: string;
}

export interface TechTabsProps {
    tabs: TechTab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
}

export function TechTabs({ tabs, activeTab, onChange, className }: TechTabsProps) {
    return (
        <div className={cn("w-full", className)}>
            <div className="flex border-b border-border">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={cn(
                                // Base styles
                                "relative px-4 py-2.5",
                                "font-mono text-[10px] uppercase tracking-widest",
                                "transition-colors duration-200",
                                // Hover state
                                "hover:text-primary",
                                // Active vs inactive
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {/* Tab label */}
                            <span className="relative z-10">{tab.label}</span>

                            {/* Active indicator - small squares at bottom corners */}
                            {isActive && (
                                <>
                                    {/* Bottom line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                                    {/* Left corner square */}
                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-primary -translate-y-px" />
                                    {/* Right corner square */}
                                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-primary -translate-y-px" />
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
