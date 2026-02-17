import { motion } from "framer-motion";
import { MapPin, Code2, Zap } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const { t } = useLang();
  const a = translations.about;

  const stats = [
    { value: "2+", label: { en: "Years Learning", es: "Años Aprendiendo" } },
    { value: "100%", label: { en: "Passion", es: "Pasión" } },
  ];

  return (
    <section id="about" className="section-padding relative grid-bg">
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
            <span className="text-primary text-xs font-display tracking-[0.3em]">{t(a.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">
            <span className="cyber-gradient-text neon-text">{t(a.title)}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-sm p-6 md:p-8 corner-accents"
            >
              <p className="text-foreground leading-relaxed text-sm md:text-base font-body">
                {t(a.p1)}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-4 font-body">
                {t(a.p2)}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-sm p-5 text-center neon-glow hover:neon-glow-strong transition-all duration-500"
                >
                  <div className="text-3xl md:text-4xl font-display font-black text-primary neon-text mb-1">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-display">{t(stat.label)}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            {[
              { icon: Code2, title: t(a.role.title), sub: t(a.role.sub), color: "border-primary/20 hover:border-primary/50" },
              { icon: MapPin, title: t(a.location.title), sub: t(a.location.sub), color: "border-secondary/20 hover:border-secondary/50" },
              { icon: Zap, title: t(a.degree.title), sub: t(a.degree.sub), color: "border-cyan/20 hover:border-cyan/50" },
            ].map((item, i) => (
              <div
                key={i}
                className={`group glass rounded-sm p-4 border ${item.color} transition-all duration-300 holo-shimmer`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-0.5 group-hover:neon-text transition-all">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm tracking-wide">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-body">{item.sub}</p>
                  </div>
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
