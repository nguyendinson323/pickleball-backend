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
      <Hero />
      <Overview />
      <Features />
      <HowItWorks />
      <RoleBenefits />
      <CallToAction />
      <Testimonials />
    </div>
  );
};

export default Home; 