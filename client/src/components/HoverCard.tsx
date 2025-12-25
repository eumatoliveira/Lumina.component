// ============================================
// HOVER CARD EFFECT - Scale + Shadow
// whileHover animation
// ============================================

import { motion } from 'framer-motion';

export function HoverCard() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-[200px] p-6 bg-white rounded-2xl border border-slate-200 cursor-pointer"
                whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 mb-3 flex items-center justify-center">
                    <span className="text-white text-lg">✨</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Hover Card</h3>
                <p className="text-xs text-slate-500">Hover me to see the lift effect</p>
            </motion.div>
        </div>
    );
}

export function HoverCardDemo() {
    return <HoverCard />;
}

export default HoverCard;
