import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ShoppingBag,
  TrendingUp,
  Server,
  Code2,
  Smartphone,
  Bot,
  ArrowUpRight,
} from 'lucide-react'
import ParticleBackground from './ParticleBackground'

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
    tags: ['React', 'Next.js', 'SEO Optimized'],
  },
  {
    number: '05',
    title: 'App Development',
    subtitle: 'iOS & Android',
    description:
      'Native and cross-platform mobile apps delivering seamless user experiences and native performance.',
    icon: Smartphone,
    tags: ['Cross-Platform', 'Native Performance'],
  },
  {
    number: '06',
    title: 'AI Automation',
    subtitle: '24/7 Intelligent Systems',
    description:
      'Custom AI models, agents, and workflow automation designed to scale modern businesses.',
    icon: Bot,
    tags: ['AI Models', 'Chatbots', 'Automation'],
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // smoother + slower
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],      // ⬅ spreads motion across more scroll
    ['0%', '-220%']
  )
  

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-[00vh] overflow-hidden py-32"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <ParticleBackground />

        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <span className="text-primary text-sm uppercase tracking-widest font-semibold">
              Strategic Offerings
            </span>
            <h2 className="text-5xl font-bold text-foreground mt-4">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              We offer comprehensive digital solutions that transform businesses
              through performance, design, and intelligent systems.
            </p>
          </div>

          {/* Horizontal Scroll */}
          <motion.div
            style={{ x }}
            className="flex gap-8 px-6"
          >
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: any }) {
  const Icon = service.icon

  return (
    <div className="group relative flex-shrink-0 w-[85vw] max-w-[420px]">
      <div className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-r from-cyan-400/0 via-violet-500/0 to-pink-500/0 group-hover:from-cyan-400 group-hover:via-violet-500 group-hover:to-pink-500 transition-all duration-500">
        <div className="relative rounded-2xl bg-black/90 backdrop-blur-xl border border-gray-800 p-8 min-h-[520px] flex flex-col">
          
          {/* Number */}
          <span
            className="absolute top-6 right-6 text-8xl font-black text-transparent"
            style={{ WebkitTextStroke: '1px rgba(56,189,248,0.3)' }}
          >
            {service.number}
          </span>

          <ArrowUpRight className="absolute top-6 right-6 mt-16 w-5 h-5 text-muted-foreground group-hover:text-primary transition" />

          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-8">
            <Icon className="w-7 h-7 text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold mb-2">
            {service.title}
          </h3>
          <p className="text-primary text-sm font-semibold mb-4">
            {service.subtitle}
          </p>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
            {service.description}
          </p>

          {/* Tags */}
          {service.tags && (
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

