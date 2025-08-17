import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Overview from './Overview';
import Tournaments from './Tournaments';
import ClubManagement from './ClubManagement';
import Verifications from './Verifications';
import Microsite from './Microsite';
import Analytics from './Analytics';
import Communications from './Communications';

const StateDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  
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

  // Recent members and announcements data
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
              <Overview 
                stateStats={stateStats}
                recentMembers={recentMembers}
                recentAnnouncements={recentAnnouncements}
              />
            </TabsContent>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="mt-6">
              <Tournaments tournaments={tournaments} />
            </TabsContent>

            {/* Club Management Tab */}
            <TabsContent value="clubs" className="mt-6">
              <ClubManagement clubAffiliations={clubAffiliations} />
            </TabsContent>

            {/* Verifications Tab */}
            <TabsContent value="verifications" className="mt-6">
              <Verifications memberVerifications={memberVerifications} />
            </TabsContent>

            {/* Microsite Tab */}
            <TabsContent value="microsite" className="mt-6">
              <Microsite micrositeConfig={micrositeConfig} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <Analytics performanceData={performanceData} stateStats={stateStats} />
            </TabsContent>

            {/* Communications Tab */}
            <TabsContent value="communications" className="mt-6">
              <Communications 
                stateStats={stateStats}
                recentAnnouncements={recentAnnouncements}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StateDashboard; 