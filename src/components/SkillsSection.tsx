import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

interface Skill {
  name: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  category: string;
  emoji: string;
}

const skills: Skill[] = [
  { name: "HTML & CSS", level: "Avanzado", category: "Frontend", emoji: "🎨" },
  { name: "JavaScript", level: "Avanzado", category: "Frontend", emoji: "⚡" },
  { name: "React", level: "Intermedio", category: "Frontend", emoji: "⚛️" },
  { name: "TypeScript", level: "Avanzado", category: "Frontend", emoji: "🔷" },
  { name: "Responsive Design", level: "Avanzado", category: "Frontend", emoji: "📱" },
  { name: "Java", level: "Intermedio", category: "Backend", emoji: "☕" },
  { name: "Git & GitHub", level: "Intermedio", category: "Tools", emoji: "🔀" },
  { name: "DaVinci Resolve", level: "Intermedio", category: "Other", emoji: "🎬" },
];

const levelConfig: Record<string, { bars: number; color: string; bg: string }> = {
  Básico: { bars: 1, color: "bg-accent", bg: "bg-accent/10" },
  Intermedio: { bars: 2, color: "bg-secondary", bg: "bg-secondary/10" },
  Avanzado: { bars: 3, color: "bg-primary", bg: "bg-primary/10" },
};

const SkillsSection = () => {
  const { t } = useLang();
  const s = translations.skills;

  const getLevelLabel = (level: Skill["level"]) => t(s.levels[level]);

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-3xl mb-3 block">📚</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            <span className="pop-gradient-text">{t(s.title)}</span>
          </h2>
          <p className="font-handwriting text-lg text-secondary/80 mt-2 rotate-[-1deg]">
            {t({ en: "My bookshelf of knowledge", es: "Mi estante de conocimiento" })}
          </p>
        </motion.div>

        {/* Skills as "books" on a shelf */}
        <div className="grid sm:grid-cols-2 gap-3">
          {skills.map((skill, i) => {
            const config = levelConfig[skill.level];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className={`room-card p-4 flex items-center gap-4 ${config.bg} border border-border/40`}
              >
                <span className="text-2xl">{skill.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-display font-semibold text-foreground truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium ml-2 shrink-0">
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((bar) => (
                      <motion.div
                        key={bar}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.06 + bar * 0.1 }}
                        className={`h-1.5 flex-1 rounded-full origin-left ${
                          bar <= config.bars ? config.color : "bg-border/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Category tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mt-8"
        >
          {["Frontend", "Backend", "Tools", "Other"].map((cat) => (
            <span key={cat} className="sticker bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors cursor-default">
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
