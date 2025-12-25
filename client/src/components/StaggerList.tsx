// ============================================
// STAGGER LIST - Framer Motion Stagger
// Lista com entrada escalonada
// ============================================

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StaggerListProps {
    items?: string[];
    staggerDelay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    trigger?: number;
}

const directionVariants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 }
};

export function StaggerList({ 
    items = ['React', 'Motion', 'Design', 'System'],
    staggerDelay = 0.1,
    direction = 'up',
    trigger = 0
}: StaggerListProps) {
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: directionVariants[direction],
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <motion.ul
            key={trigger}
            className="flex flex-wrap gap-3 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {items.map((item, index) => (
                <motion.li
                    key={index}
                    variants={itemVariants}
                    className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full text-sm font-medium shadow-lg"
                >
                    {item}
                </motion.li>
            ))}
        </motion.ul>
    );
}

// Demo component for the gallery
export function StaggerListDemo() {
    const [trigger, setTrigger] = useState(0);

    const handleReplay = useCallback(() => {
        setTrigger(t => t + 1);
    }, []);

    return (
        <div 
            className="flex flex-col items-center justify-center gap-4 p-4 cursor-pointer min-h-[180px]"
            onClick={handleReplay}
        >
            <StaggerList 
                items={['Framer', 'Motion', 'Stagger', 'Effect']}
                staggerDelay={0.15}
                direction="up"
                trigger={trigger}
            />
            <p className="text-xs text-slate-400 mt-2">Click to replay</p>
        </div>
    );
}

export default StaggerList;
