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
            className="text-center mb-16"
          >
            <span className="text-primary font-mono text-sm">{t(p.label)}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">{t(p.title)}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="rounded-2xl glass p-8 md:p-10 hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                <div>
                  <span className="text-xs font-mono text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                    {t(p.featured)}
                  </span>
                  <h3 className="text-2xl font-bold mt-4">{t(proj.name)}</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl">{t(proj.oneliner)}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://radiant-beauty-studio-main.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <button
                onClick={() => setCaseStudyOpen(true)}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity glow"
              >
                {t(p.viewCaseStudy)}
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
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-12">
              <button
                onClick={() => setCaseStudyOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                {t(p.backToProjects)}
              </button>

              {/* Hero */}
              <div className="mb-12">
                <span className="text-xs font-mono text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                  {t(p.featured)}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4">{t(proj.name)}</h1>
                <p className="text-muted-foreground mt-2">{t(proj.role)}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                <CaseStudyBlock
                  icon={<Target size={20} />}
                  title={t(proj.problemTitle)}
                  content={<p className="text-muted-foreground leading-relaxed">{t(proj.problem)}</p>}
                />

                <CaseStudyBlock
                  icon={<Lightbulb size={20} />}
                  title={t(proj.solutionTitle)}
                  content={
                    <ul className="space-y-2">
                      {(t(proj.solutions) as string[]).map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  }
                />

                <CaseStudyBlock
                  icon={<Rocket size={20} />}
                  title={t(proj.impactTitle)}
                  content={
                    <ul className="space-y-2">
                      {(t(proj.impacts) as string[]).map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  }
                />

                <CaseStudyBlock
                  icon={<BookOpen size={20} />}
                  title={t(proj.learnedTitle)}
                  content={
                    <ul className="space-y-2">
                      {(t(proj.learned) as string[]).map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  }
                />
              </div>

              <div className="flex gap-4 mt-12 pt-8 border-t border-border">
                <Button asChild variant="outline">
                  <a
                    href="https://github.com/MarioCHYY/radiant-beauty-studio-main"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} /> {t(p.viewCode)}
                  </a>
                </Button>
                <Button asChild>
                  <a
                    href="https://radiant-beauty-studio-main.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} /> {t(p.liveDemo)}
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
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <div className="glass rounded-xl p-6 md:p-8">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {content}
  </div>
);

export default ProjectsSection;
