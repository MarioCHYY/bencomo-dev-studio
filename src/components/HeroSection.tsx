import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, ChevronRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useState, useEffect, useCallback } from "react";

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

const ASCII_ART = `
 ███╗   ███╗ ██████╗ 
 ████╗ ████║ ██╔══██╗
 ██╔████╔██║ ██████╔╝
 ██║╚██╔╝██║ ██╔══██╗
 ██║ ╚═╝ ██║ ██████╔╝
 ╚═╝     ╚═╝ ╚═════╝ 
`;

const MatrixColumn = ({ index }: { index: number }) => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const generateChars = () => {
      return Array.from({ length: 25 }, () => 
        String.fromCharCode(0x30A0 + Math.random() * 96)
      );
    };
    setChars(generateChars());
    const interval = setInterval(() => setChars(generateChars()), 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute text-primary/[0.07] text-[10px] font-mono leading-tight select-none whitespace-nowrap"
      style={{ left: `${index * 3.33}%` }}
      initial={{ y: "-100%" }}
      animate={{ y: "100vh" }}
      transition={{
        duration: 6 + Math.random() * 10,
        repeat: Infinity,
        delay: Math.random() * 8,
        ease: "linear",
      }}
    >
      {chars.map((c, j) => (
        <div key={j} className={j === 0 ? "text-primary/30" : ""}>{c}</div>
      ))}
    </motion.div>
  );
};

const HeroSection = () => {
  const { t } = useLang();
  const greeting = t(translations.hero.greeting) as string;
  const subtitle = t(translations.hero.subtitle) as string;

  const line1 = useTypingEffect(`${greeting} Mario Bencomo`, 50, 1200);
  const line2 = useTypingEffect(subtitle, 20, 3000);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Matrix rain */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <MatrixColumn key={i} index={i} />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: Main content */}
          <div>
            {/* Status line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="status-online" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                {t(translations.hero.badge)}
              </span>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-primary/40 to-transparent" />
            </motion.div>

            {/* Name - massive glitch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="text-xs text-muted-foreground mb-2 font-mono">
                <span className="text-primary">~</span> $ whoami
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-2">
                <span className="glitch glow-text-intense text-primary" data-text="MARIO">MARIO</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
                <span className="text-foreground flicker">BENCOMO</span>
              </h1>
            </motion.div>

            {/* Role line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 border border-primary/60 text-primary text-xs tracking-wider glow">
                  FULL STACK DEV
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">React</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">TypeScript</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">Node.js</span>
              </div>
            </motion.div>

            {/* Subtitle typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="mb-10 max-w-xl"
            >
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed min-h-[3rem]">
                <span className="text-primary mr-2 font-bold">{">"}</span>
                {line2.displayed}
                {!line2.done && <span className="text-primary blink ml-0.5">▊</span>}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="group px-6 py-3 bg-primary text-primary-foreground text-sm font-mono font-bold hover:shadow-[0_0_30px_hsl(120_100%_50%/0.4)] transition-all duration-300 flex items-center gap-2"
              >
                {t(translations.hero.cta)}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/MarioCHYY"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border text-foreground text-sm font-mono hover:border-primary hover:text-primary hover:glow transition-all duration-300 flex items-center gap-2"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border text-foreground text-sm font-mono hover:border-primary hover:text-primary hover:glow transition-all duration-300 flex items-center gap-2"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right: ASCII art */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="hidden lg:block"
          >
            <pre className="text-primary/20 text-[10px] leading-tight select-none font-mono">
              {ASCII_ART}
            </pre>
            <div className="mt-4 space-y-1 text-[10px] text-muted-foreground/40 font-mono">
              <div><span className="text-primary/30">├──</span> src/</div>
              <div><span className="text-primary/30">│   ├──</span> components/</div>
              <div><span className="text-primary/30">│   ├──</span> hooks/</div>
              <div><span className="text-primary/30">│   └──</span> utils/</div>
              <div><span className="text-primary/30">├──</span> package.json</div>
              <div><span className="text-primary/30">└──</span> tsconfig.json</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">scroll</span>
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
