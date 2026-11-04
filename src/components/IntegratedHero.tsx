import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { MorphSceneHandle } from "@/components/hero/MorphScene";

const ease = [0.22, 1, 0.36, 1] as const;
const up: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (d: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease, delay: d } }),
};

/** Hero: centred two-tone headline, a sculpture of dots that keeps changing shape, one clear action. */
export default function IntegratedHero() {
  const { t, lang } = useLang();
  const es = lang === "es";
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState(0);
  const [ready, setReady] = useState(false);

  // the sculpture tells the story of a project, one shape per stage
  const stages = es
    ? ["Idea", "Diseño", "Estructura", "Código", "Producto", "Lanzamiento"]
    : ["Idea", "Design", "Structure", "Code", "Product", "Launch"];

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyO = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const progress = useRef(0);
  useEffect(() => scrollYProgress.on("change", (v) => (progress.current = v)), [scrollYProgress]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    if (!ok) return;
    let handle: MorphSceneHandle | null = null;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = window.matchMedia("(max-width: 767px)").matches;
    import("@/components/hero/MorphScene")
      .then(({ createMorphScene }) =>
        createMorphScene(el, { reducedMotion, lowPower, onShape: setShape, getScroll: () => progress.current }),
      )
      .then((h) => {
        if (cancelled) return h.dispose();
        handle = h;
        setReady(true);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      handle?.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden">
      {/* soft light behind the sculpture */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,900px)] aspect-square rounded-full bg-[radial-gradient(circle,rgba(143,176,255,0.10),rgba(183,168,255,0.05)_40%,transparent_68%)]" />

      <motion.div style={{ y: copyY, opacity: copyO }} className="relative z-20 max-w-6xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-14 flex flex-col items-center text-center">
        <motion.span
          variants={up}
          initial="hidden"
          animate="show"
          custom={0.15}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-white/70"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[#9fe8c4] animate-ping opacity-60" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[#9fe8c4]" />
          </span>
          {es ? "Disponible para nuevos proyectos" : "Available for new projects"}
        </motion.span>

        <h1 className="mt-6 font-heading font-semibold text-white text-[clamp(2.3rem,4.9vw,4.4rem)] leading-[1.04] -tracking-[0.045em] max-w-5xl">
          <motion.span variants={up} initial="hidden" animate="show" custom={0.3} className="block">
            {es ? "Diseño y construyo productos" : "I design and build products"}
          </motion.span>
          <motion.span variants={up} initial="hidden" animate="show" custom={0.45} className="block text-white/35">
            {es ? "digitales que se sienten vivos." : "that feel alive."}
          </motion.span>
        </h1>

        {/* sculpture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.94 }}
          transition={{ duration: 1.4, ease }}
          className="relative w-full max-w-4xl h-[clamp(230px,36svh,440px)] mt-1"
        >
          <div ref={stageRef} className="absolute inset-0" aria-hidden="true" />
        </motion.div>

        {/* stage captions under the sculpture */}
        <motion.ol
          variants={up}
          initial="hidden"
          animate="show"
          custom={0.8}
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold tracking-[0.18em] uppercase"
          aria-label={es ? "Etapas de un proyecto" : "Stages of a project"}
        >
          {stages.map((s, i) => (
            <li key={s} className={`flex items-center gap-2 transition-colors duration-500 ${i === shape ? "text-white" : "text-white/25"}`}>
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </motion.ol>

        <motion.p variants={up} initial="hidden" animate="show" custom={0.6} className="mt-7 text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
          {t(translations.hero.subtitle)}
        </motion.p>

        <motion.div variants={up} initial="hidden" animate="show" custom={0.75} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-[15px] font-semibold hover:bg-white/85 transition-colors"
          >
            {t(translations.hero.cta)}
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3.5 text-[15px] font-semibold text-white hover:border-white/35 transition-colors"
          >
            {es ? "Hablemos de tu proyecto" : "Let's talk about your project"}
          </Link>
        </motion.div>
        <motion.span variants={up} initial="hidden" animate="show" custom={0.9} className="mt-5 text-[12px] text-white/35">
          Mario Bencomo · Full Stack Developer · Culiacán, MX
        </motion.span>
      </motion.div>
    </section>
  );
}
