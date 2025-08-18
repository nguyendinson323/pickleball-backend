import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Overview from './Overview';
import Sessions from './Sessions';
import Students from './Students';
import TrainingPlans from './TrainingPlans';
import Credentials from './Credentials';
import Revenue from './Revenue';

const CoachDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for all components
  const coachStats = {
    totalStudents: 24,
    activeStudents: 18,
    trainingSessions: 156,
    sessionsThisMonth: 12,
    averageRating: 4.8,
    totalReviews: 89,
    certifications: 3,
    nextSession: 'Advanced Technique Workshop',
    nextSessionDate: '2024-04-20',
    upcomingSessions: 5,
    recentAchievements: [
      'Certified Advanced Coach - Level 3',
      'Student Tournament Winner - Sarah M.',
      '100+ Training Sessions Milestone'
    ]
  };

  // Session management data
  const allSessions = [
    {
      id: 1,
      title: 'Advanced Technique Workshop',
      date: '2024-04-20',
      time: '10:00 AM',
      students: 8,
      type: 'Group Session',
      status: 'upcoming',
      revenue: 0
    },
    {
      id: 2,
      title: 'Beginner Fundamentals',
      date: '2024-04-22',
      time: '2:00 PM',
      students: 12,
      type: 'Group Session',
      status: 'upcoming',
      revenue: 0
    },
    {
      id: 3,
      title: 'Private Lesson - John D.',
      date: '2024-04-25',
      time: '4:00 PM',
      students: 1,
      type: 'Private Session',
      status: 'upcoming',
      revenue: 0
    },
    {
      id: 4,
      title: 'Intermediate Skills Development',
      date: '2024-03-28',
      time: '3:00 PM',
      students: 6,
      type: 'Group Session',
      status: 'completed',
      revenue: 180
    },
    {
      id: 5,
      title: 'Private Lesson - Sarah M.',
      date: '2024-03-26',
      time: '5:00 PM',
      students: 1,
      type: 'Private Session',
      status: 'completed',
      revenue: 75
    },
    {
      id: 6,
      title: 'Youth Training Program',
      date: '2024-03-25',
      time: '4:00 PM',
      students: 15,
      type: 'Group Session',
      status: 'completed',
      revenue: 225
    }
  ];

  // Student progress tracking data
  const studentProgress = [
    {
      id: 1,
      name: 'Sarah M.',
      level: 'Intermediate',
      lastSession: '2024-03-20',
      progress: 85,
      nextGoal: 'Advanced Tournament Ready',
      achievements: ['Tournament Winner', 'Skill Level Up'],
      nextSession: '2024-04-20',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      level: 'Beginner',
      lastSession: '2024-03-18',
      progress: 45,
      nextGoal: 'Intermediate Level',
      achievements: ['First Tournament', 'Basic Skills Mastered'],
      nextSession: '2024-04-22',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      level: 'Advanced',
      lastSession: '2024-03-15',
      progress: 92,
      nextGoal: 'Professional Level',
      achievements: ['Advanced Certification', 'Multiple Tournament Wins'],
      nextSession: '2024-04-25',
      photo: null
    },
    {
      id: 4,
      name: 'John D.',
      level: 'Intermediate',
      lastSession: '2024-03-22',
      progress: 68,
      nextGoal: 'Advanced Level',
      achievements: ['Consistent Performance', 'Team Player'],
      nextSession: '2024-04-18',
      photo: null
    }
  ];

  // Training plans data
  const trainingPlans = [
    {
      id: 1,
      name: 'Beginner to Intermediate',
      duration: '12 weeks',
      students: 8,
      status: 'active',
      progress: 75,
      nextSession: 'Week 9: Advanced Serving',
      description: 'Comprehensive program for beginners to reach intermediate level'
    },
    {
      id: 2,
      name: 'Advanced Tournament Prep',
      duration: '8 weeks',
      students: 4,
      status: 'active',
      progress: 50,
      nextSession: 'Week 5: Strategy & Tactics',
      description: 'Intensive preparation for competitive tournaments'
    },
    {
      id: 3,
      name: 'Youth Development Program',
      duration: '16 weeks',
      students: 12,
      status: 'active',
      progress: 25,
      nextSession: 'Week 5: Basic Techniques',
      description: 'Age-appropriate training for young players'
    }
  ];

  // Credentials and certifications data
  const credentials = [
    {
      id: 1,
      name: 'USAPA Level 3 Coach',
      issuingOrg: 'USA Pickleball Association',
      issueDate: '2023-06-15',
      expiryDate: '2026-06-15',
      status: 'active',
      verificationUrl: 'https://verify.usapa.org/coach123'
    },
    {
      id: 2,
      name: 'IPTPA Certified Instructor',
      issuingOrg: 'International Pickleball Teaching Professional Association',
      issueDate: '2022-09-20',
      expiryDate: '2025-09-20',
      status: 'active',
      verificationUrl: 'https://verify.iptpa.org/instructor456'
    },
    {
      id: 3,
      name: 'Youth Coaching Specialist',
      issuingOrg: 'National Youth Sports Association',
      issueDate: '2023-03-10',
      expiryDate: '2026-03-10',
      status: 'active',
      verificationUrl: 'https://verify.nysa.org/youth789'
    }
  ];

  // Revenue tracking data
  const revenueData = {
    thisMonth: 2850,
    lastMonth: 3200,
    thisYear: 28500,
    lastYear: 28000,
    monthlyBreakdown: [
      { month: 'Jan', revenue: 2800 },
      { month: 'Feb', revenue: 3100 },
      { month: 'Mar', revenue: 2850 },
      { month: 'Apr', revenue: 0 }
    ],
    sessionTypes: {
      'Private Sessions': 45,
      'Group Sessions': 35,
      'Tournament Prep': 15,
      'Youth Programs': 5
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-on-scroll">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Coach {user?.username || 'Coach'}!
          </h1>
          <p className="text-gray-600">
            Here's your coaching overview and upcoming sessions.
          </p>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8 animate-on-scroll">
          {/* Custom Tabs Implementation */}
          <div className="w-full">
            {/* Tab Navigation */}
            <div className="grid w-full grid-cols-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'sessions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Sessions
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'students'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab('training')}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'training'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Training Plans
              </button>
              <button
                onClick={() => setActiveTab('credentials')}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'credentials'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Credentials
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'revenue'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Revenue
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="animate-on-scroll">
                  <Overview 
                    coachStats={coachStats}
                  />
                </div>
              )}

              {/* Sessions Tab */}
              {activeTab === 'sessions' && (
                <div className="animate-on-scroll">
                  <Sessions allSessions={allSessions} />
                </div>
              )}

              {/* Students Tab */}
              {activeTab === 'students' && (
                <div className="animate-on-scroll">
                  <Students studentProgress={studentProgress} />
                </div>
              )}

              {/* Training Plans Tab */}
              {activeTab === 'training' && (
                <div className="animate-on-scroll">
                  <TrainingPlans trainingPlans={trainingPlans} />
                </div>
              )}

              {/* Credentials Tab */}
              {activeTab === 'credentials' && (
                <div className="animate-on-scroll">
                  <Credentials credentials={credentials} />
                </div>
              )}

              {/* Revenue Tab */}
              {activeTab === 'revenue' && (
                <div className="animate-on-scroll">
                  <Revenue revenueData={revenueData} coachStats={coachStats} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard; 