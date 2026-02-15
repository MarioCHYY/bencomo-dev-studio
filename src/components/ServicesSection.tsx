import { motion } from "framer-motion";
import { Globe, Server, Paintbrush, Smartphone } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites built with modern technologies. Clean code, fast performance, and great user experience.",
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    description:
      "Modern, intuitive interfaces designed to engage users and reflect your brand identity.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Scalable server-side solutions with structured architecture and database management.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Pixel-perfect layouts that look stunning on every device, from mobile to desktop.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">04 —</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Services</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Available for freelance projects. Let's build something great
            together.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-5 group-hover:glow transition-all duration-300">
                <service.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
