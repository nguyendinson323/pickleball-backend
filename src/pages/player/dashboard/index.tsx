import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Overview from './Overview';
import DigitalIDCard from '../../../components/DigitalIDCard';
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
        <div className="mb-8 animate-on-scroll">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'Player'}!
          </h1>
          <p className="text-gray-600">Here's your pickleball journey overview and recent activity.</p>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <div className="w-full">
            {/* Tab Navigation */}
            <div className="grid w-full grid-cols-6 bg-white rounded-lg shadow-sm border border-gray-200 p-1 animate-on-scroll">
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
                onClick={() => setActiveTab('credentials')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'credentials'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Digital ID
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'matches'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Matches
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
                onClick={() => setActiveTab('activity')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'activity'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'settings'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="animate-on-scroll">
                  <Overview 
                    playerStats={playerStats}
                    profileCompletion={profileCompletion}
                    affiliationData={affiliationData}
                  />
                </div>
              )}

              {/* Digital ID Tab */}
              {activeTab === 'credentials' && (
                <div className="animate-on-scroll">
                  <DigitalIDCard />
                </div>
              )}

              {/* Matches Tab */}
              {activeTab === 'matches' && (
                <div className="animate-on-scroll">
                  <Matches matchHistory={matchHistory} />
                </div>
              )}

              {/* Tournaments Tab */}
              {activeTab === 'tournaments' && (
                <div className="animate-on-scroll">
                  <Tournaments playerStats={playerStats} />
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="animate-on-scroll">
                  <Activity recentActivity={recentActivity} />
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="animate-on-scroll">
                  <Settings 
                    privacySettings={privacySettings}
                    profileCompletion={profileCompletion}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard; 