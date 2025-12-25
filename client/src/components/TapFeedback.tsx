// ============================================
// TAP FEEDBACK - Scale + Rotate on Press
// whileTap animation
// ============================================

import { motion } from 'framer-motion';

export function TapFeedback() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.button
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ 
                    scale: 0.9, 
                    rotate: 3,
                    transition: { type: "spring", stiffness: 400 }
                }}
            >
                Press Me! 👆
            </motion.button>
        </div>
    );
}

export function TapFeedbackDemo() {
    return <TapFeedback />;
}

export default TapFeedback;
