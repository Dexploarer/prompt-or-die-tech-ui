"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechNeuralMeshProps {
    className?: string;
    /** 
     * Number of nodes to render in the mesh. 
     * Warning: High numbers (>100) may impact performance.
     * @default 50
     */
    nodeCount?: number;
    /** 
     * Max distance between nodes to draw a connection line.
     * @default 100
     */
    connectionDistance?: number;
    /** 
     * Base color of nodes and lines.
     * @default "#ff5800"
     */
    color?: string;
    /** 
     * Whether nodes should repulse from the mouse cursor.
     * @default true
     */
    interactive?: boolean;
}

/**
 * An interactive HTML5 Canvas background that renders a force-directed graph.
 * Nodes float and bounce, connecting when close. Mouse interaction repulses nodes.
 * Perfect for adding "living" motion to empty headers or cards.
 */

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export function TechNeuralMesh({
    className,
    nodeCount = 50,
    connectionDistance = 100,
    color = "#ff5800",
    interactive = true
}: TechNeuralMeshProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const nodesRef = React.useRef<Node[]>([]);
    const mouseRef = React.useRef<{x: number, y: number} | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            initNodes();
        };

        const initNodes = () => {
            nodesRef.current = [];
            for (let i = 0; i < nodeCount; i++) {
                nodesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 1.5 + 0.5
                });
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw nodes
            nodesRef.current.forEach((node, i) => {
                // Move
                node.x += node.vx;
                node.y += node.vy;

                // Bounce
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Mouse interaction
                if (interactive && mouseRef.current) {
                    const dx = mouseRef.current.x - node.x;
                    const dy = mouseRef.current.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const angle = Math.atan2(dy, dx);
                        const force = (150 - dist) / 150;
                        // Repulse
                        node.vx -= Math.cos(angle) * force * 0.5;
                        node.vy -= Math.sin(angle) * force * 0.5;
                    }
                }

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                // Connections
                for (let j = i + 1; j < nodesRef.current.length; j++) {
                    const nodeB = nodesRef.current[j];
                    const dx = node.x - nodeB.x;
                    const dy = node.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        const opacity = 1 - (dist / connectionDistance);
                        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        
        if (interactive) {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = canvas.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            };
            const handleMouseLeave = () => {
                mouseRef.current = null;
            };
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);
            
            animate();

            return () => {
                window.removeEventListener('resize', resize);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
            };
        } else {
            animate();
            return () => window.removeEventListener('resize', resize);
        }

    }, [nodeCount, connectionDistance, color, interactive]);

    return (
        <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none", className)}>
             <div className="absolute top-2 left-2 text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest pointer-events-none select-none">
                NEURAL_MESH_v2.0 // ACTIVE
            </div>
            <canvas ref={canvasRef} className="block pointer-events-auto" />
        </div>
    );
}
