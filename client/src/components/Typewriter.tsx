// ============================================
// TYPEWRITER - Character by Character
// Typing animation effect
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    text?: string;
    speed?: number;
}

export function Typewriter({ 
    text = "Hello, I'm a typewriter effect!", 
    speed = 50 
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
        setIsComplete(false);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed + Math.random() * 50); // Add variance for realism
            return () => clearTimeout(timer);
        } else {
            setIsComplete(true);
        }
    }, [currentIndex, text, speed]);

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center p-4">
            <div className="font-mono text-lg text-slate-800">
                {displayedText}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="inline-block w-0.5 h-5 bg-slate-800 ml-0.5"
                />
            </div>
        </div>
    );
}

export function TypewriterDemo() {
    const [key, setKey] = useState(0);
    const texts = [
        "Hello, I'm a typewriter!",
        "Motion makes it easy.",
        "Click to restart..."
    ];
    const [textIndex, setTextIndex] = useState(0);

    const handleClick = () => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setKey(prev => prev + 1);
    };

    return (
        <div className="w-full h-full min-h-[200px] cursor-pointer" onClick={handleClick}>
            <Typewriter key={key} text={texts[textIndex]} speed={60} />
        </div>
    );
}

export default Typewriter;
