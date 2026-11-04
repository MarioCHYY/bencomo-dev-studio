import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";

// Case studies are on hold; PortfolioPageContent keeps the old gallery for when they're ready.
const WorkComingSoon = lazy(() => import("@/components/WorkComingSoon"));
const Footer = lazy(() => import("@/components/Footer"));

const Portfolio = () => (
  <main className="min-h-screen">
    <Starfield />
    <Navbar />
    <Suspense fallback={<div className="min-h-screen" />}>
      <WorkComingSoon page />
      <Footer />
    </Suspense>
  </main>
);

export default Portfolio;
