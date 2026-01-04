import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, lazy, Suspense, memo } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Lazy load ParticleBackground only on desktop
const ParticleBackground = lazy(() => import('./ParticleBackground'));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const fullText = 'Perfect Response. Perfect Results.';
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 210);

    return () => clearInterval(timer);
  }, []);

  // Transform values based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Disable blur on mobile for performance
  const blur = isDesktop ? useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 10]) : useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {isDesktop && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ParticleBackground />
          </div>
        </Suspense>
      )}
      
      {/* Ambient glow effects - desktop only */}
      {isDesktop && (
        <>
          <motion.div 
            style={{ opacity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" 
          />
          <motion.div 
            style={{ opacity }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" 
          />
        </>
      )}
      
      {/* Content */}
      <motion.div 
        style={{ opacity, scale, y, filter: `blur(${blur}px)` }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center"
      >
        {/* Status Badge - Simple CSS animation */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="hero-badge inline-flex items-center gap-3 glass-card px-5 py-2.5 rounded-full mb-8 border border-primary/20"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground/80 tracking-wide">Delivering Digital Excellence</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
        </motion.div>

        {/* Main Headline - LCP Element */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span 
            className="hero-logo-text block bg-gradient-to-r from-primary via-cyan-300 to-white bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            status_200
          </span>
          <span className="block text-foreground text-3xl md:text-4xl lg:text-5xl mt-4 font-medium">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-subtext text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed font-book tracking-wide"
        >
          We architect exceptional digital experiences - from stunning websites 
          to intelligent AI systems. Code that performs. Design that converts.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="relative group"
          >
            <div className="relative rounded-xl overflow-hidden p-[1px] bg-gradient-to-r from-cyan-400/0 via-violet-500/0 to-pink-500/0 group-hover:from-cyan-400 group-hover:via-violet-500 group-hover:to-pink-500 transition-all duration-500">
              <div className="btn-glow group/inner inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-primary-foreground">
                Start a Project
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-inner/hover:translate-x-1" />
              </div>
            </div>
          </a>
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('services');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                window.history.pushState({}, '', '/services');
              }
            }}
            className="relative group"
          >
            <div className="relative rounded-xl overflow-hidden p-[1px] bg-gradient-to-r from-blue-400/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-400 group-hover:via-cyan-500 group-hover:to-blue-600 transition-all duration-500">
              <div className="glass-card inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium text-foreground hover:bg-secondary/50 transition-all duration-300">
                Explore Services
              </div>
            </div>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0.2, delay: 0.3 } : { duration: 1, delay: 1.2 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-primary uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
              transition={shouldReduceMotion ? {} : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { opacity: [1, 0] }}
                transition={shouldReduceMotion ? {} : { duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-primary"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
