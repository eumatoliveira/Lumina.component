// Flexible property value type for animation patterns
export type PropertyValue = 
    | { from: string | number; to: string | number }
    | { keyframes: (string | number)[] }
    | string;

export interface ExtractedPattern {
    trigger: string;
    threshold?: string;
    properties: Record<string, PropertyValue>;
    duration?: string;
    easing?: string;
    tech_context?: string[]; // e.g. ['React', 'Framer Motion']
    description?: string;
    code_snippet?: string;
}

export interface AnimationRecord {
    id: string;
    source_url: string;
    element_selector: string;
    animation_type: string;
    tech_detected: string[];
    extracted_pattern: ExtractedPattern;
    complexity_score: number;
}
