import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { animationConfigs, getAnimationVariants } from "@/lib/animations";
import heroImage from "/img/9.jpg";

const Hero = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 justify-center items-center">
          {/* Text Content */}
          <motion.div 
            className="flex-1 space-y-8 text-center"
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
              className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              variants={getAnimationVariants(
                animationConfigs.hero.title.direction,
                animationConfigs.hero.title.duration,
                animationConfigs.hero.title.delay
              )}
            >
              Uniting the{" "}
              <span className="text-primary">Pickleball Nation</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
              variants={getAnimationVariants(
                animationConfigs.hero.subtitle.direction,
                animationConfigs.hero.subtitle.duration,
                animationConfigs.hero.subtitle.delay
              )}
            >
              The official digital hub for players, clubs, coaches, and partners across the nation. 
              From grassroots development to elite competition, we're building the future of pickleball together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={getAnimationVariants(
                animationConfigs.hero.cta.direction,
                animationConfigs.hero.cta.duration,
                animationConfigs.hero.cta.delay
              )}
            >
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                Join the Federation
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="relative flex-1 min-h-[500px] lg:min-h-[600px]"
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('right', 0.8, 0.3, 'image')}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-strong h-full">
              <img
                src={heroImage}
                alt="Professional pickleball court with players"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              
              {/* Federation Overlay */}
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Live Tournaments</span>
                  </div>
                  <div className="text-2xl font-bold">24</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-6 h-6 bg-blue-500/20 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;