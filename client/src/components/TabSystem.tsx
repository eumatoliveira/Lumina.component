// ============================================
// TAB SYSTEM - Layout Animation Tabs
// Animated tabs with layoutId indicator
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
    id: string;
    label: string;
    content: string;
}

interface TabSystemProps {
    tabs?: Tab[];
}

const defaultTabs: Tab[] = [
    { id: 'home', label: 'Home', content: '🏠 Welcome home!' },
    { id: 'about', label: 'About', content: '📖 Learn about us' },
    { id: 'contact', label: 'Contact', content: '📧 Get in touch' },
];

export function TabSystem({ tabs = defaultTabs }: TabSystemProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-4">
            {/* Tab Headers */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className={`relative z-10 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 w-full max-w-xs">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                    >
                        <span className="text-2xl">
                            {tabs.find(t => t.id === activeTab)?.content}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// Demo component for the gallery
export function TabSystemDemo() {
    return (
        <div className="w-full h-full min-h-[200px]">
            <TabSystem />
        </div>
    );
}

export default TabSystem;
