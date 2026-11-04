import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
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
  return (
    <Tile className={`theme-dark bg-[#0B0B0D] ${className ?? ""}`} delay={delay}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" style={{ objectPosition: position }} />
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

/**
 * /sobre-mi: a short introduction, a collage of real moments, how I work,
 * the path so far and the tools I use.
 */
const AboutPageContent = () => {
  const { t, lang } = useLang();
  const es = lang === "es";
  const edu = translations.education;
  const exp = translations.experience;

  useEffect(() => window.scrollTo(0, 0), []);

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
              {es ? "Hola, soy Mario." : "Hi, I'm Mario."} <span className="text-white/35">{es ? "Código con ojo de diseñador." : "Code with a designer's eye."}</span>
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
                <MapPin size={13} /> Culiacán, Sinaloa · MX
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- collage */}
      <section className="relative z-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05] mb-8 md:mb-10" style={{ textWrap: "balance" } as Record<string, string>}>
            {es ? "Detrás del código," : "Behind the code,"} <span className="text-white/35">{es ? "hay una persona." : "there's a person."}</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense auto-rows-[190px] sm:auto-rows-[230px] lg:auto-rows-[250px] gap-3 md:gap-4">
            <PhotoTile className="row-span-2" src="/about/retrato.webp" alt="Mario Bencomo" title="Mario Bencomo" sub={es ? "Full stack · UI/UX" : "Full stack · UI/UX"} position="50% 25%" />
            <BrandFilmTile className="col-span-2" delay={0.05} />
            <PhotoTile className="row-span-2" src="/about/laptop.webp" alt={es ? "Mario programando" : "Mario coding"} title={es ? "Donde pasa todo" : "Where it all happens"} sub={es ? "Diseño y código en el mismo lugar" : "Design and code in one place"} delay={0.1} />

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
            <PhotoTile src="/about/amigos.webp" alt={es ? "Mario con amigos" : "Mario with friends"} title={es ? "Fuera del teclado" : "Away from the keyboard"} delay={0.1} position="50% 40%" />
            <PhotoTile src="/about/castillo.webp" alt={es ? "Vitrales del Castillo de Chapultepec" : "Stained glass at Chapultepec Castle"} title={es ? "Lo que me inspira" : "What inspires me"} sub={es ? "Arquitectura, luz y detalle" : "Architecture, light and detail"} delay={0.15} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- how I work */}
      <section className="relative z-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 lg:gap-20">
          <div className="flex flex-col gap-6">
            <Kicker title={es ? "Cómo trabajo" : "How I work"} />
            <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05]" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "Tres ideas" : "Three ideas"} <span className="text-white/35">{es ? "que guían cada proyecto." : "behind every project."}</span>
            </h2>
          </div>
          <ol className="border-t border-white/10">
            {principles.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_15rem_1fr] gap-x-4 gap-y-2 py-7 border-b border-white/10"
              >
                <span className="font-mono text-xs text-white/40 pt-1 tabular-nums">{p.n}</span>
                <h3 className="font-heading font-semibold text-white text-xl -tracking-[0.02em]">{p.title}</h3>
                <p className="col-start-2 md:col-start-auto text-white/55 text-[15px] leading-relaxed">{p.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- path + tools */}
      <section className="relative z-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 lg:gap-20">
          <div className="flex flex-col gap-6">
            <Kicker title={es ? "Trayectoria" : "Path"} />
            <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05]">
              {es ? "Hasta ahora." : "So far."}
            </h2>
          </div>
          <div className="flex flex-col gap-14">
            <ul className="border-t border-white/10">
              {path.map((p, i) => (
                <motion.li
                  key={p.what}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                  className="grid sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-white/10"
                >
                  <span className="text-xs text-white/45 pt-1">
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/35">{p.kind}</span>
                    {p.when}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-white text-lg md:text-xl -tracking-[0.02em]">{p.what}</p>
                    <p className="mt-1 text-white/55 text-[15px]">{p.where}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45">{es ? "Con qué construyo" : "What I build with"}</span>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s.name} className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-2 pr-3.5 py-1.5 text-[13px] text-white/75 hover:text-white hover:border-white/25 transition-colors">
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}.svg`} alt="" loading="lazy" className="w-4 h-4 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/servicios"
              className="group w-fit inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors"
            >
              {es ? "Ver lo que puedo construir para ti" : "See what I can build for you"}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPageContent;
