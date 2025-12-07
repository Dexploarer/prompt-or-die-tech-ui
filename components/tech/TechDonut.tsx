"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechDonutProps {
    value: number; // 0-100
    label?: string;
    sublabel?: string;
    color?: string;
    size?: number;
    className?: string;
}

export function TechDonut({
    value,
    label,
    sublabel,
    color = "#ff5800",
    size = 120,
    className
}: TechDonutProps) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* Rotating Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_10s_linear_infinite]" />
            
            <svg 
                className="w-full h-full transform -rotate-90" 
                viewBox="0 0 100 100"
            >
                {/* Background Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/5"
                />
                
                {/* Progress Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono tracking-tighter tabular-nums" style={{ color }}>
                    {Math.round(value)}%
                </span>
                {label && (
                    <span className="text-[10px] uppercase font-mono text-muted-foreground/80 mt-1">
                        {label}
                    </span>
                )}
                {sublabel && (
                    <span className="text-[9px] font-mono text-muted-foreground/50">
                        {sublabel}
                    </span>
                )}
            </div>
        </div>
    );
}
