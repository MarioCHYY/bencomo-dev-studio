import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';

const PortfolioPageContent = lazy(() => import('@/components/PortfolioPageContent'));
const Footer = lazy(() => import('@/components/Footer'));

const SectionSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Portfolio = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={<SectionSkeleton />}>
        <PortfolioPageContent />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Portfolio;
