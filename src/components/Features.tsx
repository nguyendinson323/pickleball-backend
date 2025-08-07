import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BarChart3, MapPin, Search, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { animationConfigs, getAnimationVariants } from "@/lib/animations";
import tournamentManagementImg from "@/assets/tournament-management.jpg";
import rankingSystemImg from "@/assets/ranking-system.jpg";
import courtReservationsImg from "@/assets/court-reservations.jpg";
import playerFinderImg from "@/assets/player-finder.jpg";
import credentialingImg from "@/assets/credentialing.jpg";
import micrositesImg from "@/assets/microsites.jpg";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Tournament Management",
      description: "Organize and manage events with comprehensive tools for scheduling, registration, and results tracking.",
      image: tournamentManagementImg
    },
    {
      icon: BarChart3,
      title: "Ranking System",
      description: "Transparent, level-based points system that accurately reflects player skills and tournament performance.",
      image: rankingSystemImg
    },
    {
      icon: MapPin,
      title: "Court Reservations",
      description: "Book and manage court schedules with real-time availability and automated confirmation systems.",
      image: courtReservationsImg
    },
    {
      icon: Search,
      title: "Nearby Player Finder",
      description: "Discover players by location, skill level, and playing preferences to build your local community.",
      image: playerFinderImg
    },
    {
      icon: Shield,
      title: "Credentialing & Affiliation",
      description: "Verified IDs and membership management for players, coaches, and officials at all levels.",
      image: credentialingImg
    },
    {
      icon: Globe,
      title: "Microsites",
      description: "Custom public pages for clubs and partners to showcase facilities, events, and community activities.",
      image: micrositesImg
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={getAnimationVariants('up', 0.8, 0.2)}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Built to Serve the Entire Pickleball Ecosystem
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const config = animationConfigs.features[index % animationConfigs.features.length];
            return (
              <motion.div
                key={index}
                variants={getAnimationVariants(config.direction, config.duration, config.delay)}
              >
                <Card className="group hover:shadow-medium transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-6 relative">
                  {/* <div className="absolute top-2 right-4 w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div> */}
                  <div className="w-full flex justtify-between">
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;