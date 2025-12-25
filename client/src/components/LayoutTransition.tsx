import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * LayoutTransition - Demonstrates the `layout` prop
 * Animates layout changes automatically using CSS transforms
 */
export function LayoutTransitionDemo() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.div
                layout
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl cursor-pointer overflow-hidden"
                style={{
                    width: isExpanded ? 200 : 80,
                    height: isExpanded ? 120 : 80,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <motion.div layout className="p-3 text-white text-center">
                    {isExpanded ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm"
                        >
                            <p className="font-bold">Expanded!</p>
                            <p className="text-xs opacity-80">Click to collapse</p>
                        </motion.div>
                    ) : (
                        <motion.span className="text-2xl">+</motion.span>
                    )}
                </motion.div>
            </motion.div>
            <p className="text-xs text-slate-500">Click to toggle layout</p>
        </div>
    );
}

export default LayoutTransitionDemo;
