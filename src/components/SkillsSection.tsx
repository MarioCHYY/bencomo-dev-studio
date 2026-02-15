import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "React", level: 75, category: "Frontend" },
  { name: "TypeScript", level: 70, category: "Frontend" },
  { name: "JavaScript", level: 80, category: "Frontend" },
  { name: "HTML & CSS", level: 85, category: "Frontend" },
  { name: "Responsive Design", level: 80, category: "Frontend" },
  { name: "Java", level: 65, category: "Backend" },
  { name: "Git & GitHub", level: 75, category: "Tools" },
  { name: "DaVinci Resolve", level: 55, category: "Other" },
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
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
          <span className="text-primary font-mono text-sm">03 —</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
