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
          <div className="flex items-center gap-4 mb-2">
            <span className="text-primary text-xs font-mono">{t(s.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary mr-3">{"//"}</span>
            <span className="glow-text">{t(s.title)}</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-lg">
            {t(s.subtitle)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-border/20">
          {s.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-background p-8 md:p-10 hover:bg-card/50 transition-all duration-500 relative"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-transparent group-hover:border-primary/30 transition-colors duration-500" />
                
                <div className="text-primary mb-5 group-hover:glow-text-intense transition-all duration-500">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div className="text-[10px] text-primary/40 font-mono mb-2">
                  service_{String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {t(service.title)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
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
