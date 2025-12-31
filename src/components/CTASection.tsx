import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function CTASection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_hsl(187_100%_50%/0.1)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            Ready to Start?
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Let's Build Something{' '}
            <span className="text-gradient-primary">Powerful</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Turn your vision into a digital reality. We're ready to architect your next breakthrough product.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:hello@status200.dev"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-glow group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold text-primary-foreground"
            >
              <Mail className="w-5 h-5" />
              Start a Conversation
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Usually respond within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm">Free project consultation</span>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
