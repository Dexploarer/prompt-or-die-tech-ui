"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "info" | "success" | "warning" | "error";
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const variantStyles = {
    default: {
        container: "border-border bg-card/50",
        icon: "text-muted-foreground",
        title: "text-foreground",
    },
    info: {
        container: "border-info/30 bg-info/5",
        icon: "text-info",
        title: "text-info",
    },
    success: {
        container: "border-success/30 bg-success/5",
        icon: "text-success",
        title: "text-success",
    },
    warning: {
        container: "border-warning/30 bg-warning/5",
        icon: "text-warning",
        title: "text-warning",
    },
    error: {
        container: "border-destructive/30 bg-destructive/5",
        icon: "text-destructive",
        title: "text-destructive",
    },
};

const icons = {
    default: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
        </svg>
    ),
    info: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
        </svg>
    ),
    success: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    warning: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
    ),
    error: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
        </svg>
    ),
};

export function Alert({
    variant = "default",
    title,
    dismissible = false,
    onDismiss,
    children,
    className,
    ...props
}: AlertProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "relative flex gap-3 p-4 border",
                styles.container,
                className
            )}
            role="alert"
            {...props}
        >
            {/* Icon */}
            <div className={cn("shrink-0 mt-0.5", styles.icon)}>
                {icons[variant]}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
                {title && (
                    <h5 className={cn("text-sm font-mono font-medium mb-1", styles.title)}>
                        {title}
                    </h5>
                )}
                <div className="text-sm text-muted-foreground">{children}</div>
            </div>
            {/* Dismiss button */}
            {dismissible && (
                <button
                    onClick={onDismiss}
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
