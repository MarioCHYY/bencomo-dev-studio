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
      <section id="projects" className="section-padding relative">
        <div className="absolute left-0 right-0 top-0 cyber-divider" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-primary text-xs font-mono">{t(p.label)}</span>
              <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              <span className="text-primary mr-3">{"//"}</span>
              <span className="glow-text">{t(p.title)}</span>
            </h2>
          </motion.div>

          {/* Project card - full width dramatic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative border border-border/40 hover:border-primary/40 transition-all duration-500 overflow-hidden"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="status-online" />
                    <span className="text-[10px] text-primary tracking-widest uppercase font-mono">
                      {t(p.featured)}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 group-hover:glow-text transition-all">
                    {t(proj.name)}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
                    {t(proj.oneliner)}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <a
                    href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:glow transition-all text-muted-foreground"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://radiant-beauty-studio-main.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:glow transition-all text-muted-foreground"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[10px] font-mono border border-primary/20 text-primary/70 bg-primary/[0.03] hover:bg-primary/10 hover:border-primary/40 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setCaseStudyOpen(true)}
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-mono font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-12 font-mono group"
              >
                <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                {t(p.backToProjects)}
              </motion.button>

              {/* Case study hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16"
              >
                <span className="text-[10px] text-primary tracking-widest uppercase font-mono">
                  {t(p.featured)}
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-3 glow-text leading-tight">{t(proj.name)}</h1>
                <p className="text-muted-foreground text-sm mt-3">{t(proj.role)}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-mono border border-primary/20 text-primary/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Content blocks */}
              <div className="space-y-10">
                {[
                  { icon: <Target size={18} />, title: t(proj.problemTitle), content: <p className="text-muted-foreground text-sm leading-relaxed">{t(proj.problem)}</p> },
                  { icon: <Lightbulb size={18} />, title: t(proj.solutionTitle), content: <ul className="space-y-2">{(t(proj.solutions) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 text-muted-foreground text-sm"><span className="text-primary text-xs mt-1 shrink-0">▸</span>{s}</li>))}</ul> },
                  { icon: <Rocket size={18} />, title: t(proj.impactTitle), content: <ul className="space-y-2">{(t(proj.impacts) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 text-muted-foreground text-sm"><span className="text-primary text-xs mt-1 shrink-0">▸</span>{s}</li>))}</ul> },
                  { icon: <BookOpen size={18} />, title: t(proj.learnedTitle), content: <ul className="space-y-2">{(t(proj.learned) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-3 text-muted-foreground text-sm"><span className="text-primary text-xs mt-1 shrink-0">▸</span>{s}</li>))}</ul> },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="relative pl-6 border-l border-border/30 hover:border-primary/40 transition-colors"
                  >
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-background border border-primary/60 rotate-45" />
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary">{block.icon}</span>
                      <h3 className="text-lg font-bold text-foreground">{block.title}</h3>
                    </div>
                    {block.content}
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div className="flex gap-3 mt-14 pt-8 border-t border-border/30">
                <a
                  href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-border text-foreground text-xs font-mono hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                >
                  <Github size={14} /> {t(p.viewCode)}
                </a>
                <a
                  href="https://radiant-beauty-studio-main.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-primary-foreground text-xs font-mono font-bold hover:shadow-[0_0_30px_hsl(120_100%_50%/0.4)] transition-all flex items-center gap-2"
                >
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
