import React from 'react';
import { motion } from 'framer-motion';
import { animationConfigs, getAnimationVariants } from '../lib/animations';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.1)}
      >
        Profile
      </motion.h1>
      <motion.p 
        className="text-gray-600"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.2)}
      >
        Manage your account settings and preferences.
      </motion.p>
    </div>
  )
}

export default ProfilePage 