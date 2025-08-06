import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Finally, a platform that brings everything together — tournaments, players, and courts. It's a game-changer for our pickleball community.",
      author: "Sarah Chen",
      title: "Club President, Austin Pickleball Association",
      rating: 5
    },
    {
      quote: "The ranking system helped me track my growth and compete nationally with confidence. I've improved more in six months than I did in two years.",
      author: "Michael Rodriguez",
      title: "Competitive Player, Level 4.5",
      rating: 5
    },
    {
      quote: "Our club microsite brought in more bookings than ever. The integration with the national federation gives us credibility and reach.",
      author: "Jennifer Park",
      title: "Facility Manager, Pacific Coast Courts",
      rating: 5
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-medium hover:shadow-strong transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;