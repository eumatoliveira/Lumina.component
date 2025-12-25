// ============================================
// SHAKE ANIMATION - Error Shake Effect
// Keyframe shake animation
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';

export function ShakeAnimation() {
    const [shake, setShake] = useState(false);

    const handleShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.button
                onClick={handleShake}
                animate={shake ? {
                    x: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.4 }
                } : {}}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-colors"
            >
                ❌ Error Shake
            </motion.button>
        </div>
    );
}

export function ShakeAnimationDemo() {
    return <ShakeAnimation />;
}

export default ShakeAnimation;
