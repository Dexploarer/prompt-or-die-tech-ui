"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechBiometrics } from "../tech/TechBiometrics";
import { TechRadar } from "../tech/TechRadar";
import { TechMetric } from "../tech/TechMetric";
import { Crosshair, Shield, Zap, Target } from "lucide-react";

export function TechGameHUD({
    className
}: { className?: string }) {
    // This is designed as an overlay, so we simulate a game background
    return (
        <div className={cn("relative h-screen w-full overflow-hidden font-mono select-none", className)}>
            {/* Simulated Game Background (Placeholder) */}
            <div className="absolute inset-0 bg-neutral-900">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/5 text-9xl font-black uppercase tracking-tighter">Game World</div>
                </div>
            </div>

            {/* HUD Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
                
                {/* Top Bar: Objectives & Match Info */}
                <div className="flex justify-between items-start">
                    <div className="bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-br-2xl clip-path-slant-right">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Current Objective</div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            SECURE THE PAYLOAD
                        </div>
                    </div>

                    {/* Match Timer / Score */}
                    <div className="flex gap-2">
                        <div className="bg-primary text-black font-black text-2xl px-4 py-1 skew-x-[-10deg]">
                            <span className="skew-x-[10deg] inline-block">12:45</span>
                        </div>
                        <div className="bg-black/80 border border-white/10 text-white font-bold text-2xl px-4 py-1 skew-x-[-10deg] flex gap-4">
                            <span className="text-emerald-500 skew-x-[10deg]">4</span>
                            <span className="text-muted-foreground skew-x-[10deg]">:</span>
                            <span className="text-red-500 skew-x-[10deg]">2</span>
                        </div>
                    </div>
                </div>

                {/* Center Reticle (Standard FPS) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80">
                    <Crosshair className="w-8 h-8 text-primary" strokeWidth={1} />
                </div>

                {/* Bottom Row: Status & Weapons */}
                <div className="flex justify-between items-end mt-auto">
                    
                    {/* Left: Player Status (Biometrics + Health) */}
                    <div className="flex items-end gap-4">
                        <div className="w-48 h-32 bg-black/60 backdrop-blur border border-white/10 relative overflow-hidden rounded-tr-3xl">
                             <div className="absolute inset-0 opacity-50">
                                 <TechBiometrics 
                                    label="VITALS" 
                                    color="#10b981" 
                                    value={75}
                                />
                             </div>
                        </div>

                        <div className="space-y-2 mb-2">
                             <div className="flex items-center gap-3">
                                 <div className="bg-black/80 p-2 border border-white/10">
                                     <Shield className="w-6 h-6 text-cyan-400" />
                                 </div>
                                 <div className="h-2 w-32 bg-black/50 border border-white/10 skew-x-[-20deg] overflow-hidden">
                                     <div className="h-full w-[75%] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                 </div>
                                 <span className="text-xl font-bold text-cyan-400">75%</span>
                             </div>

                             <div className="flex items-center gap-3">
                                 <div className="bg-black/80 p-2 border border-white/10">
                                     <Zap className="w-6 h-6 text-primary" />
                                 </div>
                                 <div className="h-4 w-48 bg-black/50 border border-white/10 skew-x-[-20deg] overflow-hidden">
                                     <div className="h-full w-[42%] bg-primary shadow-[0_0_10px_rgba(255,88,0,0.5)]" />
                                 </div>
                                 <span className="text-2xl font-bold text-primary">42</span>
                             </div>
                        </div>
                    </div>

                    {/* Right: Radar & Ammo */}
                    <div className="flex items-end gap-4">
                        <div className="text-right mb-2 space-y-1">
                            <div className="text-4xl font-black text-white tracking-tighter">
                                30<span className="text-lg text-muted-foreground">/120</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                ASSAULT RIFLE MK-IV
                            </div>
                        </div>

                        <div className="bg-black/60 backdrop-blur border border-white/10 rounded-full p-2">
                             <TechRadar points={[{ x: 30, y: 30, size: 2 }, { x: 70, y: 70, size: 4 }]} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)] opacity-80" />
            <div className="absolute inset-0 pointer-events-none scanlines opacity-5" />
        </div>
    );
}
