import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Info } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const plans = [
  {
    name: 'Starter',
    label: 'LAUNCH',
    price: '₹5K',
    priceNote: 'Starting',
    timeline: '1-2 weeks',
    description: 'Perfect for early-stage startups and MVP validation',
    features: [
      'Custom landing page with responsive design',
      'Basic on-page SEO optimization',
      'Contact forms and lead capture',
      'Google Analytics integration',
      '30 days post-launch support',
    ],
    addOns: [
      'Automation (AI, Emails, WhatsApp)',
    ],
    bestFor: 'Startups, MVPs, proof of concept',
    highlighted: false,
  },
  {
    name: 'Growth',
    label: 'SCALE',
    price: '₹15K',
    priceNote: 'Starting',
    timeline: '4-6 weeks',
    description: 'For growing businesses needing advanced functionality',
    features: [
      'Multi-page application (up to 8 pages)',
      'User authentication & dashboards',
      'Blog & content management system',
      '2 months post-launch support',
    ],
    addOns: [
      'Advanced SEO + Schema markup',
      'API integrations (CRM, ERP, payments)',
      'Automation (AI, Emails, WhatsApp)',
    ],
    bestFor: 'Growing SMEs, platform development',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    label: 'DOMINATE',
    price: '₹35K',
    priceNote: 'Starting',
    timeline: '6-8 weeks',
    description: 'Complex solutions for established market leaders',
    features: [
      'Full-stack custom applications',
      'E-commerce with advanced features',
      'Custom API development',
      'Advanced analytics & reporting',
      'Load balancing & auto-scaling',
      '3 months post-launch support',
    ],
    addOns: [
      'API integrations (CRM, ERP, payments)',
      'Automation (AI, Emails, WhatsApp)',
    ],
    bestFor: 'Market leaders, complex platforms',
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
            INVESTMENT TIERS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Investment Tiers: Flexible Solutions for Every Growth Stage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with clear value differentiation. Each tier is strategically designed to meet specific business needs while providing a clear upgrade path as your company grows.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative h-full rounded-2xl p-8 ${plan.highlighted
                    ? 'bg-gradient-to-b from-primary/20 to-accent/10 border-2 border-primary/50'
                    : 'glass-card'
                  }`}
              >
                {/* Most Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Plan Label */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-bold">
                    {plan.label}
                  </div>
                </div>

                {/* Plan Info */}
                <div className="text-center mb-8 mt-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">{plan.priceNote}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Timeline: {plan.timeline}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Add-ons */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Add-ons: (Chargeable)</p>
                  <ul className="space-y-2">
                    {plan.addOns.map((addOn) => (
                      <li key={addOn} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{addOn}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold text-foreground">Best for:</span> {plan.bestFor}
                </p>

                {/* CTA */}
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
                  className={`block w-full py-3 rounded-xl text-center font-semibold transition-all duration-300 ${plan.highlighted
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

        {/* Additional Information and CTA */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-end">
          {/* Payment Terms */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Payment terms: 50% start, 50% launch</p>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Hosting, domain & third-party tools billed separately</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-right">
            <p className="text-muted-foreground mb-4">Ready to get started?</p>
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
              className="btn-glow group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-primary-foreground"
            >
              Contact us today for a custom quote
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_hsl(187_100%_50%/0.05)_0%,_transparent_70%)] pointer-events-none" />
    </section>
  );
}
