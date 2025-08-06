import { Trophy, Users, MapPin, Award } from "lucide-react";

const Overview = () => {
  const features = [
    {
      icon: Trophy,
      title: "Tournament System",
      description: "Comprehensive tournament management and organization"
    },
    {
      icon: Award,
      title: "Ranking & Credentials",
      description: "Transparent, level-based points and verification system"
    },
    {
      icon: MapPin,
      title: "Court Reservations",
      description: "Easy booking and scheduling for courts nationwide"
    },
    {
      icon: Users,
      title: "Player Community & Search",
      description: "Connect with players and discover local communities"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            A Unified Platform for All Levels of Pickleball
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you're a player, club, coach, or regional association, our platform is your official gateway to the national Pickleball community. Built for transparency, growth, and accessibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Overview;