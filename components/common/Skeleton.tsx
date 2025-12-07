"use client";

import { cn } from "@/lib/utils";

export interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
    animate?: boolean;
}

export function Skeleton({
    className,
    variant = "text",
    width,
    height,
    animate = true,
}: SkeletonProps) {
    const baseStyles = "bg-muted/50";
    
    const variantStyles = {
        text: "rounded h-4 w-full",
        circular: "rounded-full",
        rectangular: "rounded",
    };

    const style: React.CSSProperties = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
    };

    return (
        <div
            className={cn(
                baseStyles,
                variantStyles[variant],
                animate && "animate-pulse",
                className
            )}
            style={style}
        />
    );
}

// Pre-built skeleton patterns
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant="text"
                    className={i === lines - 1 ? "w-3/4" : undefined}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("p-4 space-y-4", className)}>
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" className="w-1/3" />
                    <Skeleton variant="text" className="w-1/4" />
                </div>
            </div>
            <SkeletonText lines={3} />
        </div>
    );
}
