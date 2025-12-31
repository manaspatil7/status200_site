import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const plans = [
  {
    name: 'Starter',
    price: '$5,000',
    description: 'Perfect for MVPs and landing pages',
    features: [
      'Custom landing page',
      'Mobile responsive',
      'SEO fundamentals',
      '2 rounds of revisions',
      '30-day support',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$15,000',
    description: 'Full-featured web applications',
    features: [
      'Everything in Starter',
      'Custom web application',
      'Database & authentication',
      'Third-party integrations',
      'Performance optimization',
      '90-day support',
      'Priority communication',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Large-scale solutions & AI systems',
    features: [
      'Everything in Growth',
      'Custom AI integration',
      'Scalable architecture',
      'Dedicated team',
      'SLA guarantees',
      '24/7 support',
      'Ongoing maintenance',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            Investment
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Simple <span className="text-gradient-primary">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for every stage of growth. No hidden fees, no surprises.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative h-full rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary/20 to-accent/10 border-2 border-primary/50'
                    : 'glass-card'
                }`}
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Info */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-gradient-primary">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted-foreground text-sm">+</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl text-center font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'btn-glow text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_hsl(187_100%_50%/0.05)_0%,_transparent_70%)] pointer-events-none" />
    </section>
  );
}
