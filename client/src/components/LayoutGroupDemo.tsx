import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';

/**
 * LayoutGroup - Demonstrates synced layout animations
 * Multiple components aware of each other's layout changes
 */
export function LayoutGroupDemo() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const items = [
        { id: 0, color: 'from-blue-500 to-cyan-500', label: 'A' },
        { id: 1, color: 'from-violet-500 to-purple-500', label: 'B' },
        { id: 2, color: 'from-pink-500 to-rose-500', label: 'C' },
    ];

    return (
        <div className="p-4">
            <LayoutGroup>
                <div className="flex gap-2 justify-center">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            onClick={() => setExpandedIndex(expandedIndex === item.id ? null : item.id)}
                            className={`bg-gradient-to-br ${item.color} rounded-xl cursor-pointer flex items-center justify-center text-white font-bold shadow-lg overflow-hidden`}
                            animate={{
                                width: expandedIndex === item.id ? 120 : 50,
                                height: expandedIndex === item.id ? 80 : 50,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <motion.span layout>
                                {expandedIndex === item.id ? `Box ${item.label}` : item.label}
                            </motion.span>
                        </motion.div>
                    ))}
                </div>
            </LayoutGroup>
            <p className="text-xs text-slate-500 text-center mt-4">Click to expand (synced layout)</p>
        </div>
    );
}

export default LayoutGroupDemo;
