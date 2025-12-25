import { motion } from 'framer-motion';
import { 
    SiReact, 
    SiTypescript, 
    SiVite, 
    SiTailwindcss, 
    SiFramer,
    SiGreensock
} from 'react-icons/si';
import { Palette, Database } from 'lucide-react';

/**
 * TechStack - Animated technology showcase
 * Displays the technologies used in this project with infinite scroll
 */

interface TechItem {
    icon: React.ReactNode;
    name: string;
    href: string;
}

const techStack: TechItem[] = [
    { icon: <SiReact />, name: 'React', href: 'https://react.dev' },
    { icon: <SiTypescript />, name: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { icon: <SiVite />, name: 'Vite', href: 'https://vitejs.dev' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { icon: <SiFramer />, name: 'Framer Motion', href: 'https://www.framer.com/motion' },
    { icon: <SiGreensock />, name: 'GSAP', href: 'https://greensock.com/gsap' },
    { icon: <Palette className="w-5 h-5" />, name: 'Lucide Icons', href: 'https://lucide.dev' },
    { icon: <Database className="w-5 h-5" />, name: 'Zustand', href: 'https://zustand-demo.pmnd.rs' },
];

interface TechStackDemoProps {
    isDark?: boolean;
}

export function TechStackDemo({ isDark = true }: TechStackDemoProps) {
    return (
        <div className="w-full overflow-hidden py-6">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Tecnologias Utilizadas
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Built with modern tools for optimal performance
                </p>
            </motion.div>

            {/* Infinite Scroll Container */}
            <div className="relative">
                {/* Fade edges */}
                <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${isDark ? 'from-slate-950' : 'from-white'} to-transparent z-10 pointer-events-none`} />
                <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${isDark ? 'from-slate-950' : 'from-white'} to-transparent z-10 pointer-events-none`} />

                {/* Scrolling track */}
                <motion.div
                    animate={{ x: [0, -250 * techStack.length] }}
                    transition={{
                        x: {
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                    className="flex gap-4 w-max"
                >
                    {/* Duplicate items for seamless loop */}
                    {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
                        <motion.a
                            key={`${tech.name}-${index}`}
                            href={tech.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all group whitespace-nowrap ${
                                isDark 
                                    ? 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600' 
                                    : 'bg-slate-100/80 border-slate-300/50 hover:border-slate-400'
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className={`text-xl group-hover:scale-110 transition-transform ${
                                isDark ? 'text-white/80' : 'text-slate-800'
                            }`}>
                                {tech.icon}
                            </span>
                            <span className={`font-medium transition-colors ${
                                isDark ? 'text-white/90 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
                            }`}>
                                {tech.name}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            {/* Static grid alternative */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap justify-center gap-3"
            >
                {techStack.map((tech, index) => (
                    <motion.a
                        key={tech.name}
                        href={tech.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                            isDark 
                                ? 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600' 
                                : 'bg-slate-100/50 border-slate-300/30 hover:border-slate-400'
                        }`}
                    >
                        <span className={isDark ? 'text-white/80' : 'text-slate-800'}>{tech.icon}</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{tech.name}</span>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}

export default TechStackDemo;
