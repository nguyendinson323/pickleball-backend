import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Users, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Award,
  Clock,
  Target,
  TrendingUp,
  Star,
  GraduationCap
} from 'lucide-react';

const CoachDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock data - in real app this would come from API
  const coachStats = {
    totalStudents: 24,
    activeStudents: 18,
    trainingSessions: 156,
    sessionsThisMonth: 12,
    averageRating: 4.8,
    totalReviews: 89,
    certifications: 3,
    nextSession: 'Advanced Technique Workshop',
    nextSessionDate: '2024-04-20',
    upcomingSessions: 5,
    recentAchievements: [
      'Certified Advanced Coach - Level 3',
      'Student Tournament Winner - Sarah M.',
      '100+ Training Sessions Milestone'
    ]
  };

  const recentStudents = [
    {
      id: 1,
      name: 'Sarah M.',
      level: 'Intermediate',
      lastSession: '2024-03-20',
      progress: 85,
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      level: 'Beginner',
      lastSession: '2024-03-18',
      progress: 45,
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      level: 'Advanced',
      lastSession: '2024-03-15',
      progress: 92,
      photo: null
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Advanced Technique Workshop',
      date: '2024-04-20',
      time: '10:00 AM',
      students: 8,
      type: 'Group Session'
    },
    {
      id: 2,
      title: 'Beginner Fundamentals',
      date: '2024-04-22',
      time: '2:00 PM',
      students: 12,
      type: 'Group Session'
    },
    {
      id: 3,
      title: 'Private Lesson - John D.',
      date: '2024-04-25',
      time: '4:00 PM',
      students: 1,
      type: 'Private Session'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Coach {user?.username || 'Coach'}!
          </h1>
          <p className="text-gray-600">
            Here's your coaching overview and upcoming sessions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Main Content Grid */}
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

        {/* Upcoming Sessions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        session.type === 'Private Session' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {session.type === 'Private Session' ? <Users className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={session.type === 'Private Session' ? 'secondary' : 'default'}>
                        {session.type}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{session.students} student{session.students > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recent Students</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.photo} />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.level} • Last session: {student.lastSession}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{student.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Progress</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Students</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Session</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Training Plans</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Award className="h-6 w-6" />
                  <span>My Credentials</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard; 