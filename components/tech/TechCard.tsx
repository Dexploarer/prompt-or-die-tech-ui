"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechFrame } from "./TechFrame";

export interface TechCardProps {
    /**
     * Optional title to display in the card header.
     * Incorporates a tech-styled square indicator.
     */
    title?: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * A container component based on TechFrame with an optional header/title section.
 * Perfect for grouping content in a dashboard or HUD.
 */
export function TechCard({ title, children, className }: TechCardProps) {
    return (
        <TechFrame className={className}>
            <div className="bg-card/50">
                {title && (
                    <div className="px-4 py-2.5 border-b border-border">
                        <div className="flex items-center gap-2">
                            {/* Small square indicator before title */}
                            <span className="w-1.5 h-1.5 bg-primary" />
                            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                                {title}
                            </span>
                        </div>
                    </div>
                )}
                <div className={cn("p-4", !title && "pt-4")}>{children}</div>
            </div>
        </TechFrame>
    );
}
