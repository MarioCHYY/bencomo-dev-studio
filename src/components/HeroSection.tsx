import React from "react";
import { motion, Variants } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";

const lineVariants: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 1,
  },
  visible: (delay: number) => ({
    clipPath: "inset(0 -20% 0 0)",
    opacity: 1,
    transition: {
      clipPath: {
        duration: 0.75,
        delay,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  }),
};

// glowDelay se pasa como custom desde el componente HeroSection
const glowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      duration: 1.2,
      delay,
      ease: "easeInOut",
    },
  }),
};

function AnimatedLine({ text, fillDelay, faint = false, textSize, glowStyle, glowDelay = 2.8 }: { text: string; fillDelay: number; faint?: boolean; textSize: string; glowStyle: React.CSSProperties; glowDelay?: number }) {
  return (
    <span className={`block relative ${textSize}`} style={{ lineHeight: 1.05 }}>
      <motion.span
        className="block"
        variants={lineVariants}
        custom={fillDelay}
        initial="hidden"
        animate="visible"
        style={{
          color: faint ? "rgba(255,255,255,0.2)" : undefined,
          position: "relative",
          zIndex: 1,
        }}
      >
        {text}
      </motion.span>

      {!faint && glowStyle && Object.keys(glowStyle).length > 0 && (
        <motion.span
          className="block absolute inset-0"
          variants={glowVariants}
          custom={glowDelay}
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

  const sizeEs = "text-[2.8rem] sm:text-[4rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem]";
  const sizeEn = "text-[2.2rem] sm:text-[3.2rem] md:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.8rem] 2xl:text-[5.8rem]";
  const textSize = lang === "en" ? sizeEn : sizeEs;

  const bg = theme === "dark" ? "#050505" : "#F8F8F8";
  const bgTransition = "500ms ease";

  const glowStyle: React.CSSProperties =
    theme === "dark"
      ? {
        filter: "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
        textShadow:
          "0 0 10px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.3)",
      }
      : {};

  const line1Text = t(translations.hero.title.line1) as string;
  const line2Text = t(translations.hero.title.line2) as string;
  const line3Text = t(translations.hero.title.line3) as string;

  const wordsLine1 = line1Text.split(" ");

  const t1 = 0.50;
  const t2 = t1 + 0.38;   // cuando se rellena la E (50% de EL  ≈ 0.38s con la curva de ease)
  const t3 = t2 + 0.28;   // cuando FUTURO llega a la T (50%) — ritmo diferente
  const t4 = t3 + 0.22;   // cuando SE llega a la S (50%) — ritmo diferente
  const glowDelay = t4 + 0.75 + 0.75; // 0.75s después de que DISEÑA. termina

  return (
    <section
      className="relative min-h-screen overflow-visible transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      <motion.div
        initial={{ opacity: 1, filter: "brightness(0.35)" }}
        animate={{ opacity: 1, filter: "brightness(1)" }}
        transition={{ filter: { delay: glowDelay, duration: 1.4, ease: "easeInOut" } }}
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
          src="/profile_light_v7.png"
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

      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="ml-auto w-full md:max-w-[60%] lg:max-w-[55%] xl:max-w-[52%]">

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

          <div className="mb-8 overflow-visible">
            <h1
              translate="no"
              className={`font-heading font-extrabold leading-[1.05] -tracking-[0.03em] ${theme === "dark" ? "text-white" : "text-[#050505]"
                }`}
            >
              <div className="flex flex-wrap gap-[0.25em]">
                <AnimatedLine
                  text={wordsLine1[0] || ""}
                  fillDelay={t1}
                  faint={false}
                  textSize={textSize}
                  glowStyle={glowStyle}
                  glowDelay={glowDelay}
                />

                {wordsLine1.length > 1 && (
                  <AnimatedLine
                    text={wordsLine1[1]}
                    fillDelay={t2}
                    faint={false}
                    textSize={textSize}
                    glowStyle={glowStyle}
                    glowDelay={glowDelay}
                  />
                )}
              </div>

              <AnimatedLine
                text={line2Text}
                fillDelay={t3}
                faint={true}
                textSize={textSize}
                glowStyle={{}}
                glowDelay={glowDelay}
              />

              <AnimatedLine
                text={line3Text}
                fillDelay={t4}
                faint={false}
                textSize={textSize}
                glowStyle={glowStyle}
                glowDelay={glowDelay}
              />
            </h1>
          </div>

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

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.6 }}
            className={`text-sm ${theme === "dark" ? "text-[#A0A5B0]" : "text-[#505060]"
              } leading-[1.75] font-light max-w-lg mb-9 transition-colors duration-500`}
          >
            {t(translations.hero.subtitle)}
          </motion.p>

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
