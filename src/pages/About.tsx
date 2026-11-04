import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const AboutPageContent = lazy(() => import("@/components/AboutPageContent"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const About = () => {
  useSmoothScroll();
  return (
  <main className="min-h-screen">
    <Starfield />
    <Navbar />
    <Suspense fallback={<div className="min-h-screen" />}>
      <AboutPageContent />
      <CTASection />
      <Footer />
    </Suspense>
  </main>
  );
};

export default About;
