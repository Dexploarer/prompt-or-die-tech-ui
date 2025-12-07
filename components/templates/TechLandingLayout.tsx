"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechButton } from "../tech/TechButton";
import { TechCard } from "../tech/TechCard";
import { TechGrid } from "../tech/TechGrid";
import { TechGeometry } from "../tech/TechGeometry";
import { ArrowRight, Terminal, Cpu, Shield, Zap } from "lucide-react";

export function TechLandingLayout({
    className
}: { className?: string }) {
    return (
        <div className={cn("min-h-screen bg-black text-white font-mono overflow-x-hidden", className)}>
            
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter">TECH<span className="text-primary">_UI</span></div>
                    <div className="hidden md:flex gap-8 text-sm">
                        <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                        <a href="#" className="hover:text-primary transition-colors">Components</a>
                        <a href="#" className="hover:text-primary transition-colors">Templates</a>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="text-sm hover:text-white text-muted-foreground flex items-center">Login</a>
                         <TechButton size="sm" className="hidden md:flex">GET ACCESS</TechButton>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-50 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            v2.0 Beta Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                            BUILD THE <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">FUTURE_OF_UI</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                            A strictly-typed, agentic-first component library designed for the next generation of AI applications. 
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <TechButton size="lg" className="gap-2">
                                START BUILDING <ArrowRight className="w-4 h-4" />
                            </TechButton>
                            <TechButton size="lg" variant="secondary">
                                VIEW GITHUB
                            </TechButton>
                        </div>
                        
                        <div className="pt-8 flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                             {/* Fake Logos */}
                             <div className="font-bold text-xl">ACME_CORP</div>
                             <div className="font-bold text-xl">CYBER_DYNE</div>
                             <div className="font-bold text-xl">MASSIVE_D</div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative h-[400px] w-full hidden lg:block perspective-1000">
                         <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-[100px] opacity-30" />
                         <TechGeometry className="w-full h-full" />
                         
                         {/* Floating Cards */}
                         <div className="absolute top-10 -left-10 z-20 animate-float-slow">
                             <TechCard className="w-64 p-4 text-xs bg-black/90 backdrop-blur-xl border-primary/50">
                                 <div className="flex justify-between mb-2 text-muted-foreground">
                                     <span>CPU_LOAD</span>
                                     <span>98%</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full bg-primary w-[98%]" />
                                 </div>
                             </TechCard>
                         </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">ENGINEERED FOR EXCELLENCE</h2>
                        <p className="text-muted-foreground">
                            Every component is crafted with performance, accessibility, and strict typing in mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Terminal, title: "Agentic First", desc: "Built-in components for streaming tokens, thinking chains, and tool usage." },
                            { icon: Shield, title: "Type Safe", desc: "Written in strict TypeScript with zero 'any' types allowed in the codebase." },
                            { icon: Zap, title: "Performance", desc: "Optimized for speed with minimal re-renders and hardware accelerated animations." }
                        ].map((feature, i) => (
                            <TechCard key={i} className="p-8 hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-white group-hover:text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.desc}
                                </p>
                            </TechCard>
                        ))}
                    </div>
                </div>
            </section>

             {/* Footer */}
             <footer className="py-12 border-t border-white/10 px-6">
                 <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                     <div className="text-xs text-muted-foreground">
                         © 2025 Prompt-or-Die. All rights reserved.
                     </div>
                     <div className="flex gap-6 text-xs text-muted-foreground">
                         <a href="#" className="hover:text-primary">Privacy</a>
                         <a href="#" className="hover:text-primary">Terms</a>
                         <a href="#" className="hover:text-primary">Twitter</a>
                     </div>
                 </div>
             </footer>
        </div>
    );
}
