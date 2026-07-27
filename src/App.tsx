import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";
import CinematicBackground from "@/components/CinematicBackground";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Lazy-loaded routes
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Fallback loader
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F8F8] dark:bg-[#050505] transition-colors duration-500">
    <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
  </div>
);

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <TooltipProvider>
        <CinematicBackground />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/portafolio" element={<Portfolio />} />
              <Route path="/sobre-mi" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
