import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// No closing CTA band here: this page already is the conversation.
const Contact = () => {
  useSmoothScroll();
  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Contact;
