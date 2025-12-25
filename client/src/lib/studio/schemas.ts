// ============================================
// LUMINA LIVE STUDIO - ANIMATION SCHEMAS
// Configuration schemas for each animation
// ============================================

import { AnimationSchema } from './types';

export const ANIMATION_SCHEMAS: Record<string, AnimationSchema> = {
    'Circular Text': {
        componentName: 'CircularTextSVG',
        displayName: 'Texto Circular',
        description: 'Texto que rotaciona em um caminho circular SVG',
        category: 'classic',
        controls: {
            text: {
                type: 'text',
                label: 'Conteúdo',
                description: 'O texto que será exibido',
                defaultValue: 'LUMINA • DESIGN • 2025 • SYSTEM •',
                placeholder: 'Digite seu texto...',
                maxLength: 100
            },
            spinDuration: {
                type: 'range',
                label: 'Velocidade de Rotação',
                description: 'Duração de uma rotação completa em segundos',
                min: 1,
                max: 30,
                step: 1,
                defaultValue: 10,
                unit: 's'
            },
            fontSize: {
                type: 'range',
                label: 'Tamanho da Fonte',
                description: 'Tamanho do texto em pixels',
                min: 8,
                max: 32,
                step: 1,
                defaultValue: 14,
                unit: 'px'
            },
            radius: {
                type: 'range',
                label: 'Raio do Círculo',
                description: 'Raio do caminho circular',
                min: 50,
                max: 200,
                step: 5,
                defaultValue: 85,
                unit: 'px'
            }
        }
    },

    'Split Reveal': {
        componentName: 'SplitTextReveal',
        displayName: 'Revelação de Texto',
        description: 'Texto que aparece caractere por caractere com efeito stagger',
        category: 'kinetic',
        controls: {
            text: {
                type: 'text',
                label: 'Texto Principal',
                description: 'O texto a ser revelado',
                defaultValue: 'Motion Intelligence',
                placeholder: 'Digite seu texto...',
                maxLength: 50
            },
            staggerDelay: {
                type: 'range',
                label: 'Delay do Stagger',
                description: 'Tempo entre cada caractere',
                min: 0.01,
                max: 0.2,
                step: 0.01,
                defaultValue: 0.05,
                unit: 's'
            },
            animationDuration: {
                type: 'range',
                label: 'Duração da Animação',
                description: 'Tempo total da animação de entrada',
                min: 0.2,
                max: 1.5,
                step: 0.1,
                defaultValue: 0.5,
                unit: 's'
            }
        }
    },

    '3D Tilt': {
        componentName: 'TiltedCard',
        displayName: 'Cartão 3D Tilt',
        description: 'Cartão com efeito de perspectiva 3D que segue o mouse',
        category: 'micro',
        controls: {
            rotationFactor: {
                type: 'range',
                label: 'Intensidade da Rotação',
                description: 'Quanto o cartão rotaciona com o mouse',
                min: 5,
                max: 30,
                step: 1,
                defaultValue: 15,
                unit: '°'
            },
            scaleFactor: {
                type: 'range',
                label: 'Fator de Escala',
                description: 'Aumento ao passar o mouse',
                min: 1,
                max: 1.2,
                step: 0.01,
                defaultValue: 1.05
            },
            glareEnabled: {
                type: 'boolean',
                label: 'Efeito de Brilho',
                description: 'Ativar efeito de luz seguindo o mouse',
                defaultValue: true
            },
            springStiffness: {
                type: 'range',
                label: 'Rigidez da Mola',
                description: 'Quão rápido a animação reage',
                min: 50,
                max: 500,
                step: 10,
                defaultValue: 150
            }
        }
    },

    'Liquid Chrome': {
        componentName: 'LiquidChrome',
        displayName: 'Chrome Líquido',
        description: 'Efeito de shader WebGL com distorção líquida',
        category: 'experimental',
        controls: {
            baseColorR: {
                type: 'range',
                label: 'Cor Base (R)',
                description: 'Componente vermelho da cor base',
                min: 0,
                max: 1,
                step: 0.1,
                defaultValue: 0.1
            },
            baseColorG: {
                type: 'range',
                label: 'Cor Base (G)',
                description: 'Componente verde da cor base',
                min: 0,
                max: 1,
                step: 0.1,
                defaultValue: 0.4
            },
            baseColorB: {
                type: 'range',
                label: 'Cor Base (B)',
                description: 'Componente azul da cor base',
                min: 0,
                max: 1,
                step: 0.1,
                defaultValue: 0.8
            },
            speed: {
                type: 'range',
                label: 'Velocidade',
                description: 'Velocidade da animação',
                min: 0.1,
                max: 2,
                step: 0.1,
                defaultValue: 0.5
            },
            amplitude: {
                type: 'range',
                label: 'Amplitude',
                description: 'Intensidade da distorção',
                min: 0.1,
                max: 1,
                step: 0.1,
                defaultValue: 0.4
            },
            interactive: {
                type: 'boolean',
                label: 'Interativo',
                description: 'Responde ao movimento do mouse',
                defaultValue: true
            }
        }
    },

    'Fade Up': {
        componentName: 'FadeUp',
        displayName: 'Fade + Translate',
        description: 'Animação CSS GPU-safe com fade e movimento',
        category: 'css-base',
        controls: {
            delay: {
                type: 'range',
                label: 'Delay Inicial',
                description: 'Tempo antes da animação começar',
                min: 0,
                max: 2000,
                step: 100,
                defaultValue: 0,
                unit: 'ms'
            },
            duration: {
                type: 'range',
                label: 'Duração',
                description: 'Tempo da animação',
                min: 200,
                max: 1500,
                step: 100,
                defaultValue: 600,
                unit: 'ms'
            },
            distance: {
                type: 'range',
                label: 'Distância',
                description: 'Distância do movimento vertical',
                min: 10,
                max: 100,
                step: 5,
                defaultValue: 20,
                unit: 'px'
            }
        }
    },

    'Pulse Loader': {
        componentName: 'PulseLoader',
        displayName: 'Loader Pulsante',
        description: 'Loading spinner com keyframes CSS',
        category: 'css-base',
        controls: {
            speed: {
                type: 'range',
                label: 'Velocidade',
                description: 'Duração de um ciclo',
                min: 0.5,
                max: 3,
                step: 0.1,
                defaultValue: 1.5,
                unit: 's'
            }
        }
    },

    'Stagger List': {
        componentName: 'StaggerList',
        displayName: 'Lista Escalonada',
        description: 'Lista com entrada staggered usando Framer Motion',
        category: 'framer',
        controls: {
            staggerDelay: {
                type: 'range',
                label: 'Delay do Stagger',
                description: 'Tempo entre cada item',
                min: 0.05,
                max: 0.5,
                step: 0.05,
                defaultValue: 0.1,
                unit: 's'
            }
        }
    },

    'Morph Button': {
        componentName: 'MorphButton',
        displayName: 'Botão Morphing',
        description: 'Botão com transição de estados animada',
        category: 'micro',
        controls: {
            duration: {
                type: 'range',
                label: 'Duração do Sucesso',
                description: 'Tempo que o estado de sucesso fica visível',
                min: 500,
                max: 5000,
                step: 500,
                defaultValue: 2000,
                unit: 'ms'
            }
        }
    }
};

// Get schema by animation title
export function getSchemaForAnimation(title: string): AnimationSchema | undefined {
    return ANIMATION_SCHEMAS[title];
}

// Get all available schemas
export function getAllSchemas(): AnimationSchema[] {
    return Object.values(ANIMATION_SCHEMAS);
}
