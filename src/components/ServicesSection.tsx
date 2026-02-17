import { motion } from "framer-motion";
import { Globe, Server, Paintbrush, Smartphone } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const icons = [Globe, Paintbrush, Server, Smartphone];

const ServicesSection = () => {
  const { t } = useLang();
  const s = translations.services;

  return (
    <section id="services" className="section-padding relative">
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
            <span className="text-primary text-xs font-display tracking-[0.3em]">{t(s.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">
            <span className="cyber-gradient-text neon-text">{t(s.title)}</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-lg font-body">{t(s.subtitle)}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {s.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass rounded-sm p-8 hover:neon-glow transition-all duration-500 holo-shimmer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-transparent group-hover:border-primary/20 transition-colors duration-500" />
                <div className="text-primary mb-5 group-hover:neon-text-strong transition-all duration-500">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div className="text-[10px] text-primary/30 font-display tracking-[0.2em] mb-2">
                  SVC_{String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors tracking-wide">
                  {t(service.title)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-body">
                  {t(service.description)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
