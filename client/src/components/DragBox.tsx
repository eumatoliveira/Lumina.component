// ============================================
// DRAG BOX - Interactive Drag Gesture
// Framer Motion drag with constraints
// ============================================

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface DragBoxProps {
    size?: number;
    color?: string;
}

export function DragBox({ 
    size = 80, 
    color = '#3b82f6' 
}: DragBoxProps) {
    const constraintsRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={constraintsRef}
            className="w-full h-full min-h-[200px] flex items-center justify-center relative"
        >
            {/* Constraint area indicator */}
            <div className="absolute inset-4 border-2 border-dashed border-slate-300 rounded-xl" />
            
            <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                whileDrag={{ scale: 1.1, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center z-10"
                style={{ 
                    width: size, 
                    height: size, 
                    backgroundColor: color,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }}
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            </motion.div>
        </div>
    );
}

// Demo component for the gallery
export function DragBoxDemo() {
    return (
        <div className="w-full h-full min-h-[200px]">
            <DragBox size={70} color="#6366f1" />
        </div>
    );
}

export default DragBox;
