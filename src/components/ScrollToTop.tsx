import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If pathname is root, always scroll to top
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    
    // If pathname is not root, scroll to the section after a brief delay
    const sectionId = pathname.slice(1); // Remove leading slash
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // If section not found, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

