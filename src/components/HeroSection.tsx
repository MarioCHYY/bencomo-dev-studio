import React from "react";
import { motion, Variants } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";

// Usamos -20% en los insets superior, inferior e izquierdo para evitar que la fuente se corte (overflow)
// Animamos únicamente el lado derecho de 100% a -20%.
const lineVariants: Variants = {
  hidden: {
    clipPath: "inset(-20% 100% -20% -20%)",
    opacity: 1,
  },
  visible: ({ delay, duration }: { delay: number; duration: number }) => ({
    clipPath: "inset(-20% -20% -20% -20%)",
    opacity: 1,
    transition: {
      clipPath: {
        duration: duration || 0.75,
        delay,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  }),
};

// El resplandor (glow) aparece después de que TODAS las líneas se revelan por completo
const glowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: 2.9, // 2.12s (fin de la última palabra) + 0.78s de pausa
      ease: "easeInOut",
    },
  }),
};

function AnimatedLine({ text, fillDelay, fillDuration = 0.75, faint = false, textSize, glowStyle }: { text: string; fillDelay: number; fillDuration?: number; faint?: boolean; textSize: string; glowStyle: React.CSSProperties }) {
  return (
    <span className={`block relative ${textSize}`} style={{ lineHeight: 1.05 }}>
      {/* Capa fill: se revela con clip-path */}
      <motion.span
        className="block"
        variants={lineVariants}
        custom={{ delay: fillDelay, duration: fillDuration }}
        initial="hidden"
        animate="visible"
        style={{
          ...(faint ? { color: "rgba(255,255,255,0.2)" } : {}),
          position: "relative",
          zIndex: 1,
        }}
      >
        {text}
      </motion.span>

      {/* Capa glow: se ilumina fuertemente después del reveal */}
      {!faint && glowStyle && Object.keys(glowStyle).length > 0 && (
        <motion.span
          className="block absolute inset-0"
          variants={glowVariants}
          custom={{ delay: fillDelay, duration: fillDuration }}
          initial="hidden"
          animate="visible"
          style={{
            ...glowStyle,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}

const HeroSection = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();

  const sizeEs = "text-[2.2rem] sm:text-[2.8rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem]";
  const sizeEn = "text-[1.8rem] sm:text-[2.4rem] md:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.8rem] 2xl:text-[5.8rem]";
  const textSize = lang === "en" ? sizeEn : sizeEs;

  const bg = theme === "dark" ? "#050505" : "#F8F8F8";
  const bgTransition = "500ms ease";

  // El "granulado" o "banding" en WebKit es común al apilar muchos text-shadows grandes.
  // Para un resplandor perfectamente suave, usamos filter: blur() sobre el texto de fondo.
  const glowStyle: React.CSSProperties =
    theme === "dark"
      ? {
        filter: "blur(14px)", // Nivel de desenfoque intermedio para un halo suave pero visible
        color: "rgba(255, 255, 255, 0.95)", // Casi blanco puro, sin saturar
        transform: "translateZ(0)", // Aceleración por hardware para evitar artifacts
        willChange: "opacity",
      }
      : {};

  const line1Text = t(translations.hero.title.line1) as string;
  const line2Text = t(translations.hero.title.line2) as string;
  const line3Text = t(translations.hero.title.line3) as string;

  const wordsLine1 = line1Text.split(" ");

  // Delays y duraciones "disparejos" (caóticos) para romper el efecto escalonado.
  // Todos inician muy cerca pero a diferentes velocidades.
  const chaoticDelays = [0.55, 0.68, 0.60, 0.72, 0.58, 0.75];
  const chaoticDurations = [0.80, 1.15, 1.05, 1.40, 0.75, 0.75];

  return (
    <section
      className="relative min-h-screen overflow-visible transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      {/* ─── PHOTO ─── */}
      <motion.div
        initial={{ opacity: 0, filter: theme === "dark" ? "brightness(0.3)" : "brightness(0.6)" }}
        animate={{ opacity: 1, filter: "brightness(1)" }}
        transition={{
          opacity: { duration: 1.4, ease: "easeOut" },
          filter: { delay: 2.9, duration: 1.2, ease: "easeInOut" }
        }}
        className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[55%] pointer-events-none overflow-hidden"
      >
        <img
          src="/profile_photo_upscaled.png"
          alt="Mario Bencomo Dark"
          className={`absolute inset-0 w-full h-[110%] object-cover grayscale-[15%] -translate-y-[10%] transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
          style={{ objectPosition: "center 30%" }}
        />
        <img
          src="/profile_photo_upscaled.png"
          alt="Mario Bencomo Light"
          className={`absolute inset-0 w-full h-[110%] object-cover grayscale-[15%] transition-opacity duration-500 ${theme === "light" ? "opacity-100" : "opacity-0"
            }`}
          style={{
            objectPosition: "center 30%",
            transform: "scale(0.84) translate(-1.8%, -5%)",
            transformOrigin: "40% 40%",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(ellipse at 65% 38%, rgba(200,220,255,0.25) 0%, transparent 50%)",
            opacity: theme === "dark" ? 0.4 : 0,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[25%]"
          style={{
            background: `linear-gradient(to bottom, ${bg} 0%, transparent 100%)`,
            transition: `background ${bgTransition}`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%]"
          style={{
            background: `linear-gradient(to top, ${bg} 0%, ${bg}cc 40%, transparent 100%)`,
            transition: `background ${bgTransition}`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, transparent 60%, ${bg} 100%)`,
            transition: `background ${bgTransition}`,
          }}
        />
      </motion.div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="ml-auto w-full md:max-w-[60%] lg:max-w-[55%] xl:max-w-[52%]">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(51,141,255,0.9)] animate-pulse" />
            <span className="text-[11px] text-primary font-medium tracking-[0.22em] uppercase">
              {t(translations.hero.badge)}
            </span>
          </motion.div>

          {/* ─── HEADLINE con animación outline → fill ─── */}
          <div className="mb-8 overflow-visible">
            <h1
              translate="no"
              className={`font-heading font-extrabold leading-[1.05] -tracking-[0.03em] ${theme === "dark" ? "text-white" : "text-[#050505]"
                }`}
            >
              {/* Línea 1 dividida en palabras para animarlas desfasadas a la mitad */}
              {wordsLine1.map((word, idx) => (
                <AnimatedLine
                  key={idx}
                  text={word}
                  fillDelay={chaoticDelays[idx]}
                  fillDuration={chaoticDurations[idx]}
                  faint={false}
                  textSize={textSize}
                  glowStyle={glowStyle}
                />
              ))}

              {/* Línea 2 ("SE") — tenue intencional */}
              <AnimatedLine
                text={line2Text}
                fillDelay={chaoticDelays[wordsLine1.length]}
                fillDuration={chaoticDurations[wordsLine1.length]}
                faint={true}
                textSize={textSize}
                glowStyle={glowStyle}
              />

              {/* Línea 3 ("DISEÑA.") */}
              <AnimatedLine
                text={line3Text}
                fillDelay={chaoticDelays[wordsLine1.length + 1]}
                fillDuration={chaoticDurations[wordsLine1.length + 1]}
                faint={false}
                textSize={textSize}
                glowStyle={glowStyle}
              />
            </h1>
          </div>

          {/* Name & Role */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="flex items-center gap-3 mb-7"
          >
            <span
              className={`${theme === "dark" ? "text-white" : "text-[#0A0A0A]"
                } text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-500`}
            >
              Mario Bencomo
            </span>
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-primary/80 text-[10px] font-bold tracking-[0.18em] uppercase">
              Full Stack Developer
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.6 }}
            className={`text-sm ${theme === "dark" ? "text-[#A0A5B0]" : "text-[#505060]"
              } leading-[1.75] font-light max-w-lg mb-9 transition-colors duration-500`}
          >
            {t(translations.hero.subtitle)}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
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

export default HeroSection;