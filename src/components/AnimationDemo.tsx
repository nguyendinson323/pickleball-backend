import React from 'react';

/**
 * 🎭 Animation Demo Component
 * Showcases all the different animation types for testing
 */
const AnimationDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="container mx-auto max-w-4xl space-y-16">
        
        {/* Hero Section Demo */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl font-bold animate-on-scroll hero">
            Animation Demo
          </h1>
          <h2 className="text-2xl text-muted-foreground animate-on-scroll hero">
            Showcasing All Animation Types
          </h2>
          <p className="text-lg animate-on-scroll">
            Scroll down to see different animations for each element type
          </p>
        </section>

        {/* DIV Elements Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            DIV Elements - Slide Up from Bottom
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-on-scroll p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Card 1</h4>
              <p>This div slides up from the bottom</p>
            </div>
            <div className="animate-on-scroll p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Card 2</h4>
              <p>Each div has the same animation style</p>
            </div>
            <div className="animate-on-scroll p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Card 3</h4>
              <p>But different content for variety</p>
            </div>
          </div>
        </section>

        {/* IMG Elements Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            IMG Elements - Scale In from Center
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-on-scroll">
              <img 
                src="/img/1 (2).jpeg" 
                alt="Demo image 1" 
                className="w-full h-64 object-cover rounded-lg shadow-md animate-on-scroll"
              />
            </div>
            <div className="animate-on-scroll">
              <img 
                src="/img/1 (3).jpeg" 
                alt="Demo image 2" 
                className="w-full h-64 object-cover rounded-lg shadow-md animate-on-scroll"
              />
            </div>
          </div>
        </section>

        {/* Heading Elements Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            Heading Elements - Different Directions
          </h3>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold animate-on-scroll">
              H1 - Slides Down from Top
            </h1>
            <h2 className="text-3xl font-semibold animate-on-scroll">
              H2 - Slides In from Left
            </h2>
            <h3 className="text-2xl font-medium animate-on-scroll">
              H3 - Slides In from Right
            </h3>
            <h4 className="text-xl font-medium animate-on-scroll">
              H4 - Rotates In with Scale
            </h4>
            <h5 className="text-lg font-medium animate-on-scroll">
              H5 - Also Rotates In
            </h5>
            <h6 className="text-base font-medium animate-on-scroll">
              H6 - Same Rotation Effect
            </h6>
          </div>
        </section>

        {/* Paragraph Elements Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            P Elements - Fade In with Bounce
          </h3>
          <div className="space-y-4">
            <p className="text-lg animate-on-scroll">
              This paragraph fades in with a slight bounce effect. It uses translateY and scale transforms for smooth animation.
            </p>
            <p className="text-lg animate-on-scroll">
              Each paragraph element gets the same animation style, creating a consistent visual rhythm as you scroll.
            </p>
            <p className="text-lg animate-on-scroll">
              The bounce effect is subtle but adds a nice touch of personality to the text elements.
            </p>
          </div>
        </section>

        {/* Input Elements Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            INPUT Elements - Slide Up with Glow
          </h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="This input slides up with a blue glow"
              className="w-full p-3 border rounded-lg animate-on-scroll"
            />
            <input 
              type="email" 
              placeholder="Email input with the same animation"
              className="w-full p-3 border rounded-lg animate-on-scroll"
            />
            <textarea 
              placeholder="Textarea also gets the slide up animation"
              className="w-full p-3 border rounded-lg h-24 resize-none animate-on-scroll"
            />
          </div>
        </section>

        {/* Button Elements Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            BUTTON Elements - Bounce In from Bottom
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="animate-on-scroll px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
              Primary Button
            </button>
            <button className="animate-on-scroll px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80">
              Secondary Button
            </button>
            <button className="animate-on-scroll px-6 py-3 bg-accent text-foreground rounded-lg hover:bg-accent/90">
              Accent Button
            </button>
          </div>
        </section>

        {/* Specialized Component Animations Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            Specialized Component Animations
          </h3>
          
          {/* Feature Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-on-scroll feature p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Feature 1</h4>
              <p>This feature zooms in from center</p>
            </div>
            <div className="animate-on-scroll feature p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Feature 2</h4>
              <p>Each feature has a unique zoom effect</p>
            </div>
          </div>

          {/* Testimonial Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-on-scroll testimonial p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Testimonial Left</h4>
              <p>This slides in from the left side</p>
            </div>
            <div className="animate-on-scroll testimonial p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Testimonial Right</h4>
              <p>This slides in from the right side</p>
            </div>
          </div>

          {/* Card Demo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-on-scroll card p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Card 1</h4>
              <p>This card flips in with 3D effect</p>
            </div>
            <div className="animate-on-scroll card p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Card 2</h4>
              <p>Each card has a unique flip animation</p>
            </div>
            <div className="animate-on-scroll card p-6 bg-card rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Card 3</h4>
              <p>The 3D effect adds depth and interest</p>
            </div>
          </div>
        </section>

        {/* Navigation Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            Navigation Elements - Slide Down from Top
          </h3>
          <nav className="flex flex-wrap gap-4">
            <div className="animate-on-scroll nav-item px-4 py-2 bg-primary text-white rounded-lg">
              Home
            </div>
            <div className="animate-on-scroll nav-item px-4 py-2 bg-secondary text-foreground rounded-lg">
              About
            </div>
            <div className="animate-on-scroll nav-item px-4 py-2 bg-accent text-foreground rounded-lg">
              Services
            </div>
            <div className="animate-on-scroll nav-item px-4 py-2 bg-muted text-foreground rounded-lg">
              Contact
            </div>
          </nav>
        </section>

        {/* Footer Demo */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">
            Footer Elements - Slide Up from Bottom
          </h3>
          <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-card rounded-lg">
            <div className="animate-on-scroll footer-item">
              <h4 className="font-semibold mb-2">Company</h4>
              <p>About us, mission, values</p>
            </div>
            <div className="animate-on-scroll footer-item">
              <h4 className="font-semibold mb-2">Support</h4>
              <p>Help, contact, FAQ</p>
            </div>
            <div className="animate-on-scroll footer-item">
              <h4 className="font-semibold mb-2">Legal</h4>
              <p>Privacy, terms, cookies</p>
            </div>
          </footer>
        </section>

        {/* Performance Note */}
        <section className="text-center p-8 bg-card rounded-lg">
          <h3 className="text-xl font-semibold mb-4 animate-on-scroll">
            Performance Optimized
          </h3>
          <p className="animate-on-scroll">
            All animations use GPU-friendly properties (transform, opacity) and the Intersection Observer API for optimal performance.
            No animation delays - elements animate immediately when they enter the viewport.
          </p>
        </section>

      </div>
    </div>
  );
};

export default AnimationDemo; 