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
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-3xl mb-3 block">🖥️</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              <span className="pop-gradient-text">{t(p.title)}</span>
            </h2>
            <p className="font-handwriting text-lg text-secondary/80 mt-2 rotate-[-1deg]">
              {t({ en: "What's on my desk right now", es: "Lo que hay en mi escritorio" })}
            </p>
          </motion.div>

          {/* Featured project card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="room-card overflow-hidden"
          >
            {/* Gradient accent bar */}
            <div className="h-1.5 pop-gradient" />

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-6">
                <div>
                  <span className="sticker bg-primary/10 text-primary border border-primary/20 mb-3">
                    ✨ {t(p.featured)}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-3">
                    {t(proj.name)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-lg leading-relaxed">
                    {t(proj.oneliner)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted/60 hover:border-primary/40 transition-all text-muted-foreground hover:text-primary"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://radiant-beauty-studio-main.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted/60 hover:border-secondary/40 transition-all text-muted-foreground hover:text-secondary"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="sticker bg-secondary/10 text-secondary border border-secondary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setCaseStudyOpen(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-display font-semibold rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                {t(p.viewCaseStudy)}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md overflow-y-auto dotted-bg"
          >
            <div className="max-w-3xl mx-auto px-6 py-16">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setCaseStudyOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 font-display group"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                {t(p.backToProjects)}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <span className="sticker bg-primary/10 text-primary border border-primary/20 mb-3">
                  ✨ {t(p.featured)}
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-bold mt-3 pop-gradient-text leading-tight">{t(proj.name)}</h1>
                <p className="text-muted-foreground text-sm mt-3">{t(proj.role)}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {techStack.map((tech) => (
                    <span key={tech} className="sticker bg-secondary/10 text-secondary border border-secondary/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-8">
                {[
                  { icon: <Target size={18} />, title: t(proj.problemTitle), content: <p className="text-muted-foreground text-sm leading-relaxed">{t(proj.problem)}</p>, color: "border-primary/30 bg-primary/5" },
                  { icon: <Lightbulb size={18} />, title: t(proj.solutionTitle), content: <ul className="space-y-2">{(t(proj.solutions) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-2 text-muted-foreground text-sm"><span className="text-primary">•</span>{s}</li>))}</ul>, color: "border-accent/30 bg-accent/5" },
                  { icon: <Rocket size={18} />, title: t(proj.impactTitle), content: <ul className="space-y-2">{(t(proj.impacts) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-2 text-muted-foreground text-sm"><span className="text-secondary">•</span>{s}</li>))}</ul>, color: "border-secondary/30 bg-secondary/5" },
                  { icon: <BookOpen size={18} />, title: t(proj.learnedTitle), content: <ul className="space-y-2">{(t(proj.learned) as string[]).map((s, i) => (<li key={i} className="flex items-start gap-2 text-muted-foreground text-sm"><span className="text-purple">•</span>{s}</li>))}</ul>, color: "border-purple/30 bg-purple/5" },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`p-6 rounded-2xl border ${block.color}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary">{block.icon}</span>
                      <h3 className="text-base font-display font-bold text-foreground">{block.title}</h3>
                    </div>
                    {block.content}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 mt-12 pt-8 border-t border-border/30">
                <a
                  href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-border rounded-full text-foreground text-sm font-display font-medium hover:border-primary/40 transition-all flex items-center gap-2"
                >
                  <Github size={14} /> {t(p.viewCode)}
                </a>
                <a
                  href="https://radiant-beauty-studio-main.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-display font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
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
