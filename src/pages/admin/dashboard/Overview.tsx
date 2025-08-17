import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Users, 
  Building2, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Star, 
  Settings, 
  Activity,
  DollarSign,
  Clock,
  Target,
  Award,
  Shield,
  Globe,
  Database,
  Server,
  MessageSquare,
  Send,
  Bell,
  X
} from 'lucide-react';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';

interface OverviewProps {
  systemStats: {
    totalUsers: number;
    activeUsers: number;
    totalClubs: number;
    totalCourts: number;
    totalTournaments: number;
    monthlyRevenue: number;
    systemUptime: number;
    pendingApprovals: number;
    activeFederations: number;
    totalStates: number;
  };
  recentSystemEvents: Array<{
    id: number;
    type: string;
    description: string;
    timestamp: string;
    severity: string;
    user: string;
  }>;
  pendingActions: Array<{
    id: number;
    type: string;
    count: number;
    description: string;
    priority: string;
  }>;
  timeRange: string;
  setTimeRange: (range: string) => void;
  showMessaging: boolean;
  setShowMessaging: (show: boolean) => void;
  messageData: any;
  setMessageData: (data: any) => void;
}

const Overview: React.FC<OverviewProps> = ({
  systemStats,
  recentSystemEvents,
  pendingActions,
  timeRange,
  setTimeRange,
  showMessaging,
  setShowMessaging,
  messageData,
  setMessageData
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    // Handle message sending logic
    console.log('Sending message:', messageData);
    setShowMessaging(false);
    setMessageData({
      subject: '',
      message: '',
      recipients: {
        players: false,
        coaches: false,
        clubs: false,
        partners: false,
        stateCommittees: false,
        admins: false
      },
      priority: 'normal',
      sendImmediately: true,
      scheduledTime: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-600">registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-600">this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemStats.totalClubs}</div>
            <p className="text-xs text-gray-600">registered clubs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
            <MapPin className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{systemStats.totalCourts.toLocaleString()}</div>
            <p className="text-xs text-gray-600">available courts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${systemStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournaments</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalTournaments}</div>
            <p className="text-xs text-gray-600">this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</div>
            <p className="text-xs text-gray-600">reliability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{systemStats.pendingApprovals}</div>
            <p className="text-xs text-gray-600">awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Federations</CardTitle>
            <Globe className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemStats.activeFederations}</div>
            <p className="text-xs text-gray-600">state committees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total States</CardTitle>
            <MapPin className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemStats.totalStates}</div>
            <p className="text-xs text-gray-600">supported states</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selector and Messaging */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Label htmlFor="timeRange" className="text-sm font-medium">Time Range:</Label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
        
        <Button onClick={() => setShowMessaging(true)} className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Send System Message</span>
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent System Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Recent System Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSystemEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{event.type}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{event.timestamp}</span>
                      <span>•</span>
                      <span>{event.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Pending Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{action.type}</h4>
                      <Badge className={getPriorityColor(action.priority)}>
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{action.count}</div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Message Modal */}
      {showMessaging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send System Message</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMessaging(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={messageData.subject}
                  onChange={(e) => setMessageData({...messageData, subject: e.target.value})}
                  placeholder="Enter message subject"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  value={messageData.message}
                  onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Recipients</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(messageData.recipients).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => setMessageData({
                          ...messageData,
                          recipients: {
                            ...messageData.recipients,
                            [key]: e.target.checked
                          }
                        })}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={messageData.priority}
                    onChange={(e) => setMessageData({...messageData, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="sendTime">Send Time</Label>
                  <select
                    id="sendTime"
                    value={messageData.sendImmediately ? 'immediate' : 'scheduled'}
                    onChange={(e) => setMessageData({
                      ...messageData, 
                      sendImmediately: e.target.value === 'immediate'
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="immediate">Send Immediately</option>
                    <option value="scheduled">Schedule for Later</option>
                  </select>
                </div>
              </div>
              
              {!messageData.sendImmediately && (
                <div>
                  <Label htmlFor="scheduledTime">Scheduled Time</Label>
                  <Input
                    id="scheduledTime"
                    type="datetime-local"
                    value={messageData.scheduledTime}
                    onChange={(e) => setMessageData({...messageData, scheduledTime: e.target.value})}
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowMessaging(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage} className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview; 