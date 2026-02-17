import { motion } from "framer-motion";
import { MapPin, Code2, Zap, Terminal } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const { t } = useLang();
  const a = translations.about;

  const stats = [
    { value: "10+", label: { en: "Projects", es: "Proyectos" } },
    { value: "2+", label: { en: "Years Learning", es: "Años Aprendiendo" } },
    { value: "100%", label: { en: "Passion", es: "Pasión" } },
  ];

  return (
    <section id="about" className="section-padding relative">
      {/* Decorative line */}
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
            <span className="text-primary text-xs font-mono">{t(a.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary mr-3">{"//"}</span>
            <span className="glow-text">{t(a.title)}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-12">
          {/* Left: Bio */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
              <div className="space-y-4 pl-4">
                <p className="text-foreground leading-relaxed text-sm md:text-base">
                  {t(a.p1)}
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t(a.p2)}
                </p>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center py-4 border border-border/50 hover:border-primary/40 transition-colors neon-border">
                  <div className="text-2xl md:text-3xl font-black text-primary glow-text mb-1">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t(stat.label)}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            {[
              { icon: Code2, title: t(a.role.title), sub: t(a.role.sub), cmd: "role" },
              { icon: MapPin, title: t(a.location.title), sub: t(a.location.sub), cmd: "location" },
              { icon: Zap, title: t(a.degree.title), sub: t(a.degree.sub), cmd: "education" },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-4 bg-card/50 border border-border/40 hover:border-primary/50 transition-all duration-300 hover:bg-card/80"
              >
                <div className="text-[10px] text-muted-foreground/50 mb-2 font-mono">
                  <span className="text-primary/40">$</span> get --{item.cmd}
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-0.5 group-hover:glow-text transition-all">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
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
