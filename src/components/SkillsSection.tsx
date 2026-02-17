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
  { name: "TypeScript", level: "Intermedio", category: "Frontend" },
  { name: "Responsive Design", level: "Avanzado", category: "Frontend" },
  { name: "Java", level: "Intermedio", category: "Backend" },
  { name: "Git & GitHub", level: "Intermedio", category: "Tools" },
  { name: "DaVinci Resolve", level: "Intermedio", category: "Other" },
];

const levelBars: Record<string, number> = {
  Básico: 1,
  Intermedio: 2,
  Avanzado: 3,
};

const SkillsSection = () => {
  const { t } = useLang();
  const s = translations.skills;

  const getLevelLabel = (level: Skill["level"]) => t(s.levels[level]);

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-xs">{t(s.label)}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 glow-text">
            <span className="text-primary mr-2">#</span>{t(s.title)}
          </h2>
        </motion.div>

        <div className="terminal-window max-w-4xl mx-auto">
          <div className="terminal-header">
            <span className="terminal-dot bg-destructive/80" />
            <span className="terminal-dot bg-yellow-500/80" />
            <span className="terminal-dot bg-primary/80" />
            <span className="ml-3">skills.log</span>
          </div>
          <div className="p-4 space-y-1">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center justify-between py-2 px-3 hover:bg-primary/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary/40 text-xs w-6 text-right">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-foreground text-sm">{skill.name}</span>
                  <span className="text-muted-foreground/50 text-xs">// {skill.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((bar) => (
                      <span
                        key={bar}
                        className={`w-5 h-1.5 transition-all ${
                          bar <= levelBars[skill.level]
                            ? "bg-primary shadow-[0_0_6px_hsl(120_100%_50%/0.5)]"
                            : "bg-border/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground w-24 text-right">
                    {getLevelLabel(skill.level)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
