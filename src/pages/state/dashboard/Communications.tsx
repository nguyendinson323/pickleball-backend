import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-red-500" />
          <span>State-wide Communications</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Send Announcements and Manage Communications</h3>
            <Button onClick={() => handleTournamentAction('announcement', 'create')}>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell>
                      <Badge className={
                        announcement.priority === 'High' ? 'bg-red-100 text-red-800' :
                        announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {announcement.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{announcement.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTournamentAction(`announcement-${announcement.id}`, 'view')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTournamentAction(`announcement-${announcement.id}`, 'edit')}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTournamentAction(`announcement-${announcement.id}`, 'resend')}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Resend
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Communications; 