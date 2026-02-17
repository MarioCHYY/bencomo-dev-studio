import { motion } from "framer-motion";
import { MapPin, Code2, Zap } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const { t } = useLang();
  const a = translations.about;

  const stats = [
    { value: "2+", label: { en: "Years Learning", es: "Años Aprendiendo" }, emoji: "📅" },
    { value: "100%", label: { en: "Passion", es: "Pasión" }, emoji: "🔥" },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-3xl mb-3 block">🛏️</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            <span className="pop-gradient-text">{t(a.title)}</span>
          </h2>
          <p className="font-handwriting text-lg text-primary/70 mt-2 rotate-[-1deg]">
            {t({ en: "Get comfortable, let me tell you about me", es: "Ponte cómodo, déjame contarte sobre mí" })}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-5"
          >
            <div className="room-card p-6 md:p-8">
              <p className="text-foreground leading-relaxed text-sm md:text-base">
                {t(a.p1)}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                {t(a.p2)}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, rotate: -1 }}
                  className="room-card p-5 text-center"
                >
                  <span className="text-2xl mb-2 block">{stat.emoji}</span>
                  <div className="text-2xl md:text-3xl font-display font-bold pop-gradient-text">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{t(stat.label)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            {[
              { icon: Code2, title: t(a.role.title), sub: t(a.role.sub), emoji: "💻", color: "bg-pink/10 border-pink/20" },
              { icon: MapPin, title: t(a.location.title), sub: t(a.location.sub), emoji: "📍", color: "bg-blue/10 border-blue/20" },
              { icon: Zap, title: t(a.degree.title), sub: t(a.degree.sub), emoji: "🎓", color: "bg-accent/10 border-accent/30" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className={`p-4 rounded-xl border ${item.color} transition-all duration-300`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
