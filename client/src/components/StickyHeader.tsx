import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * StickyHeader - Demonstrates sticky header that animates on scroll
 * Shows/hides based on scroll direction
 */
export function StickyHeaderDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const progressScaleX = scrollYProgress;

    return (
        <div className="relative w-full h-full">
            <div
                ref={containerRef}
                className="w-full h-40 overflow-y-auto bg-slate-50 rounded-lg relative"
            >
                {/* Sticky Header */}
                <motion.header
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-t-lg"
                >
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">🚀 Sticky Header</span>
                        <span className="text-xs opacity-80">Scroll ↓</span>
                    </div>
                    {/* Progress bar */}
                    <motion.div
                        style={{ scaleX: progressScaleX }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 origin-left"
                    />
                </motion.header>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ root: containerRef }}
                            transition={{ delay: i * 0.05 }}
                            className="h-8 bg-white rounded-lg shadow-sm flex items-center px-3 text-sm text-slate-600"
                        >
                            Item {i + 1}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StickyHeaderDemo;
