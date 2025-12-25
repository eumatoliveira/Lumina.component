// ============================================
// SLIDE SHOW - AnimatePresence Transitions
// Slideshow with enter/exit animations
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideShowProps {
    images?: string[];
    colors?: string[];
}

const defaultSlides = [
    { color: 'from-blue-500 to-cyan-500', label: '1' },
    { color: 'from-violet-500 to-purple-500', label: '2' },
    { color: 'from-rose-500 to-pink-500', label: '3' },
    { color: 'from-amber-500 to-orange-500', label: '4' },
];

export function SlideShow({ colors }: SlideShowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const slides = colors ? colors.map((c, i) => ({ color: c, label: String(i + 1) })) : defaultSlides;

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 200 : -200,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        })
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + slides.length) % slides.length);
    };

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${slides[currentIndex].color} flex items-center justify-center shadow-xl`}
                >
                    <span className="text-white text-3xl font-bold">{slides[currentIndex].label}</span>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
            >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
            >
                <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 flex gap-1">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-slate-800' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Demo component for the gallery
export function SlideShowDemo() {
    return (
        <div className="w-full h-full min-h-[200px]">
            <SlideShow />
        </div>
    );
}

export default SlideShow;
