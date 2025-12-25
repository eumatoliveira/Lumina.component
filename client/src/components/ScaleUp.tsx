// ============================================
// SCALE UP - Scale Animation on Mount
// Scale from 0 to 1
// ============================================

import { motion } from 'framer-motion';

export function ScaleUp() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.1
                }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl"
            >
                <span className="text-4xl">🚀</span>
            </motion.div>
        </div>
    );
}

export function ScaleUpDemo() {
    return <ScaleUp key={Date.now()} />;
}

export default ScaleUp;
