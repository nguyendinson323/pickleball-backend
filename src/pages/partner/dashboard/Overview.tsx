import React from 'react';
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
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Courts</h3>
            <MapPin className="h-4 w-4 text-blue-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-blue-600">{partnerStats.totalCourts}</div>
            <p className="text-xs text-gray-600">courts available</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Active Courts</h3>
            <Building2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-green-600">{partnerStats.activeCourts}</div>
            <p className="text-xs text-gray-600">ready for use</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Bookings</h3>
            <Calendar className="h-4 w-4 text-purple-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-purple-600">{partnerStats.totalBookings}</div>
            <p className="text-xs text-gray-600">this month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Monthly Revenue</h3>
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-green-600">${partnerStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">this month</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {action.name}
                </h4>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.courtName} • {booking.date} at {booking.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getBookingStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <p className="text-sm font-medium text-green-600 mt-1">${booking.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200">
                View All Bookings
              </button>
            </div>
          </div>
        </div>

        {/* Court Status */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Court Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {courtStatus.map((court) => (
                <div key={court.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{court.name}</p>
                        <p className="text-sm text-gray-600">{court.type} • ${court.hourlyRate}/hr</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCourtStatusColor(court.status)}`}>
                      {court.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Next maintenance: {court.nextMaintenance}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200">
                Manage Courts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Financial Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-green-600">${financialData.thisMonth.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">This Year</p>
              <p className="text-2xl font-bold text-blue-600">${financialData.thisYear.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-bold text-purple-600">
                {((financialData.thisMonth - financialData.lastMonth) / financialData.lastMonth * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">vs Last Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 