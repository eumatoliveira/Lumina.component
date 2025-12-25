// ============================================
// LUMINA LIVE STUDIO - TYPE DEFINITIONS
// Schema-driven animation configuration
// ============================================

// Supported control types for the editor
export type ControlType = 'range' | 'color' | 'text' | 'boolean' | 'select';

// Base configuration interface
interface BaseControlConfig {
    type: ControlType;
    label: string;
    description?: string;
}

// Range control (sliders)
export interface RangeControlConfig extends BaseControlConfig {
    type: 'range';
    min: number;
    max: number;
    step?: number;
    defaultValue: number;
    unit?: string; // e.g., 'px', 's', '%'
}

// Color control (color picker)
export interface ColorControlConfig extends BaseControlConfig {
    type: 'color';
    defaultValue: string; // hex format
}

// Text control (input field)
export interface TextControlConfig extends BaseControlConfig {
    type: 'text';
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
}

// Boolean control (toggle)
export interface BooleanControlConfig extends BaseControlConfig {
    type: 'boolean';
    defaultValue: boolean;
}

// Select control (dropdown)
export interface SelectControlConfig extends BaseControlConfig {
    type: 'select';
    defaultValue: string;
    options: { value: string; label: string }[];
}

// Union type for all control configs
export type ControlConfig = 
    | RangeControlConfig 
    | ColorControlConfig 
    | TextControlConfig 
    | BooleanControlConfig 
    | SelectControlConfig;

// Schema for an animation component
export interface AnimationSchema {
    componentName: string;
    displayName: string;
    description: string;
    category: string;
    controls: Record<string, ControlConfig>;
}

// Current values of all controls
export type ControlValues = Record<string, string | number | boolean>;

// Helper to extract default values from a schema
export function getDefaultValues(schema: AnimationSchema): ControlValues {
    const defaults: ControlValues = {};
    for (const [key, config] of Object.entries(schema.controls)) {
        defaults[key] = config.defaultValue;
    }
    return defaults;
}

// Helper to validate a value against its control config
export function validateValue(value: unknown, config: ControlConfig): boolean {
    switch (config.type) {
        case 'range':
            return typeof value === 'number' && value >= config.min && value <= config.max;
        case 'color':
            return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value);
        case 'text':
            return typeof value === 'string' && (!config.maxLength || value.length <= config.maxLength);
        case 'boolean':
            return typeof value === 'boolean';
        case 'select':
            return typeof value === 'string' && config.options.some(opt => opt.value === value);
        default:
            return false;
    }
}
