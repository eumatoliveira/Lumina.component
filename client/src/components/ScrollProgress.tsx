// ============================================
// SCROLL PROGRESS - Page Scroll Indicator
// useScroll progress bar
// ============================================

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div className="w-full h-full min-h-[200px] flex flex-col relative">
            {/* Progress Bar */}
            <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-10"
                style={{ scaleX }}
            />
            
            {/* Scrollable Content */}
            <div 
                ref={containerRef}
                className="flex-1 overflow-auto p-4 space-y-4"
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                        key={i}
                        className="p-4 bg-slate-100 rounded-lg text-sm text-slate-600"
                    >
                        Scroll section {i + 1} - Keep scrolling to see the progress bar animate
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ScrollProgressDemo() {
    return <ScrollProgress />;
}

export default ScrollProgress;
