import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { motion } from 'framer-motion'
import { animationConfigs, getAnimationVariants } from '../lib/animations'

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.8, 0.2)}
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.first_name || user?.username}!</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        {[
          {
            title: "My Tournaments",
            description: "View your tournament registrations",
            value: "0",
            subtitle: "Active registrations"
          },
          {
            title: "My Rankings",
            description: "Your current ranking position",
            value: "--",
            subtitle: "No ranking yet"
          },
          {
            title: "Notifications",
            description: "Unread notifications",
            value: "0",
            subtitle: "Unread messages"
          }
        ].map((card, index) => {
          const config = animationConfigs.dashboard.cards[index];
          return (
            <motion.div
              key={index}
              variants={getAnimationVariants(config.direction, config.duration, config.delay)}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  )
}

export default DashboardPage 