import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useNavigate } from "react-router-dom";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const techStackFeatured = ["React", "Vite", "TypeScript", "TailwindCSS", "Shadcn UI"];

export const projectsList = [
  {
    id: "project2",
    img: "/gallery/clearbuild studio.webp",
    translationKey: "project2",
    github: null,
    live: "https://your-demo-studio.vercel.app",
  },
  {
    id: "project1",
    img: "/gallery/proyecto_beauty_studio.webp",
    translationKey: "project1",
    github: null,
    live: "https://radiant-beauty-studio-main.vercel.app/",
  },
  {
    id: "project3",
    img: "/gallery/proyecto_travel_genie.webp",
    translationKey: "project3",
    github: "https://github.com/MarioCHYY/smart-travel-genie",
    live: "https://smart-travel-genie-yssl.vercel.app",
  },
  {
    id: "project4",
    img: "/gallery/amazon tracker bo.webp",
    translationKey: "project4",
    github: null,
    live: "https://t.me/MarioMacAgent_bot",
  }
];

type Txt = Record<string, string>;
type ProjData = { name: Txt; oneliner: Txt };

const ProjectCard = ({ item, index, data }: { item: (typeof projectsList)[number]; index: number; data: ProjData }) => {
  const { t } = useLang();
  const p = translations.projects;
  const navigate = useNavigate();
  return (
    <TiltCard max={4} lift={0} className="rounded-[28px] rgb-glow h-full">
      <article className="group relative h-full rounded-[28px] overflow-hidden border border-white/10 bg-[#07080c]">
        <img
          src={item.img}
          alt={t(data.name)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top scale-[1.03] group-hover:scale-[1.08] transition-transform duration-[1400ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="absolute inset-x-0 top-0 p-6 md:p-8 flex items-start justify-between">
          <span className="font-mono text-[11px] tracking-[0.24em] text-white/70 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(projectsList.length).padStart(2, "0")}
          </span>
          {item.live && (
            <a
              href={item.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver proyecto en vivo"
              className="w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col gap-3" style={{ transform: "translateZ(40px)" }}>
          <h3 className="font-heading font-semibold text-3xl md:text-5xl text-white leading-[1.02] -tracking-[0.04em] max-w-2xl" style={{ textWrap: "balance" } as Record<string, string>}>
            {t(data.name)}
          </h3>
          <p className="text-white/65 font-light text-sm md:text-base max-w-xl">{t(data.oneliner)}</p>
          <button
            onClick={() => navigate("/portafolio#" + item.id)}
            className="mt-2 w-fit bg-white text-black px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
          >
            {t(p.viewCaseStudy) || "Ver Caso de Estudio"}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </article>
    </TiltCard>
  );
};

/**
 * Selected work as a horizontal gallery: the section pins and the cards slide
 * sideways while you scroll down. On touch screens it's a native swipe row.
 */
const ProjectsSection = () => {
  const { t } = useLang();
  const p = translations.projects;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const set = () => setPinned(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const tr = trackRef.current;
      if (!tr) return;
      setDistance(Math.max(0, tr.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const xRaw = useTransform(scrollYProgress, [0.04, 0.96], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 120, damping: 26, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  const cards = projectsList.map((item, index) => {
    const projData = (p as unknown as Record<string, ProjData>)[item.translationKey];
    return { item, index, projData };
  });

  const header = (
    <motion.div style={pinned ? { y: headY } : undefined}>
      <SectionHeading
        index="03"
        label={t(p.label)}
        title={t(p.title)}
        muted={t({ en: "Recent projects.", es: "Proyectos recientes." })}
        aside={
          <span className="hidden md:inline-flex items-center gap-3 text-[10px] font-mono tracking-[0.22em] uppercase text-white/40 pb-2">
            {t({ en: "Scroll to explore", es: "Desliza para explorar" })}
            <span className="w-10 h-px bg-white/30" />
          </span>
        }
      />
    </motion.div>
  );

  if (!pinned) {
    return (
      <section id="projects" className="theme-dark bg-paper relative py-24">
        <div className="relative z-20 px-6">{header}</div>
        <div className="relative z-20 mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-6 [scrollbar-width:none]">
          {cards.map(({ item, index, projData }) => (
            <div key={item.id} className="snap-center shrink-0 w-[84vw] h-[62svh]">
              <ProjectCard item={item} index={index} data={projData} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="theme-dark bg-paper relative" style={{ height: `${100 + projectsList.length * 70}vh` }}>
      <div className="sticky top-0 z-20 h-[100svh] overflow-hidden flex flex-col justify-center gap-10">
        <div className="relative z-20 max-w-7xl w-full mx-auto px-8 pt-20">{header}</div>
        <motion.div ref={trackRef} style={{ x }} className="relative z-20 flex gap-8 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[12vw] will-change-transform">
          {cards.map(({ item, index, projData }) => (
            <div key={item.id} className="shrink-0 w-[min(68vw,980px)] h-[58svh] max-h-[620px]">
              <ProjectCard item={item} index={index} data={projData} />
            </div>
          ))}
          <div className="shrink-0 w-[min(30vw,380px)] h-[58svh] max-h-[620px] flex flex-col justify-center gap-5">
            <p className="font-heading font-semibold text-3xl text-white leading-tight -tracking-[0.03em]">{t({ en: "Want to see the full story?", es: "¿Quieres ver la historia completa?" })}</p>
            <a href="/portafolio" className="w-fit inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
              {t({ en: "All projects", es: "Todos los proyectos" })}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
        <div className="relative z-20 max-w-7xl w-full mx-auto px-8">
          <div className="h-px bg-white/10 overflow-hidden">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-[linear-gradient(90deg,#8fb0ff,#b7a8ff,#ff9ab0,#ffc48a)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
