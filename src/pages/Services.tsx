import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const ServicesPageContent = lazy(() => import("@/components/ServicesPageContent"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Services = () => {
  useSmoothScroll();
  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ServicesPageContent />
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Services;
