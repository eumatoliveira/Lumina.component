import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ViewBoxZoom - Demonstrates SVG viewBox animation
 * Pan and zoom effects using animated viewBox
 */
export function ViewBoxZoomDemo() {
    const [view, setView] = useState<'full' | 'zoom1' | 'zoom2' | 'pan'>('full');

    const viewBoxes = {
        full: '0 0 200 200',
        zoom1: '50 50 100 100',
        zoom2: '75 75 50 50',
        pan: '100 0 100 200',
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.svg
                viewBox={viewBoxes[view]}
                className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden"
                initial={false}
                animate={{ viewBox: viewBoxes[view] }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                {/* Grid pattern */}
                {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 5 }).map((_, col) => (
                        <rect
                            key={`${row}-${col}`}
                            x={col * 40 + 5}
                            y={row * 40 + 5}
                            width={30}
                            height={30}
                            rx={5}
                            fill={`hsl(${(row + col) * 30}, 70%, 60%)`}
                        />
                    ))
                )}
                
                {/* Center star */}
                <motion.text
                    x="100"
                    y="108"
                    fontSize="24"
                    textAnchor="middle"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '100px 100px' }}
                >
                    ⭐
                </motion.text>
            </motion.svg>

            <div className="flex gap-1 flex-wrap justify-center">
                {(['full', 'zoom1', 'zoom2', 'pan'] as const).map((v) => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`px-2 py-1 text-xs rounded-lg capitalize transition-colors ${
                            view === v
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {v === 'full' ? '🔍 Full' : v === 'zoom1' ? '🔎 Zoom 1' : v === 'zoom2' ? '🔬 Zoom 2' : '➡️ Pan'}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ViewBoxZoomDemo;
