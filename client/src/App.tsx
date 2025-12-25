import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircularTextSVG } from './components/CircularText';
import SplitTextReveal from './components/SplitTextReveal';
import TiltedCard from './components/TiltedCard';
import { LiquidChrome } from './components/LiquidChrome';
import { FadeUpDemo } from './components/FadeUp';
import { PulseLoaderDemo } from './components/PulseLoader';
import { StaggerListDemo } from './components/StaggerList';
import { MorphButtonDemo } from './components/MorphButton';
import { DragBoxDemo } from './components/DragBox';
import { ParallaxScrollDemo } from './components/ParallaxScroll';
import { Rotate3DDemo } from './components/Rotate3D';
import { SlideShowDemo } from './components/SlideShow';
import { TabSystemDemo } from './components/TabSystem';
import { AccordionMotionDemo } from './components/AccordionMotion';
import { InfiniteRotationDemo } from './components/InfiniteRotation';
import { NumberCounterDemo } from './components/NumberCounter';
import { TypewriterDemo } from './components/Typewriter';
import { MagneticButtonDemo } from './components/MagneticButton';
import { FocusRingDemo } from './components/FocusRing';
import { BounceLoaderDemo } from './components/BounceLoader';
import { ScrollProgressDemo } from './components/ScrollProgress';
import { HoverCardDemo } from './components/HoverCard';
import { TapFeedbackDemo } from './components/TapFeedback';
import { FlipCardDemo } from './components/FlipCard';
import { ShakeAnimationDemo } from './components/ShakeAnimation';
import { BlurInDemo } from './components/BlurIn';
import { ScaleUpDemo } from './components/ScaleUp';
import { SlideInDemo } from './components/SlideIn';
import { GlowPulseDemo } from './components/GlowPulse';
import { PathDrawingDemo } from './components/PathDrawing';
import { ColorMorphDemo } from './components/ColorMorph';
import { SkeletonLoaderDemo } from './components/SkeletonLoader';
import { WobbleDemo } from './components/Wobble';
import { WaveTextDemo } from './components/WaveText';
// New patterns from Motion documentation
import { LayoutTransitionDemo } from './components/LayoutTransition';
import { SharedElementModalDemo } from './components/SharedElementModal';
import { ReorderableListDemo } from './components/ReorderableList';
import { ScrollTransformDemo } from './components/ScrollTransform';
import { DynamicVariantsDemo } from './components/DynamicVariants';
import { ScrollDirectionDemo } from './components/ScrollDirection';
import { StickyHeaderDemo } from './components/StickyHeader';
import { ViewportTriggerDemo } from './components/ViewportTrigger';
import { FollowCursorDemo } from './components/FollowCursor';
import { CSSVariableAnimDemo } from './components/CSSVariableAnim';
import { KeyframeSequenceDemo } from './components/KeyframeSequence';
import { FilterBlurDemo } from './components/FilterBlur';
import { MorphPathDemo } from './components/MorphPath';
import { ViewBoxZoomDemo } from './components/ViewBoxZoom';
import { GestureComboDemo } from './components/GestureCombo';
import { LayoutGroupDemo } from './components/LayoutGroupDemo';
import { TechStackDemo } from './components/TechStack';
import { Antigravity } from './components/Antigravity';
import { CardNav, CardNavItem } from './components/CardNav';
import { FullscreenPreview } from './components/FullscreenPreview';
import { LiveEditor } from './components/LiveEditor';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { Sparkles, Code2, Check, X, Layers, Linkedin, Youtube, ExternalLink, Brain, Database, Cpu, Sliders, Maximize2 } from 'lucide-react';
import { AnimationRecord } from './lib/ai/types';
import { generateIDEPrompt } from './lib/ai/promptGenerator';
import { ANIMATION_SCHEMAS } from './lib/studio/schemas';
import { ControlValues } from './lib/studio/types';

// Extended AnimationRecord with category
interface ExtendedAnimationRecord extends AnimationRecord {
    category: string;
}

// --- HARDCODED GALLERY DATA ---
const GALLERY_DATA: Record<string, ExtendedAnimationRecord> = {
    'Circular Text': {
        id: 'circular-text',
        source_url: 'Internal Gallery',
        element_selector: '.circular-text-svg',
        animation_type: 'SVG Path Animation',
        tech_detected: ['Framer Motion', 'SVG'],
        complexity_score: 45,
        category: 'classic',
        extracted_pattern: {
            trigger: 'rotation-loop',
            properties: { rotation: { from: 0, to: 360 } },
            duration: '10s',
            easing: 'linear (infinite)',
            description: 'Text rotating endlessly around a circular path.'
        }
    },
    'Split Reveal': {
        id: 'split-reveal',
        source_url: 'Internal Gallery',
        element_selector: '.split-text-char',
        animation_type: 'Staggered Text Entry',
        tech_detected: ['Framer Motion', 'React'],
        complexity_score: 60,
        category: 'kinetic',
        extracted_pattern: {
            trigger: 'whileInView',
            properties: { 
                y: { from: '100%', to: '0%' },
                opacity: { from: 0, to: 1 }
            },
            duration: '0.5s (stagger 0.05s)',
            easing: 'ease-out',
            description: 'Characters slide up from masked container.'
        }
    },
    '3D Tilt': {
        id: '3d-tilt',
        source_url: 'Internal Gallery',
        element_selector: '.tilt-card',
        animation_type: 'Mouse Interaction',
        tech_detected: ['Framer Motion', 'useMotionValue'],
        complexity_score: 80,
        category: 'micro',
        extracted_pattern: {
            trigger: 'mousemove',
            properties: { 
                rotateX: { from: 0, to: 'calculated based on mouse' },
                rotateY: { from: 0, to: 'calculated based on mouse' }
            },
            duration: 'spring',
            easing: 'spring-physics',
            description: 'Card rotates in 3D space tracking cursor position.'
        }
    },
    'Liquid Chrome': {
        id: 'liquid-chrome',
        source_url: 'React Bits Library',
        element_selector: 'canvas (WebGL)',
        animation_type: 'Shader Distortion',
        tech_detected: ['OGL', 'WebGL', 'React'],
        complexity_score: 95,
        category: 'experimental',
        extracted_pattern: {
            trigger: 'time-loop + mouse interaction',
            properties: { 
                uTime: { from: 0, to: 'infinite' },
                uMouse: { from: '[0,0]', to: '[x,y]' }
            },
            duration: 'infinite',
            easing: 'sinusoidal (shader)',
            description: 'Liquid metal shader effect with mouse ripple interaction.'
        }
    },
    'Fade Up': {
        id: 'fade-up',
        source_url: 'Animation Stack',
        element_selector: '.fade-up',
        animation_type: 'CSS Transition',
        tech_detected: ['CSS', 'React'],
        complexity_score: 20,
        category: 'css-base',
        extracted_pattern: {
            trigger: 'mount / state change',
            properties: { 
                opacity: { from: 0, to: 1 },
                translateY: { from: '20px', to: '0' }
            },
            duration: '0.6s',
            easing: 'ease-out',
            description: 'GPU-accelerated fade with translate. Click to replay.'
        }
    },
    'Pulse Loader': {
        id: 'pulse-loader',
        source_url: 'Animation Stack',
        element_selector: '.pulse-dot',
        animation_type: 'CSS Keyframes',
        tech_detected: ['CSS Keyframes', 'React'],
        complexity_score: 25,
        category: 'css-base',
        extracted_pattern: {
            trigger: 'infinite loop',
            properties: { 
                scale: { from: 0.8, to: 1.2 },
                opacity: { from: 0.5, to: 1 }
            },
            duration: '1.5s',
            easing: 'ease-in-out',
            description: 'Loading animation with staggered dots and ring pulse.'
        }
    },
    'Stagger List': {
        id: 'stagger-list',
        source_url: 'Animation Stack',
        element_selector: 'motion.li',
        animation_type: 'Framer Motion Stagger',
        tech_detected: ['Framer Motion', 'React'],
        complexity_score: 50,
        category: 'framer',
        extracted_pattern: {
            trigger: 'mount',
            properties: { 
                y: { from: 30, to: 0 },
                opacity: { from: 0, to: 1 }
            },
            duration: 'spring',
            easing: 'spring (stiffness: 100, damping: 12)',
            description: 'List items enter with staggered spring animation.'
        }
    },
    'Morph Button': {
        id: 'morph-button',
        source_url: 'Animation Stack',
        element_selector: 'motion.button',
        animation_type: 'Micro-interaction',
        tech_detected: ['Framer Motion', 'React'],
        complexity_score: 65,
        category: 'micro',
        extracted_pattern: {
            trigger: 'click / state change',
            properties: { 
                width: { from: 140, to: 56 },
                content: { from: 'text', to: 'icon' }
            },
            duration: 'spring',
            easing: 'spring (stiffness: 300, damping: 25)',
            description: 'Button morphs between idle, loading, and success states.'
        }
    },
    'Drag Box': {
        id: 'drag-box',
        source_url: 'Motion Gestures',
        element_selector: 'motion.div[drag]',
        animation_type: 'Drag Gesture',
        tech_detected: ['Framer Motion', 'React'],
        complexity_score: 55,
        category: 'gesture',
        extracted_pattern: {
            trigger: 'drag interaction',
            properties: { 
                x: 'drag-x',
                y: 'drag-y',
                scale: { from: 1, to: 1.1 }
            },
            duration: 'spring',
            easing: 'spring (bounceStiffness: 300)',
            description: 'Interactive drag with constraints and spring physics.'
        }
    },
    'Parallax Scroll': {
        id: 'parallax-scroll',
        source_url: 'Motion Scroll',
        element_selector: 'useScroll',
        animation_type: 'Scroll-Linked',
        tech_detected: ['Framer Motion', 'useScroll', 'useTransform'],
        complexity_score: 50,
        category: 'scroll',
        extracted_pattern: {
            trigger: 'scroll position',
            properties: { 
                y: 'parallax-offset',
                opacity: { from: 0.3, to: 1 }
            },
            duration: 'linked',
            easing: 'scroll-linked',
            description: 'Multi-layer parallax effect on scroll.'
        }
    },
    'Rotate 3D': {
        id: 'rotate-3d',
        source_url: 'Motion Transforms',
        element_selector: 'motion.div',
        animation_type: '3D Perspective',
        tech_detected: ['Framer Motion', 'useMotionValue', 'useSpring'],
        complexity_score: 70,
        category: '3d',
        extracted_pattern: {
            trigger: 'mouse position',
            properties: { 
                rotateX: { from: -15, to: 15 },
                rotateY: { from: -15, to: 15 }
            },
            duration: 'spring',
            easing: 'spring (stiffness: 300, damping: 30)',
            description: '3D perspective rotation following mouse.'
        }
    },
    'Slide Show': {
        id: 'slide-show',
        source_url: 'AnimatePresence Docs',
        element_selector: 'AnimatePresence',
        animation_type: 'Exit Animation',
        tech_detected: ['Framer Motion', 'AnimatePresence'],
        complexity_score: 60,
        category: 'presence',
        extracted_pattern: {
            trigger: 'key change',
            properties: { 
                x: { from: 200, to: 0 },
                opacity: { from: 0, to: 1 },
                scale: { from: 0.8, to: 1 }
            },
            duration: 'spring',
            easing: 'spring (stiffness: 300)',
            description: 'Direction-aware slide transitions.'
        }
    },
    'Tab System': {
        id: 'tab-system',
        source_url: 'Layout Animation',
        element_selector: 'motion.div[layoutId]',
        animation_type: 'Layout Animation',
        tech_detected: ['Framer Motion', 'layoutId'],
        complexity_score: 55,
        category: 'layout',
        extracted_pattern: {
            trigger: 'state change',
            properties: { 
                layout: 'shared',
                position: 'automatic'
            },
            duration: 'spring',
            easing: 'spring (stiffness: 400)',
            description: 'Animated tab indicator with layoutId.'
        }
    },
    'Accordion': {
        id: 'accordion',
        source_url: 'AnimatePresence Docs',
        element_selector: 'motion.div',
        animation_type: 'Height Animation',
        tech_detected: ['Framer Motion', 'AnimatePresence'],
        complexity_score: 45,
        category: 'presence',
        extracted_pattern: {
            trigger: 'toggle',
            properties: { 
                height: { from: 0, to: 'auto' },
                opacity: { from: 0, to: 1 }
            },
            duration: '0.3s',
            easing: 'easeInOut',
            description: 'Smooth height:auto accordion animation.'
        }
    },
    'Infinite Rotation': {
        id: 'infinite-rotation',
        source_url: 'Framer Motion Docs',
        element_selector: 'motion.div',
        animation_type: 'Infinite Animation',
        tech_detected: ['Framer Motion', 'repeat: Infinity'],
        complexity_score: 25,
        category: 'loaders',
        extracted_pattern: {
            trigger: 'mount',
            properties: { rotate: { from: 0, to: 360 } },
            duration: '2s',
            easing: 'linear',
            description: 'Continuous rotation animation that loops forever.'
        }
    },
    'Number Counter': {
        id: 'number-counter',
        source_url: 'Motion+ AnimateNumber',
        element_selector: 'motion.span',
        animation_type: 'Number Animation',
        tech_detected: ['Framer Motion', 'useSpring'],
        complexity_score: 40,
        category: 'data-viz',
        extracted_pattern: {
            trigger: 'value-change',
            properties: { number: { from: 0, to: 1234 } },
            duration: '2s',
            easing: 'spring',
            description: 'Animated number counter with spring physics.'
        }
    },
    'Typewriter': {
        id: 'typewriter',
        source_url: 'Motion+ Typewriter',
        element_selector: 'span',
        animation_type: 'Text Animation',
        tech_detected: ['React', 'useState', 'useEffect'],
        complexity_score: 45,
        category: 'text',
        extracted_pattern: {
            trigger: 'mount',
            properties: { characters: 'typed' },
            duration: 'variable',
            easing: 'human-variance',
            description: 'Realistic typewriter effect with blinking cursor.'
        }
    },
    'Magnetic Button': {
        id: 'magnetic-button',
        source_url: 'Motion+ Cursor',
        element_selector: 'motion.button',
        animation_type: 'Magnetic Effect',
        tech_detected: ['Framer Motion', 'useSpring'],
        complexity_score: 55,
        category: 'interactions',
        extracted_pattern: {
            trigger: 'mouse-move',
            properties: { x: { from: 0, to: 'cursor' }, y: { from: 0, to: 'cursor' } },
            duration: 'spring',
            easing: 'spring',
            description: 'Button that follows cursor with magnetic snap.'
        }
    },
    'Focus Ring': {
        id: 'focus-ring',
        source_url: 'Accessibility Patterns',
        element_selector: 'motion.div',
        animation_type: 'Focus Animation',
        tech_detected: ['Framer Motion', 'whileFocus'],
        complexity_score: 30,
        category: 'accessibility',
        extracted_pattern: {
            trigger: 'focus',
            properties: { scale: { from: 0.8, to: 1 }, opacity: { from: 0, to: 1 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Animated focus indicator for accessibility.'
        }
    },
    'Bounce Loader': {
        id: 'bounce-loader',
        source_url: 'Framer Motion Docs',
        element_selector: 'motion.div',
        animation_type: 'Loader Animation',
        tech_detected: ['Framer Motion', 'repeatType: reverse'],
        complexity_score: 30,
        category: 'loaders',
        extracted_pattern: {
            trigger: 'mount',
            properties: { y: { from: -10, to: 10 } },
            duration: '0.5s',
            easing: 'easeInOut',
            description: 'Bouncing dots loader with staggered animation.'
        }
    },
    'Scroll Progress': {
        id: 'scroll-progress',
        source_url: 'useScroll Docs',
        element_selector: 'motion.div',
        animation_type: 'Scroll Animation',
        tech_detected: ['Framer Motion', 'useScroll', 'useSpring'],
        complexity_score: 45,
        category: 'scroll',
        extracted_pattern: {
            trigger: 'scroll',
            properties: { scaleX: { from: 0, to: 1 } },
            duration: 'scroll-linked',
            easing: 'spring',
            description: 'Scroll progress bar with spring physics.'
        }
    },
    'Hover Card': {
        id: 'hover-card',
        source_url: 'Framer Motion Docs',
        element_selector: 'motion.div',
        animation_type: 'Hover Animation',
        tech_detected: ['Framer Motion', 'whileHover'],
        complexity_score: 25,
        category: 'gestures',
        extracted_pattern: {
            trigger: 'hover',
            properties: { scale: { from: 1, to: 1.05 }, y: { from: 0, to: -5 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Card lift effect on hover with shadow.'
        }
    },
    'Tap Feedback': {
        id: 'tap-feedback',
        source_url: 'Framer Motion Docs',
        element_selector: 'motion.button',
        animation_type: 'Tap Animation',
        tech_detected: ['Framer Motion', 'whileTap'],
        complexity_score: 20,
        category: 'gestures',
        extracted_pattern: {
            trigger: 'tap',
            properties: { scale: { from: 1, to: 0.9 }, rotate: { from: 0, to: 3 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Button press feedback with scale and rotate.'
        }
    },
    'Flip Card': {
        id: 'flip-card',
        source_url: '3D Transforms',
        element_selector: 'motion.div',
        animation_type: '3D Animation',
        tech_detected: ['Framer Motion', 'rotateY', 'perspective'],
        complexity_score: 55,
        category: '3d',
        extracted_pattern: {
            trigger: 'click',
            properties: { rotateY: { from: 0, to: 180 } },
            duration: 'spring',
            easing: 'spring',
            description: '3D card flip with front and back faces.'
        }
    },
    'Shake Animation': {
        id: 'shake-animation',
        source_url: 'Keyframe Animation',
        element_selector: 'motion.button',
        animation_type: 'Error Animation',
        tech_detected: ['Framer Motion', 'keyframes'],
        complexity_score: 30,
        category: 'feedback',
        extracted_pattern: {
            trigger: 'error',
            properties: { x: { keyframes: [-10, 10, -10, 10, 0] } },
            duration: '0.4s',
            easing: 'linear',
            description: 'Error shake effect for form validation.'
        }
    },
    'Blur In': {
        id: 'blur-in',
        source_url: 'Filter Animation',
        element_selector: 'motion.div',
        animation_type: 'Filter Animation',
        tech_detected: ['Framer Motion', 'filter'],
        complexity_score: 25,
        category: 'entrances',
        extracted_pattern: {
            trigger: 'mount',
            properties: { filter: { from: 'blur(10px)', to: 'blur(0px)' }, opacity: { from: 0, to: 1 } },
            duration: '0.8s',
            easing: 'ease-out',
            description: 'Blur to focus entrance animation.'
        }
    },
    'Scale Up': {
        id: 'scale-up',
        source_url: 'Framer Motion Docs',
        element_selector: 'motion.div',
        animation_type: 'Scale Animation',
        tech_detected: ['Framer Motion', 'scale'],
        complexity_score: 20,
        category: 'entrances',
        extracted_pattern: {
            trigger: 'mount',
            properties: { scale: { from: 0, to: 1 }, opacity: { from: 0, to: 1 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Pop-in scale animation on mount.'
        }
    },
    'Slide In': {
        id: 'slide-in',
        source_url: 'Framer Motion Docs',
        element_selector: 'motion.div',
        animation_type: 'Slide Animation',
        tech_detected: ['Framer Motion', 'AnimatePresence'],
        complexity_score: 35,
        category: 'entrances',
        extracted_pattern: {
            trigger: 'mount',
            properties: { x: { from: -100, to: 0 }, opacity: { from: 0, to: 1 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Directional slide entrance from any direction.'
        }
    },
    'Glow Pulse': {
        id: 'glow-pulse',
        source_url: 'Box-shadow Animation',
        element_selector: 'motion.div',
        animation_type: 'Glow Animation',
        tech_detected: ['Framer Motion', 'boxShadow'],
        complexity_score: 30,
        category: 'effects',
        extracted_pattern: {
            trigger: 'mount',
            properties: { boxShadow: { keyframes: ['20px glow', '40px glow', '20px glow'] } },
            duration: '2s',
            easing: 'easeInOut',
            description: 'Pulsing glow effect for attention.'
        }
    },
    'Path Drawing': {
        id: 'path-drawing',
        source_url: 'SVG Animation',
        element_selector: 'motion.path',
        animation_type: 'SVG Animation',
        tech_detected: ['Framer Motion', 'pathLength'],
        complexity_score: 45,
        category: 'svg',
        extracted_pattern: {
            trigger: 'mount',
            properties: { pathLength: { from: 0, to: 1 } },
            duration: '2s',
            easing: 'easeInOut',
            description: 'SVG path drawing animation.'
        }
    },
    'Color Morph': {
        id: 'color-morph',
        source_url: 'Gradient Animation',
        element_selector: 'motion.div',
        animation_type: 'Color Animation',
        tech_detected: ['Framer Motion', 'background'],
        complexity_score: 35,
        category: 'effects',
        extracted_pattern: {
            trigger: 'mount',
            properties: { background: { keyframes: ['gradient1', 'gradient2', 'gradient3'] } },
            duration: '6s',
            easing: 'linear',
            description: 'Morphing gradient background animation.'
        }
    },
    'Skeleton Loader': {
        id: 'skeleton-loader',
        source_url: 'Loading States',
        element_selector: 'motion.div',
        animation_type: 'Loader Animation',
        tech_detected: ['Framer Motion', 'opacity'],
        complexity_score: 30,
        category: 'loaders',
        extracted_pattern: {
            trigger: 'mount',
            properties: { opacity: { keyframes: [0.5, 1, 0.5] } },
            duration: '1.5s',
            easing: 'easeInOut',
            description: 'Shimmer skeleton loading placeholder.'
        }
    },
    'Wobble': {
        id: 'wobble',
        source_url: 'Spring Physics',
        element_selector: 'motion.div',
        animation_type: 'Jelly Animation',
        tech_detected: ['Framer Motion', 'useAnimation'],
        complexity_score: 40,
        category: 'feedback',
        extracted_pattern: {
            trigger: 'click',
            properties: { scale: { keyframes: [1, 1.1, 0.9, 1.05, 0.95, 1] }, rotate: { keyframes: [0, -5, 5, -3, 3, 0] } },
            duration: '0.6s',
            easing: 'spring',
            description: 'Jelly wobble effect on click.'
        }
    },
    'Wave Text': {
        id: 'wave-text',
        source_url: 'Stagger Animation',
        element_selector: 'motion.span',
        animation_type: 'Text Animation',
        tech_detected: ['Framer Motion', 'stagger', 'variants'],
        complexity_score: 45,
        category: 'text',
        extracted_pattern: {
            trigger: 'mount',
            properties: { y: { from: -5, to: 0 } },
            duration: '0.3s',
            easing: 'spring',
            description: 'Staggered wave animation for text characters.'
        }
    },
    // === NEW PATTERNS FROM MOTION DOCUMENTATION ===
    'Layout Transition': {
        id: 'layout-transition',
        source_url: 'Motion Layout Animation',
        element_selector: 'motion.div[layout]',
        animation_type: 'Layout Animation',
        tech_detected: ['Framer Motion', 'layout prop'],
        complexity_score: 60,
        category: 'layout',
        extracted_pattern: {
            trigger: 'layout-change',
            properties: { width: { from: 80, to: 200 }, height: { from: 80, to: 120 } },
            duration: 'spring',
            easing: 'spring (stiffness: 300)',
            description: 'Automatic layout animation using CSS transforms for performance.'
        }
    },
    'Shared Element Modal': {
        id: 'shared-element-modal',
        source_url: 'Motion Layout Animation',
        element_selector: 'motion.div[layoutId]',
        animation_type: 'Shared Element Transition',
        tech_detected: ['Framer Motion', 'layoutId', 'AnimatePresence'],
        complexity_score: 75,
        category: 'layout',
        extracted_pattern: {
            trigger: 'layoutId-match',
            properties: { scale: { from: 1, to: 1 }, opacity: { from: 1, to: 1 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Seamless transition between elements with matching layoutId.'
        }
    },
    'Reorderable List': {
        id: 'reorderable-list',
        source_url: 'Motion Reorder',
        element_selector: 'Reorder.Group',
        animation_type: 'Drag Reorder',
        tech_detected: ['Framer Motion', 'Reorder.Group', 'Reorder.Item'],
        complexity_score: 65,
        category: 'interactive',
        extracted_pattern: {
            trigger: 'drag',
            properties: { y: { from: 0, to: 0 }, scale: { from: 1, to: 1.05 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Drag-to-reorder list with automatic layout animations.'
        }
    },
    'Scroll Transform': {
        id: 'scroll-transform',
        source_url: 'Motion useScroll',
        element_selector: 'motion.div',
        animation_type: 'Scroll-Linked',
        tech_detected: ['Framer Motion', 'useScroll', 'useTransform', 'useSpring'],
        complexity_score: 70,
        category: 'scroll',
        extracted_pattern: {
            trigger: 'scroll',
            properties: { scale: { from: 0.8, to: 1.2 }, rotate: { from: 0, to: 360 } },
            duration: 'scroll-linked',
            easing: 'spring',
            description: 'Element transforms linked to scroll progress with spring smoothing.'
        }
    },
    'Dynamic Variants': {
        id: 'dynamic-variants',
        source_url: 'Motion Variants',
        element_selector: 'motion.div[custom]',
        animation_type: 'Stagger Animation',
        tech_detected: ['Framer Motion', 'variants', 'custom prop'],
        complexity_score: 55,
        category: 'entrance',
        extracted_pattern: {
            trigger: 'mount',
            properties: { opacity: { from: 0, to: 1 }, x: { from: -50, to: 0 } },
            duration: '0.5s',
            easing: 'spring',
            description: 'Function-based variants with dynamic delay per index.'
        }
    },
    'Scroll Direction': {
        id: 'scroll-direction',
        source_url: 'Motion useMotionValueEvent',
        element_selector: 'motion.div',
        animation_type: 'Scroll Detection',
        tech_detected: ['Framer Motion', 'useScroll', 'useMotionValueEvent'],
        complexity_score: 45,
        category: 'scroll',
        extracted_pattern: {
            trigger: 'scroll',
            properties: { direction: { from: 'idle', to: 'up/down' } },
            duration: 'instant',
            easing: 'none',
            description: 'Detects and displays current scroll direction.'
        }
    },
    'Sticky Header': {
        id: 'sticky-header',
        source_url: 'Motion useScroll',
        element_selector: 'motion.header',
        animation_type: 'Scroll Animation',
        tech_detected: ['Framer Motion', 'useScroll', 'useTransform', 'sticky'],
        complexity_score: 55,
        category: 'scroll',
        extracted_pattern: {
            trigger: 'scroll',
            properties: { y: { from: 0, to: -100 }, opacity: { from: 1, to: 0 } },
            duration: 'scroll-linked',
            easing: 'linear',
            description: 'Sticky header that animates based on scroll position.'
        }
    },
    'Viewport Trigger': {
        id: 'viewport-trigger',
        source_url: 'Motion useInView',
        element_selector: 'motion.div',
        animation_type: 'Scroll-Triggered',
        tech_detected: ['Framer Motion', 'useInView', 'viewport'],
        complexity_score: 40,
        category: 'scroll',
        extracted_pattern: {
            trigger: 'inView',
            properties: { opacity: { from: 0, to: 1 }, x: { from: -50, to: 0 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Animations triggered when elements enter viewport.'
        }
    },
    'Follow Cursor': {
        id: 'follow-cursor',
        source_url: 'Motion useMotionValue',
        element_selector: 'motion.div',
        animation_type: 'Cursor Animation',
        tech_detected: ['Framer Motion', 'useMotionValue', 'useSpring'],
        complexity_score: 60,
        category: 'interactive',
        extracted_pattern: {
            trigger: 'mousemove',
            properties: { x: { from: 0, to: 'cursor' }, y: { from: 0, to: 'cursor' } },
            duration: 'spring',
            easing: 'spring (stiffness: 150)',
            description: 'Element follows cursor with spring physics.'
        }
    },
    'CSS Variable Anim': {
        id: 'css-variable-anim',
        source_url: 'Motion CSS Variables',
        element_selector: 'motion.div',
        animation_type: 'CSS Variable',
        tech_detected: ['Framer Motion', 'CSS Variables', '--custom-property'],
        complexity_score: 50,
        category: 'advanced',
        extracted_pattern: {
            trigger: 'mount',
            properties: { '--hue': { from: 0, to: 360 }, '--rotate': { from: 0, to: 360 } },
            duration: '4s',
            easing: 'linear',
            description: 'Animating CSS custom properties to affect multiple children.'
        }
    },
    'Keyframe Sequence': {
        id: 'keyframe-sequence',
        source_url: 'Motion Keyframes',
        element_selector: 'motion.div',
        animation_type: 'Keyframe Animation',
        tech_detected: ['Framer Motion', 'keyframes array', 'times'],
        complexity_score: 45,
        category: 'entrance',
        extracted_pattern: {
            trigger: 'mount',
            properties: { x: { from: 0, to: 0 }, scale: { from: 1, to: 1 } },
            duration: '3s',
            easing: 'easeInOut',
            description: 'Multi-step keyframe animation sequence.'
        }
    },
    'Filter Blur': {
        id: 'filter-blur',
        source_url: 'Motion Filter Animation',
        element_selector: 'motion.div',
        animation_type: 'Filter Animation',
        tech_detected: ['Framer Motion', 'filter', 'blur', 'brightness'],
        complexity_score: 35,
        category: 'effects',
        extracted_pattern: {
            trigger: 'mount',
            properties: { filter: { from: 'blur(0px)', to: 'blur(10px)' } },
            duration: '2s',
            easing: 'easeInOut',
            description: 'CSS filter animations: blur, brightness, saturate, hue-rotate.'
        }
    },
    'Morph Path': {
        id: 'morph-path',
        source_url: 'Motion SVG Animation',
        element_selector: 'motion.path',
        animation_type: 'SVG Morph',
        tech_detected: ['Framer Motion', 'SVG', 'd attribute'],
        complexity_score: 65,
        category: 'svg',
        extracted_pattern: {
            trigger: 'state-change',
            properties: { d: { from: 'path1', to: 'path2' } },
            duration: '0.8s',
            easing: 'easeInOut',
            description: 'SVG path morphing between different shapes.'
        }
    },
    'ViewBox Zoom': {
        id: 'viewbox-zoom',
        source_url: 'Motion SVG Animation',
        element_selector: 'motion.svg',
        animation_type: 'SVG ViewBox',
        tech_detected: ['Framer Motion', 'SVG', 'viewBox'],
        complexity_score: 55,
        category: 'svg',
        extracted_pattern: {
            trigger: 'state-change',
            properties: { viewBox: { from: '0 0 200 200', to: '50 50 100 100' } },
            duration: '0.8s',
            easing: 'easeInOut',
            description: 'SVG pan and zoom using viewBox animation.'
        }
    },
    'Gesture Combo': {
        id: 'gesture-combo',
        source_url: 'Motion Gestures',
        element_selector: 'motion.div',
        animation_type: 'Gesture Animation',
        tech_detected: ['Framer Motion', 'whileHover', 'whileTap', 'whileFocus', 'whileDrag'],
        complexity_score: 50,
        category: 'interactive',
        extracted_pattern: {
            trigger: 'multiple-gestures',
            properties: { scale: { from: 1, to: 1.1 }, rotate: { from: 0, to: 5 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Combining multiple gesture animations on a single element.'
        }
    },
    'Layout Group': {
        id: 'layout-group',
        source_url: 'Motion LayoutGroup',
        element_selector: 'LayoutGroup',
        animation_type: 'Layout Animation',
        tech_detected: ['Framer Motion', 'LayoutGroup', 'layout'],
        complexity_score: 60,
        category: 'layout',
        extracted_pattern: {
            trigger: 'layout-change',
            properties: { width: { from: 50, to: 120 }, height: { from: 50, to: 80 } },
            duration: 'spring',
            easing: 'spring',
            description: 'Synchronized layout animations across multiple components.'
        }
    }
};

// --- BATCH PROMPT MODAL ---
interface BatchModalProps {
    selectedTitles: string[];
    onClose: () => void;
}

function BatchPromptModal({ selectedTitles, onClose }: BatchModalProps) {
    const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');
    
    const combinedPrompt = selectedTitles.map(title => {
        const record = GALLERY_DATA[title];
        if (!record) return '';
        return `## ${title}\n${generateIDEPrompt(record)}`;
    }).filter(Boolean).join('\n\n---\n\n');

    // Generate example code based on selected component
    const generateExampleCode = () => {
        if (selectedTitles.length === 0) return '';
        
        const firstTitle = selectedTitles[0];
        const record = GALLERY_DATA[firstTitle];
        if (!record) return '';

        const { extracted_pattern } = record;
        const trigger = extracted_pattern?.trigger || 'mount';
        const duration = extracted_pattern?.duration || '0.5s';
        
        // Generate code based on animation type
        if (trigger.includes('hover')) {
            return `import { motion } from 'framer-motion';

export function ${firstTitle.replace(/\s/g, '')}() {
    return (
        <motion.div
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl"
            whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}`;
        } else if (trigger.includes('scroll') || trigger.includes('inView')) {
            return `import { motion } from 'framer-motion';

export function ${firstTitle.replace(/\s/g, '')}() {
    return (
        <motion.div
            className="w-full p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h3>Scroll-triggered content</h3>
        </motion.div>
    );
}`;
        } else if (trigger.includes('key') || trigger.includes('exit')) {
            return `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ${firstTitle.replace(/\s/g, '')}() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = ['Slide 1', 'Slide 2', 'Slide 3'];
    
    return (
        <div className="relative w-full h-48 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ x: 200, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -200, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl"
                >
                    {items[activeIndex]}
                </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={\`w-3 h-3 rounded-full \${i === activeIndex ? 'bg-white' : 'bg-white/50'}\`}
                    />
                ))}
            </div>
        </div>
    );
}`;
        } else {
            return `import { motion } from 'framer-motion';

export function ${firstTitle.replace(/\s/g, '')}() {
    return (
        <motion.div
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                duration: ${parseFloat(duration) || 0.5}
            }}
        />
    );
}`;
        }
    };

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(combinedPrompt);
            window.open('https://gemini.google.com/app', '_blank');
            alert(`✅ ${selectedTitles.length} prompts copiados! Cole no Gemini.`);
        } catch (err) {
            console.error('Clipboard error:', err);
            alert('❌ Falha ao copiar.');
        }
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(generateExampleCode());
            alert('✅ Código copiado para a área de transferência!');
        } catch (err) {
            console.error('Clipboard error:', err);
            alert('❌ Falha ao copiar.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Batch Prompt Generator</h2>
                        <p className="text-sm text-slate-500">{selectedTitles.length} componentes selecionados</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100">
                    <button
                        onClick={() => setActiveTab('prompt')}
                        className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'prompt' 
                                ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-50' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        📝 Prompt para IA
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'code' 
                                ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-50' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        💻 Código do Componente
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    {activeTab === 'prompt' ? (
                        <pre className="bg-slate-50 p-4 rounded-lg text-xs text-slate-700 whitespace-pre-wrap font-mono">
                            {combinedPrompt}
                        </pre>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-lg overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-xs text-slate-400">{selectedTitles[0]?.replace(/\s/g, '')}.tsx</span>
                                </div>
                                <pre className="p-4 text-xs text-slate-100 whitespace-pre-wrap font-mono overflow-x-auto">
                                    <code>{generateExampleCode()}</code>
                                </pre>
                            </div>
                            <p className="text-xs text-slate-500">
                                💡 Este código é um exemplo funcional baseado no padrão de animação detectado. 
                                Personalize conforme necessário.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex gap-3">
                    {activeTab === 'prompt' ? (
                        <Button onClick={handleCopyPrompt} className="flex-1 gap-2">
                            <Code2 className="w-4 h-4" /> Copiar & Abrir Gemini
                        </Button>
                    ) : (
                        <Button onClick={handleCopyCode} className="flex-1 gap-2 bg-slate-900 hover:bg-slate-800">
                            <Code2 className="w-4 h-4" /> Copiar Código
                        </Button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}


// --- SHOWCASE CARD ---
interface ShowcaseCardProps {
    title: string;
    description: string;
    component: React.ReactNode;
    isSelected: boolean;
    onToggleSelect: () => void;
    onOpenStudio: () => void;
    onOpenFullscreen: () => void;
}

function ShowcaseCard({ title, description, component, isSelected, onToggleSelect, onOpenStudio, onOpenFullscreen }: ShowcaseCardProps) {
    const handleStudioClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenStudio();
    };

    const handleFullscreenClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenFullscreen();
    };

    return (
        <Card className={`group overflow-hidden transition-all hover:shadow-lg bg-white relative ${isSelected ? 'border-2 border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-100 hover:border-slate-300'}`}>
            {/* Selection Checkbox */}
            <button
                onClick={onToggleSelect}
                className={`absolute top-4 left-4 z-20 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-slate-900 border-slate-900' : 'bg-white/80 border-slate-300 hover:border-slate-900'}`}
            >
                {isSelected && <Check className="w-4 h-4 text-white" />}
            </button>
            
            {/* Fullscreen Button */}
            <button
                onClick={handleFullscreenClick}
                className="absolute top-4 right-14 z-20 w-8 h-8 rounded-lg bg-white/90 border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-100 hover:border-slate-300"
                title="Abrir em Fullscreen"
            >
                <Maximize2 className="w-4 h-4 text-slate-600" />
            </button>

            {/* Live Studio Button */}
            <button
                onClick={handleStudioClick}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-white/90 border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-100 hover:border-slate-300"
                title="Abrir Live Studio"
            >
                <Sliders className="w-4 h-4 text-slate-600" />
            </button>

            <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
                    {component}
                </div>
                <div className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}

// --- MAIN APP ---
function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [studioAnimation, setStudioAnimation] = useState<string | null>(null);
    const [fullscreenAnimation, setFullscreenAnimation] = useState<string | null>(null);

    // Get all component titles
    const allComponents = Object.keys(GALLERY_DATA);
    
    // Filter components based on search only (no category filter)
    const filteredComponents = allComponents.filter(title => 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        GALLERY_DATA[title].animation_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        GALLERY_DATA[title].tech_detected.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggleCardSelection = (title: string) => {
        setSelectedCards(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title) 
                : [...prev, title]
        );
    };

    const clearSelection = () => {
        setSelectedCards([]);
    };

    // Render component by title
    const renderComponent = (title: string) => {
        switch(title) {
            case 'Circular Text':
                return <CircularTextSVG />;
            case 'Split Reveal':
                return <SplitTextReveal />;
            case '3D Tilt':
                return <TiltedCard />;
            case 'Liquid Chrome':
                return (
                    <div className="w-full h-full min-h-[200px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                        {/* @ts-ignore */}
                        <LiquidChrome baseColor={[0.1, 0.4, 0.8]} speed={0.5} amplitude={0.4} interactive={true} />
                    </div>
                );
            case 'Fade Up':
                return <FadeUpDemo />;
            case 'Pulse Loader':
                return <PulseLoaderDemo />;
            case 'Stagger List':
                return <StaggerListDemo />;
            case 'Morph Button':
                return <MorphButtonDemo />;
            case 'Drag Box':
                return <DragBoxDemo />;
            case 'Parallax Scroll':
                return <ParallaxScrollDemo />;
            case 'Rotate 3D':
                return <Rotate3DDemo />;
            case 'Slide Show':
                return <SlideShowDemo />;
            case 'Tab System':
                return <TabSystemDemo />;
            case 'Accordion':
                return <AccordionMotionDemo />;
            case 'Infinite Rotation':
                return <InfiniteRotationDemo />;
            case 'Number Counter':
                return <NumberCounterDemo />;
            case 'Typewriter':
                return <TypewriterDemo />;
            case 'Magnetic Button':
                return <MagneticButtonDemo />;
            case 'Focus Ring':
                return <FocusRingDemo />;
            case 'Bounce Loader':
                return <BounceLoaderDemo />;
            case 'Scroll Progress':
                return <ScrollProgressDemo />;
            case 'Hover Card':
                return <HoverCardDemo />;
            case 'Tap Feedback':
                return <TapFeedbackDemo />;
            case 'Flip Card':
                return <FlipCardDemo />;
            case 'Shake Animation':
                return <ShakeAnimationDemo />;
            case 'Blur In':
                return <BlurInDemo />;
            case 'Scale Up':
                return <ScaleUpDemo />;
            case 'Slide In':
                return <SlideInDemo />;
            case 'Glow Pulse':
                return <GlowPulseDemo />;
            case 'Path Drawing':
                return <PathDrawingDemo />;
            case 'Color Morph':
                return <ColorMorphDemo />;
            case 'Skeleton Loader':
                return <SkeletonLoaderDemo />;
            case 'Wobble':
                return <WobbleDemo />;
            case 'Wave Text':
                return <WaveTextDemo />;
            // === NEW MOTION PATTERNS ===
            case 'Layout Transition':
                return <LayoutTransitionDemo />;
            case 'Shared Element Modal':
                return <SharedElementModalDemo />;
            case 'Reorderable List':
                return <ReorderableListDemo />;
            case 'Scroll Transform':
                return <ScrollTransformDemo />;
            case 'Dynamic Variants':
                return <DynamicVariantsDemo />;
            case 'Scroll Direction':
                return <ScrollDirectionDemo />;
            case 'Sticky Header':
                return <StickyHeaderDemo />;
            case 'Viewport Trigger':
                return <ViewportTriggerDemo />;
            case 'Follow Cursor':
                return <FollowCursorDemo />;
            case 'CSS Variable Anim':
                return <CSSVariableAnimDemo />;
            case 'Keyframe Sequence':
                return <KeyframeSequenceDemo />;
            case 'Filter Blur':
                return <FilterBlurDemo />;
            case 'Morph Path':
                return <MorphPathDemo />;
            case 'ViewBox Zoom':
                return <ViewBoxZoomDemo />;
            case 'Gesture Combo':
                return <GestureComboDemo />;
            case 'Layout Group':
                return <LayoutGroupDemo />;
            default:
                return null;
        }
    };

    // Render preview for Live Studio with dynamic props
    const renderPreviewForStudio = (title: string, props: ControlValues) => {
        switch(title) {
            case 'Circular Text':
                return <CircularTextSVG />;
            case 'Split Reveal':
                return <SplitTextReveal />;
            case '3D Tilt':
                return <TiltedCard />;
            case 'Liquid Chrome':
                return (
                    <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                        {/* @ts-ignore */}
                        <LiquidChrome 
                            baseColor={[props.baseColorR as number || 0.1, props.baseColorG as number || 0.4, props.baseColorB as number || 0.8]} 
                            speed={props.speed as number || 0.5} 
                            amplitude={props.amplitude as number || 0.4} 
                            interactive={props.interactive as boolean ?? true} 
                        />
                    </div>
                );
            case 'Fade Up':
                return <FadeUpDemo />;
            case 'Pulse Loader':
                return <PulseLoaderDemo />;
            case 'Stagger List':
                return <StaggerListDemo />;
            case 'Morph Button':
                return <MorphButtonDemo />;
            default:
                return null;
        }
    };

    // CardNav items configuration
    const navItems: CardNavItem[] = [
        {
            label: "Showcase",
            bgColor: "#0D0716",
            textColor: "#fff",
            links: [
                { label: "Motion Library", ariaLabel: "View Motion Library", href: "#library" },
                { label: "Live Studio", ariaLabel: "Open Live Studio", href: "#studio" }
            ]
        },
        {
            label: "About", 
            bgColor: "#170D27",
            textColor: "#fff",
            links: [
                { label: "Tech Stack", ariaLabel: "View Technologies", href: "#tech-stack" },
                { label: "Creator", ariaLabel: "About Creator", href: "#creator" }
            ]
        },
        {
            label: "Resources",
            bgColor: "#271E37", 
            textColor: "#fff",
            links: [
                { label: "GitHub", ariaLabel: "GitHub Repository", href: "https://github.com/eumatoliveira" },
                { label: "Documentation", ariaLabel: "View Docs", href: "#" }
            ]
        }
    ];

    // Dark mode is now permanent - no theme switching
    return (
        <div className="min-h-screen font-sans selection:bg-slate-100 bg-slate-950 text-white">
            {/* Antigravity Particle Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <Antigravity
                    count={150}
                    magnetRadius={8}
                    ringRadius={10}
                    waveSpeed={0.3}
                    waveAmplitude={0.8}
                    particleSize={1.2}
                    lerpSpeed={0.04}
                    color='#FF9FFC'
                    autoAnimate={true}
                    particleVariance={0.8}
                />
            </div>

            {/* CardNav Header */}
            <CardNav
                logo={
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-600">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">Lumina</span>
                    </div>
                }
                items={navItems}
                baseColor='rgba(15, 23, 42, 0.85)'
                menuColor='#fff'
                buttonBgColor='#8b5cf6'
                buttonTextColor="#fff"
                ctaLabel="Explorar"
                onCtaClick={() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })}
            />

            <main className="container mx-auto px-4 py-12 md:py-24 space-y-24 relative z-10">
                {/* Hero */}
                <section className="text-center space-y-8 max-w-3xl mx-auto pt-16">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                            Reverse Engineer <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Digital Motion</span>
                        </h1>
                        <p className="text-lg max-w-xl mx-auto text-slate-400">
                            Analise, extraia e reconstrua animações premium. Gere prompts para IA em um clique.
                        </p>
                    </div>
                    <div className="relative group w-full max-w-md mx-auto">
                        <div className="absolute inset-0 blur-xl rounded-full transition-opacity bg-violet-600 opacity-20 group-hover:opacity-40" />
                        <Input 
                            className="relative h-14 px-6 rounded-full text-lg shadow-sm transition-all w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400" 
                            placeholder="Pesquisar componentes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </section>

                {/* Motion Library */}
                <section id="library" className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Layers className="w-6 h-6 text-slate-400" />
                            <h2 className="text-2xl font-bold text-white">Motion Library</h2>
                            <span className="px-3 py-1 rounded-full text-sm bg-slate-800 text-slate-400">
                                {filteredComponents.length} Componentes
                            </span>
                        </div>
                    </div>

                    {/* Components Grid - Single aligned grid */}
                    {filteredComponents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredComponents.map(title => (
                                <ShowcaseCard
                                    key={title}
                                    title={title}
                                    description={GALLERY_DATA[title].extracted_pattern?.description || GALLERY_DATA[title].animation_type}
                                    component={renderComponent(title)}
                                    isSelected={selectedCards.includes(title)}
                                    onToggleSelect={() => toggleCardSelection(title)}
                                    onOpenStudio={() => setStudioAnimation(title)}
                                    onOpenFullscreen={() => setFullscreenAnimation(title)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-slate-500">Nenhum componente encontrado para "{searchQuery}"</p>
                        </div>
                    )}
                </section>

                {/* Tech Stack Section */}
                <section id="tech-stack" className="py-16 w-screen relative left-1/2 -translate-x-1/2 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                    <TechStackDemo isDark={true} />
                </section>

                {/* Creator Showcase */}
                <section id="creator" className="py-16 -mx-4 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-8">
                            {/* Animated Photo */}
                            <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative w-28 h-28 mx-auto"
                            >
                                {/* Rotating gradient border */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"
                                />
                                {/* Photo with inner padding */}
                                <img 
                                    src="/creator-photo.png" 
                                    alt="Matheus R.O.Souza" 
                                    className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover border-2 border-slate-900"
                                />
                            </motion.div>
                            
                            {/* Animated Text */}
                            <motion.div 
                                className="space-y-3"
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <motion.h2 
                                    className="text-3xl md:text-4xl font-bold text-white"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    Matheus R.O.Souza
                                </motion.h2>
                                <motion.p 
                                    className="text-slate-400 max-w-lg mx-auto text-sm md:text-base"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    Engenheiro de Software Full-Stack especializado em Motion Design, 
                                    AI/ML e arquiteturas escaláveis. Construindo o futuro da web.
                                </motion.p>
                            </motion.div>

                            {/* Animated Skill Badges */}
                            <motion.div 
                                className="flex flex-wrap justify-center gap-2 md:gap-3"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                {[
                                    { icon: Brain, label: 'AI/ML' },
                                    { icon: Database, label: 'Full-Stack' },
                                    { icon: Cpu, label: 'Systems' },
                                    { icon: Sparkles, label: 'Motion' }
                                ].map(({ icon: Icon, label }, index) => (
                                    <motion.div 
                                        key={label} 
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 rounded-full text-xs md:text-sm text-white/80 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
                                    >
                                        <Icon className="w-3 h-3 md:w-4 md:h-4" />
                                        {label}
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Animated Social Buttons */}
                            <motion.div 
                                className="flex justify-center gap-3 md:gap-4 pt-4"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                            >
                                {[
                                    { href: "https://linkedin.com", icon: Linkedin, color: "from-blue-500 to-blue-600" },
                                    { href: "https://youtube.com", icon: Youtube, color: "from-red-500 to-red-600" },
                                    { href: "https://github.com", icon: ExternalLink, color: "from-violet-500 to-purple-600" }
                                ].map(({ href, icon: Icon, color }, index) => (
                                    <motion.a 
                                        key={href}
                                        href={href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                                        whileHover={{ 
                                            scale: 1.2, 
                                            y: -5,
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`p-3 md:p-4 bg-gradient-to-br ${color} rounded-xl shadow-lg`}
                                    >
                                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container mx-auto px-4 text-center text-sm text-slate-500">
                    <p>© 2025 Lumina Motion Intelligence. Engineered for the future.</p>
                </div>
            </footer>

            {/* Floating Action Button */}
            {selectedCards.length > 0 && (
                <div className="fixed bottom-6 right-6 flex gap-3 z-40">
                    <Button 
                        variant="outline" 
                        onClick={clearSelection}
                        className="shadow-lg bg-white"
                    >
                        <X className="w-4 h-4 mr-2" /> Limpar ({selectedCards.length})
                    </Button>
                    <Button 
                        onClick={() => setShowBatchModal(true)}
                        className="shadow-lg bg-slate-900 hover:bg-slate-800"
                    >
                        <Code2 className="w-4 h-4 mr-2" /> Gerar Prompt em Lote
                    </Button>
                </div>
            )}

            {/* Batch Prompt Modal */}
            {showBatchModal && (
                <BatchPromptModal 
                    selectedTitles={selectedCards} 
                    onClose={() => setShowBatchModal(false)} 
                />
            )}

            {/* Live Studio Modal */}
            {studioAnimation && ANIMATION_SCHEMAS[studioAnimation] && (
                <LiveEditor
                    schema={ANIMATION_SCHEMAS[studioAnimation]}
                    renderPreview={(props) => renderPreviewForStudio(studioAnimation, props)}
                    onClose={() => setStudioAnimation(null)}
                />
            )}

            {/* Fullscreen Preview Modal */}
            {fullscreenAnimation && (
                <FullscreenPreview
                    isOpen={true}
                    title={fullscreenAnimation}
                    description={GALLERY_DATA[fullscreenAnimation]?.animation_type}
                    onClose={() => setFullscreenAnimation(null)}
                >
                    {renderComponent(fullscreenAnimation)}
                </FullscreenPreview>
            )}
        </div>
    );
}

export default App;
