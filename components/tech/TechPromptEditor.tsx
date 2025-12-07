"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechPromptEditorProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    variables?: string[]; // Variables to highlight, e.g. ["user", "context"]
}

export function TechPromptEditor({
    className,
    label,
    value,
    onChange,
    variables = [],
    disabled,
    ...props
}: TechPromptEditorProps) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [focused, setFocused] = React.useState(false);

    // Sync scroll
    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const backdrop = e.currentTarget.nextElementSibling;
        if (backdrop) {
            backdrop.scrollTop = e.currentTarget.scrollTop;
            backdrop.scrollLeft = e.currentTarget.scrollLeft;
        }
    };

    // Heuristic token count
    const tokenCount = React.useMemo(() => Math.ceil(value.length / 4), [value]);
    
    // Highlight logic
    const highlightedContent = React.useMemo(() => {
        let text = value;
        // Escape HTML
        text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        // Highlight {{...}} pattern
        text = text.replace(/\{\{([^}]+)\}\}/g, (match, content) => {
            const isKnown = variables.length === 0 || variables.includes(content.trim());
            const colorClass = isKnown ? "text-primary bg-primary/20" : "text-warning bg-warning/20";
            return `<span class="${colorClass} px-0.5 rounded font-bold">${match}</span>`;
        });
        
        // Add trailing newline for alignment
        if (value[value.length - 1] === "\n") {
            text += "<br />";
        }
        
        return text;
    }, [value, variables]);

    return (
        <div className={cn("w-full group", className)}>
            <div className="flex items-center justify-between mb-1.5">
                {label && (
                    <label className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        {label}
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                    </label>
                )}
                <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                    ~{tokenCount} TOKENS
                </div>
            </div>

            <div className={cn(
                "relative font-mono text-xs overflow-hidden rounded",
                "bg-black/20 border transition-colors duration-200",
                focused ? "border-primary" : "border-border hover:border-border/80",
                disabled && "opacity-50 cursor-not-allowed"
            )}>
                {/* Editor Container */}
                <div className="relative min-h-[120px]">
                    {/* Syntax Highlighter (Backdrop) */}
                    <div 
                        className="absolute inset-0 p-3 pointer-events-none whitespace-pre-wrap break-words text-transparent"
                        aria-hidden="true"
                    >
                        <div 
                            dangerouslySetInnerHTML={{ __html: highlightedContent }} 
                            className="font-mono text-xs leading-relaxed"
                        />
                    </div>

                    {/* TextArea (Foreground) */}
                    <textarea
                        {...props}
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onScroll={handleScroll}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        disabled={disabled}
                        className={cn(
                            "absolute inset-0 w-full h-full p-3 bg-transparent text-foreground caret-primary resize-y focus:outline-none",
                            "font-mono text-xs leading-relaxed whitespace-pre-wrap break-words"
                        )}
                        spellCheck={false}
                    />
                </div>
                
                {/* Status Bar */}
                <div className="border-t border-white/5 bg-black/40 px-2 py-1 flex items-center justify-between">
                    <div className="flex gap-2">
                         <span className="text-[8px] text-muted-foreground uppercase">Ln {value.split('\n').length}</span>
                         <span className="text-[8px] text-muted-foreground uppercase">Ch {value.length}</span>
                    </div>
                    <div className="flex gap-1">
                        {variables.map(v => (
                            <span key={v} className="text-[8px] px-1 rounded bg-primary/10 text-primary border border-primary/20">
                                {v}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Help text */}
            <div className="mt-1 flex gap-2 text-[9px] text-muted-foreground/50 italic">
                <span>* Use {"{{variable}}"} to insert dynamic content</span>
            </div>
        </div>
    );
}
