import { motion } from "framer-motion";

export const CircularText = ({ text = "LUMINA MOTION INTELLIGENCE EST 2025" }: { text?: string }) => {
  const characters = text.split("");
  const radius = 80;
  
  return (
    <div className="relative flex items-center justify-center w-[200px] h-[200px] rounded-full bg-white border border-slate-100 shadow-sm">
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {characters.map((char, i) => {
          const angle = (i / characters.length) * 360;
          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 text-xs font-bold text-slate-900 tracking-widest origin-[0_80px]"
              style={{
                transform: `rotate(${angle}deg) translate(-50%, -100%)`, // Pivot around center with radius
                // Note: origin is handled by transform + absolute positioning trick 
                // Creating a proper circle usually requires calculation.
                // Let's use a simpler known technique for React:
                position: 'absolute',
                height: `${radius}px`,
                transformOrigin: '0% 100%', // Bottom center
              }}
            >
              <span 
                style={{ 
                    display: 'block', 
                    transform: `rotate(${angle}deg) translateY(-${radius}px)`
                }}
                className="absolute left-1/2 -ml-[0.5ch]"
              >
                  {char}
              </span>
            </span>
          );
        })}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-12 h-12 rounded-full bg-slate-900/5 backdrop-blur-sm" />
      </div>
    </div>
  );
  
  // Revised approach for cleaner circular layouts
  // The above CSS might be finicky without explicit width/height on spans.
  // Using a simpler SVG approach is often more robust for circular text.
};

export const CircularTextSVG = ({ text = "LUMINA • SYSTEM • DESIGN • 2025 •" }: { text?: string }) => {
    return (
        <div className="relative w-48 h-48 flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-sm p-4">
             <motion.svg
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
             >
                 <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                 />
                 <text className="text-[12px] font-bold uppercase fill-slate-900 tracking-[0.2em]">
                     <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                         {text}
                     </textPath>
                 </text>
             </motion.svg>
             <div className="absolute w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                 <div className="w-2 h-2 bg-slate-900 rounded-full" />
             </div>
        </div>
    )
}

export default CircularTextSVG;
