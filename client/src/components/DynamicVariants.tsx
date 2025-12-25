import { motion } from 'framer-motion';

/**
 * DynamicVariants - Demonstrates function-based variants with custom prop
 * Each item receives a different delay based on its index
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: (i: number) => ({
        opacity: 0,
        x: -50,
        y: i * 5,
    }),
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    }),
};

export function DynamicVariantsDemo() {
    const items = [
        { label: 'First Item', color: 'bg-blue-500' },
        { label: 'Second Item', color: 'bg-violet-500' },
        { label: 'Third Item', color: 'bg-pink-500' },
        { label: 'Fourth Item', color: 'bg-orange-500' },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 p-2"
        >
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    variants={itemVariants}
                    className={`${item.color} px-4 py-2 rounded-lg text-white text-sm font-medium`}
                >
                    {item.label}
                </motion.div>
            ))}
            <p className="text-xs text-slate-500 text-center pt-2">
                Dynamic delay: index * 0.1s
            </p>
        </motion.div>
    );
}

export default DynamicVariantsDemo;
