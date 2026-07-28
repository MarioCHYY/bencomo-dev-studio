import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";
import { Briefcase, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import SphereImageGrid from "./ui/image-sphere";
import { GradientDots } from "./ui/gradient-dots";
import SectionSeparator from "@/components/SectionSeparator";
import { galleryImages } from "./galleryImages";
import { SpotifyCoverflow } from "./ui/spotify-coverflow";

const spotifyTracks = [
  "6SQLk9HSNketfgs2AyIiMs",
  "2IOFZdYYkFxEHVz1w34PoL",
  "45S5WTQEGOB1VHr1Q4FuPl",
  "6UelLqGlWMcVH1E5c4H7lY",
  "3jjujdWJ72nww5eGnfs2E7",
  "4jAIqgrPjKLTY9Gbez25Qb",
  "1ZMiCix7XSAbfAJlEZWMCp",
  "6VzcQuzTNTMFnJ6rBSaLH9",
  "33bURv895AN4FkBvgFo2dx",
  "1IF5UcqRO42D12vYwceOY6",
  "5Ohxk2dO5COHF1krpoPigN",
  "4B1rpPmQXwj78wk6aIGwwU",
  "5Lbsc65org0b85kNsPkluY",
  "33SNO8AaciGbNaQFkxvPrW",
  "7gtG45ieyQzKtNKobfLd49",
  "3xClevycpBON8bkyxFbAna",
  "0tV6LXuVzJR4yifqwQuNwN",
  "6GteP2UCnpHRWSZTL63QHe",
  "0QPdjsMOUhwouq1NS3HwfQ",
  "0VV0AMmgLBUhzuFedr3F3e",
  "028i7HBfp8uE5epmx5ieMA",
  "56k68P3bFQvnKw89hizJFZ",
  "1sA1DhT0bLyeICf8NalPS7",
  "0i4qKfuKJ3juUsEwnJAxk3",
  "7s7v5EoNLD6TwDu4Nw51Oy",
  "3QuRLv8zkIYH31O5VgEpmo",
  "3i058E8uxTsYqJ5NWZzqSj",
  "6uvh0In7u1Xn4HgxOfAn8O",
  "0rzaRSujxA0bKyjJl6vHYq",
  "6qj02zSeEJGWZ4c0dn5QzJ",
  "1mw0RgNXIpYRyyCdBQbLgA",
  "5LYMamLv12UPbemOaTPyeV",
  "1qEmFfgcLObUfQm0j1W2CK",
  "4j6kId9QIqhoXvqHKgSKa0",
  "4Dvkj6JhhA12EX05fT7y2e",
  "51Zw1cKDgkad0CXv23HCMU",
  "35TyJIMR3xRouUuo2sjS6v",
  "69w5X6uTrOaWM32IetSzvO",
  "2NcQic8JxdjAlAHuNbOIRE"
];

const AboutPageContent = () => {
  const { theme } = useTheme();
  const { t, lang } = useLang();
  const a = translations.aboutPage;
  const exp = translations.experience;
  const edu = translations.education;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  const storyImages = [
    "/gallery/story_1.webp",
    "/gallery/story_2.webp",
    "/gallery/story_3.webp",
    "/gallery/story_4.webp",
    "/gallery/story_5.webp"
  ];

  const [currentStoryImage, setCurrentStoryImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStoryImage((prev) => (prev + 1) % storyImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pb-32 overflow-hidden">
      {/* 1. Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center pt-24 pb-12">
        <div 
            className="absolute inset-0 z-0 opacity-30 pointer-events-none"
            style={{
                WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 5%)",
                maskImage: "linear-gradient(to top, transparent 0%, black 5%)"
            }}
        >
            <GradientDots backgroundColor={theme === 'dark' ? '#050505' : '#F8F8F8'} />
        </div>
        <section className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-[3/4] md:h-[80vh] md:aspect-auto rounded-xl shadow-2xl p-[2px] overflow-hidden"
          >
            {/* Animated Border */}
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_280deg,white_360deg)] animate-[spin_10s_linear_infinite]" />
            
            {/* Inner Content (Masks the inner part of the gradient, leaving only the border) */}
            <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-black">
                <img 
                  src="/gallery/sobre_mi_hero.webp" 
                  alt="Mario Bencomo" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                />
                <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-black/80 backdrop-blur-md text-[10px] tracking-[0.2em] text-white/90 uppercase border border-white/10 z-10">
                  FIG. 01 / FRAME INICIAL
                </div>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col relative z-10 max-w-xl"
          >
            <div className="text-[10px] tracking-[0.2em] text-primary uppercase mb-6 font-medium">
              {t(a.heroBadge)}
            </div>
            
            <motion.h1 
              initial={{ 
                color: theme === 'dark' ? "rgba(255,255,255,0.2)" : "#0A0A0A", 
                textShadow: "0 0 20px rgba(255,255,255,0), 0 0 40px rgba(255,255,255,0)" 
              }}
              animate={{ 
                color: theme === 'dark' ? "#ffffff" : "#0A0A0A", 
                textShadow: theme === 'dark' ? "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)" : "0 0 20px rgba(0,0,0,0), 0 0 40px rgba(0,0,0,0)" 
              }}
              transition={{ 
                color: { duration: 1.0, delay: 0.4 },
                textShadow: { duration: 1.5, delay: 1.2, ease: "easeOut" } 
              }}
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold -tracking-[0.03em] mb-8 leading-tight"
            >
              {t(a.heroTitle)}
            </motion.h1>
            
            <p className="italic text-xl md:text-2xl lg:text-[28px] dark:text-white/90 text-black/90 mb-10 leading-relaxed font-light">
              {t(a.heroQuote)}
            </p>
            
            <div className="space-y-6 dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base font-light leading-[1.8]">
              <p>{t(a.heroP1)}</p>
              <p>{t(a.heroP2)}</p>
              <p>{t(a.heroP3)}</p>
            </div>
          </motion.div>
        </section>
      </div>

      <SectionSeparator />

      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-12 pb-32">
        {/* 2. Mi historia */}
        <section className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
              {t(a.storyLabel)}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-500 rounded-2xl overflow-hidden relative group"
            style={{ backgroundColor: theme === "dark" ? "#000000" : "#F8F8F8", transition: "background-color 500ms ease" }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Column */}
              <div className="relative w-full md:w-[45%] min-h-[360px] md:min-h-[520px] overflow-hidden shrink-0">
                {storyImages.map((src, index) => (
                  <img 
                    key={src}
                    src={src} 
                    alt={`Mario Bencomo Story ${index + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover object-[center_45%] transition-all duration-1000 ease-out ${
                      currentStoryImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`} 
                  />
                ))}
                
                <div className="absolute top-6 left-6 z-10 text-[10px] tracking-[0.2em] font-medium text-white uppercase [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  FIG. 01 / HISTORIA
                </div>

                {/* Fade to right (desktop) */}
                <div
                  className="hidden md:block absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(to right, transparent 65%, #000000)"
                      : "linear-gradient(to right, transparent 65%, #F8F8F8)",
                    transition: "background 500ms ease"
                  }}
                />
                {/* Fade to bottom (mobile) */}
                <div
                  className="md:hidden absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(to top, #000000 20%, transparent)"
                      : "linear-gradient(to top, #F8F8F8 20%, transparent)",
                    transition: "background 500ms ease"
                  }}
                />
              </div>

              {/* Text Column */}
              <div className="relative z-20 flex flex-col justify-center gap-8 p-8 md:p-12 flex-1">
                {/* Subtle cold light overlay */}
                <div
                  className="absolute inset-0 mix-blend-screen pointer-events-none opacity-20"
                  style={{ background: "radial-gradient(circle at 30% 50%, rgba(200,220,255,0.15) 0%, transparent 70%)" }}
                />

                <div className="space-y-6 dark:text-[#A0A5B0] text-[#505060] font-light text-base md:text-lg lg:text-xl leading-relaxed relative z-20">
                  <p>{t(a.storyP1)}</p>
                  <p>{t(a.storyP2)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* --- SECTION SEPARATOR --- */}
      <SectionSeparator />

      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-12 pb-32">
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-2"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
            {lang === 'es' ? 'Experiencia & Educación' : 'Experience & Education'}
          </h2>
        </motion.div>

        {/* 3. Experiencia y Educación */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Experiencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col h-full"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">
              {t(a.experienceLabel)}
            </h2>
            <div className="glass-panel rounded-2xl p-8 flex-grow">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary" size={24} />
                <h3 className="text-2xl font-heading font-extrabold dark:text-white text-[#0A0A0A] transition-colors duration-500">{t(exp.title)}</h3>
              </div>

              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute w-3 h-3 dark:bg-[#050505] bg-[#F8F8F8] border-2 border-primary rounded-full -left-[7.5px] top-1" />
                
                <h4 className="text-lg font-bold dark:text-white text-[#0A0A0A] mb-1 transition-colors duration-500">{t(exp.role)}</h4>
                <div className="flex items-center flex-wrap gap-2 text-sm text-primary mb-4 font-medium [text-shadow:0_0_10px_rgba(51,141,255,0.3)]">
                  <span>{t(exp.type)}</span>
                  <span>•</span>
                  <span>{t(exp.period)}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {responsibilities.map((resp, i) => (
                    <li key={i} className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base leading-relaxed flex gap-3 transition-colors duration-500">
                      <span className="text-primary/60 mt-1 shrink-0">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#projects" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 gap-2 shadow-[0_0_15px_rgba(51,141,255,0.3)]"
                >
                  {t(a.expButton)} <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Educación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col h-full"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">
              {t(a.educationLabel)}
            </h2>
            <div className="glass-panel rounded-2xl p-8 flex-grow">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary" size={24} />
                <h3 className="text-2xl font-heading font-extrabold dark:text-white text-[#0A0A0A] transition-colors duration-500">{t(edu.title)}</h3>
              </div>

              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute w-3 h-3 dark:bg-[#050505] bg-[#F8F8F8] border-2 border-primary rounded-full -left-[7.5px] top-1" />
                
                <h4 className="text-lg font-bold dark:text-white text-[#0A0A0A] mb-1 transition-colors duration-500">{t(edu.degree.title)}</h4>
                <div className="flex items-center flex-wrap gap-2 text-sm text-primary mb-4 font-medium [text-shadow:0_0_10px_rgba(51,141,255,0.3)]">
                  <span>{t(edu.degree.institution)}</span>
                  <span>•</span>
                  <span>{t(edu.degree.period)}</span>
                </div>
                <p className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base leading-relaxed transition-colors duration-500 mb-6">
                  {t(edu.degree.focus)}
                </p>

                {/* Certifications */}
                {(edu as any).certifications && ((edu as any).certifications as any[]).map((cert, i) => (
                  <div key={i} className="mt-8 relative">
                    <div className="absolute w-3 h-3 dark:bg-[#050505] bg-[#F8F8F8] border-2 border-primary rounded-full -left-[31.5px] top-1" />
                    <h4 className="text-lg font-bold dark:text-white text-[#0A0A0A] mb-1 transition-colors duration-500">{t(cert.title)}</h4>
                    <div className="flex items-center flex-wrap gap-2 text-sm text-primary mb-2 font-medium [text-shadow:0_0_10px_rgba(51,141,255,0.3)]">
                      <span>{t(cert.institution)}</span>
                      <span>•</span>
                      <span>{t(cert.period)}</span>
                    </div>
                    <p className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base leading-relaxed transition-colors duration-500">
                      {t(cert.focus)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <SectionSeparator />

      {/* 7. Canciones Favoritas 🎧 */}
      <section className="w-full mt-12">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left mb-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
              {lang === "es" ? "Canciones Favoritas" : "Favorite Songs"}
            </h2>
            <p className="dark:text-[#A0A5B0] text-[#505060] font-light mt-4 max-w-2xl text-lg">
              {lang === "es" ? "La música que acompaña mi día a día." : "The music that accompanies my day to day."}
            </p>
          </motion.div>
        </div>

        {/* Spotify Tracks Carousel - Coverflow 3D */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mt-4 mb-20 relative"
        >
          <SpotifyCoverflow tracks={spotifyTracks} />
        </motion.div>
      </section>

      <SectionSeparator />

      {/* 8. Galería 📷 */}
      <section className="w-full mt-12">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left mb-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
              {lang === "es" ? "Galería" : "Gallery"}
            </h2>
            <p className="dark:text-[#A0A5B0] text-[#505060] font-light mt-4 max-w-2xl text-lg">
              {lang === "es" ? "Un vistazo a mi día a día y detrás de escena." : "A look into my day to day and behind the scenes."}
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="w-full overflow-hidden relative pb-8 pt-4">
          <div className="flex w-max animate-[marquee_90s_linear_infinite] hover:[animation-play-state:paused]">
            {/* Primer Set */}
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
              {galleryImages.map((src, i) => (
                <div
                  key={`first-${i}`}
                  className="relative shrink-0 w-[280px] md:w-[350px] aspect-[4/5] rounded-2xl overflow-hidden group shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-primary/10"
                >
                  <img 
                    src={src} 
                    alt={`Instagram Post ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              ))}
            </div>

            {/* Segundo Set (Clon para el loop infinito) */}
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
              {galleryImages.map((src, i) => (
                <div
                  key={`second-${i}`}
                  className="relative shrink-0 w-[280px] md:w-[350px] aspect-[4/5] rounded-2xl overflow-hidden group shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-primary/10"
                >
                  <img 
                    src={src} 
                    alt={`Instagram Post clone ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Degradados en los bordes para que las fotos aparezcan y desaparezcan suavemente */}
          <div className="absolute inset-y-0 left-0 w-[60px] md:w-[150px] bg-gradient-to-r dark:from-[#050505] from-[#F8F8F8] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-[60px] md:w-[150px] bg-gradient-to-l dark:from-[#050505] from-[#F8F8F8] to-transparent pointer-events-none z-10" />
        </div>
      </section>


    </div>
  );
};

export default AboutPageContent;
