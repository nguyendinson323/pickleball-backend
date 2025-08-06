import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building, Handshake, GraduationCap, MapPin } from "lucide-react";

const RoleBenefits = () => {
  const roles = [
    {
      id: "players",
      label: "Players",
      icon: User,
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

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <TabsTrigger
                  key={role.id}
                  value={role.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{role.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <TabsContent key={role.id} value={role.id}>
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      Benefits for {role.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {role.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default RoleBenefits;