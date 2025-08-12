import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  Settings, 
  Activity,
  DollarSign,
  Clock,
  Target,
  Award,
  Flag,
  Globe
} from 'lucide-react';

const StateDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock state federation data
  const stateStats = {
    totalMembers: 1247,
    activeMembers: 1189,
    totalClubs: 89,
    totalCourts: 456,
    totalTournaments: 23,
    monthlyRevenue: 45600,
    pendingApplications: 12,
    upcomingEvents: 8
  };

  const recentMembers = [
    {
      id: 1,
      name: 'Sarah M.',
      type: 'Player',
      club: 'Elite Pickleball Club',
      joinDate: '2024-03-20',
      status: 'Active',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      type: 'Coach',
      club: 'Pro Training Center',
      joinDate: '2024-03-18',
      status: 'Active',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      type: 'Player',
      club: 'Community Courts',
      joinDate: '2024-03-15',
      status: 'Active',
      photo: null
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: 'State Championship Registration Open',
      date: '2024-03-25',
      priority: 'High',
      category: 'Tournament'
    },
    {
      id: 2,
      title: 'New Safety Guidelines for Clubs',
      date: '2024-03-22',
      priority: 'Medium',
      category: 'Safety'
    },
    {
      id: 3,
      title: 'Coach Certification Program',
      date: '2024-03-20',
      priority: 'Medium',
      category: 'Training'
    }
  ];

  const quickActions = [
    { name: 'Add New Member', icon: Users, href: '/state/members', color: 'bg-blue-500' },
    { name: 'Manage Courts', icon: MapPin, href: '/state/courts', color: 'bg-green-500' },
    { name: 'Create Announcement', icon: Globe, href: '/state/announcements', color: 'bg-purple-500' },
    { name: 'View Statistics', icon: TrendingUp, href: '/state/statistics', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'State Federation'}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your state pickleball federation today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stateStats.totalMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">registered members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
              <Building2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stateStats.totalClubs}</div>
              <p className="text-xs text-gray-600">affiliated clubs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stateStats.totalCourts}</div>
              <p className="text-xs text-gray-600">available courts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${stateStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">from memberships & fees</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => window.location.href = action.href}
                >
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Recent Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800">{member.type}</Badge>
                          <span className="text-sm text-gray-600">{member.club}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{member.joinDate}</div>
                      <Badge className="bg-green-100 text-green-800 mt-1">{member.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View All Members</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-purple-500" />
                <span>Recent Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                      <Badge className={
                        announcement.priority === 'High' ? 'bg-red-100 text-red-800' :
                        announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{announcement.date}</span>
                      <span>•</span>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        {announcement.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View All Announcements</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Federation Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stateStats.activeMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tournaments</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stateStats.totalTournaments}</div>
              <p className="text-xs text-gray-600">this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stateStats.pendingApplications}</div>
              <p className="text-xs text-gray-600">awaiting review</p>
            </CardContent>
          </Card>
        </div>

        {/* State Map Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flag className="h-5 w-5 text-red-500" />
              <span>State Federation Coverage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stateStats.totalMembers}</div>
                <p className="text-gray-600">Total Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stateStats.totalClubs}</div>
                <p className="text-gray-600">Affiliated Clubs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stateStats.totalCourts}</div>
                <p className="text-gray-600">Available Courts</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">Covering all major cities and communities across the state</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StateDashboard; 