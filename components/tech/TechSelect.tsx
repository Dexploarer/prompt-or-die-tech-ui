"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechSelectOption {
    value: string;
    label: string;
}

export interface TechSelectProps {
    label?: string;
    options: TechSelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function TechSelect({
    label,
    options,
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
    className,
}: TechSelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close dropdown when clicking outside
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

    const handleSelect = (optionValue: string) => {
        onChange?.(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={cn("w-full", className)} ref={containerRef}>
            {label && (
                <label className="block mb-1.5 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={cn(
                        // Base styles
                        "flex h-9 w-full items-center justify-between px-3",
                        "bg-background border border-border",
                        "font-mono text-xs text-left",
                        // Focus state
                        "focus:outline-none focus:border-primary",
                        // Disabled state
                        "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-muted/20",
                        // Transition
                        "transition-colors duration-200",
                        // Open state
                        isOpen && "border-primary"
                    )}
                    disabled={disabled}
                >
                    <span
                        className={cn(
                            selectedOption ? "text-foreground" : "text-muted-foreground/50"
                        )}
                    >
                        {selectedOption?.label || placeholder}
                    </span>
                    {/* Chevron indicator */}
                    <svg
                        className={cn(
                            "h-3 w-3 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180"
                        )}
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M2 4L6 8L10 4" />
                    </svg>
                </button>

                {/* Dropdown options */}
                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-background border border-border">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={cn(
                                    "flex w-full items-center px-3 py-2",
                                    "font-mono text-xs text-left",
                                    "hover:bg-primary/10 hover:text-primary",
                                    "transition-colors duration-150",
                                    option.value === value &&
                                        "bg-primary/5 text-primary"
                                )}
                            >
                                {/* Small square indicator */}
                                <span
                                    className={cn(
                                        "w-1.5 h-1.5 mr-2",
                                        option.value === value
                                            ? "bg-primary"
                                            : "bg-border"
                                    )}
                                />
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
