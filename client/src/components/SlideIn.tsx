// ============================================
// SLIDE IN - Directional Slide Animation
// Slide from different directions
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Direction = 'left' | 'right' | 'top' | 'bottom';

export function SlideIn() {
    const [direction, setDirection] = useState<Direction>('left');
    const [key, setKey] = useState(0);

    const directions = ['left', 'right', 'top', 'bottom'] as Direction[];
    
    const variants = {
        left: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        right: { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        top: { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 } },
        bottom: { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 } }
    };

    const cycleDirection = () => {
        const currentIndex = directions.indexOf(direction);
        setDirection(directions[(currentIndex + 1) % directions.length]);
        setKey(k => k + 1);
    };

    return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={key}
                    initial={variants[direction].initial}
                    animate={variants[direction].animate}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg"
                >
                    Slide from {direction}
                </motion.div>
            </AnimatePresence>
            <button 
                onClick={cycleDirection}
                className="text-xs text-slate-500 hover:text-slate-700"
            >
                Click to change direction →
            </button>
        </div>
    );
}

export function SlideInDemo() {
    return <SlideIn />;
}

export default SlideIn;
