import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Overview from './Overview';
import Rankings from './Rankings';
import Microsites from './Microsites';
import CourtMonitor from './CourtMonitor';
import Affiliations from './Affiliations';
import Messaging from './Messaging';

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for system overview
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



  // Mock data for messaging (will be handled by dedicated messaging page)
  const messageData = {
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
  };

  // Rankings management data
  const rankingIssues = [
    {
      id: 1,
      player: 'Maria González',
      currentRank: 45,
      requestedRank: 42,
      reason: 'Tournament performance improvement',
      status: 'pending' as const,
      submitted: '2024-03-25'
    },
    {
      id: 2,
      player: 'Carlos Rodríguez',
      currentRank: 38,
      requestedRank: 35,
      reason: 'Recent tournament wins',
      status: 'approved' as const,
      submitted: '2024-03-24'
    },
    {
      id: 3,
      player: 'Ana Martínez',
      currentRank: 52,
      requestedRank: 48,
      reason: 'Skill level assessment',
      status: 'rejected' as const,
      submitted: '2024-03-23'
    }
  ];

  // Microsite management data
  const microsites = [
    {
      id: 1,
      name: 'Jalisco State Committee',
      type: 'state' as const,
      status: 'active' as const,
      lastUpdated: '2024-03-25',
      contentIssues: 0,
      needsReview: false,
      url: 'https://jalisco.pickleball.org',
      owner: 'Jalisco Committee',
      region: 'Jalisco'
    },
    {
      id: 2,
      name: 'Elite Pickleball Club',
      type: 'club' as const,
      status: 'active' as const,
      lastUpdated: '2024-03-24',
      contentIssues: 2,
      needsReview: true,
      url: 'https://elite.pickleball.org',
      owner: 'Maria Rodriguez',
      region: 'Jalisco'
    },
    {
      id: 3,
      name: 'Sports Equipment Partner',
      type: 'partner' as const,
      status: 'pending' as const,
      lastUpdated: '2024-03-23',
      contentIssues: 0,
      needsReview: true,
      url: 'https://sports.pickleball.org',
      owner: 'Ana Garcia',
      region: 'National'
    }
  ];

  // Court performance data
  const courtPerformance = [
    {
      id: 1,
      name: 'Court A1',
      location: 'Main Facility',
      status: 'operational' as const,
      uptime: 99.8,
      responseTime: 45,
      bookingsToday: 12,
      utilization: 85,
      lastMaintenance: '2024-03-20',
      nextMaintenance: '2024-04-20',
      issues: []
    },
    {
      id: 2,
      name: 'Court B2',
      location: 'Main Facility',
      status: 'maintenance' as const,
      uptime: 95.2,
      responseTime: 120,
      bookingsToday: 0,
      utilization: 0,
      lastMaintenance: '2024-03-25',
      nextMaintenance: '2024-04-25',
      issues: ['Scheduled maintenance']
    },
    {
      id: 3,
      name: 'Court C3',
      location: 'Secondary Facility',
      status: 'operational' as const,
      uptime: 98.9,
      responseTime: 67,
      bookingsToday: 8,
      utilization: 72,
      lastMaintenance: '2024-03-18',
      nextMaintenance: '2024-04-18',
      issues: []
    }
  ];

  // Affiliation data
  const affiliations = [
    {
      id: 1,
      entityName: 'Elite Pickleball Club',
      entityType: 'club' as const,
      status: 'active' as const,
      region: 'Jalisco',
      memberCount: 156,
      joinDate: '2023-01-15',
      renewalDate: '2024-01-15',
      complianceScore: 94,
      lastAudit: '2024-01-10',
      contactPerson: 'Maria Rodriguez',
      contactEmail: 'maria@eliteclub.com',
      benefits: ['Tournament Access', 'Training Programs', 'Equipment Discounts']
    },
    {
      id: 2,
      entityName: 'Jalisco State Committee',
      entityType: 'state' as const,
      status: 'active' as const,
      region: 'Jalisco',
      memberCount: 23,
      joinDate: '2022-06-01',
      renewalDate: '2024-06-01',
      complianceScore: 98,
      lastAudit: '2024-01-15',
      contactPerson: 'Carlos Mendez',
      contactEmail: 'carlos@jalisco.org',
      benefits: ['State Championships', 'Regional Events', 'Development Programs']
    },
    {
      id: 3,
      entityName: 'Sports Equipment Partner',
      entityType: 'partner' as const,
      status: 'pending' as const,
      region: 'National',
      memberCount: 0,
      joinDate: '2024-03-20',
      renewalDate: '2025-03-20',
      complianceScore: 0,
      lastAudit: 'Pending',
      contactPerson: 'Ana Garcia',
      contactEmail: 'ana@sportsequipment.com',
      benefits: ['Equipment Supply', 'Sponsorship Opportunities', 'Brand Visibility']
    }
  ];

  // Enhanced messaging data
  const messages = [
    {
      id: 1,
      subject: 'System Maintenance Notice',
      sender: 'System Admin',
      recipients: ['All Users'],
      priority: 'high' as const,
      status: 'sent' as const,
      category: 'maintenance' as const,
      sentAt: '2024-03-25 08:00 AM',
      readAt: '2024-03-25 08:15 AM',
      content: 'Scheduled maintenance will occur tonight from 2-4 AM. Minimal disruption expected.',
      attachments: [],
      tags: ['maintenance', 'scheduled']
    },
    {
      id: 2,
      subject: 'New Tournament Registration Open',
      sender: 'Tournament Director',
      recipients: ['Players', 'Coaches'],
      priority: 'normal' as const,
      status: 'delivered' as const,
      category: 'announcement' as const,
      sentAt: '2024-03-24 10:00 AM',
      content: 'Registration for the Spring Championship is now open. Early bird pricing available until April 1st.',
      attachments: ['tournament-flyer.pdf'],
      tags: ['tournament', 'registration', 'championship']
    },
    {
      id: 3,
      subject: 'Club Affiliation Benefits Update',
      sender: 'Membership Team',
      recipients: ['Club Admins'],
      priority: 'normal' as const,
      status: 'read' as const,
      category: 'update' as const,
      sentAt: '2024-03-23 02:00 PM',
      readAt: '2024-03-23 03:30 PM',
      content: 'New benefits have been added to your club affiliation package. Check your dashboard for details.',
      attachments: ['benefits-guide.pdf'],
      tags: ['benefits', 'affiliation', 'update']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-on-scroll">
            Welcome back, {user?.username || 'Super Admin'}!
          </h1>
          <p className="text-gray-600 animate-on-scroll">System-wide overview and performance metrics</p>
        </div>

                {/* Main Content Tabs */}
        <div className="mb-8">
          <div className="w-full">
            {/* Tab Navigation */}
            <div className="grid w-full grid-cols-6 bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 text-sm font-medium rounded-l-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('rankings')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'rankings'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Rankings
              </button>
              <button
                onClick={() => setActiveTab('microsites')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'microsites'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Microsites
              </button>
              <button
                onClick={() => setActiveTab('court-monitor')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'court-monitor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Court Monitor
              </button>
              <button
                onClick={() => setActiveTab('affiliations')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'affiliations'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Affiliations
              </button>
              <button
                onClick={() => setActiveTab('messaging')}
                className={`px-4 py-3 text-sm font-medium rounded-r-lg transition-colors ${
                  activeTab === 'messaging'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Messaging
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'overview' && (
                <div>
                  <Overview
                    systemStats={systemStats}
                    recentSystemEvents={recentSystemEvents}
                    pendingActions={pendingActions}
                    timeRange="30"
                    setTimeRange={() => {}}
                    showMessaging={false}
                    setShowMessaging={() => {}}
                    messageData={messageData}
                    setMessageData={() => {}}
                  />
                </div>
              )}

              {activeTab === 'rankings' && (
                <div>
                  <Rankings rankingIssues={rankingIssues} />
                </div>
              )}

              {activeTab === 'microsites' && (
                <div>
                  <Microsites microsites={microsites} />
                </div>
              )}

              {activeTab === 'court-monitor' && (
                <div>
                  <CourtMonitor courtPerformance={courtPerformance} />
                </div>
              )}

              {activeTab === 'affiliations' && (
                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <Affiliations affiliations={affiliations} />
                  </div>
                </div>
              )}

              {activeTab === 'messaging' && (
                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <Messaging messages={messages} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="mb-8">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <Overview
                    systemStats={systemStats}
                    recentSystemEvents={recentSystemEvents}
                    pendingActions={pendingActions}
                    timeRange="30"
                    setTimeRange={() => {}}
                showMessaging={false}
                setShowMessaging={() => {}}
                    messageData={messageData}
                setMessageData={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 