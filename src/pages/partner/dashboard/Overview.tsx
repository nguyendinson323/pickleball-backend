import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  DollarSign,
  Plus
} from 'lucide-react';

interface OverviewProps {
  partnerStats: {
    totalCourts: number;
    activeCourts: number;
    totalBookings: number;
    monthlyRevenue: number;
    totalCustomers: number;
    averageRating: number;
    upcomingBookings: number;
    maintenanceRequired: number;
  };
  allCourts: Array<{
    name: string;
    status: string;
    lastMaintenance: string;
    nextMaintenance: string;
    hourlyRate: number;
    type: string;
  }>;
  allBookings: Array<{
    id: number;
    customerName: string;
    courtName: string;
    date: string;
    time: string;
    duration: number;
    status: string;
    amount: number;
    paymentStatus: string;
    customerEmail: string;
  }>;
  financialData: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
    monthlyBreakdown: Array<{
      month: string;
      revenue: number;
      bookings: number;
    }>;
    revenueSources: Record<string, number>;
  };
}

const Overview: React.FC<OverviewProps> = ({ partnerStats, allCourts, allBookings, financialData }) => {
  const quickActions = [
    { name: 'Add New Court', icon: MapPin, href: '/partner/courts', color: 'bg-blue-500' },
    { name: 'View Bookings', icon: Calendar, href: '/partner/bookings', color: 'bg-green-500' },
    { name: 'Business Profile', icon: Building2, href: '/partner/profile', color: 'bg-purple-500' },
    { name: 'Analytics', icon: TrendingUp, href: '/partner/analytics', color: 'bg-orange-500' }
  ];

  const recentBookings = allBookings.slice(0, 3);
  const courtStatus = allCourts.slice(0, 4);

  const getCourtStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <Card>
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
                onClick={() => {
                  // Handle navigation or actions
                  console.log(`Action: ${action.name}`);
                }}
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
      <Card>
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
                  <Badge className={getCourtStatusColor(court.status)}>
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
      <Card>
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
                  <Badge className={getBookingStatusColor(booking.status)}>
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
  );
};

export default Overview; 