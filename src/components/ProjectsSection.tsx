import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Lightbulb, Target, Rocket, BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from "@/components/ui/progressive-carousel";
import { useNavigate } from "react-router-dom";

export const techStackFeatured = ["React", "Vite", "TypeScript", "TailwindCSS", "Shadcn UI"];

export const projectsList = [
  {
    id: "project2",
    img: "/gallery/clearbuild studio.webp",
    translationKey: "project2",
    github: null,
    live: "https://your-demo-studio.vercel.app",
  },
  {
    id: "project1",
    img: "/gallery/proyecto_beauty_studio.webp",
    translationKey: "project1",
    github: null,
    live: "https://radiant-beauty-studio-main.vercel.app/",
  },
  {
    id: "project3",
    img: "/gallery/proyecto_travel_genie.webp",
    translationKey: "project3",
    github: "https://github.com/MarioCHYY/smart-travel-genie",
    live: "https://smart-travel-genie-yssl.vercel.app",
  },
  {
    id: "project4",
    img: "/gallery/amazon tracker bo.webp",
    translationKey: "project4",
    github: null,
    live: "https://t.me/MarioMacAgent_bot",
  }
];

const ProjectsSection = () => {
  const { t, lang } = useLang();
  const p = translations.projects;
  const navigate = useNavigate();

  return (
    <>
      <section id="proyectos" className="py-24 md:py-32 relative overflow-hidden bg-[#F8F8F8] dark:bg-[#050505] transition-colors duration-500">
        <div className="absolute inset-0 dark:bg-white/[0.01] bg-black/[0.01]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
                {t(p.label)}
              </h2>
              <p className="text-3xl md:text-5xl font-heading font-extrabold dark:text-white text-[#0A0A0A] max-w-2xl leading-tight">
                {t(p.title)}
              </p>
              <p className="mt-4 text-base dark:text-[#A0A5B0] text-[#505060] font-light max-w-xl">
                {t(p.subtitle)}
              </p>
            </div>
          </motion.div>

          {/* Progressive Carousel replacing Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full relative"
          >
            <ProgressSlider vertical={false} activeSlider="project2" items={projectsList.map(p => p.id)}>
              <SliderContent>
                {projectsList.map((item) => {
                  // @ts-ignore
                  const projData = p[item.translationKey];
                  return (
                    <SliderWrapper key={item.id} value={item.id}>
                      <div className="relative group rounded-2xl overflow-hidden w-full 2xl:h-[600px] h-[500px]">
                        <img
                          className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          src={item.img}
                          alt={t(projData.name) as string}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-500" />
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pb-32 md:pb-40 flex flex-col items-start gap-4">
                           <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full border border-primary/20 backdrop-blur-md">
                             {t(p.featured) || "PROYECTO"}
                           </span>
                           <h3 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight">
                             {t(projData.name)}
                           </h3>
                           <div className="flex gap-4 mt-2">
                             <button
                               onClick={() => navigate('/portafolio#' + item.id)}
                               className="bg-primary text-white px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2"
                             >
                               {t(p.viewCaseStudy) || "Ver Caso de Estudio"}
                               <ChevronRight size={16} />
                             </button>
                             {item.live && (
                               <a
                                 href={item.live}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="border border-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all backdrop-blur-md"
                               >
                                 <ExternalLink size={18} />
                               </a>
                             )}
                           </div>
                        </div>
                      </div>
                    </SliderWrapper>
                  );
                })}
              </SliderContent>

              {/* Slider Buttons */}
              <SliderBtnGroup className="mt-4 md:mt-6 h-fit dark:bg-[#0A0A0A] bg-[#F8F8F8] border dark:border-white/10 border-black/10 overflow-hidden flex flex-col md:grid md:grid-cols-4 rounded-xl">
                {projectsList.map((item, index) => {
                  // @ts-ignore
                  const projData = p[item.translationKey];
                  return (
                    <SliderBtn
                      key={item.id}
                      value={item.id}
                      className={`text-left cursor-pointer p-4 md:p-5 transition-all duration-300 ${index !== projectsList.length - 1 ? 'border-b md:border-b-0 md:border-r dark:border-white/10 border-black/10' : ''}`}
                      progressBarClass="bg-primary/20 dark:bg-primary/20 h-full"
                    >
                      <h2 className="relative px-3 py-1 rounded-full w-fit dark:bg-white dark:text-black text-white bg-[#0A0A0A] mb-2 text-xs md:text-sm font-bold tracking-wide">
                        0{index + 1}
                      </h2>
                      <p className="text-sm md:text-base font-bold dark:text-white text-[#0A0A0A] line-clamp-1 mb-1 font-heading">
                        {t(projData.name)}
                      </p>
                      <p className="text-xs md:text-sm dark:text-[#A0A5B0] text-[#505060] font-light line-clamp-1">
                        {t(projData.oneliner)}
                      </p>
                    </SliderBtn>
                  );
                })}
              </SliderBtnGroup>
            </ProgressSlider>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
