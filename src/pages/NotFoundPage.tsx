import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { motion } from 'framer-motion';
import { animationConfigs, getAnimationVariants } from '../lib/animations';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div 
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1
            }
          }
        }}
      >
        <motion.h1 
          className="text-6xl font-bold text-gray-900 mb-4"
          variants={getAnimationVariants('up', 0.8, 0.1)}
        >
          404
        </motion.h1>
        <motion.h2 
          className="text-2xl font-semibold text-gray-700 mb-4"
          variants={getAnimationVariants('up', 0.7, 0.3)}
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          className="text-gray-600 mb-8"
          variants={getAnimationVariants('up', 0.7, 0.5)}
        >
          The page you're looking for doesn't exist.
        </motion.p>
        <motion.div
          variants={getAnimationVariants('up', 0.7, 0.7)}
        >
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage 