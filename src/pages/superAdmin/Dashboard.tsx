import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
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
  X,
  QrCode,
  FileText,
  BarChart3,
  Monitor,
  Globe2,
  Edit3,
  Eye,
  EyeOff,
  Download,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [timeRange, setTimeRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Messaging state
  const [showMessaging, setShowMessaging] = useState(false);
  const [messageData, setMessageData] = useState({
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
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    sendImmediately: true,
    scheduledTime: ''
  });

  // Mock system-wide data
  const systemStats = {
    totalUsers: 15420,
    activeUsers: 14230,
    totalClubs: 456,
    totalCourts: 2340,
    totalTournaments: 189,
    monthlyRevenue: 234500,
    systemUptime: 99.97,
    pendingApprovals: 23,
    activeFederations: 12,
    totalStates: 50
  };

  const recentSystemEvents = [
    {
      id: 1,
      type: 'User Registration',
      description: 'New user registration from California',
      timestamp: '2024-03-25 10:30 AM',
      severity: 'Info',
      user: 'john.doe@email.com'
    },
    {
      id: 2,
      type: 'Club Approval',
      description: 'Elite Pickleball Club approved',
      timestamp: '2024-03-25 09:15 AM',
      severity: 'Success',
      user: 'admin@eliteclub.com'
    },
    {
      id: 3,
      type: 'System Maintenance',
      description: 'Database optimization completed',
      timestamp: '2024-03-25 08:00 AM',
      severity: 'Info',
      user: 'system'
    },
    {
      id: 4,
      type: 'Payment Issue',
      description: 'Failed payment for user ID 12345',
      timestamp: '2024-03-25 07:45 AM',
      severity: 'Warning',
      user: 'user@example.com'
    }
  ];

  const pendingActions = [
    {
      id: 1,
      type: 'Club Approval',
      count: 8,
      description: 'Clubs awaiting approval',
      priority: 'Medium'
    },
    {
      id: 2,
      type: 'User Verification',
      count: 12,
      description: 'Users need verification',
      priority: 'High'
    },
    {
      id: 3,
      type: 'Payment Disputes',
      count: 3,
      description: 'Payment issues to resolve',
      priority: 'High'
    },
    {
      id: 4,
      type: 'Announcements',
      count: 5,
      description: 'Pending announcements to send',
      priority: 'Medium'
    }
  ];

  // Rankings management data
  const rankingIssues = [
    {
      id: 1,
      player: 'Maria González',
      currentRank: 45,
      requestedRank: 42,
      reason: 'Tournament performance improvement',
      status: 'pending',
      submitted: '2024-03-25'
    },
    {
      id: 2,
      player: 'Carlos Rodríguez',
      currentRank: 38,
      requestedRank: 35,
      reason: 'Recent tournament wins',
      status: 'approved',
      submitted: '2024-03-24'
    },
    {
      id: 3,
      player: 'Ana Martínez',
      currentRank: 52,
      requestedRank: 48,
      reason: 'Skill level assessment',
      status: 'rejected',
      submitted: '2024-03-23'
    }
  ];

  // Microsite management data
  const microsites = [
    {
      id: 1,
      name: 'Jalisco State Committee',
      type: 'state',
      status: 'active',
      lastUpdated: '2024-03-25',
      contentIssues: 0,
      needsReview: false
    },
    {
      id: 2,
      name: 'Elite Pickleball Club',
      type: 'club',
      status: 'active',
      lastUpdated: '2024-03-24',
      contentIssues: 2,
      needsReview: true
    },
    {
      id: 3,
      name: 'Monterrey Sports Center',
      type: 'partner',
      status: 'pending',
      lastUpdated: '2024-03-20',
      contentIssues: 1,
      needsReview: true
    }
  ];

  // Court performance data
  const courtPerformance = [
    {
      id: 1,
      courtName: 'Court A - Elite Club',
      club: 'Elite Pickleball Club',
      utilization: 85,
      revenue: 1250,
      issues: 0,
      rating: 4.8
    },
    {
      id: 2,
      courtName: 'Court B - Monterrey Club',
      club: 'Monterrey Pickleball Club',
      utilization: 72,
      revenue: 980,
      issues: 1,
      rating: 4.2
    },
    {
      id: 3,
      courtName: 'Court C - Zapopan Club',
      club: 'Zapopan Pickleball Club',
      utilization: 65,
      revenue: 750,
      issues: 2,
      rating: 3.9
    }
  ];

  // Affiliation reports data
  const affiliationStats = {
    clubs: {
      total: 456,
      active: 423,
      expired: 28,
      suspended: 5,
      notParticipated: 45
    },
    stateCommittees: {
      total: 50,
      active: 48,
      expired: 2,
      suspended: 0,
      notParticipated: 8
    },
    coaches: {
      total: 234,
      active: 218,
      expired: 12,
      suspended: 4,
      notParticipated: 23
    },
    partners: {
      total: 89,
      active: 82,
      expired: 5,
      suspended: 2,
      notParticipated: 12
    }
  };

  // Messaging functions
  const handleRecipientChange = (recipient: string, checked: boolean) => {
    setMessageData(prev => ({
      ...prev,
      recipients: {
        ...prev.recipients,
        [recipient]: checked
      }
    }));
  };

  const handleSendMessage = () => {
    const selectedRecipients = Object.entries(messageData.recipients)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => key);

    if (selectedRecipients.length === 0) {
      alert('Please select at least one recipient group');
      return;
    }

    if (!messageData.subject.trim() || !messageData.message.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    // Here you would typically send to API
    console.log('Sending announcement:', {
      ...messageData,
      recipients: selectedRecipients,
      timestamp: new Date().toISOString()
    });

    // Reset form and close
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
    setShowMessaging(false);
    
    alert('Announcement sent successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const quickActions = [
    {
      name: 'User Management',
      href: '/super-admin/users',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Club Management',
      href: '/super-admin/clubs',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      name: 'Court Management',
      href: '/super-admin/courts',
      icon: MapPin,
      color: 'bg-purple-500'
    },
    {
      name: 'Tournament Management',
      href: '/super-admin/tournaments',
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      name: 'Analytics',
      href: '/super-admin/analytics',
      icon: TrendingUp,
      color: 'bg-indigo-500'
    },
    {
      name: 'System Settings',
      href: '/super-admin/settings',
      icon: Settings,
      color: 'bg-gray-500'
    },
    {
      name: 'Send Announcements',
      href: '#',
      icon: MessageSquare,
      color: 'bg-red-500',
      onClick: () => setShowMessaging(true)
    },
    {
      name: 'Content Moderation',
      href: '/super-admin/content',
      icon: Shield,
      color: 'bg-orange-500'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Helper functions for new features
  const getRankingStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMicrositeStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMicrositeTypeColor = (type: string) => {
    switch (type) {
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'club': return 'bg-green-100 text-green-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRankingAction = (id: number, action: 'approve' | 'reject') => {
    console.log(`${action} ranking request ${id}`);
    // In real app, this would make an API call
  };

  const handleMicrositeAction = (id: number, action: 'review' | 'suspend' | 'activate') => {
    console.log(`${action} microsite ${id}`);
    // In real app, this would make an API call
  };

  const generateCSVReport = (type: string) => {
    console.log(`Generating CSV report for ${type}`);
    // In real app, this would generate and download a CSV file
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'Super Admin'}!
          </h1>
          <p className="text-gray-600">System-wide overview and performance metrics</p>
        </div>

        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
              <Building2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemStats.totalClubs}</div>
              <p className="text-xs text-gray-600">affiliated clubs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Server className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{systemStats.systemUptime}%</div>
              <p className="text-xs text-gray-600">reliability</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${systemStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">across all users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rankings">Rankings</TabsTrigger>
              <TabsTrigger value="microsites">Microsites</TabsTrigger>
              <TabsTrigger value="courts">Court Monitor</TabsTrigger>
              <TabsTrigger value="affiliations">Affiliations</TabsTrigger>
              <TabsTrigger value="messaging">Messaging</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
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
                        onClick={action.onClick || (() => window.location.href = action.href)}
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

              {/* Pending Actions and System Events */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Pending Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <span>Pending Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingActions.map((action) => (
                        <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{action.type}</h4>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{action.count}</div>
                            <Badge className={getPriorityColor(action.priority)}>
                              {action.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* System Events */}
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
                        <div key={event.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{event.type}</h4>
                            <Badge className={getSeverityColor(event.severity)}>
                              {event.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{event.timestamp}</span>
                            <span>{event.user}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Target className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers.toLocaleString()}</div>
                    <p className="text-xs text-gray-600">currently active</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
                    <MapPin className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{systemStats.totalCourts.toLocaleString()}</div>
                    <p className="text-xs text-gray-600">available courts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tournaments</CardTitle>
                    <Award className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{systemStats.totalTournaments}</div>
                    <p className="text-xs text-gray-600">this year</p>
                  </CardContent>
                </Card>
              </div>

              {/* Federation Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span>Federation Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{systemStats.activeFederations}</div>
                      <p className="text-gray-600">Active Federations</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{systemStats.totalStates}</div>
                      <p className="text-gray-600">States Covered</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{systemStats.pendingApprovals}</div>
                      <p className="text-gray-600">Pending Approvals</p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-gray-600">System covering all major pickleball communities across the nation</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rankings Management Tab */}
            <TabsContent value="rankings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>Rankings Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Ranking Change Requests</h3>
                      <Button variant="outline" onClick={() => generateCSVReport('rankings')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Current Rank</TableHead>
                          <TableHead>Requested Rank</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rankingIssues.map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-medium">{issue.player}</TableCell>
                            <TableCell>#{issue.currentRank}</TableCell>
                            <TableCell>#{issue.requestedRank}</TableCell>
                            <TableCell>{issue.reason}</TableCell>
                            <TableCell>
                              <Badge className={getRankingStatusColor(issue.status)}>
                                {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{issue.submitted}</TableCell>
                            <TableCell>
                              {issue.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRankingAction(issue.id, 'approve')}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRankingAction(issue.id, 'reject')}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Microsite Management Tab */}
            <TabsContent value="microsites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe2 className="h-5 w-5 text-blue-500" />
                    <span>Microsite Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">State Committee & Club Microsites</h3>
                      <Button variant="outline" onClick={() => generateCSVReport('microsites')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Content Issues</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {microsites.map((site) => (
                          <TableRow key={site.id}>
                            <TableCell className="font-medium">{site.name}</TableCell>
                            <TableCell>
                              <Badge className={getMicrositeTypeColor(site.type)}>
                                {site.type.charAt(0).toUpperCase() + site.type.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getMicrositeStatusColor(site.status)}>
                                {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{site.lastUpdated}</TableCell>
                            <TableCell>
                              {site.contentIssues > 0 ? (
                                <Badge variant="destructive">{site.contentIssues} issues</Badge>
                              ) : (
                                <Badge variant="secondary">No issues</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMicrositeAction(site.id, 'review')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                                {site.status === 'active' ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMicrositeAction(site.id, 'suspend')}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Suspend
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMicrositeAction(site.id, 'activate')}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Activate
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Court Monitoring Tab */}
            <TabsContent value="courts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5 text-purple-500" />
                    <span>Court Performance Monitoring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Court Activity & Performance</h3>
                      <Button variant="outline" onClick={() => generateCSVReport('courts')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Court</TableHead>
                          <TableHead>Club</TableHead>
                          <TableHead>Utilization %</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Issues</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courtPerformance.map((court) => (
                          <TableRow key={court.id}>
                            <TableCell className="font-medium">{court.courtName}</TableCell>
                            <TableCell>{court.club}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${court.utilization}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{court.utilization}%</span>
                              </div>
                            </TableCell>
                            <TableCell>${court.revenue}</TableCell>
                            <TableCell>
                              {court.issues > 0 ? (
                                <Badge variant="destructive">{court.issues} issues</Badge>
                              ) : (
                                <Badge variant="secondary">No issues</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span>{court.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                <BarChart3 className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Affiliations Tab */}
            <TabsContent value="affiliations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span>Affiliation Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Membership & Participation Reports</h3>
                      <Button variant="outline" onClick={() => generateCSVReport('all')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export All Reports
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Clubs */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Clubs</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total</span>
                              <span className="font-bold">{affiliationStats.clubs.total}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Active</span>
                              <span className="text-green-600 font-bold">{affiliationStats.clubs.active}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Expired</span>
                              <span className="text-yellow-600 font-bold">{affiliationStats.clubs.expired}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Suspended</span>
                              <span className="text-red-600 font-bold">{affiliationStats.clubs.suspended}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">No Participation</span>
                              <span className="text-orange-600 font-bold">{affiliationStats.clubs.notParticipated}</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => generateCSVReport('clubs')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                          </Button>
                        </CardContent>
                      </Card>

                      {/* State Committees */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">State Committees</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total</span>
                              <span className="font-bold">{affiliationStats.stateCommittees.total}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Active</span>
                              <span className="text-green-600 font-bold">{affiliationStats.stateCommittees.active}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Expired</span>
                              <span className="text-yellow-600 font-bold">{affiliationStats.stateCommittees.expired}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Suspended</span>
                              <span className="text-red-600 font-bold">{affiliationStats.stateCommittees.suspended}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">No Participation</span>
                              <span className="text-orange-600 font-bold">{affiliationStats.stateCommittees.notParticipated}</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => generateCSVReport('stateCommittees')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Coaches */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total</span>
                              <span className="font-bold">{affiliationStats.coaches.total}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Active</span>
                              <span className="text-green-600 font-bold">{affiliationStats.coaches.active}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Expired</span>
                              <span className="text-yellow-600 font-bold">{affiliationStats.coaches.expired}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Suspended</span>
                              <span className="text-red-600 font-bold">{affiliationStats.coaches.suspended}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">No Participation</span>
                              <span className="text-orange-600 font-bold">{affiliationStats.coaches.notParticipated}</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => generateCSVReport('coaches')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Partners */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Partners</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total</span>
                              <span className="font-bold">{affiliationStats.partners.total}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Active</span>
                              <span className="text-green-600 font-bold">{affiliationStats.partners.active}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Expired</span>
                              <span className="text-yellow-600 font-bold">{affiliationStats.partners.expired}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Suspended</span>
                              <span className="text-red-600 font-bold">{affiliationStats.partners.suspended}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">No Participation</span>
                              <span className="text-orange-600 font-bold">{affiliationStats.partners.notParticipated}</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => generateCSVReport('partners')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messaging Tab */}
            <TabsContent value="messaging" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-red-500" />
                    <span>Announcement Center</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Send Announcements to All Users</h3>
                      <Button onClick={() => setShowMessaging(true)}>
                        <Send className="h-4 w-4 mr-2" />
                        New Announcement
                      </Button>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-blue-800">
                          <p className="font-medium">Announcement System</p>
                          <p className="text-sm mt-1">
                            Send important announcements to players, coaches, clubs, partners, and state committees. 
                            You can schedule messages for later or send them immediately. All announcements are logged 
                            and can be tracked for delivery status.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Recipients</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">5</div>
                        <div className="text-sm text-gray-600">Pending Announcements</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>


      </div>

      {/* Messaging Modal */}
      {showMessaging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-red-500" />
                <span>Send Announcement</span>
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMessaging(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={messageData.subject}
                  onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter announcement subject..."
                  className="mt-1"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={messageData.message}
                  onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your announcement message..."
                  rows={6}
                  className="mt-1"
                />
              </div>

              {/* Recipients */}
              <div>
                <Label className="text-base font-medium mb-3 block">Recipients *</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="players"
                      checked={messageData.recipients.players}
                      onCheckedChange={(checked) => handleRecipientChange('players', checked as boolean)}
                    />
                    <Label htmlFor="players">Players ({systemStats.totalUsers.toLocaleString()})</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="coaches"
                      checked={messageData.recipients.coaches}
                      onCheckedChange={(checked) => handleRecipientChange('coaches', checked as boolean)}
                    />
                    <Label htmlFor="coaches">Coaches</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clubs"
                      checked={messageData.recipients.clubs}
                      onCheckedChange={(checked) => handleRecipientChange('clubs', checked as boolean)}
                    />
                    <Label htmlFor="clubs">Clubs ({systemStats.totalClubs})</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partners"
                      checked={messageData.recipients.partners}
                      onCheckedChange={(checked) => handleRecipientChange('partners', checked as boolean)}
                    />
                    <Label htmlFor="partners">Partners</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stateCommittees"
                      checked={messageData.recipients.stateCommittees}
                      onCheckedChange={(checked) => handleRecipientChange('stateCommittees', checked as boolean)}
                    />
                    <Label htmlFor="stateCommittees">State Committees ({systemStats.totalStates})</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admins"
                      checked={messageData.recipients.admins}
                      onCheckedChange={(checked) => handleRecipientChange('admins', checked as boolean)}
                    />
                    <Label htmlFor="admins">Administrators</Label>
                  </div>
                </div>
              </div>

              {/* Priority and Timing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={messageData.priority}
                    onValueChange={(value) => setMessageData(prev => ({ ...prev, priority: value as any }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timing">Timing</Label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sendImmediately"
                        checked={messageData.sendImmediately}
                        onCheckedChange={(checked) => setMessageData(prev => ({ 
                          ...prev, 
                          sendImmediately: checked as boolean,
                          scheduledTime: checked ? '' : prev.scheduledTime
                        }))}
                      />
                      <Label htmlFor="sendImmediately">Send immediately</Label>
                    </div>
                    {!messageData.sendImmediately && (
                      <Input
                        type="datetime-local"
                        value={messageData.scheduledTime}
                        onChange={(e) => setMessageData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                        className="mt-1"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowMessaging(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard; 