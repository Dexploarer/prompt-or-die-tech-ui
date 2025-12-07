"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechTooltipProps {
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    children: React.ReactNode;
    className?: string;
}

export function TechTooltip({
    content,
    position = "top",
    children,
    className,
}: TechTooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    const positionStyles = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div
            className={cn("relative inline-block", className)}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {/* Tooltip */}
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 pointer-events-none",
                        positionStyles[position]
                    )}
                >
                    <div className="relative">
                        {/* Tooltip content box */}
                        <div
                            className={cn(
                                "px-2.5 py-1.5",
                                "bg-card border border-border",
                                "font-mono text-[10px] text-foreground",
                                "whitespace-nowrap"
                            )}
                        >
                            {/* Corner indicators */}
                            <div className="absolute -top-0.5 -left-0.5 w-1 h-1 border-t border-l border-primary" />
                            <div className="absolute -top-0.5 -right-0.5 w-1 h-1 border-t border-r border-primary" />
                            <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 border-b border-l border-primary" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 border-b border-r border-primary" />
                            {content}
                        </div>
                        {/* Arrow indicator - small square */}
                        <div
                            className={cn(
                                "absolute w-1.5 h-1.5 bg-card border border-border rotate-45",
                                position === "top" && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0",
                                position === "bottom" && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-b-0 border-r-0",
                                position === "left" && "left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-l-0 border-b-0",
                                position === "right" && "right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-r-0 border-t-0"
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
