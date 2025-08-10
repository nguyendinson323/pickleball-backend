import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { componentAnimations } from "@/lib/animations";
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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-4 ${componentAnimations.hero.title}`}
          >
            What Our Community Says
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${componentAnimations.hero.subtitle}`}
          >
            Join thousands of players, coaches, and facility managers who trust our platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            <div
              key={current}
              className="p-8 lg:p-12 animate-in slide-in-from-right-4 duration-500"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Testimonial Image */}
                <div className="flex-shrink-0">
                  <div
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-4 ring-blue-100 hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex justify-center lg:justify-start mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonials[current].quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div>
                    <cite className="not-italic">
                      <div className="font-semibold text-gray-900 text-lg">
                        {testimonials[current].author}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[current].title}
                      </div>
                    </cite>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Play/Pause Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-gray-700" />
                ) : (
                  <Play className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === current
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;