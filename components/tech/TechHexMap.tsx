"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechHexMapProps {
    data: { id: string; x: number; y: number; status?: "empty" | "occupied" | "enemy" }[];
    onHexClick?: (id: string) => void;
    className?: string;
    width?: number;
    height?: number;
}

export function TechHexMap({ 
    data, 
    onHexClick, 
    className,
    width = 400,
    height = 300
}: TechHexMapProps) {
    // Hexagon size
    const r = 20; 
    const w = r * Math.sqrt(3);
    const h = r * 2;
    // Spacing
    const xStep = w; 
    const yStep = h * 0.75; 

    return (
        <div className={cn("relative flex items-center justify-center bg-black/40 rounded-lg overflow-hidden", className)}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <path id="hex" d={`M0 ${-r} L${w/2} ${-r/2} L${w/2} ${r/2} L0 ${r} L${-w/2} ${r/2} L${-w/2} ${-r/2} Z`} />
                </defs>

                {/* Draw Hexes */}
                {data.map((hex) => {
                    const px = hex.x * xStep + (hex.y % 2) * (xStep / 2) + 50; // Offset for viewing
                    const py = hex.y * yStep + 50;
                    
                    const isOccupied = hex.status === "occupied";
                    const isEnemy = hex.status === "enemy";
                    const isClickable = !!onHexClick;

                    return (
                        <g 
                            key={hex.id} 
                            transform={`translate(${px}, ${py})`}
                            onClick={() => isClickable && onHexClick(hex.id)}
                            className={cn(isClickable && "cursor-pointer")}
                            style={{ transition: "all 0.3s" }}
                        >
                            <use 
                                href="#hex" 
                                className={cn(
                                    "stroke transition-all duration-300",
                                    isOccupied ? "fill-primary/20 stroke-primary" :
                                    isEnemy ? "fill-destructive/20 stroke-destructive" :
                                    "fill-transparent stroke-white/10 hover:stroke-white/30"
                                )}
                                strokeWidth="1"
                            />
                            {isOccupied && (
                                <circle r="4" className="fill-primary animate-pulse" />
                            )}
                            {isEnemy && (
                                <circle r="4" className="fill-destructive animate-pulse" />
                            )}
                        </g>
                    );
                })}
            </svg>
            
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-muted-foreground/40">
                SECTORS: {data.length}
            </div>
        </div>
    );
}
