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
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Wireframes, prototypes, and pixel-perfect designs. Every detail crafted for maximum impact.',
    color: 'from-blue-500 to-violet-500',
  },
  {
    icon: Wrench,
    title: 'Build',
    description: 'Clean, scalable code brought to life. Rigorous testing ensures everything works flawlessly.',
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy with confidence. Ongoing support and optimization to keep you ahead of the curve.',
    color: 'from-fuchsia-500 to-pink-500',
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
          {/* Progress Line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Steps */}
          <div className="space-y-10 sm:space-y-14 md:space-y-20 lg:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <AnimatedSection
                  key={step.title}
                  delay={index * 0.2}
                  direction={isLeft ? 'right' : 'left'}
                >
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-0">
                    {/* Left Side Content or Spacer */}
                    {isLeft ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-4 sm:p-5 md:p-6 flex-1 md:flex-none md:w-[calc(50%-2.5rem)] md:text-right"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:justify-end">
                          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">{step.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                      </motion.div>
                    ) : (
                      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                    )}

                    {/* Icon Node - Center */}
                    <div className="relative z-10 flex-shrink-0 md:mx-3 lg:mx-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.25)' }}
                      >
                        <step.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Right Side Content or Spacer */}
                    {!isLeft ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-4 sm:p-5 md:p-6 flex-1 md:flex-none md:w-[calc(50%-2.5rem)] md:text-left"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">{step.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                      </motion.div>
                    ) : (
                      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
