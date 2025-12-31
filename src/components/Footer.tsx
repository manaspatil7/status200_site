import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Web Development', href: '/services' },
    { name: 'App Development', href: '/services' },
    { name: 'SEO & Performance', href: '/services' },
    { name: 'AI Automation', href: '/services' },
  ],
  company: [
    { name: 'About', href: '/why-us' },
    { name: 'Process', href: '/process' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/status_200.dev/', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:status200.dev@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-glass">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState({}, '', '/');
              }}
              className="flex items-center mb-4"
            >
              <img 
                src="/logo.png" 
                alt="Status200 Logo" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto object-contain"
              />
            </a>
            <p className="text-muted-foreground max-w-sm mb-6">
              Building exceptional digital products for forward-thinking companies. 
              Code that performs. Design that converts.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/')) {
                        e.preventDefault();
                        const element = document.getElementById('services');
                        if (element) {
                          const offset = 80;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - offset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                          window.history.pushState({}, '', link.href);
                        }
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/')) {
                        e.preventDefault();
                        const sectionId = link.href.slice(1);
                        const element = document.getElementById(sectionId);
                        if (element) {
                          const offset = 80;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - offset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                          window.history.pushState({}, '', link.href);
                        }
                      } else if (link.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.getElementById(link.href.slice(1));
                        if (element) {
                          const offset = 80;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - offset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Status200. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with precision in code.
          </p>
        </div>
      </div>
    </footer>
  );
}
