import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SectionSeparator = () => {
  return (
    <div className="relative z-20 w-full py-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Base line */}
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent top-1/2 -translate-y-1/2" />

      {/* Light that travels along the line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px overflow-hidden">
        <div className="absolute top-0 h-px w-48 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(51,141,255,0.9)] animate-[sep-sweep_6s_ease-in-out_infinite]" />
      </div>

      {/* Center piece */}
      <div className="absolute w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(51,141,255,0.8)]" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center gap-2 bg-[#050505]/80 backdrop-blur-md px-6 py-1 rounded-full"
      >
        <span className="text-[10px] text-primary/60 font-medium tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionSeparator;
