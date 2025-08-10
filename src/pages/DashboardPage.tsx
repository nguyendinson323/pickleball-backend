import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAnimation } from '../hooks/useAnimation'

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { elementRef: headerRef } = useAnimation();
  const { elementRef: cardsRef } = useAnimation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div ref={headerRef} className="animate-on-scroll mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.first_name || user?.username}!</p>
      </div>
      
      <div ref={cardsRef} className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "My Tournaments",
            description: "View your tournament registrations",
            value: "0",
            subtitle: "Active registrations"
          },
          {
            title: "My Rankings",
            description: "Your current ranking position",
            value: "--",
            subtitle: "No ranking yet"
          },
          {
            title: "Notifications",
            description: "Unread notifications",
            value: "0",
            subtitle: "Unread messages"
          }
        ].map((card, index) => (
          <div key={index} className="animate-on-scroll">
            <Card>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage 