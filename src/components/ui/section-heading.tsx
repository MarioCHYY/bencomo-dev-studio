import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: ReactNode;
  /** First part of the title, in white */
  title?: ReactNode;
  /** Second part of the title, in grey (two-tone headline) */
  muted?: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  size?: "lg" | "md";
  align?: "left" | "center";
  /** Dark text, for light sections */
  light?: boolean;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** One heading pattern for every section: number · rule · label, then a two-tone title and an intro. */
export function SectionHeading({ index, label, title, muted, intro, aside, size = "lg", align = "left", light = false, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("flex flex-col gap-6", center && "items-center text-center", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
      >
        <span className={cn("tabular-nums", light ? "text-black" : "text-white")}>{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="h-px w-10 origin-left bg-[linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]"
        />
        <span className={light ? "text-black/50" : "text-white/45"}>{label}</span>
      </motion.div>
      {(title || aside) && (
        <div className={cn("flex flex-col md:flex-row md:items-end gap-6", center ? "justify-center" : "justify-between")}>
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease }}
              className={cn(
                "font-heading font-semibold leading-[1.02] -tracking-[0.04em]",
                light ? "text-black" : "text-white",
                size === "lg" ? "text-4xl md:text-6xl" : "text-3xl md:text-[2.6rem]",
              )}
              style={{ textWrap: "balance" } as Record<string, string>}
            >
              {title}
              {muted && (
                <>
                  {" "}
                  <span className={light ? "text-black/35" : "text-white/35"}>{muted}</span>
                </>
              )}
            </motion.h2>
          )}
          {aside}
        </div>
      )}
      {intro && (
        <p className={cn("font-normal text-base md:text-lg max-w-xl leading-relaxed", light ? "text-black/55" : "text-white/55", center && "mx-auto")}>{intro}</p>
      )}
    </div>
  );
}

export default SectionHeading;
