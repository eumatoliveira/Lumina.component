// ============================================
// FULLSCREEN PREVIEW - Modal for Large Animations
// Overlay with blur, ESC to close, click outside
// ============================================

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

interface FullscreenPreviewProps {
    isOpen: boolean;
    title: string;
    description?: string;
    children: React.ReactNode;
    onClose: () => void;
}

export function FullscreenPreview({ 
    isOpen, 
    title, 
    description,
    children, 
    onClose 
}: FullscreenPreviewProps) {
    // Handle ESC key
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    
                    {/* Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-xl">
                                    <Maximize2 className="w-5 h-5 text-slate-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                                    {description && (
                                        <p className="text-sm text-slate-500">{description}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[400px] flex items-center justify-center">
                            <div className="w-full h-full min-h-[350px]">
                                {children}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 bg-white">
                            <p className="text-xs text-slate-400 text-center">
                                Press <kbd className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono">ESC</kbd> or click outside to close
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default FullscreenPreview;
