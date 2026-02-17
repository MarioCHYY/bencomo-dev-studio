import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { Bed, Monitor, BookOpen, Frame, Smartphone, Sparkles } from "lucide-react";

const roomObjects = [
  {
    icon: Bed,
    label: { en: "About Me", es: "Sobre Mí" },
    emoji: "🛏️",
    href: "#about",
    color: "from-pink to-primary",
    bgColor: "bg-pink/10",
    borderColor: "border-pink/30",
    delay: 0.2,
  },
  {
    icon: Monitor,
    label: { en: "Projects", es: "Proyectos" },
    emoji: "🖥️",
    href: "#projects",
    color: "from-blue to-secondary",
    bgColor: "bg-blue/10",
    borderColor: "border-blue/30",
    delay: 0.35,
  },
  {
    icon: BookOpen,
    label: { en: "Skills", es: "Habilidades" },
    emoji: "📚",
    href: "#skills",
    color: "from-accent to-yellow",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    delay: 0.5,
  },
  {
    icon: Frame,
    label: { en: "Services", es: "Servicios" },
    emoji: "🖼️",
    href: "#services",
    color: "from-purple to-primary",
    bgColor: "bg-purple/10",
    borderColor: "border-purple/30",
    delay: 0.65,
  },
  {
    icon: Smartphone,
    label: { en: "Contact", es: "Contacto" },
    emoji: "📱",
    href: "#contact",
    color: "from-secondary to-blue",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
    delay: 0.8,
  },
];

const FloatingShape = ({ className, delay }: { className: string; delay: number }) => (
  <motion.div
    className={`absolute rounded-full opacity-30 blur-2xl pointer-events-none ${className}`}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const HeroSection = () => {
  const { t } = useLang();
  const h = translations.hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden dotted-bg">
      {/* Floating decorative blobs */}
      <FloatingShape className="w-64 h-64 bg-primary/20 top-20 -left-20" delay={0} />
      <FloatingShape className="w-48 h-48 bg-secondary/20 top-40 right-10" delay={1.5} />
      <FloatingShape className="w-56 h-56 bg-accent/20 bottom-20 left-1/3" delay={3} />
      <FloatingShape className="w-40 h-40 bg-purple/20 bottom-40 right-1/4" delay={2} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-24">
        {/* Main heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <span className="sticker bg-primary/10 text-primary border border-primary/20">
              <Sparkles size={14} />
              {t(h.badge)}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-4"
          >
            <span className="text-foreground">{t(h.greeting)}</span>{" "}
            <span className="pop-gradient-text">Mario</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-handwriting text-2xl md:text-4xl text-primary/80 mb-6 rotate-[-1deg]"
          >
            {t({ en: "No es un portafolio. Es mi habitación digital.", es: "No es un portafolio. Es mi habitación digital." })}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed"
          >
            {t(h.subtitle)}
          </motion.p>
        </div>

        {/* Room objects grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {roomObjects.map((obj, i) => (
            <motion.a
              key={i}
              href={obj.href}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: obj.delay, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`room-card p-5 flex flex-col items-center gap-3 text-center ${obj.bgColor} border ${obj.borderColor} cursor-pointer`}
            >
              <span className="text-3xl md:text-4xl">{obj.emoji}</span>
              <span className="text-xs md:text-sm font-display font-semibold text-foreground">
                {t(obj.label)}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 mt-16"
        >
          <span className="text-xs text-muted-foreground font-display">{t({ en: "Explore my room", es: "Explora mi cuarto" })}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xl"
          >
            👇
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
