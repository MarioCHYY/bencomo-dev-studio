import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useState, useEffect } from "react";

const useTypingEffect = (text: string, speed = 40, delay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
};

const HeroSection = () => {
  const { t } = useLang();
  const greeting = t(translations.hero.greeting) as string;
  const subtitle = t(translations.hero.subtitle) as string;

  const line1 = useTypingEffect(`${greeting} Mario Bencomo`, 50, 800);
  const line2 = useTypingEffect(subtitle, 25, 2500);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix rain background */}
      <div className="absolute inset-0 opacity-[0.03]">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary text-xs font-mono leading-none select-none"
            style={{ left: `${i * 5}%`, top: -100 }}
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="terminal-window"
        >
          {/* Terminal header */}
          <div className="terminal-header">
            <span className="terminal-dot bg-destructive/80" />
            <span className="terminal-dot bg-yellow-500/80" />
            <span className="terminal-dot bg-primary/80" />
            <span className="ml-4 text-muted-foreground">mario@portfolio:~</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-8 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-primary text-sm">visitor@web</span>
              <span className="text-muted-foreground text-sm">:</span>
              <span className="text-blue-400 text-sm">~</span>
              <span className="text-muted-foreground text-sm">$ </span>
              <span className="text-xs text-muted-foreground">cat about.txt</span>
            </motion.div>

            <div className="pl-0 md:pl-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-2"
              >
                <span className="inline-block px-3 py-1 border border-primary/40 text-primary text-xs tracking-wider glow">
                  {t(translations.hero.badge)}
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 flicker">
                <span className="text-foreground">{line1.displayed}</span>
                {!line1.done && <span className="text-primary blink">▊</span>}
              </h1>

              <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-6 min-h-[3rem]">
                <span className="text-primary mr-2">{">"}</span>
                {line2.displayed}
                {!line2.done && line1.done && <span className="text-primary blink">▊</span>}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="border-t border-border/40 pt-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-muted-foreground text-xs">$</span>
                <a
                  href="#projects"
                  className="px-6 py-2 border border-primary text-primary text-sm font-mono hover:bg-primary hover:text-primary-foreground transition-all glow"
                >
                  {t(translations.hero.cta)}
                </a>
                <a
                  href="https://github.com/MarioCHYY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-border text-foreground text-sm font-mono hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                >
                  <Github size={14} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-border text-foreground text-sm font-mono hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
