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
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">{t(s.label)}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{t(s.title)}</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            {t(s.subtitle)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {s.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-5 group-hover:glow transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(service.title)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
