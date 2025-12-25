import { useState } from 'react';
import { Reorder } from 'framer-motion';

/**
 * ReorderableList - Demonstrates Reorder.Group and Reorder.Item
 * Drag-to-reorder list with automatic layout animations
 */
export function ReorderableListDemo() {
    const [items, setItems] = useState([
        { id: '1', label: '🎨 Design', color: 'bg-pink-500' },
        { id: '2', label: '💻 Develop', color: 'bg-blue-500' },
        { id: '3', label: '🚀 Deploy', color: 'bg-green-500' },
        { id: '4', label: '📊 Monitor', color: 'bg-orange-500' },
    ]);

    return (
        <div className="w-full max-w-[200px] mx-auto p-2">
            <Reorder.Group
                axis="y"
                values={items}
                onReorder={setItems}
                className="space-y-2"
            >
                {items.map((item) => (
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        className={`${item.color} px-3 py-2 rounded-lg text-white text-sm font-medium cursor-grab active:cursor-grabbing flex items-center gap-2 select-none`}
                        whileDrag={{
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        }}
                    >
                        <span className="opacity-50">⋮⋮</span>
                        {item.label}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <p className="text-xs text-slate-500 text-center mt-2">Drag to reorder</p>
        </div>
    );
}

export default ReorderableListDemo;
