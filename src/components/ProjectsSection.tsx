import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">02 —</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Projects</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <div className="rounded-2xl glass p-8 md:p-10 hover:border-primary/30 transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <span className="text-xs font-mono text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                  FEATURED PROJECT
                </span>
                <h3 className="text-2xl font-bold mt-4">
                  Professional Website for Aesthetic Services Business
                </h3>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/MarioCHYY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Desarrollo completo de un sitio web profesional para un negocio de
              servicios estéticos, enfocado en mejorar su presencia digital y
              fortalecer la captación de clientes. Implementación de una
              arquitectura estructurada separando frontend y backend,
              optimizando rendimiento y mantenibilidad del código.
            </p>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Key Responsibilities
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {[
                  "Modern responsive UI design",
                  "Reusable React components",
                  "TypeScript for type safety",
                  "Clean architecture patterns",
                  "Performance optimization",
                  "Version control with Git",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "JavaScript", "HTML", "CSS", "Java", "Git"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
