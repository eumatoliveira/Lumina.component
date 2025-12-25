// ============================================
// PULSE LOADER - CSS Keyframes Animation
// Loading spinner com keyframes
// ============================================

import React from 'react';
import './PulseLoader.css';

interface PulseLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    speed?: number;
}

export function PulseLoader({ 
    size = 'md', 
    color = '#3b82f6',
    speed = 1.5
}: PulseLoaderProps) {
    const sizeMap = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={`${sizeMap[size]} rounded-full pulse-dot`}
                    style={{
                        backgroundColor: color,
                        animationDuration: `${speed}s`,
                        animationDelay: `${i * 0.15}s`
                    }}
                />
            ))}
        </div>
    );
}

// Ring variant
export function PulseRing({ 
    size = 'md', 
    color = '#8b5cf6',
    speed = 2
}: PulseLoaderProps) {
    const sizeMap = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20'
    };

    return (
        <div className="relative flex items-center justify-center">
            <div
                className={`${sizeMap[size]} rounded-full pulse-ring`}
                style={{
                    borderColor: color,
                    animationDuration: `${speed}s`
                }}
            />
            <div
                className={`absolute ${sizeMap[size]} rounded-full pulse-ring`}
                style={{
                    borderColor: color,
                    animationDuration: `${speed}s`,
                    animationDelay: `${speed / 3}s`
                }}
            />
        </div>
    );
}

// Demo component for the gallery - no click needed, always animating
export function PulseLoaderDemo() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 p-4 min-h-[180px]">
            <PulseLoader size="md" color="#3b82f6" speed={1.2} />
            <PulseRing size="md" color="#8b5cf6" speed={2} />
        </div>
    );
}

export default PulseLoader;
