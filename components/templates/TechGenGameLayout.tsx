"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechHoloProjector } from "../tech/TechHoloProjector";
import { TechButton } from "../tech/TechButton";
import { TechTokenStream } from "../tech/TechTokenStream";
import { TechFrame } from "../tech/TechFrame";

export function TechGenGameLayout({
    className
}: { className?: string }) {
    const [history, setHistory] = React.useState([
        "You awaken in a cold, metallic chamber. The air hums with the sound of distant machinery.",
        "A terminal flickers to life in front of you."
    ]);
    const [isStreaming, setIsStreaming] = React.useState(false);

    const handleChoice = () => {
        setIsStreaming(true);
        // Simulate response
        setTimeout(() => setIsStreaming(false), 2000);
    };

    return (
        <div className={cn("min-h-screen bg-black text-white font-mono flex flex-col max-w-5xl mx-auto p-4 md:p-8", className)}>
            
            {/* Scene Visualizer */}
            <div className="aspect-[16/9] mb-6">
                <TechHoloProjector className="h-full w-full">
                    {/* Placeholder for GenAI Image */}
                    <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-50" />
                         
                         <div className="text-center z-10 space-y-4">
                             <div className="w-24 h-24 border-2 border-primary rounded-full mx-auto flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(255,88,0,0.3)]">
                                 <div className="w-16 h-16 border border-white/50 rounded-full" />
                             </div>
                             <p className="text-xs text-primary uppercase tracking-[0.2em] animate-pulse">Visualizing Sector 7...</p>
                         </div>
                    </div>
                </TechHoloProjector>
            </div>

            {/* Narrative Log */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4 p-4 border-l-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                {history.map((text, i) => (
                    <p key={i} className="text-lg leading-relaxed text-blue-100/90">{text}</p>
                ))}
                
                {isStreaming ? (
                    <TechTokenStream 
                        tokens={[
                            { id: "1", text: "The terminal displays a single word: ", type: "text" },
                            { id: "2", text: "'IDENTIFY'", type: "text" },
                            { id: "3", text: ". A red laser performs a retinal scan.", type: "text" }
                        ]}
                        speed={30}
                        className="text-lg leading-relaxed text-primary"
                    />
                ) : (
                    <p className="text-lg leading-relaxed text-primary">
                        The terminal displays a single word: "IDENTIFY". A red laser performs a retinal scan.
                    </p>
                )}
            </div>

            {/* Choice Controls */}
            <TechFrame className="p-6 bg-black/80 sticky bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TechButton variant="primary" onClick={handleChoice} disabled={isStreaming}>
                        <span className="mr-2">1.</span> SUBMIT ID
                    </TechButton>
                    <TechButton variant="secondary" onClick={handleChoice} disabled={isStreaming}>
                        <span className="mr-2">2.</span> HACK TERMINAL
                    </TechButton>
                    <TechButton variant="ghost" className="text-muted-foreground hover:text-white" onClick={handleChoice} disabled={isStreaming}>
                        <span className="mr-2">3.</span> LOOK AROUND
                    </TechButton>
                </div>
            </TechFrame>
        </div>
    );
}
