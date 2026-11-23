import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Apple-style pinned scene: the phone stays in the middle of the screen while you scroll, turning
 * slowly in 3D, and its screen changes step by step; next to it one short line at a time tells
 * what that screen is for. Real screenshots only.
 */
export interface StoryStep {
  src: string;
  kicker: string;
  line: string;
}

export default function PhoneStory({
  id,
  n,
  label,
  steps,
  glow,
}: {
  id?: string;
  n: string;
  label: string;
  steps: StoryStep[];
  /** colour of the light behind the phone */
  glow: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (i !== active) setActive(i);
  });
  const rotY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-16, 12]);
  const rotX = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [8, 0, 4]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], reduce ? [1, 1, 1, 1] : [0.9, 1, 1, 0.94]);

  return (
    <section ref={ref} id={id} data-bp={`${n} · ${label}`} className="relative z-20" style={{ height: `${steps.length * 85 + 30}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="max-w-7xl h-full mx-auto px-6 md:px-8 grid grid-rows-[minmax(0,1fr)_auto] md:grid-rows-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-6 md:gap-16 pt-[140px] md:pt-28 pb-6">
          {/* the words */}
          <div className="relative flex flex-col gap-6 md:order-1 order-2">
            <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
              <span className="font-mono text-white tabular-nums">{n}</span>
              <span className="h-px w-10 bg-[linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]" />
              <span className="text-white/45">{label}</span>
            </div>
            <div className="relative min-h-[132px] md:min-h-[260px]">
              {steps.map((s, i) => (
                <div
                  key={s.src}
                  aria-hidden={i !== active}
                  className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: i === active ? 1 : 0, transform: `translateY(${i === active ? 0 : i < active ? -18 : 18}px)` }}
                >
                  <span className="text-sm md:text-base font-semibold text-white/50">{s.kicker}</span>
                  <p className="font-heading font-semibold text-white text-[1.9rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.04] -tracking-[0.045em]" style={{ textWrap: "balance" } as Record<string, string>}>
                    {s.line}
                  </p>
                </div>
              ))}
            </div>
            {/* where you are in the story */}
            <div className="flex items-center gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/25"}`} />
              ))}
            </div>
          </div>

          {/* the phone */}
          <div className="relative flex items-center justify-center md:order-2 order-1 h-full min-h-0 [perspective:1400px]">
            <div aria-hidden="true" className="absolute w-[80%] max-h-full aspect-square rounded-full" style={{ background: `radial-gradient(closest-side, ${glow}, transparent)` }} />
            <motion.div
              style={{ rotateY: rotY, rotateX: rotX, scale }}
              className="relative h-[min(40svh,420px)] md:h-[min(72svh,680px)] aspect-[585/1266] rounded-[26px] md:rounded-[44px] border border-white/15 bg-[#0b0c0e] p-1.5 md:p-2.5 md:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.75)] will-change-transform"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[20px] md:rounded-[35px] bg-[#121417]">
                {steps.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={i === active ? `${s.kicker}: ${s.line}` : ""}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
                    style={{ opacity: i === active ? 1 : 0 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
