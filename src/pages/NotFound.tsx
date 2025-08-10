import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAnimation } from '../hooks/useAnimation';

const NotFound = () => {
  const location = useLocation();
  const { elementRef: titleRef } = useAnimation();
  const { elementRef: descriptionRef } = useAnimation();
  const { elementRef: linkRef } = useAnimation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 ref={titleRef} className="animate-on-scroll text-4xl font-bold mb-4">404</h1>
        <p ref={descriptionRef} className="animate-on-scroll text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <div ref={linkRef} className="animate-on-scroll">
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
