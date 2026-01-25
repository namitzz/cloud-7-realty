/**
 * Reusable Framer Motion animation variants
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.35 
    } 
  }
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};
