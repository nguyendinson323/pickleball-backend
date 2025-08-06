import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BarChart3, MapPin, Search, Shield, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Tournament Management",
      description: "Organize and manage events with comprehensive tools for scheduling, registration, and results tracking."
    },
    {
      icon: BarChart3,
      title: "Ranking System",
      description: "Transparent, level-based points system that accurately reflects player skills and tournament performance."
    },
    {
      icon: MapPin,
      title: "Court Reservations",
      description: "Book and manage court schedules with real-time availability and automated confirmation systems."
    },
    {
      icon: Search,
      title: "Nearby Player Finder",
      description: "Discover players by location, skill level, and playing preferences to build your local community."
    },
    {
      icon: Shield,
      title: "Credentialing & Affiliation",
      description: "Verified IDs and membership management for players, coaches, and officials at all levels."
    },
    {
      icon: Globe,
      title: "Microsites",
      description: "Custom public pages for clubs and partners to showcase facilities, events, and community activities."
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Built to Serve the Entire Pickleball Ecosystem
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;