import { motion } from "framer-motion";
import { ExternalLink, Target, Lightbulb, Rocket, BookOpen } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { projectsList, techStackFeatured } from "@/components/ProjectsSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionSeparator from "@/components/SectionSeparator";

const PortfolioPageContent = () => {
  const { t } = useLang();
  const p = translations.projects;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 pt-32 md:pt-48 relative z-10">
        <div className="mb-8 text-left">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold dark:text-white text-[#0A0A0A] tracking-tight">{t(p.title)}</h1>
          <p className="mt-4 text-lg dark:text-[#A0A5B0] text-[#505060] font-light max-w-2xl">{t(p.subtitle)}</p>
        </div>
      </div>

      <SectionSeparator />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="space-y-32 pt-16 pb-32">
        {projectsList.map((proj, index) => {
          // @ts-ignore
          const activeProj = p[proj.translationKey];
          
          return (
            <div key={proj.id} id={proj.id} className="flex flex-col items-center max-w-5xl mx-auto w-full gap-12 lg:gap-16 scroll-mt-32">
              {/* Header: Centered */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col items-center text-center w-full"
              >
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full border border-primary/20 mb-6">
                  {t(p.featured)}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] leading-none transition-colors duration-500 uppercase">
                  {t(activeProj.name)}
                </h2>
                <p className="dark:text-[#A0A5B0] text-[#505060] text-base sm:text-lg mt-4 font-medium transition-colors duration-500">
                  {t(activeProj.role)}
                </p>
              </motion.div>

              {/* Image: Full Width Centered */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full relative"
              >
                <div className="relative rounded-xl sm:rounded-3xl overflow-hidden border dark:border-white/10 border-black/10 shadow-[0_0_50px_rgba(51,141,255,0.1)]">
                  <img 
                    src={proj.img} 
                    alt={t(activeProj.name) as string} 
                    className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Subtle glow overlay matching the reference */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none mix-blend-overlay" />
                </div>
              </motion.div>

              {/* Tech Stack: Centered Below Image */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 w-full"
              >
                {techStackFeatured.map((tech) => (
                  <span key={tech} className="px-4 py-2 text-[11px] font-bold border dark:border-white/10 border-black/10 dark:text-white/60 text-black/60 dark:bg-[#111111] bg-[#F0F0F0] rounded-md transition-colors duration-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" /> {tech}
                  </span>
                ))}
              </motion.div>

              {/* Content Blocks: Timeline Style */}
              <div className="w-full max-w-3xl mx-auto mt-12 space-y-12">
                {[
                  { icon: <Target size={18} />, title: t(activeProj.problemTitle), content: <p className="dark:text-[#A0A5B0] text-[#505060] text-base leading-relaxed font-light transition-colors duration-500">{t(activeProj.problem)}</p> },
                  { icon: <Lightbulb size={18} />, title: t(activeProj.solutionTitle), content: <ul className="space-y-4">{(t(activeProj.solutions) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 dark:text-[#A0A5B0] text-[#505060] text-base font-light transition-colors duration-500"><span className="text-primary/60 text-[10px] mt-1.5 shrink-0">●</span>{s}</li>))}</ul> },
                  { icon: <Rocket size={18} />, title: t(activeProj.impactTitle), content: <ul className="space-y-4">{(t(activeProj.impacts) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 dark:text-[#A0A5B0] text-[#505060] text-base font-light transition-colors duration-500"><span className="text-primary/60 text-[10px] mt-1.5 shrink-0">●</span>{s}</li>))}</ul> },
                  { icon: <BookOpen size={18} />, title: t(activeProj.learnedTitle), content: <ul className="space-y-4">{(t(activeProj.learned) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 dark:text-[#A0A5B0] text-[#505060] text-base font-light transition-colors duration-500"><span className="text-primary/60 text-[10px] mt-1.5 shrink-0">●</span>{s}</li>))}</ul> },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative pl-8 md:pl-12 border-l border-primary/30"
                  >
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-[3px] border-primary dark:bg-[#0A0A0A] bg-[#F8F8F8]" />
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-primary bg-primary/10 border border-primary/20 p-2.5 rounded-full flex items-center justify-center">
                        {block.icon}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold dark:text-white text-[#0A0A0A] transition-colors duration-500 tracking-tight">
                        {block.title}
                      </h3>
                    </div>
                    <div className="pl-2">
                      {block.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTAs / Footer inside Project */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-12 pt-8 border-t dark:border-white/10 border-black/10">
                  <div className="font-heading font-bold text-xl dark:text-white text-black mb-4 sm:mb-0">
                    {t(activeProj.name)}
                  </div>
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase font-bold dark:text-white/60 text-black/60 hover:text-primary transition-colors">
                        Github
                      </a>
                    )}
                    {proj.live && (
                      <a href={proj.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(51,141,255,0.3)] hover:shadow-[0_0_30px_rgba(51,141,255,0.5)]">
                        {t(p.liveDemo)} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default PortfolioPageContent;
