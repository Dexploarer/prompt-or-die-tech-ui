"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TechFrame } from "./TechFrame";

export interface TechModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[95vw]",
};

export function TechModal({
    isOpen,
    onClose,
    title,
    children,
    className,
    size = "md",
}: TechModalProps) {
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
                    {/* Backdrop with Scanlines */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[length:100%_4px] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,255,0,0.1)_50%)]" />
                    </motion.div>
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
                            "w-full px-4",
                            sizeStyles[size],
                            className
                        )}
                    >
                        <TechFrame variant="default" interactive={false} className="shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                            <div className="bg-background/95 backdrop-blur-md">
                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary animate-pulse" />
                                        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                                            {title || "SYSTEM_DIALOG"}
                                        </span>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-white/5 rounded"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Content */}
                                <div className="p-6 relative">
                                    {children}
                                    
                                    {/* Corner Decorations */}
                                    <div className="absolute bottom-2 right-2 flex gap-1">
                                        <div className="w-1 h-1 bg-muted-foreground/20" />
                                        <div className="w-1 h-1 bg-muted-foreground/20" />
                                        <div className="w-1 h-1 bg-muted-foreground/20" />
                                    </div>
                                </div>
                            </div>
                        </TechFrame>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
