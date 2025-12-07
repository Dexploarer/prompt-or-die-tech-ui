"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechFrame } from "./TechFrame";

export interface TechRadarPoint {
    x: number; // 0-100 percentage
    y: number; // 0-100 percentage
    color?: string;
    pulse?: boolean;
    size?: number;
    label?: string;
}

export interface TechRadarProps {
    points: TechRadarPoint[];
    gridSize?: number; // Number of grid lines
    className?: string;
    scannedArea?: number; // 0-100 percentage of "scanned" area visualization
}

export function TechRadar({ 
    points, 
    gridSize = 4, 
    className,
    scannedArea = 100 
}: TechRadarProps) {
    return (
        <TechFrame className={cn("aspect-square relative overflow-hidden bg-black/60", className)} variant="default">
            {/* Grid Overlay */}
            <div className="absolute inset-0 grid" style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)` 
            }}>
                {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                    <div key={i} className="border border-white/5" />
                ))}
            </div>

            {/* Circular Radar Sweep Effect */}
            <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.4] opacity-20 animate-[spin_4s_linear_infinite]" 
                 style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, var(--primary) 360deg)', maskImage: 'radial-gradient(circle, transparent 30%, black 70%)' }}
            />

            {/* Points */}
            {points.map((point, i) => (
                <div
                    key={i}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                    <div
                        className={cn(
                            "rounded-full transition-all duration-300",
                            point.color || "bg-primary",
                            point.pulse && "animate-pulse"
                        )}
                        style={{ 
                            width: point.size || 6, 
                            height: point.size || 6,
                            boxShadow: `0 0 10px ${point.color || 'var(--primary)'}` 
                        }}
                    />
                    {point.label && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono whitespace-nowrap bg-black/80 px-1 py-0.5 rounded border border-white/10 select-none pointer-events-none z-10">
                            {point.label}
                        </div>
                    )}
                </div>
            ))}

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIC8+Cjwvc3ZnPg==')] opacity-30" />
            
            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-primary/40 tracking-widest">
                RADAR_ACTIVE
            </div>
        </TechFrame>
    );
}
