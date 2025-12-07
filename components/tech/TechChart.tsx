"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechChartPoint {
    label: string;
    value: number;
}

export interface TechChartProps {
    data: TechChartPoint[];
    color?: string; // Hex color
    height?: number;
    className?: string;
    showArea?: boolean;
    showPoints?: boolean;
    min?: number;
    max?: number;
}

export function TechChart({
    data,
    color = "#ff5800", // Default orange
    height = 120,
    className,
    showArea = true,
    showPoints = true,
    min,
    max
}: TechChartProps) {
    if (data.length < 2) return null;

    const values = data.map(d => d.value);
    const minValue = min ?? Math.min(...values);
    const maxValue = max ?? Math.max(...values);
    const range = maxValue - minValue || 1;

    const width = 100; // Use percentage width via viewBox
    const h = 100;
    
    // Calculate points
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const normalizedValue = (d.value - minValue) / range;
        const y = 100 - (normalizedValue * 100);
        return `${x},${y}`;
    }).join(" ");

    // Area path
    const areaPath = `${points} 100,100 0,100`;

    return (
        <div className={cn("relative w-full overflow-hidden bg-black/20 border border-white/5 rounded", className)} style={{ height }}>
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-[1px] opacity-10 pointer-events-none">
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
            </div>

            <svg 
                viewBox={`0 0 100 100`} 
                preserveAspectRatio="none" 
                className="w-full h-full p-2 overflow-visible"
            >
                {/* Defs for gradient */}
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area */}
                {showArea && (
                    <polygon 
                        points={areaPath} 
                        fill={`url(#gradient-${color})`} 
                        className="transition-all duration-300 ease-in-out"
                    />
                )}

                {/* Line */}
                <polyline 
                    points={points} 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="1.5" 
                    vectorEffect="non-scaling-stroke"
                    className="transition-all duration-300 ease-in-out"
                />

                {/* Points */}
                {showPoints && data.map((d, i) => {
                     const x = (i / (data.length - 1)) * 100;
                     const normalizedValue = (d.value - minValue) / range;
                     const y = 100 - (normalizedValue * 100);
                     return (
                         <circle 
                            key={i}
                            cx={x} 
                            cy={y} 
                            r="1.5" 
                            fill="#000" 
                            stroke={color} 
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke" 
                            className="transition-all duration-300"
                        />
                     );
                })}
            </svg>
            
            {/* Hover Overlay could be added here, simplified for now */}
        </div>
    );
}
