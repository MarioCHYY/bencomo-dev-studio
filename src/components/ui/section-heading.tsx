import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  size?: "lg" | "md";
  className?: string;
}

/** One heading pattern for every section: number · label rule, then title and a short intro. */
export function SectionHeading({ index, label, title, intro, aside, size = "lg", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 font-mono text-[11px] tracking-[0.22em] uppercase"
      >
        <span className="text-white tabular-nums">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="h-px w-12 origin-left bg-[linear-gradient(90deg,#8fb0ff,#ff9ab0)]"
        />
        <span className="text-white/50">{label}</span>
      </motion.div>
      {(title || aside) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn("font-heading font-extrabold text-white leading-[1] -tracking-[0.03em]", size === "lg" ? "text-4xl md:text-6xl" : "text-3xl md:text-[2.6rem]")}
            >
              {title}
            </motion.h2>
          )}
          {aside}
        </div>
      )}
      {intro && <p className="text-[#A0A5B0] font-light text-base md:text-lg max-w-xl leading-relaxed">{intro}</p>}
    </div>
  );
}

export default SectionHeading;
