"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechLiquidPanelProps {
    children?: React.ReactNode;
    className?: string;
    intensity?: number;
}

export function TechLiquidPanel({
    children,
    className,
    intensity = 10
}: TechLiquidPanelProps) {
    return (
        <div className={cn("relative p-4", className)}>
            <svg className="hidden">
                <defs>
                    <filter id="liquid-filter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={intensity} result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="liquid"
                        />
                        <feComposite in="SourceGraphic" in2="liquid" operator="atop"/>
                    </filter>
                </defs>
            </svg>

            {/* Tech Frame Overlay (Keeps the Tech Aesthetic grounded) */}
            <div className="absolute inset-0 border border-border/30 rounded-lg pointer-events-none" />
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary pointer-events-none" />
            
            {/* Liquid Container */}
            <div 
                className="relative"
                style={{ filter: "url(#liquid-filter)" }}
            >
                {children}
            </div>

            <div className="absolute bottom-1 right-2 text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">
                FERRO_FLUID_CONTAINMENT
            </div>
        </div>
    );
}
