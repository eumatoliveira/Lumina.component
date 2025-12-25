import { useState } from 'react';
import { Check, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AnimationRecord } from '../lib/ai/types';
import { generateIDEPrompt } from '../lib/ai/promptGenerator';

interface AnimationDetailProps {
    data: AnimationRecord;
}

export function AnimationDetail({ data }: AnimationDetailProps) {
    const [copied, setCopied] = useState(false);
    
    // Generate the prompt using our new V2 utility
    const prompt = generateIDEPrompt(data);

    // Safe access to properties
    const properties = data?.extracted_pattern?.properties || {};

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="w-full bg-white border border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">
                    Extracted Pattern
                </CardTitle>
                <div className="flex gap-2">
                   <div className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-600 font-mono">
                       {data?.animation_type || 'Unknown'}
                   </div>
                   <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-mono">
                       Score: {data?.complexity_score || 0}
                   </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Visual Summary of the Pattern */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="block text-xs text-slate-400 font-semibold mb-1">TRIGGER</span>
                            <span className="font-medium text-slate-900">{data?.extracted_pattern?.trigger || 'N/A'}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="block text-xs text-slate-400 font-semibold mb-1">PROPERTIES</span>
                            <div className="flex flex-col gap-1">
                                {Object.keys(properties).length > 0 ? (
                                    Object.keys(properties).map(prop => (
                                        <span key={prop} className="font-medium text-slate-900">
                                            {prop} 
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-400 italic">No properties detected</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* The Hero Button - Prompt First Strategy */}
                    <div className="pt-4 border-t border-slate-100">
                        <Button 
                            onClick={handleCopy} 
                            variant="outline"
                            className="w-full h-12 gap-2 text-slate-800 border-slate-300 hover:bg-slate-50 hover:text-slate-900 relative overflow-hidden group transition-all"
                        >
                            <div className="absolute inset-0 w-1 bg-slate-900 group-hover:w-full opacity-5 transition-all duration-500" />
                            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Terminal className="w-4 h-4" />}
                            <span className="font-semibold">
                                {copied ? 'Prompt Copied to Clipboard!' : 'Copy Architect Prompt to IDE'}
                            </span>
                        </Button>
                        <p className="text-center text-xs text-slate-400 mt-2">
                            Paste this directly into Cursor or VS Code Copilot to recreate the component.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

