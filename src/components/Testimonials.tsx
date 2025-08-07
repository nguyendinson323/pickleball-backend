import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { animationConfigs, getAnimationVariants } from "@/lib/animations";
import { useState, useEffect, useCallback } from "react";
import sarahImg from "@/assets/testimonial-sarah.jpg";
import michaelImg from "@/assets/testimonial-michael.jpg";
import jenniferImg from "@/assets/testimonial-jennifer.jpg";
import davidImg from "@/assets/testimonial-david.jpg";
import lisaImg from "@/assets/testimonial-lisa.jpg";
import omarImg from "@/assets/testimonial-omar.jpg";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
    {
      quote: "Finally, a platform that brings everything together — tournaments, players, and courts. It's a game-changer for our pickleball community.",
      author: "Sarah Chen",
      title: "Club President, Austin Pickleball Association",
      rating: 5,
      image: sarahImg
    },
    {
      quote: "The ranking system helped me track my growth and compete nationally with confidence. I've improved more in six months than I did in two years.",
      author: "Michael Rodriguez",
      title: "Competitive Player, Level 4.5",
      rating: 5,
      image: michaelImg
    },
    {
      quote: "Our club microsite brought in more bookings than ever. The integration with the national federation gives us credibility and reach.",
      author: "Jennifer Park",
      title: "Facility Manager, Pacific Coast Courts",
      rating: 5,
      image: jenniferImg
    },
    {
      quote: "The tournament management tools streamlined our entire event process. Registration to results, everything is seamless and professional.",
      author: "David Thompson",
      title: "Tournament Director, National Championships",
      rating: 5,
      image: davidImg
    },
    {
      quote: "Finding players at my skill level was impossible before this platform. Now I have regular games and made lifelong friends.",
      author: "Lisa Martinez",
      title: "Recreational Player, Level 3.0",
      rating: 5,
      image: lisaImg
    },
    {
      quote: "The coaching credentials and student management features have transformed how I run my training programs. Highly recommended!",
      author: "Omar Hassan",
      title: "Certified Pickleball Coach",
      rating: 5,
      image: omarImg
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handlePrevious = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={getAnimationVariants('up', 0.8, 0.2)}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            What Our Community Says
          </h2>
        </motion.div>

                <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={getAnimationVariants('up', 0.7, 0.4)}
        >
          <div className="relative">
            {/* Carousel Container */}
            <div className="w-full max-w-6xl mx-auto overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${current * (100 / 3)}%)`,
                  width: `${testimonials.length * (100 / 3)}%`
                }}
              >
                {testimonials.map((testimonial, index) => {
                  const config = animationConfigs.testimonials[index % animationConfigs.testimonials.length];
                  return (
                    <div key={index} className="w-1/3 px-4">
                      <motion.div
                        variants={getAnimationVariants(config.direction, config.duration, config.delay)}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card className="shadow-medium hover:shadow-strong transition-all duration-300 group h-full">
                          <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                              <motion.img 
                                src={testimonial.image} 
                                alt={testimonial.author}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                                whileHover={{ 
                                  scale: 1.1,
                                  transition: { duration: 0.2 }
                                }}
                              />
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <Star className="w-4 h-4 fill-accent text-accent" />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            <blockquote className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                              "{testimonial.quote}"
                            </blockquote>
                            <div className="border-t pt-4 mt-auto">
                              <div className="font-semibold">{testimonial.author}</div>
                              <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            
            {/* Custom Navigation Controls */}
            <div className="absolute -top-12 right-0 flex items-center gap-2">
              <motion.button
                onClick={togglePlayPause}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Pause className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <motion.button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'bg-primary scale-125' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            
            {/* Debug Info */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Current: {current} | Playing: {isPlaying ? 'Yes' : 'No'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;