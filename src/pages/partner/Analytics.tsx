import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Analytics = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [timeRange, setTimeRange] = useState('30');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 124500,
      totalBookings: 1560,
      totalCustomers: 89,
      averageRating: 4.7,
      revenueGrowth: 12.5,
      bookingGrowth: 8.3,
      customerGrowth: 15.2
    },
    revenue: {
      monthly: [8900, 10200, 11500, 12450, 11800, 13200, 14100, 13800, 14500, 15200, 15800, 124500],
      byCourt: [
        { name: 'Court 1', revenue: 18500, bookings: 148 },
        { name: 'Court 2', revenue: 17200, bookings: 137 },
        { name: 'Court 3', revenue: 15800, bookings: 126 },
        { name: 'Court 4', revenue: 14200, bookings: 113 }
      ]
    },
    bookings: {
      byHour: [
        { hour: '6-8 AM', count: 45, percentage: 8.3 },
        { hour: '8-10 AM', count: 89, percentage: 16.4 },
        { hour: '10-12 PM', count: 67, percentage: 12.4 },
        { hour: '12-2 PM', count: 78, percentage: 14.4 },
        { hour: '2-4 PM', count: 92, percentage: 17.0 },
        { hour: '4-6 PM', count: 89, percentage: 16.4 },
        { hour: '6-8 PM', count: 67, percentage: 12.4 },
        { hour: '8-10 PM', count: 15, percentage: 2.8 }
      ],
      byDay: [
        { day: 'Monday', count: 156, revenue: 3120 },
        { day: 'Tuesday', count: 189, revenue: 3780 },
        { day: 'Wednesday', count: 203, revenue: 4060 },
        { day: 'Thursday', count: 178, revenue: 3560 },
        { day: 'Friday', count: 234, revenue: 4680 },
        { day: 'Saturday', count: 267, revenue: 5340 },
        { day: 'Sunday', count: 223, revenue: 4460 }
      ]
    },
    customers: {
      newVsReturning: [
        { type: 'New Customers', count: 23, percentage: 25.8 },
        { type: 'Returning Customers', count: 66, percentage: 74.2 }
      ],
      bySkillLevel: [
        { level: 'Beginner', count: 34, percentage: 38.2 },
        { level: 'Intermediate', count: 42, percentage: 47.2 },
        { level: 'Advanced', count: 13, percentage: 14.6 }
      ],
      topCustomers: [
        { name: 'Sarah M.', bookings: 45, revenue: 1125, lastVisit: '2024-03-20' },
        { name: 'Mike R.', bookings: 32, revenue: 800, lastVisit: '2024-03-18' },
        { name: 'Lisa K.', bookings: 67, revenue: 1675, lastVisit: '2024-03-15' },
        { name: 'John D.', bookings: 28, revenue: 700, lastVisit: '2024-03-12' }
      ]
    },
    performance: {
      courtUtilization: [
        { court: 'Court 1', utilization: 87, revenue: 18500 },
        { court: 'Court 2', utilization: 82, revenue: 17200 },
        { court: 'Court 3', utilization: 76, revenue: 15800 },
        { court: 'Court 4', utilization: 71, revenue: 14200 }
      ],
      peakHours: ['2-4 PM', '4-6 PM', '6-8 PM'],
      slowHours: ['6-8 AM', '8-10 PM']
    }
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Analytics</h1>
            <p className="text-gray-600">Track your business performance and gain insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="timeRange" className="text-sm font-medium text-gray-700">Time Range:</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Revenue</h3>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-green-600">
                ${analyticsData.overview.totalRevenue.toLocaleString()}
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(analyticsData.overview.revenueGrowth)}`}>
                {getGrowthIcon(analyticsData.overview.revenueGrowth)}
                <span className="ml-1">+{analyticsData.overview.revenueGrowth}%</span>
              </div>
              <p className="text-xs text-gray-600">vs previous period</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Bookings</h3>
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-blue-600">
                {analyticsData.overview.totalBookings.toLocaleString()}
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(analyticsData.overview.bookingGrowth)}`}>
                {getGrowthIcon(analyticsData.overview.bookingGrowth)}
                <span className="ml-1">+{analyticsData.overview.bookingGrowth}%</span>
              </div>
              <p className="text-xs text-gray-600">vs previous period</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Customers</h3>
              <Users className="h-4 w-4 text-purple-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-purple-600">
                {analyticsData.overview.totalCustomers}
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(analyticsData.overview.customerGrowth)}`}>
                {getGrowthIcon(analyticsData.overview.customerGrowth)}
                <span className="ml-1">+{analyticsData.overview.customerGrowth}%</span>
              </div>
              <p className="text-xs text-gray-600">vs previous period</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Average Rating</h3>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-yellow-600">
                {analyticsData.overview.averageRating}
              </div>
              <p className="text-xs text-gray-600">out of 5 stars</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue by Court */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span>Revenue by Court</span>
              </h3>
            </div>
            <div className="pt-2">
              <div className="space-y-4">
                {analyticsData.revenue.byCourt.map((court) => (
                  <div key={court.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{court.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">${court.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{court.bookings} bookings</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Demographics */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                <span>Customer Demographics</span>
              </h3>
            </div>
            <div className="pt-2">
              <div className="space-y-4">
                {analyticsData.customers.bySkillLevel.map((level) => (
                  <div key={level.level} className="flex items-center justify-between">
                    <span className="font-medium">{level.level}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${level.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{level.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bookings by Hour */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span>Bookings by Hour</span>
              </h3>
            </div>
            <div className="pt-2">
              <div className="space-y-3">
                {analyticsData.bookings.byHour.map((hour) => (
                  <div key={hour.hour} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{hour.hour}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${hour.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{hour.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings by Day */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span>Bookings by Day</span>
              </h3>
            </div>
            <div className="pt-2">
              <div className="space-y-3">
                {analyticsData.bookings.byDay.map((day) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{day.day}</span>
                    <div className="text-right">
                      <div className="font-semibold text-orange-600">{day.count}</div>
                      <div className="text-sm text-gray-600">${day.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Court Utilization */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-500" />
                <span>Court Utilization</span>
              </h3>
            </div>
            <div className="pt-2">
              <div className="space-y-4">
                {analyticsData.performance.courtUtilization.map((court) => (
                  <div key={court.court} className="flex items-center justify-between">
                    <span className="font-medium">{court.court}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${court.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{court.utilization}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Peak vs Slow Hours */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <span>Peak vs Slow Hours</span>
              </h3>
            </div>
            <div className="pt-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Peak Hours</h4>
                  <div className="flex flex-wrap gap-2">
                    {analyticsData.performance.peakHours.map((hour) => (
                      <span key={hour} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {hour}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Slow Hours</h4>
                  <div className="flex flex-wrap gap-2">
                    {analyticsData.performance.slowHours.map((hour) => (
                      <span key={hour} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {hour}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span>Top Customers</span>
            </h3>
          </div>
          <div className="pt-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Customer</th>
                    <th className="text-left py-2 font-medium">Total Bookings</th>
                    <th className="text-left py-2 font-medium">Total Revenue</th>
                    <th className="text-left py-2 font-medium">Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.customers.topCustomers.map((customer) => (
                    <tr key={customer.name} className="border-b">
                      <td className="py-2 font-medium">{customer.name}</td>
                      <td className="py-2">{customer.bookings}</td>
                      <td className="py-2 text-green-600">${customer.revenue}</td>
                      <td className="py-2 text-gray-600">{customer.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 