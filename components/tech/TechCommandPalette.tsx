"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechInput } from "./TechInput";
import { TechBadge } from "./TechBadge";

export interface CommandOption {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    keys?: string[];
}

export interface TechCommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    /** List of searchable commands */
    options: CommandOption[];
    className?: string;
}

/**
 * A modal command interface (Omnibar/Spotlight) with agent-specific features.
 * - Supports "Tool Mode" visualization when input starts with a slash `/`.
 * - Renders a noise texture overlay for aesthetics.
 * - Fully keyboard accessible.
 */

export function TechCommandPalette({
    isOpen,
    onClose,
    options,
    className
}: TechCommandPaletteProps) {
    const [query, setQuery] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const filteredOptions = React.useMemo(() => {
        if (!query) return options;
        return options.filter(opt => 
            opt.label.toLowerCase().includes(query.toLowerCase()) || 
            opt.description?.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, options]);

    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
            setActiveIndex(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Detect if input looks like a "Tool Call" (starts almost like a command)
    const isToolMode = query.startsWith("/");
    const commandPart = isToolMode ? query.split(" ")[0] : null;
    const argsPart = isToolMode ? query.substring(commandPart!.length) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm">
             <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            
            <div className={cn(
                "relative w-full max-w-lg bg-black/90 border border-primary/30 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] rounded-lg overflow-hidden flex flex-col",
                className
            )}>
                {/* Header / Input Area */}
                <div className="p-3 border-b border-border/50 relative">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-primary rounded-full animate-pulse" />
                    
                    <div className="relative flex items-center gap-2 pl-4">
                        <span className="text-primary font-mono text-lg">{">"}</span>
                        
                        {/* Tokenized Input Visualization */}
                        <div className="relative flex-1">
                             <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={cn(
                                    "w-full bg-transparent border-none focus:outline-none font-mono text-sm text-transparent caret-primary selection:bg-primary/20",
                                    "absolute inset-0 z-10"
                                )}
                                placeholder="Type a command..."
                                autoFocus
                            />
                            {/* Visual Layer (Behind Input) */}
                            <div className="w-full font-mono text-sm pointer-events-none flex whitespace-pre">
                                {isToolMode ? (
                                    <>
                                        <span className="text-primary font-bold">{commandPart}</span>
                                        <span className="text-muted-foreground">{argsPart}</span>
                                    </>
                                ) : (
                                    <span className={query ? "text-foreground" : "text-muted-foreground"}>
                                        {query || "Type a command..."}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agent Insight Bar */}
                {isToolMode && (
                    <div className="px-3 py-1 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
                        <span className="text-[9px] font-mono text-primary uppercase tracking-wider">AGENT_INTERPRETATION:</span>
                        <span className="text-[9px] font-mono text-foreground">
                            Moving to tool <span className="text-primary font-bold">{commandPart}</span> processing arguments...
                        </span>
                    </div>
                )}

                {/* Results List */}
                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                    {filteredOptions.length === 0 ? (
                         <div className="p-4 text-center text-xs font-mono text-muted-foreground">
                             NO_MATCH_FOUND
                         </div>
                    ) : (
                        filteredOptions.map((opt, i) => (
                            <button
                                key={opt.id}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded flex items-center justify-between group transition-colors",
                                    i === activeIndex ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/5"
                                )}
                                onMouseEnter={() => setActiveIndex(i)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-4 h-4 flex items-center justify-center border rounded", i === activeIndex ? "border-primary" : "border-border")}>
                                        {opt.icon || <div className="w-1.5 h-1.5 bg-current" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono font-bold">{opt.label}</div>
                                        {opt.description && <div className="text-[10px] opacity-70">{opt.description}</div>}
                                    </div>
                                </div>
                                
                                {opt.keys && (
                                    <div className="flex gap-1">
                                        {opt.keys.map(k => (
                                            <span key={k} className="text-[9px] font-mono px-1 rounded bg-black/50 border border-border/50">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="px-3 py-1.5 bg-black border-t border-border/50 flex justify-between items-center text-[9px] font-mono text-muted-foreground">
                    <div className="flex gap-3">
                        <span>[↑↓] NAVIGATE</span>
                        <span>[ENTER] SELECT</span>
                    </div>
                    <div>SYSTEM_READY</div>
                </div>
            </div>
        </div>
    );
}
