import { Trophy, Users, MapPin, Award } from "lucide-react";
import tournamentSystemImg from "@/assets/tournament-system.jpg";
import rankingCredentialsImg from "@/assets/ranking-credentials.jpg";
import courtReservationsImg from "@/assets/court-reservations.jpg";
import playerCommunityImg from "@/assets/player-community.jpg";

const Overview = () => {
  const features = [
    {
      icon: Trophy,
      title: "Tournament System",
      description: "Comprehensive tournament management and organization",
      image: tournamentSystemImg
    },
    {
      icon: Award,
      title: "Ranking & Credentials",
      description: "Transparent, level-based points and verification system",
      image: rankingCredentialsImg
    },
    {
      icon: MapPin,
      title: "Court Reservations",
      description: "Easy booking and scheduling for courts nationwide",
      image: courtReservationsImg
    },
    {
      icon: Users,
      title: "Player Community & Search",
      description: "Connect with players and discover local communities",
      image: playerCommunityImg
    }
  ];

  return (
    <section className="py-16 lg:py-24 animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-on-scroll">
            A Unified Platform for All Levels of Pickleball
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed animate-on-scroll">
            Whether you're a player, club, coach, or regional association, our platform is your official gateway to the national Pickleball community. Built for transparency, growth, and accessibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300 animate-on-scroll"
              >
                <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden animate-on-scroll">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 animate-on-scroll"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 animate-on-scroll">{feature.title}</h3>
                <p className="text-muted-foreground animate-on-scroll">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Overview;