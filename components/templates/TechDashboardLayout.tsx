"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechGrid } from "../tech/TechGrid";
import { TechMetric } from "../tech/TechMetric";
import { TechChart } from "../tech/TechChart";
import { TechDashboard } from "../tech/TechDashboard";
import { TechLog } from "../tech/TechLog";

export function TechDashboardLayout({
    className
}: { className?: string }) {
    // Mock Data
    const metrics = [
        { label: "CPU_LOAD", value: "42%", trend: "up", status: "warning" as const },
        { label: "MEMORY", value: "12GB", trend: "stable", status: "success" as const },
        { label: "NETWORK", value: "1.2TB", trend: "up", status: "success" as const },
        { label: "LIFECYCLE", value: "99.9%", status: "success" as const },
    ];

    const chartData = Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: Math.random() * 50 + 20
    }));

    const logs = [
        { id: "1", timestamp: "10:42:01", level: "info" as const, message: "System initialized successfully." },
        { id: "2", timestamp: "10:42:05", level: "success" as const, message: "Connected to neural interface." },
        { id: "3", timestamp: "10:43:12", level: "warning" as const, message: "High latency detected in sector 7." },
        { id: "4", timestamp: "10:44:00", level: "info" as const, message: "Auto-balancing load..." },
    ];

    const gridColumns = [
        { key: "id", header: "ID", width: "80px" },
        { key: "status", header: "STATUS", width: "100px" },
        { key: "latency", header: "LATENCY" },
    ];
    const gridData = [
         { id: "SRV-01", status: "ACTIVE", latency: "12ms" },
         { id: "SRV-02", status: "IDLE", latency: "4ms" },
         { id: "SRV-03", status: "WARN", latency: "145ms" },
         { id: "SRV-04", status: "ACTIVE", latency: "22ms" },
    ];

    return (
        <div className={cn("p-6 space-y-6 font-mono", className)}>
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m) => (
                    <TechMetric
                        key={m.label}
                        label={m.label}
                        value={m.value}
                        trend={m.trend === "up" ? 10 : m.trend === "down" ? -10 : 0}
                    />
                ))}
            </div>

            {/* Main Dashboard Grid */}
            <TechDashboard className="h-[600px]">
                {/* Main Chart Area (Spans 2x2) */}
                <div className="col-span-2 row-span-2 p-4 border border-white/10 bg-black/40 relative group">
                    <div className="absolute top-2 left-2 text-[10px] text-muted-foreground uppercase">Network Traffic</div>
                    <div className="mt-6 h-full w-full">
                         <TechChart 
                            data={chartData.map(d => ({ label: d.x.toString(), value: d.y }))} 
                            color="#ff5800" 
                        />
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-50" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary opacity-50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary opacity-50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-50" />
                </div>

                {/* Side Log Panel */}
                <div className="col-span-1 row-span-2 h-full">
                    <TechLog 
                        title="SYSTEM_EVENTS" 
                        entries={logs.map(l => ({ ...l, content: l.message }))}   
                        className="h-full border border-white/10"
                    />
                </div>

                {/* Bottom Data Grid */}
                <div className="col-span-3 row-span-1">
                     <TechGrid 
                        columns={gridColumns.map(c => ({ accessorKey: c.key as any, header: c.header, width: c.width }))}
                        data={gridData}
                        className="h-full border-none bg-black/20"
                     />
                </div>
            </TechDashboard>
        </div>
    );
}
