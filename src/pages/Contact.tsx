import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";

const ContactSection = lazy(() => import("@/components/ContactSection"));
const ContactMore = lazy(() => import("@/components/landing/ContactMore"));
const Footer = lazy(() => import("@/components/Footer"));

// No closing CTA band here: this page already is the conversation.
const Contact = () => {
  useSmoothScroll();
  const { lang } = useLang();
  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ContactSection />
        {/* what happens after you write, and the usual questions */}
        <ContactMore es={lang === "es"} />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Contact;
