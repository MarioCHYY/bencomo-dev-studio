"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, Variants } from "framer-motion";
import { Code, Cpu, Globe, Layers, Sparkles, Terminal, Zap, Shield, Flame, Rocket, Star, Compass, Atom, Radio } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";
import { GradientDots } from "@/components/ui/gradient-dots";

// --- Types & Constants ---
export type AnimationPhase = "scatter" | "line" | "circle" | "arc";// --- Text Animation Helpers (from HeroSection) ---
const lineVariants: Variants = {
    hidden: { clipPath: "inset(-50% 100% -50% -50%)", opacity: 1 },
    visible: ({ delay, duration }: { delay: number; duration: number }) => ({
        clipPath: "inset(-50% -50% -50% -50%)",
        opacity: 1,
        transition: {
            clipPath: { duration: duration || 0.75, delay, ease: [0.77, 0, 0.175, 1] },
        },
    }),
};

const glowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: ({ delay }: { delay: number }) => ({
        opacity: 1,
        transition: { duration: 1.2, delay: delay + 2.0, ease: "easeInOut" },
    }),
};

function AnimatedLine({ text, fillDelay, fillDuration = 0.75, faint = false, textSize, glowStyle, inView }: { text: string; fillDelay: number; fillDuration?: number; faint?: boolean; textSize: string; glowStyle: React.CSSProperties; inView: boolean }) {
    return (
        <span className={`block relative ${textSize}`} style={{ lineHeight: 1.05 }}>
            <motion.span
                className="block"
                variants={lineVariants}
                custom={{ delay: fillDelay, duration: fillDuration }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ ...(faint ? { color: "rgba(255,255,255,0.2)" } : {}), position: "relative", zIndex: 1 }}
            >
                {text}
            </motion.span>
            {!faint && glowStyle && Object.keys(glowStyle).length > 0 && (
                <motion.span
                    className="block absolute inset-0"
                    variants={glowVariants}
                    custom={{ delay: fillDelay, duration: fillDuration }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{ ...glowStyle, zIndex: 0, pointerEvents: "none" }}
                >
                    {text}
                </motion.span>
            )}
        </span>
    );
}

// --- Main Integrated Component ---
export default function IntegratedHero() {
    const { t, lang } = useLang();
    const { theme } = useTheme();
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const sectionRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Initial Layout sizing
    useEffect(() => {
        const updateSize = () => setContainerSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Mappings
    const textDragY = 0;
    const textDragX = 0;
    const textScale = 1;
    const textOpacity = 1;

    // Trigger Hero Text animations immediately
    const heroInView = true;

    // --- HeroSection Styles & Data ---
    const bg = theme === "dark" ? "#050505" : "#F8F8F8";
    const bgTransition = "500ms ease";

    const sizeEs = "text-[2.2rem] sm:text-[2.8rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem]";
    const sizeEn = "text-[1.8rem] sm:text-[2.4rem] md:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.8rem] 2xl:text-[5.8rem]";
    const textSize = lang === "en" ? sizeEn : sizeEs;

    const glowStyle: React.CSSProperties = theme === "dark" ? {
        filter: "blur(14px)", color: "rgba(255, 255, 255, 0.95)", transform: "translateZ(0)", willChange: "opacity"
    } : {};

    const line1Text = t(translations.hero.title.line1) as string;
    const line2Text = t(translations.hero.title.line2) as string;
    const line3Text = t(translations.hero.title.line3) as string;
    const wordsLine1 = line1Text.split(" ");

    const chaoticDelays = [0.1, 0.25, 0.15, 0.3, 0.1, 0.35];
    const chaoticDurations = [0.80, 1.15, 1.05, 1.40, 0.75, 0.75];

    return (
        <section ref={sectionRef} className="relative min-h-screen w-full transition-colors duration-500 overflow-hidden" style={{ backgroundColor: bg }}>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center perspective-1000">

                {/* Intro Text Removed */}

                {/* 1. Photo Background Layer (ON TOP OF DOTS) */}
                <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto z-10 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 1, filter: theme === "dark" ? "brightness(0.3)" : "brightness(0.6)" }}
                        animate={{ opacity: 1, filter: "brightness(1)" }}
                        transition={{ duration: 1.2, delay: 2.3, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 w-full h-[60%] md:inset-y-0 md:w-[60%] md:h-full lg:w-[55%] pointer-events-none overflow-hidden lg:overflow-visible"
                    >
                        {/* Mobile/tablet: fade top so text stays readable */}
                        <div
                            className="absolute top-0 left-0 w-full h-[45%] z-10 pointer-events-none lg:hidden"
                            style={{ background: `linear-gradient(to bottom, ${bg} 10%, transparent 100%)` }}
                        />
                        <img
                            src="/gallery/hero ahora so.webp"
                            alt="Mario Bencomo Dark"
                            loading="eager"
                            className={`absolute inset-0 w-full h-full object-cover grayscale-[15%] object-[center_15%] lg:scale-[1.25] lg:origin-bottom lg:-translate-x-[5%] lg:translate-y-[20%] lg:object-[10%_bottom] 2xl:scale-[1.4] 2xl:-translate-x-[20%] 2xl:translate-y-[25%] transition-opacity duration-500 mix-blend-lighten ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
                        />
                        <img
                            src="/gallery/hero ahora so.webp"
                            alt="Mario Bencomo Light"
                            loading="eager"
                            className={`absolute inset-0 w-full h-full object-cover grayscale-[15%] object-[center_15%] lg:scale-[1.25] lg:origin-bottom lg:-translate-x-[5%] lg:translate-y-[20%] lg:object-[10%_bottom] 2xl:scale-[1.4] 2xl:-translate-x-[20%] 2xl:translate-y-[25%] transition-opacity duration-500 mix-blend-darken ${theme === "light" ? "opacity-100" : "opacity-0"}`}
                        />
                        <div className="absolute inset-0 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse at 65% 38%, rgba(200,220,255,0.25) 0%, transparent 50%)", opacity: theme === "dark" ? 0.4 : 0 }} />
                    </motion.div>
                </div>

                {/* 2. Gradient Dots Background Layer (UNDERNEATH PHOTO) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1.2, delay: 2.3, ease: "easeInOut" }}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        /* Outer mask: Soft fade on the left edge */
                        WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 15%, black 30%)",
                        maskImage: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 15%, black 30%)"
                    }}
                >
                    {/* Wrapper to aggressively dim the dots at the bottom-left so they don't highlight the shirt cut */}
                    <div className="absolute inset-0" style={{
                        WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 20% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.1) 40%, black 70%)",
                        maskImage: "radial-gradient(ellipse 50% 50% at 20% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.1) 40%, black 70%)"
                    }}>
                        <div className="absolute inset-0" style={{ WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 5%)", maskImage: "linear-gradient(to top, transparent 0%, black 5%)" }}>
                            <GradientDots duration={20} backgroundColor={bg} />
                        </div>
                    </div>
                </motion.div>

                {/* 3. Hero Content Layer (TEXT) */}
                <motion.div ref={heroRef} style={{ y: textDragY, x: textDragX, scale: textScale, opacity: textOpacity, transformOrigin: "center center" }} className="absolute inset-0 w-full h-full flex flex-col justify-start lg:justify-center max-w-7xl mx-auto px-6 md:px-12 pt-28 sm:pt-32 lg:pt-16 pb-12 z-20 pointer-events-auto">

                    {/* Text Overlay Layer */}
                    <div className="w-full lg:ml-auto lg:max-w-[55%] xl:max-w-[52%] relative">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(51,141,255,0.9)] animate-pulse" />
                            <span className="text-[11px] text-primary font-medium tracking-[0.22em] uppercase">{t(translations.hero.badge)}</span>
                        </motion.div>

                        <div className="mb-8 overflow-visible">
                            <h1 translate="no" className={`font-heading font-extrabold leading-[1.05] -tracking-[0.03em] ${theme === "dark" ? "text-white" : "text-[#050505]"}`}>
                                {wordsLine1.map((word, idx) => (
                                    <AnimatedLine key={idx} text={word} fillDelay={chaoticDelays[idx]} fillDuration={chaoticDurations[idx]} faint={false} textSize={textSize} glowStyle={glowStyle} inView={heroInView} />
                                ))}
                                <AnimatedLine text={line2Text} fillDelay={chaoticDelays[wordsLine1.length]} fillDuration={chaoticDurations[wordsLine1.length]} faint={true} textSize={textSize} glowStyle={glowStyle} inView={heroInView} />
                                <AnimatedLine text={line3Text} fillDelay={chaoticDelays[wordsLine1.length + 1]} fillDuration={chaoticDurations[wordsLine1.length + 1]} faint={false} textSize={textSize} glowStyle={glowStyle} inView={heroInView} />
                            </h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            className="flex items-center gap-3 mb-7"
                        >
                            <span className={`${theme === "dark" ? "text-white" : "text-[#0A0A0A]"} text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-500`}>Mario Bencomo</span>
                            <div className="h-px w-6 bg-primary/40" />
                            <span className="text-primary/80 text-[10px] font-bold tracking-[0.18em] uppercase">Full Stack Developer</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ delay: 1.7, duration: 0.6 }}
                            className={`text-sm ${theme === "dark" ? "text-[#A0A5B0]" : "text-[#505060]"} leading-[1.75] font-light max-w-lg mb-9 transition-colors duration-500`}
                        >
                            {t(translations.hero.subtitle)}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ delay: 1.9, duration: 0.6 }}
                        >
                            <a href="#projects" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_0_24px_rgba(51,141,255,0.3)]">
                                {t(translations.hero.cta)} →
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Full-width bottom fade to seamlessly blend with the next section without vertical cut lines */}
                <div className="absolute bottom-0 left-0 w-full h-[15%] z-30 pointer-events-none" style={{ background: `linear-gradient(to top, ${bg} 0%, transparent 100%)`, transition: `background ${bgTransition}` }} />
            </div>
        </section>
    );
}
