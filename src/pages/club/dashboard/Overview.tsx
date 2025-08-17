import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { MapPin, Activity } from 'lucide-react';

interface OverviewProps {
  clubStats: {
    totalMembers: number;
    activeMembers: number;
    totalCourts: number;
    availableCourts: number;
    upcomingEvents: number;
    monthlyRevenue: number;
    averageRating: number;
    totalReviews: number;
    recentActivities: string[];
  };
  courtStatus: Array<{
    id: number;
    name: string;
    status: string;
    currentTime: string;
    nextBooking: string;
  }>;
}

const Overview: React.FC<OverviewProps> = ({ clubStats, courtStatus }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Court Status Overview */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Court Status Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courtStatus.map((court) => (
                <div key={court.id} className={`p-4 rounded-lg border ${
                  court.status === 'Available' ? 'bg-green-50 border-green-200' :
                  court.status === 'Occupied' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-1">{court.name}</h4>
                    <Badge variant={
                      court.status === 'Available' ? 'default' :
                      court.status === 'Occupied' ? 'secondary' : 'destructive'
                    }>
                      {court.status}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-2">{court.currentTime}</p>
                    <p className="text-xs text-gray-500">Next: {court.nextBooking}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span>Recent Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clubStats.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{activity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview; 