import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

interface Skill {
  name: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  category: string;
}

const skills: Skill[] = [
  { name: "HTML & CSS", level: "Avanzado", category: "Frontend" },
  { name: "JavaScript", level: "Avanzado", category: "Frontend" },
  { name: "React", level: "Intermedio", category: "Frontend" },
  { name: "TypeScript", level: "Avanzado", category: "Frontend" },
  { name: "Responsive Design", level: "Avanzado", category: "Frontend" },
  { name: "Java", level: "Intermedio", category: "Backend" },
  { name: "Git & GitHub", level: "Intermedio", category: "Tools" },
  { name: "DaVinci Resolve", level: "Intermedio", category: "Other" },
];

const levelConfig: Record<string, { bars: number; color: string }> = {
  Básico: { bars: 1, color: "bg-muted-foreground" },
  Intermedio: { bars: 2, color: "bg-secondary" },
  Avanzado: { bars: 3, color: "bg-primary" },
};

const categories = ["Frontend", "Backend", "Tools", "Other"];

const SkillsSection = () => {
  const { t } = useLang();
  const s = translations.skills;

  return (
    <section id="skills" className="section-padding relative">
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
            <span className="text-primary text-xs font-display tracking-[0.3em]">{t(s.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">
            <span className="cyber-gradient-text neon-text">{t(s.title)}</span>
          </h2>
        </motion.div>

        {/* Holographic panel */}
        <div className="max-w-4xl mx-auto glass rounded-sm corner-accents overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border/30">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
            <span className="ml-3 text-[10px] text-muted-foreground/40 font-display tracking-wider flex-1 text-center">
              skills.sys — v2.0
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-1">
              {skills.map((skill, i) => {
                const config = levelConfig[skill.level];
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="group flex items-center gap-4 py-3 px-2 -mx-2 rounded-sm hover:bg-primary/[0.03] transition-colors"
                  >
                    <span className="text-primary/20 text-[10px] font-display w-6 text-right shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground text-sm font-display font-medium group-hover:text-primary group-hover:neon-text transition-all min-w-[140px] tracking-wide">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground/30 text-[10px] font-display tracking-wider hidden sm:inline min-w-[70px]">
                      {skill.category}
                    </span>
                    <div className="flex gap-1.5 ml-auto">
                      {[1, 2, 3].map((bar) => (
                        <motion.span
                          key={bar}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.06 + bar * 0.1 }}
                          className={`w-7 h-1.5 origin-left rounded-full ${
                            bar <= config.bars
                              ? `${config.color} shadow-[0_0_8px_hsl(190_100%_50%/0.3)]`
                              : "bg-border/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-display tracking-wider w-24 text-right shrink-0">
                      {t(s.levels[skill.level])}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between px-5 py-1.5 border-t border-border/20 text-[9px] text-muted-foreground/30 font-display tracking-wider">
            <span>SYSTEM</span>
            <span>{skills.length} modules loaded</span>
            <span>ACTIVE</span>
          </div>
        </div>

        {/* Category tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 mt-10 max-w-4xl mx-auto"
        >
          {categories.map((cat) => (
            <span key={cat} className="px-3 py-1 text-[10px] font-display tracking-[0.2em] text-muted-foreground glass rounded-sm hover:border-primary/40 hover:text-primary transition-colors cursor-default">
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
