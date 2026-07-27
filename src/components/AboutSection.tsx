import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import TechMarquee from "./TechMarquee";
import { useTheme } from "@/components/ThemeContext";
import { FlipLink } from "@/components/ui/flip-links";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t, lang } = useLang();
  const a = translations.about;
  const exp = translations.experience;
  const edu = translations.education;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  const stats = [
    { value: "10+", label: { en: "Developed Projects", es: "Proyectos creados" } },
    { value: "2+", label: { en: "Years of Experience", es: "Años aprendiendo y construyendo" } },
    { value: "100%", label: { en: "Commitment", es: "Intención en cada detalle" } },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="w-full h-px dark:bg-white/[0.05] bg-black/[0.05] absolute top-0 left-0 right-0" />
      
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[11px] text-primary font-medium tracking-[0.16em] uppercase">{t(a.label)}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.03em] transition-colors duration-500">
            {t(a.title)}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Unified Hero + Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-500 rounded-2xl overflow-hidden relative group"
            style={{ backgroundColor: theme === "dark" ? "#000000" : "#F8F8F8", transition: "background-color 500ms ease" }}
          >
            <div className="flex flex-col md:flex-row">

              {/* Image Column */}
              <div className="relative w-full md:w-[35%] min-h-[160px] sm:min-h-[200px] md:min-h-[260px] overflow-hidden shrink-0">
                <img
                  src="/gallery/sobre_mi_home.webp"
                  alt="Mario Bencomo Dark"
                  loading="lazy"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    theme === "dark" ? "opacity-100" : "opacity-0"
                  }`}
                />
                <img
                  src="/gallery/sobre_mi_home.webp"
                  alt="Mario Bencomo Light"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover object-[center_45%] grayscale-[10%] group-hover:scale-105 transition-all duration-700 ease-out ${theme === "light" ? "opacity-100" : "opacity-0"}`}
                  style={{ mixBlendMode: "multiply" }}
                />
                {/* Fade to right (desktop) */}
                <div
                  className="hidden md:block absolute inset-0 z-10"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(to right, transparent 65%, #000000)"
                      : "linear-gradient(to right, transparent 65%, #F8F8F8)",
                    transition: "background 500ms ease"
                  }}
                />
                {/* Fade to bottom (mobile) */}
                <div
                  className="md:hidden absolute inset-0 z-10"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(to top, #000000 20%, transparent)"
                      : "linear-gradient(to top, #F8F8F8 20%, transparent)",
                    transition: "background 500ms ease"
                  }}
                />
              </div>

              {/* Right Column: Text + Stats */}
              <div className="relative z-20 flex flex-col justify-center gap-4 p-5 md:p-6 flex-1">
                {/* Subtle cold light overlay */}
                <div
                  className="absolute inset-0 mix-blend-screen pointer-events-none opacity-20"
                  style={{ background: "radial-gradient(circle at 30% 50%, rgba(200,220,255,0.15) 0%, transparent 70%)" }}
                />

                {/* Bio Text */}
                <div className="space-y-3 dark:text-[#A0A5B0] text-[#505060] font-light leading-[1.7] text-sm md:text-sm lg:text-base transition-colors duration-500">
                  <p>{lang === "es" ? "Desarrollo productos digitales donde el diseño y el código trabajan juntos. Creo experiencias modernas con un enfoque obsesivo por los detalles." : "I develop digital products where design and code work together. I create modern experiences with an obsessive focus on details."}</p>
                </div>

                {/* Link to Sobre mi */}
                <div 
                  className="flex items-center gap-2 group w-fit cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/sobre-mi");
                    window.scrollTo(0, 0);
                  }}
                >
                  <FlipLink href="/sobre-mi" className="text-primary font-bold text-sm md:text-base uppercase tracking-wider">
                    {lang === "es" ? "Conoce mi historia" : "Read my story"}
                  </FlipLink>
                  <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-2">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col justify-center items-start text-left group/stat">
                      <div className="text-2xl sm:text-3xl md:text-5xl font-heading font-extrabold text-primary mb-1 [text-shadow:0_0_20px_rgba(51,141,255,0.4)] group-hover/stat:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-[10px] dark:text-white/60 text-black/60 uppercase tracking-[0.2em] font-medium">
                        {lang === "es" ? stat.label.es : stat.label.en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Tech Marquee */}
      <TechMarquee />
    </section>
  );
};

export default AboutSection;
