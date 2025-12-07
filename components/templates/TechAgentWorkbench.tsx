"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechCommandPalette } from "../tech/TechCommandPalette";
import { TechTree } from "../tech/TechTree";
import { TechLog } from "../tech/TechLog";
import { TechTabs, TechTab } from "../tech/TechTabs";
import { TechNeuralMesh } from "../tech/TechNeuralMesh";
import { TechCard } from "../tech/TechCard";
import { TechThoughtChain } from "../tech/TechThoughtChain";
import { Play, Pause, Square, AlertCircle, FileCode, Cpu } from "lucide-react";

export function TechAgentWorkbench({
    className
}: { className?: string }) {
    const [activeTab, setActiveTab] = React.useState("thoughts");
    const [agentStatus, setAgentStatus] = React.useState<"idle" | "running" | "paused">("idle");

    // Mock File Tree
    const fileItems = [
        { id: "root", label: "Agent Workspace" },
        { id: "src", label: "src", parentId: "root" },
        { id: "planner", label: "planner.ts", parentId: "src" },
        { id: "executor", label: "executor.ts", parentId: "src" },
        { id: "memory", label: "memory.json", parentId: "root" },
    ];

    // Mock Thoughts
    const thoughts = React.useMemo(() => [
        {
            thought: "Received user request: 'Analyze customer data for Q4 trends'",
            thoughtNumber: 1,
            totalThoughts: 5,
            nextThoughtNeeded: true
        },
        {
            thought: "Checking access permissions for 'customer_db'",
            thoughtNumber: 2,
            totalThoughts: 5,
            nextThoughtNeeded: true
        },
        {
            thought: "Permissions confirmed. Formulating SQL query...",
            thoughtNumber: 3,
            totalThoughts: 5,
            nextThoughtNeeded: true
        }
    ], []);

    // Mock Logs
    const logs = [
        { id: "1", timestamp: "14:20:00", level: "info" as const, content: "Agent Core Initialized" },
        { id: "2", timestamp: "14:20:02", level: "success" as const, content: "Connected to Vector DB" },
        { id: "3", timestamp: "14:21:15", level: "warning" as const, content: "High token usage detected in planning step" },
    ];

    return (
        <div className={cn("h-screen flex flex-col bg-black text-white font-mono overflow-hidden", className)}>
             {/* Top Bar */}
             <header className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-black/90 shrink-0">
                 <div className="flex items-center gap-4">
                     <span className="font-bold text-primary tracking-tight">AGENT_WORKBENCH</span>
                     <div className="h-4 w-px bg-white/20" />
                     <div className="flex items-center gap-2 text-xs">
                         <span className="text-muted-foreground">STATUS:</span>
                         <span className={cn(
                             "uppercase font-bold",
                             agentStatus === "running" ? "text-emerald-500 animate-pulse" :
                             agentStatus === "paused" ? "text-yellow-500" : "text-muted-foreground"
                         )}>{agentStatus}</span>
                     </div>
                 </div>

                 <div className="flex items-center gap-2">
                     <button 
                        onClick={() => setAgentStatus("running")}
                        className="p-1.5 hover:bg-emerald-500/20 text-emerald-500 rounded border border-transparent hover:border-emerald-500/50 transition-all"
                    >
                         <Play className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => setAgentStatus("paused")}
                        className="p-1.5 hover:bg-yellow-500/20 text-yellow-500 rounded border border-transparent hover:border-yellow-500/50 transition-all"
                    >
                         <Pause className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => setAgentStatus("idle")}
                        className="p-1.5 hover:bg-red-500/20 text-red-500 rounded border border-transparent hover:border-red-500/50 transition-all"
                    >
                         <Square className="w-4 h-4" />
                     </button>
                 </div>
             </header>

             {/* Main Content Grid */}
             <div className="flex-1 grid grid-cols-12 min-h-0">
                 
                 {/* Left Panel: Context/Files (2 cols) */}
                 <div className="col-span-2 border-r border-white/10 flex flex-col bg-black/50">
                     <div className="p-2 text-xs font-bold text-muted-foreground uppercase border-b border-white/10 flex items-center gap-2">
                         <FileCode className="w-3 h-3" /> Context
                     </div>
                     <div className="flex-1 p-2 overflow-y-auto">
                         <TechTree nodes={fileItems.map(f => ({ ...f, children: [], tier: 1, status: "available" as const }))} />
                     </div>
                     
                     <div className="h-1/3 border-t border-white/10 flex flex-col">
                         <div className="p-2 text-xs font-bold text-muted-foreground uppercase border-b border-white/10 flex items-center gap-2">
                             <AlertCircle className="w-3 h-3" /> Logs
                         </div>
                         <div className="flex-1 overflow-hidden relative">
                              <TechLog entries={logs} className="h-full border-none" />
                         </div>
                     </div>
                 </div>

                 {/* Middle Panel: Visual/Mesh (6 cols) */}
                 <div className="col-span-6 flex flex-col relative bg-black">
                     <div className="absolute top-4 left-4 z-10">
                         <TechCard className="px-3 py-1 bg-black/80 backdrop-blur text-xs border-primary/30">
                             Knowledge Graph Visualization
                         </TechCard>
                     </div>
                     <div className="flex-1 overflow-hidden">
                         {/* Using NeuralMesh as the visual centerpiece */}
                         <TechNeuralMesh />
                     </div>
                     
                     {/* Bottom Command Input */}
                     <div className="p-4 border-t border-white/10 bg-black/80 backdrop-blur shrink-0">
                         {/* Placeholder for command palette trigger only, as real one is modal */}
                         <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Inject command or observation..."
                                className="w-full bg-black/50 border border-white/20 p-2 text-sm font-mono text-white placeholder:text-muted-foreground focus:border-primary/50 outline-none"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-white/10 px-1 rounded">
                                ⌘K
                            </div>
                         </div>
                     </div>
                 </div>

                 {/* Right Panel: Thoughts/State (4 cols) */}
                 <div className="col-span-4 border-l border-white/10 flex flex-col bg-black/50">
                     <TechTabs 
                        activeTab={activeTab}
                        onChange={setActiveTab}
                        tabs={[
                            { id: "thoughts", label: "Transformation" }, 
                            { id: "artifacts", label: "Artifacts" }
                        ]}
                        className="h-full flex flex-col"
                     />
                     
                     <div className="flex-1 p-4 overflow-y-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100 border-t border-white/10">
                         {activeTab === "thoughts" ? (
                             <div className="space-y-4">
                                 <TechThoughtChain steps={thoughts.map(t => ({ 
                                     id: t.thoughtNumber.toString(), 
                                     text: t.thought, 
                                     status: "completed" as const,
                                     details: t.nextThoughtNeeded ? "More thinking needed" : "Complete"
                                 }))} />
                                 {agentStatus === "running" && (
                                     <div className="animate-pulse flex items-center justify-center p-4 text-xs text-primary border border-primary/20 bg-primary/5 rounded">
                                         GENERATING_NEXT_STEP...
                                     </div>
                                 )}
                             </div>
                         ) : (
                             <div className="text-center text-muted-foreground text-sm mt-10">
                                 No artifacts generated.
                             </div>
                         )}
                     </div>
                 </div>
             </div>
        </div>
    );
}
