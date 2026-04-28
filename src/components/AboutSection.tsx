import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Calendar, Briefcase } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const { t } = useLang();
  const a = translations.about;
  const exp = translations.experience;
  const e = translations.education;
  const responsibilities = t(exp.responsibilities) as unknown as string[];

  const profileImages = [
    "/profile2.jpg",
    "/profile3.jpg",
    "/profile4.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [profileImages.length]);

  const stats = [
    { value: "10+", label: { en: "Projects", es: "Proyectos" } },
    { value: "2+", label: { en: "Years Learning", es: "Años Aprendiendo" } },
    { value: "100%", label: { en: "Passion", es: "Pasión" } },
  ];

  return (
    <section id="about" className="section-padding relative">
      {/* Decorative line */}
      <div className="absolute left-0 right-0 top-0 cyber-divider" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-primary text-xs font-mono">{t(a.label)}</span>
            <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary mr-3">{"//"}</span>
            <span className="glow-text">{t(a.title)}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          {/* Left: Bio & Photo */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              {/* Photo Slider */}
              <div className="w-full max-w-sm shrink-0">
                <div className="aspect-[4/5] relative rounded-lg border border-border/50 bg-card/50 overflow-hidden neon-border group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={profileImages[currentImageIndex]}
                      alt="Profile"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Bio Text */}
              <div className="relative flex-1">
                <div className="absolute -left-4 top-0 bottom-0 w-px hidden md:block bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                <div className="space-y-4 md:pl-4">
                  <p className="text-foreground leading-relaxed text-sm md:text-base">
                    {t(a.p1)}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {t(a.p2)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Experience and Education */}
          <div className="space-y-16">
            
            {/* Experience Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-black tracking-tight">
                  <span className="text-primary mr-2">{"//"}</span>
                  <span className="glow-text">{t(exp.title)}</span>
                </h3>
              </div>
              
              <div className="relative pl-6 border-l border-border/30">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary shadow-[0_0_10px_hsl(120_100%_50%/0.6)] rotate-45" />
                
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      {t(exp.role)}
                    </h4>
                    <p className="text-primary text-xs mt-1 font-mono">
                      {t(exp.type)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border border-border/30 px-3 py-1.5 self-start shrink-0">
                    <Calendar size={12} className="text-primary" />
                    <span>{t(exp.period)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary text-xs mt-1 shrink-0">▸</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Education Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-black tracking-tight">
                  <span className="text-primary mr-2">{"//"}</span>
                  <span className="glow-text">{t(e.title)}</span>
                </h3>
              </div>

              <div className="relative pl-6 border-l border-border/30">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary shadow-[0_0_10px_hsl(120_100%_50%/0.6)] rotate-45" />

                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        {t(e.degree.title)}
                      </h4>
                      <p className="text-primary text-xs mt-1 font-mono">
                        {t(e.degree.period)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border border-border/30 px-3 py-1.5 self-start shrink-0">
                    <Calendar size={12} className="text-primary" />
                    <span>{t(e.degree.graduation)}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8">
                  {t(e.degree.focus)}
                </p>
              </div>
            </motion.div>

            {/* Stats row moved below Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center py-4 border border-border/50 hover:border-primary/40 transition-colors neon-border">
                  <div className="text-2xl md:text-3xl font-black text-primary glow-text mb-1">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t(stat.label)}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
