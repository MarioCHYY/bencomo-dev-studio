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

const levelBars: Record<string, number> = {
  Básico: 1,
  Intermedio: 2,
  Avanzado: 3,
};

const levelColors: Record<string, string> = {
  Básico: "bg-muted-foreground",
  Intermedio: "bg-primary/70",
  Avanzado: "bg-primary",
};

const categories = ["Frontend", "Backend", "Tools", "Other"];

const SkillsSection = () => {
  const { t } = useLang();
  const s = translations.skills;

  const getLevelLabel = (level: Skill["level"]) => t(s.levels[level]);

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

        {/* Macbook-style window */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/40 border border-border/30 overflow-hidden">
            {/* macOS title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card/60 border-b border-border/20">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-3 text-[10px] text-muted-foreground/50 font-mono flex-1 text-center">
                skills.config.ts — ~/mario/portfolio
              </span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Line numbers + skills */}
              <div className="space-y-0">
                {/* File header comment */}
                <div className="flex items-center gap-4 mb-4 pb-3 border-b border-border/10">
                  <span className="text-primary/20 text-[10px] font-mono w-6 text-right">01</span>
                  <span className="text-muted-foreground/40 text-xs font-mono">{"// "}{t(s.title)}</span>
                </div>

                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="group flex items-center gap-4 py-2.5 hover:bg-primary/[0.03] transition-colors px-1 -mx-1"
                  >
                    {/* Line number */}
                    <span className="text-primary/20 text-[10px] font-mono w-6 text-right shrink-0">
                      {String(i + 2).padStart(2, "0")}
                    </span>

                    {/* Skill name */}
                    <span className="text-foreground text-sm font-medium group-hover:text-primary transition-colors min-w-[140px]">
                      {skill.name}
                    </span>

                    {/* Category */}
                    <span className="text-muted-foreground/30 text-[10px] font-mono hidden sm:inline min-w-[70px]">
                      {skill.category}
                    </span>

                    {/* Level bars */}
                    <div className="flex gap-1 ml-auto">
                      {[1, 2, 3].map((bar) => (
                        <motion.span
                          key={bar}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.06 + bar * 0.1 }}
                          className={`w-6 h-1.5 origin-left transition-all ${
                            bar <= levelBars[skill.level]
                              ? `${levelColors[skill.level]} shadow-[0_0_6px_hsl(120_100%_50%/0.4)]`
                              : "bg-border/20"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Level label */}
                    <span className="text-[10px] text-muted-foreground font-mono w-20 text-right shrink-0">
                      {getLevelLabel(skill.level)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-card/40 border-t border-border/10 text-[9px] text-muted-foreground/30 font-mono">
              <span>TypeScript</span>
              <span>{skills.length} skills loaded</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>

        {/* Category tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-border/20 max-w-4xl mx-auto"
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
