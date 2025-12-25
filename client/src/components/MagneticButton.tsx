// ============================================
// MAGNETIC BUTTON - Snap to Cursor
// Mouse-following magnetic effect
// ============================================

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children?: React.ReactNode;
    strength?: number;
}

export function MagneticButton({ 
    children = "Hover Me", 
    strength = 0.3 
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.button
                ref={ref}
                style={{ x, y }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl font-semibold text-white transition-colors ${
                    isHovered 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500' 
                        : 'bg-gradient-to-r from-violet-500 to-purple-500'
                } shadow-xl`}
            >
                {children}
            </motion.button>
        </div>
    );
}

export function MagneticButtonDemo() {
    return <MagneticButton>🧲 Magnetic</MagneticButton>;
}

export default MagneticButton;
