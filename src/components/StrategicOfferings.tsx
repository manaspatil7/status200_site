import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShoppingBag,
  TrendingUp,
  Server,
  Code2,
  Smartphone,
  Bot,
  ArrowUpRight,
} from 'lucide-react';

/* ---------------- DATA ---------------- */

const services = [
  {
    number: '01',
    title: 'Shopify & E-commerce',
    subtitle: '3x Revenue Growth',
    description:
      'High-converting Shopify and custom e-commerce solutions optimized for scalability, speed, and conversion.',
    icon: ShoppingBag,
  },
  {
    number: '02',
    title: 'Technical SEO Architecture',
    subtitle: 'LCP < 2.5s',
    description:
      'Search-first architecture with Core Web Vitals excellence. Built to dominate rankings and performance.',
    icon: TrendingUp,
  },
  {
    number: '03',
    title: 'Custom Scalable Apps',
    subtitle: 'Enterprise-ready',
    description:
      'Full-stack systems designed for scale — from MVPs to complex distributed architectures.',
    icon: Server,
    tags: ['React', 'Node.js', 'Python', 'AWS'],
  },
  {
    number: '04',
    title: 'Web Development',
    subtitle: 'Performance-first',
    description:
      'Modern websites and SaaS platforms built with clean architecture, speed, and SEO in mind.',
    icon: Code2,
    tags: ['React', 'Next.js', 'SEO'],
  },
  {
    number: '05',
    title: 'App Development',
    subtitle: 'iOS & Android',
    description:
      'Native and cross-platform mobile apps delivering seamless user experiences and native performance.',
    icon: Smartphone,
    tags: ['iOS', 'Android', 'Flutter'],
  },
  {
    number: '06',
    title: 'AI Automation',
    subtitle: '24/7 Intelligent Systems',
    description:
      'Custom AI models, agents, and workflow automation designed to scale modern businesses.',
    icon: Bot,
    tags: ['AI Models', 'Chatbots', 'Agents'],
  },
];

/* ---------------- MAIN ---------------- */

export default function StrategicOfferings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollWidth, setScrollWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  /**
   * Measure AFTER layout so scrollWidth is accurate
   */
  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    const horizontalDistance = totalWidth - viewportWidth;
    setScrollWidth(horizontalDistance);

    // critical: vertical height = horizontal distance + viewport height
    setSectionHeight(horizontalDistance + window.innerHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative bg-[#030305]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Fixed header */}
        <div className="absolute top-32 left-[5vw] z-20 pointer-events-none mix-blend-difference">
          <h2 className="text-6xl font-bold text-white leading-tight">
            Strategic
            <br />
            Offerings
          </h2>
          <div className="h-1 w-24 bg-cyan-400 mt-6" />
          <p className="text-gray-500 mt-4 max-w-xs font-mono text-sm">
            Scroll to explore our engineering architecture.
          </p>
        </div>

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-[4vw] items-center pl-[50vw] will-change-transform"
        >
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}

          {/* End spacer (important) */}
          <div className="w-[30vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;

  return (
    <div className="relative flex-shrink-0 w-[85vw] md:w-[450px] h-[60vh] group">
      <div className="relative h-full rounded-[24px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-3">

        {/* Gradient border */}
        <div className="absolute inset-0 p-[1px] rounded-[24px] bg-gradient-to-br from-cyan-400 via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-[1px] rounded-[23px] bg-[#030305]" />

        {/* Card */}
        <div className="relative z-10 h-full rounded-[24px] bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Icon className="w-7 h-7" />
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10">
            {service.tags ? (
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-cyan-400">
                  {service.subtitle.split(' ')[0]}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {service.subtitle.split(' ').slice(1).join(' ')}
                </div>
              </div>
            )}
          </div>

          <span className="absolute bottom-[-10px] right-[-10px] text-[10rem] font-bold text-white/[0.03] pointer-events-none">
            {service.number}
          </span>
        </div>
      </div>
    </div>
  );
}