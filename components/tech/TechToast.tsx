"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TechToastProps {
    id: string;
    title?: string;
    message: string;
    variant?: "default" | "success" | "error" | "warning" | "info";
    duration?: number;
    onClose: (id: string) => void;
}

export interface TechToastContainerProps {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    children: React.ReactNode;
}

const variantStyles = {
    default: "border-border bg-card/90",
    success: "border-success/50 bg-success/10",
    error: "border-error/50 bg-error/10",
    warning: "border-warning/50 bg-warning/10",
    info: "border-info/50 bg-info/10",
};

const iconColors = {
    default: "bg-muted-foreground",
    success: "bg-success",
    error: "bg-error",
    warning: "bg-warning",
    info: "bg-info",
};

const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
};

export function TechToastContainer({ position = "bottom-right", children }: TechToastContainerProps) {
    return (
        <div className={cn("fixed z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none", positionStyles[position])}>
            <AnimatePresence mode="popLayout">
                {children}
            </AnimatePresence>
        </div>
    );
}

export function TechToast({
    id,
    title,
    message,
    variant = "default",
    duration = 5000,
    onClose,
}: TechToastProps) {
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
                "relative border p-3 shadow-lg pointer-events-auto backdrop-blur-md overflow-hidden group",
                variantStyles[variant]
            )}
        >
            {/* Tech Decoration */}
            <div className="absolute top-0 left-0 w-1 h-full bg-border opacity-50" />
            <div className={cn("absolute top-0 left-0 w-1 h-3 transition-height duration-[5000ms] ease-linear", iconColors[variant])} 
                 style={{ height: duration > 0 ? '100%' : '20%' }}
            />
            
            <div className="flex gap-3 pl-2">
                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        {title && (
                            <p className="text-[10px] uppercase tracking-widest font-mono text-foreground font-bold">{title}</p>
                        )}
                        {!title && <div />}
                        
                        <button
                            onClick={() => onClose(id)}
                            className="text-muted-foreground hover:text-foreground transition-colors ml-2"
                        >
                            <span className="text-[10px] font-mono">[X]</span>
                        </button>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground/90 leading-relaxed">{message}</p>
                </div>
            </div>

            {/* Corner Bracket */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-border opacity-50" />
        </motion.div>
    );
}

// Hook for managing toasts
export function useTechToast() {
    const [toasts, setToasts] = React.useState<Omit<TechToastProps, "onClose">[]>([]);

    const addToast = React.useCallback((toast: Omit<TechToastProps, "id" | "onClose">) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
}
