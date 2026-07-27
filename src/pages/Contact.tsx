import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import SectionSeparator from '@/components/SectionSeparator';

const CTASection = lazy(() => import('@/components/CTASection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

const SectionSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Contact = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="w-full [&>section]:min-h-screen [&>section]:flex [&>section]:flex-col [&>section]:justify-center [&>section]:pt-24">
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Contact;
