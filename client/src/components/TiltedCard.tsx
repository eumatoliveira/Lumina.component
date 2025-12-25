
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TiltedCard = () => {
  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 10 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Calculate center-relative coordinates
    const xPos = clientX - left - width / 2;
    const yPos = clientY - top - height / 2;
    
    // Normalize and scale for tilt (e.g., max 15 degrees)
    x.set(xPos / (width / 2));
    y.set(yPos / (height / 2));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Transform mouse position to rotation
  const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);
  const shineOpacity = useTransform(mouseY, [-1, 1], [0, 0.5]); // Dynamic highlight

  return (
    <div className="perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-64 h-80 bg-white rounded-xl border border-slate-200 shadow-lg flex flex-col items-start justify-end p-6 cursor-pointer overflow-hidden group"
      >
        <div 
            style={{ transform: "translateZ(30px)" }}
            className="absolute top-6 left-6 w-8 h-8 rounded-full bg-slate-900" 
        />
        
        <div style={{ transform: "translateZ(20px)" }} className="mt-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-1">System Design</h3>
          <p className="text-sm text-slate-500">Interactive Components</p>
        </div>

        {/* Shine/Glass effect */}
        <motion.div 
            style={{ opacity: shineOpacity }}
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default TiltedCard;
