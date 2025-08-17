import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          <span>Performance Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Track State Federation Performance and Growth</h3>
            <Button onClick={() => generateReport('performance')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          
          {/* Growth Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Member Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{performanceData.memberGrowth.thisYear}</div>
                <div className="text-sm text-gray-600">
                  {performanceData.memberGrowth.growth > 0 ? (
                    <span className="text-green-600">↗ +{performanceData.memberGrowth.growth}%</span>
                  ) : (
                    <span className="text-red-600">↘ {performanceData.memberGrowth.growth}%</span>
                  )} vs last year
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${performanceData.revenueGrowth.thisYear.toLocaleString()}</div>
                <div className="text-sm text-gray-600">
                  {performanceData.revenueGrowth.growth > 0 ? (
                    <span className="text-green-600">↗ +{performanceData.revenueGrowth.growth}%</span>
                  ) : (
                    <span className="text-red-600">↘ {performanceData.revenueGrowth.growth}%</span>
                  )} vs last year
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tournament Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{performanceData.tournamentGrowth.thisYear}</div>
                <div className="text-sm text-gray-600">
                  {performanceData.tournamentGrowth.growth > 0 ? (
                    <span className="text-green-600">↗ +{performanceData.tournamentGrowth.growth}%</span>
                  ) : (
                    <span className="text-red-600">↘ {performanceData.tournamentGrowth.growth}%</span>
                  )} vs last year
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Monthly Member Trends</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Monthly Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Analytics; 