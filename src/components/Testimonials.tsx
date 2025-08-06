import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import sarahImg from "@/assets/testimonial-sarah.jpg";
import michaelImg from "@/assets/testimonial-michael.jpg";
import jenniferImg from "@/assets/testimonial-jennifer.jpg";
import davidImg from "@/assets/testimonial-david.jpg";
import lisaImg from "@/assets/testimonial-lisa.jpg";
import omarImg from "@/assets/testimonial-omar.jpg";

const Testimonials = () => {
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

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            What Our Community Says
          </h2>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="shadow-medium hover:shadow-strong transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                      />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:scale-110 transition-transform duration-200" />
          <CarouselNext className="hover:scale-110 transition-transform duration-200" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;