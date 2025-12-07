"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechStatusBarItem {
    label: string | React.ReactNode;
    value?: string | React.ReactNode;
    icon?: React.ReactNode;
    status?: "default" | "success" | "warning" | "error";
    onClick?: () => void;
}

export interface TechStatusBarProps {
    leftItems?: TechStatusBarItem[];
    rightItems?: TechStatusBarItem[];
    className?: string;
    version?: string;
}

export function TechStatusBar({
    leftItems = [],
    rightItems = [],
    className,
    version,
}: TechStatusBarProps) {
    const renderItem = (item: TechStatusBarItem, index: number) => (
        <div
            key={index}
            onClick={item.onClick}
            className={cn(
                "flex items-center gap-2",
                item.onClick && "cursor-pointer hover:text-foreground transition-colors"
            )}
        >
            {item.icon}
            {item.status && (
                <div
                    className={cn(
                        "w-1 h-1 rounded-full",
                        item.status === "success" && "bg-success",
                        item.status === "warning" && "bg-warning",
                        item.status === "error" && "bg-destructive",
                        item.status === "default" && "bg-muted-foreground"
                    )}
                />
            )}
            <span>{item.label}</span>
            {item.value && (
                <>
                    <span className="opacity-50">·</span>
                    <span className="text-foreground/80">{item.value}</span>
                </>
            )}
        </div>
    );

    return (
        <footer
            className={cn(
                "w-full border-t border-border/50 bg-background/95 backdrop-blur-sm",
                "text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest",
                className
            )}
        >
            <div className="flex items-center justify-between h-8 px-4">
                <div className="flex items-center gap-4">
                    {version && <span>{version}</span>}
                    {version && leftItems.length > 0 && <span>·</span>}
                    {leftItems.map((item, i) => (
                        <React.Fragment key={i}>
                            {renderItem(item, i)}
                            {i < leftItems.length - 1 && <span>·</span>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {rightItems.map((item, i) => (
                        <React.Fragment key={i}>
                            {renderItem(item, i)}
                            {i < rightItems.length - 1 && <span>·</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </footer>
    );
}
