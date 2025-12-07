"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechSwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
}

export function TechSwitch({
    checked,
    onCheckedChange,
    disabled,
    label,
    className
}: TechSwitchProps) {
    return (
        <label className={cn("inline-flex items-center gap-3 cursor-pointer group", className, disabled && "opacity-50 cursor-not-allowed")}>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onCheckedChange?.(e.target.checked)}
                    disabled={disabled}
                />
                
                {/* Track */}
                <div className={cn(
                    "w-10 h-5 border transition-colors duration-200 relative overflow-hidden",
                     checked ? "border-primary bg-primary/10" : "border-border bg-background group-hover:border-primary/50"
                )}>
                    {/* Grid background in track */}
                    <div className="absolute inset-0 opacity-20" 
                         style={{ backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(var(--primary-rgb), 0.5) 50%)`, backgroundSize: "4px 100%" }} 
                    />

                    {/* Thumb */}
                    <div className={cn(
                        "absolute top-0 bottom-0 w-4 bg-primary transition-all duration-200 transform",
                        checked ? "translate-x-5" : "translate-x-0",
                        !checked && "bg-muted-foreground/50 group-hover:bg-primary/50"
                    )}>
                        {/* Mechanical detail on thumb */}
                        <div className="absolute inset-y-1 right-1 w-px bg-black/30" />
                        <div className="absolute inset-y-1 right-2 w-px bg-black/30" />
                    </div>
                </div>
            </div>
            
            {label && (
                <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wide">
                    {label}
                </span>
            )}
        </label>
    );
}
