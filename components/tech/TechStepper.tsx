"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechStep {
    id: string;
    label: string;
    status?: "pending" | "current" | "completed" | "error";
}

export interface TechStepperProps {
    steps: TechStep[];
    currentStepIndex: number;
    className?: string;
    onStepClick?: (index: number) => void;
}

export function TechStepper({
    steps,
    currentStepIndex,
    className,
    onStepClick,
}: TechStepperProps) {
    return (
        <div className={cn("flex items-center w-full overflow-x-auto py-2", className)}>
            {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isLast = index === steps.length - 1;
                const isClickable = !!onStepClick;

                return (
                    <div key={step.id} className="flex items-center shrink-0">
                        {/* Step Node */}
                        <div
                            className={cn(
                                "flex flex-col items-center min-w-[60px] relative group",
                                isClickable && "cursor-pointer"
                            )}
                            onClick={() => isClickable && onStepClick(index)}
                        >
                            {/* Indicator */}
                            <div
                                className={cn(
                                    "w-3 h-3 mb-2 border transition-all duration-300 transform",
                                    isCurrent && "bg-primary border-primary scale-125 rotate-45",
                                    isCompleted && "bg-success border-success rotate-0",
                                    !isCurrent && !isCompleted && "bg-transparent border-muted-foreground/30"
                                )}
                            />

                            {/* Label */}
                            <div
                                className={cn(
                                    "text-[9px] font-mono uppercase tracking-widest text-center transition-colors duration-300",
                                    isCurrent && "text-primary font-bold",
                                    isCompleted && "text-foreground",
                                    !isCurrent && !isCompleted && "text-muted-foreground/40"
                                )}
                            >
                                {step.label}
                            </div>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                            <div className="flex-1 w-8 sm:w-16 h-px mx-2 relative">
                                <div className="absolute inset-0 bg-border/30" />
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-success transition-all duration-500 origin-left",
                                        isCompleted ? "scale-x-100" : "scale-x-0"
                                    )}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
