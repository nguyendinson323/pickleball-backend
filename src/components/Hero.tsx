import { Button } from "@/components/ui/button";
import heroImage from "/img/9.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 justify-center items-center">
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center animate-on-scroll">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-on-scroll hero">
              Uniting the{" "}
              <span className="text-primary">Pickleball Nation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl animate-on-scroll">
              The official digital hub for players, clubs, coaches, and partners across the nation. 
              From grassroots development to elite competition, we're building the future of pickleball together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
              <Button size="lg" onClick={() => navigate('/register/select-type')} className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 animate-on-scroll hero cta">
                Join the Federation
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex-1 min-h-[500px] lg:min-h-[600px] animate-on-scroll">
            <div className="relative overflow-hidden rounded-2xl shadow-strong h-full animate-on-scroll card">
              <img
                src={heroImage}
                alt="Professional pickleball court with players"
                className="w-full h-full object-cover animate-on-scroll"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white animate-on-scroll">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Live Tournaments</span>
                  </div>
                  <div className="text-2xl font-bold">24</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-on-scroll">
              <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center animate-on-scroll">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;