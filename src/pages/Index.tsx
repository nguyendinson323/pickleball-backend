import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import RoleBenefits from "@/components/RoleBenefits";
import CallToAction from "@/components/CallToAction";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Features />
        <HowItWorks />
        <RoleBenefits />
        <CallToAction />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;