import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
	{ name: 'Services', href: '/services' },
	{ name: 'Why Us', href: '/why-us' },
	{ name: 'Process', href: '/process' },
	{ name: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		setIsMobileMenuOpen(false);

		if (href === '/') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			window.history.pushState({}, '', '/');
		} else {
			const sectionId = href.slice(1);
			const element = document.getElementById(sectionId);
			if (element) {
				const offset = 80;
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - offset;
				window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
				window.history.pushState({}, '', href);
			}
		}
	};

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
			className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
		>
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex items-center justify-between h-14 sm:h-16 pt-4">
					{/* Logo */}
					<Link
						to="/"
						onClick={(e) => handleNavClick(e, '/')}
						className="flex items-center flex-shrink-0"
					>
						<img
							src="/logo.png"
							alt="Status200 Logo"
							loading="eager"
							decoding="async"
							className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 h-auto"
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								onClick={(e) => handleNavClick(e, link.href)}
								className="text-white hover:text-cyan-300 transition-colors duration-300 text-lg font-medium animated-underline"
							>
								{link.name}
							</a>
						))}
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
							className="btn-glow px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground"
						>
							Start a Project
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden bg-background/95 backdrop-blur-glass border-b border-border"
					>
						<div className="px-6 py-6 flex flex-col gap-4">
							{navLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									onClick={(e) => {
										handleNavClick(e, link.href);
										setIsMobileMenuOpen(false);
									}}
									className="text-white hover:text-cyan-300 transition-colors duration-300 text-base font-medium py-2"
								>
									{link.name}
								</a>
							))}
							<a
								href="#contact"
								onClick={(e) => {
									e.preventDefault();
									setIsMobileMenuOpen(false);
									const element = document.getElementById('contact');
									if (element) {
										const offset = 80;
										const elementPosition = element.getBoundingClientRect().top;
										const offsetPosition = elementPosition + window.pageYOffset - offset;
										window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
									}
								}}
								className="btn-glow px-5 py-3 rounded-lg text-center font-semibold text-primary-foreground mt-4"
							>
								Start a Project
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
