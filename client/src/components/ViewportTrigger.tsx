import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ViewportTrigger - Demonstrates useInView hook
 * Animations trigger when elements enter the viewport
 */
export function ViewportTriggerDemo() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const isInView1 = useInView(ref1, { once: false, amount: 0.5 });
    const isInView2 = useInView(ref2, { once: false, amount: 0.5 });
    const isInView3 = useInView(ref3, { once: false, amount: 0.5 });

    const items = [
        { ref: ref1, inView: isInView1, color: 'bg-blue-500', label: 'Box 1' },
        { ref: ref2, inView: isInView2, color: 'bg-violet-500', label: 'Box 2' },
        { ref: ref3, inView: isInView3, color: 'bg-pink-500', label: 'Box 3' },
    ];

    return (
        <div className="w-full h-40 overflow-y-auto bg-slate-100 rounded-lg p-4">
            <p className="text-xs text-slate-500 text-center mb-4">Scroll to trigger animations</p>
            
            <div className="space-y-4 pb-20">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        ref={item.ref}
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={item.inView ? {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        } : {
                            opacity: 0,
                            x: -50,
                            scale: 0.8,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`${item.color} p-4 rounded-xl text-white font-bold text-center`}
                    >
                        {item.label}
                        <motion.span
                            animate={{ opacity: item.inView ? 1 : 0 }}
                            className="ml-2"
                        >
                            {item.inView ? '👁️ In View' : ''}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default ViewportTriggerDemo;
