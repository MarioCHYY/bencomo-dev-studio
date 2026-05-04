import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SectionSeparator />
      <AboutSection />
      <SectionSeparator />
      <ProjectsSection />
      <SectionSeparator />
      <ServicesSection />
      <SectionSeparator />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
