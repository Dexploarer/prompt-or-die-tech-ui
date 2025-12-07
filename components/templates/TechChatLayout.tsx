"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechSidebar, TechSidebarItem } from "../tech/TechSidebar";
import { TechInput } from "../tech/TechInput";
import { TechButton } from "../tech/TechButton";
import { TechTokenStream } from "../tech/TechTokenStream";
import { TechCard } from "../tech/TechCard";
import { Send, Plus, MessageSquare, MoreHorizontal } from "lucide-react";

export interface TechChatLayoutProps {
    className?: string;
    chats?: { id: string; title: string; active?: boolean }[];
    messages?: { id: string; role: "user" | "assistant"; content: string; isStreaming?: boolean }[];
    onSendMessage?: (message: string) => void;
    onNewChat?: () => void;
    onSelectChat?: (id: string) => void;
}

export function TechChatLayout({
    className,
    chats = [],
    messages = [],
    onSendMessage,
    onNewChat,
    onSelectChat
}: TechChatLayoutProps) {
    const [inputValue, setInputValue] = React.useState("");
    const [collapsed, setCollapsed] = React.useState(false);

    // Mock initial state if empty for template preview
    const activeChats = chats.length > 0 ? chats : [
        { id: "1", title: "Project Ultraviolet Analysis", active: true },
        { id: "2", title: "Neural Network Optimization", active: false },
        { id: "3", title: "Legacy Code Refactor", active: false },
    ];

    const activeMessages = messages.length > 0 ? messages : [
        { id: "1", role: "user" as const, content: "Analyze the current system metrics." },
        { id: "2", role: "assistant" as const, content: "System metrics indicate a 42% load on the primary core. Memory usage is nominal at 12GB. I recommend initiating a garbage collection cycle to optimize heap allocation." },
        { id: "3", role: "user" as const, content: "Proceed with optimization." },
        { id: "4", role: "assistant" as const, content: "Initiating optimization sequence...\n> CLEARED_CACHE: 128MB\n> COMPACTED_HEAP: 45ms\n\nOptimization complete. System efficiency increased by 14%." },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSendMessage?.(inputValue);
        setInputValue("");
    };

    const sidebarItems: TechSidebarItem[] = [
        { 
            id: "new",
            icon: <Plus className="w-4 h-4" />, 
            label: "NEW_SESSION", 
            onClick: onNewChat,
            active: false
        },
        ...activeChats.map(chat => ({
            id: chat.id,
            icon: <MessageSquare className="w-4 h-4" />,
            label: chat.title,
            onClick: () => onSelectChat?.(chat.id),
            active: chat.active !== undefined ? chat.active : false,
            badge: chat.active ? "ACTIVE" : undefined
        }))
    ];

    return (
        <div className={cn("flex h-screen bg-black font-mono overflow-hidden", className)}>
            {/* Sidebar */}
            <TechSidebar 
                brand={<div className="font-bold text-lg tracking-tight">AI<span className="text-primary">_NEXUS</span></div>}
                items={sidebarItems}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
            />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                {/* Header */}
                <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-black/80 backdrop-blur-md z-10 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-muted-foreground">SESSION_ID:</span>
                        <span className="text-sm text-primary">847-AHX-99L</span>
                    </div>
                    <button className="text-muted-foreground hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
                    {activeMessages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={cn(
                                "flex gap-4 max-w-3xl mx-auto",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {/* Avatar */}
                            <div className={cn(
                                "w-8 h-8 rounded-sm shrink-0 flex items-center justify-center font-bold text-xs border border-white/10",
                                msg.role === "user" ? "bg-white/10 text-white" : "bg-primary/20 text-primary border-primary/30"
                            )}>
                                {msg.role === "user" ? "USR" : "AI"}
                            </div>

                            {/* Content */}
                            <div className={cn(
                                "min-w-0 max-w-[80%]",
                                msg.role === "user" ? "text-right" : "text-left"
                            )}>
                                {msg.role === "user" ? (
                                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-sm inline-block text-sm">
                                        {msg.content}
                                    </div>
                                ) : (
                                    <TechCard className="p-4 bg-transparent border-primary/20 relative">
                                        <div className="text-xs text-muted-foreground mb-2 opacity-50 uppercase tracking-widest">Response</div>
                                        <TechTokenStream 
                                            tokens={msg.content.split(" ").map((t, i) => ({ 
                                                id: i.toString(), 
                                                text: t + " ", 
                                                type: "text" 
                                            }))}
                                            autoScroll={true}
                                        />
                                    </TechCard>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-black/80 backdrop-blur-xl border-t border-white/10 shrink-0 z-20">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                            <div className="flex-1">
                                <TechInput 
                                    placeholder="Enter directive..." 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="bg-black border-white/20 focus:border-primary/50"
                                />
                            </div>
                            <TechButton type="submit" size="sm" disabled={!inputValue.trim()}>
                                <Send className="w-4 h-4" />
                            </TechButton>
                        </form>
                        <div className="text-center mt-2">
                             <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                 AI Model 4.0 // Secure Connection // 23ms Latency
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
