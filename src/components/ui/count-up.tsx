import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/** Counts a value like "10+" or "100%" up from 0 the first time it scrolls into view. */
export function CountUp({ value, duration = 1600, className }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !match) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [, pre, num, post] = match;
    const end = parseFloat(num);
    if (reduce) {
      el.textContent = value;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = `${pre}${Math.round(end * e)}${post}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {match ? `${match[1]}0${match[3]}` : value}
    </span>
  );
}

export default CountUp;
