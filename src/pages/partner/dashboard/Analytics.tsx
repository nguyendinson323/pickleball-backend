import React from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  BarChart3,
  PieChart
} from 'lucide-react';

interface AnalyticsProps {
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
}

const Analytics: React.FC<AnalyticsProps> = ({ financialData, partnerStats }) => {
  const getGrowthColor = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Monthly Revenue</h3>
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-green-600">
              ${financialData.thisMonth.toLocaleString()}
            </div>
            <div className={`flex items-center text-sm ${getGrowthColor(financialData.thisMonth, financialData.lastMonth)}`}>
              {getGrowthIcon(financialData.thisMonth, financialData.lastMonth)}
              <span className="ml-1">{getGrowthPercentage(financialData.thisMonth, financialData.lastMonth)}</span>
            </div>
            <p className="text-xs text-gray-600">vs last month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Bookings</h3>
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-blue-600">
              {partnerStats.totalBookings}
            </div>
            <p className="text-xs text-gray-600">this month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Customers</h3>
            <Users className="h-4 w-4 text-purple-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-purple-600">
              {partnerStats.totalCustomers}
            </div>
            <p className="text-xs text-gray-600">registered customers</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Court Utilization</h3>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((partnerStats.activeCourts / partnerStats.totalCourts) * 100)}%
            </div>
            <p className="text-xs text-gray-600">active courts</p>
          </div>
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Monthly Revenue Trend</span>
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {financialData.monthlyBreakdown.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-green-600">${month.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{month.bookings} bookings</div>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(month.revenue / Math.max(...financialData.monthlyBreakdown.map(m => m.revenue))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-purple-500" />
              <span>Revenue Sources</span>
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(financialData.revenueSources).map(([source, percentage]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{source}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Year-over-Year Comparison */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Year-over-Year Comparison</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-900 mb-4">This Year</h4>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${financialData.thisYear.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <div className={`flex items-center justify-center text-sm mt-2 ${getGrowthColor(financialData.thisYear, financialData.lastYear)}`}>
                {getGrowthIcon(financialData.thisYear, financialData.lastYear)}
                <span className="ml-1">{getGrowthPercentage(financialData.thisYear, financialData.lastYear)}</span>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Last Year</h4>
              <div className="text-3xl font-bold text-gray-600 mb-2">
                ${financialData.lastYear.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Performance Insights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                ${Math.round(financialData.thisMonth / partnerStats.totalBookings)}
              </div>
              <p className="text-sm text-gray-600">Average Revenue per Booking</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {Math.round((partnerStats.activeCourts / partnerStats.totalCourts) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Court Utilization Rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {Math.round(partnerStats.totalBookings / partnerStats.totalCustomers)}
              </div>
              <p className="text-sm text-gray-600">Bookings per Customer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 