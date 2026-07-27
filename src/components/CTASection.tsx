import { FloatingIconsSection } from '@/components/ui/floating-icons';
import { Mail, Linkedin, Instagram, MessageCircle, Github, Figma, Terminal, Database, Globe, Layers, Cpu, Smartphone } from 'lucide-react';
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const icons = [
  // Top Left Area
  { id: 1, icon: MessageCircle, className: 'top-[12%] left-[10%] md:top-[15%] md:left-[12%]' },
  { id: 3, icon: Globe, className: 'top-[5%] left-[25%] md:top-[8%] md:left-[30%]' },
  
  // Mid Left Area
  { id: 2, icon: Github, className: 'top-[40%] left-[5%] md:top-[45%] md:left-[8%]' },
  { id: 6, icon: Cpu, className: 'bottom-[35%] left-[5%] md:bottom-[35%] md:left-[8%]' },

  // Bottom Left Area
  { id: 4, icon: Instagram, className: 'bottom-[12%] left-[10%] md:bottom-[15%] md:left-[15%]' },
  { id: 5, icon: Layers, className: 'bottom-[5%] left-[28%] md:bottom-[8%] md:left-[32%]' },

  // Top Right Area
  { id: 7, icon: Linkedin, className: 'top-[15%] right-[10%] md:top-[18%] md:right-[15%]' },
  { id: 9, icon: Database, className: 'top-[8%] right-[25%] md:top-[10%] md:right-[30%]' },

  // Mid Right Area
  { id: 11, icon: Terminal, className: 'top-[30%] right-[8%] md:top-[35%] md:right-[10%]' },
  { id: 8, icon: Figma, className: 'top-[45%] right-[5%] md:top-[50%] md:right-[8%]' },

  // Bottom Right Area
  { id: 10, icon: Mail, className: 'bottom-[18%] right-[10%] md:bottom-[20%] md:right-[12%]' },
  { id: 12, icon: Smartphone, className: 'bottom-[8%] right-[25%] md:bottom-[10%] md:right-[28%]' },
];

const CTASection = () => {
  const { t } = useLang();
  
  return (
    <FloatingIconsSection
      title={t(translations.ctaSection.title)}
      subtitle={t(translations.ctaSection.subtitle)}
      ctaText={t(translations.ctaSection.button)}
      ctaHref="/contacto"
      icons={icons}
    />
  );
};

export default CTASection;
