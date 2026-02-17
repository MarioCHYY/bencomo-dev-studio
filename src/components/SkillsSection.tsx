import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

interface Skill {
  name: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  category: string;
  percent: number;
}

const skills: Skill[] = [
  { name: "HTML & CSS", level: "Avanzado", category: "Frontend", percent: 90 },
  { name: "JavaScript", level: "Avanzado", category: "Frontend", percent: 85 },
  { name: "React", level: "Intermedio", category: "Frontend", percent: 70 },
  { name: "TypeScript", level: "Intermedio", category: "Frontend", percent: 65 },
  { name: "Responsive Design", level: "Avanzado", category: "Frontend", percent: 90 },
  { name: "Java", level: "Intermedio", category: "Backend", percent: 55 },
  { name: "Git & GitHub", level: "Intermedio", category: "Tools", percent: 70 },
  { name: "DaVinci Resolve", level: "Intermedio", category: "Other", percent: 60 },
];

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
          <div className="flex items-center gap-4 mb-2">
            <span className="text-primary text-xs font-mono">{t(s.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary mr-3">{"//"}</span>
            <span className="glow-text">{t(s.title)}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group py-3 border-b border-border/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary/30 text-[10px] font-mono w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground text-sm font-semibold group-hover:text-primary transition-colors">{skill.name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{skill.percent}%</span>
              </div>
              <div className="h-1 bg-border/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                  className="h-full bg-primary relative"
                  style={{
                    boxShadow: "0 0 10px hsl(120 100% 50% / 0.5), 0 0 20px hsl(120 100% 50% / 0.2)",
                  }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-primary shadow-[0_0_8px_hsl(120_100%_50%/0.8)]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-border/20"
        >
          {categories.map((cat) => (
            <span key={cat} className="px-3 py-1 text-[10px] text-muted-foreground border border-border/30 font-mono uppercase tracking-wider hover:border-primary/40 hover:text-primary/70 transition-colors cursor-default">
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
