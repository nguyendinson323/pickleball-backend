import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.first_name || user?.username}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Tournaments</CardTitle>
            <CardDescription>View your tournament registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Active registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Rankings</CardTitle>
            <CardDescription>Your current ranking position</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">--</p>
            <p className="text-sm text-gray-600">No ranking yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Unread notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Unread messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage 