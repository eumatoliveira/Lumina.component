import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * ScrollDirection - Detects and displays scroll direction
 * Uses useMotionValueEvent to track scroll changes
 */
export function ScrollDirectionDemo() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
    const [scrollY, setScrollY] = useState(0);
    
    const { scrollY: scrollMotionValue } = useScroll();

    useMotionValueEvent(scrollMotionValue, "change", (current) => {
        const previous = scrollMotionValue.getPrevious() ?? 0;
        const diff = current - previous;
        
        if (Math.abs(diff) > 1) {
            setScrollDirection(diff > 0 ? 'down' : 'up');
            setScrollY(Math.round(current));
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setScrollDirection('idle');
        }, 500);
        return () => clearTimeout(timer);
    }, [scrollY]);

    const directionConfig = {
        up: { icon: '↑', color: 'bg-green-500', label: 'Scrolling Up' },
        down: { icon: '↓', color: 'bg-blue-500', label: 'Scrolling Down' },
        idle: { icon: '●', color: 'bg-slate-400', label: 'Idle' },
    };

    const config = directionConfig[scrollDirection];

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.div
                key={scrollDirection}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`${config.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
            >
                {config.icon}
            </motion.div>
            <div className="text-center">
                <p className="font-medium text-slate-700">{config.label}</p>
                <p className="text-xs text-slate-500">Scroll Y: {scrollY}px</p>
            </div>
            <p className="text-xs text-slate-400">Scroll the page to see changes</p>
        </div>
    );
}

export default ScrollDirectionDemo;
