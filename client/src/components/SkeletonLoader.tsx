// ============================================
// SKELETON LOADER - Loading Placeholder
// Shimmer animation
// ============================================

import { motion } from 'framer-motion';

export function SkeletonLoader() {
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center p-4">
            <div className="w-full max-w-[220px] space-y-3">
                {/* Avatar */}
                <div className="flex items-center gap-3">
                    <motion.div 
                        className="w-12 h-12 rounded-full bg-slate-200"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    <div className="flex-1 space-y-2">
                        <motion.div 
                            className="h-3 bg-slate-200 rounded w-3/4"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }}
                        />
                        <motion.div 
                            className="h-3 bg-slate-200 rounded w-1/2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                        />
                    </div>
                </div>
                
                {/* Content lines */}
                <motion.div 
                    className="h-3 bg-slate-200 rounded"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                />
                <motion.div 
                    className="h-3 bg-slate-200 rounded w-5/6"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                />
            </div>
        </div>
    );
}

export function SkeletonLoaderDemo() {
    return <SkeletonLoader />;
}

export default SkeletonLoader;
