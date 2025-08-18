import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  DollarSign,
  Award,
  Clock,
  Flag,
  Globe
} from 'lucide-react';

interface OverviewProps {
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
  recentMembers: Array<{
    id: number;
    name: string;
    type: string;
    club: string;
    joinDate: string;
    status: string;
    photo: string | null;
  }>;
  recentAnnouncements: Array<{
    id: number;
    title: string;
    date: string;
    priority: string;
    category: string;
  }>;
}

const Overview: React.FC<OverviewProps> = ({ stateStats, recentMembers, recentAnnouncements }) => {
  const quickActions = [
    { name: 'Add New Member', icon: Users, href: '/state/members', color: 'bg-blue-500' },
    { name: 'Manage Courts', icon: MapPin, href: '/state/courts', color: 'bg-green-500' },
    { name: 'Create Announcement', icon: Globe, href: '/state/announcements', color: 'bg-purple-500' },
    { name: 'View Statistics', icon: TrendingUp, href: '/state/statistics', color: 'bg-orange-500' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tournament': return 'bg-purple-100 text-purple-800';
      case 'Safety': return 'bg-red-100 text-red-800';
      case 'Training': return 'bg-blue-100 text-blue-800';
      case 'Equipment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Members</p>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{stateStats.totalMembers.toLocaleString()}</div>
          <p className="text-xs text-gray-600">registered members</p>
        </div>

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Clubs</p>
            <Building2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">{stateStats.totalClubs}</div>
          <p className="text-xs text-gray-600">affiliated clubs</p>
        </div>

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Courts</p>
            <MapPin className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{stateStats.totalCourts}</div>
          <p className="text-xs text-gray-600">available courts</p>
        </div>

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            ${stateStats.monthlyRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-gray-600">this month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 animate-on-scroll">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity duration-200 text-center`}
            >
              <action.icon className="h-8 w-8 mx-auto mb-2" />
              <span className="font-medium">{action.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Members */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 animate-on-scroll">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Members</h3>
            <a href="/state/members" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.type} • {member.club}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{member.joinDate}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 animate-on-scroll">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
            <a href="/state/announcements" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                  <div className="flex space-x-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(announcement.category)}`}>
                      {announcement.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 animate-on-scroll">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          <a href="/state/events" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">State Championship</span>
            </div>
            <p className="text-sm text-blue-700">June 15-17, 2024</p>
            <p className="text-xs text-blue-600">Sacramento, CA</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">Coach Certification</span>
            </div>
            <p className="text-sm text-green-700">May 20-22, 2024</p>
            <p className="text-xs text-green-600">Online Training</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Club Managers Meeting</span>
            </div>
            <p className="text-sm text-purple-700">April 15, 2024</p>
            <p className="text-xs text-purple-600">Los Angeles, CA</p>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 animate-on-scroll">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {((stateStats.activeMembers / stateStats.totalMembers) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Member Retention</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              ${(stateStats.monthlyRevenue / stateStats.totalMembers).toFixed(0)}
            </div>
            <p className="text-sm text-gray-600">Revenue per Member</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {stateStats.totalCourts / stateStats.totalClubs}
            </div>
            <p className="text-sm text-gray-600">Avg Courts per Club</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {stateStats.pendingApplications}
            </div>
            <p className="text-sm text-gray-600">Pending Applications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 