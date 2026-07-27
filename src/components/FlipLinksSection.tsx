import React from "react";
import { FlipLink } from "@/components/ui/flip-links";
import { motion } from "framer-motion";

export const FlipLinksSection = () => {
  return (
    <section className="py-24 px-6 dark:bg-[#050505] bg-[#F8F8F8] border-y dark:border-white/5 border-black/5 flex flex-col items-center justify-center min-h-[70vh] transition-colors duration-500 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-[11px] text-primary font-bold tracking-[0.3em] uppercase block mb-2">
          Redes & Contacto
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold dark:text-white text-[#0A0A0A]">
          Conectemos
        </h2>
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full">
        <FlipLink
          href="https://github.com/MarioCHYY"
          className="text-primary font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
        >
          Github
        </FlipLink>
        <FlipLink
          href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
          className="text-primary font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
        >
          Linkedin
        </FlipLink>
        <FlipLink
          href="https://www.instagram.com/mario_bencomo06"
          className="text-primary font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
        >
          Instagram
        </FlipLink>
        <FlipLink
          href="mailto:mariobencomo057@gmail.com"
          className="text-primary font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
        >
          Email
        </FlipLink>
      </div>
    </section>
  );
};

export default FlipLinksSection;
