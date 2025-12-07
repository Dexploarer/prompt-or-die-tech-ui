"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

export function CodeBlock({
    code,
    language = "typescript",
    showLineNumbers = true,
    className,
}: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split("\n");

    return (
        <div className={cn("relative group border border-border bg-black/50 rounded-lg overflow-hidden", className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest ml-2">
                        {language}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-xs leading-relaxed">
                    <code>
                        {lines.map((line, i) => (
                            <div key={i} className="table-row">
                                {showLineNumbers && (
                                    <span className="table-cell pr-4 text-right text-muted-foreground/30 select-none user-select-none">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="table-cell text-foreground/90 whitespace-pre">
                                    {line || "\n"}
                                </span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}
