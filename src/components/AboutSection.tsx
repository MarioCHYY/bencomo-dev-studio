import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import TechMarquee from "./TechMarquee";
import { useTheme } from "@/components/ThemeContext";

const AboutSection = () => {
  const { theme } = useTheme();
  const { t, lang } = useLang();
  const a = translations.about;
  const exp = translations.experience;
  const edu = translations.education;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  const stats = [
    { value: "10+", label: { en: "Projects in Progress", es: "Proyectos en Proceso" } },
    { value: "2+", label: { en: "Years Learning", es: "Años Aprendiendo" } },
    { value: "100%", label: { en: "Passion", es: "Pasión" } },
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
          className="mb-16"
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
              <div className="relative w-full md:w-[45%] min-h-[280px] sm:min-h-[360px] md:min-h-[520px] overflow-hidden shrink-0">
                <img
                  src="/about_me.webp"
                  alt="Mario Bencomo"
                  className={`absolute inset-0 w-full h-full object-cover object-[center_45%] grayscale-[10%] group-hover:scale-105 transition-all duration-[800ms] ease-out ${theme === "dark" ? "opacity-80" : "opacity-0"}`}
                />
                <img
                  src="/about_me.webp"
                  alt="Mario Bencomo Light"
                  className={`absolute inset-0 w-full h-full object-cover object-[center_45%] grayscale-[10%] group-hover:scale-105 transition-all duration-[800ms] ease-out ${theme === "light" ? "opacity-100" : "opacity-0"}`}
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
              <div className="relative z-20 flex flex-col justify-center gap-8 p-8 md:p-10 flex-1">
                {/* Subtle cold light overlay */}
                <div
                  className="absolute inset-0 mix-blend-screen pointer-events-none opacity-20"
                  style={{ background: "radial-gradient(circle at 30% 50%, rgba(200,220,255,0.15) 0%, transparent 70%)" }}
                />

                {/* Bio Text */}
                <div className="space-y-4 dark:text-[#A0A5B0] text-[#505060] font-light leading-[1.8] text-sm md:text-base lg:text-lg transition-colors duration-500">
                  <p>{t(a.p1)}</p>
                  <p>{t(a.p2)}</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
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

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-12 lg:col-span-6 glass-panel rounded-2xl p-8"
          >
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
              
              <ul className="space-y-3">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base leading-relaxed flex gap-3 transition-colors duration-500">
                    <span className="text-primary/60 mt-1 shrink-0">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-12 lg:col-span-6 glass-panel rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary" size={24} />
              <h3 className="text-2xl font-heading font-extrabold dark:text-white text-[#0A0A0A] transition-colors duration-500">{t(edu.title)}</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-primary/20">
              <div className="absolute w-3 h-3 dark:bg-[#050505] bg-[#F8F8F8] border-2 border-primary rounded-full -left-[7.5px] top-1" />
              
              {/* Use the correct nested key: edu.degree.title */}
              <h4 className="text-lg font-bold dark:text-white text-[#0A0A0A] mb-1 transition-colors duration-500">{t(edu.degree.title)}</h4>
              <div className="flex items-center flex-wrap gap-2 text-sm text-primary mb-4 font-medium [text-shadow:0_0_10px_rgba(51,141,255,0.3)]">
                <span>{t(edu.degree.institution)}</span>
                <span>•</span>
                <span>{t(edu.degree.period)}</span>
              </div>
              <p className="dark:text-[#A0A5B0] text-[#505060] text-sm md:text-base leading-relaxed transition-colors duration-500">
                {t(edu.degree.focus)}
              </p>
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
