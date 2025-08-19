import React from "react";
import ctaBackgroundImg from "/img/cta-background.jpg";

const CallToAction = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
        style={{ 
          backgroundImage: `url(${ctaBackgroundImg})`,
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-trust/80" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
            Be Part of the Official Pickleball Network
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join a national platform built to serve players, clubs, and the future of Pickleball in your country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-lg px-8 py-6 bg-accent text-white rounded-lg hover:scale-105 transition-transform duration-200 font-medium">
              Get Started Free
            </button>
            <button className="text-lg px-8 py-6 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary hover:scale-105 transition-all duration-200 font-medium">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;