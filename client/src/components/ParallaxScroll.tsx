// ============================================
// PARALLAX SCROLL - Scroll-linked Animation
// useScroll + useTransform parallax effect
// ============================================

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxScrollProps {
    speed?: number;
}

export function ParallaxScroll({ speed = 0.5 }: ParallaxScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50 * speed]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150 * speed]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full min-h-[200px] overflow-hidden flex items-center justify-center"
        >
            {/* Background layer - slowest */}
            <motion.div 
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-40"
                style={{ y: y3, x: -30 }}
            />
            
            {/* Middle layer */}
            <motion.div 
                className="absolute w-16 h-16 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 opacity-60"
                style={{ y: y2, x: 40 }}
            />
            
            {/* Foreground layer - fastest */}
            <motion.div 
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center z-10 shadow-xl"
                style={{ y: y1, opacity }}
            >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </motion.div>
        </div>
    );
}

// Demo component for the gallery
export function ParallaxScrollDemo() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <ParallaxScroll speed={0.3} />
        </div>
    );
}

export default ParallaxScroll;
