import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const EducationSection = () => {
  const { t } = useLang();
  const e = translations.education;

  return (
    <section id="education" className="section-padding relative">
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
            <span className="text-primary text-xs font-display tracking-[0.3em]">{t(e.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">
            <span className="cyber-gradient-text neon-text">{t(e.title)}</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-sm p-6 md:p-8 corner-accents holo-shimmer"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <GraduationCap size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground tracking-wide">{t(e.degree.title)}</h3>
                  <p className="text-primary text-xs mt-1 font-display tracking-wider">{t(e.degree.period)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground glass rounded-sm px-3 py-1.5 self-start shrink-0 font-display tracking-wider">
                <Calendar size={12} className="text-primary" />
                <span>{t(e.degree.graduation)}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed pl-8 font-body">{t(e.degree.focus)}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
