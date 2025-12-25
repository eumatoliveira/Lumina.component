import { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme;
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300"
            style={{
                backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
                border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Track icons */}
            <div className="absolute inset-0 flex items-center justify-between px-1.5">
                <Sun className={`w-4 h-4 transition-opacity ${isDark ? 'opacity-30' : 'opacity-100 text-yellow-500'}`} />
                <Moon className={`w-4 h-4 transition-opacity ${isDark ? 'opacity-100 text-blue-400' : 'opacity-30'}`} />
            </div>

            {/* Sliding circle */}
            <motion.div
                className="w-5 h-5 rounded-full shadow-md flex items-center justify-center"
                animate={{
                    x: isDark ? 26 : 0,
                    backgroundColor: isDark ? '#3b82f6' : '#f59e0b',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <Moon className="w-3 h-3 text-white" />
                ) : (
                    <Sun className="w-3 h-3 text-white" />
                )}
            </motion.div>
        </motion.button>
    );
}

export default ThemeToggle;
