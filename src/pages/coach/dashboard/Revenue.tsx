import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  DollarSign, 
  Download 
} from 'lucide-react';

interface RevenueData {
  thisMonth: number;
  lastMonth: number;
  thisYear: number;
  lastYear: number;
  monthlyBreakdown: Array<{ month: string; revenue: number }>;
  sessionTypes: Record<string, number>;
}

interface CoachStats {
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
}

interface RevenueProps {
  revenueData: RevenueData;
  coachStats: CoachStats;
}

const Revenue: React.FC<RevenueProps> = ({ revenueData, coachStats }) => {
  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <span>Revenue Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Monitor Your Coaching Income</h3>
            <Button onClick={() => generateReport('revenue')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${revenueData.thisMonth}</div>
                <div className="text-sm text-gray-600">
                  {revenueData.thisMonth > revenueData.lastMonth ? (
                    <span className="text-green-600">↗ +${revenueData.thisMonth - revenueData.lastMonth}</span>
                  ) : (
                    <span className="text-red-600">↘ -${revenueData.lastMonth - revenueData.thisMonth}</span>
                  )} vs last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Year</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">${revenueData.thisYear}</div>
                <div className="text-sm text-gray-600">
                  {revenueData.thisYear > revenueData.lastYear ? (
                    <span className="text-green-600">↗ +${revenueData.thisYear - revenueData.lastYear}</span>
                  ) : (
                    <span className="text-red-600">↘ -${revenueData.lastYear - revenueData.thisYear}</span>
                  )} vs last year
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{coachStats.totalStudents}</div>
                <div className="text-sm text-gray-600">active students</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{coachStats.averageRating}</div>
                <div className="text-sm text-gray-600">{coachStats.totalReviews} reviews</div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Revenue by Session Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(revenueData.sessionTypes).map(([type, percentage]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{type}</span>
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
                <CardTitle className="text-sm font-medium">Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueData.monthlyBreakdown.map((month) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{month.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(month.revenue / 3200) * 100}%` }}
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

export default Revenue; 