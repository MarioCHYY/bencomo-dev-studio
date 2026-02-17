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
          className="mb-12"
        >
          <span className="text-primary text-xs">{t(a.label)}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
            <span className="text-primary mr-2">#</span>{t(a.title)}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="terminal-window"
          >
            <div className="terminal-header">
              <span className="terminal-dot bg-destructive/80" />
              <span className="terminal-dot bg-yellow-500/80" />
              <span className="terminal-dot bg-primary/80" />
              <span className="ml-3">about.md</span>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-primary mr-2">{">"}</span>
                {t(a.p1)}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-primary mr-2">{">"}</span>
                {t(a.p2)}
              </p>
            </div>
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
                className="flex items-start gap-4 p-4 terminal-window hover:border-primary/40 transition-colors"
              >
                <div className="text-primary">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
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
