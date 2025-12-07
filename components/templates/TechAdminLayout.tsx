"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechSidebar, TechSidebarItem } from "../tech/TechSidebar";
import { TechCommandPalette, CommandOption } from "../tech/TechCommandPalette";
import { TechBadge } from "../tech/TechBadge";

export interface TechAdminLayoutProps {
    children: React.ReactNode;
    brand?: React.ReactNode;
    sidebarItems: TechSidebarItem[];
    commandOptions?: CommandOption[];
    user?: {
        name: string;
        avatar?: string;
        role?: string;
    };
    onLogout?: () => void;
    className?: string;
}

export function TechAdminLayout({
    children,
    brand,
    sidebarItems,
    commandOptions = [],
    user,
    onLogout,
    className
}: TechAdminLayoutProps) {
    const [collapsed, setCollapsed] = React.useState(false);
    const [commandOpen, setCommandOpen] = React.useState(false);

    // Command Palette Keyboard Shortcut (Cmd+K)
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <div className={cn("flex h-screen bg-black text-foreground overflow-hidden font-mono", className)}>
            {/* Sidebar */}
            <TechSidebar
                brand={brand}
                items={sidebarItems}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
                footer={user && (
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-primary">{user.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className={cn("flex-1 overflow-hidden transition-opacity duration-300", collapsed ? "opacity-0" : "opacity-100")}>
                            <div className="text-xs font-bold truncate">{user.name}</div>
                            <div className="text-[9px] text-muted-foreground truncate flex items-center gap-1">
                                {user.role && <span className="text-primary">{user.role}</span>}
                                {onLogout && (
                                    <button onClick={onLogout} className="hover:text-white underline decoration-white/30 underline-offset-2">
                                        Log Out
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-sm shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold tracking-tight uppercase">Dashboard</h1>
                        <TechBadge variant="default" className="text-[10px] border border-white/20 bg-transparent">v2.0.5-ALPHA</TechBadge>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Command Trigger */}
                        <button 
                            onClick={() => setCommandOpen(true)}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-muted-foreground transition-colors"
                        >
                            <span>Search commands...</span>
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </button>
                        
                        <div className="w-px h-6 bg-white/10" />
                        
                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)] animate-pulse" />
                            <span>SYSTEM_ONLINE</span>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 relative">
                     {/* Background Grid */}
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Command Palette */}
            {commandOptions.length > 0 && (
                <TechCommandPalette 
                    isOpen={commandOpen} 
                    onClose={() => setCommandOpen(false)} 
                    options={commandOptions}
                />
            )}
        </div>
    );
}
