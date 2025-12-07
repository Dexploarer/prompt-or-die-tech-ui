"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechGlitchTextProps {
    text: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
    className?: string;
}

export function TechGlitchText({ text, as: Component = "span", className }: TechGlitchTextProps) {
    return (
        <Component className={cn("relative inline-block group", className)}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 animate-glitch-1" aria-hidden="true">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 animate-glitch-2" aria-hidden="true">
                {text}
            </span>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes glitch-1 {
                    0% { transform: translate(0); clip-path: inset(80% 0 0 0); }
                    20% { transform: translate(-2px, 2px); clip-path: inset(10% 0 60% 0); }
                    40% { transform: translate(-2px, -2px); clip-path: inset(50% 0 30% 0); }
                    60% { transform: translate(2px, 2px); clip-path: inset(30% 0 10% 0); }
                    80% { transform: translate(2px, -2px); clip-path: inset(15% 0 50% 0); }
                    100% { transform: translate(0); clip-path: inset(80% 0 0 0); }
                }
                @keyframes glitch-2 {
                    0% { transform: translate(0); clip-path: inset(10% 0 60% 0); }
                    20% { transform: translate(2px, -2px); clip-path: inset(80% 0 5% 0); }
                    40% { transform: translate(-2px, 2px); clip-path: inset(30% 0 20% 0); }
                    60% { transform: translate(2px, 2px); clip-path: inset(15% 0 60% 0); }
                    80% { transform: translate(-2px, -2px); clip-path: inset(55% 0 10% 0); }
                    100% { transform: translate(0); clip-path: inset(10% 0 60% 0); }
                }
                .animate-glitch-1 {
                    animation: glitch-1 2.5s infinite linear alternate-reverse;
                }
                .animate-glitch-2 {
                    animation: glitch-2 3s infinite linear alternate-reverse;
                }
            `}} />
        </Component>
    );
}
