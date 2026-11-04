import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useServicesScene } from "@/components/services3d/useServicesScene";
import { Starfield } from "@/components/ui/starfield";
import { SectionHeading } from "@/components/ui/section-heading";

type Lenisish = { scrollTo: (y: number, o?: { duration?: number }) => void };

/**
 * Services as a pinned story: the section sticks to the screen while you scroll,
 * each step swaps the 3D render on the right and the copy on the left.
 */
const ServicesSection = () => {
  const { t } = useLang();
  const s = translations.services;
  const items = s.items;
  const n = items.length;

  const sectionRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const noGL = useServicesScene(viewRef, active, "classic");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + ((i + 0.5) / n) * travel;
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const item = items[active];
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="services" ref={sectionRef} className="bg-sand relative" style={{ height: `${100 + n * 55}vh` }}>
      <div className="sticky top-0 z-20 h-[100svh] overflow-hidden">
        <Starfield contained count={90} />
        <div className="relative z-20 max-w-7xl mx-auto h-full px-6 md:px-8 pt-24 pb-10 grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 lg:gap-12 items-center">
          {/* ---------- copy */}
          <div className="min-w-0 order-2 lg:order-1 flex flex-col gap-6">
            <SectionHeading
              index="04"
              size="md"
              label={t(s.title)}
              title={t({ en: "What I can build", es: "Lo que puedo construir" })}
              muted={t({ en: "for you.", es: "para ti." })}
              aside={
                <span className="font-mono text-xs tracking-[0.2em] text-white/40 tabular-nums whitespace-nowrap pb-1">
                  <span className="text-white">{num(active)}</span> / {num(n - 1)}
                </span>
              }
            />

            {/* list (desktop) */}
            <ul className="hidden lg:flex flex-col border-t border-white/[0.07]">
              {items.map((it, i) => (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={`group w-full flex items-center gap-4 py-2.5 border-b border-white/[0.07] text-left transition-colors duration-300 ${i === active ? "text-white" : "text-white/30 hover:text-white/70"}`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] w-6 tabular-nums">{num(i)}</span>
                    <span className="font-heading font-medium text-lg xl:text-xl -tracking-[0.02em] flex-1">{t(it.title)}</span>
                    <span className={`h-px transition-all duration-500 ${i === active ? "w-10 bg-[linear-gradient(90deg,#8fb0ff,#ff9ab0)]" : "w-0 bg-white/30"}`} />
                  </button>
                </li>
              ))}
            </ul>

            {/* active detail */}
            <div className="relative min-h-[96px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="lg:hidden font-heading font-semibold text-2xl text-white -tracking-[0.03em]">{t(item.title)}</h3>
                  {/* the home only teases; the full detail lives on /servicios */}
                  <p className="text-white/80 text-lg md:text-xl font-light leading-snug max-w-md">{t(item.subtitle)}</p>
                  <Link
                    to={`/servicios#${item.id}`}
                    className="group/l inline-flex items-center gap-2 w-fit text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors"
                  >
                    {t({ en: "See the full service", es: "Ver el servicio completo" })}
                    <ArrowUpRight size={15} className="transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* step dots (mobile) */}
            <div className="flex lg:hidden gap-1.5">
              {items.map((it, i) => (
                <span key={it.id} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/25"}`} />
              ))}
            </div>
          </div>

          {/* ---------- 3D view */}
          <div className="relative order-1 lg:order-2 h-[38svh] sm:h-[44svh] lg:h-[72svh] min-w-0">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(143,176,255,0.16),transparent_65%)] blur-2xl" />
            <span
              aria-hidden="true"
              className="absolute right-0 top-0 font-heading font-bold text-[9rem] lg:text-[14rem] -tracking-[0.06em] leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--c-fg)/0.08)] select-none tabular-nums"
            >
              {num(active)}
            </span>
            <div ref={viewRef} className="absolute inset-0" role="img" aria-label={t(item.title) as string} />
            {noGL && (
              <div className="absolute inset-0 flex items-center justify-center text-white/40 font-mono text-xs tracking-[0.2em] uppercase">
                {t(item.title)}
              </div>
            )}
          </div>
        </div>

        {/* progress */}
        <div className="absolute left-0 right-0 bottom-0 z-20 h-px bg-white/[0.06]">
          <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-[linear-gradient(90deg,#8fb0ff,#b7a8ff,#ff9ab0,#ffc48a)]" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
