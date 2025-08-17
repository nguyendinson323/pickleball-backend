import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
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
  Globe,
  FileText,
  BarChart3,
  Edit3,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  QrCode,
  Image,
  Palette,
  Shield,
  BookOpen,
  Users2,
  MapPinOff,
  TrendingDown,
  Send,
  Bell
} from 'lucide-react';

const StateDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Tournament management data
  const tournaments = [
    {
      id: 1,
      name: 'State Championship 2024',
      date: '2024-06-15',
      location: 'State Sports Complex',
      participants: 128,
      maxParticipants: 256,
      entryFee: 85,
      status: 'Registration Open',
      category: 'Championship',
      revenue: 10880
    },
    {
      id: 2,
      name: 'Spring League Finals',
      date: '2024-05-20',
      location: 'Metro Courts',
      participants: 64,
      maxParticipants: 64,
      entryFee: 65,
      status: 'Full',
      category: 'League',
      revenue: 4160
    },
    {
      id: 3,
      name: 'Youth Development Cup',
      date: '2024-07-10',
      location: 'Community Center',
      participants: 32,
      maxParticipants: 48,
      entryFee: 45,
      status: 'Registration Open',
      category: 'Youth',
      revenue: 1440
    }
  ];

  // Club affiliation data
  const clubAffiliations = [
    {
      id: 1,
      name: 'Elite Pickleball Club',
      city: 'Guadalajara',
      members: 156,
      status: 'Active',
      complianceScore: 95,
      lastInspection: '2024-02-15',
      nextInspection: '2024-05-15',
      issues: 0
    },
    {
      id: 2,
      name: 'Metro Sports Center',
      city: 'Zapopan',
      members: 89,
      status: 'Active',
      complianceScore: 87,
      lastInspection: '2024-01-20',
      nextInspection: '2024-04-20',
      issues: 2
    },
    {
      id: 3,
      name: 'Community Courts',
      city: 'Tlaquepaque',
      members: 67,
      status: 'Pending Review',
      complianceScore: 72,
      lastInspection: '2024-03-01',
      nextInspection: '2024-06-01',
      issues: 3
    }
  ];

  // Member verification data
  const memberVerifications = [
    {
      id: 1,
      name: 'Sarah M.',
      type: 'Player',
      club: 'Elite Pickleball Club',
      submitted: '2024-03-20',
      status: 'Verified',
      documents: ['ID Card', 'Skill Assessment'],
      verifiedBy: 'Coach Johnson',
      verifiedDate: '2024-03-22'
    },
    {
      id: 2,
      name: 'Mike R.',
      type: 'Coach',
      club: 'Pro Training Center',
      submitted: '2024-03-18',
      status: 'Pending',
      documents: ['Coaching Certificate', 'Background Check'],
      verifiedBy: null,
      verifiedDate: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      type: 'Player',
      club: 'Community Courts',
      submitted: '2024-03-15',
      status: 'Rejected',
      documents: ['ID Card'],
      verifiedBy: 'Admin Smith',
      verifiedDate: '2024-03-17',
      rejectionReason: 'Incomplete skill assessment'
    }
  ];

  // State microsite configuration data
  const micrositeConfig = {
    stateName: 'Jalisco State Pickleball Federation',
    description: 'Official state representative for Jalisco Pickleball Federation with authority to organize state-level tournaments',
    logo: 'https://example.com/jalisco-logo.png',
    bannerImage: 'https://example.com/jalisco-banner.jpg',
    contactInfo: {
      phone: '+52-33-1234-5678',
      email: 'jalisco@pickleballfederation.mx',
      address: 'Av. Juárez 1234, Guadalajara, Jalisco',
      website: 'https://www.jalisco-pickleball.mx'
    },
    socialMedia: {
      facebook: 'https://facebook.com/jalisco-pickleball',
      instagram: 'https://instagram.com/jalisco-pickleball',
      twitter: 'https://twitter.com/jalisco-pickleball'
    },
    features: {
      tournaments: true,
      training: true,
      rankings: true,
      news: true
    }
  };

  // Performance analytics data
  const performanceData = {
    memberGrowth: {
      thisYear: 1247,
      lastYear: 1100,
      growth: 13.4
    },
    revenueGrowth: {
      thisYear: 45600,
      lastYear: 42000,
      growth: 8.6
    },
    tournamentGrowth: {
      thisYear: 23,
      lastYear: 18,
      growth: 27.8
    },
    monthlyTrends: [
      { month: 'Jan', members: 1180, revenue: 4200 },
      { month: 'Feb', members: 1200, revenue: 4400 },
      { month: 'Mar', members: 1247, revenue: 4560 },
      { month: 'Apr', members: 0, revenue: 0 }
    ]
  };

  // Helper functions
  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case 'Registration Open': return 'bg-green-100 text-green-800';
      case 'Full': return 'bg-blue-100 text-blue-800';
      case 'Registration Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClubStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTournamentAction = (tournamentId: number, action: string) => {
    console.log(`${action} tournament ${tournamentId}`);
    // In real app, this would perform the action
  };

  const handleClubAction = (clubId: number, action: string) => {
    console.log(`${action} club ${clubId}`);
    // In real app, this would perform the action
  };

  const handleVerificationAction = (verificationId: number, action: string) => {
    console.log(`${action} verification ${verificationId}`);
    // In real app, this would perform the action
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

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

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="clubs">Club Management</TabsTrigger>
              <TabsTrigger value="verifications">Verifications</TabsTrigger>
              <TabsTrigger value="microsite">Microsite</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
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
                        onClick={() => {
                          if (action.name === 'Add New Member') setActiveTab('verifications');
                          else if (action.name === 'Manage Courts') setActiveTab('clubs');
                          else if (action.name === 'Create Announcement') setActiveTab('communications');
                          else if (action.name === 'View Statistics') setActiveTab('analytics');
                          else window.location.href = action.href;
                        }}
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
            </TabsContent>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>Tournament Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Organize State-Level Tournaments</h3>
                      <Button onClick={() => handleTournamentAction(0, 'create')}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Tournament
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tournament</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Entry Fee</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournaments.map((tournament) => (
                          <TableRow key={tournament.id}>
                            <TableCell className="font-medium">{tournament.name}</TableCell>
                            <TableCell>{tournament.date}</TableCell>
                            <TableCell>{tournament.location}</TableCell>
                            <TableCell>
                              {tournament.participants}/{tournament.maxParticipants}
                            </TableCell>
                            <TableCell>${tournament.entryFee}</TableCell>
                            <TableCell>
                              <Badge className={getTournamentStatusColor(tournament.status)}>
                                {tournament.status}
                              </Badge>
                            </TableCell>
                            <TableCell>${tournament.revenue}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleTournamentAction(tournament.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleTournamentAction(tournament.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => generateReport(`tournament-${tournament.id}`)}
                                >
                                  <BarChart3 className="h-4 w-4 mr-1" />
                                  Report
                                </Button>
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

            {/* Club Management Tab */}
            <TabsContent value="clubs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-green-500" />
                    <span>Club Affiliation Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Monitor and Manage Club Memberships</h3>
                      <Button onClick={() => handleClubAction(0, 'add')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Club
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Club Name</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Compliance Score</TableHead>
                          <TableHead>Last Inspection</TableHead>
                          <TableHead>Next Inspection</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clubAffiliations.map((club) => (
                          <TableRow key={club.id}>
                            <TableCell className="font-medium">{club.name}</TableCell>
                            <TableCell>{club.city}</TableCell>
                            <TableCell>{club.members}</TableCell>
                            <TableCell>
                              <Badge className={getClubStatusColor(club.status)}>
                                {club.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      club.complianceScore >= 90 ? 'bg-green-500' :
                                      club.complianceScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${club.complianceScore}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{club.complianceScore}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{club.lastInspection}</TableCell>
                            <TableCell>{club.nextInspection}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleClubAction(club.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleClubAction(club.id, 'inspect')}
                                >
                                  <Shield className="h-4 w-4 mr-1" />
                                  Inspect
                                </Button>
                                {club.issues > 0 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleClubAction(club.id, 'resolve')}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    Resolve
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

            {/* Verifications Tab */}
            <TabsContent value="verifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span>Member Verification System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Verify Player Credentials and Manage Status</h3>
                      <Button onClick={() => handleVerificationAction(0, 'add')}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Verification
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Member</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Club</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Documents</TableHead>
                          <TableHead>Verified By</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {memberVerifications.map((verification) => (
                          <TableRow key={verification.id}>
                            <TableCell className="font-medium">{verification.name}</TableCell>
                            <TableCell>
                              <Badge variant={
                                verification.type === 'Player' ? 'default' : 'secondary'
                              }>
                                {verification.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{verification.club}</TableCell>
                            <TableCell>{verification.submitted}</TableCell>
                            <TableCell>
                              <Badge className={getVerificationStatusColor(verification.status)}>
                                {verification.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600">
                                {verification.documents.join(', ')}
                              </div>
                            </TableCell>
                            <TableCell>
                              {verification.verifiedBy || '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleVerificationAction(verification.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                {verification.status === 'Pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleVerificationAction(verification.id, 'approve')}
                                      className="text-green-600 hover:text-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleVerificationAction(verification.id, 'reject')}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </>
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

            {/* Microsite Tab */}
            <TabsContent value="microsite" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span>State Microsite Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Configure Your State's Public Microsite</h3>
                      <Button onClick={() => handleTournamentAction(0, 'preview')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Site
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Basic Information</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="stateName">State Federation Name</Label>
                            <Input
                              id="stateName"
                              value={micrositeConfig.stateName}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={micrositeConfig.description}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={micrositeConfig.contactInfo.website}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Contact Information</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={micrositeConfig.contactInfo.phone}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={micrositeConfig.contactInfo.email}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              value={micrositeConfig.contactInfo.address}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Media Upload */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Media & Branding</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label>State Logo</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Upload your state logo</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              <Plus className="h-4 w-4 mr-2" />
                              Upload Logo
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label>Banner Image</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Upload banner image</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              <Plus className="h-4 w-4 mr-2" />
                              Upload Banner
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features & Services */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Features & Services</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tournaments" checked={micrositeConfig.features.tournaments} />
                          <Label htmlFor="tournaments">Tournaments</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="training" checked={micrositeConfig.features.training} />
                          <Label htmlFor="training">Training Programs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="rankings" checked={micrositeConfig.features.rankings} />
                          <Label htmlFor="rankings">Rankings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="news" checked={micrositeConfig.features.news} />
                          <Label htmlFor="news">News & Updates</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    <span>Performance Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Track State Federation Performance and Growth</h3>
                      <Button onClick={() => generateReport('performance')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    
                    {/* Growth Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Member Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">{performanceData.memberGrowth.thisYear}</div>
                          <div className="text-sm text-gray-600">
                            {performanceData.memberGrowth.growth > 0 ? (
                              <span className="text-green-600">↗ +{performanceData.memberGrowth.growth}%</span>
                            ) : (
                              <span className="text-red-600">↘ {performanceData.memberGrowth.growth}%</span>
                            )} vs last year
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">${performanceData.revenueGrowth.thisYear.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">
                            {performanceData.revenueGrowth.growth > 0 ? (
                              <span className="text-green-600">↗ +{performanceData.revenueGrowth.growth}%</span>
                            ) : (
                              <span className="text-red-600">↘ {performanceData.revenueGrowth.growth}%</span>
                            )} vs last year
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Tournament Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">{performanceData.tournamentGrowth.thisYear}</div>
                          <div className="text-sm text-gray-600">
                            {performanceData.tournamentGrowth.growth > 0 ? (
                              <span className="text-green-600">↗ +{performanceData.tournamentGrowth.growth}%</span>
                            ) : (
                              <span className="text-red-600">↘ {performanceData.tournamentGrowth.growth}%</span>
                            )} vs last year
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Monthly Trends */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Monthly Member Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {performanceData.monthlyTrends.map((month) => (
                              <div key={month.month} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{month.month}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full" 
                                      style={{ width: `${(month.members / 1247) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">{month.members}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Monthly Revenue Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {performanceData.monthlyTrends.map((month) => (
                              <div key={month.month} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{month.month}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${(month.revenue / 4560) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">${month.revenue}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communications Tab */}
            <TabsContent value="communications" className="mt-6">
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
                      <Button onClick={() => handleTournamentAction(0, 'announcement')}>
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
                                    onClick={() => handleTournamentAction(announcement.id, 'view')}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleTournamentAction(announcement.id, 'edit')}
                                  >
                                    <Edit3 className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleTournamentAction(announcement.id, 'resend')}
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
            </TabsContent>
          </Tabs>
        </div>

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