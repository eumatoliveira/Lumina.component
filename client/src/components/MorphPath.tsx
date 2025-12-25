import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * MorphPath - Demonstrates SVG path morphing
 * Animates the d attribute between different shapes
 */

const paths = {
    circle: 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10',
    square: 'M 10 10 L 90 10 L 90 90 L 10 90 Z',
    triangle: 'M 50 10 L 90 90 L 10 90 Z',
    star: 'M 50 10 L 60 40 L 95 40 L 68 60 L 78 95 L 50 75 L 22 95 L 32 60 L 5 40 L 40 40 Z',
};

export function MorphPathDemo() {
    const [shapeIndex, setShapeIndex] = useState(0);
    const shapeNames = Object.keys(paths) as (keyof typeof paths)[];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setShapeIndex((prev) => (prev + 1) % shapeNames.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const currentShape = shapeNames[shapeIndex];

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.svg
                viewBox="0 0 100 100"
                className="w-24 h-24"
            >
                <defs>
                    <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={paths[currentShape]}
                    fill="url(#morphGradient)"
                    initial={{ d: paths.circle }}
                    animate={{ d: paths[currentShape] }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                />
            </motion.svg>

            <div className="flex gap-1">
                {shapeNames.map((name, i) => (
                    <button
                        key={name}
                        onClick={() => setShapeIndex(i)}
                        className={`px-2 py-1 text-xs rounded-lg capitalize transition-colors ${
                            currentShape === name
                                ? 'bg-violet-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <p className="text-xs text-slate-500">SVG Path Morphing</p>
        </div>
    );
}

export default MorphPathDemo;
