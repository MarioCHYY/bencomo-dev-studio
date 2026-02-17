import { motion } from "framer-motion";
import { Globe, Server, Paintbrush, Smartphone } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const serviceEmojis = ["🌐", "🎨", "⚙️", "📱"];
const serviceColors = [
  "bg-pink/10 border-pink/20",
  "bg-accent/10 border-accent/30",
  "bg-blue/10 border-blue/20",
  "bg-purple/10 border-purple/20",
];

const ServicesSection = () => {
  const { t } = useLang();
  const s = translations.services;

  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-3xl mb-3 block">🖼️</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            <span className="pop-gradient-text">{t(s.title)}</span>
          </h2>
          <p className="font-handwriting text-lg text-purple/80 mt-2 rotate-[-1deg]">
            {t({ en: "Posters on my wall — what inspires my work", es: "Posters en mi pared — lo que inspira mi trabajo" })}
          </p>
          <p className="text-muted-foreground mt-3 text-sm max-w-lg">
            {t(s.subtitle)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {s.items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, rotate: -1 }}
              className={`room-card p-6 md:p-8 border ${serviceColors[i]}`}
            >
              <span className="text-3xl mb-4 block">{serviceEmojis[i]}</span>
              <h3 className="text-base font-display font-bold mb-2 text-foreground">
                {t(service.title)}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(service.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
