import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = path.join(__dirname, '../db/animations.json');

// Ensure DB exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

export interface AnimationRecord {
    id: string;
    source_url: string;
    element_selector?: string;
    animation_type: string;
    tech_detected: string[];
    extracted_pattern: any;
    complexity_score: number;
    created_at: string;
}

export const db = {
    getAll: async (): Promise<AnimationRecord[]> => {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    },

    save: async (data: Omit<AnimationRecord, 'id' | 'created_at'>): Promise<AnimationRecord> => {
        const records = await db.getAll();
        const newRecord: AnimationRecord = {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            ...data
        };
        records.unshift(newRecord); // Add to top
        fs.writeFileSync(DB_PATH, JSON.stringify(records, null, 2));
        return newRecord;
    }
};
