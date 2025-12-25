import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Lazy load the Three.js canvas to prevent it from blocking the initial render
const AntigravityCanvas = lazy(() => import('./AntigravityCanvas'));

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  fieldStrength?: number;
}

// Error boundary wrapper for Three.js
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when component remounts
    setHasError(false);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <ErrorBoundaryInner onError={() => setHasError(true)}>
      {children}
    </ErrorBoundaryInner>
  );
}

// Class-based error boundary (required for componentDidCatch)
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryInnerProps {
  children: ReactNode;
  onError: () => void;
}

interface ErrorBoundaryInnerState {
  hasError: boolean;
}

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, ErrorBoundaryInnerState> {
  constructor(props: ErrorBoundaryInnerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryInnerState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Antigravity WebGL Error:', error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Fallback gradient animation when WebGL fails
function GradientFallback({ color }: { color: string }) {
  return (
    <div className="w-full h-full absolute inset-0">
      {/* Animated gradient orbs as fallback */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            backgroundColor: color,
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
          }}
          animate={{
            x: [
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
            ],
            y: [
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Loading placeholder while Canvas initializes
function LoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function Antigravity(props: AntigravityProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Check WebGL support on mount
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Still checking
  if (webglSupported === null) {
    return <LoadingPlaceholder />;
  }

  // WebGL not supported - show fallback
  if (!webglSupported) {
    return <GradientFallback color={props.color || '#FF9FFC'} />;
  }

  // WebGL supported - try to render Canvas with error boundary
  return (
    <ErrorBoundary fallback={<GradientFallback color={props.color || '#FF9FFC'} />}>
      <Suspense fallback={<LoadingPlaceholder />}>
        <AntigravityCanvas {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Antigravity;
