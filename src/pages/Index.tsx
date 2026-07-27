import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import IntegratedHero from "@/components/IntegratedHero";
import SectionSeparator from "@/components/SectionSeparator";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

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
      <IntegratedHero />

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
        <CTASection />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;