import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionSeparator from "@/components/SectionSeparator";

// Lazy load de todo lo que está below the fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Skeleton minimalista mientras carga cada sección
const SectionSkeleton = () => (
  <div className="w-full py-24 px-6 animate-pulse">
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="h-4 bg-white/5 rounded w-1/4" />
      <div className="h-8 bg-white/5 rounded w-1/2" />
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-4 bg-white/5 rounded w-2/3" />
    </div>
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero carga inmediato — es lo primero que ve el usuario */}
      <HeroSection />

      <SectionSeparator />

      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>

      <SectionSeparator />

      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <SectionSeparator />

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>

      <SectionSeparator />

      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;