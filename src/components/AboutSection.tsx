import { motion } from "framer-motion";
import { MapPin, Code2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const { t } = useLang();
  const a = translations.about;

  const items = [
    { icon: Code2, title: t(a.role.title), sub: t(a.role.sub) },
    { icon: MapPin, title: t(a.location.title), sub: t(a.location.sub) },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">{t(a.label)}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{t(a.title)}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(a.p1)}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t(a.p2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl glass hover:border-primary/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
