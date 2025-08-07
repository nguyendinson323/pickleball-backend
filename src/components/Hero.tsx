import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { animationConfigs, getAnimationVariants } from "@/lib/animations";
import heroImage from "/img/9.jpg";

const Hero = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="flex-1 space-y-8"
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
            {/* Federation Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
              variants={getAnimationVariants('up', 0.6, 0.1)}
            >
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Official National Federation Platform
            </motion.div>

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
              <br />
              <span className="text-3xl lg:text-4xl xl:text-5xl text-muted-foreground font-normal">
                One Platform, One Community
              </span>
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

            {/* Federation Stats */}
            <motion.div
              className="flex flex-wrap gap-6 text-sm"
              variants={getAnimationVariants('up', 0.7, 0.5)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">50+ States & Territories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">1,000+ Affiliated Clubs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">100,000+ Active Players</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={getAnimationVariants(
                animationConfigs.hero.cta.direction,
                animationConfigs.hero.cta.duration,
                animationConfigs.hero.cta.delay
              )}
            >
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                Join the Federation
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Explore Features
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center gap-6 text-sm text-muted-foreground"
              variants={getAnimationVariants('up', 0.6, 0.7)}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Official Federation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Nationwide Network</span>
              </div>
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
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">NPF</div>
                  <div className="text-xs text-muted-foreground font-medium">National Pickleball Federation</div>
                </div>
              </div>
              
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