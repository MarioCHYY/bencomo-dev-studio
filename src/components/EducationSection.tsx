import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const EducationSection = () => {
  const { t } = useLang();
  const e = translations.education;

  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-xs">{t(e.label)}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
            <span className="text-primary mr-2">#</span>{t(e.title)}
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
                <span className="ml-3">education.json</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {t(e.degree.title)}
                      </h3>
                      <p className="text-primary text-xs mt-1">
                        {t(e.degree.period)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 self-start">
                    <Calendar size={12} className="text-primary" />
                    <span>{t(e.degree.graduation)}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-7">
                  <span className="text-primary mr-2">{">"}</span>
                  {t(e.degree.focus)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
