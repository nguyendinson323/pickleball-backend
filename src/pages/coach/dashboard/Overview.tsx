import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  Users, 
  BookOpen, 
  Star, 
  Award,
  Calendar
} from 'lucide-react';

interface CoachStats {
  totalStudents: number;
  activeStudents: number;
  trainingSessions: number;
  sessionsThisMonth: number;
  averageRating: number;
  totalReviews: number;
  certifications: number;
  nextSession: string;
  nextSessionDate: string;
  upcomingSessions: number;
  recentAchievements: string[];
}

interface OverviewProps {
  coachStats: CoachStats;
}

const Overview: React.FC<OverviewProps> = ({ coachStats }) => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{coachStats.totalStudents}</div>
            <p className="text-xs text-gray-600">{coachStats.activeStudents} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{coachStats.trainingSessions}</div>
            <p className="text-xs text-gray-600">{coachStats.sessionsThisMonth} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{coachStats.averageRating}</div>
            <p className="text-xs text-gray-600">{coachStats.totalReviews} reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{coachStats.certifications}</div>
            <p className="text-xs text-gray-600">active certifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Session and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Session */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Next Training Session</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {coachStats.nextSession}
                </h3>
                <p className="text-gray-600 mb-4">
                  {new Date(coachStats.nextSessionDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{coachStats.upcomingSessions}</div>
                    <div className="text-sm text-gray-600">Upcoming Sessions</div>
                  </div>
                </div>
                <Button className="w-full">View Session Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coachStats.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
            >
              <Users className="h-6 w-6" />
              <span>Manage Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Schedule Session</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
            >
              <BookOpen className="h-6 w-6" />
              <span>Training Plans</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
            >
              <Award className="h-6 w-6" />
              <span>My Credentials</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview; 