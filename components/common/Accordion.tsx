"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
    id: string;
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export interface AccordionProps {
    items: AccordionItemProps[];
    allowMultiple?: boolean;
    className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
        const initial = new Set<string>();
        items.forEach((item) => {
            if (item.defaultOpen) initial.add(item.id);
        });
        return initial;
    });

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                if (!allowMultiple) next.clear();
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className={cn("w-full", className)}>
            {items.map((item) => {
                const isOpen = openItems.has(item.id);
                return (
                    <div key={item.id} className="border-b border-border">
                        <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                                "flex w-full items-center justify-between py-3 px-1",
                                "text-sm font-medium text-foreground hover:text-primary",
                                "transition-colors duration-200"
                            )}
                        >
                            <span>{item.title}</span>
                            {/* Chevron */}
                            <svg
                                className={cn(
                                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                                    isOpen && "rotate-180"
                                )}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-3 px-1 text-sm text-muted-foreground">
                                        {item.children}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
