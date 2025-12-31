import { useEffect } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

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
          <WhyUsSection />
          <ProcessSection />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
