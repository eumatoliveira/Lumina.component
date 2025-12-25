// ============================================
// WAVE TEXT - Text Wave Animation
// Staggered character animation
// ============================================

import { motion } from 'framer-motion';

export function WaveText({ text = "Wave Effect" }: { text?: string }) {
    const letters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, repeat: Infinity, repeatDelay: 2 }
        }
    };

    const child = {
        hidden: { y: 0 },
        visible: {
            y: [-5, 0],
            transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 0.3 }
        }
    };

    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex text-2xl font-bold"
            >
                {letters.map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={child}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                        style={{ display: letter === " " ? "inline-block" : "inline", width: letter === " " ? "0.5em" : "auto" }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}

export function WaveTextDemo() {
    return <WaveText text="Wave Text" />;
}

export default WaveText;
