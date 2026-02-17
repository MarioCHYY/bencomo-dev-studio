import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, ChevronRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useLang();
  const h = translations.hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px]"
        style={{ background: "hsl(190 100% 50%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[100px]"
        style={{ background: "hsl(260 80% 60%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="status-online" />
            <span className="text-xs text-primary tracking-[0.3em] uppercase font-display neon-text">
              {t(h.badge)}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-primary/40 to-transparent" />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p className="text-sm text-muted-foreground mb-2 font-body tracking-wide">
              {t(h.greeting)}
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tight mb-2">
              <span className="cyber-gradient-text neon-text-strong">MARIO</span>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tight mb-8">
              <span className="text-foreground">BENCOMO</span>
            </h1>
          </motion.div>

          {/* Role tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center gap-3 flex-wrap mb-8"
          >
            <span className="px-4 py-1.5 glass rounded-sm text-primary text-xs tracking-wider font-display neon-glow">
              FULL STACK DEV
            </span>
            {["React", "TypeScript", "Node.js"].map((tech) => (
              <span key={tech} className="text-muted-foreground text-xs font-body">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-10 font-body"
          >
            {t(h.subtitle)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group px-6 py-3 bg-primary text-primary-foreground text-sm font-display font-bold tracking-wider rounded-sm neon-glow-strong hover:shadow-[0_0_40px_hsl(190_100%_50%/0.4)] transition-all duration-300 flex items-center gap-2"
            >
              {t(h.cta)}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/MarioCHYY"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 glass rounded-sm text-foreground text-sm font-display hover:border-primary/40 hover:neon-glow transition-all duration-300 flex items-center gap-2"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 glass rounded-sm text-foreground text-sm font-display hover:border-secondary/40 transition-all duration-300 flex items-center gap-2"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase font-display">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
