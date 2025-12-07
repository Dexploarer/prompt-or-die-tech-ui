"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TechFrame } from "../tech/TechFrame";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
};

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    className,
    size = "md",
}: ModalProps) {
    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
                            "w-full",
                            sizeStyles[size],
                            className
                        )}
                    >
                        <TechFrame variant="default" interactive={false}>
                            <div className="bg-background">
                                {/* Header */}
                                {title && (
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-primary" />
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                                {title}
                                            </span>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                {/* Content */}
                                <div className="p-4">{children}</div>
                            </div>
                        </TechFrame>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
