// ============================================
// NUMBER COUNTER - Animated Number
// Count up animation effect
// ============================================

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface NumberCounterProps {
    value?: number;
    duration?: number;
}

export function NumberCounter({ value = 1234, duration = 2 }: NumberCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const spring = useSpring(0, { duration: duration * 1000 });
    
    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
    }, [spring]);

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div 
                className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {displayValue.toLocaleString()}
            </motion.div>
        </div>
    );
}

export function NumberCounterDemo() {
    const [count, setCount] = useState(1234);
    
    const handleClick = () => {
        setCount(Math.floor(Math.random() * 9999) + 1000);
    };

    return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-4 cursor-pointer" onClick={handleClick}>
            <NumberCounter value={count} />
            <p className="text-xs text-slate-400">Click to change</p>
        </div>
    );
}

export default NumberCounter;
