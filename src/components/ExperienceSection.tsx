import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ExperienceSection = () => {
  const { t } = useLang();
  const exp = translations.experience;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-3xl mb-3 block">💼</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            <span className="pop-gradient-text">{t(exp.title)}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="room-card p-6 md:p-8 border border-blue/20 bg-blue/5 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-display font-bold text-foreground">
                {t(exp.role)}
              </h3>
              <p className="text-secondary text-xs mt-1 font-semibold">
                {t(exp.type)}
              </p>
            </div>
            <span className="sticker bg-primary/10 text-primary border border-primary/20 self-start">
              <Calendar size={12} />
              {t(exp.period)}
            </span>
          </div>

          <div className="space-y-3">
            {responsibilities.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                className="flex items-start gap-2"
              >
                <span className="text-primary text-sm mt-0.5">•</span>
                <p className="text-muted-foreground text-sm leading-relaxed">{r}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
