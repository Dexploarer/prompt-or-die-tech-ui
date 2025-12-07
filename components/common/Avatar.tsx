"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg";
    status?: "online" | "offline" | "away" | "busy";
}

const sizeStyles = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
};

const statusStyles = {
    online: "bg-success",
    offline: "bg-muted-foreground",
    away: "bg-warning",
    busy: "bg-destructive",
};

export function Avatar({
    src,
    alt = "",
    fallback,
    size = "md",
    status,
    className,
    ...props
}: AvatarProps) {
    const [hasError, setHasError] = React.useState(false);

    const initials = fallback || alt?.slice(0, 2).toUpperCase() || "?";

    return (
        <div className={cn("relative inline-block", className)} {...props}>
            <div
                className={cn(
                    "rounded-full overflow-hidden bg-muted flex items-center justify-center font-mono",
                    sizeStyles[size]
                )}
            >
                {src && !hasError ? (
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <span className="text-muted-foreground">{initials}</span>
                )}
            </div>
            {/* Status indicator */}
            {status && (
                <span
                    className={cn(
                        "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
                        size === "sm" && "w-2 h-2",
                        size === "md" && "w-2.5 h-2.5",
                        size === "lg" && "w-3 h-3",
                        statusStyles[status]
                    )}
                />
            )}
        </div>
    );
}
