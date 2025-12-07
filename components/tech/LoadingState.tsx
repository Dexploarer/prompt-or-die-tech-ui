"use client";

import { TechFrame } from "./TechFrame";

export function LoadingState({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <TechFrame>
                <div className="p-8 text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        {message}
                    </div>
                </div>
            </TechFrame>
        </div>
    );
}

export function NotFound({ message = "Not Found" }: { message?: string }) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <TechFrame>
                <div className="p-8 text-center">
                    <div className="text-4xl font-mono text-muted-foreground/20 mb-4">404</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        {message}
                    </div>
                </div>
            </TechFrame>
        </div>
    );
}
