import React from 'react';
import { motion } from 'framer-motion';
import { animationConfigs, getAnimationVariants } from '../lib/animations';

const RankingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.1)}
      >
        Rankings
      </motion.h1>
      <motion.p 
        className="text-gray-600"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.2)}
      >
        View player rankings and statistics.
      </motion.p>
    </div>
  )
}

export default RankingsPage 