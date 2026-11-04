import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useServicesScene } from "@/components/services3d/useServicesScene";

const ease = [0.22, 1, 0.36, 1] as const;
const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";
type Lenisish = { scrollTo: (t: number | HTMLElement, o?: { offset?: number; duration?: number; immediate?: boolean }) => void };

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * /servicios: one chapter per service on the left, and a 3D stage that stays on screen
 * on the right (on top on phones) and swaps to the model of the chapter you're reading.
 */
const ServicesPageContent = () => {
  const { t, lang } = useLang();
  const es = lang === "es";
  const s = translations.services;
  const items = s.items;
  const n = items.length;
  const location = useLocation();

  const [active, setActive] = useState(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const chapters = useRef<(HTMLElement | null)[]>([]);
  const noGL = useServicesScene(viewRef, active);

  // the chapter that crosses the middle of the screen drives the 3D stage
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    chapters.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (id: string, immediate = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    const offset = window.innerWidth < 1024 ? -window.innerHeight * 0.42 : -40;
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.2, immediate });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: immediate ? "auto" : "smooth" });
  };

  // links like /servicios#automatizacion land on their chapter
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = location.hash.slice(1);
    const tm = setTimeout(() => jump(id, true), 250);
    return () => clearTimeout(tm);
  }, [location]);

  const item = items[active];

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative z-20 pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
          >
            <span className="text-white">{t(s.title)}</span>
            <span className="h-px w-10" style={{ background: AURORA }} />
            <span className="text-white/45">{es ? "8 formas de trabajar juntos" : "8 ways to work together"}</span>
          </motion.div>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="font-heading font-semibold text-white text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.98] -tracking-[0.05em]"
              style={{ textWrap: "balance" } as Record<string, string>}
            >
              {es ? "Lo que puedo construir" : "What I can build"} <span className="text-white/35">{es ? "para ti." : "for you."}</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="flex flex-col gap-6 lg:pb-3"
            >
              <p className="text-white/60 text-lg leading-relaxed max-w-md">{t(s.subtitle)}</p>
              <Link
                to="/contacto"
                className="group w-fit inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                {es ? "Cuéntame tu proyecto" : "Tell me about your project"}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* index of services */}
          <motion.ol
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/[0.09]"
          >
            {items.map((it, i) => (
              <li key={it.id} className="border-b border-white/[0.09] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(4n))]:border-r border-white/[0.09]">
                <button
                  type="button"
                  onClick={() => jump(it.id)}
                  className="group w-full h-full flex items-start gap-4 py-5 px-1 sm:px-4 text-left"
                >
                  <span className="font-mono text-[11px] text-white/40 tabular-nums pt-1">{num(i)}</span>
                  <span className="flex-1 font-heading font-medium text-white/80 group-hover:text-white text-[17px] -tracking-[0.01em] leading-snug transition-colors">{t(it.title)}</span>
                  <ArrowUpRight size={15} className="mt-1 text-white/30 group-hover:text-white rotate-90 transition-all group-hover:translate-y-0.5" />
                </button>
              </li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- chapters + 3D stage */}
      <section className="relative z-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* stage: sticky on the right (desktop) or under the navbar (phones) */}
          <div className="sticky top-[64px] lg:top-0 z-10 self-start lg:col-start-2 lg:row-start-1 h-[38svh] lg:h-[100svh] flex items-center -mx-6 px-6 w-[calc(100%+3rem)] lg:mx-0 lg:px-0 lg:w-full py-3 lg:py-0 bg-paper/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
            <div className="relative w-full h-full lg:h-[80svh] rounded-[24px] lg:rounded-[32px] overflow-hidden border border-white/[0.08] bg-sand">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(60% 55% at 50% 52%, rgba(143,176,255,0.20), rgba(183,168,255,0.10) 45%, transparent 75%)" }}
              />
              <span
                aria-hidden="true"
                className="absolute right-4 lg:right-8 top-2 lg:top-6 font-heading font-bold text-[6rem] lg:text-[11rem] -tracking-[0.06em] leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--c-fg)/0.09)] select-none tabular-nums"
              >
                {num(active)}
              </span>
              <div ref={viewRef} className="absolute inset-0" role="img" aria-label={t(item.title) as string} />
              {noGL && (
                <div className="absolute inset-0 flex items-center justify-center text-white/40 font-mono text-xs tracking-[0.2em] uppercase">{t(item.title)}</div>
              )}

              <div className="absolute left-4 lg:left-8 top-4 lg:top-7 font-mono text-[11px] tracking-[0.2em] uppercase text-white/45 tabular-nums">
                <span className="text-white">{num(active)}</span> / {num(n - 1)}
              </div>
              <div className="absolute inset-x-4 lg:inset-x-8 bottom-4 lg:bottom-7 flex items-end justify-between gap-6">
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="hidden lg:block font-heading font-medium text-white text-xl -tracking-[0.02em]"
                >
                  {t(item.title)}
                </motion.span>
                <div className="flex gap-1.5 ml-auto">
                  {items.map((it, i) => (
                    <button
                      key={it.id}
                      type="button"
                      aria-label={t(it.title) as string}
                      onClick={() => jump(it.id)}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{ width: i === active ? 28 : 8, background: i === active ? AURORA : "rgb(var(--c-fg) / 0.2)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* chapters */}
          <div className="lg:col-start-1 lg:row-start-1 flex flex-col">
            {items.map((it, i) => {
              const deliverables = (t(it.deliverables as unknown as Record<string, string[]>) || []) as string[];
              const on = i === active;
              return (
                <article
                  key={it.id}
                  id={it.id}
                  data-index={i}
                  ref={(el) => (chapters.current[i] = el)}
                  className="min-h-[72svh] lg:min-h-[100svh] flex items-center py-14 lg:py-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease }}
                    className={`flex flex-col gap-6 transition-opacity duration-500 ${on ? "opacity-100" : "lg:opacity-30"}`}
                  >
                    <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase">
                      <span className="font-mono text-white tabular-nums">{num(i)}</span>
                      <span className="h-px w-8" style={{ background: on ? AURORA : "rgb(var(--c-fg) / 0.25)" }} />
                      <span className="text-white/45">{es ? "Servicio" : "Service"}</span>
                    </div>
                    <h2 className="font-heading font-semibold text-white text-4xl md:text-5xl leading-[1.02] -tracking-[0.04em]" style={{ textWrap: "balance" } as Record<string, string>}>
                      {t(it.title)}
                    </h2>
                    <p className="text-white/85 text-xl md:text-2xl font-light leading-snug -tracking-[0.01em] max-w-xl">{t(it.subtitle)}</p>
                    <p className="text-white/55 text-base md:text-[17px] leading-relaxed max-w-xl">{t(it.description)}</p>

                    <div className="mt-2 max-w-xl">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45">{es ? "Lo que recibes" : "What you get"}</span>
                      <ul className="mt-3 border-t border-white/[0.09]">
                        {deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-3 py-3 border-b border-white/[0.09] text-[15px] text-white/75">
                            <Check size={15} className="mt-0.5 shrink-0 text-white" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/contacto"
                      className="group w-fit mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors"
                    >
                      {es ? "Cotizar este servicio" : "Get a quote for this"}
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPageContent;
