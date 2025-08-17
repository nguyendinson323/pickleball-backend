import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
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
  Activity,
  DollarSign,
  FileText,
  BarChart3,
  Globe2,
  Edit3,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  CreditCard,
  Receipt,
  QrCode,
  Image,
  Palette,
  Send,
  Bell
} from 'lucide-react';

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

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'booked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCourtBooking = (court: string, time: string) => {
    console.log(`Booking ${court} at ${time}`);
    // In real app, this would open a booking modal
  };

  const handleInvoiceAction = (invoiceId: string, action: string) => {
    console.log(`${action} invoice ${invoiceId}`);
    // In real app, this would perform the action
  };

  const handleTournamentAction = (tournamentId: number, action: string) => {
    console.log(`${action} tournament ${tournamentId}`);
    // In real app, this would perform the action
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courts">Court Rental</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="microsite">Microsite</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
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
            </TabsContent>

            {/* Court Rental Tab */}
            <TabsContent value="courts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span>Court Rental & Booking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Date and Court Selection */}
                    <div className="flex space-x-4">
                      <div>
                        <Label htmlFor="date">Select Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="court">Select Court</Label>
                        <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                          <SelectTrigger className="mt-1 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Courts</SelectItem>
                            <SelectItem value="Court 1">Court 1</SelectItem>
                            <SelectItem value="Court 2">Court 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Court Availability Calendar */}
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Time</TableHead>
                            {Object.keys(courtBookings).map(court => (
                              <TableHead key={court}>{court}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {timeSlots.map(time => (
                            <TableRow key={time}>
                              <TableCell className="font-medium">{time}</TableCell>
                              {Object.keys(courtBookings).map(court => {
                                const booking = courtBookings[court as keyof typeof courtBookings][time];
                                return (
                                  <TableCell key={court}>
                                    {booking ? (
                                      <div className={`p-2 rounded border ${getBookingStatusColor(booking.status)}`}>
                                        <div className="text-center">
                                          <div className="font-medium">
                                            {booking.status === 'available' ? 'Available' : 'Booked'}
                                          </div>
                                          <div className="text-sm">${booking.price}</div>
                                          {booking.status === 'booked' && (
                                            <div className="text-xs text-gray-600">{booking.player}</div>
                                          )}
                                          {booking.status === 'available' && (
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              className="mt-1 w-full"
                                              onClick={() => handleCourtBooking(court, time)}
                                            >
                                              Book
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="p-2 text-center text-gray-400">-</div>
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
                      <h3 className="text-lg font-medium">Organize and Manage Tournaments</h3>
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
                          <TableHead>Participants</TableHead>
                          <TableHead>Entry Fee</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Expenses</TableHead>
                          <TableHead>Profit</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournaments.map((tournament) => (
                          <TableRow key={tournament.id}>
                            <TableCell className="font-medium">{tournament.name}</TableCell>
                            <TableCell>{tournament.date}</TableCell>
                            <TableCell>
                              {tournament.participants}/{tournament.maxParticipants}
                            </TableCell>
                            <TableCell>${tournament.entryFee}</TableCell>
                            <TableCell>${tournament.totalRevenue}</TableCell>
                            <TableCell>${tournament.expenses}</TableCell>
                            <TableCell>
                              <span className={`font-bold ${
                                tournament.profit > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                ${tournament.profit}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                tournament.status === 'Registration Open' ? 'default' :
                                tournament.status === 'Full' ? 'secondary' : 'outline'
                              }>
                                {tournament.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
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

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Receipt className="h-5 w-5 text-green-500" />
                    <span>Invoice & Payment Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Manage Invoices and Payments</h3>
                      <Button onClick={() => handleInvoiceAction('new', 'create')}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Invoice
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Member</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Paid Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.member}</TableCell>
                            <TableCell>{invoice.type}</TableCell>
                            <TableCell>${invoice.amount}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(invoice.status)}>
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>{invoice.paidDate || '-'}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleInvoiceAction(invoice.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                {invoice.status === 'Pending' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleInvoiceAction(invoice.id, 'send')}
                                  >
                                    <Send className="h-4 w-4 mr-1" />
                                    Send
                                  </Button>
                                )}
                                {invoice.status === 'Overdue' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleInvoiceAction(invoice.id, 'remind')}
                                  >
                                    <Bell className="h-4 w-4 mr-1" />
                                    Remind
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

            {/* Microsite Tab */}
            <TabsContent value="microsite" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe2 className="h-5 w-5 text-blue-500" />
                    <span>Club Microsite Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Configure Your Club's Public Microsite</h3>
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
                            <Label htmlFor="clubName">Club Name</Label>
                            <Input
                              id="clubName"
                              value={micrositeConfig.clubName}
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
                          <Label>Club Logo</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Upload your club logo</p>
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
                          <input type="checkbox" id="courts" checked={micrositeConfig.features.courts > 0} />
                          <Label htmlFor="courts">Courts ({micrositeConfig.features.courts})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="training" checked={micrositeConfig.features.training} />
                          <Label htmlFor="training">Training Programs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tournaments" checked={micrositeConfig.features.tournaments} />
                          <Label htmlFor="tournaments">Tournaments</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="equipment" checked={micrositeConfig.features.equipment} />
                          <Label htmlFor="equipment">Equipment Rental</Label>
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

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    <span>Reports & Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Generate Business Reports</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Court Usage Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Track court utilization, revenue, and booking patterns
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => generateReport('court-usage')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Financial Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Revenue, expenses, and profit analysis
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => generateReport('financial')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Member Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Member statistics and participation data
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => generateReport('members')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Tournament Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Tournament performance and financial data
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => generateReport('tournaments')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Invoice Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Payment status and outstanding invoices
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => generateReport('invoices')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Custom Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Create custom reports with specific criteria
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => generateReport('custom')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Create Report
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
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