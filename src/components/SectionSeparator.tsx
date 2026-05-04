import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SectionSeparator = () => {
  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Line */}
      <div className="absolute w-full h-px bg-primary/20 top-1/2 -translate-y-1/2" />
      
      {/* Glowing Line Center Piece */}
      <div className="absolute w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(51,141,255,0.8)]" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center gap-2 dark:bg-[#050505] bg-[#F8F8F8] px-6 transition-colors duration-500"
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
