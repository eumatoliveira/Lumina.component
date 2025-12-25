import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CSSVariableAnim - Demonstrates animating CSS custom properties
 * Animates --hue variable to change multiple elements at once
 */
export function CSSVariableAnimDemo() {
    const [isAnimating, setIsAnimating] = useState(true);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.div
                animate={isAnimating ? {
                    '--hue': ['0', '120', '240', '360'],
                    '--rotate': ['0deg', '180deg', '360deg'],
                } as any : {}}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    '--hue': '0',
                    '--rotate': '0deg',
                } as React.CSSProperties}
                className="relative"
            >
                {/* Main box using CSS variable */}
                <div
                    className="w-20 h-20 rounded-2xl shadow-lg"
                    style={{
                        background: 'hsl(var(--hue), 70%, 60%)',
                        transform: 'rotate(var(--rotate))',
                    }}
                />
                
                {/* Orbiting elements also using the variable */}
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute w-4 h-4 rounded-full"
                        style={{
                            background: 'hsl(calc(var(--hue) + ' + (i * 60) + '), 80%, 50%)',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(calc(var(--rotate) + ${i * 120}deg)) translateY(-40px)`,
                        }}
                    />
                ))}
            </motion.div>

            <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="px-4 py-1 bg-slate-800 text-white text-sm rounded-full hover:bg-slate-700 transition-colors"
            >
                {isAnimating ? 'Pause' : 'Play'}
            </button>
            <p className="text-xs text-slate-500">Animating --hue and --rotate</p>
        </div>
    );
}

export default CSSVariableAnimDemo;
