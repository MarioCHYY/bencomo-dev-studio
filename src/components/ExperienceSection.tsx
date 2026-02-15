import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
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
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">{t(exp.label)}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{t(exp.title)}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Experience Card */}
            <div className="p-6 md:p-8 rounded-xl glass hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(exp.role)}
                    </h3>
                    <p className="text-primary font-mono text-sm mt-1">
                      {t(exp.type)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 px-3 py-1.5 rounded-lg self-start">
                  <Calendar size={14} className="text-primary" />
                  <span>{t(exp.period)}</span>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="grid md:grid-cols-2 gap-3">
                {responsibilities.map((responsibility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 
                      size={18} 
                      className="text-primary shrink-0 mt-0.5" 
                    />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {responsibility}
                    </p>
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

