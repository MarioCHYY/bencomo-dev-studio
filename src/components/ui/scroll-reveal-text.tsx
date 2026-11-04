import { useEffect, useRef, useState, type ElementType } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  /** Opacity of words that haven't been reached yet */
  dim?: number;
}

function Word({ children, progress, range, dim }: { children: string; progress: MotionValue<number>; range: [number, number]; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span aria-hidden="true" style={{ opacity, y }} className="inline-block will-change-transform">
      {children}
      {" "}
    </motion.span>
  );
}

/** Text that lights up word by word as it scrolls through the viewport. */
export function ScrollRevealText({ text, className, as: Tag = "p", dim = 0.16 }: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.4"] });
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}

export default ScrollRevealText;
