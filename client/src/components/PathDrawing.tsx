// ============================================
// PATH DRAWING - SVG Line Animation
// pathLength animation
// ============================================

import { motion } from 'framer-motion';

export function PathDrawing() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120">
                <motion.path
                    d="M10,60 Q60,10 110,60 Q60,110 10,60"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                        duration: 2, 
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export function PathDrawingDemo() {
    return <PathDrawing />;
}

export default PathDrawing;
