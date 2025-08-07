import { easeOut } from "framer-motion";

// Global animation configurations for different components
export const animationConfigs = {
  // Hero section animations
  hero: {
    title: { direction: 'up', duration: 0.8, delay: 0.2 },
    subtitle: { direction: 'up', duration: 0.7, delay: 0.4 },
    cta: { direction: 'up', duration: 0.6, delay: 0.6 }
  },

  // Feature cards animations
  features: [
    { direction: 'left', duration: 0.7, delay: 0.1 },
    { direction: 'up', duration: 0.8, delay: 0.2 },
    { direction: 'right', duration: 0.6, delay: 0.3 },
    { direction: 'down', duration: 0.9, delay: 0.4 }
  ],

  // Testimonial animations
  testimonials: [
    { direction: 'left', duration: 0.8, delay: 0.1 },
    { direction: 'up', duration: 0.7, delay: 0.3 },
    { direction: 'right', duration: 0.9, delay: 0.2 },
    { direction: 'down', duration: 0.6, delay: 0.4 },
    { direction: 'left', duration: 0.7, delay: 0.5 }
  ],

  // Role benefits animations (from your existing code)
  roleBenefits: {
    images: [
      { direction: 'left', duration: 0.8, delay: 0.2 },
      { direction: 'right', duration: 0.6, delay: 0.1 },
      { direction: 'up', duration: 0.9, delay: 0.3 },
      { direction: 'down', duration: 0.7, delay: 0.0 },
      { direction: 'left', duration: 0.5, delay: 0.4 }
    ],
    content: [
      { direction: 'right', duration: 0.7, delay: 0.4 },
      { direction: 'left', duration: 0.8, delay: 0.2 },
      { direction: 'down', duration: 0.6, delay: 0.1 },
      { direction: 'up', duration: 0.9, delay: 0.3 },
      { direction: 'right', duration: 0.8, delay: 0.0 }
    ]
  },

  // Dashboard animations
  dashboard: {
    stats: [
      { direction: 'up', duration: 0.6, delay: 0.1 },
      { direction: 'right', duration: 0.7, delay: 0.2 },
      { direction: 'down', duration: 0.8, delay: 0.3 },
      { direction: 'left', duration: 0.5, delay: 0.4 }
    ],
    cards: [
      { direction: 'left', duration: 0.7, delay: 0.1 },
      { direction: 'up', duration: 0.8, delay: 0.2 },
      { direction: 'right', duration: 0.6, delay: 0.3 }
    ]
  },

  // Tournament animations
  tournaments: [
    { direction: 'up', duration: 0.7, delay: 0.1 },
    { direction: 'left', duration: 0.8, delay: 0.2 },
    { direction: 'right', duration: 0.6, delay: 0.3 },
    { direction: 'down', duration: 0.9, delay: 0.4 },
    { direction: 'up', duration: 0.5, delay: 0.5 },
    { direction: 'left', duration: 0.7, delay: 0.6 }
  ],

  // Club animations
  clubs: [
    { direction: 'right', duration: 0.8, delay: 0.1 },
    { direction: 'down', duration: 0.6, delay: 0.2 },
    { direction: 'left', duration: 0.9, delay: 0.3 },
    { direction: 'up', duration: 0.7, delay: 0.4 },
    { direction: 'right', duration: 0.5, delay: 0.5 }
  ],

  // Ranking animations
  rankings: [
    { direction: 'up', duration: 0.6, delay: 0.1 },
    { direction: 'right', duration: 0.8, delay: 0.2 },
    { direction: 'down', duration: 0.7, delay: 0.3 },
    { direction: 'left', duration: 0.9, delay: 0.4 },
    { direction: 'up', duration: 0.5, delay: 0.5 }
  ],

  // Banner animations
  banners: [
    { direction: 'left', duration: 0.8, delay: 0.1 },
    { direction: 'up', duration: 0.7, delay: 0.2 },
    { direction: 'right', duration: 0.9, delay: 0.3 },
    { direction: 'down', duration: 0.6, delay: 0.4 }
  ],

  // Player finder animations
  playerFinder: {
    search: { direction: 'up', duration: 0.7, delay: 0.1 },
    results: [
      { direction: 'left', duration: 0.6, delay: 0.1 },
      { direction: 'up', duration: 0.7, delay: 0.2 },
      { direction: 'right', duration: 0.8, delay: 0.3 }
    ],
    nearby: [
      { direction: 'right', duration: 0.7, delay: 0.1 },
      { direction: 'up', duration: 0.6, delay: 0.2 },
      { direction: 'left', duration: 0.8, delay: 0.3 }
    ]
  },

  // Court reservation animations
  courtReservations: {
    courts: [
      { direction: 'up', duration: 0.7, delay: 0.1 },
      { direction: 'left', duration: 0.8, delay: 0.2 },
      { direction: 'right', duration: 0.6, delay: 0.3 },
      { direction: 'down', duration: 0.9, delay: 0.4 }
    ],
    calendar: { direction: 'up', duration: 0.8, delay: 0.2 },
    timeSlots: [
      { direction: 'left', duration: 0.5, delay: 0.1 },
      { direction: 'right', duration: 0.6, delay: 0.2 },
      { direction: 'up', duration: 0.7, delay: 0.3 }
    ]
  },

  // Form animations
  forms: {
    fields: [
      { direction: 'left', duration: 0.6, delay: 0.1 },
      { direction: 'right', duration: 0.7, delay: 0.2 },
      { direction: 'up', duration: 0.8, delay: 0.3 },
      { direction: 'down', duration: 0.5, delay: 0.4 }
    ],
    submit: { direction: 'up', duration: 0.7, delay: 0.5 }
  },

  // Navigation animations
  navigation: {
    menu: { direction: 'down', duration: 0.6, delay: 0.1 },
    items: [
      { direction: 'left', duration: 0.5, delay: 0.1 },
      { direction: 'right', duration: 0.6, delay: 0.2 },
      { direction: 'up', duration: 0.7, delay: 0.3 },
      { direction: 'down', duration: 0.8, delay: 0.4 }
    ]
  }
};

// Helper function to get animation variants
export const getAnimationVariants = (direction: string, duration: number, delay: number, type: 'image' | 'content' | 'default' = 'default') => {
  const distance = type === 'image' ? 100 : type === 'content' ? 50 : 80;
  
  return {
    hidden: {
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? -distance : direction === 'down' ? distance : 0,
      opacity: 0,
      scale: type === 'image' ? 0.8 : 1
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: easeOut
      }
    }
  };
};

// Helper function to get staggered animation variants for lists
export const getStaggeredVariants = (configs: Array<{ direction: string; duration: number; delay: number }>, type: 'image' | 'content' | 'default' = 'default') => {
  return configs.map((config, index) => 
    getAnimationVariants(config.direction, config.duration, config.delay + (index * 0.1), type)
  );
};

// Container animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}; 