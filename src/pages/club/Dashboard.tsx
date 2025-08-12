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
  MapPin, 
  Building2, 
  Award,
  Clock,
  Target,
  TrendingUp,
  Star,
  Settings,
  Activity
} from 'lucide-react';

const ClubDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock data - in real app this would come from API
  const clubStats = {
    totalMembers: 156,
    activeMembers: 142,
    totalCourts: 8,
    availableCourts: 3,
    upcomingEvents: 4,
    monthlyRevenue: 12500,
    averageRating: 4.6,
    totalReviews: 234,
    recentActivities: [
      'New member registration - Sarah M.',
      'Tournament registration - Spring Championship',
      'Court maintenance completed - Court 3',
      'Monthly membership renewal - 23 members'
    ]
  };

  const recentMembers = [
    {
      id: 1,
      name: 'Sarah M.',
      type: 'Premium',
      joinDate: '2024-03-20',
      status: 'Active',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      type: 'Basic',
      joinDate: '2024-03-18',
      status: 'Active',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      type: 'Premium',
      joinDate: '2024-03-15',
      status: 'Active',
      photo: null
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Spring Championship Tournament',
      date: '2024-04-20',
      time: '9:00 AM',
      participants: 48,
      type: 'Tournament',
      status: 'Registration Open'
    },
    {
      id: 2,
      title: 'Beginner Clinic',
      date: '2024-04-22',
      time: '2:00 PM',
      participants: 12,
      type: 'Training',
      status: 'Full'
    },
    {
      id: 3,
      title: 'Club Social Night',
      date: '2024-04-25',
      time: '6:00 PM',
      participants: 35,
      type: 'Social',
      status: 'Open'
    }
  ];

  const courtStatus = [
    { id: 1, name: 'Court 1', status: 'Available', currentTime: '2:00 PM - 3:00 PM', nextBooking: '3:00 PM' },
    { id: 2, name: 'Court 2', status: 'Occupied', currentTime: '1:30 PM - 2:30 PM', nextBooking: '2:30 PM' },
    { id: 3, name: 'Court 3', status: 'Available', currentTime: '2:00 PM - 3:00 PM', nextBooking: '3:00 PM' },
    { id: 4, name: 'Court 4', status: 'Maintenance', currentTime: 'Under Repair', nextBooking: 'Tomorrow' },
    { id: 5, name: 'Court 5', status: 'Available', currentTime: '2:00 PM - 3:00 PM', nextBooking: '3:00 PM' },
    { id: 6, name: 'Court 6', status: 'Occupied', currentTime: '1:00 PM - 2:00 PM', nextBooking: '2:00 PM' },
    { id: 7, name: 'Court 7', status: 'Available', currentTime: '2:00 PM - 3:00 PM', nextBooking: '3:00 PM' },
    { id: 8, name: 'Court 8', status: 'Available', currentTime: '2:00 PM - 3:00 PM', nextBooking: '3:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'Club Manager'}!
          </h1>
          <p className="text-gray-600">
            Here's your club overview and current status.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{clubStats.totalMembers}</div>
              <p className="text-xs text-gray-600">{clubStats.activeMembers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courts</CardTitle>
              <MapPin className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{clubStats.availableCourts}</div>
              <p className="text-xs text-gray-600">out of {clubStats.totalCourts} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${clubStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Club Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{clubStats.averageRating}</div>
              <p className="text-xs text-gray-600">{clubStats.totalReviews} reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
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

        {/* Upcoming Events */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.type === 'Tournament' ? 'bg-blue-100 text-blue-600' :
                        event.type === 'Training' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {event.type === 'Tournament' ? <Award className="h-5 w-5" /> :
                         event.type === 'Training' ? <Users className="h-5 w-5" /> :
                         <Calendar className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        event.status === 'Registration Open' ? 'default' :
                        event.status === 'Full' ? 'secondary' : 'outline'
                      }>
                        {event.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{event.participants} participants</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Members */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recent Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.photo} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.type} • Joined: {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
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
                  <span>Manage Members</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <MapPin className="h-6 w-6" />
                  <span>Court Management</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Events</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Settings className="h-6 w-6" />
                  <span>Club Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard; 