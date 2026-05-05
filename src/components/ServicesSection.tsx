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
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[11px] text-primary font-medium tracking-[0.16em] uppercase">{t(s.label)}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
            {t(s.title)}
          </h2>
          <p className="dark:text-[#A0A5B0] text-[#505060] mt-4 text-sm md:text-base max-w-lg font-light leading-relaxed transition-colors duration-500">
            {t(s.subtitle)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {s.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group dark:bg-[rgba(255,255,255,0.02)] bg-[rgba(0,0,0,0.02)] border dark:border-[rgba(255,255,255,0.06)] border-[rgba(0,0,0,0.06)] rounded-2xl p-8 md:p-10 hover:bg-primary/5 hover:border-primary/20 transition-all duration-500"
              >
                <div className="text-primary/60 mb-6 transition-all group-hover:scale-110 group-hover:text-primary duration-500">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-extrabold mb-3 dark:text-white text-[#0A0A0A] transition-colors duration-500">
                  {t(service.title)}
                </h3>
                <p className="text-sm dark:text-[#A0A5B0] text-[#505060] leading-[1.8] font-light transition-colors duration-500">
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
