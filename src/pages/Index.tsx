import Home from "./home/Home";
import About from "./home/About";
import Events from "./home/Events";
import Rankings from "./home/Rankings";
import Membership from "./home/Membership";
import FindCourt from "./home/FindCourt";
import News from "./home/News";
import Contact from "./home/Contact";
import { useAnimation } from '../hooks/useAnimation';

const Index = () => {
  const { elementRef: homeRef } = useAnimation();
  const { elementRef: aboutRef } = useAnimation();
  const { elementRef: eventsRef } = useAnimation();
  const { elementRef: rankingsRef } = useAnimation();
  const { elementRef: membershipRef } = useAnimation();
  const { elementRef: findCourtRef } = useAnimation();
  const { elementRef: newsRef } = useAnimation();
  const { elementRef: contactRef } = useAnimation();

  return (
    <div className="min-h-screen">
      <div ref={homeRef} className="animate-on-scroll">
        <Home />
      </div>
      <div ref={aboutRef} className="animate-on-scroll">
        <About />
      </div>
      <div ref={eventsRef} className="animate-on-scroll">
        <Events />
      </div>
      <div ref={rankingsRef} className="animate-on-scroll">
        <Rankings />
      </div>
      <div ref={membershipRef} className="animate-on-scroll">
        <Membership />
      </div>
      <div ref={findCourtRef} className="animate-on-scroll">
        <FindCourt />
      </div>
      <div ref={newsRef} className="animate-on-scroll">
        <News />
      </div>
      <div ref={contactRef} className="animate-on-scroll">
        <Contact />
      </div>
    </div>
  );
};

export default Index;