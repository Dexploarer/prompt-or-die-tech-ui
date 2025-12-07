"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechQuantumLoaderProps {
    size?: number;
    color?: string;
    className?: string;
}

export function TechQuantumLoader({
    size = 100,
    color = "#ff5800",
    className
}: TechQuantumLoaderProps) {
    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* Core */}
            <div 
                className="absolute w-1/4 h-1/4 rounded-full bg-current animate-pulse shadow-[0_0_20px_currentColor]"
                style={{ color }}
            />
            
            {/* Ring 1 - Fast Vertical Spin */}
            <div 
                className="absolute w-full h-full rounded-full border-2 border-transparent border-t-current border-b-current animate-[spin_1s_linear_infinite]"
                style={{ color, opacity: 0.8 }}
            />
            
            {/* Ring 2 - Medium Horizontal Spin (Reverse) */}
            <div 
                className="absolute w-3/4 h-3/4 rounded-full border-2 border-transparent border-l-current border-r-current animate-[spin_2s_linear_infinite_reverse]"
                style={{ color, opacity: 0.6 }}
            />
            
            {/* Ring 3 - Slow 3D tilt */}
            <div 
                className="absolute w-full h-full rounded-full border border-dashed border-current opacity-30 animate-[spin_8s_linear_infinite]"
                style={{ color }}
            />

            {/* Orbital Particles */}
             <div className="absolute w-full h-full animate-[spin_3s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-current rounded-full shadow-[0_0_10px_currentColor]" style={{ color }} />
             </div>
             <div className="absolute w-full h-full animate-[spin_5s_linear_infinite_reverse]">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-current rounded-full shadow-[0_0_10px_currentColor]" style={{ color }} />
             </div>

             <div className="absolute bottom-[-20px] text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em] animate-pulse">
                INITIALIZING_CORE
             </div>
        </div>
    );
}
