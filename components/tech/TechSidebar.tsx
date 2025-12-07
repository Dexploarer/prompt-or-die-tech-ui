"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechButton } from "./TechButton";

export interface TechSidebarItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    badge?: string | number;
}

export interface TechSidebarProps {
    brand?: React.ReactNode;
    items: TechSidebarItem[];
    footer?: React.ReactNode;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
    className?: string;
}

export function TechSidebar({
    brand,
    items,
    footer,
    collapsed = false,
    onToggleCollapse,
    className
}: TechSidebarProps) {
    return (
        <div className={cn(
            "flex flex-col h-full border-r border-white/10 bg-black/80 backdrop-blur-md transition-all duration-300",
            collapsed ? "w-16" : "w-64",
            className
        )}>
            {/* Header/Brand */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
                <div className={cn("overflow-hidden transition-all duration-300", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                    {brand || (
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-6 bg-primary rounded-sm animate-pulse" />
                             <span className="font-mono font-bold tracking-widest text-primary">NEXUS</span>
                        </div>
                    )}
                </div>
                {collapsed && !brand && (
                     <div className="w-8 h-8 bg-primary/20 rounded-sm flex items-center justify-center mx-auto">
                         <div className="w-2 h-2 bg-primary animate-pulse" />
                     </div>
                )}
                
                {onToggleCollapse && !collapsed && (
                    <button onClick={onToggleCollapse} className="text-muted-foreground hover:text-foreground">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={item.onClick}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative",
                            item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                        title={collapsed ? item.label : undefined}
                    >
                        {/* Active Indicator Line */}
                        {item.active && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r" />
                        )}

                        {/* Icon */}
                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                            {item.icon || (
                                <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", item.active ? "bg-primary shadow-[0_0_5px_currentColor]" : "bg-muted-foreground/50")} />
                            )}
                        </div>

                        {/* Label */}
                        <div className={cn(
                            "font-mono text-xs uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300",
                            collapsed ? "w-0 opacity-0" : "flex-1 opacity-100 text-left"
                        )}>
                            {item.label}
                        </div>

                        {/* Badge */}
                        {!collapsed && item.badge && (
                            <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/20">
                                {item.badge}
                            </span>
                        )}
                        
                        {/* Collapsed Badge Dot */}
                        {collapsed && item.badge && (
                             <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 p-4 shrink-0 bg-black/60">
                 {collapsed ? (
                     <div className="flex justify-center">
                        {onToggleCollapse ? (
                             <button onClick={onToggleCollapse} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <path d="M9 18l6-6-6-6" />
                                 </svg>
                             </button>
                        ) : (
                             <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                        )}
                     </div>
                 ) : (
                     <div className="w-full">
                         {footer}
                     </div>
                 )}
            </div>
        </div>
    );
}
