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
  Bell,
  CreditCard,
  Receipt,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Zap
} from 'lucide-react';

const PartnerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourt, setSelectedCourt] = useState('all');

  // Mock partner data
  const partnerStats = {
    totalCourts: 12,
    activeCourts: 10,
    totalBookings: 156,
    monthlyRevenue: 12450,
    totalCustomers: 89,
    averageRating: 4.7,
    upcomingBookings: 8,
    maintenanceRequired: 2
  };

  const recentBookings = [
    {
      id: 1,
      customerName: 'Sarah M.',
      courtName: 'Court 1',
      date: '2024-03-25',
      time: '10:00 AM',
      duration: 2,
      status: 'Confirmed',
      amount: 45,
      paymentStatus: 'Paid',
      customerEmail: 'sarah@email.com'
    },
    {
      id: 2,
      customerName: 'Mike R.',
      courtName: 'Court 3',
      date: '2024-03-25',
      time: '2:00 PM',
      duration: 1.5,
      status: 'Confirmed',
      amount: 35,
      paymentStatus: 'Paid',
      customerEmail: 'mike@email.com'
    },
    {
      id: 3,
      customerName: 'Lisa K.',
      courtName: 'Court 2',
      date: '2024-03-26',
      time: '9:00 AM',
      duration: 2,
      status: 'Pending',
      amount: 45,
      paymentStatus: 'Pending',
      customerEmail: 'lisa@email.com'
    }
  ];

  const courtStatus = [
    { name: 'Court 1', status: 'Available', lastMaintenance: '2024-03-15', nextMaintenance: '2024-04-15', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 2', status: 'Occupied', lastMaintenance: '2024-03-10', nextMaintenance: '2024-04-10', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 3', status: 'Available', lastMaintenance: '2024-03-20', nextMaintenance: '2024-04-20', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 4', status: 'Maintenance', lastMaintenance: '2024-03-18', nextMaintenance: '2024-03-25', hourlyRate: 30, type: 'Outdoor' }
  ];

  const quickActions = [
    { name: 'Add New Court', icon: MapPin, href: '/partner/courts', color: 'bg-blue-500' },
    { name: 'View Bookings', icon: Calendar, href: '/partner/bookings', color: 'bg-green-500' },
    { name: 'Business Profile', icon: Building2, href: '/partner/profile', color: 'bg-purple-500' },
    { name: 'Analytics', icon: TrendingUp, href: '/partner/analytics', color: 'bg-orange-500' }
  ];

  // Court management data
  const allCourts = [
    ...courtStatus,
    { name: 'Court 5', status: 'Available', lastMaintenance: '2024-03-12', nextMaintenance: '2024-04-12', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 6', status: 'Available', lastMaintenance: '2024-03-14', nextMaintenance: '2024-04-14', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 7', status: 'Maintenance', lastMaintenance: '2024-03-22', nextMaintenance: '2024-03-29', hourlyRate: 30, type: 'Outdoor' },
    { name: 'Court 8', status: 'Available', lastMaintenance: '2024-03-16', nextMaintenance: '2024-04-16', hourlyRate: 30, type: 'Outdoor' }
  ];

  // Enhanced booking data
  const allBookings = [
    ...recentBookings,
    {
      id: 4,
      customerName: 'John D.',
      courtName: 'Court 4',
      date: '2024-03-26',
      time: '3:00 PM',
      duration: 1.5,
      status: 'Completed',
      amount: 35,
      paymentStatus: 'Paid',
      customerEmail: 'john@email.com'
    },
    {
      id: 5,
      customerName: 'Emma W.',
      courtName: 'Court 1',
      date: '2024-03-27',
      time: '11:00 AM',
      duration: 2,
      status: 'Confirmed',
      amount: 45,
      paymentStatus: 'Paid',
      customerEmail: 'emma@email.com'
    },
    {
      id: 6,
      customerName: 'David L.',
      courtName: 'Court 3',
      date: '2024-03-28',
      time: '4:00 PM',
      duration: 1,
      status: 'Pending',
      amount: 25,
      paymentStatus: 'Pending',
      customerEmail: 'david@email.com'
    }
  ];

  // Financial data
  const financialData = {
    thisMonth: 12450,
    lastMonth: 11200,
    thisYear: 125000,
    lastYear: 110000,
    monthlyBreakdown: [
      { month: 'Jan', revenue: 11000, bookings: 120 },
      { month: 'Feb', revenue: 11800, bookings: 135 },
      { month: 'Mar', revenue: 12450, bookings: 156 },
      { month: 'Apr', revenue: 0, bookings: 0 }
    ],
    revenueSources: {
      'Court Bookings': 75,
      'Equipment Rental': 15,
      'Training Programs': 10
    }
  };

  // Customer management data
  const customers = [
    {
      id: 1,
      name: 'Sarah M.',
      email: 'sarah@email.com',
      phone: '+1-555-0123',
      totalBookings: 15,
      totalSpent: 675,
      lastVisit: '2024-03-25',
      status: 'Active',
      rating: 5,
      feedback: 'Great courts and friendly staff!'
    },
    {
      id: 2,
      name: 'Mike R.',
      email: 'mike@email.com',
      phone: '+1-555-0124',
      totalBookings: 8,
      totalSpent: 320,
      lastVisit: '2024-03-25',
      status: 'Active',
      rating: 4,
      feedback: 'Courts are well-maintained'
    },
    {
      id: 3,
      name: 'Lisa K.',
      email: 'lisa@email.com',
      phone: '+1-555-0125',
      totalBookings: 22,
      totalSpent: 990,
      lastVisit: '2024-03-26',
      status: 'Active',
      rating: 5,
      feedback: 'Best pickleball facility in town!'
    }
  ];

  // Business microsite configuration data
  const micrositeConfig = {
    businessName: 'Elite Pickleball Courts',
    description: 'Premium indoor and outdoor pickleball courts with professional equipment and amenities',
    logo: 'https://example.com/elite-logo.png',
    bannerImage: 'https://example.com/elite-banner.jpg',
    contactInfo: {
      phone: '+1-555-0123',
      email: 'info@elitepickleball.com',
      address: '123 Sports Complex Dr, City, State 12345',
      website: 'https://www.elitepickleball.com'
    },
    socialMedia: {
      facebook: 'https://facebook.com/elitepickleball',
      instagram: 'https://instagram.com/elitepickleball',
      twitter: 'https://twitter.com/elitepickleball'
    },
    features: {
      courts: true,
      equipment: true,
      training: true,
      tournaments: true
    },
    amenities: [
      'Professional-grade courts',
      'Equipment rental',
      'Pro shop',
      'Locker rooms',
      'Parking'
    ]
  };

  // Maintenance schedule data
  const maintenanceSchedule = [
    {
      id: 1,
      courtName: 'Court 4',
      type: 'Scheduled',
      description: 'Regular surface maintenance',
      startDate: '2024-03-22',
      endDate: '2024-03-25',
      status: 'In Progress',
      technician: 'Mike Johnson',
      cost: 500
    },
    {
      id: 2,
      courtName: 'Court 7',
      type: 'Emergency',
      description: 'Net replacement and surface repair',
      startDate: '2024-03-22',
      endDate: '2024-03-29',
      status: 'In Progress',
      technician: 'Sarah Wilson',
      cost: 800
    },
    {
      id: 3,
      courtName: 'Court 1',
      type: 'Preventive',
      description: 'Surface cleaning and line repainting',
      startDate: '2024-04-15',
      endDate: '2024-04-16',
      status: 'Scheduled',
      technician: 'Mike Johnson',
      cost: 300
    }
  ];

  // Helper functions
  const getCourtStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCourtAction = (courtName: string, action: string) => {
    console.log(`${action} court ${courtName}`);
    // In real app, this would perform the action
  };

  const handleBookingAction = (bookingId: number, action: string) => {
    console.log(`${action} booking ${bookingId}`);
    // In real app, this would perform the action
  };

  const handleCustomerAction = (customerId: number, action: string) => {
    console.log(`${action} customer ${customerId}`);
    // In real app, this would perform the action
  };

  const handleMaintenanceAction = (maintenanceId: number, action: string) => {
    console.log(`${action} maintenance ${maintenanceId}`);
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
            Welcome back, {user?.username || 'Partner'}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your pickleball business today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{partnerStats.totalCourts}</div>
              <p className="text-xs text-gray-600">courts available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${partnerStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{partnerStats.totalCustomers}</div>
              <p className="text-xs text-gray-600">registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{partnerStats.averageRating}</div>
              <p className="text-xs text-gray-600">out of 5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courts">Court Management</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="microsite">Microsite</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                          if (action.name === 'Add New Court') setActiveTab('courts');
                          else if (action.name === 'View Bookings') setActiveTab('bookings');
                          else if (action.name === 'Business Profile') setActiveTab('microsite');
                          else if (action.name === 'Analytics') setActiveTab('analytics');
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

              {/* Court Status Overview */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span>Court Status Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {courtStatus.map((court) => (
                      <div key={court.name} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{court.name}</h4>
                          <Badge className={getCourtStatusColor(court.status)}>
                            {court.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Last Maintenance: {court.lastMaintenance}</div>
                          <div>Next Maintenance: {court.nextMaintenance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <span>Recent Bookings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-500">{booking.date}</div>
                            <div className="text-lg font-semibold">{booking.time}</div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{booking.customerName}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-600">{booking.courtName}</span>
                              <span className="text-sm text-gray-600">•</span>
                              <span className="text-sm text-gray-600">{booking.duration}h</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getBookingStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <div className="text-lg font-semibold text-green-600 mt-1">
                            ${booking.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" onClick={() => setActiveTab('bookings')}>View All Bookings</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Business Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>Revenue Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="font-semibold text-green-600">${partnerStats.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <span className="font-semibold text-gray-900">$11,200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Growth</span>
                        <span className="font-semibold text-green-600">+12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span>Customer Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">New This Month</span>
                        <span className="font-semibold text-blue-600">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Returning Customers</span>
                        <span className="font-semibold text-gray-900">77</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Bookings</span>
                        <span className="font-semibold text-purple-600">{partnerStats.totalBookings}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Court Management Tab */}
            <TabsContent value="courts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span>Court Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Manage Court Availability and Maintenance</h3>
                      <Button onClick={() => handleCourtAction('new', 'add')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Court
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Court</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Hourly Rate</TableHead>
                          <TableHead>Last Maintenance</TableHead>
                          <TableHead>Next Maintenance</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allCourts.map((court) => (
                          <TableRow key={court.name}>
                            <TableCell className="font-medium">{court.name}</TableCell>
                            <TableCell>
                              <Badge className={getCourtStatusColor(court.status)}>
                                {court.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {court.type || 'Indoor'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              ${court.hourlyRate || 25}/hr
                            </TableCell>
                            <TableCell>{court.lastMaintenance}</TableCell>
                            <TableCell>{court.nextMaintenance}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCourtAction(court.name, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCourtAction(court.name, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                {court.status === 'Maintenance' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleCourtAction(court.name, 'complete')}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Complete
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

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <span>Booking Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Handle Reservations and Scheduling</h3>
                      <Button onClick={() => handleBookingAction(0, 'create')}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Booking
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Court</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{booking.customerName}</div>
                                <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>{booking.courtName}</TableCell>
                            <TableCell>
                              <div>{booking.date}</div>
                              <div className="text-sm text-gray-600">{booking.time}</div>
                            </TableCell>
                            <TableCell>{booking.duration}h</TableCell>
                            <TableCell>
                              <Badge className={getBookingStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                                {booking.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>${booking.amount}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookingAction(booking.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookingAction(booking.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                {booking.status === 'Pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleBookingAction(booking.id, 'confirm')}
                                      className="text-green-600 hover:text-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Confirm
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleBookingAction(booking.id, 'cancel')}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Cancel
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

            {/* Customers Tab */}
            <TabsContent value="customers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span>Customer Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Manage Customer Relationships and Feedback</h3>
                      <Button onClick={() => handleCustomerAction(0, 'add')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Customer
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Total Bookings</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead>Last Visit</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-sm text-gray-600">{customer.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600">{customer.phone}</div>
                            </TableCell>
                            <TableCell>{customer.totalBookings}</TableCell>
                            <TableCell>${customer.totalSpent}</TableCell>
                            <TableCell>{customer.lastVisit}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{customer.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCustomerAction(customer.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCustomerAction(customer.id, 'message')}
                                >
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCustomerAction(customer.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
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

            {/* Maintenance Tab */}
            <TabsContent value="maintenance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-orange-500" />
                    <span>Maintenance Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Track Court Maintenance and Repairs</h3>
                      <Button onClick={() => handleMaintenanceAction(0, 'schedule')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Maintenance
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Court</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {maintenanceSchedule.map((maintenance) => (
                          <TableRow key={maintenance.id}>
                            <TableCell className="font-medium">{maintenance.courtName}</TableCell>
                            <TableCell>
                              <Badge variant={
                                maintenance.type === 'Emergency' ? 'destructive' :
                                maintenance.type === 'Scheduled' ? 'default' : 'secondary'
                              }>
                                {maintenance.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{maintenance.description}</TableCell>
                            <TableCell>{maintenance.startDate}</TableCell>
                            <TableCell>{maintenance.endDate}</TableCell>
                            <TableCell>
                              <Badge className={getMaintenanceStatusColor(maintenance.status)}>
                                {maintenance.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{maintenance.technician}</TableCell>
                            <TableCell>${maintenance.cost}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMaintenanceAction(maintenance.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMaintenanceAction(maintenance.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                {maintenance.status === 'In Progress' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMaintenanceAction(maintenance.id, 'complete')}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Complete
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
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <span>Business Microsite Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Configure Your Business's Public Microsite</h3>
                      <Button onClick={() => handleCourtAction('microsite', 'preview')}>
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
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                              id="businessName"
                              value={micrositeConfig.businessName}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={micrositeConfig.description}
                              className="mt-1"
                              rows={3}
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
                          <Label>Business Logo</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Upload your business logo</p>
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
                          <input type="checkbox" id="courts" checked={micrositeConfig.features.courts} />
                          <Label htmlFor="courts">Court Bookings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="equipment" checked={micrositeConfig.features.equipment} />
                          <Label htmlFor="equipment">Equipment Rental</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="training" checked={micrositeConfig.features.training} />
                          <Label htmlFor="training">Training Programs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tournaments" checked={micrositeConfig.features.tournaments} />
                          <Label htmlFor="tournaments">Tournaments</Label>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Amenities</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {micrositeConfig.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input type="checkbox" id={`amenity-${index}`} defaultChecked />
                            <Label htmlFor={`amenity-${index}`}>{amenity}</Label>
                          </div>
                        ))}
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
                    <span>Business Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Track Business Performance and Growth</h3>
                      <Button onClick={() => generateReport('business')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    
                    {/* Financial Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">${financialData.thisMonth.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">
                            {financialData.thisMonth > financialData.lastMonth ? (
                              <span className="text-green-600">↗ +{((financialData.thisMonth - financialData.lastMonth) / financialData.lastMonth * 100).toFixed(1)}%</span>
                            ) : (
                              <span className="text-red-600">↘ {((financialData.lastMonth - financialData.thisMonth) / financialData.lastMonth * 100).toFixed(1)}%</span>
                            )} vs last month
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">This Year</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">${financialData.thisYear.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">
                            {financialData.thisYear > financialData.lastYear ? (
                              <span className="text-green-600">↗ +{((financialData.thisYear - financialData.lastYear) / financialData.lastYear * 100).toFixed(1)}%</span>
                            ) : (
                              <span className="text-red-600">↘ {((financialData.lastYear - financialData.thisYear) / financialData.lastYear * 100).toFixed(1)}%</span>
                            )} vs last year
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">{partnerStats.totalBookings}</div>
                          <div className="text-sm text-gray-600">this month</div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-yellow-600">{partnerStats.averageRating}</div>
                          <div className="text-sm text-gray-600">out of 5 stars</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Revenue Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Revenue by Source</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {Object.entries(financialData.revenueSources).map(([source, percentage]) => (
                              <div key={source} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{source}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full" 
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">{percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Monthly Revenue & Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {financialData.monthlyBreakdown.map((month) => (
                              <div key={month.month} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{month.month}</span>
                                <div className="flex items-center space-x-4">
                                  <div className="text-sm font-medium">${month.revenue}</div>
                                  <div className="text-sm text-gray-600">({month.bookings} bookings)</div>
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard; 