import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollTransform - Demonstrates useScroll + useTransform
 * Links scroll position to element transformations
 */
export function ScrollTransformDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // Transform scroll progress to various values
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ['#3b82f6', '#8b5cf6', '#ec4899']
    );

    // Smooth spring animation
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div
                ref={containerRef}
                className="w-full h-32 overflow-y-auto bg-slate-100 rounded-lg"
            >
                <div className="h-[400px] flex items-center justify-center">
                    <motion.div
                        style={{
                            scale: smoothScale,
                            rotate,
                            opacity,
                            backgroundColor,
                        }}
                        className="w-16 h-16 rounded-xl shadow-lg"
                    />
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Scroll inside the box</p>
            
            {/* Progress bar */}
            <motion.div
                className="w-full h-1 bg-blue-500 rounded-full mt-2 origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </div>
    );
}

export default ScrollTransformDemo;
