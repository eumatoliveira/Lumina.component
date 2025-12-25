// ============================================
// LUMINA LIVE STUDIO - LIVE EDITOR COMPONENT
// Dynamic control panel with real-time preview
// ============================================

import React, { useState, useMemo, useCallback } from 'react';
import { X, Copy, Check, Code2, Sliders, RotateCcw, Download } from 'lucide-react';
import { Button } from './ui/button';
import { AnimationSchema, ControlConfig, ControlValues, getDefaultValues } from '../lib/studio/types';
import { generateSourceCode } from '../lib/studio/codeGenerator';

// --- CONTROL COMPONENTS ---

interface RangeControlProps {
    config: Extract<ControlConfig, { type: 'range' }>;
    value: number;
    onChange: (value: number) => void;
}

function RangeControl({ config, value, onChange }: RangeControlProps) {
    const percentage = ((value - config.min) / (config.max - config.min)) * 100;
    
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">{config.label}</label>
                <span className="text-sm font-mono text-slate-500">
                    {value}{config.unit || ''}
                </span>
            </div>
            <div className="relative">
                <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.step || 1}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-900"
                    style={{
                        background: `linear-gradient(to right, #1e293b ${percentage}%, #e2e8f0 ${percentage}%)`
                    }}
                />
            </div>
            {config.description && (
                <p className="text-xs text-slate-400">{config.description}</p>
            )}
        </div>
    );
}

interface ColorControlProps {
    config: Extract<ControlConfig, { type: 'color' }>;
    value: string;
    onChange: (value: string) => void;
}

function ColorControl({ config, value, onChange }: ColorControlProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{config.label}</label>
            <div className="flex items-center gap-3">
                <div 
                    className="w-10 h-10 rounded-lg border-2 border-slate-200 cursor-pointer overflow-hidden"
                    style={{ backgroundColor: value }}
                >
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="#000000"
                />
            </div>
            {config.description && (
                <p className="text-xs text-slate-400">{config.description}</p>
            )}
        </div>
    );
}

interface TextControlProps {
    config: Extract<ControlConfig, { type: 'text' }>;
    value: string;
    onChange: (value: string) => void;
}

function TextControl({ config, value, onChange }: TextControlProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{config.label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={config.placeholder}
                maxLength={config.maxLength}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {config.description && (
                <p className="text-xs text-slate-400">{config.description}</p>
            )}
        </div>
    );
}

interface BooleanControlProps {
    config: Extract<ControlConfig, { type: 'boolean' }>;
    value: boolean;
    onChange: (value: boolean) => void;
}

function BooleanControl({ config, value, onChange }: BooleanControlProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <label className="text-sm font-medium text-slate-700">{config.label}</label>
                {config.description && (
                    <p className="text-xs text-slate-400">{config.description}</p>
                )}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-slate-900' : 'bg-slate-200'
                }`}
            >
                <span 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                        value ? 'left-7' : 'left-1'
                    }`}
                />
            </button>
        </div>
    );
}

interface SelectControlProps {
    config: Extract<ControlConfig, { type: 'select' }>;
    value: string;
    onChange: (value: string) => void;
}

function SelectControl({ config, value, onChange }: SelectControlProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{config.label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
                {config.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {config.description && (
                <p className="text-xs text-slate-400">{config.description}</p>
            )}
        </div>
    );
}

// --- DYNAMIC CONTROL RENDERER ---

interface ControlRendererProps {
    propKey: string;
    config: ControlConfig;
    value: unknown;
    onChange: (key: string, value: string | number | boolean) => void;
}

function ControlRenderer({ propKey, config, value, onChange }: ControlRendererProps) {
    const handleChange = useCallback((newValue: string | number | boolean) => {
        onChange(propKey, newValue);
    }, [propKey, onChange]);

    switch (config.type) {
        case 'range':
            return <RangeControl config={config} value={value as number} onChange={handleChange} />;
        case 'color':
            return <ColorControl config={config} value={value as string} onChange={handleChange} />;
        case 'text':
            return <TextControl config={config} value={value as string} onChange={handleChange} />;
        case 'boolean':
            return <BooleanControl config={config} value={value as boolean} onChange={handleChange} />;
        case 'select':
            return <SelectControl config={config} value={value as string} onChange={handleChange} />;
        default:
            return null;
    }
}

// --- MAIN LIVE EDITOR ---

interface LiveEditorProps {
    schema: AnimationSchema;
    renderPreview: (props: ControlValues) => React.ReactNode;
    onClose: () => void;
}

export function LiveEditor({ schema, renderPreview, onClose }: LiveEditorProps) {
    const [values, setValues] = useState<ControlValues>(() => getDefaultValues(schema));
    const [copied, setCopied] = useState(false);

    const handleChange = useCallback((key: string, value: string | number | boolean) => {
        setValues(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleReset = useCallback(() => {
        setValues(getDefaultValues(schema));
    }, [schema]);

    const generatedCode = useMemo(() => 
        generateSourceCode(schema, values, { includeDefaults: false }),
        [schema, values]
    );

    const handleCopyCode = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(generatedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [generatedCode]);

    const handleCopyAndOpenGemini = useCallback(async () => {
        try {
            const fullPrompt = `Crie um componente React baseado neste código:\n\n\`\`\`jsx\n${generatedCode}\n\`\`\`\n\nAdicione estilos modernos e animações suaves.`;
            await navigator.clipboard.writeText(fullPrompt);
            window.open('https://gemini.google.com/app', '_blank');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [generatedCode]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex">
            {/* Left Panel - Controls */}
            <div className="w-96 bg-white h-full overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                                <Sliders className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-slate-900">Live Studio</h2>
                                <p className="text-xs text-slate-500">{schema.displayName}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    <p className="text-sm text-slate-500">{schema.description}</p>
                </div>

                {/* Controls */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {Object.entries(schema.controls).map(([key, config]) => (
                        <ControlRenderer
                            key={key}
                            propKey={key}
                            config={config}
                            value={values[key]}
                            onChange={handleChange}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-slate-100 space-y-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleReset}
                        className="w-full gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Resetar para Padrão
                    </Button>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 flex flex-col">
                {/* Preview Canvas */}
                <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
                    <div className="w-full max-w-2xl aspect-square bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
                        {renderPreview(values)}
                    </div>
                </div>

                {/* Code Output */}
                <div className="h-48 bg-slate-900 p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-300">Código Gerado</span>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={handleCopyCode}
                                className="text-slate-300 hover:text-white hover:bg-slate-800 gap-2"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copiado!' : 'Copiar'}
                            </Button>
                            <Button 
                                size="sm" 
                                onClick={handleCopyAndOpenGemini}
                                className="bg-blue-600 hover:bg-blue-500 gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Gerar com Gemini
                            </Button>
                        </div>
                    </div>
                    <pre className="text-sm font-mono text-emerald-400 overflow-x-auto">
                        <code>{generatedCode}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default LiveEditor;
