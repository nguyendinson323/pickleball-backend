import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Overview from './Overview';
import Credentials from './Credentials';
import Matches from './Matches';
import Tournaments from './Tournaments';
import Activity from './Activity';
import Settings from './Settings';

const PlayerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for all components
  const playerStats = {
    tournamentsPlayed: 12,
    tournamentsWon: 3,
    currentRanking: 45,
    rankingChange: '+5',
    totalPoints: 1250,
    matchesPlayed: 48,
    winRate: 68,
    nextTournament: 'Spring Championship',
    nextTournamentDate: '2024-04-15',
    upcomingMatches: 2,
    recentAchievements: [
      'Tournament Winner - Winter League',
      'Ranking Improvement - Top 50',
      'Perfect Match - 11-0 Victory'
    ]
  };

  // Digital credential data
  const digitalCredential = {
    playerId: 'PLAYER123456',
    fullName: user?.full_name || 'John Smith',
    skillLevel: user?.skill_level || '3.5',
    membershipStatus: user?.membership_status || 'premium',
    membershipExpires: '2025-12-31',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PLAYER123456',
    verified: true,
    lastVerified: '2024-01-15'
  };

  // Profile completion status
  const profileCompletion = {
    photo: !!user?.profile_photo,
    idDocument: !!user?.verification_documents,
    bio: !!user?.bio,
    contactInfo: !!(user?.phone || user?.whatsapp),
    location: !!(user?.state && user?.city),
    total: 5,
    completed: 0
  };

  // Calculate completion percentage
  profileCompletion.completed = [
    profileCompletion.photo,
    profileCompletion.idDocument,
    profileCompletion.bio,
    profileCompletion.contactInfo,
    profileCompletion.location
  ].filter(Boolean).length;

  // Match history data
  const matchHistory = [
    {
      id: '1',
      opponent: 'Maria González',
      date: '2024-03-20',
      result: 'Won',
      score: '11-8, 11-6',
      tournament: 'Winter League Finals',
      points: '+150'
    },
    {
      id: '2',
      opponent: 'Carlos Rodríguez',
      date: '2024-03-18',
      result: 'Lost',
      score: '8-11, 9-11',
      tournament: 'Practice Match',
      points: '-25'
    },
    {
      id: '3',
      opponent: 'Ana Martínez',
      date: '2024-03-15',
      result: 'Won',
      score: '11-9, 11-7',
      tournament: 'Club Championship',
      points: '+100'
    }
  ];

  const recentActivity: Array<{
    type: 'tournament' | 'match' | 'ranking';
    title: string;
    date: string;
    result: string;
    points: string;
  }> = [
    {
      type: 'tournament',
      title: 'Winter League Finals',
      date: '2024-03-20',
      result: 'Winner',
      points: '+150'
    },
    {
      type: 'match',
      title: 'Practice Match vs. John D.',
      date: '2024-03-18',
      result: 'Won 11-8',
      points: '+25'
    },
    {
      type: 'ranking',
      title: 'Ranking Update',
      date: '2024-03-15',
      result: 'Moved to #45',
      points: '+5'
    }
  ];

  // Affiliation data
  const affiliationData = {
    location: {
      state: user?.state,
      city: user?.city
    },
    club: user?.club,
    membershipStatus: user?.membership_status
  };

  // Privacy settings data
  const privacySettings = {
    canBeFound: user?.can_be_found ?? true
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'Player'}!
          </h1>
          <p className="text-gray-600">Here's your pickleball journey overview and recent activity.</p>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <Overview 
                playerStats={playerStats}
                profileCompletion={profileCompletion}
                affiliationData={affiliationData}
              />
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="credentials" className="mt-6">
              <Credentials digitalCredential={digitalCredential} />
            </TabsContent>

            {/* Matches Tab */}
            <TabsContent value="matches" className="mt-6">
              <Matches matchHistory={matchHistory} />
            </TabsContent>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="mt-6">
              <Tournaments playerStats={playerStats} />
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="mt-6">
              <Activity recentActivity={recentActivity} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <Settings 
                privacySettings={privacySettings}
                profileCompletion={profileCompletion}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard; 