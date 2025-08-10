import { Button } from "@/components/ui/button";
import { UserPlus, FileCheck, LayoutDashboard, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Register",
      description: "Choose your role and create your account with the National Pickleball Federation platform."
    },
    {
      number: 2,
      icon: FileCheck,
      title: "Complete Your Profile",
      description: "Upload your documents, verify credentials, and set up your complete member profile."
    },
    {
      number: 3,
      icon: LayoutDashboard,
      title: "Access Dashboard",
      description: "Manage your tools, view your statistics, and access all federation resources in one place."
    },
    {
      number: 4,
      icon: TrendingUp,
      title: "Grow with the Federation",
      description: "Participate in tournaments, connect with players, and help grow the sport nationwide."
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-16 lg:py-24 animate-on-scroll"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-on-scroll">
            Get Started in Just a Few Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="text-center relative animate-on-scroll"
              >
                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0 animate-in slide-in-from-left-2 duration-800 delay-1000" />
                )}
                
                <div className="relative z-10 animate-on-scroll">
                  <div className="w-24 h-24 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-medium hover:scale-110 hover:rotate-1 transition-all duration-300 active:scale-95 animate-on-scroll">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold animate-on-scroll">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 animate-on-scroll">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed animate-on-scroll">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center space-x-4 animate-on-scroll">
          <div className="inline-block mb-4 lg:mb-0">
            <Button 
              size="lg" 
              className="w-full lg:w-auto hover:scale-105 active:scale-95 transition-transform duration-300 animate-on-scroll"
            >
              Get Started Free
            </Button>
          </div>
          <div className="inline-block">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full lg:w-auto hover:scale-105 active:scale-95 transition-transform duration-300 animate-on-scroll"
            >
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;