// ============================================
// CSS FADE UP - GPU Safe Animation
// Base performática com CSS puro
// ============================================

import React, { useState, useEffect, useCallback } from 'react';

interface FadeUpProps {
    children?: React.ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    trigger?: number; // Increment to replay
}

export function FadeUp({ 
    children = "Hello World", 
    delay = 0, 
    duration = 600, 
    distance = 20,
    className = "",
    trigger = 0
}: FadeUpProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Reset then animate
        setShow(false);
        const timer = setTimeout(() => setShow(true), delay + 50);
        return () => clearTimeout(timer);
    }, [delay, trigger]);

    return (
        <div
            className={`transition-all ${className}`}
            style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : `translateY(${distance}px)`,
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {children}
        </div>
    );
}

// Demo component for the gallery
export function FadeUpDemo() {
    const [trigger, setTrigger] = useState(0);

    const handleReplay = useCallback(() => {
        setTrigger(t => t + 1);
    }, []);

    return (
        <div 
            className="flex flex-col items-center justify-center gap-4 p-4 cursor-pointer min-h-[180px]"
            onClick={handleReplay}
        >
            <FadeUp delay={0} duration={600} trigger={trigger}>
                <h2 className="text-2xl font-bold text-slate-900">Fade Up</h2>
            </FadeUp>
            <FadeUp delay={200} duration={600} trigger={trigger}>
                <p className="text-slate-500">Click to replay</p>
            </FadeUp>
            <FadeUp delay={400} duration={600} trigger={trigger}>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    GPU Accelerated
                </span>
            </FadeUp>
        </div>
    );
}

export default FadeUp;
