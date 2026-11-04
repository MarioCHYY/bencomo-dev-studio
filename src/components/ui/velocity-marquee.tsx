import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Big words sliding sideways. Scrolling speeds them up, flips direction with the
 * scroll direction and skews them a little, like the text is being dragged.
 */
export function VelocityMarquee({ words, baseVelocity = -2.2, outline = false }: { words: string[]; baseVelocity?: number; outline?: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex items-center gap-10 pr-10">
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className={outline ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]" : "text-white"}>{w}</span>
          <span aria-hidden="true" className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[conic-gradient(#8fb0ff,#b7a8ff,#ff9ab0,#ffc48a,#9fe8c4,#8fb0ff)]" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="relative z-20 overflow-hidden py-6 md:py-8 select-none" aria-hidden="true">
      <motion.div style={{ x, skewX: skew }} className="flex whitespace-nowrap font-heading font-extrabold uppercase -tracking-[0.03em] text-5xl md:text-7xl lg:text-[7.5rem] leading-none">
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export default VelocityMarquee;
