import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/section-heading";
import { Starfield } from "@/components/ui/starfield";
import { BrandMark } from "@/components/brand/Logo";

const ease = [0.22, 1, 0.36, 1] as const;

const blobs = [
  "radial-gradient(circle at 30% 35%, rgba(143,176,255,0.55), transparent 55%), radial-gradient(circle at 75% 70%, rgba(183,168,255,0.4), transparent 55%)",
  "radial-gradient(circle at 65% 30%, rgba(183,168,255,0.5), transparent 55%), radial-gradient(circle at 30% 75%, rgba(255,154,176,0.42), transparent 55%)",
  "radial-gradient(circle at 40% 30%, rgba(255,154,176,0.48), transparent 55%), radial-gradient(circle at 70% 75%, rgba(255,196,138,0.42), transparent 55%)",
];


/** The brand reel playing inside a dark "screen" that rests on the page: the hero of /portafolio. */
const ReelHero = ({ es }: { es: boolean }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  // only play while on screen (and never for reduced motion)
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    // the reel opens on a quiet starfield; jump to just before the mark lands so it shows right away
    // (retried until the file is seekable that far; only once, later loops play in full)
    const start = () => {
      if (v.currentTime < 1 && v.seekable.length && v.seekable.end(0) > 4.6) {
        v.currentTime = 4.4;
        ["loadedmetadata", "progress", "timeupdate"].forEach((ev) => v.removeEventListener(ev, start));
      }
    };
    ["loadedmetadata", "progress", "timeupdate"].forEach((ev) => v.addEventListener(ev, start));
    start();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => undefined) : v.pause()), { threshold: 0.15 });
    io.observe(v);
    return () => {
      io.disconnect();
      ["loadedmetadata", "progress", "timeupdate"].forEach((ev) => v.removeEventListener(ev, start));
    };
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease }}
      className="theme-dark relative overflow-hidden rounded-[24px] md:rounded-[36px] border border-white/10 bg-[#0B0B0D] flex flex-col sm:block sm:aspect-[16/11] lg:aspect-[16/8.2] shadow-[0_40px_120px_-40px_rgba(11,11,13,0.55)]"
    >
      {/* phones: the film sits on top and the copy below it; wider screens: copy over the film */}
      <div className="relative aspect-[4/3] sm:absolute sm:inset-0 sm:aspect-auto">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover object-[66%_50%]"
        src="/video/bencomo-reel.mp4#t=4.4"
        poster="/video/bencomo-reel.jpg"
        muted
        loop
        playsInline
        autoPlay={!reduce}
        preload="metadata"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="sm:hidden absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
      </div>
      {/* keep the copy readable: from the left on wide screens, from the bottom on phones */}
      <div aria-hidden="true" className="hidden sm:block absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,0.85)_0%,rgba(11,11,13,0.45)_38%,transparent_62%)]" />

      <div className="relative sm:h-full flex flex-col sm:justify-center gap-6 px-6 pb-8 -mt-10 sm:mt-0 sm:p-10 lg:p-16 max-w-2xl">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7A8FF] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B7A8FF]" />
          </span>
          {es ? "Próximamente" : "Coming soon"}
        </span>
        <h1 className="font-heading font-semibold text-white text-[2.6rem] sm:text-6xl lg:text-7xl leading-[0.98] -tracking-[0.05em]" style={{ textWrap: "balance" } as Record<string, string>}>
          {es ? "Casos de estudio," : "Case studies,"} <span className="text-white/45">{es ? "muy pronto." : "coming soon."}</span>
        </h1>
        <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-md">
          {es
            ? "Estoy preparando proyectos que de verdad valga la pena mostrar, contados con su proceso completo. Mientras tanto, el mejor caso de estudio puede ser el tuyo."
            : "I'm preparing projects that are truly worth showing, told with their full process. Meanwhile, the best case study could be yours."}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            {es ? "Cuéntame tu proyecto" : "Tell me about your project"}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/40 transition-colors"
          >
            {es ? "Ver lo que puedo construir" : "See what I can build"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * "My work" while there are no case studies worth showing yet:
 * three veiled cards that drift with the aurora, and a way to start a project instead.
 * `page` renders it as the whole /portafolio page.
 */
const WorkComingSoon = ({ page = false }: { page?: boolean }) => {
  const { lang } = useLang();
  // the mark on each card slips open like the one in the navbar: on hover, or (touch screens) while the card is in view
  const [openCards, setOpenCards] = useState<Set<number>>(() => new Set());
  const touch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const setCard = (i: number, on: boolean) =>
    setOpenCards((prev) => {
      if (prev.has(i) === on) return prev;
      const next = new Set(prev);
      if (on) next.add(i);
      else next.delete(i);
      return next;
    });
  const es = lang === "es";

  const cards = es
    ? [
        { n: "01", kind: "Sitio web", hint: "Identidad y conversión" },
        { n: "02", kind: "Aplicación web", hint: "Producto a la medida" },
        { n: "03", kind: "Sistema para negocio", hint: "Procesos y datos" },
      ]
    : [
        { n: "01", kind: "Website", hint: "Identity and conversion" },
        { n: "02", kind: "Web application", hint: "Custom product" },
        { n: "03", kind: "Business system", hint: "Processes and data" },
      ];

  return (
    <section
      id="projects"
      className={`relative z-20 overflow-hidden ${page ? "min-h-[100svh] pt-28 md:pt-32 pb-28" : "bg-paper py-28 md:py-36"}`}
    >
      {!page && <Starfield contained count={80} />}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {page ? (
          <>
            <ReelHero es={es} />
            <div className="mt-20 md:mt-28 flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
              <span className="text-white">{es ? "En el taller" : "In the workshop"}</span>
              <span className="h-px w-10 bg-[linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]" />
              <span className="text-white/45">{es ? "Lo que se está cocinando" : "What's cooking"}</span>
            </div>
          </>
        ) : (
        <SectionHeading
          index="03"
          label={es ? "Mi trabajo" : "My work"}
          title={es ? "Casos de estudio," : "Case studies,"}
          muted={es ? "muy pronto." : "coming soon."}
          size={page ? "lg" : "lg"}
          intro={
            es
              ? "Estoy preparando proyectos que de verdad valga la pena mostrar, contados con su proceso completo. Mientras tanto, el mejor caso de estudio puede ser el tuyo."
              : "I'm preparing projects that are truly worth showing, told with their full process. Meanwhile, the best case study could be yours."
          }
          aside={
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7A8FF] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B7A8FF]" />
              </span>
              {es ? "Próximamente" : "Coming soon"}
            </span>
          }
        />
        )}

        <div className={`${page ? "mt-8" : "mt-14"} grid md:grid-cols-3 gap-5`}>
          {cards.map((c, i) => (
            <motion.article
              key={c.n}
              onHoverStart={() => !touch && setCard(i, true)}
              onHoverEnd={() => !touch && setCard(i, false)}
              onViewportEnter={() => touch && setCard(i, true)}
              onViewportLeave={() => touch && setCard(i, false)}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="group relative aspect-[4/5] md:aspect-[3/4] rounded-[24px] overflow-hidden border border-white/[0.08]"
              style={{ backgroundColor: `rgb(var(--c-tint-${i + 1}))` }}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-[20%] blur-2xl opacity-60 dark:opacity-70 group-hover:opacity-90 transition-opacity duration-700"
                style={{ background: blobs[i], animation: `aurora-drift ${14 + i * 3}s ease-in-out infinite`, animationDelay: `${-i * 4}s` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 backdrop-blur-[2px]"
                style={{ background: `linear-gradient(180deg, rgb(var(--c-tint-${i + 1}) / 0.1), rgb(var(--c-tint-${i + 1}) / 0.82))` }}
              />
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                <BrandMark size={72} tone="auto" className="opacity-30 group-hover:opacity-60 transition-opacity duration-700" open={openCards.has(i)} />
              </div>

              <div className="relative h-full flex flex-col justify-between p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/50 tabular-nums">{es ? "Caso" : "Case"} {c.n}</span>
                  <span className="rounded-full border border-white/15 bg-black/30 backdrop-blur px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/70">
                    {es ? "Próximamente" : "Coming soon"}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading font-semibold text-white text-2xl -tracking-[0.02em]">{c.kind}</h3>
                  <p className="text-white/50 text-sm">{c.hint}</p>
                  <span className="relative mt-2 h-px w-full overflow-hidden bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                      style={{ animation: `soon-shimmer ${2.6 + i * 0.4}s ease-in-out infinite` }}
                    />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {!page && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors"
          >
            {es ? "Cuéntame tu proyecto" : "Tell me about your project"}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/35 transition-colors"
          >
            {es ? "Ver lo que puedo construir" : "See what I can build"}
          </Link>
        </motion.div>
        )}
      </div>
    </section>
  );
};

export default WorkComingSoon;
