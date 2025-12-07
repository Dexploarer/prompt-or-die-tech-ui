"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechFrame } from "./TechFrame";

export interface TechTerminalProps {
    initialLines?: string[];
    onCommand?: (command: string) => Promise<string | void> | string | void;
    promptLabel?: string;
    height?: string | number;
    className?: string;
}

export function TechTerminal({
    initialLines = ["WELCOME TO TECH_OS v1.0.0", "TYPE 'HELP' FOR COMMANDS"],
    onCommand,
    promptLabel = ">",
    height = 300,
    className,
}: TechTerminalProps) {
    const [lines, setLines] = React.useState<string[]>(initialLines);
    const [input, setInput] = React.useState("");
    const [isProcessing, setIsProcessing] = React.useState(false);
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isProcessing) {
            const cmd = input.trim();
            if (!cmd) return;

            setLines((prev) => [...prev, `${promptLabel} ${cmd}`]);
            setInput("");
            setIsProcessing(true);

            try {
                if (onCommand) {
                    const response = await onCommand(cmd);
                    if (response) {
                        setLines((prev) => [...prev, response]);
                    }
                } else {
                    // Default behavior
                    if (cmd.toLowerCase() === "clear") {
                        setLines([]);
                    } else if (cmd.toLowerCase() === "help") {
                        setLines((prev) => [...prev, "AVAILABLE COMMANDS: HELP, CLEAR, ECHO <TEXT>"]);
                    } else if (cmd.toLowerCase().startsWith("echo ")) {
                        setLines((prev) => [...prev, cmd.substring(5)]);
                    } else {
                        setLines((prev) => [...prev, `UNKNOWN COMMAND: ${cmd}`]);
                    }
                }
            } catch (err) {
                 setLines((prev) => [...prev, `ERROR: ${String(err)}`]);
            } finally {
                setIsProcessing(false);
                // Keep focus
                requestAnimationFrame(() => inputRef.current?.focus());
            }
        }
    };

    return (
        <TechFrame
            className={cn("w-full overflow-hidden font-mono text-sm", className)}
            variant="default"
        >
             <div 
                className="flex flex-col bg-black/80 p-4 overflow-hidden"
                style={{ height }}
                onClick={() => inputRef.current?.focus()}
             >
                <div className="flex-1 overflow-auto space-y-1 custom-scrollbar">
                    {lines.map((line, i) => (
                        <div key={i} className="text-muted-foreground/80 break-all whitespace-pre-wrap">
                            {line}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                
                <div className="flex items-center mt-2 border-t border-white/10 pt-2">
                    <span className="text-primary mr-2 select-none">{promptLabel}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isProcessing}
                        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-white/20"
                        placeholder={isProcessing ? "PROCESSING..." : ""}
                        autoFocus
                    />
                </div>
             </div>
        </TechFrame>
    );
}
