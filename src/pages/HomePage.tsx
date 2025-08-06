import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import RoleBenefits from '../components/RoleBenefits'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <RoleBenefits />
      <Testimonials />
      <CallToAction />
    </div>
  )
}

export default HomePage 