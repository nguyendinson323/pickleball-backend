import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useAnimation } from '../hooks/useAnimation'

const NotFoundPage = () => {
  const { elementRef: titleRef } = useAnimation();
  const { elementRef: subtitleRef } = useAnimation();
  const { elementRef: descriptionRef } = useAnimation();
  const { elementRef: buttonRef } = useAnimation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 ref={titleRef} className="animate-on-scroll text-6xl font-bold text-gray-900 mb-4">
          404
        </h1>
        <h2 ref={subtitleRef} className="animate-on-scroll text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p ref={descriptionRef} className="animate-on-scroll text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <div ref={buttonRef} className="animate-on-scroll">
          <Link to="/">
            <Button className="hover:scale-105 transition-transform duration-300">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage 