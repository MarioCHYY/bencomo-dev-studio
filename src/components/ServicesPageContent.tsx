import { motion } from "framer-motion";
import { Globe, Monitor, Server, Briefcase, RefreshCw, Smartphone, Bot, Sparkles, CheckCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";
import SectionSeparator from "@/components/SectionSeparator";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const icons = [Globe, Monitor, Server, Briefcase, RefreshCw, Smartphone, Bot, Sparkles];

const ServicesPageContent = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const s = translations.services;
  const location = useLocation();

  // Scroll to hash if present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 pt-32 md:pt-48 relative z-10">
        <div className="mb-8 text-left">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold dark:text-white text-[#0A0A0A] tracking-tight">{t(s.title)}</h1>
          <p className="mt-4 text-lg dark:text-[#A0A5B0] text-[#505060] font-light max-w-2xl">{t(s.subtitle)}</p>
        </div>
      </div>

      <SectionSeparator />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="space-y-32 pt-16 pb-32">
          {s.items.map((service, i) => {
            const Icon = icons[i] || Globe;
            const deliverables = t(service.deliverables) as string[];

            return (
              <div key={service.id} id={service.id} className="flex flex-col lg:flex-row gap-12 lg:gap-16 scroll-mt-32">
                
                {/* Left Side: Title & Description */}
                <div className="flex-1 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-primary bg-primary/10 border border-primary/20 p-3 rounded-full flex items-center justify-center">
                        <Icon size={24} strokeWidth={1.5} />
                      </span>
                      <div className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">
                        {String(i + 1).padStart(2, '0')} / {t(s.title)}
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold dark:text-white text-[#0A0A0A] -tracking-[0.02em] mb-4">
                      {t(service.title)}
                    </h2>
                    
                    {service.subtitle && (
                      <p className="text-lg md:text-xl font-medium dark:text-white text-[#0A0A0A] mb-6">
                        {t(service.subtitle)}
                      </p>
                    )}

                    <p className="text-base md:text-lg dark:text-[#A0A5B0] text-[#505060] font-light leading-relaxed max-w-xl">
                      {t(service.description)}
                    </p>
                  </motion.div>
                </div>

                {/* Right Side: Deliverables Box */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 max-w-lg w-full lg:ml-auto"
                >
                  <div 
                    className="relative p-8 md:p-10 rounded-2xl border dark:border-white/5 border-black/5 dark:bg-[#0A0A0A] bg-[#F5F5F5] transition-colors duration-500 overflow-hidden"
                  >
                    {/* Subtle Glow inside the box */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none rounded-full" />
                    
                    <h3 className="text-sm font-bold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                      <CheckCircle size={16} />
                      {lang === 'es' ? 'Entregables' : 'Deliverables'}
                    </h3>
                    
                    <ul className="space-y-5">
                      {deliverables.map((item, index) => (
                        <li key={index} className="flex items-start gap-4 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2.5 shrink-0 group-hover:bg-primary transition-colors duration-300" />
                          <span className="text-base md:text-lg dark:text-[#A0A5B0] text-[#505060] font-light leading-relaxed group-hover:dark:text-white group-hover:text-black transition-colors duration-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center border-t dark:border-white/10 border-black/10 pt-16 pb-16"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold dark:text-white text-[#0A0A0A] mb-4">
            {lang === 'es' ? '¿Buscas algo diferente?' : 'Looking for something different?'}
          </h3>
          <p className="text-[#505060] dark:text-[#A0A5B0] font-light mb-8 max-w-lg mx-auto">
            {lang === 'es' 
              ? 'Cuéntame qué tienes en mente y descubramos cómo podemos hacerlo realidad.' 
              : 'Tell me what you have in mind and let\'s discover how to make it happen.'}
          </p>
          <Link 
            to="/contacto"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {lang === 'es' ? 'Ir a Contacto' : 'Go to Contact'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPageContent;
