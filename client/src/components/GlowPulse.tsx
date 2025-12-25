// ============================================
// GLOW PULSE - Pulsing Glow Effect
// Box-shadow animation
// ============================================

import { motion } from 'framer-motion';

export function GlowPulse() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div
                animate={{
                    boxShadow: [
                        "0 0 20px 5px rgba(99, 102, 241, 0.3)",
                        "0 0 40px 15px rgba(99, 102, 241, 0.5)",
                        "0 0 20px 5px rgba(99, 102, 241, 0.3)"
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
            >
                <span className="text-2xl">💎</span>
            </motion.div>
        </div>
    );
}

export function GlowPulseDemo() {
    return <GlowPulse />;
}

export default GlowPulse;
