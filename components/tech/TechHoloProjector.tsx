"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechHoloProjectorProps {
    children: React.ReactNode;
    color?: string; // Hex or CSS var, defaults to primary
    intensity?: "low" | "medium" | "high";
    className?: string;
}

export function TechHoloProjector({ 
    children, 
    color = "var(--primary)",
    intensity = "medium",
    className 
}: TechHoloProjectorProps) {
    return (
        <div className={cn("relative perspective-[1000px] group", className)}>
            {/* Base Projector Platform */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/80 border border-white/10 rounded-[100%] blur-[1px] shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] z-0" />
            
            {/* The Projection Container */}
            <div className={cn(
                "relative transition-all duration-700 transform-style-3d",
                "slide-in-from-bottom-4 animate-in fade-in zoom-in-95 duration-1000"
            )}
            style={{ 
                transform: "rotateX(10deg) translateY(-20px)",
            }}>
                {/* Hologram Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-lg">
                     {/* Horizontal Scanlines */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
                     
                     {/* Rising Glitch Bar */}
                     <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-[scan_3s_linear_infinite]" 
                          style={{ top: '-20%' }}
                     />
                     
                     {/* Flicker / Ghosting */}
                     <div className="absolute inset-0 bg-primary/5 mix-blend-screen opacity-0 animate-[flicker_4s_infinite]" />
                </div>
                
                {/* The Content */}
                <div className={cn(
                    "bg-black/40 border border-primary/30 rounded-lg backdrop-blur-[1px]",
                    intensity === "high" && "shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]",
                    intensity === "medium" && "shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]",
                    intensity === "low" && "shadow-[0_0_5px_rgba(var(--primary-rgb),0.1)]"
                )}>
                    {children}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scan {
                    0% { top: -20%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 120%; opacity: 0; }
                }
                @keyframes flicker {
                    0% { opacity: 0.02; transform: translateX(0); }
                    5% { opacity: 0.05; transform: translateX(1px); }
                    10% { opacity: 0.02; transform: translateX(0); }
                    15% { opacity: 0.06; transform: translateX(-1px); }
                    20% { opacity: 0.02; transform: translateX(0); }
                    100% { opacity: 0.02; }
                }
            `}} />
        </div>
    );
}
