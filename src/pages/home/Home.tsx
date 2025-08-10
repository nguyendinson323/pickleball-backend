import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import RoleBenefits from "@/components/RoleBenefits";
import CallToAction from "@/components/CallToAction";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="animate-on-scroll">
        <Hero />
      </div>
      
      <div className="animate-on-scroll">
        <Overview />
      </div>
      
      <div className="animate-on-scroll">
        <Features />
      </div>
      
      <div className="animate-on-scroll">
        <HowItWorks />
      </div>
      
      <div className="animate-on-scroll">
        <RoleBenefits />
      </div>
      
      <div className="animate-on-scroll">
        <CallToAction />
      </div>
      
      <div className="animate-on-scroll">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home; 