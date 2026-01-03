import { useEffect, Suspense, lazy } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';

// Lazy load non-critical sections
const WhyUsSection = lazy(() => import('@/components/WhyUsSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const PricingSection = lazy(() => import('@/components/PricingSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading placeholder for sections
const SectionLoader = () => (
  <div className="min-h-screen bg-background animate-pulse" />
);

const Index = () => {
  useEffect(() => {
    // Always scroll to top when component mounts (on page load/reload)
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden grain-overlay">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ProcessSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </SmoothScroll>
  );
};

export default Index;
