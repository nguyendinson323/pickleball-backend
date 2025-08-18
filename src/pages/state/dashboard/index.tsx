import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
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
      city: 'Sacramento',
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
      city: 'Los Angeles',
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
      city: 'San Francisco',
      members: 67,
      status: 'Pending Review',
      complianceScore: 72,
      lastInspection: '2024-03-01',
      nextInspection: '2024-06-01',
      issues: 3
    }
  ];

  // Verification requests data
  const verificationRequests = [
    {
      id: 1,
      applicantName: 'Sarah M.',
      type: 'Coach Certification',
      submittedDate: '2024-03-20',
      status: 'Pending Review',
      priority: 'High',
      documents: 5,
      estimatedTime: '3-5 days'
    },
    {
      id: 2,
      applicantName: 'Mike R.',
      type: 'Tournament Director',
      submittedDate: '2024-03-18',
      status: 'Under Review',
      priority: 'Medium',
      documents: 3,
      estimatedTime: '2-3 days'
    },
    {
      id: 3,
      applicantName: 'Lisa K.',
      type: 'Club Manager',
      submittedDate: '2024-03-15',
      status: 'Pending Review',
      priority: 'Medium',
      documents: 4,
      estimatedTime: '3-5 days'
    }
  ];

  // Analytics data
  const analyticsData = {
    memberGrowth: 15.2,
    revenueGrowth: 12.5,
    tournamentParticipation: 87.3,
    clubCompliance: 92.1,
    monthlyTrends: [45, 52, 48, 67, 73, 89, 95, 87, 92, 98, 105, 112]
  };

  // Communications data
  const communicationsData = {
    totalAnnouncements: 15,
    scheduledMessages: 8,
    memberEngagement: 78.5,
    responseRate: 92.3,
    recentMessages: [
      {
        id: 1,
        type: 'Announcement',
        title: 'State Championship Registration Open',
        sentDate: '2024-03-25',
        recipients: 1247,
        opened: 892,
        clicked: 234
      },
      {
        id: 2,
        type: 'Newsletter',
        title: 'March Federation Update',
        sentDate: '2024-03-20',
        recipients: 1247,
        opened: 756,
        clicked: 189
      }
    ]
  };

  // Recent members data for Overview component
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

  // Recent announcements data for Overview component
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

  // Microsite configuration data with required properties
  const micrositeConfig = {
    stateName: 'California State Pickleball Federation',
    description: 'Official state representative for California Pickleball Federation with authority to organize state-level tournaments',
    logo: 'https://example.com/california-logo.png',
    bannerImage: 'https://example.com/california-banner.jpg',
    contactInfo: {
      phone: '+1-555-123-4567',
      email: 'california@pickleballfederation.org',
      address: '123 State Street, Sacramento, CA 95814',
      website: 'https://www.california-pickleball.org'
    },
    socialMedia: {
      facebook: 'https://facebook.com/california-pickleball',
      instagram: 'https://instagram.com/california-pickleball',
      twitter: 'https://twitter.com/california-pickleball'
    },
    features: {
      tournaments: true,
      training: true,
      rankings: true,
      news: true
    }
  };

  // Performance analytics data for Analytics component
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

  // Member verification data for Verifications component
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-on-scroll">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">State Federation Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.full_name || 'Federation Administrator'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-on-scroll">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-blue-600">{stateStats.totalMembers.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg font-semibold">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clubs</p>
                <p className="text-2xl font-bold text-green-600">{stateStats.totalClubs}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg font-semibold">🏢</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${stateStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-lg font-semibold">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-orange-600">{stateStats.pendingApplications}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-lg font-semibold">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          {/* Tab Navigation */}
          <div className="grid w-full grid-cols-7 bg-white rounded-lg shadow-sm border border-gray-200 p-1 animate-on-scroll">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'tournaments'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Tournaments
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'clubs'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Clubs
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'verifications'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Verifications
            </button>
            <button
              onClick={() => setActiveTab('microsite')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'microsite'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Microsite
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('communications')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'communications'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Communications
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="animate-on-scroll">
                <Overview 
                  stateStats={stateStats}
                  recentMembers={recentMembers}
                  recentAnnouncements={recentAnnouncements}
                />
              </div>
            )}

            {/* Tournaments Tab */}
            {activeTab === 'tournaments' && (
              <div className="animate-on-scroll">
                <Tournaments tournaments={tournaments} />
              </div>
            )}

            {/* Clubs Tab */}
            {activeTab === 'clubs' && (
              <div className="animate-on-scroll">
                <ClubManagement clubAffiliations={clubAffiliations} />
              </div>
            )}

            {/* Verifications Tab */}
            {activeTab === 'verifications' && (
              <div className="animate-on-scroll">
                <Verifications memberVerifications={memberVerifications} />
              </div>
            )}

            {/* Microsite Tab */}
            {activeTab === 'microsite' && (
              <div className="animate-on-scroll">
                <Microsite micrositeConfig={micrositeConfig} />
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="animate-on-scroll">
                <Analytics performanceData={performanceData} stateStats={stateStats} />
              </div>
            )}

            {/* Communications Tab */}
            {activeTab === 'communications' && (
              <div className="animate-on-scroll">
                <Communications 
                  stateStats={stateStats}
                  recentAnnouncements={recentAnnouncements}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDashboard; 