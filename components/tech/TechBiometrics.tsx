"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechBiometricsProps {
    label?: string;
    value?: number; // 0-100
    color?: string; // hex
    height?: number;
    className?: string;
}

export function TechBiometrics({
    label = "HEART_RATE",
    value = 75,
    color = "#10b981", // Emerald-500
    height = 64,
    className
}: TechBiometricsProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const dataRef = React.useRef<number[]>([]);
    const animationRef = React.useRef<number | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Initialize data array to fill width
        if (dataRef.current.length === 0) {
            dataRef.current = new Array(Math.ceil(canvas.width / 2)).fill(height / 2);
        }

        let phase = 0;
        
        const draw = () => {
            // Speed depends on value (higher value = faster)
            const speed = 0.5 + (value / 100) * 1.5;
            phase += speed;
            
            // Generate next point
            let y = height / 2;
            
            // Artificial QRS complex (heartbeat)
            // Trigger a beat roughly every (10000 / value) frames
            const beatThreshold = 2000 / Math.max(value, 20); 
            if (phase % beatThreshold < 10) {
                 // The "beat" waveform
                 const beatPhase = phase % beatThreshold;
                 if (beatPhase < 2) y -= height * 0.1;
                 else if (beatPhase < 4) y += height * 0.2;
                 else if (beatPhase < 6) y -= height * 0.6; // R wave up
                 else if (beatPhase < 8) y += height * 0.3; // S wave down
                 else y = height / 2;
            } else {
                 // Random noise
                 y += (Math.random() - 0.5) * 4;
            }

            // Shift array and add new point
            dataRef.current.shift();
            dataRef.current.push(y);

            // Clear and draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.lineJoin = "round";

            // Draw line
            for (let i = 0; i < dataRef.current.length; i++) {
                const x = i * 2;
                if (i === 0) ctx.moveTo(x, dataRef.current[i]);
                else ctx.lineTo(x, dataRef.current[i]);
            }
            ctx.stroke();

            // Gradient fade at the leading edge
            const gradient = ctx.createLinearGradient(canvas.width - 50, 0, canvas.width, 0);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "#000"); // Mask color (background)
            ctx.globalCompositeOperation = "destination-in";
            ctx.fillStyle = gradient;
            ctx.fillRect(canvas.width - 50, 0, 50, height);
            ctx.globalCompositeOperation = "source-over";

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [value, color, height]);

    return (
        <div className={cn("relative bg-black/40 border border-white/5 rounded overflow-hidden", className)}>
            <div className="absolute top-1 left-2 text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                {label}
                <span className="text-white ml-2">{value}</span>
            </div>
            {/* Grid background */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(4,1fr)] opacity-10 pointer-events-none">
                 {Array.from({ length: 80 }).map((_, i) => (
                     <div key={i} className="border border-white/20" />
                 ))}
            </div>
            
            <canvas 
                ref={canvasRef} 
                width={300} 
                height={height} 
                className="w-full h-full opacity-80"
            />
        </div>
    );
}
