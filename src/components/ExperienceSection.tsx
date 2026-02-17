import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ExperienceSection = () => {
  const { t } = useLang();
  const exp = translations.experience;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-xs">{t(exp.label)}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
            <span className="text-primary mr-2">#</span>{t(exp.title)}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-window hover:border-primary/40 transition-all duration-300">
              <div className="terminal-header">
                <span className="terminal-dot bg-destructive/80" />
                <span className="terminal-dot bg-yellow-500/80" />
                <span className="terminal-dot bg-primary/80" />
                <span className="ml-3">experience.log</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Briefcase size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {t(exp.role)}
                      </h3>
                      <p className="text-primary text-xs mt-1">
                        {t(exp.type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 self-start">
                    <Calendar size={12} className="text-primary" />
                    <span>{t(exp.period)}</span>
                  </div>
                </div>

                <div className="space-y-2 pl-1">
                  {responsibilities.map((responsibility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.08 * index }}
                      className="flex items-start gap-3 py-1"
                    >
                      <span className="text-primary text-xs shrink-0 mt-0.5">
                        [{String(index).padStart(2, '0')}]
                      </span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {responsibility}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
