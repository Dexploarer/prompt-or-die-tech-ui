"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechSliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    label?: string;
    showValue?: boolean;
    className?: string;
    disabled?: boolean;
}

export function TechSlider({
    value,
    min,
    max,
    step = 1,
    onChange,
    label,
    showValue = true,
    className,
    disabled = false,
}: TechSliderProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("w-full", className)}>
            {(label || showValue) && (
                <div className="flex justify-between mb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span>{label}</span>
                    {showValue && <span className="text-primary">{value}</span>}
                </div>
            )}
            <div className="relative h-6 flex items-center group">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    disabled={disabled}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
                />
                
                {/* Track Background */}
                <div className="absolute inset-x-0 h-1 bg-border/30 top-1/2 -translate-y-1/2 overflow-hidden">
                     <div 
                        className="h-full bg-primary/50 transition-all duration-100" 
                        style={{ width: `${percentage}%` }}
                     />
                </div>

                {/* Thumb Customization - CSS only thumb is hard, using visual div that follows value */}
                <div
                    className={cn(
                        "absolute h-3 w-3 bg-primary border border-primary z-10 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-100 pointer-events-none",
                        "group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(255,88,0,0.5)]",
                        disabled && "bg-muted border-muted"
                    )}
                    style={{ left: `${percentage}%` }}
                />
                
                {/* Ticks (optional - simplified for now) */}
                <div className="absolute inset-x-0 h-1 flex justify-between px-px top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-px h-2 bg-border/50 -mt-0.5" />
                     <div className="w-px h-2 bg-border/50 -mt-0.5" />
                </div>
            </div>
        </div>
    );
}
