import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2 } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">01 —</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Desarrollador web con enfoque en frontend y backend, especializado
              en la creación de aplicaciones funcionales, escalables y
              visualmente limpias. Experiencia desarrollando soluciones digitales
              para negocios locales, priorizando arquitectura organizada,
              experiencia de usuario y buenas prácticas de desarrollo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En constante aprendizaje y mejora técnica. Apasionado por crear
              productos digitales que generen impacto real.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {[
              {
                icon: GraduationCap,
                title: "Ing. en Sistemas Computacionales",
                sub: "Tecnológico de Culiacán — Grad. Dic 2028",
              },
              {
                icon: Code2,
                title: "Web Developer",
                sub: "Frontend & Backend",
              },
              {
                icon: MapPin,
                title: "Culiacán, Sinaloa",
                sub: "México — Remote Available",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl glass hover:border-primary/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
