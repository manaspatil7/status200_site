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
    <section id="process" ref={containerRef} className="relative py-32 section-glow">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-gradient-primary">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A battle-tested methodology that turns ideas into market-ready products.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <AnimatedSection 
                key={step.title} 
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'right' : 'left'}
              >
                <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`glass-card p-6 flex-1 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:max-w-md`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
