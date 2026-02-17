import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Lightbulb, Target, Rocket, BookOpen, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ProjectsSection = () => {
  const { t } = useLang();
  const p = translations.projects;
  const proj = p.project1;
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const techStack = ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git"];

  return (
    <>
      <section id="projects" className="section-padding relative grid-bg">
        <div className="absolute left-0 right-0 top-0 cyber-divider" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-primary text-xs font-display tracking-[0.3em]">{t(p.label)}</span>
              <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">
              <span className="cyber-gradient-text neon-text">{t(p.title)}</span>
            </h2>
          </motion.div>

          {/* Project card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group glass rounded-sm corner-accents overflow-hidden hover:neon-glow transition-all duration-500"
          >
            {/* Gradient top bar */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="p-8 md:p-12 holo-shimmer">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="status-online" />
                    <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-display neon-text">
                      {t(p.featured)}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-foreground mb-2 group-hover:neon-text transition-all tracking-wide">
                    {t(proj.name)}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-lg leading-relaxed font-body">
                    {t(proj.oneliner)}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <a href="https://github.com/MarioCHYY/radiant-beauty-studio-main" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-sm flex items-center justify-center hover:border-primary/40 hover:text-primary hover:neon-glow transition-all text-muted-foreground">
                    <Github size={16} />
                  </a>
                  <a href="https://radiant-beauty-studio-main.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-sm flex items-center justify-center hover:border-primary/40 hover:text-primary hover:neon-glow transition-all text-muted-foreground">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-[10px] font-display tracking-wider glass rounded-sm text-primary/70 hover:text-primary hover:border-primary/30 transition-all">
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setCaseStudyOpen(true)}
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-display font-semibold tracking-wider rounded-sm hover:bg-primary hover:text-primary-foreground hover:neon-glow-strong transition-all duration-300"
              >
                {t(p.viewCaseStudy)}
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {caseStudyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md overflow-y-auto grid-bg"
          >
            <div className="max-w-4xl mx-auto px-6 py-16">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setCaseStudyOpen(false)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-12 font-display tracking-wider group"
              >
                <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                {t(p.backToProjects)}
              </motion.button>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
                <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-display neon-text">{t(p.featured)}</span>
                <h1 className="text-3xl md:text-5xl font-display font-black mt-3 cyber-gradient-text neon-text leading-tight">{t(proj.name)}</h1>
                <p className="text-muted-foreground text-sm mt-3 font-body">{t(proj.role)}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-display tracking-wider glass rounded-sm text-primary/60">{tech}</span>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-8">
                {[
                  { icon: <Target size={18} />, title: t(proj.problemTitle), content: <p className="text-muted-foreground text-sm leading-relaxed font-body">{t(proj.problem)}</p> },
                  { icon: <Lightbulb size={18} />, title: t(proj.solutionTitle), content: <ul className="space-y-2">{(t(proj.solutions) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 text-muted-foreground text-sm font-body"><span className="text-primary text-xs mt-1 shrink-0">▸</span>{s}</li>))}</ul> },
                  { icon: <Rocket size={18} />, title: t(proj.impactTitle), content: <ul className="space-y-2">{(t(proj.impacts) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 text-muted-foreground text-sm font-body"><span className="text-secondary text-xs mt-1 shrink-0">▸</span>{s}</li>))}</ul> },
                  { icon: <BookOpen size={18} />, title: t(proj.learnedTitle), content: <ul className="space-y-2">{(t(proj.learned) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 text-muted-foreground text-sm font-body"><span className="text-cyan text-xs mt-1 shrink-0">▸</span>{s}</li>))}</ul> },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="glass rounded-sm p-6 border border-border/30 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary">{block.icon}</span>
                      <h3 className="text-lg font-display font-bold text-foreground tracking-wide">{block.title}</h3>
                    </div>
                    {block.content}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 mt-14 pt-8 border-t border-border/30">
                <a href="https://github.com/MarioCHYY/radiant-beauty-studio-main" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 glass rounded-sm text-foreground text-xs font-display tracking-wider hover:border-primary/40 hover:text-primary transition-all flex items-center gap-2">
                  <Github size={14} /> {t(p.viewCode)}
                </a>
                <a href="https://radiant-beauty-studio-main.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-sm text-xs font-display tracking-wider font-bold hover:neon-glow-strong transition-all flex items-center gap-2">
                  <ExternalLink size={14} /> {t(p.liveDemo)}
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
