import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import IntegratedHero from "@/components/IntegratedHero";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
// case studies are on hold: "coming soon" until there is work worth showing (ProjectsSection keeps the gallery)
const ProjectsSection = lazy(() => import("@/components/WorkComingSoon"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const TechStrip = lazy(() => import("@/components/TechStrip"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionSkeleton = () => <div className="w-full h-[60vh]" />;

const Index = () => {
  useSmoothScroll();

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <IntegratedHero />

      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
        <ProcessSection />
        <ProjectsSection />
        <ServicesSection />
        <TechStrip />
        <FaqSection />
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
