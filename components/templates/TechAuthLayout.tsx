"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechQuantumLoader } from "../tech/TechQuantumLoader";
import { TechCard } from "../tech/TechCard";
import { TechInput } from "../tech/TechInput";
import { TechButton } from "../tech/TechButton";

export function TechAuthLayout({
    className
}: { className?: string }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return (
        <div className={cn("min-h-screen grid lg:grid-cols-2 bg-black font-mono overflow-hidden", className)}>
            {/* Left Side: Visuals */}
            <div className="relative hidden lg:flex flex-col items-center justify-center border-r border-white/10 overflow-hidden">
                 {/* Animated Background */}
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black" />
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 
                 <div className="relative z-10 flex flex-col items-center gap-12">
                     <TechQuantumLoader size={200} color="#ff5800" />
                     <div className="text-center space-y-2">
                         <h1 className="text-4xl font-bold tracking-tight text-white uppercase">Nexus<span className="text-primary">OS</span></h1>
                         <p className="text-sm text-muted-foreground max-w-md mx-auto">
                             Secure Access Terminal v9.0. <br/>
                             Biometric verification required for higher clearance levels.
                         </p>
                     </div>
                 </div>

                 {/* Decorative Code */}
                 <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
                 <div className="absolute bottom-4 left-4 text-[10px] text-white/10 font-mono pointer-events-none select-none">
                     {`> SYSTEM_BOOT_SEQUENCE_INITIATED\n> LOADING_MODULES: [AUTH, CRYPTO, UI]\n> CONNECTION_ESTABLISHED: SECURE_CHANNEL_1`}
                 </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

                <TechCard className="w-full max-w-sm relative z-10 bg-black/80 backdrop-blur-xl border-white/10">
                    <div className="space-y-6">
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-bold tracking-tighter">Sign In</h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Enter Credentials</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <TechInput 
                                label="OPERATOR_ID" 
                                placeholder="USR-7382" 
                                disabled={isLoading}
                            />
                            <TechInput 
                                label="ACCESS_KEY" 
                                type="password" 
                                placeholder="••••••••" 
                                disabled={isLoading}
                            />
                            
                            <div className="pt-2">
                                <TechButton 
                                    className="w-full" 
                                    size="lg" 
                                    loading={isLoading}
                                >
                                    INITIALIZE LINK
                                </TechButton>
                            </div>
                        </form>

                        <div className="text-center">
                            <a href="#" className="text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                                Request Access Token
                            </a>
                        </div>
                    </div>
                </TechCard>
            </div>
        </div>
    );
}
