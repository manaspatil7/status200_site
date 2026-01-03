import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Palette, Wrench, Rocket } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Deep dive into your goals, users, and market. We uncover the insights that shape winning strategies.',
    color: 'from-cyan-500 to-blue-500',
    tags: ['Brand audit', 'Stakeholder interviews', 'Market research', 'Goal setting'],
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Wireframes, prototypes, and pixel-perfect designs. Every detail crafted for maximum impact.',
    color: 'from-blue-500 to-violet-500',
    tags: ['Brand positioning', 'Persona development', 'Messaging framework', 'Creative brief'],
  },
  {
    icon: Wrench,
    title: 'Build',
    description: 'Clean, scalable code brought to life. Rigorous testing ensures everything works flawlessly.',
    color: 'from-violet-500 to-fuchsia-500',
    tags: ['Frontend development', 'Backend architecture', 'API integration', 'Quality assurance'],
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy with confidence. Ongoing support and optimization to keep you ahead of the curve.',
    color: 'from-fuchsia-500 to-pink-500',
    tags: ['Deployment', 'Performance monitoring', 'User feedback', 'Continuous improvement'],
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="relative py-16 sm:py-24 md:py-32 section-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 sm:mb-4 block">
            How We Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Our <span className="text-gradient-primary">Process</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            A battle-tested methodology that turns ideas into market-ready products.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto px-2 sm:px-4 md:px-0">
          {/* Mobile: Vertical Progress Line through cards */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Desktop: Progress Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Steps */}
          <div className="md:hidden space-y-8 sm:space-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="relative flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                {/* Numbered Badge */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg font-bold text-white text-lg sm:text-xl`}
                  style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.35)' }}
                >
                  {index + 1}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">{step.description}</p>

                  {/* Tags */}
                  {step.tags && (
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {step.tags.map((tag: string) => (
                        <div key={tag} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-muted-foreground">{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Alternating Layout */}
          <div className="hidden md:block space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="flex items-start gap-0"
                >
                  {/* Left Side Content or Spacer */}
                  {isLeft ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="glass-card p-6 flex-none w-[calc(50%-2.5rem)] text-right"
                    >
                      <div className="flex items-center gap-3 mb-3 justify-end">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                    </motion.div>
                  ) : (
                    <div className="w-[calc(50%-2.5rem)]" />
                  )}

                  {/* Icon Node - Center */}
                  <div className="absolute left-1/2 z-10 flex-shrink-0 -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                      style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.35)' }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Right Side Content or Spacer */}
                  {!isLeft ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="glass-card p-6 flex-none w-[calc(50%-2.5rem)] text-left ml-auto"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                    </motion.div>
                  ) : (
                    <div className="w-[calc(50%-2.5rem)]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
