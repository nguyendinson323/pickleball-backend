import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Building2, 
  Award,
  TrendingUp,
  Star,
  Settings,
  Activity,
  DollarSign,
  Plus
} from 'lucide-react';

// Import dashboard components
import Overview from './Overview';
import CourtRental from './CourtRental';
import Tournaments from './Tournaments';
import Invoices from './Invoices';
import Microsite from './Microsite';
import Reports from './Reports';
import Members from './Members';

const ClubDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourt, setSelectedCourt] = useState('all');

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
      email: 'sarah.m@email.com',
      phone: '+52-33-1234-5678',
      type: 'Premium' as const,
      status: 'Active' as const,
      joinDate: '2024-03-20',
      lastVisit: '2024-03-25',
      totalVisits: 45,
      photo: null,
      membershipExpiry: '2025-03-20',
      emergencyContact: 'John M. - +52-33-1234-5679',
      notes: 'Excellent player, interested in tournaments'
    },
    {
      id: 2,
      name: 'Mike R.',
      email: 'mike.r@email.com',
      phone: '+52-33-1234-5680',
      type: 'Basic' as const,
      status: 'Active' as const,
      joinDate: '2024-03-18',
      lastVisit: '2024-03-24',
      totalVisits: 23,
      photo: null,
      membershipExpiry: '2025-03-18',
      emergencyContact: 'Lisa R. - +52-33-1234-5681',
      notes: 'New member, learning the game'
    },
    {
      id: 3,
      name: 'Lisa K.',
      email: 'lisa.k@email.com',
      phone: '+52-33-1234-5682',
      type: 'Premium' as const,
      status: 'Active' as const,
      joinDate: '2024-03-15',
      lastVisit: '2024-03-25',
      totalVisits: 67,
      photo: null,
      membershipExpiry: '2025-03-15',
      emergencyContact: 'David K. - +52-33-1234-5683',
      notes: 'Advanced player, club champion 2023'
    },
    {
      id: 4,
      name: 'Carlos R.',
      email: 'carlos.r@email.com',
      phone: '+52-33-1234-5684',
      type: 'VIP' as const,
      status: 'Active' as const,
      joinDate: '2024-02-15',
      lastVisit: '2024-03-25',
      totalVisits: 89,
      photo: null,
      membershipExpiry: '2025-02-15',
      emergencyContact: 'Maria R. - +52-33-1234-5685',
      notes: 'VIP member, premium court access'
    },
    {
      id: 5,
      name: 'Ana M.',
      email: 'ana.m@email.com',
      phone: '+52-33-1234-5686',
      type: 'Basic' as const,
      status: 'Active' as const,
      joinDate: '2024-03-10',
      lastVisit: '2024-03-23',
      totalVisits: 12,
      photo: null,
      membershipExpiry: '2025-03-10',
      emergencyContact: 'Jose M. - +52-33-1234-5687',
      notes: 'Beginner player, taking lessons'
    }
  ];

  // Court rental data
  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  const courtBookings = {
    'Court 1': {
      '6:00 AM': { status: 'available', price: 25 },
      '7:00 AM': { status: 'booked', price: 25, player: 'John D.' },
      '8:00 AM': { status: 'available', price: 25 },
      '9:00 AM': { status: 'booked', price: 30, player: 'Sarah M.' },
      '10:00 AM': { status: 'available', price: 30 },
      '11:00 AM': { status: 'available', price: 30 },
      '12:00 PM': { status: 'booked', price: 35, player: 'Mike R.' },
      '1:00 PM': { status: 'available', price: 35 },
      '2:00 PM': { status: 'available', price: 35 },
      '3:00 PM': { status: 'booked', price: 30, player: 'Lisa K.' },
      '4:00 PM': { status: 'available', price: 30 },
      '5:00 PM': { status: 'available', price: 30 },
      '6:00 PM': { status: 'booked', price: 35, player: 'Carlos R.' },
      '7:00 PM': { status: 'booked', price: 35, player: 'Ana M.' },
      '8:00 PM': { status: 'available', price: 30 },
      '9:00 PM': { status: 'available', price: 25 },
      '10:00 PM': { status: 'available', price: 20 }
    },
    'Court 2': {
      '6:00 AM': { status: 'available', price: 25 },
      '7:00 AM': { status: 'available', price: 25 },
      '8:00 AM': { status: 'booked', price: 25, player: 'David L.' },
      '9:00 AM': { status: 'available', price: 30 },
      '10:00 AM': { status: 'booked', price: 30, player: 'Emma S.' },
      '11:00 AM': { status: 'available', price: 30 },
      '12:00 PM': { status: 'available', price: 35 },
      '1:00 PM': { status: 'booked', price: 35, player: 'Robert K.' },
      '2:00 PM': { status: 'booked', price: 35, player: 'Maria G.' },
      '3:00 PM': { status: 'available', price: 30 },
      '4:00 PM': { status: 'available', price: 30 },
      '5:00 PM': { status: 'booked', price: 30, player: 'Tom H.' },
      '6:00 PM': { status: 'available', price: 35 },
      '7:00 PM': { status: 'available', price: 35 },
      '8:00 PM': { status: 'available', price: 30 },
      '9:00 PM': { status: 'available', price: 25 },
      '10:00 PM': { status: 'available', price: 20 }
    }
  };

  // Tournament management data
  const tournaments = [
    {
      id: 1,
      name: 'Spring Championship Tournament',
      date: '2024-04-20',
      participants: 48,
      maxParticipants: 64,
      entryFee: 75,
      totalRevenue: 3600,
      expenses: 1200,
      profit: 2400,
      status: 'Registration Open'
    },
    {
      id: 2,
      name: 'Summer League Finals',
      date: '2024-06-15',
      participants: 32,
      maxParticipants: 32,
      entryFee: 50,
      totalRevenue: 1600,
      expenses: 800,
      profit: 800,
      status: 'Full'
    },
    {
      id: 3,
      name: 'Fall Classic',
      date: '2024-09-28',
      participants: 0,
      maxParticipants: 48,
      entryFee: 60,
      totalRevenue: 0,
      expenses: 0,
      profit: 0,
      status: 'Planning'
    }
  ];

  // Invoice and payment data
  const invoices = [
    {
      id: 'INV-001',
      member: 'Sarah M.',
      type: 'Membership Renewal',
      amount: 120,
      status: 'Paid',
      dueDate: '2024-03-15',
      paidDate: '2024-03-14'
    },
    {
      id: 'INV-002',
      member: 'Mike R.',
      type: 'Court Rental',
      amount: 35,
      status: 'Paid',
      dueDate: '2024-03-20',
      paidDate: '2024-03-20'
    },
    {
      id: 'INV-003',
      member: 'Lisa K.',
      type: 'Tournament Registration',
      amount: 75,
      status: 'Pending',
      dueDate: '2024-04-01',
      paidDate: null
    },
    {
      id: 'INV-004',
      member: 'John D.',
      type: 'Court Rental',
      amount: 25,
      status: 'Overdue',
      dueDate: '2024-03-10',
      paidDate: null
    }
  ];

  // Club microsite configuration data
  const micrositeConfig = {
    clubName: 'Elite Pickleball Club',
    description: 'Premium pickleball facility with professional courts and training programs',
    logo: 'https://example.com/logo.png',
    bannerImage: 'https://example.com/banner.jpg',
    contactInfo: {
      phone: '+52-33-1234-5678',
      email: 'info@elitepickleball.com',
      address: 'Av. Vallarta 1234, Guadalajara, Jalisco',
      website: 'https://www.elitepickleball.com'
    },
    socialMedia: {
      facebook: 'https://facebook.com/elitepickleball',
      instagram: 'https://instagram.com/elitepickleball',
      twitter: 'https://twitter.com/elitepickleball'
    },
    features: {
      courts: 8,
      training: true,
      tournaments: true,
      equipment: true,
      proShop: true
    }
  };

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

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courts">Court Rental</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="microsite">Microsite</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <Overview clubStats={clubStats} courtStatus={courtStatus} />
            </TabsContent>

            {/* Court Rental Tab */}
            <TabsContent value="courts" className="mt-6">
              <CourtRental
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedCourt={selectedCourt}
                setSelectedCourt={setSelectedCourt}
                timeSlots={timeSlots}
                courtBookings={courtBookings}
              />
            </TabsContent>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="mt-6">
              <Tournaments tournaments={tournaments} />
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="mt-6">
              <Invoices invoices={invoices} />
            </TabsContent>

            {/* Microsite Tab */}
            <TabsContent value="microsite" className="mt-6">
              <Microsite micrositeConfig={micrositeConfig} />
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-6">
              <Reports />
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="mt-6">
              <Members members={recentMembers} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Upcoming Events & Recent Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Upcoming Events */}
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

          {/* Recent Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recent Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMembers.slice(0, 3).map((member) => (
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
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('members')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All Members
                </Button>
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