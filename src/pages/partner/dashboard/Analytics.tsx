import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  BarChart3, 
  Download 
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
  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          <span>Business Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Track Business Performance and Growth</h3>
            <Button onClick={() => generateReport('business')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${financialData.thisMonth.toLocaleString()}</div>
                <div className="text-sm text-gray-600">
                  {financialData.thisMonth > financialData.lastMonth ? (
                    <span className="text-green-600">↗ +{((financialData.thisMonth - financialData.lastMonth) / financialData.lastMonth * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-red-600">↘ {((financialData.lastMonth - financialData.thisMonth) / financialData.lastMonth * 100).toFixed(1)}%</span>
                  )} vs last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Year</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">${financialData.thisYear.toLocaleString()}</div>
                <div className="text-sm text-gray-600">
                  {financialData.thisYear > financialData.lastYear ? (
                    <span className="text-green-600">↗ +{((financialData.thisYear - financialData.lastYear) / financialData.lastYear * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-red-600">↘ {((financialData.lastYear - financialData.thisYear) / financialData.lastYear * 100).toFixed(1)}%</span>
                  )} vs last year
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{partnerStats.totalBookings}</div>
                <div className="text-sm text-gray-600">this month</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{partnerStats.averageRating}</div>
                <div className="text-sm text-gray-600">out of 5 stars</div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Revenue by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(financialData.revenueSources).map(([source, percentage]) => (
                    <div key={source} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{source}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Monthly Revenue & Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.monthlyBreakdown.map((month) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{month.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium">${month.revenue}</div>
                        <div className="text-sm text-gray-600">({month.bookings} bookings)</div>
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