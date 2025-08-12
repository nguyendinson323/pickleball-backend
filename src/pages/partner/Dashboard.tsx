import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  Settings, 
  Activity,
  DollarSign,
  Clock,
  Target,
  Award
} from 'lucide-react';

const PartnerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock partner data
  const partnerStats = {
    totalCourts: 12,
    activeCourts: 10,
    totalBookings: 156,
    monthlyRevenue: 12450,
    totalCustomers: 89,
    averageRating: 4.7,
    upcomingBookings: 8,
    maintenanceRequired: 2
  };

  const recentBookings = [
    {
      id: 1,
      customerName: 'Sarah M.',
      courtName: 'Court 1',
      date: '2024-03-25',
      time: '10:00 AM',
      duration: 2,
      status: 'Confirmed',
      amount: 45
    },
    {
      id: 2,
      customerName: 'Mike R.',
      courtName: 'Court 3',
      date: '2024-03-25',
      time: '2:00 PM',
      duration: 1.5,
      status: 'Confirmed',
      amount: 35
    },
    {
      id: 3,
      customerName: 'Lisa K.',
      courtName: 'Court 2',
      date: '2024-03-26',
      time: '9:00 AM',
      duration: 2,
      status: 'Pending',
      amount: 45
    }
  ];

  const courtStatus = [
    { name: 'Court 1', status: 'Available', lastMaintenance: '2024-03-15', nextMaintenance: '2024-04-15' },
    { name: 'Court 2', status: 'Occupied', lastMaintenance: '2024-03-10', nextMaintenance: '2024-04-10' },
    { name: 'Court 3', status: 'Available', lastMaintenance: '2024-03-20', nextMaintenance: '2024-04-20' },
    { name: 'Court 4', status: 'Maintenance', lastMaintenance: '2024-03-18', nextMaintenance: '2024-03-25' }
  ];

  const quickActions = [
    { name: 'Add New Court', icon: MapPin, href: '/partner/courts', color: 'bg-blue-500' },
    { name: 'View Bookings', icon: Calendar, href: '/partner/bookings', color: 'bg-green-500' },
    { name: 'Business Profile', icon: Building2, href: '/partner/profile', color: 'bg-purple-500' },
    { name: 'Analytics', icon: TrendingUp, href: '/partner/analytics', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'Partner'}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your pickleball business today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{partnerStats.totalCourts}</div>
              <p className="text-xs text-gray-600">courts available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${partnerStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{partnerStats.totalCustomers}</div>
              <p className="text-xs text-gray-600">registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{partnerStats.averageRating}</div>
              <p className="text-xs text-gray-600">out of 5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => window.location.href = action.href}
                >
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Court Status Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Court Status Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {courtStatus.map((court) => (
                <div key={court.name} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{court.name}</h4>
                    <Badge className={
                      court.status === 'Available' ? 'bg-green-100 text-green-800' :
                      court.status === 'Occupied' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {court.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Last Maintenance: {court.lastMaintenance}</div>
                    <div>Next Maintenance: {court.nextMaintenance}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span>Recent Bookings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">{booking.date}</div>
                      <div className="text-lg font-semibold">{booking.time}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.customerName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{booking.courtName}</span>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">{booking.duration}h</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {booking.status}
                    </Badge>
                    <div className="text-lg font-semibold text-green-600 mt-1">
                      ${booking.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">View All Bookings</Button>
            </div>
          </CardContent>
        </Card>

        {/* Business Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Revenue Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold text-green-600">${partnerStats.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Month</span>
                  <span className="font-semibold text-gray-900">$11,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Growth</span>
                  <span className="font-semibold text-green-600">+12%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Customer Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New This Month</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Returning Customers</span>
                  <span className="font-semibold text-gray-900">77</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="font-semibold text-purple-600">{partnerStats.totalBookings}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard; 