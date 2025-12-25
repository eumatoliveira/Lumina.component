// ============================================
// MORPHING BUTTON - Micro-interaction
// Botão com estados animados
// ============================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';

type ButtonState = 'idle' | 'loading' | 'success';

interface MorphButtonProps {
    text?: string;
    successText?: string;
    duration?: number;
}

export function MorphButton({ 
    text = "Send Message",
    successText = "Sent!",
    duration = 2000
}: MorphButtonProps) {
    const [state, setState] = useState<ButtonState>('idle');

    const handleClick = () => {
        if (state !== 'idle') return;
        
        setState('loading');
        setTimeout(() => {
            setState('success');
            setTimeout(() => setState('idle'), duration);
        }, 1500);
    };

    const variants = {
        idle: { width: 160 },
        loading: { width: 56 },
        success: { width: 140 }
    };

    const bgColors = {
        idle: 'bg-slate-900 hover:bg-slate-800',
        loading: 'bg-blue-600',
        success: 'bg-emerald-500'
    };

    return (
        <motion.button
            onClick={handleClick}
            className={`h-14 rounded-full text-white font-semibold overflow-hidden relative ${bgColors[state]} transition-colors shadow-lg`}
            variants={variants}
            animate={state}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <AnimatePresence mode="wait">
                {state === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center gap-2 px-6 whitespace-nowrap"
                    >
                        <Send className="w-4 h-4" />
                        {text}
                    </motion.div>
                )}
                {state === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </motion.div>
                )}
                {state === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="flex items-center justify-center gap-2 px-6 whitespace-nowrap"
                    >
                        <Check className="w-5 h-5" />
                        {successText}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

// Demo component for the gallery
export function MorphButtonDemo() {
    return (
        <div className="flex items-center justify-center p-8 min-h-[180px]">
            <MorphButton text="Send Message" successText="Sent!" />
        </div>
    );
}

export default MorphButton;
