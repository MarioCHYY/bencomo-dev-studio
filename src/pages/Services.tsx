import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';

const ServicesPageContent = lazy(() => import('@/components/ServicesPageContent'));
const Footer = lazy(() => import('@/components/Footer'));

const SectionSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Services = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={<SectionSkeleton />}>
          <ServicesPageContent />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Services;
