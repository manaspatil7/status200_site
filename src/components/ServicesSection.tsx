import { motion } from 'framer-motion';
import { Code, Smartphone, Zap, Bot, ArrowUpRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'High-performance websites and web applications built with modern frameworks. From landing pages to complex SaaS platforms.',
    features: ['React & Next.js', 'Performance First', 'SEO Optimized'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile experiences that users love. Seamless, fast, and beautifully designed.',
    features: ['iOS & Android', 'Cross-Platform', 'Native Performance'],
  },
  {
    icon: Zap,
    title: 'SEO & Performance',
    description: 'Dominate search rankings and deliver lightning-fast experiences. Technical SEO that actually moves the needle.',
    features: ['Core Web Vitals', 'Technical SEO', 'Speed Optimization'],
  },
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Intelligent systems that work 24/7. Custom AI solutions, chatbots, and workflow automation for modern businesses.',
    features: ['Custom AI Models', 'Chatbots & Agents', 'Process Automation'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 section-glow">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Services that <span className="text-gradient-primary">Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end digital solutions crafted with precision. From concept to deployment, 
            we handle the complexity so you can focus on growth.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="glass-card group p-8 h-full cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_hsl(187_100%_50%/0.3)] transition-all duration-500">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient-primary transition-all duration-300">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
