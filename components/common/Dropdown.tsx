"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: "left" | "right";
    className?: string;
}

export function Dropdown({
    trigger,
    items,
    align = "left",
    className,
}: DropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Close on click outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on escape
    React.useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false);
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    const handleItemClick = (item: DropdownItem) => {
        if (!item.disabled) {
            item.onClick?.();
            setIsOpen(false);
        }
    };

    return (
        <div className={cn("relative inline-block", className)} ref={containerRef}>
            {/* Trigger */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {/* Menu */}
            {isOpen && (
                <div
                    className={cn(
                        "absolute z-50 mt-1 min-w-[160px] bg-background border border-border shadow-xl",
                        align === "left" ? "left-0" : "right-0"
                    )}
                >
                    {items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => handleItemClick(item)}
                            disabled={item.disabled}
                            className={cn(
                                "w-full flex items-center gap-2 px-3 py-2",
                                "font-mono text-xs text-left",
                                "transition-colors duration-150",
                                item.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-primary/10 hover:text-primary"
                            )}
                        >
                            {item.icon && (
                                <span className="w-4 h-4 shrink-0">{item.icon}</span>
                            )}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
