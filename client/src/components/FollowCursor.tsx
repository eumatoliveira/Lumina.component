import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * FollowCursor - Element that follows the mouse cursor
 * Uses useMotionValue and useSpring for smooth tracking
 */
export function FollowCursorDemo() {
    const [isHovering, setIsHovering] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth following
    const springConfig = { stiffness: 150, damping: 15 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform for scale based on movement speed
    const scale = useTransform([x, y], ([latestX, latestY]) => {
        const dx = (latestX as number) - mouseX.get();
        const dy = (latestY as number) - mouseY.get();
        const distance = Math.sqrt(dx * dx + dy * dy);
        return Math.max(0.8, Math.min(1.5, 1 + distance * 0.01));
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - 24);
        mouseY.set(e.clientY - rect.top - 24);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden cursor-none"
        >
            <motion.div
                style={{ x, y, scale }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                }}
                className="absolute w-12 h-12 pointer-events-none"
            >
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 rounded-full shadow-lg flex items-center justify-center">
                    <motion.span
                        animate={{ rotate: isHovering ? 360 : 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="text-white text-lg"
                    >
                        ✦
                    </motion.span>
                </div>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center text-slate-400 pointer-events-none">
                {isHovering ? 'Following cursor...' : 'Hover here'}
            </div>
        </div>
    );
}

export default FollowCursorDemo;
