"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechGridColumn<T> {
    header: string;
    accessorKey: keyof T | ((item: T) => React.ReactNode);
    width?: string;
    align?: "left" | "center" | "right";
}

export interface TechGridProps<T> {
    data: T[];
    columns: TechGridColumn<T>[];
    onRowClick?: (item: T) => void;
    className?: string;
    emptyMessage?: string;
}

export function TechGrid<T extends { id?: string | number }>({
    data,
    columns,
    onRowClick,
    className,
    emptyMessage = "NO DATA",
}: TechGridProps<T>) {
    return (
        <div className={cn("w-full border border-border/50", className)}>
            {/* Header */}
            <div className="flex w-full border-b border-border/50 bg-muted/5">
                {columns.map((col, i) => (
                    <div
                        key={i}
                        className={cn(
                            "px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground",
                            col.width ? `w-[${col.width}]` : "flex-1",
                            col.align === "center" && "text-center",
                            col.align === "right" && "text-right",
                            i < columns.length - 1 && "border-r border-border/50"
                        )}
                    >
                        {col.header}
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/30">
                {data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <div
                            key={item.id || rowIndex}
                            onClick={() => onRowClick?.(item)}
                            className={cn(
                                "flex w-full transition-colors hover:bg-white/5",
                                onRowClick && "cursor-pointer"
                            )}
                        >
                            {columns.map((col, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={cn(
                                        "px-4 py-2.5 text-xs font-mono text-foreground/80",
                                        col.width ? `w-[${col.width}]` : "flex-1",
                                        col.align === "center" && "text-center",
                                        col.align === "right" && "text-right",
                                        colIndex < columns.length - 1 && "border-r border-border/30"
                                    )}
                                >
                                    {typeof col.accessorKey === "function"
                                        ? col.accessorKey(item)
                                        : (item[col.accessorKey] as React.ReactNode)}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center bg-black/20">
                        <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                            {emptyMessage}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
