import { motion } from "framer-motion";
import { Globe, Server, Paintbrush, Smartphone } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const icons = [Globe, Paintbrush, Server, Smartphone];

const ServicesSection = () => {
  const { t } = useLang();
  const s = translations.services;

  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-xs">{t(s.label)}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
            <span className="text-primary mr-2">#</span>{t(s.title)}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-lg">
            <span className="text-primary mr-2">{">"}</span>
            {t(s.subtitle)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group terminal-window hover:border-primary/40 transition-all duration-300"
              >
                <div className="terminal-header">
                  <span className="terminal-dot bg-primary/60" />
                  <span className="ml-2 text-[10px]">service_{i + 1}</span>
                </div>
                <div className="p-5">
                  <div className="text-primary mb-4 group-hover:glow-text transition-all">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">{t(service.title)}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(service.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
