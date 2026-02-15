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

const levelDots: Record<string, number> = {
  Básico: 1,
  Intermedio: 2,
  Avanzado: 3,
};

const levelColors: Record<string, string> = {
  Básico: "border-muted-foreground/50 text-muted-foreground",
  Intermedio: "border-primary/50 text-primary",
  Avanzado: "border-primary text-primary glow",
};

const SkillsSection = () => {
  const { t } = useLang();
  const s = translations.skills;

  const getLevelLabel = (level: Skill["level"]) => t(s.levels[level]);

  return (
    <section id="skills" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">{t(s.label)}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{t(s.title)}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center justify-between p-4 rounded-xl glass hover:border-primary/30 transition-all"
            >
              <span className="font-medium text-foreground">{skill.name}</span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className={`w-2 h-2 rounded-full transition-all ${
                        dot <= levelDots[skill.level] ? "bg-primary" : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-full border ${levelColors[skill.level]}`}
                >
                  {getLevelLabel(skill.level)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
