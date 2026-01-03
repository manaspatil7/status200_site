import { useEffect, useState } from 'react';

/**
 * Hook to detect user's motion preference and mobile devices
 * Returns true if animations should be reduced/disabled
 */
export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check if mobile (width < 768px)
    const isMobile = window.innerWidth < 768;
    
    // Reduce motion if either condition is true
    setShouldReduceMotion(mediaQuery.matches || isMobile);

    const handleChange = () => {
      const isMobile = window.innerWidth < 768;
      setShouldReduceMotion(mediaQuery.matches || isMobile);
    };

    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return shouldReduceMotion;
}

/**
 * Get optimized animation variants based on device
 */
export function getAnimationConfig(shouldReduceMotion: boolean) {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 },
    };
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };
}
