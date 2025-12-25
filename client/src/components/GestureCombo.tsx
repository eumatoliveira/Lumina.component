import { motion } from 'framer-motion';

/**
 * GestureCombo - Demonstrates combining multiple gestures
 * whileHover + whileTap + whileFocus + whileDrag
 */
export function GestureComboDemo() {
    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Multi-gesture box */}
            <motion.div
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl cursor-pointer select-none flex items-center justify-center text-white font-bold shadow-lg"
                initial={{ scale: 1 }}
                whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
                whileTap={{ 
                    scale: 0.9,
                    rotate: -5,
                }}
                whileDrag={{
                    scale: 1.2,
                    rotate: 15,
                    opacity: 0.8,
                }}
                drag
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                dragElastic={0.2}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                Drag Me
            </motion.div>

            {/* Focusable button */}
            <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium outline-none"
                whileHover={{
                    scale: 1.05,
                    y: -2,
                }}
                whileTap={{
                    scale: 0.95,
                }}
                whileFocus={{
                    boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
                Focus Me (Tab)
            </motion.button>

            <p className="text-xs text-slate-500">Hover, Tap, Focus, Drag</p>
        </div>
    );
}

export default GestureComboDemo;
