import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { MoreLink } from "@/components/ui/more-link";
import { useChased } from "@/lib/chase";
import { usePauseOffscreen } from "@/lib/usePauseOffscreen";

/**
 * Keynote-style pause, as a scene that stays on screen while you scroll. Each word has its own voice:
 * - "Diseño,"  the site's own sans, flipping up in 3D;
 * - "código"   in a monospaced face, typed letter by letter with a blinking caret;
 * - "y"        a quiet italic serif;
 * - "marca."   a big italic serif, underlined by an aurora brushstroke that draws itself.
 * Then the second line fills with the aurora from left to right ("la misma persona" in the serif)
 * and keeps flowing slowly. Only transforms, opacity, one clip and one SVG stroke move.
 */

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Flip({ children, p, from, to, className = "" }: { children: React.ReactNode; p: MotionValue<number>; from: number; to: number; className?: string }) {
  const k = useTransform(p, [from, to], [0, 1], { ease: easeOut });
  const y = useTransform(k, [0, 1], ["65%", "0%"]);
  const rotateX = useTransform(k, [0, 1], [-80, 0]);
  const opacity = useTransform(k, [0, 0.3, 1], [0, 1, 1]);
  return (
    <span className="inline-block [perspective:900px]">
      <motion.span style={{ y, rotateX, opacity }} className={`inline-block origin-bottom will-change-transform ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

/** a word typed out by the scroll, with a caret that keeps blinking once it's done */
function Typed({ word, p, from, to }: { word: string; p: MotionValue<number>; from: number; to: number }) {
  const [n, setN] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.max(0, Math.min(1, (v - from) / (to - from)));
    const next = Math.round(k * word.length);
    if (next !== n) setN(next);
  });
  return (
    <span className="relative inline-flex items-baseline font-code text-[0.8em] font-medium -tracking-[0.04em]" aria-hidden="true">
      {word.split("").map((c, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0 }}>
          {c}
        </span>
      ))}
      <span
        className="statement-caret absolute bottom-[0.08em] w-[0.08em] h-[0.78em] rounded-full"
        style={{ left: `calc(${(n / word.length) * 100}% + 0.02em)`, opacity: n > 0 ? 1 : 0 }}
      />
    </span>
  );
}

export default function Statement() {
  const { lang } = useLang();
  const es = lang === "es";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // the scene follows the scroll, but never faster than ~2.2 s end to end, so a quick flick still shows it
  const p = useChased(raw, { upMs: 2200, downMs: 1100, tau: 80 });
  // the flowing aurora and the blinking caret stop while the scene is off screen
  usePauseOffscreen(ref);

  const scale = useTransform(p, [0, 0.35], [1.12, 1], { ease: easeOut });
  const swash = useTransform(p, [0.36, 0.5], [0, 1]);
  const fill = useTransform(p, [0.5, 0.8], [100, 0]);
  const clip = useTransform(fill, (v) => `inset(-20% ${v}% -30% -2%)`);
  // opacities set by hand: framer's scroll-linked opacity (hardware-accelerated path) mapped these ranges wrong
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const ramp = (v: number, a: number, b: number) => String(Math.max(0, Math.min(1, (v - a) / (b - a))));
  useMotionValueEvent(p, "change", (v) => {
    if (line2Ref.current) line2Ref.current.style.opacity = ramp(v, 0.42, 0.5);
    if (linkRef.current) linkRef.current.style.opacity = ramp(v, 0.8, 0.9);
  });

  const words = es
    ? { a: "Diseño,", b: "código", c: "y", d: "marca.", l2a: "Hechos por", l2b: "la misma persona." }
    : { a: "Design,", b: "code", c: "and", d: "brand.", l2a: "Made by", l2b: "the same person." };
  const full = `${words.a} ${words.b} ${words.c} ${words.d} ${words.l2a} ${words.l2b}`;

  const big = "font-heading font-semibold text-white text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.02] -tracking-[0.055em]";
  const line2 = (
    <>
      {words.l2a} <span className="font-serif-display font-normal italic -tracking-[0.01em] text-[1.12em]">{words.l2b}</span>
    </>
  );

  if (reduce) {
    return (
      <section data-bp={es ? "Pausa" : "Statement"} className="relative z-20 py-36 md:py-56">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-8">
          <p className={big}>
            {words.a} <span className="font-code text-[0.8em] font-medium">{words.b}</span> <span className="font-serif-display font-normal italic text-white/45">{words.c}</span>{" "}
            <span className="font-serif-display font-normal italic text-[1.12em]">{words.d}</span>
          </p>
          <p className="font-heading font-semibold text-[1.7rem] sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] -tracking-[0.045em]">
            <span className="statement-flow">{line2}</span>
          </p>
          <MoreLink to="/sobre-mi">{es ? "Conoce cómo trabajo" : "See how I work"}</MoreLink>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} data-bp={es ? "Pausa" : "Statement"} className="relative z-20 h-[250svh]">
      <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-7 md:gap-9">
          <span className="sr-only">{full}</span>

          {/* line one: four words, four voices */}
          <motion.p style={{ scale }} aria-hidden="true" className={`${big} flex flex-wrap items-baseline justify-center gap-x-[0.24em] will-change-transform`}>
            <Flip p={p} from={0.02} to={0.16}>{words.a}</Flip>
            <Typed word={words.b} p={p} from={0.12} to={0.28} />
            <Flip p={p} from={0.24} to={0.34} className="font-serif-display font-normal italic text-white/45 -tracking-[0.01em]">
              {words.c}
            </Flip>
            <span className="relative inline-block">
              <Flip p={p} from={0.28} to={0.42} className="font-serif-display font-normal italic text-[1.14em] -tracking-[0.01em] pr-[0.06em]">
                {words.d}
              </Flip>
              {/* the brushstroke under "marca." */}
              <svg viewBox="0 0 270 24" preserveAspectRatio="none" className="absolute left-[-3%] right-[-3%] w-[106%] -bottom-[0.14em] h-[0.26em] overflow-visible" aria-hidden="true">
                <defs>
                  <linearGradient id="swash" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8FB0FF" />
                    <stop offset="0.4" stopColor="#B7A8FF" />
                    <stop offset="0.72" stopColor="#FF9AB0" />
                    <stop offset="1" stopColor="#FFC48A" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M3 15 C 52 5, 104 4, 150 9 S 232 20, 267 7"
                  fill="none"
                  stroke="url(#swash)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{ pathLength: swash }}
                />
              </svg>
            </span>
          </motion.p>

          {/* line two: faint first, then the aurora pours in */}
          <p
            ref={line2Ref}
            style={{ opacity: 0 }}
            aria-hidden="true"
            className="relative font-heading font-semibold text-[1.7rem] sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.1] -tracking-[0.045em]"
          >
            <span className="text-white/[0.13]">{line2}</span>
            <motion.span style={{ clipPath: clip }} className="statement-flow absolute inset-0">
              {line2}
            </motion.span>
          </p>

          <div ref={linkRef} style={{ opacity: 0 }} className="mt-2">
            <MoreLink to="/sobre-mi">{es ? "Conoce cómo trabajo" : "See how I work"}</MoreLink>
          </div>
        </div>
      </div>
    </section>
  );
}
