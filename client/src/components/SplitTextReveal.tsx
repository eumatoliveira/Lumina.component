import { motion } from "framer-motion";

export const SplitTextReveal = ({ text = "Motion Intelligence" }: { text?: string }) => {
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <div className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden flex items-center justify-center">
        <motion.div
        className="flex overflow-hidden text-3xl font-bold text-slate-900 tracking-tighter"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }} 
        // Re-trigger on view
        >
        {characters.map((char, index) => (
            <motion.span variants={child} key={index} className="inline-block">
            {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
        </motion.div>
    </div>
  );
};

export default SplitTextReveal;
