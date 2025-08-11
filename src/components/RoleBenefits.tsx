import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building, Handshake, GraduationCap, MapPin } from "lucide-react";
import { componentAnimations } from "@/lib/animations";
import playersImg from "/img/players-community.jpg";
import clubsImg from "/img/clubs-facility.jpg";
import partnersImg from "/img/partners-business.jpg";
import coachesImg from "/img/coaches-training.jpg";
import statesImg from "/img/states-management.jpg";

const RoleBenefits = () => {
  const roles = [
    {
      id: "players",
      label: "Players",
      icon: User,
      image: playersImg,
      highlights: [
        "Official national rankings and skill verification",
        "Tournament entry and registration management",
        "Digital credentials and achievement tracking",
        "Player search and community connections",
        "Court booking and reservation system"
      ]
    },
    {
      id: "clubs",
      label: "Clubs",
      icon: Building,
      image: clubsImg,
      highlights: [
        "Court booking and facility management",
        "Custom club microsite with branding",
        "Tournament hosting and organization tools",
        "Member management and communication",
        "Revenue tracking and reporting"
      ]
    },
    {
      id: "partners",
      label: "Partners",
      icon: Handshake,
      image: partnersImg,
      highlights: [
        "Promote courts and facilities nationwide",
        "Monetize reservations and bookings",
        "Partnership program benefits",
        "Marketing and promotional tools",
        "Analytics and performance insights"
      ]
    },
    {
      id: "coaches",
      label: "Coaches",
      icon: GraduationCap,
      image: coachesImg,
      highlights: [
        "Official coaching credentials and certifications",
        "Student discovery and connection platform",
        "Training program management tools",
        "Professional development resources",
        "Performance tracking for students"
      ]
    },
    {
      id: "states",
      label: "States",
      icon: MapPin,
      image: statesImg,
      highlights: [
        "Oversee clubs and regional activities",
        "State-wide tournament management",
        "Regional statistics and reporting",
        "Policy implementation and compliance",
        "Inter-state coordination and communication"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Tailored for Every Member of the Community
          </h2>
        </div>

        <div className="space-y-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isEven = index % 2 === 0;
            
            const imageAnimation = componentAnimations.roleBenefits.images[index];
            const contentAnimation = componentAnimations.roleBenefits.content[index];
            
            return (
              <div
                key={role.id}
                className="flex flex-col lg:flex-row transition-all duration-300 overflow-hidden"
              >
                {isEven ? (
                  <>
                    <div className={`relative w-full lg:w-1/2 h-64 lg:h-96 overflow-hidden ${imageAnimation}`}>
                      <img 
                        src={role.image} 
                        alt={`${role.label} community`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <CardTitle className="absolute bottom-4 left-6 text-white flex items-center gap-3 text-xl lg:text-2xl">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <span className="hidden sm:inline">Benefits for {role.label}</span>
                        <span className="sm:hidden">{role.label}</span>
                      </CardTitle>
                    </div>
                    <div className={`flex-1 p-4 lg:p-6 flex flex-col justify-center ${contentAnimation}`}>
                      <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-primary">Key Benefits</h3>
                      <ul className="space-y-2 lg:space-y-3">
                        {role.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 lg:gap-3 hover:bg-accent/10 p-2 lg:p-3 rounded-lg transition-colors duration-200">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm lg:text-base text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`flex-1 p-4 lg:p-6 flex flex-col justify-center ${contentAnimation}`}>
                      <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-primary">Key Benefits</h3>
                      <ul className="space-y-2 lg:space-y-3">
                        {role.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 lg:gap-3 hover:bg-accent/10 p-2 lg:p-3 rounded-lg transition-colors duration-200">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm lg:text-base text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`relative w-full lg:w-1/2 h-64 lg:h-96 overflow-hidden ${imageAnimation}`}>
                      <img 
                        src={role.image} 
                        alt={`${role.label} community`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <CardTitle className="absolute bottom-4 left-6 text-white flex items-center gap-3 text-xl lg:text-2xl">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <span className="hidden sm:inline">Benefits for {role.label}</span>
                        <span className="sm:hidden">{role.label}</span>
                      </CardTitle>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleBenefits;