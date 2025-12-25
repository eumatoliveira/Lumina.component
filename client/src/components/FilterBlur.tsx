import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FilterBlur - Demonstrates CSS filter animations
 * Animates blur, brightness, saturate, and contrast
 */
export function FilterBlurDemo() {
    const [activeFilter, setActiveFilter] = useState<'blur' | 'bright' | 'saturate' | 'hue'>('blur');

    const filterAnimations = {
        blur: {
            filter: ['blur(0px)', 'blur(10px)', 'blur(0px)'],
        },
        bright: {
            filter: ['brightness(1)', 'brightness(1.5)', 'brightness(0.5)', 'brightness(1)'],
        },
        saturate: {
            filter: ['saturate(1)', 'saturate(3)', 'saturate(0)', 'saturate(1)'],
        },
        hue: {
            filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
        },
    };

    const buttons = [
        { key: 'blur', label: '🌫️ Blur' },
        { key: 'bright', label: '☀️ Bright' },
        { key: 'saturate', label: '🎨 Saturate' },
        { key: 'hue', label: '🌈 Hue' },
    ] as const;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.div
                key={activeFilter}
                animate={filterAnimations[activeFilter]}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg"
            >
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 flex items-center justify-center text-white text-3xl">
                    ✦
                </div>
            </motion.div>

            <div className="flex gap-1 flex-wrap justify-center">
                {buttons.map((btn) => (
                    <button
                        key={btn.key}
                        onClick={() => setActiveFilter(btn.key)}
                        className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                            activeFilter === btn.key
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBlurDemo;
