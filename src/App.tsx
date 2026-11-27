import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";
import CinematicBackground from "@/components/CinematicBackground";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import PageTransition from "@/components/fx/PageTransition";
import BlueprintMode from "@/components/fx/BlueprintMode";
import PageMeta from "@/seo/PageMeta";
import IntroCut from "@/components/fx/IntroCut";
import SkyLight from "@/components/fx/SkyLight";
import RevealObserver from "@/components/fx/RevealObserver";

// Lazy-loaded routes
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CaseCorte = lazy(() => import("./pages/CaseCorte"));
const CaseTachado = lazy(() => import("./pages/CaseTachado"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const UiUxCuliacan = lazy(() => import("./pages/UiUxCuliacan"));
const Ejemplos = lazy(() => import("./pages/Ejemplos"));
const Notes = lazy(() => import("./pages/Notes"));
const NoteDetail = lazy(() => import("./pages/NoteDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Fallback loader
const PageLoader = () => (
  <div data-page-loader className="min-h-screen w-full flex items-center justify-center bg-paper dark:bg-[#050505] transition-colors duration-500">
    <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
  </div>
);

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <CinematicBackground />
      <Toaster />
      <SkyLight />
      <RevealObserver />
      <IntroCut />
      <BrowserRouter>
        <PageTransition />
        <PageMeta />
        <BlueprintMode />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/servicios/:id" element={<ServiceDetail />} />
            <Route path="/diseno-ui-ux-culiacan" element={<UiUxCuliacan />} />
            <Route path="/ejemplos-paginas-web" element={<Ejemplos />} />
            <Route path="/notas" element={<Notes />} />
            <Route path="/notas/:slug" element={<NoteDetail />} />
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/portafolio/corte" element={<CaseCorte />} />
            <Route path="/portafolio/tachado" element={<CaseTachado />} />
            <Route path="/sobre-mi" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
