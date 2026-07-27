import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';

const AboutPageContent = lazy(() => import('@/components/AboutPageContent'));
const Footer = lazy(() => import('@/components/Footer'));

const SectionSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const About = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutPageContent />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default About;
