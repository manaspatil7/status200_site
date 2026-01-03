
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  TrendingUp,
  Code2,
  Smartphone,
  Bot,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import ParticleBackground from './ParticleBackground'

const services = [
  {
    number: '01',
    title: 'Web Development',
    subtitle: 'Performance-first',
    description:
      'Modern websites and SaaS platforms built with clean architecture, speed, and SEO in mind.',
    icon: Code2,
    tags: ['React', 'Next.js', 'SEO Optimized'],
  },
  {
    number: '02',
    title: 'App Development',
    subtitle: 'iOS & Android',
    description:
      'Native and cross-platform mobile apps delivering seamless user experiences and native performance.',
    icon: Smartphone,
    tags: ['Cross-Platform', 'Native Performance'],
  },
  {
    number: '03',
    title: 'SEO & Performance',
    subtitle: 'LCP < 2.5s',
    description:
      'Search-first architecture with Core Web Vitals excellence. Built to dominate rankings and performance.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'AI Automation',
    subtitle: '24/7 Intelligent Systems',
    description:
      'Custom AI models, agents, and workflow automation designed to scale modern businesses.',
    icon: Bot,
    tags: ['AI Models', 'Chatbots', 'Automation'],
  },
]

// Hook to detect desktop view (lg breakpoint: 1024px)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return isDesktop
}

export default function ServicesSection() {
  const isDesktop = useIsDesktop()

  return isDesktop ? <DesktopServicesSection /> : <MobileServicesSection />
}

// Desktop version with horizontal scroll on vertical scroll
function DesktopServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Smoother animation - starts immediately when section is reached
  const x = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['calc(50vw - 210px)', '-220%']
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-[250vh]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <ParticleBackground />

        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
            <span className="text-primary text-sm uppercase tracking-widest font-semibold">
              Strategic Offerings
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mt-4">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              We offer comprehensive digital solutions that transform businesses
              through performance, design, and intelligent systems.
            </p>
          </div>

          {/* Horizontal Scroll Container */}
          <motion.div
            style={{ x }}
            className="flex gap-8 pl-[15vw]"
          >
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} isDesktop />
            ))}
          </motion.div>

          {/* Scroll Progress Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">

            <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 origin-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Mobile/Tablet version with arrow navigation
function MobileServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth
      const scrollAmount = containerWidth * 0.9
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 sm:py-24"
    >
      <ParticleBackground />

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 text-center">
          <span className="text-primary text-xs sm:text-sm uppercase tracking-widest font-semibold">
            Strategic Offerings
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-3 sm:mt-4">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-3 sm:mt-4 px-2">
            We offer comprehensive digital solutions that transform businesses
            through performance, design, and intelligent systems.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 border border-gray-700 flex items-center justify-center transition-all duration-300 ${canScrollLeft
              ? 'opacity-100 hover:bg-primary/20 hover:border-primary cursor-pointer'
              : 'opacity-30 cursor-not-allowed'
              }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 border border-gray-700 flex items-center justify-center transition-all duration-300 ${canScrollRight
              ? 'opacity-100 hover:bg-primary/20 hover:border-primary cursor-pointer'
              : 'opacity-30 cursor-not-allowed'
              }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-14 sm:px-8 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} isDesktop={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, isDesktop }: { service: any; isDesktop: boolean }) {
  const Icon = service.icon

  return (
    <div className={`group relative flex-shrink-0 ${isDesktop
      ? 'w-[420px]'
      : 'w-[calc(100vw-6rem)] sm:w-[50vw] max-w-[420px]'
      }`}>
      <div className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-r from-cyan-400/0 via-violet-500/0 to-pink-500/0 group-hover:from-cyan-400 group-hover:via-violet-500 group-hover:to-pink-500 transition-all duration-500">
        <div className={`relative rounded-2xl bg-black/90 backdrop-blur-xl border border-gray-800 flex flex-col ${isDesktop
          ? 'p-8 min-h-[500px]'
          : 'p-5 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[450px]'
          }`}>

          {/* Number */}
          <span
            className={`absolute font-black text-transparent ${isDesktop
              ? 'top-6 right-6 text-8xl'
              : 'top-4 right-4 sm:top-6 sm:right-6 text-6xl sm:text-7xl md:text-8xl'
              }`}
            style={{ WebkitTextStroke: '1px rgba(56,189,248,0.3)' }}
          >
            {service.number}
          </span>

          <ArrowUpRight className={`absolute text-muted-foreground group-hover:text-primary transition ${isDesktop
            ? 'top-6 right-6 mt-16 w-5 h-5'
            : 'top-4 right-4 sm:top-6 sm:right-6 mt-12 sm:mt-16 w-4 h-4 sm:w-5 sm:h-5'
            }`} />

          {/* Icon */}
          <div className={`rounded-xl bg-primary/20 flex items-center justify-center ${isDesktop
            ? 'w-14 h-14 mb-8'
            : 'w-12 h-12 sm:w-14 sm:h-14 mb-6 sm:mb-8'
            }`}>
            <Icon className={`text-primary ${isDesktop
              ? 'w-7 h-7'
              : 'w-6 h-6 sm:w-7 sm:h-7'
              }`} />
          </div>

          {/* Title */}
          <h3 className={`font-bold ${isDesktop
            ? 'text-3xl mb-2'
            : 'text-2xl sm:text-3xl mb-2'
            }`}>
            {service.title}
          </h3>
          <p className={`text-primary font-semibold ${isDesktop
            ? 'text-sm mb-4'
            : 'text-xs sm:text-sm mb-4'
            }`}>
            {service.subtitle}
          </p>

          {/* Description */}
          <p className={`text-muted-foreground leading-relaxed flex-1 ${isDesktop
            ? 'text-sm mb-6'
            : 'text-sm mb-6'
            }`}>
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
