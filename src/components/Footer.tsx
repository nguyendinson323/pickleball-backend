import { Facebook, Twitter, Instagram, Mail, Phone, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Terms", href: "#terms" },
    { label: "Privacy", href: "#privacy" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Scroll to top button */}
      <button
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <footer className="bg-muted/50 border-t relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl transform -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary rounded-full blur-3xl transform translate-x-20 translate-y-20" />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Logo and Copyright */}
            <div className="flex flex-col space-y-4 animate-on-scroll footer-item">
              <div className="flex h-full w-8 items-center rounded-md text-primary-foreground font-bold text-sm animate-on-scroll">
                <img src="/logo.jpeg" alt="logo" className="w-[160px] max-w-none animate-on-scroll" />
              </div>
              
              <p className="text-sm text-muted-foreground animate-on-scroll">
                © 2024 National Pickleball. All rights reserved.
              </p>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="animate-on-scroll footer-item">
              <h3 className="font-semibold mb-4 text-lg animate-on-scroll">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={link.label} className="animate-on-scroll">
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact and Social */}
            <div className="animate-on-scroll footer-item">
              <h3 className="font-semibold mb-4 text-lg animate-on-scroll">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 group animate-on-scroll">
                  <div className="transition-transform duration-500 group-hover:rotate-360">
                    <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <a
                    href="mailto:info@nationalpickleball.org"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    info@nationalpickleball.org
                  </a>
                </div>
                <div className="flex items-center space-x-2 group animate-on-scroll">
                  <div className="transition-transform duration-500 group-hover:rotate-360">
                    <Phone className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <a
                    href="tel:+1-555-PICKLE"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    +1 (555) PICKLE
                  </a>
                </div>
              </div>

              <div className="mt-6 animate-on-scroll">
                <h4 className="font-medium mb-3 animate-on-scroll">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 hover:rotate-5"
                        aria-label={social.label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section with additional info */}
          <div className="mt-8 pt-8 border-t border-border/50 text-center animate-on-scroll footer-item">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for the pickleball community
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;