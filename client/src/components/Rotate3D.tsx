// ============================================
// ROTATE 3D - Perspective Mouse Tracking
// 3D rotation on hover/mouse position
// ============================================

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Rotate3DProps {
    size?: number;
    intensity?: number;
}

export function Rotate3D({ 
    size = 120, 
    intensity = 15 
}: Rotate3DProps) {
    const ref = useRef<HTMLDivElement>(null);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) / rect.width);
        y.set((event.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div 
            className="w-full h-full min-h-[200px] flex items-center justify-center"
            style={{ perspective: '1000px' }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: size,
                    height: size,
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
            >
                {/* Card face */}
                <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 shadow-2xl flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <motion.div
                        className="text-white text-3xl font-bold"
                        style={{ translateZ: 30 }}
                    >
                        3D
                    </motion.div>
                </div>
                
                {/* Subtle shadow */}
                <div 
                    className="absolute inset-0 -z-10 bg-black/20 rounded-2xl blur-xl scale-90 translate-y-4"
                />
            </motion.div>
        </div>
    );
}

// Demo component for the gallery
export function Rotate3DDemo() {
    return (
        <div className="w-full h-full min-h-[200px]">
            <Rotate3D size={100} intensity={20} />
        </div>
    );
}

export default Rotate3D;
