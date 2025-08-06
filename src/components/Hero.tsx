import { Button } from "@/components/ui/button";
import heroImage from "/img/9.jpg";

const Hero = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              The Official Platform of the{" "}
              <span className="text-primary">National Pickleball Federation</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage tournaments, connect with players, reserve courts, and grow the sport — all in one place.
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              Join Now
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              <img
                src={heroImage}
                alt="Professional pickleball court with players"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;