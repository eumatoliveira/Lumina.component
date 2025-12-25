import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SharedElementModal - Demonstrates layoutId for shared element transitions
 * Creates seamless "magic motion" between two different elements
 */
export function SharedElementModalDemo() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const items = [
        { id: '1', color: 'from-pink-500 to-rose-500', title: 'Card A' },
        { id: '2', color: 'from-blue-500 to-cyan-500', title: 'Card B' },
        { id: '3', color: 'from-green-500 to-emerald-500', title: 'Card C' },
    ];

    return (
        <div className="relative w-full h-full min-h-[180px]">
            <div className="flex gap-2 justify-center p-2">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl cursor-pointer flex items-center justify-center`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span layoutId={`title-${item.id}`} className="text-white text-xs font-bold">
                            {item.title}
                        </motion.span>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black rounded-xl"
                            onClick={() => setSelectedId(null)}
                        />
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className={`absolute inset-4 bg-gradient-to-br ${items.find(i => i.id === selectedId)?.color} rounded-2xl flex flex-col items-center justify-center`}
                        >
                            <motion.span layoutId={`title-${selectedId}`} className="text-white text-xl font-bold">
                                {items.find(i => i.id === selectedId)?.title}
                            </motion.span>
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setSelectedId(null)}
                                className="mt-3 px-4 py-1 bg-white/20 rounded-full text-white text-sm"
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SharedElementModalDemo;
