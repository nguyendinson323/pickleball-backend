import React from 'react';
import { 
  BarChart3, 
  Download 
} from 'lucide-react';

interface AnalyticsProps {
  performanceData: {
    memberGrowth: {
      thisYear: number;
      lastYear: number;
      growth: number;
    };
    revenueGrowth: {
      thisYear: number;
      lastYear: number;
      growth: number;
    };
    tournamentGrowth: {
      thisYear: number;
      lastYear: number;
      growth: number;
    };
    monthlyTrends: Array<{
      month: string;
      members: number;
      revenue: number;
    }>;
  };
  stateStats: {
    totalMembers: number;
    activeMembers: number;
    totalClubs: number;
    totalCourts: number;
    totalTournaments: number;
    monthlyRevenue: number;
    pendingApplications: number;
    upcomingEvents: number;
  };
}

const Analytics: React.FC<AnalyticsProps> = ({ performanceData, stateStats }) => {
  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? '↗' : '↘';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          <span>Performance Analytics</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Track State Federation Performance and Growth</h3>
            <button 
              onClick={() => generateReport('performance')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
          
          {/* Growth Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
              <div className="pb-2">
                <h4 className="text-sm font-medium text-gray-600">Member Growth</h4>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{performanceData.memberGrowth.thisYear}</div>
                <div className="text-sm text-gray-600">
                  <span className={getGrowthColor(performanceData.memberGrowth.growth)}>
                    {getGrowthIcon(performanceData.memberGrowth.growth)} {performanceData.memberGrowth.growth > 0 ? '+' : ''}{performanceData.memberGrowth.growth}%
                  </span> vs last year
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
              <div className="pb-2">
                <h4 className="text-sm font-medium text-gray-600">Revenue Growth</h4>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">${performanceData.revenueGrowth.thisYear.toLocaleString()}</div>
                <div className="text-sm text-gray-600">
                  <span className={getGrowthColor(performanceData.revenueGrowth.growth)}>
                    {getGrowthIcon(performanceData.revenueGrowth.growth)} {performanceData.revenueGrowth.growth > 0 ? '+' : ''}{performanceData.revenueGrowth.growth}%
                  </span> vs last year
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
              <div className="pb-2">
                <h4 className="text-sm font-medium text-gray-600">Tournament Growth</h4>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{performanceData.tournamentGrowth.thisYear}</div>
                <div className="text-sm text-gray-600">
                  <span className={getGrowthColor(performanceData.tournamentGrowth.growth)}>
                    {getGrowthIcon(performanceData.tournamentGrowth.growth)} {performanceData.tournamentGrowth.growth > 0 ? '+' : ''}{performanceData.tournamentGrowth.growth}%
                  </span> vs last year
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
              <div className="pb-2">
                <h4 className="text-sm font-medium text-gray-600">Monthly Member Trends</h4>
              </div>
              <div>
                <div className="space-y-3">
                  {performanceData.monthlyTrends.map((month) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{month.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(month.members / 1247) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{month.members}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
              <div className="pb-2">
                <h4 className="text-sm font-medium text-gray-600">Monthly Revenue Trends</h4>
              </div>
              <div>
                <div className="space-y-3">
                  {performanceData.monthlyTrends.map((month) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{month.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(month.revenue / 4560) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">${month.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Members</p>
                  <p className="text-2xl font-bold text-blue-900">{stateStats.totalMembers.toLocaleString()}</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-semibold">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-900">${stateStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Active Clubs</p>
                  <p className="text-2xl font-bold text-purple-900">{stateStats.totalClubs}</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-semibold">🏢</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-orange-900">{stateStats.upcomingEvents}</p>
                </div>
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-lg font-semibold">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Generation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Generate Reports</h4>
            <div className="flex space-x-3">
              <button
                onClick={() => generateReport('members')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Member Report
              </button>
              <button
                onClick={() => generateReport('revenue')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Revenue Report
              </button>
              <button
                onClick={() => generateReport('tournaments')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Tournament Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 