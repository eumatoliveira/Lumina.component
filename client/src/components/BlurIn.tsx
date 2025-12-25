// ============================================
// BLUR IN - Blur to Sharp Animation
// Filter animation
// ============================================

import { motion } from 'framer-motion';

export function BlurIn() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
            >
                Sharp Focus ✨
            </motion.div>
        </div>
    );
}

export function BlurInDemo() {
    return <BlurIn key={Date.now()} />;
}

export default BlurIn;
