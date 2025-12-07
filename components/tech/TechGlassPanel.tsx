"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechGlassPanelProps {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
    border?: boolean;
}

export function TechGlassPanel({ 
    children, 
    className,
    intensity = "medium",
    border = true
}: TechGlassPanelProps) {
    return (
        <div className={cn(
            "relative overflow-hidden group rounded-lg",
            intensity === "low" && "bg-black/20 backdrop-blur-sm",
            intensity === "medium" && "bg-black/40 backdrop-blur-md",
            intensity === "high" && "bg-black/60 backdrop-blur-lg",
            border && "border border-white/5",
            className
        )}>
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            
            {/* Shine/Reflection Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Hover Border Beam */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>

            <div className="relative z-30">
                {children}
            </div>
        </div>
    );
}
