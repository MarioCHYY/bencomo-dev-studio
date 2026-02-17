import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const EducationSection = () => {
  const { t } = useLang();
  const e = translations.education;

  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-3xl mb-3 block">🎓</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            <span className="pop-gradient-text">{t(e.title)}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="room-card p-6 md:p-8 border border-accent/20 bg-accent/5 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground">
                  {t(e.degree.title)}
                </h3>
                <p className="text-primary text-xs mt-1 font-semibold">
                  {t(e.degree.period)}
                </p>
              </div>
            </div>
            <span className="sticker bg-secondary/10 text-secondary border border-secondary/20 self-start">
              <Calendar size={12} />
              {t(e.degree.graduation)}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed pl-10">
            {t(e.degree.focus)}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
