import { motion } from 'framer-motion';

/**
 * KeyframeSequence - Demonstrates keyframe arrays
 * Animates through a sequence of values
 */
export function KeyframeSequenceDemo() {
    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Multi-keyframe animation */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    scale: [1, 1.2, 0.8, 1],
                    rotate: [0, 90, -90, 0],
                    borderRadius: ['20%', '50%', '20%', '50%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.33, 0.66, 1],
                }}
                className="w-16 h-16 bg-gradient-to-br from-pink-500 to-violet-600"
            />

            {/* Color keyframes */}
            <motion.div
                animate={{
                    backgroundColor: [
                        '#3b82f6', // blue
                        '#8b5cf6', // violet
                        '#ec4899', // pink
                        '#f97316', // orange
                        '#3b82f6', // back to blue
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="w-16 h-4 rounded-full"
            />

            {/* Bounce keyframes */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    scaleY: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                }}
                className="w-8 h-8 bg-green-500 rounded-full shadow-lg"
            />

            <p className="text-xs text-slate-500">Multi-keyframe animations</p>
        </div>
    );
}

export default KeyframeSequenceDemo;
