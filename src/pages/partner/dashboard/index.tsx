import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Overview from './Overview';
import CourtManagement from './CourtManagement';
import Bookings from './Bookings';
import Customers from './Customers';
import Maintenance from './Maintenance';
import Microsite from './Microsite';
import Analytics from './Analytics';

const PartnerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  
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

  // Court management data
  const allCourts = [
    { name: 'Court 1', status: 'Available', lastMaintenance: '2024-03-15', nextMaintenance: '2024-04-15', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 2', status: 'Occupied', lastMaintenance: '2024-03-10', nextMaintenance: '2024-04-10', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 3', status: 'Available', lastMaintenance: '2024-03-20', nextMaintenance: '2024-04-20', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 4', status: 'Maintenance', lastMaintenance: '2024-03-18', nextMaintenance: '2024-03-25', hourlyRate: 30, type: 'Outdoor' },
    { name: 'Court 5', status: 'Available', lastMaintenance: '2024-03-12', nextMaintenance: '2024-04-12', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 6', status: 'Available', lastMaintenance: '2024-03-14', nextMaintenance: '2024-04-14', hourlyRate: 25, type: 'Indoor' },
    { name: 'Court 7', status: 'Maintenance', lastMaintenance: '2024-03-22', nextMaintenance: '2024-03-29', hourlyRate: 30, type: 'Outdoor' },
    { name: 'Court 8', status: 'Available', lastMaintenance: '2024-03-16', nextMaintenance: '2024-04-16', hourlyRate: 30, type: 'Outdoor' }
  ];

  // Enhanced booking data
  const allBookings = [
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
    },
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
              <Overview 
                partnerStats={partnerStats}
                allCourts={allCourts}
                allBookings={allBookings}
                financialData={financialData}
              />
            </TabsContent>

            {/* Court Management Tab */}
            <TabsContent value="courts" className="mt-6">
              <CourtManagement allCourts={allCourts} />
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="mt-6">
              <Bookings allBookings={allBookings} />
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers" className="mt-6">
              <Customers customers={customers} />
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="maintenance" className="mt-6">
              <Maintenance maintenanceSchedule={maintenanceSchedule} />
            </TabsContent>

            {/* Microsite Tab */}
            <TabsContent value="microsite" className="mt-6">
              <Microsite micrositeConfig={micrositeConfig} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <Analytics financialData={financialData} partnerStats={partnerStats} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard; 