// ============================================
// ACCORDION MOTION - Animated Expand/Collapse
// Height auto animation with AnimatePresence
// ============================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
    id: string;
    title: string;
    content: string;
}

interface AccordionMotionProps {
    items?: AccordionItem[];
    allowMultiple?: boolean;
}

const defaultItems: AccordionItem[] = [
    { id: '1', title: 'What is Motion?', content: 'Motion is a powerful animation library for React.' },
    { id: '2', title: 'How to animate?', content: 'Use motion components with animate, initial, and exit props.' },
    { id: '3', title: 'Is it performant?', content: 'Yes! Motion uses hardware acceleration for smooth 60fps animations.' },
];

export function AccordionMotion({ 
    items = defaultItems,
    allowMultiple = false 
}: AccordionMotionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev => 
                prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            );
        } else {
            setOpenItems(prev => prev.includes(id) ? [] : [id]);
        }
    };

    const isOpen = (id: string) => openItems.includes(id);

    return (
        <div className="w-full max-w-xs mx-auto space-y-2 p-4">
            {items.map((item) => (
                <div 
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                >
                    <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                        <span className="font-medium text-sm text-slate-800">{item.title}</span>
                        <motion.div
                            animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                        {isOpen(item.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="px-4 pb-3 text-xs text-slate-600 border-t border-slate-100 pt-2">
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

// Demo component for the gallery
export function AccordionMotionDemo() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center overflow-auto">
            <AccordionMotion />
        </div>
    );
}

export default AccordionMotion;
