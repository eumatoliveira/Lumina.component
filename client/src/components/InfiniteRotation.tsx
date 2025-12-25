// ============================================
// INFINITE ROTATION - Continuous Spin
// Framer Motion repeat: Infinity
// ============================================

import { motion } from 'framer-motion';

export function InfiniteRotation() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 2, 
                    ease: "linear" 
                }}
            >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </motion.div>
        </div>
    );
}

export function InfiniteRotationDemo() {
    return <InfiniteRotation />;
}

export default InfiniteRotation;
