"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechTabs, TechTab } from "../tech/TechTabs";
import { TechInput } from "../tech/TechInput";
import { TechSwitch } from "../tech/TechSwitch";
import { TechButton } from "../tech/TechButton";
import { TechRadio } from "../tech/TechRadio";
import { TechCard } from "../tech/TechCard";
import { TechToast, useTechToast } from "../tech/TechToast"; // Assuming separate hook
import { User, Bell, Shield, Smartphone, Globe } from "lucide-react";

export function TechSettingsLayout({
    className
}: { className?: string }) {
    const [activeTab, setActiveTab] = React.useState("account");
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    const tabs = [
        { id: "account", label: "Account", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
        { id: "display", label: "Display", icon: Smartphone },
        { id: "api", label: "API Keys", icon: Globe },
    ];

    return (
        <div className={cn("min-h-screen bg-black text-white font-mono p-4 md:p-8", className)}>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">SETTINGS</h1>
                <p className="text-muted-foreground mb-8">Manage your account preferences and system configurations.</p>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 shrink-0">
                         <div className="flex flex-col gap-1">
                             {tabs.map(tab => (
                                 <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 text-sm text-left transition-all border-l-2",
                                        activeTab === tab.id 
                                            ? "border-primary bg-primary/10 text-primary font-bold" 
                                            : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
                                    )}
                                 >
                                     <tab.icon className="w-4 h-4" />
                                     {tab.label}
                                 </button>
                             ))}
                         </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <TechCard className="p-6 md:p-8 min-h-[500px]">
                            {activeTab === "account" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold border-b border-white/10 pb-2">Profile Information</h2>
                                        <div className="grid gap-4 max-w-md">
                                            <TechInput label="NAMESPACE" defaultValue="prompt-or-die" />
                                            <TechInput label="DISPLAY_NAME" defaultValue="System Admin" />
                                            <TechInput label="EMAIL" defaultValue="admin@promptordie.io" type="email" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold border-b border-white/10 pb-2">Preferences</h2>
                                        <div className="space-y-4">
                                            <TechRadio name="lang" label="English (US)" checked={true} />
                                            <TechRadio name="lang" label="Japanese (JP)" />
                                            <TechRadio name="lang" label="Binary (01)" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                     <h2 className="text-xl font-bold border-b border-white/10 pb-2">Alert Preferences</h2>
                                     <div className="space-y-6 max-w-lg">
                                         <div className="flex items-center justify-between">
                                             <div className="space-y-0.5">
                                                 <div className="font-bold text-sm">System Critical Alerts</div>
                                                 <div className="text-xs text-muted-foreground">Receive push for server downtime.</div>
                                             </div>
                                             <TechSwitch checked={true} />
                                         </div>
                                         <div className="flex items-center justify-between">
                                             <div className="space-y-0.5">
                                                 <div className="font-bold text-sm">Weekly Report</div>
                                                 <div className="text-xs text-muted-foreground">Summary of token usage.</div>
                                             </div>
                                             <TechSwitch checked={false} />
                                         </div>
                                     </div>
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="mt-12 pt-6 border-t border-white/10 flex justify-end gap-4">
                                <TechButton variant="ghost">CANCEL</TechButton>
                                <TechButton loading={isSaving} onClick={handleSave}>
                                    SAVE CHANGES
                                </TechButton>
                            </div>
                        </TechCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
