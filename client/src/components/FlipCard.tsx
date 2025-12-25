// ============================================
// FLIP CARD - 3D Card Flip
// rotateY animation
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';

export function FlipCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center" style={{ perspective: "1000px" }}>
            <motion.div
                className="relative w-32 h-40 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    Front
                </div>
                
                {/* Back */}
                <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    Back
                </div>
            </motion.div>
        </div>
    );
}

export function FlipCardDemo() {
    return <FlipCard />;
}

export default FlipCard;
