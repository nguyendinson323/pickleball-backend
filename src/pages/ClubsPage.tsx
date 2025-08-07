import React from 'react';
import { motion } from 'framer-motion';
import { animationConfigs, getAnimationVariants } from '../lib/animations';

const ClubsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.1)}
      >
        Clubs
      </motion.h1>
      <motion.p 
        className="text-gray-600"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.2)}
      >
        Find and join pickleball clubs in your area.
      </motion.p>
    </div>
  )
}

export default ClubsPage 