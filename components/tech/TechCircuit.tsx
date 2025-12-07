"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechCircuitProps {
    children: React.ReactNode[];
    columns?: number;
    className?: string;
}

export function TechCircuit({ children, columns = 2, className }: TechCircuitProps) {
    const childArray = React.Children.toArray(children);

    return (
        <div className={cn("relative p-8 bg-black/20 rounded-xl overflow-hidden", className)}>
            {/* PCB Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 L40 10 L40 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="10" cy="10" r="2" fill="currentColor"/>
                        <circle cx="40" cy="40" r="2" fill="currentColor"/>
                        
                        <path d="M60 60 L90 60 L90 90" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="60" cy="60" r="2" fill="currentColor"/>
                        <circle cx="90" cy="90" r="2" fill="currentColor"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit-pattern)"/>
                 </svg>
            </div>

            {/* Layout Grid */}
            <div 
                className="relative z-10 grid gap-8"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
                {childArray.map((child, i) => (
                    <div key={i} className="relative">
                        {/* Connection Trace to Next Item (if valid) */}
                        {i < childArray.length - 1 && (
                            <div className="absolute top-1/2 -right-4 w-8 h-8 pointer-events-none hidden md:block z-0">
                                { /* Draw a line to the right neighbor if in same row, or down if wrapping? 
                                     Simplified: Assume 2 columns, odd items connect to right, even items connect down/across 
                                */ }
                                <div className="absolute top-[50%] left-[-20%] w-[140%] h-[2px] bg-primary/20">
                                    <div className="absolute inset-y-0 left-0 w-8 bg-primary animate-[moveRight_2s_linear_infinite]" />
                                </div>
                            </div>
                        )}
                        
                        {/* Wrappers decoration */}
                        <div className="bg-black/40 border border-white/5 p-1 rounded-lg backdrop-blur-sm relative group">
                            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary/30 group-hover:border-primary transition-colors" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary/30 group-hover:border-primary transition-colors" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-primary/30 group-hover:border-primary transition-colors" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary/30 group-hover:border-primary transition-colors" />
                            {child}
                        </div>
                    </div>
                ))}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes moveRight {
                    0% { left: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
            `}} />
        </div>
    );
}
