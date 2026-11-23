import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * A value that follows a target (usually scroll progress) smoothly, but never faster than a set speed.
 * A quick flick of the wheel would otherwise jump scroll-linked animations straight to their end;
 * with this they still play through, just a bit quicker.
 */
export function createChaser(
  apply: (v: number) => void,
  {
    range = 1,
    /** fastest a full forward sweep (0 → range) may take, in ms */
    upMs = 1100,
    /** same going back, usually quicker */
    downMs = 550,
    /** smoothing time constant, in ms */
    tau = 90,
  }: { range?: number; upMs?: number; downMs?: number; tau?: number } = {},
) {
  let cur = 0;
  let target = 0;
  let raf = 0;
  let last = 0;
  const step = (t: number) => {
    const dt = last ? Math.min(64, t - last) : 16;
    last = t;
    const diff = target - cur;
    if (Math.abs(diff) < range * 0.0005) {
      cur = target;
      apply(cur);
      raf = 0;
      last = 0;
      return;
    }
    const eased = diff * (1 - Math.exp(-dt / tau));
    const cap = (range * dt) / (diff > 0 ? upMs : downMs);
    cur += Math.sign(eased) * Math.min(Math.abs(eased), cap);
    apply(cur);
    raf = requestAnimationFrame(step);
  };
  return {
    to(v: number) {
      target = v;
      if (!raf) raf = requestAnimationFrame(step);
    },
    /** go straight there (e.g. while off screen) */
    jump(v: number) {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      cur = target = v;
      apply(v);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}

/** createChaser as a framer MotionValue that follows another one */
export function useChased(source: MotionValue<number>, opts?: Parameters<typeof createChaser>[1]) {
  const out = useMotionValue(source.get());
  useEffect(() => {
    const c = createChaser((v) => out.set(v), opts);
    c.jump(source.get());
    const off = source.on("change", (v) => c.to(v));
    return () => {
      off();
      c.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, out]);
  return out;
}
