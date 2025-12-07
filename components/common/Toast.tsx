"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ToastProps {
    id: string;
    title?: string;
    message: string;
    variant?: "default" | "success" | "error" | "warning" | "info";
    duration?: number;
    onClose: (id: string) => void;
}

export interface ToastContainerProps {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    children: React.ReactNode;
}

const variantStyles = {
    default: "border-border bg-card",
    success: "border-success/30 bg-success/10",
    error: "border-destructive/30 bg-destructive/10",
    warning: "border-warning/30 bg-warning/10",
    info: "border-info/30 bg-info/10",
};

const iconColors = {
    default: "text-muted-foreground",
    success: "text-success",
    error: "text-destructive",
    warning: "text-warning",
    info: "text-info",
};

const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
};

export function ToastContainer({ position = "top-right", children }: ToastContainerProps) {
    return (
        <div className={cn("fixed z-100 flex flex-col gap-2 max-w-sm w-full", positionStyles[position])}>
            <AnimatePresence mode="popLayout">
                {children}
            </AnimatePresence>
        </div>
    );
}

export function Toast({
    id,
    title,
    message,
    variant = "default",
    duration = 5000,
    onClose,
}: ToastProps) {
    React.useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => onClose(id), duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "relative border p-4 shadow-lg",
                variantStyles[variant]
            )}
        >
            <div className="flex gap-3">
                {/* Icon */}
                <div className={cn("shrink-0 w-1.5 h-1.5 mt-1.5", iconColors[variant].replace("text-", "bg-"))} />
                {/* Content */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <p className="text-sm font-medium text-foreground mb-1">{title}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{message}</p>
                </div>
                {/* Close button */}
                <button
                    onClick={() => onClose(id)}
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {/* Progress bar */}
            {duration > 0 && (
                <motion.div
                    className={cn("absolute bottom-0 left-0 h-0.5 bg-current", iconColors[variant])}
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                />
            )}
        </motion.div>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = React.useState<Omit<ToastProps, "onClose">[]>([]);

    const addToast = React.useCallback((toast: Omit<ToastProps, "id" | "onClose">) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
}
