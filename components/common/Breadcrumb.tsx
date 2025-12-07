"use client";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
}

const defaultSeparator = (
    <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export function Breadcrumb({
    items,
    separator = defaultSeparator,
    className,
}: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
            <ol className="flex items-center gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-2">
                            {item.href && !isLast ? (
                                <a
                                    href={item.href}
                                    className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span
                                    className={cn(
                                        "text-[10px] font-mono uppercase tracking-widest",
                                        isLast ? "text-foreground" : "text-muted-foreground"
                                    )}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <span className="shrink-0" aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
