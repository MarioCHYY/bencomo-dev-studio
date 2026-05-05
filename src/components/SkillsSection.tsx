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
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[11px] text-primary font-medium tracking-[0.16em] uppercase">{t(s.label)}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
            {t(s.title)}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="dark:text-[rgba(255,255,255,0.6)] text-[#505060] text-sm font-medium dark:group-hover:text-white group-hover:text-[#0A0A0A] transition-colors">{skill.name}</span>
                </div>
                <span className="text-xs dark:text-white/30 text-[#505060] font-medium transition-colors duration-500">{skill.percent}%</span>
              </div>
              <div className="h-1 dark:bg-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.06)] rounded-full overflow-hidden transition-colors duration-500">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                  className="h-full bg-primary relative rounded-full"
                />
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
          className="flex flex-wrap gap-3 mt-12 pt-8 border-t dark:border-[rgba(255,255,255,0.05)] border-[rgba(0,0,0,0.05)] transition-colors duration-500"
        >
          {categories.map((cat) => (
            <span key={cat} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] dark:bg-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.05)] dark:text-[rgba(255,255,255,0.4)] text-[#505060] border dark:border-[rgba(255,255,255,0.08)] border-[rgba(0,0,0,0.08)] rounded-full cursor-default hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors duration-500">
              {t((s.categories as any)[cat])}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
