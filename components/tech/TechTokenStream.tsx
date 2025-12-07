"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface TechToken {
    id: string;
    text: string;
    /** The semantic type of the token, determining its styling */
    type: "text" | "thought" | "tool_call" | "tool_result" | "error";
    delay?: number; // Simulated streaming delay
}

export interface TechTokenStreamProps {
    /** Array of tokens to display */
    tokens: TechToken[];
    /** 
     * Speed of streaming in milliseconds per token. 
     * @default 20
     */
    speed?: number;
    /** 
     * Whether to automatically scroll to the bottom as new tokens appear. 
     * @default true
     */
    autoScroll?: boolean;
    className?: string;
    height?: string | number;
}

/**
 * Visualizes an LLM stream with "Agentic" aesthetics.
 * Features distinct styling for thoughts, tool calls, and errors.
 * Simulates a typewriter effect based on the `speed` prop.
 */

const tokenStyles = {
    text: "text-foreground font-mono",
    thought: "text-muted-foreground italic font-mono opacity-80",
    tool_call: "text-blue-400 font-mono",
    tool_result: "text-green-400 font-mono",
    error: "text-red-500 font-mono font-bold",
};

export function TechTokenStream({
    tokens,
    speed = 20,
    autoScroll = true,
    className,
    height = 300,
}: TechTokenStreamProps) {
    const [visibleCount, setVisibleCount] = React.useState(0);
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (visibleCount < tokens.length) {
            const timeout = setTimeout(() => {
                setVisibleCount((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [visibleCount, tokens.length, speed]);

    React.useEffect(() => {
        if (autoScroll) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [visibleCount, autoScroll]);

    return (
        <div 
            className={cn("bg-black/90 p-4 font-mono text-sm leading-relaxed overflow-y-auto border-l-2 border-primary/20", className)}
            style={{ height }}
        >
             <div className="space-x-1 whitespace-pre-wrap break-words">
                {tokens.slice(0, visibleCount).map((token) => (
                    <motion.span
                        key={token.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("inline-block", tokenStyles[token.type])}
                    >
                        {token.text}
                    </motion.span>
                ))}
                
                {visibleCount < tokens.length && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle ml-1" />
                )}
             </div>
             <div ref={bottomRef} />
        </div>
    );
}
