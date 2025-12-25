// ============================================
// BOUNCE LOADER - Repeating Bounce
// repeatType: "reverse" animation
// ============================================

import { motion } from 'framer-motion';

export function BounceLoader() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"
                    animate={{ y: [-10, 10] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.5,
                        delay: i * 0.15,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

export function BounceLoaderDemo() {
    return <BounceLoader />;
}

export default BounceLoader;
