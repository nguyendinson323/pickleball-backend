import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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

  // Tournament management data
  const tournaments = [
    {
      id: 1,
      name: 'Spring Championship Tournament',
      date: '2024-04-20',
      startTime: '9:00 AM',
      endTime: '6:00 PM',
      participants: 48,
      maxParticipants: 64,
      entryFee: 75,
      totalRevenue: 3600,
      expenses: 1200,
      profit: 2400,
      status: 'Registration Open',
      description: 'Annual spring championship tournament with multiple divisions',
      location: 'Elite Pickleball Club - Main Courts',
      tournamentType: 'doubles' as const,
      skillLevel: 'all',
      prizes: 'Cash prizes for winners, trophies for top 3',
      rules: 'USAPA rules apply, double elimination format'
    },
    {
      id: 2,
      name: 'Summer League Finals',
      date: '2024-06-15',
      startTime: '10:00 AM',
      endTime: '4:00 PM',
      participants: 32,
      maxParticipants: 32,
      entryFee: 50,
      totalRevenue: 1600,
      expenses: 800,
      profit: 800,
      status: 'Full',
      description: 'Summer league championship finals',
      location: 'Elite Pickleball Club - All Courts',
      tournamentType: 'singles' as const,
      skillLevel: 'intermediate',
      prizes: 'League championship trophies and medals',
      rules: 'Round robin format, top 4 advance to playoffs'
    },
    {
      id: 3,
      name: 'Fall Classic',
      date: '2024-09-28',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      participants: 0,
      maxParticipants: 48,
      entryFee: 60,
      totalRevenue: 0,
      expenses: 0,
      profit: 0,
      status: 'Planning',
      description: 'Fall season tournament for all skill levels',
      location: 'Elite Pickleball Club - Main Courts',
      tournamentType: 'mixed' as const,
      skillLevel: 'all',
      prizes: 'Trophies and gift certificates for winners',
      rules: 'Mixed doubles format, skill-based divisions'
    }
  ];

  // Court rental data
  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  const courtBookings: Record<string, Record<string, {
    status: 'available' | 'booked' | 'maintenance' | 'reserved';
    price: number;
    player?: string;
    startTime: string;
    endTime: string;
    bookingId?: string;
  }>> = {
    'Court 1': {
      '6:00 AM': { status: 'available', price: 25, startTime: '6:00 AM', endTime: '7:00 AM' },
      '7:00 AM': { status: 'booked', price: 25, player: 'John D.', startTime: '7:00 AM', endTime: '8:00 AM', bookingId: 'BK001' },
      '8:00 AM': { status: 'available', price: 25, startTime: '8:00 AM', endTime: '9:00 AM' },
      '9:00 AM': { status: 'booked', price: 30, player: 'Sarah M.', startTime: '9:00 AM', endTime: '10:00 AM', bookingId: 'BK002' },
      '10:00 AM': { status: 'available', price: 30, startTime: '10:00 AM', endTime: '11:00 AM' },
      '11:00 AM': { status: 'available', price: 30, startTime: '11:00 AM', endTime: '12:00 PM' },
      '12:00 PM': { status: 'booked', price: 35, player: 'Mike R.', startTime: '12:00 PM', endTime: '1:00 PM', bookingId: 'BK003' },
      '1:00 PM': { status: 'available', price: 35, startTime: '1:00 PM', endTime: '2:00 PM' },
      '2:00 PM': { status: 'available', price: 35, startTime: '2:00 PM', endTime: '3:00 PM' },
      '3:00 PM': { status: 'booked', price: 30, player: 'Lisa K.', startTime: '3:00 PM', endTime: '4:00 PM', bookingId: 'BK004' },
      '4:00 PM': { status: 'available', price: 30, startTime: '4:00 PM', endTime: '5:00 PM' },
      '5:00 PM': { status: 'available', price: 30, startTime: '5:00 PM', endTime: '6:00 PM' },
      '6:00 PM': { status: 'booked', price: 35, player: 'Carlos R.', startTime: '6:00 PM', endTime: '7:00 PM', bookingId: 'BK005' },
      '7:00 PM': { status: 'booked', price: 35, player: 'Ana M.', startTime: '7:00 PM', endTime: '8:00 PM', bookingId: 'BK006' },
      '8:00 PM': { status: 'available', price: 30, startTime: '8:00 PM', endTime: '9:00 PM' },
      '9:00 PM': { status: 'available', price: 25, startTime: '9:00 PM', endTime: '10:00 PM' },
      '10:00 PM': { status: 'available', price: 20, startTime: '10:00 PM', endTime: '11:00 PM' }
    },
    'Court 2': {
      '6:00 AM': { status: 'available', price: 25, startTime: '6:00 AM', endTime: '7:00 AM' },
      '7:00 AM': { status: 'available', price: 25, startTime: '7:00 AM', endTime: '8:00 AM' },
      '8:00 AM': { status: 'booked', price: 25, player: 'David L.', startTime: '8:00 AM', endTime: '9:00 AM', bookingId: 'BK007' },
      '9:00 AM': { status: 'available', price: 30, startTime: '9:00 AM', endTime: '10:00 AM' },
      '10:00 AM': { status: 'booked', price: 30, player: 'Emma S.', startTime: '10:00 AM', endTime: '11:00 AM', bookingId: 'BK008' },
      '11:00 AM': { status: 'available', price: 30, startTime: '11:00 AM', endTime: '12:00 PM' },
      '12:00 PM': { status: 'available', price: 35, startTime: '12:00 PM', endTime: '1:00 PM' },
      '1:00 PM': { status: 'booked', price: 35, player: 'Robert K.', startTime: '1:00 PM', endTime: '2:00 PM', bookingId: 'BK009' },
      '2:00 PM': { status: 'booked', price: 35, player: 'Maria G.', startTime: '2:00 PM', endTime: '3:00 PM', bookingId: 'BK010' },
      '3:00 PM': { status: 'available', price: 30, startTime: '3:00 PM', endTime: '4:00 PM' },
      '4:00 PM': { status: 'available', price: 30, startTime: '4:00 PM', endTime: '5:00 PM' },
      '5:00 PM': { status: 'booked', price: 30, player: 'Tom H.', startTime: '5:00 PM', endTime: '6:00 PM', bookingId: 'BK011' },
      '6:00 PM': { status: 'available', price: 35, startTime: '6:00 PM', endTime: '7:00 PM' },
      '7:00 PM': { status: 'available', price: 35, startTime: '7:00 PM', endTime: '8:00 PM' },
      '8:00 PM': { status: 'available', price: 30, startTime: '8:00 PM', endTime: '9:00 PM' },
      '9:00 PM': { status: 'available', price: 25, startTime: '9:00 PM', endTime: '10:00 PM' },
      '10:00 PM': { status: 'available', price: 20, startTime: '10:00 PM', endTime: '11:00 PM' }
    }
  };

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
      date: '2024-03-30',
      time: '10:00 AM',
      participants: 12,
      type: 'Training',
      status: 'Registration Open'
    },
    {
      id: 3,
      title: 'Advanced Strategy Workshop',
      date: '2024-04-05',
      time: '2:00 PM',
      participants: 8,
      type: 'Training',
      status: 'Full'
    }
  ];

  const courtStatus = [
    {
      id: 1,
      name: 'Court 1',
      status: 'Available',
      currentTime: '2:30 PM',
      nextBooking: '3:00 PM'
    },
    {
      id: 2,
      name: 'Court 2',
      status: 'Occupied',
      currentTime: '2:30 PM',
      nextBooking: '3:00 PM'
    },
    {
      id: 3,
      name: 'Court 3',
      status: 'Maintenance',
      currentTime: '2:30 PM',
      nextBooking: '4:00 PM'
    },
    {
      id: 4,
      name: 'Court 4',
      status: 'Available',
      currentTime: '2:30 PM',
      nextBooking: '3:30 PM'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Registration Open': return 'bg-green-100 text-green-800';
      case 'Full': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMemberStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="animate-on-scroll text-3xl font-bold text-gray-900">Club Dashboard</h1>
              <p className="animate-on-scroll text-gray-600">Welcome back, {user?.name || 'Club Manager'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="animate-on-scroll text-sm text-gray-600">Elite Pickleball Club</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-8 overflow-x-auto pb-2 min-h-[60px]">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Overview
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'courts'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('courts')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Courts
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'tournaments'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('tournaments')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Tournaments
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'invoices'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('invoices')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Invoices
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'microsite'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('microsite')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
                Microsite
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'reports'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('reports')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Reports
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'members'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setActiveTab('members')}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Members
              </button>
            </div>
          </div>

          <div className="px-6 py-6 min-h-[400px]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <Overview clubStats={clubStats} courtStatus={courtStatus} />
            )}

            {/* Court Rental Tab */}
            {activeTab === 'courts' && (
              <CourtRental
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedCourt={selectedCourt}
                setSelectedCourt={setSelectedCourt}
                timeSlots={timeSlots}
                courtBookings={courtBookings}
              />
            )}

            {/* Tournaments Tab */}
            {activeTab === 'tournaments' && (
              <Tournaments tournaments={tournaments} />
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <Invoices invoices={invoices} />
            )}

            {/* Microsite Tab */}
            {activeTab === 'microsite' && (
              <Microsite micrositeConfig={micrositeConfig} />
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <Reports />
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <Members members={recentMembers} />
            )}
          </div>
        </div>

        {/* Upcoming Events & Recent Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Upcoming Events */}
          <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Upcoming Events</span>
              </h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="animate-on-scroll flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`animate-on-scroll w-10 h-10 rounded-full flex items-center justify-center ${
                        event.type === 'Tournament' ? 'bg-blue-100 text-blue-600' :
                        event.type === 'Training' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {event.type === 'Tournament' ? 
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg> :
                         event.type === 'Training' ? 
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg> :
                         <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>}
                      </div>
                      <div>
                        <h4 className="animate-on-scroll font-medium text-gray-900">{event.title}</h4>
                        <p className="animate-on-scroll text-sm text-gray-600">{event.date} at {event.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`animate-on-scroll inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <p className="animate-on-scroll text-sm text-gray-600 mt-1">{event.participants} participants</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Members */}
          <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span>Recent Members</span>
              </h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {recentMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="animate-on-scroll flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-10 w-10">
                        {member.photo ? (
                          <img className="h-10 w-10 rounded-full" src={member.photo} alt={member.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="animate-on-scroll font-medium text-gray-900">{member.name}</h4>
                        <p className="animate-on-scroll text-sm text-gray-600">{member.type} • Joined: {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`animate-on-scroll inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMemberStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setActiveTab('members')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  View All Members
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveTab('members')}
                  className="animate-on-scroll inline-flex flex-col items-center justify-center h-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-y-2"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>Manage Members</span>
                </button>
                <button 
                  onClick={() => setActiveTab('courts')}
                  className="animate-on-scroll inline-flex flex-col items-center justify-center h-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-y-2"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Court Management</span>
                </button>
                <button 
                  onClick={() => setActiveTab('tournaments')}
                  className="animate-on-scroll inline-flex flex-col items-center justify-center h-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-y-2"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Schedule Events</span>
                </button>
                <button 
                  onClick={() => setActiveTab('microsite')}
                  className="animate-on-scroll inline-flex flex-col items-center justify-center h-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-y-2"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Club Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard; 