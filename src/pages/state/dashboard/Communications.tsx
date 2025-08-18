import React from 'react';
import { 
  MessageSquare, 
  Plus, 
  Eye, 
  Edit3, 
  Send 
} from 'lucide-react';

interface CommunicationsProps {
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
  recentAnnouncements: Array<{
    id: number;
    title: string;
    date: string;
    priority: string;
    category: string;
  }>;
}

const Communications: React.FC<CommunicationsProps> = ({ stateStats, recentAnnouncements }) => {
  const handleTournamentAction = (action: string, type: string) => {
    console.log(`${action} ${type}`);
    // In real app, this would perform the action
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tournament': return 'bg-blue-100 text-blue-800';
      case 'Training': return 'bg-green-100 text-green-800';
      case 'General': return 'bg-gray-100 text-gray-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-red-500" />
          <span>State-wide Communications</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Send Announcements and Manage Communications</h3>
            <button 
              onClick={() => handleTournamentAction('announcement', 'create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Announcement</span>
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-blue-800">
                <p className="font-medium">Communication System</p>
                <p className="text-sm mt-1">
                  Send important announcements to all members, clubs, and coaches in your state. 
                  You can schedule messages for later or send them immediately. All communications 
                  are logged and can be tracked for delivery status.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stateStats.totalMembers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Recipients</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stateStats.totalClubs}</div>
              <div className="text-sm text-gray-600">Club Recipients</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{recentAnnouncements.length}</div>
              <div className="text-sm text-gray-600">Recent Announcements</div>
            </div>
          </div>

          {/* Recent Announcements Table */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Recent Announcements</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAnnouncements.map((announcement) => (
                    <tr key={announcement.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{announcement.title}</td>
                      <td className="py-3 px-4 text-gray-700">{announcement.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(announcement.category)}`}>
                          {announcement.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTournamentAction(`announcement-${announcement.id}`, 'view')}
                            className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                            title="View Announcement"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTournamentAction(`announcement-${announcement.id}`, 'edit')}
                            className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                            title="Edit Announcement"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTournamentAction(`announcement-${announcement.id}`, 'resend')}
                            className="p-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200"
                            title="Resend Announcement"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Communication Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Quick Communication Tools</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleTournamentAction('bulk', 'message')}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
                >
                  Send Bulk Message
                </button>
                <button
                  onClick={() => handleTournamentAction('schedule', 'message')}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
                >
                  Schedule Message
                </button>
                <button
                  onClick={() => handleTournamentAction('template', 'create')}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
                >
                  Create Template
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Communication Analytics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivery Rate</span>
                  <span className="text-sm font-medium text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Open Rate</span>
                  <span className="text-sm font-medium text-blue-600">76.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-sm font-medium text-purple-600">23.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communications; 