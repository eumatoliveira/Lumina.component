// ============================================
// WOBBLE - Jelly Wobble Effect
// Spring physics wobble
// ============================================

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function Wobble() {
    const controls = useAnimation();
    const [isWobbling, setIsWobbling] = useState(false);

    const handleWobble = async () => {
        if (isWobbling) return;
        setIsWobbling(true);
        
        await controls.start({
            scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
            rotate: [0, -5, 5, -3, 3, 0],
            transition: { duration: 0.6 }
        });
        
        setIsWobbling(false);
    };

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div
                animate={controls}
                onClick={handleWobble}
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center cursor-pointer shadow-xl"
            >
                <span className="text-3xl">🍮</span>
            </motion.div>
        </div>
    );
}

export function WobbleDemo() {
    return <Wobble />;
}

export default Wobble;
