"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechFrame } from "./TechFrame";
import { cn } from "@/lib/utils";

export interface TechLogEntry {
    id: string;
    timestamp?: string;
    content: React.ReactNode;
    variant?: "default" | "success" | "error" | "warning" | "info";
}

export interface TechLogProps {
    entries: TechLogEntry[];
    title?: string;
    height?: string | number;
    className?: string;
    autoScroll?: boolean;
}

const variantStyles = {
    default: "border-border/30 bg-black/40 text-muted-foreground",
    success: "border-success/30 bg-success/5 text-success",
    error: "border-destructive/30 bg-destructive/5 text-destructive",
    warning: "border-warning/30 bg-warning/5 text-warning",
    info: "border-primary/30 bg-primary/5 text-primary",
};

export function TechLog({
    entries,
    title = "SYSTEM_LOG",
    height = 300,
    className,
    autoScroll = true,
}: TechLogProps) {
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (autoScroll) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [entries, autoScroll]);

    return (
        <div style={{ height }} className={cn("w-full overflow-hidden", className)}>
            <TechFrame
                className="w-full h-full"
                variant="default"
            >
            <div className="flex flex-col h-full bg-card/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-black/60">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                        <span className="text-[9px] font-mono text-primary/80 uppercase tracking-widest">
                            {title}
                        </span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                        {entries.length} ENTRIES
                    </span>
                </div>

                {/* Log Entries */}
                <div className="flex-1 overflow-auto p-3 space-y-1.5 custom-scrollbar font-mono text-xs">
                    <AnimatePresence initial={false}>
                        {entries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={cn(
                                    "px-2 py-1.5 border border-l-2",
                                    variantStyles[entry.variant || "default"]
                                )}
                            >
                                <div className="flex gap-2">
                                    {entry.timestamp && (
                                        <span className="shrink-0 text-[10px] opacity-60 pt-0.5">
                                            [{entry.timestamp}]
                                        </span>
                                    )}
                                    <div className="break-all">{entry.content}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                </div>
            </div>
            </TechFrame>
        </div>
    );
}
