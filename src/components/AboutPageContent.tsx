import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { MoreLink } from "@/components/ui/more-link";
import LocalTime from "@/components/fx/LocalTime";
import CuliacanSky from "@/components/about/CuliacanSky";
import { translations } from "@/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;
const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";

const stack = [
  { name: "React", icon: "react/react-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "Python", icon: "python/python-original" },
  { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
  { name: "Docker", icon: "docker/docker-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "Java", icon: "java/java-original" },
  { name: "Figma", icon: "figma/figma-original" },
];

/** Small label row used by every block: TITLE — aurora rule — note */
function Kicker({ title, note }: { title: ReactNode; note?: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
      <span className="text-white">{title}</span>
      <span className="h-px w-10" style={{ background: AURORA }} />
      {note && <span className="text-white/45">{note}</span>}
    </div>
  );
}

/** One tile of the collage: rises in as it enters the screen. */
function Tile({ className = "", delay = 0, children }: { className?: string; delay?: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease, delay }}
      className={`group relative overflow-hidden rounded-[22px] md:rounded-[28px] border border-white/[0.08] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PhotoTile({ src, alt, title, sub, className, delay, position = "center" }: { src: string; alt: string; title?: string; sub?: string; className?: string; delay?: number; position?: string }) {
  // the photo drifts a little slower than its frame, so it reads as having depth
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  return (
    <Tile className={`theme-dark bg-[#0B0B0D] ${className ?? ""}`} delay={delay}>
      <div ref={frame} className="absolute inset-0" aria-hidden="true" />
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[6%] -bottom-[6%] will-change-transform">
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" style={{ objectPosition: position }} />
      </motion.div>
      {title && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-4 right-4 bottom-4 md:left-6 md:bottom-6">
            <p className="font-heading font-semibold text-white text-base md:text-xl -tracking-[0.02em] leading-tight">{title}</p>
            {sub && <p className="mt-1 text-white/65 text-xs md:text-sm">{sub}</p>}
          </div>
        </>
      )}
    </Tile>
  );
}

/** The brand film, looping inside a tile (poster only for reduced motion). */
function BrandFilmTile({ className, delay }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => undefined) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <Tile className={`theme-dark bg-[#050506] ${className ?? ""}`} delay={delay}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/bencomo-logo-loop.mp4"
        poster="/video/bencomo-logo-loop.jpg"
        muted
        loop
        playsInline
        autoPlay={!reduce}
        preload="metadata"
        aria-label="Bencomo"
      />
    </Tile>
  );
}

type Principle = { n: string; title: string; text: string };

/**
 * "How I work" as a pinned scene on wide screens: the heading stays, the three ideas light up one at a
 * time as you scroll. On phones it's a normal list where the idea in the middle of the screen is lit.
 */
function Principles({ items, es }: { items: Principle[]; es: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = wide ? -r.top / Math.max(1, r.height - vh) : (vh * 0.55 - r.top) / r.height;
      setActive(Math.max(0, Math.min(items.length - 1, Math.floor(p * items.length))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else window.removeEventListener("scroll", onScroll);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [wide, reduce, items.length]);

  const pinned = wide && !reduce;
  return (
    <section ref={ref} className="relative z-20" style={{ height: pinned ? `${items.length * 60 + 60}svh` : undefined }}>
      <div className={pinned ? "sticky top-0 h-[100svh] flex items-center" : "py-20 md:py-28"}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <Kicker title={es ? "Cómo trabajo" : "How I work"} />
            <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05]" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "Tres ideas" : "Three ideas"} <span className="text-white/35">{es ? "que guían cada proyecto." : "behind every project."}</span>
            </h2>
            {pinned && (
              <div className="flex items-center gap-2" aria-hidden="true">
                {items.map((p, i) => (
                  <span key={p.n} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/25"}`} />
                ))}
              </div>
            )}
          </div>
          <ol>
            {items.map((p, i) => {
              const on = reduce || i === active;
              return (
                <li key={p.n} className="relative grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)] gap-x-4 py-6 md:py-7 border-b border-white/10 first:border-t">
                  {/* aurora rule that draws across the top of the lit idea */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -top-px h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ background: AURORA, transform: `scaleX(${on && !reduce ? 1 : 0})` }}
                  />
                  <span className={`font-mono text-xs pt-2 md:pt-3 tabular-nums transition-colors duration-500 ${on ? "text-white" : "text-white/30"}`}>{p.n}</span>
                  <div>
                    <h3 className={`font-heading font-semibold text-2xl md:text-[2.4rem] leading-[1.08] -tracking-[0.035em] transition-colors duration-500 ${on ? "text-white" : "text-white/25"}`}>
                      {p.title}
                    </h3>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${pinned ? (on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0") : on ? "opacity-100" : "opacity-50"}`}>
                      <p className="overflow-hidden text-white/60 text-[15px] md:text-lg leading-relaxed max-w-xl">
                        <span className="block pt-3">{p.text}</span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

type Step = { when: string; what: string; where: string; kind: string };

/** "So far": an aurora line draws down as you scroll, and each step's dot lights when the line reaches it. */
function Timeline({ items }: { items: Step[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const light = (v: number) => {
    const ul = ref.current;
    if (!ul) return;
    const reach = (reduce ? 1 : v) * ul.offsetHeight;
    dots.current.forEach((d) => {
      if (!d) return;
      const li = d.parentElement as HTMLElement;
      d.dataset.on = String(li.offsetTop + d.offsetTop + 6 <= reach + 1);
    });
  };
  useMotionValueEvent(scrollYProgress, "change", light);
  useEffect(() => light(scrollYProgress.get()));

  return (
    <ul ref={ref} className="relative">
      <span aria-hidden="true" className="absolute left-[5px] top-0 bottom-0 w-px bg-white/10" />
      <motion.span aria-hidden="true" style={{ scaleY }} className="absolute left-[4.5px] top-0 bottom-0 w-[2px] rounded-full origin-top bg-[linear-gradient(180deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]" />
      {items.map((p, i) => (
        <li key={p.what} className="relative grid sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-1 py-6 pl-9 md:pl-11">
          <span
            ref={(el) => (dots.current[i] = el)}
            aria-hidden="true"
            data-on="false"
            className="absolute left-0 top-[1.85rem] w-[11px] h-[11px] rounded-full border border-white/25 bg-black transition-all duration-500 data-[on=true]:border-transparent data-[on=true]:bg-[#B7A8FF] data-[on=true]:shadow-[0_0_0_4px_rgba(183,168,255,0.18),0_0_18px_rgba(183,168,255,0.55)]"
          />
          <span className="text-xs text-white/45 pt-1">
            <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/35">{p.kind}</span>
            {p.when}
          </span>
          <div>
            <p className="font-heading font-semibold text-white text-lg md:text-xl -tracking-[0.02em]">{p.what}</p>
            <p className="mt-1 text-white/55 text-[15px]">{p.where}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * /sobre-mi: a short introduction, a collage of real moments, how I work,
 * the path so far and the tools I use.
 */
const AboutPageContent = () => {
  const { t, lang } = useLang();
  const es = lang === "es";
  const edu = translations.education;
  const exp = translations.experience;

  useEffect(() => {
    window.scrollTo(0, 0); // braces: newer Chrome returns a promise from scrollTo, which React would treat as a cleanup
  }, []);

  const principles = es
    ? [
        { n: "01", title: "Entender primero", text: "No empiezo escribiendo código. Primero entiendo el problema, hago bocetos y pienso en la experiencia que quiero crear." },
        { n: "02", title: "Menos es más", text: "Una interfaz limpia no es solo estética: es respetar el tiempo de quien la usa." },
        { n: "03", title: "Diseño con base técnica", text: "Lo que se ve bien tiene que funcionar bien. Diseño pensando en cómo se va a construir, y construyo cuidando cómo se ve." },
      ]
    : [
        { n: "01", title: "Understand first", text: "I don't start by writing code. I understand the problem, sketch, and think about the experience I want to create." },
        { n: "02", title: "Less is more", text: "A clean interface isn't just aesthetics: it respects the time of whoever uses it." },
        { n: "03", title: "Design with a technical base", text: "What looks good has to work well. I design thinking about how it will be built, and build caring about how it looks." },
      ];

  const path = [
    { when: t(exp.period), what: t(exp.role), where: t(exp.type), kind: es ? "Experiencia" : "Experience" },
    { when: es ? "En curso · egreso 2029" : "In progress · 2029", what: t(edu.degree.title), where: t(edu.degree.institution), kind: es ? "Educación" : "Education" },
    ...edu.certifications.map((c) => ({ when: t(c.period), what: t(c.title), where: t(c.institution), kind: es ? "Certificación" : "Certification" })),
  ];

  return (
    <>
      {/* ---------------------------------------------------------------- intro */}
      <section className="relative z-20 pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Kicker title={es ? "Sobre mí" : "About"} note="Mario Bencomo" />
          </motion.div>
          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="font-heading font-semibold text-white text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.98] -tracking-[0.05em]"
              style={{ textWrap: "balance" } as Record<string, string>}
            >
              {es ? "Hola, soy Mario." : "Hi, I'm Mario."}{" "}
              <span className="text-white/35">
                {/* the line says it: code in the mono, the designer in the serif */}
                <span className="whitespace-nowrap">
                  <span className="font-code font-medium text-[0.8em] -tracking-[0.04em]">{es ? "Código" : "Code"}</span>
                  <span aria-hidden="true" className="title-caret inline-block align-baseline ml-[0.05em] w-[0.07em] h-[0.66em] rounded-full" />
                </span>{" "}
                {es ? "con ojo de " : "with a "}
                <span className="font-serif-display font-normal italic text-white text-[1.12em] -tracking-[0.01em]">{es ? "diseñador." : "designer's eye."}</span>
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="flex flex-col gap-5 lg:pb-3"
            >
              <p className="text-white/65 text-lg leading-relaxed max-w-md">
                {es
                  ? "Soy desarrollador full stack y estudio Ingeniería en Sistemas en Culiacán. Diseño y construyo sitios y aplicaciones que no solo funcionan: se entienden, se ven bien y tienen una identidad clara."
                  : "I'm a full stack developer studying Computer Systems Engineering in Culiacán. I design and build websites and apps that don't just work: they're clear, look good and have a strong identity."}
              </p>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/70">
                <MapPin size={13} /> Culiacán, Sinaloa · <LocalTime bare />
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- collage */}
      <section className="relative z-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <ScrollRevealText
            as="h2"
            segments={[{ text: es ? "Detrás del código," : "Behind the code," }, { text: es ? "hay una persona." : "there's a person.", className: "text-white/35" }]}
            className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05] mb-8 md:mb-10"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense auto-rows-[190px] sm:auto-rows-[230px] lg:auto-rows-[250px] gap-3 md:gap-4">
            <PhotoTile className="row-span-2" src="/about/mario-mano.webp" alt="Mario Bencomo" title="Mario Bencomo" sub={es ? "Full stack · UI/UX" : "Full stack · UI/UX"} position="56% 38%" />
            <BrandFilmTile className="col-span-2" delay={0.05} />
            <PhotoTile className="row-span-2" src="/about/mario-gym.webp" alt={es ? "Mario en el gym, con audífonos" : "Mario at the gym, headphones on"} title={es ? "Fuera del escritorio" : "Away from the desk"} sub={es ? "Entrenar para despejarme" : "Training to clear my head"} delay={0.1} position="50% 45%" />

            <Tile className="bg-tint-1 p-5 md:p-7 flex flex-col justify-between" delay={0.05}>
              <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/55">{es ? "Educación" : "Education"}</span>
              <div>
                <p className="font-heading font-semibold text-white text-base md:text-xl -tracking-[0.02em] leading-snug">{es ? "Ingeniería en Sistemas Computacionales" : "Computer Systems Engineering"}</p>
                <p className="mt-1.5 text-white/60 text-xs md:text-sm">{t(edu.degree.institution)}</p>
              </div>
            </Tile>
            <Tile className="bg-tint-3 p-5 md:p-7 flex flex-col justify-between" delay={0.1}>
              <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/55">{es ? "Certificación" : "Certification"}</span>
              <div>
                <p className="font-heading font-semibold text-white text-2xl md:text-4xl -tracking-[0.04em] leading-none">B1</p>
                <p className="mt-2 text-white/60 text-xs md:text-sm">Cambridge English · {es ? "Junio 2026" : "June 2026"}</p>
              </div>
            </Tile>

            <Tile className="col-span-2 bg-sand p-6 md:p-10 flex items-end" delay={0.05}>
              <p className="font-heading font-semibold text-white text-2xl md:text-[2.1rem] leading-[1.15] -tracking-[0.03em] max-w-xl" style={{ textWrap: "balance" } as Record<string, string>}>
                {es ? "El código hace que funcione. " : "Code makes it work. "}
                <span className="text-white/40">{es ? "El diseño hace que se entienda." : "Design makes it make sense."}</span>
              </p>
            </Tile>
            <Tile className="theme-dark bg-[#0B0B0D]" delay={0.1}>
              <CuliacanSky es={es} />
            </Tile>
            <PhotoTile src="/about/castillo.webp" alt={es ? "Vitrales del Castillo de Chapultepec" : "Stained glass at Chapultepec Castle"} title={es ? "Lo que me inspira" : "What inspires me"} sub={es ? "Arquitectura, luz y detalle" : "Architecture, light and detail"} delay={0.15} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- how I work */}
      <Principles items={principles} es={es} />

      {/* ---------------------------------------------------------------- path + tools */}
      <section className="relative z-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
            <Kicker title={es ? "Trayectoria" : "Path"} />
            <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05]">
              {es ? "Hasta ahora." : "So far."}
            </h2>
          </div>
          <div className="flex flex-col gap-14">
            <Timeline items={path} />

            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45">{es ? "Con qué construyo" : "What I build with"}</span>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s.name} className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-2 pr-3.5 py-1.5 text-[13px] text-white/75 hover:text-white hover:border-white/25 transition-colors">
                    <img src={`/icons/stack/${s.icon.split("/")[1]}.svg`} alt="" loading="lazy" className="w-4 h-4 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>

            <MoreLink to="/servicios" className="w-fit">{es ? "Ver lo que puedo construir para ti" : "See what I can build for you"}</MoreLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPageContent;
