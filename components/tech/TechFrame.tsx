"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechFrameProps {
    children: React.ReactNode;
    className?: string;
    /** 
     * Size of corner extensions (the crossing lines at each corner). 
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /** 
     * Whether to show hover effects (glowing borders). 
     * @default true
     */
    interactive?: boolean;
    /** 
     * Color variant for the borders. 
     * @default "default"
     */
    variant?: "default" | "primary" | "success" | "error" | "warning";
}

const sizeStyles = {
    sm: {
        corner: "w-2 h-2",
        offset: "-top-1 -left-1",
        offsetTR: "-top-1 -right-1",
        offsetBL: "-bottom-1 -left-1",
        offsetBR: "-bottom-1 -right-1",
    },
    md: {
        corner: "w-3 h-3",
        offset: "-top-1.5 -left-1.5",
        offsetTR: "-top-1.5 -right-1.5",
        offsetBL: "-bottom-1.5 -left-1.5",
        offsetBR: "-bottom-1.5 -right-1.5",
    },
    lg: {
        corner: "w-4 h-4",
        offset: "-top-2 -left-2",
        offsetTR: "-top-2 -right-2",
        offsetBL: "-bottom-2 -left-2",
        offsetBR: "-bottom-2 -right-2",
    },
};

const variantStyles = {
    default: {
        border: "border-border",
        hoverBorder: "group-hover:border-primary/50",
    },
    primary: {
        border: "border-primary/50",
        hoverBorder: "group-hover:border-primary",
    },
    success: {
        border: "border-success/50",
        hoverBorder: "group-hover:border-success",
    },
    error: {
        border: "border-destructive/50",
        hoverBorder: "group-hover:border-destructive",
    },
    warning: {
        border: "border-warning/50",
        hoverBorder: "group-hover:border-warning",
    },
};

/**
 * The foundational container component of the Tech-UI system.
 * Renders a box with "cut" or "extended" corners using pseudo-elements.
 * Used by TechCard, TechPanel, etc.
 */
export function TechFrame({
    children,
    className = "",
    size = "md",
    interactive = true,
    variant = "default",
}: TechFrameProps) {
    const sizeConfig = sizeStyles[size];
    const variantConfig = variantStyles[variant];
    const hoverClass = interactive ? variantConfig.hoverBorder : "";

    return (
        <div className={cn("relative group transition-all duration-300", className)}>
            {/* Main border */}
            <div
                className={cn(
                    "absolute inset-0 border transition-colors duration-300",
                    variantConfig.border,
                    hoverClass
                )}
            />
            {/* Corner extensions - lines that cross at corners */}
            <div
                className={cn(
                    "absolute border-t border-l transition-colors duration-300",
                    sizeConfig.corner,
                    sizeConfig.offset,
                    variantConfig.border,
                    hoverClass
                )}
            />
            <div
                className={cn(
                    "absolute border-t border-r transition-colors duration-300",
                    sizeConfig.corner,
                    sizeConfig.offsetTR,
                    variantConfig.border,
                    hoverClass
                )}
            />
            <div
                className={cn(
                    "absolute border-b border-l transition-colors duration-300",
                    sizeConfig.corner,
                    sizeConfig.offsetBL,
                    variantConfig.border,
                    hoverClass
                )}
            />
            <div
                className={cn(
                    "absolute border-b border-r transition-colors duration-300",
                    sizeConfig.corner,
                    sizeConfig.offsetBR,
                    variantConfig.border,
                    hoverClass
                )}
            />
            <div className="relative">{children}</div>
        </div>
    );
}

// Variant with header section
export interface TechPanelProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    /** Size passed to TechFrame */
    size?: "sm" | "md" | "lg";
    /** Variant passed to TechFrame */
    variant?: "default" | "primary" | "success" | "error" | "warning";
    /** Whether to show hover effects */
    interactive?: boolean;
}

export function TechPanel({
    children,
    title,
    className = "",
    size = "md",
    variant = "default",
    interactive = true,
}: TechPanelProps) {
    return (
        <TechFrame
            className={className}
            size={size}
            variant={variant}
            interactive={interactive}
        >
            {title && (
                <div className="px-4 py-2.5 border-b border-border">
                    <div className="flex items-center gap-2">
                        {/* Small square indicator */}
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                            {title}
                        </span>
                    </div>
                </div>
            )}
            {children}
        </TechFrame>
    );
}
