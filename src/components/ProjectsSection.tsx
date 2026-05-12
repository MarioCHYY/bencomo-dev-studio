import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Lightbulb, Target, Rocket, BookOpen, Lock, ArrowUpRight, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const techStackFeatured = ["React", "Vite", "TypeScript", "TailwindCSS", "Shadcn UI"];

// Secondary projects for the Bento Grid
const secondaryProjects = [
  {
    id: "project1",
    title: { en: "Beauty Studio", es: "Beauty Studio" },
    description: {
      en: "Business website for a professional cosmetologist focused on trust, clarity, and mobile-first performance.",
      es: "Sitio web de negocio para una cosmetóloga profesional enfocado en confianza, claridad y rendimiento mobile-first.",
    },
    tags: ["React", "TypeScript", "TailwindCSS", "Node.js"],
    image: "/beauty_studio_preview.png",
    github: null,
    live: "https://radiant-beauty-studio-main.vercel.app/",
    status: "live",
  },
  {
    id: "project3",
    title: { en: "Smart Travel Genie", es: "Smart Travel Genie" },
    description: {
      en: "AI-powered travel planning assistant that generates custom itineraries based on your preferences.",
      es: "Asistente de viajes con IA que genera itinerarios personalizados basados en tus preferencias.",
    },
    tags: ["React", "FastAPI", "Playwright", "Gemini Pro"],
    image: "/travel_genie_preview.png",
    github: "https://github.com/MarioCHYY/smart-travel-genie",
    live: "https://smart-travel-genie-yssl.vercel.app",
    status: "live",
  },
  {
    id: "project4",
    title: { en: "Amazon Tracker Bot", es: "Amazon Tracker Bot" },
    description: {
      en: "Python bot for real-time web scraping, price monitoring, and automated alerts for Amazon products.",
      es: "Bot en Python especializado en web scraping, monitoreo de precios y alertas automáticas para productos de Amazon.",
    },
    tags: ["Python", "SQLite", "Matplotlib", "Telegram API"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    github: null,
    live: "https://t.me/MarioMacAgent_bot",
    status: "live",
  },
  {
    id: "kalo",
    title: { en: "Kalo AI App", es: "App Kalo AI" },
    description: {
      en: "Conversational AI health coach with persistent memory, body tracking and adaptive nutrition plans.",
      es: "Coach de salud con IA conversacional, memoria persistente, seguimiento corporal y planes de nutrición adaptativos.",
    },
    tags: ["React Native", "Gemini API"],
    image: null,
    github: null,
    live: null,
    status: "upcoming",
  },
  {
    id: "empty-1", title: { en: "", es: "" }, description: { en: "", es: "" }, tags: [], image: null, github: null, live: null, status: "empty"
  },
  {
    id: "empty-2", title: { en: "", es: "" }, description: { en: "", es: "" }, tags: [], image: null, github: null, live: null, status: "empty"
  },
  {
    id: "empty-3", title: { en: "", es: "" }, description: { en: "", es: "" }, tags: [], image: null, github: null, live: null, status: "empty"
  },
  {
    id: "empty-4", title: { en: "", es: "" }, description: { en: "", es: "" }, tags: [], image: null, github: null, live: null, status: "empty"
  }
];

const ProjectsSection = () => {
  const { t, lang } = useLang();
  const p = translations.projects;
  const proj = p.project2;
  const [caseStudyOpen, setCaseStudyOpen] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const PROJECTS_PER_PAGE = 4;
  const totalPages = Math.max(1, Math.ceil(secondaryProjects.length / PROJECTS_PER_PAGE));
  const currentSecondaryProjects = secondaryProjects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  );
  
  // Get active project data for modal
  const getActiveProject = () => {
    if (!caseStudyOpen) return null;
    if (caseStudyOpen === 'project1') return p.project1;
    if (caseStudyOpen === 'project2') return p.project2;
    if (caseStudyOpen === 'project3') return p.project3;
    if (caseStudyOpen === 'project4') return p.project4;
    return p.project1;
  };
  const activeProj = getActiveProject();

  return (
    <>
      <section id="projects" className="section-padding relative">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[11px] text-primary font-bold tracking-[0.3em] uppercase">
                {t(p.label) || "Selected Portfolio"}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[84px] font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.04em] leading-none transition-colors duration-500">
                {t(p.title)}
              </h2>
              <p className="font-light text-base md:text-lg dark:text-[#A0A5B0] text-[#505060] max-w-2xl mt-4 transition-colors duration-500">
                 {t(p.subtitle)}
              </p>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white text-black disabled:opacity-30 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentPage === idx 
                        ? "w-6 bg-primary shadow-[0_0_10px_rgba(51,141,255,0.8)]" 
                        : "w-2 dark:bg-white/20 bg-black/20"
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white text-black disabled:opacity-30 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Grid Layout (3 columns) — Featured FIRST */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* Featured Project (2 Cols) — PRIMERO */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-1 md:col-span-2 group"
            >
              <article className="glass-panel rounded-xl overflow-hidden h-full flex flex-col md:flex-row hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-[400px] overflow-hidden">
                  <img
                    src="/atelier_preview.png"
                    alt={t(proj.name) as string}
                    className="w-full h-full absolute inset-0 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r dark:from-black/80 from-transparent to-transparent md:bg-gradient-to-t dark:opacity-60 opacity-0 transition-opacity duration-500" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center gap-4 md:gap-6">
                  <span className="text-primary text-[10px] md:text-[12px] font-bold uppercase tracking-[0.1em]">
                    {t(p.featured) || "Proyecto Destacado"}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl dark:text-white text-[#0A0A0A] transition-colors duration-300 leading-tight">
                    {t(proj.name)}
                  </h3>
                  <p className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base lg:text-lg font-light leading-relaxed transition-colors duration-500 line-clamp-3">
                    {t(proj.oneliner)}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <button
                      onClick={() => setCaseStudyOpen('project2')}
                      className="bg-primary/10 text-primary border border-primary/20 px-6 py-2.5 rounded-full text-[10px] md:text-[12px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] flex-1 text-center"
                    >
                      {t(p.viewCaseStudy) || "Ver Caso de Estudio"}
                    </button>
                    <a
                      href="https://your-demo-studio.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border dark:border-white/20 border-black/20 dark:text-white text-[#0A0A0A] px-6 py-2.5 rounded-full text-[10px] md:text-[12px] font-bold uppercase tracking-widest dark:hover:bg-white/5 hover:bg-black/5 transition-all flex items-center justify-center"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </article>
            </motion.div>

            {/* Secondary Projects — DESPUÉS */}
            {currentSecondaryProjects.map((sp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * (index + 1) }}
                className="col-span-1 group transition-all duration-500"
              >
                {sp.status === "live" ? (
                  <article className="glass-panel rounded-xl overflow-hidden h-full flex flex-col hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                    <div className="relative aspect-[1.54] overflow-hidden">
                      <img
                        src={sp.image as string}
                        alt={sp.title.en}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t dark:from-black/90 via-black/40 to-transparent dark:opacity-80 opacity-0 transition-opacity duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-heading font-bold text-xl dark:text-white text-[#0A0A0A] transition-colors duration-300">
                          {lang === "es" ? sp.title.es : sp.title.en}
                        </h3>
                        <div className="flex gap-4 shrink-0 ml-2">
                          {sp.github && (
                            <a href={sp.github} target="_blank" rel="noopener noreferrer" className="dark:text-[#A0A5B0] text-[#505060] hover:text-primary transition-colors">
                              <Github size={18} />
                            </a>
                          )}
                          {sp.live && (
                            <a href={sp.live} target="_blank" rel="noopener noreferrer" className="dark:text-[#A0A5B0] text-[#505060] hover:text-primary transition-colors">
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-sm md:text-base lg:text-lg dark:text-[#A0A5B0] text-[#505060] font-light leading-relaxed mb-6 transition-colors duration-500 line-clamp-3">
                        {lang === "es" ? sp.description.es : sp.description.en}
                      </p>
                      <div className="mt-auto flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                          {sp.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 rounded-full text-[10px] font-bold tracking-widest text-primary uppercase transition-colors duration-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setCaseStudyOpen(sp.id)}
                          className="w-full bg-primary/10 text-primary border border-primary/20 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] flex justify-center items-center gap-2"
                        >
                          {t(p.viewCaseStudy) || "Ver Caso de Estudio"}
                        </button>
                      </div>
                    </div>
                  </article>
                ) : sp.status === "upcoming" ? (
                  <article className="glass-panel rounded-xl overflow-hidden h-full flex flex-col justify-center items-center text-center p-8 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 min-h-[300px] relative group/kalo">
                    {/* iPhone Mockup Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover/kalo:opacity-40 transition-opacity duration-700 pointer-events-none scale-110">
                      <div className="w-[180px] h-[360px] rounded-[30px] border-4 border-white/20 bg-black/80 shadow-2xl relative overflow-hidden flex items-center justify-center">
                        <div className="absolute top-2 w-16 h-4 bg-black rounded-full z-10" /> {/* Notch */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_20px_rgba(74,222,128,0.5)] flex items-center justify-center z-20">
                          <Leaf size={32} color="white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-30 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full dark:bg-green-500/10 bg-green-500/10 border dark:border-green-500/20 border-green-500/20 flex items-center justify-center mb-6 transition-colors duration-500 shadow-[0_0_30px_rgba(74,222,128,0.15)] backdrop-blur-md">
                        <Leaf className="text-green-500" size={24} />
                      </div>
                      <h3 className="font-heading font-bold text-2xl dark:text-white text-[#0A0A0A] transition-colors duration-300 mb-2">
                        {lang === "es" ? sp.title.es : sp.title.en}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg dark:text-[#A0A5B0] text-[#505060] font-light transition-colors duration-500 mb-6">
                        {lang === "es" ? "Próximamente / En Desarrollo" : "Coming Soon / In Development"}
                      </p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold tracking-widest text-green-500 uppercase">React Native</span>
                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold tracking-widest text-blue-500 uppercase">AI</span>
                      </div>
                    </div>
                  </article>
                ) : (
                  <article className="rounded-xl overflow-hidden h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed dark:border-white/10 border-black/10 transition-all duration-500 min-h-[300px]">
                    <div className="w-16 h-16 rounded-full dark:bg-white/5 bg-black/5 flex items-center justify-center mb-6 relative">
                      <div className="w-6 h-0.5 dark:bg-white/20 bg-black/20 absolute" />
                      <div className="h-6 w-0.5 dark:bg-white/20 bg-black/20 absolute" />
                    </div>
                    <h3 className="font-heading font-bold text-lg dark:text-[#A0A5B0] text-[#505060] transition-colors duration-300">
                      {lang === "es" ? "Espacio Disponible" : "Available Space"}
                    </h3>
                  </article>
                )}
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {caseStudyOpen && activeProj && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 dark:bg-[#050505]/95 bg-[#F8F8F8]/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setCaseStudyOpen(null)}
                className="flex items-center gap-2 text-sm font-medium dark:text-white/45 text-[#505060] dark:hover:text-white hover:text-[#0A0A0A] hover:underline transition-colors mb-12 group"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                {t(p.backToProjects)}
              </motion.button>

              {/* Case study hero */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16"
              >
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full border border-primary/20">
                  {t(p.featured)}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold dark:text-white text-[#0A0A0A] mt-6 -tracking-[0.03em] leading-tight transition-colors duration-500">{t(activeProj.name)}</h1>
                <p className="dark:text-[#A0A5B0] text-[#505060] text-base mt-3 font-light transition-colors duration-500">{t(activeProj.role)}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {techStackFeatured.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-[10px] font-bold border dark:border-[rgba(255,255,255,0.08)] border-[rgba(0,0,0,0.08)] dark:text-[rgba(255,255,255,0.4)] text-[#505060] dark:bg-[rgba(255,255,255,0.02)] bg-[rgba(0,0,0,0.02)] rounded-full transition-colors duration-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Content blocks */}
              <div className="space-y-12">
                {[
                  { icon: <Target size={18} />, title: t(activeProj.problemTitle), content: <p className="dark:text-[#A0A5B0] text-[#505060] text-sm leading-relaxed font-light transition-colors duration-500">{t(activeProj.problem)}</p> },
                  { icon: <Lightbulb size={18} />, title: t(activeProj.solutionTitle), content: <ul className="space-y-3">{(t(activeProj.solutions) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 dark:text-[#A0A5B0] text-[#505060] text-sm font-light transition-colors duration-500"><span className="text-primary/60 text-[10px] mt-1 shrink-0">●</span>{s}</li>))}</ul> },
                  { icon: <Rocket size={18} />, title: t(activeProj.impactTitle), content: <ul className="space-y-3">{(t(activeProj.impacts) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 dark:text-[#A0A5B0] text-[#505060] text-sm font-light transition-colors duration-500"><span className="text-primary/60 text-[10px] mt-1 shrink-0">●</span>{s}</li>))}</ul> },
                  { icon: <BookOpen size={18} />, title: t(activeProj.learnedTitle), content: <ul className="space-y-3">{(t(activeProj.learned) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 dark:text-[#A0A5B0] text-[#505060] text-sm font-light transition-colors duration-500"><span className="text-primary/60 text-[10px] mt-1 shrink-0">●</span>{s}</li>))}</ul> },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="relative pl-6 border-l-2 border-primary/20"
                  >
                    <div className="absolute -left-[7.5px] top-1 w-3 h-3 rounded-full border-2 border-primary dark:bg-[#050505] bg-[#F8F8F8]" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-primary bg-primary/10 border border-primary/20 p-2 rounded-full">{block.icon}</span>
                      <h3 className="text-xl font-heading font-extrabold dark:text-white text-[#0A0A0A] transition-colors duration-500">{block.title}</h3>
                    </div>
                    <div className="pl-11">
                      {block.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div className="flex flex-wrap gap-4 mt-16 pt-8 border-t dark:border-white/[0.05] border-black/[0.05]">

                  <a
                    href={
                      caseStudyOpen === 'project1' ? "https://radiant-beauty-studio-main.vercel.app/" :
                      caseStudyOpen === 'project2' ? "https://your-demo-studio.vercel.app" :
                      caseStudyOpen === 'project3' ? "https://smart-travel-genie-yssl.vercel.app" :
                      caseStudyOpen === 'project4' ? "https://t.me/MarioMacAgent_bot" : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(51,141,255,0.3)]"
                  >
                    <ExternalLink size={16} /> {t(p.liveDemo)}
                  </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
