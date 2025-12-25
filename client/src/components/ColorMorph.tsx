// ============================================
// COLOR MORPH - Background Color Animation
// Gradient transition
// ============================================

import { motion } from 'framer-motion';

export function ColorMorph() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center p-4">
            <motion.div
                animate={{
                    background: [
                        "linear-gradient(45deg, #ff6b6b, #feca57)",
                        "linear-gradient(45deg, #54a0ff, #5f27cd)",
                        "linear-gradient(45deg, #1dd1a1, #10ac84)",
                        "linear-gradient(45deg, #ff6b6b, #feca57)"
                    ]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="w-full max-w-[180px] h-24 rounded-2xl flex items-center justify-center shadow-xl"
            >
                <span className="text-white font-bold text-lg drop-shadow">Color Flow</span>
            </motion.div>
        </div>
    );
}

export function ColorMorphDemo() {
    return <ColorMorph />;
}

export default ColorMorph;
