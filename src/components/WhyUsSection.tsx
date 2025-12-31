import { motion } from 'framer-motion';
import { Zap, Shield, Layers, Cpu } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second load times and 90+ performance scores. Your competitors will wonder how you did it.',
    stat: '100ms',
    statLabel: 'avg response',
  },
  {
    icon: Shield,
    title: 'Clean Systems',
    description: 'Maintainable, documented code that your future team will thank you for. No technical debt.',
    stat: '100%',
    statLabel: 'code coverage',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Built for growth from day one. Handle 10 users or 10 million without breaking a sweat.',
    stat: '∞',
    statLabel: 'scalability',
  },
  {
    icon: Cpu,
    title: 'AI-Ready',
    description: 'Every system we build is designed for AI integration. Future-proof by default.',
    stat: 'GPT-5',
    statLabel: 'ready',
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            The Status200 Difference
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why <span className="text-gradient-primary">Choose Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just build products. We engineer competitive advantages.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.15} direction="up">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 h-full text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gradient-primary">{feature.stat}</span>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {feature.statLabel}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_hsl(187_100%_50%/0.08)_0%,_transparent_70%)] pointer-events-none" />
    </section>
  );
}
