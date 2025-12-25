// ============================================
// FOCUS RING - Accessible Focus Animation
// Animated focus indicator
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';

export function FocusRing() {
    const [focused, setFocused] = useState(false);

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <div className="relative">
                <motion.div
                    className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={focused ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                <motion.input
                    type="text"
                    placeholder="Focus me..."
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    whileFocus={{ scale: 1.02 }}
                    className="relative px-6 py-3 rounded-lg border-2 border-slate-200 bg-white text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-transparent"
                />
            </div>
        </div>
    );
}

export function FocusRingDemo() {
    return <FocusRing />;
}

export default FocusRing;
