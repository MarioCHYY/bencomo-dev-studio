import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ExperienceSection = () => {
  const { t } = useLang();
  const exp = translations.experience;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  return (
    <section id="experience" className="section-padding relative grid-bg">
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
            <span className="text-primary text-xs font-display tracking-[0.3em]">{t(exp.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">
            <span className="cyber-gradient-text neon-text">{t(exp.title)}</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative pl-6 border-l border-primary/20"
          >
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary shadow-[0_0_10px_hsl(190_100%_50%/0.6)] rotate-45" />

            <div className="glass rounded-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground tracking-wide">{t(exp.role)}</h3>
                  <p className="text-primary text-xs mt-1 font-display tracking-wider">{t(exp.type)}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground glass rounded-sm px-3 py-1.5 self-start shrink-0 font-display tracking-wider">
                  <Calendar size={12} className="text-primary" />
                  <span>{t(exp.period)}</span>
                </div>
              </div>

              <div className="space-y-3">
                {responsibilities.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary text-xs mt-1 shrink-0">▸</span>
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">{r}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
