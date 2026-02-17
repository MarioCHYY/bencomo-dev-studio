import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Lightbulb, Target, Rocket, BookOpen } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const { t } = useLang();
  const p = translations.projects;
  const proj = p.project1;
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
    <>
      <section id="projects" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-primary text-xs">{t(p.label)}</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
              <span className="text-primary mr-2">#</span>{t(p.title)}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-window hover:border-primary/40 transition-all duration-500">
              <div className="terminal-header">
                <span className="terminal-dot bg-destructive/80" />
                <span className="terminal-dot bg-yellow-500/80" />
                <span className="terminal-dot bg-primary/80" />
                <span className="ml-3">project_featured.md</span>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-primary px-2 py-0.5 border border-primary/30 bg-primary/5">
                      {t(p.featured)}
                    </span>
                    <h3 className="text-lg font-bold mt-3 text-foreground">{t(proj.name)}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 max-w-xl">
                      <span className="text-primary mr-1">{">"}</span>
                      {t(proj.oneliner)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href="https://radiant-beauty-studio-main.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <button
                  onClick={() => setCaseStudyOpen(true)}
                  className="px-5 py-2 border border-primary text-primary text-xs font-mono hover:bg-primary hover:text-primary-foreground transition-all glow"
                >
                  $ {t(p.viewCaseStudy)}
                </button>
              </div>
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
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-12">
              <button
                onClick={() => setCaseStudyOpen(false)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-8 font-mono"
              >
                <span className="text-primary">$</span> {t(p.backToProjects)}
              </button>

              <div className="mb-10">
                <span className="text-xs text-primary px-2 py-0.5 border border-primary/30 bg-primary/5">
                  {t(p.featured)}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mt-3 glow-text">{t(proj.name)}</h1>
                <p className="text-muted-foreground text-sm mt-1">{t(proj.role)}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git"].map(
                    (tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-mono border border-border text-muted-foreground">
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <CaseStudyBlock icon={<Target size={16} />} title={t(proj.problemTitle)} fileName="challenge.md"
                  content={<p className="text-muted-foreground text-sm leading-relaxed"><span className="text-primary mr-2">{">"}</span>{t(proj.problem)}</p>}
                />
                <CaseStudyBlock icon={<Lightbulb size={16} />} title={t(proj.solutionTitle)} fileName="solution.md"
                  content={
                    <ul className="space-y-1.5">
                      {(t(proj.solutions) as string[]).map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="text-primary text-xs">[{String(i).padStart(2,'0')}]</span>{s}
                        </li>
                      ))}
                    </ul>
                  }
                />
                <CaseStudyBlock icon={<Rocket size={16} />} title={t(proj.impactTitle)} fileName="impact.md"
                  content={
                    <ul className="space-y-1.5">
                      {(t(proj.impacts) as string[]).map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="text-primary text-xs">[{String(i).padStart(2,'0')}]</span>{s}
                        </li>
                      ))}
                    </ul>
                  }
                />
                <CaseStudyBlock icon={<BookOpen size={16} />} title={t(proj.learnedTitle)} fileName="learned.md"
                  content={
                    <ul className="space-y-1.5">
                      {(t(proj.learned) as string[]).map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="text-primary text-xs">[{String(i).padStart(2,'0')}]</span>{s}
                        </li>
                      ))}
                    </ul>
                  }
                />
              </div>

              <div className="flex gap-3 mt-10 pt-6 border-t border-border">
                <Button asChild variant="outline" className="border-border hover:border-primary hover:text-primary text-xs font-mono">
                  <a href="https://github.com/MarioCHYY/radiant-beauty-studio-main" target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> {t(p.viewCode)}
                  </a>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 text-xs font-mono glow">
                  <a href="https://radiant-beauty-studio-main.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} /> {t(p.liveDemo)}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CaseStudyBlock = ({
  icon, title, content, fileName,
}: {
  icon: React.ReactNode; title: string; content: React.ReactNode; fileName: string;
}) => (
  <div className="terminal-window">
    <div className="terminal-header">
      <span className="terminal-dot bg-primary/60" />
      <span className="ml-2 text-[10px]">{fileName}</span>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary">{icon}</span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {content}
    </div>
  </div>
);

export default ProjectsSection;
