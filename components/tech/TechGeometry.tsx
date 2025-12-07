"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechGeometryProps {
    shape?: "cube" | "pyramid" | "grid";
    color?: string;
    size?: number;
    speed?: number; // seconds per rotation
    className?: string;
}

export function TechGeometry({
    shape = "cube",
    color = "#ff5800",
    size = 100,
    speed = 10,
    className
}: TechGeometryProps) {
    const half = size / 2;

    return (
        <div 
            className={cn("relative perspective-[1000px] flex items-center justify-center pointer-events-none", className)}
            style={{ width: size, height: size }}
        >
            <div 
                className="transform-style-3d animate-[spin3d_linear_infinite]"
                style={{ 
                    width: size, 
                    height: size, 
                    animationDuration: `${speed}s`,
                    '--geo-color': color 
                } as React.CSSProperties}
            >
                {shape === "cube" && (
                     <>
                        {/* Front */}
                        <div className="absolute inset-0 border border-[var(--geo-color)] bg-[var(--geo-color)]/5 backface-visible" 
                             style={{ transform: `translateZ(${half}px)` }} />
                        {/* Back */}
                        <div className="absolute inset-0 border border-[var(--geo-color)] bg-[var(--geo-color)]/5 backface-visible" 
                             style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
                        {/* Right */}
                        <div className="absolute inset-0 border border-[var(--geo-color)] bg-[var(--geo-color)]/5 backface-visible" 
                             style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
                        {/* Left */}
                        <div className="absolute inset-0 border border-[var(--geo-color)] bg-[var(--geo-color)]/5 backface-visible" 
                             style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
                        {/* Top */}
                        <div className="absolute inset-0 border border-[var(--geo-color)] bg-[var(--geo-color)]/5 backface-visible" 
                             style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
                        {/* Bottom */}
                        <div className="absolute inset-0 border border-[var(--geo-color)] bg-[var(--geo-color)]/5 backface-visible" 
                             style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
                     </>
                )}

                {shape === "grid" && (
                    <>
                         <div className="absolute inset-0 border border-[var(--geo-color)] rounded-full opacity-50" style={{ transform: 'rotateX(90deg)' }} />
                         <div className="absolute inset-0 border border-[var(--geo-color)] rounded-full opacity-50" style={{ transform: 'rotateY(90deg)' }} />
                         <div className="absolute inset-0 border border-[var(--geo-color)] rounded-full opacity-50" />
                         <div className="absolute inset-[25%] border border-[var(--geo-color)] rounded-full opacity-80" style={{ transform: 'rotateX(45deg) rotateY(45deg)' }} />
                    </>
                )}

                {shape === "pyramid" && (
                    <div className="relative w-full h-full transform-style-3d -translate-y-[25%]">
                        {/* Base */}
                        <div className="absolute left-0 top-full w-full h-full border border-[var(--geo-color)] bg-[var(--geo-color)]/5"
                             style={{ transform: `rotateX(90deg) translateZ(-${half}px)`, height: size }} />
                        
                        {/* Sides - Approximated for CSS */}
                        <div className="absolute top-0 left-0 w-full h-full origin-bottom border-l border-r border-b border-[var(--geo-color)] clip-triangle bg-[var(--geo-color)]/5"
                             style={{ transform: `rotateX(30deg) translateZ(${half/2}px)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                         <div className="absolute top-0 left-0 w-full h-full origin-bottom border-l border-r border-b border-[var(--geo-color)] clip-triangle bg-[var(--geo-color)]/5"
                             style={{ transform: `rotateY(90deg) rotateX(30deg) translateZ(${half/2}px)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                         <div className="absolute top-0 left-0 w-full h-full origin-bottom border-l border-r border-b border-[var(--geo-color)] clip-triangle bg-[var(--geo-color)]/5"
                             style={{ transform: `rotateY(180deg) rotateX(30deg) translateZ(${half/2}px)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                         <div className="absolute top-0 left-0 w-full h-full origin-bottom border-l border-r border-b border-[var(--geo-color)] clip-triangle bg-[var(--geo-color)]/5"
                             style={{ transform: `rotateY(-90deg) rotateX(30deg) translateZ(${half/2}px)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spin3d {
                    0% { transform: rotateX(0deg) rotateY(0deg); }
                    100% { transform: rotateX(360deg) rotateY(360deg); }
                }
            `}} />
        </div>
    );
}
