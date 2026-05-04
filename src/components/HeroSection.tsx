import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";

const HeroSection = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();

  const sizeEs = "text-[2.8rem] sm:text-[4rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.5rem]";
  const sizeEn = "text-[2.2rem] sm:text-[3.2rem] md:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.8rem]";
  const textSize = lang === "en" ? sizeEn : sizeEs;

  const bg = theme === "dark" ? "#050505" : "#F8F8F8";
  const bgTransition = "500ms ease";
  
  // Colores dinámicos según tema
  const textColor = theme === "dark" ? "dark:text-white text-[#050505]" : "text-[#050505]";
  const glowColor = theme === "dark" 
    ? "drop-shadow(0 0 30px rgba(255,255,255,0.5))" 
    : "drop-shadow(0 0 20px rgba(51,141,255,0.3))";



  return (
    <section className="relative min-h-screen overflow-visible transition-colors duration-500" style={{ backgroundColor: bg }}>

      {/* ─── PHOTO ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[55%] pointer-events-none overflow-hidden"
      >
        <img
          src="/profile_dark_v2.png"
          alt="Mario Bencomo Dark"
          className={`absolute inset-0 w-full h-[110%] object-cover grayscale-[15%] -translate-y-[10%] transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: "center 30%" }}
        />
        <img
          src="/profile_light_v7.png"
          alt="Mario Bencomo Light"
          className={`absolute inset-0 w-full h-[110%] object-cover grayscale-[15%] transition-opacity duration-500 ${theme === "light" ? "opacity-100" : "opacity-0"}`}
          style={{ 
            objectPosition: "center 30%",
            transform: "scale(0.84) translate(-1.8%, -5%)",
            transformOrigin: "40% 40%"
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen transition-opacity duration-500"
          style={{ 
            background: "radial-gradient(ellipse at 65% 38%, rgba(200,220,255,0.25) 0%, transparent 50%)",
            opacity: theme === "dark" ? 0.4 : 0
          }}
        />
        {/* Fades */}
        <div className="absolute top-0 left-0 right-0 h-[25%]" style={{ background: `linear-gradient(to bottom, ${bg} 0%, transparent 100%)`, transition: `background ${bgTransition}` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[30%]" style={{ background: `linear-gradient(to top, ${bg} 0%, ${bg}cc 40%, transparent 100%)`, transition: `background ${bgTransition}` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${bg} 100%)`, transition: `background ${bgTransition}` }} />
      </motion.div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="ml-auto w-full md:max-w-[60%] lg:max-w-[55%] xl:max-w-[52%]">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(51,141,255,0.9)] animate-pulse" />
            <span className="text-[11px] text-primary font-medium tracking-[0.22em] uppercase">
              {t(translations.hero.badge)}
            </span>
          </motion.div>

          {/* Editorial Headline con efecto de focos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8 overflow-visible"
          >
            <h1 translate="no" className={`font-heading font-extrabold leading-[1.05] -tracking-[0.03em] ${textColor}`}>
              
              {/* Línea 1: Se enciende ✨ — SINCRONIZADA con línea 3 */}
              <span 
                className={`block ${textSize} opacity-0 animate-[bulbFlicker_1.2s_ease-in-out_forwards_0.6s]`}
                style={{ 
                  filter: theme === "dark" ? glowColor : "none",
                  textShadow: theme === "dark" 
                    ? "0 0 5px #7dd3fc, 0 0 20px #7dd3fc, 0 0 40px rgba(125,211,252,0.5)" 
                    : "0 0 10px rgba(51,141,255,0.4)"
                }}
              >
                {t(translations.hero.title.line1)}
              </span>
              
              {/* Línea 2: Se funde 💥 — Animación más lenta (3.5s) */}
              <span 
                className={`block relative ${textSize} opacity-0 animate-[bulbBurnout_1.2s_ease-in-out_forwards_1s]`}
                style={{
                  color: theme === "dark" ? "rgba(255,255,255,0.50)" : "rgba(5,5,5,0.50)",
                  filter: theme === "dark" ? "brightness(0.8)" : "brightness(0.8)",
                  textShadow: theme === "dark" 
                    ? "0 0 12px rgba(180,180,180,0.5)" 
                    : "0 0 6px rgba(0,0,0,0.3)"
                }}
              >
                {t(translations.hero.title.line2)}
                <BurnoutSparks delay={1.5} theme={theme} />
              </span>
              
              {/* Línea 3: Se enciende ✨ — SINCRONIZADA con línea 1 */}
              <span 
                className={`block ${textSize} opacity-0 animate-[bulbFlicker_1.2s_ease-in-out_forwards_0.6s]`}
                style={{ 
                  filter: theme === "dark" ? glowColor : "none",
                  textShadow: theme === "dark" 
                    ? "0 0 5px #7dd3fc, 0 0 20px #7dd3fc, 0 0 40px rgba(125,211,252,0.5)" 
                    : "0 0 10px rgba(51,141,255,0.4)"
                }}
              >
                {t(translations.hero.title.line3)}
              </span>
              
            </h1>
          </motion.div>

          {/* Name & Role */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className={`${theme === "dark" ? "text-white" : "text-[#0A0A0A]"} text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-500`}>Mario Bencomo</span>
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-primary/80 text-[10px] font-bold tracking-[0.18em] uppercase">Full Stack Developer</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.6 }}
            className={`text-sm ${theme === "dark" ? "text-[#A0A5B0]" : "text-[#505060]"} leading-[1.75] font-light max-w-lg mb-9 transition-colors duration-500`}
          >
            {t(translations.hero.subtitle)}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.6 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_0_24px_rgba(51,141,255,0.3)]"
            >
              {t(translations.hero.cta)} →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const BurnoutSparks = ({ delay, theme }: { delay: number; theme: "light" | "dark" }) => {
  const sparkColors = theme === "dark" 
    ? ["#fb923c", "#fbbf24", "#f87171", "#ffffff", "#fde68a", "#ff6b35"] 
    : ["#ea580c", "#ca8a04", "#dc2626", "#6b7280", "#b45309", "#d97706"];

  return (
    // z-20 para que las chispas estén ENCIMA del texto
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      
      {/* ═══ CHISPITAS PRINCIPALES — más grandes, más brillantes ═══ */}
      {Array.from({ length: 28 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 180;
        const tx = Math.cos(angle) * distance;
        const ty = -Math.abs(Math.sin(angle)) * distance * 0.7 - 40;
        const size = Math.random() * 5 + 2.5; // MÁS GRANDES (2.5-7.5px vs 1-4px antes)
        const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        const dur = 0.8 + Math.random() * 0.6;
        
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: "1em",
              top: "50%",
              // Glow MÁS INTENSO
              boxShadow: `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}88, 0 0 ${size * 12}px ${color}44`,
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0, 2, 1.5, 0.8, 0],
              x: [0, tx * 0.15, tx * 0.5, tx * 0.85, tx],
              y: [0, ty * 0.1, ty * 0.4, ty * 0.75, ty + 20], // gravedad al final
            }}
            transition={{
              duration: dur,
              delay: delay + Math.random() * 0.4,
              ease: [0.25, 0.46, 0.45, 0.94], // ease-out suave
            }}
          />
        );
      })}

      {/* ═══ MICRO CHISPAS SECUNDARIAS — efecto lluvia de partículas ═══ */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = -Math.abs(Math.sin(angle)) * distance * 0.5 - 20;
        const size = Math.random() * 2 + 1;
        const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        
        return (
          <motion.div
            key={`micro-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: "1em",
              top: "50%",
              boxShadow: `0 0 ${size * 6}px ${color}`,
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0.6, 0],
              scale: [0, 1.8, 1, 0],
              x: [0, tx * 0.4, tx],
              y: [0, ty * 0.3, ty + 30],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.3,
              delay: delay + 0.1 + Math.random() * 0.5,
              ease: "easeOut",
            }}
          />
        );
      })}


      {/* ═══ HUMO POST-FUNDIDO — más dramático ═══ */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          left: "1em",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme === "dark" ? "rgba(100,100,120,0.5)" : "rgba(150,150,160,0.35)"} 0%, transparent 70%)`,
          filter: "blur(12px)",
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{
          opacity: [0, 0.7, 0.4, 0.15, 0],
          scale: [0.3, 2.5, 4, 5.5, 7],
          y: [0, -15, -35, -55, -80],
        }}
        transition={{
          duration: 2,
          delay: delay + 0.3,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default HeroSection;
