import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Award,
  Clock,
  Target,
  QrCode,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [canBeFound, setCanBeFound] = useState(user?.can_be_found ?? true);
  const [activeTab, setActiveTab] = useState('overview');

  // Handle privacy setting change
  const handlePrivacyChange = async (checked: boolean) => {
    try {
      // In a real app, this would make an API call to update the user's privacy setting
      // await api.put(`/users/${user?.id}/privacy`, { can_be_found: checked });
      setCanBeFound(checked);
      // Show success message
      console.log('Privacy setting updated:', checked);
    } catch (error) {
      console.error('Failed to update privacy setting:', error);
      // Revert the change if the API call fails
      setCanBeFound(!checked);
    }
  };

  // Mock data - in real app this would come from API
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

  // Enhanced mock data for digital credential
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

  const recentActivity = [
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username || 'Player'}!
          </h1>
          <p className="text-gray-600">
            Here's your pickleball journey overview and recent activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tournaments Won</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{playerStats.tournamentsWon}</div>
              <p className="text-xs text-gray-600">out of {playerStats.tournamentsPlayed} played</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Ranking</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">#{playerStats.currentRanking}</div>
              <p className="text-xs text-green-600">{playerStats.rankingChange} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{playerStats.winRate}%</div>
              <p className="text-xs text-gray-600">{playerStats.matchesPlayed} matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Target className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{playerStats.totalPoints}</div>
              <p className="text-xs text-gray-600">lifetime points</p>
            </CardContent>
          </Card>
        </div>

        {/* Affiliation Information */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-indigo-500" />
                <span>Affiliation & Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                    <div className="space-y-2">
                      {user?.state && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            <strong>State:</strong> {user.state}
                          </span>
                        </div>
                      )}
                      {user?.city && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            <strong>City:</strong> {user.city}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Club Affiliation</h4>
                    <div className="space-y-2">
                      {user?.club_id ? (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">
                              <strong>Club Member:</strong> Yes
                            </span>
                          </div>
                          {user?.club && (
                            <>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">
                                  <strong>Club:</strong> {user.club.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">
                                  <strong>Location:</strong> {user.club.city}, {user.club.state}
                                </span>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            <strong>Club Member:</strong> No
                          </span>
                        </div>
                      )}
                      {user?.membership_status && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            <strong>Membership:</strong> 
                            <Badge variant="outline" className="ml-2 capitalize">
                              {user.membership_status}
                            </Badge>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion Status */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Profile Completion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-bold text-gray-900">
                    {profileCompletion.completed}/{profileCompletion.total} ({Math.round((profileCompletion.completed / profileCompletion.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(profileCompletion.completed / profileCompletion.total) * 100}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    {profileCompletion.photo ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={profileCompletion.photo ? 'text-gray-700' : 'text-yellow-600'}>
                      Profile Photo
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {profileCompletion.idDocument ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={profileCompletion.idDocument ? 'text-gray-700' : 'text-yellow-600'}>
                      ID Document
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {profileCompletion.bio ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={profileCompletion.bio ? 'text-gray-700' : 'text-yellow-600'}>
                      Bio
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {profileCompletion.contactInfo ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={profileCompletion.contactInfo ? 'text-gray-700' : 'text-yellow-600'}>
                      Contact Info
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {profileCompletion.location ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={profileCompletion.location ? 'text-gray-700' : 'text-yellow-600'}>
                      Location
                    </span>
                  </div>
                </div>
                {profileCompletion.completed < profileCompletion.total && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/player/profile')}
                  >
                    Complete Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Settings */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Privacy Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {canBeFound ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-gray-500" />}
                      <span className="font-medium text-gray-900">
                        {canBeFound ? 'Can Be Found' : 'Not Visible'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {canBeFound 
                        ? 'Other players can find you in player search results' 
                        : 'You will not appear in player search results'
                      }
                    </p>
                  </div>
                  <Switch
                    checked={canBeFound}
                    onCheckedChange={handlePrivacyChange}
                    className="ml-4"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Privacy Notice</p>
                      <p className="mt-1">
                        When visible, other players can see your basic information (name, skill level, city) 
                        to contact you for matches. Your personal contact details remain private.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="credential">Digital Credential</TabsTrigger>
              <TabsTrigger value="matches">Match History</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Next Tournament */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <span>Next Tournament</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {playerStats.nextTournament}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {new Date(playerStats.nextTournamentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <div className="flex justify-center space-x-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{playerStats.upcomingMatches}</div>
                            <div className="text-sm text-gray-600">Upcoming Matches</div>
                          </div>
                        </div>
                        <Button className="w-full">View Tournament Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {playerStats.recentAchievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Digital Credential Tab */}
            <TabsContent value="credential" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="h-5 w-5 text-purple-500" />
                    <span>Digital Credential</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Credential Info */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Player ID</span>
                          <span className="text-sm font-bold text-gray-900">{digitalCredential.playerId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Full Name</span>
                          <span className="text-sm font-bold text-gray-900">{digitalCredential.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Skill Level</span>
                          <Badge variant="outline">{digitalCredential.skillLevel}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Membership</span>
                          <Badge variant="outline" className="capitalize">{digitalCredential.membershipStatus}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Expires</span>
                          <span className="text-sm text-gray-900">{digitalCredential.membershipExpires}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Status</span>
                          <Badge variant={digitalCredential.verified ? "default" : "secondary"}>
                            {digitalCredential.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => {
                            // In a real app, this would generate and download a PDF credential
                            console.log('Download digital credential');
                          }}
                        >
                          Download Credential
                        </Button>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <img 
                          src={digitalCredential.qrCode} 
                          alt="Player QR Code" 
                          className="w-32 h-32"
                        />
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        Scan this QR code to verify player credentials
                      </p>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          Last verified: {digitalCredential.lastVerified}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Match History Tab */}
            <TabsContent value="matches" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span>Match History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchHistory.map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            match.result === 'Won' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {match.result === 'Won' ? <Trophy className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">vs. {match.opponent}</h4>
                            <p className="text-sm text-gray-600">{match.tournament}</p>
                            <p className="text-xs text-gray-500">{match.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{match.score}</p>
                          <p className={`text-sm ${match.result === 'Won' ? 'text-green-600' : 'text-red-600'}`}>
                            {match.points}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Tournament Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Upcoming Tournaments */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Upcoming Tournaments</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-900">{playerStats.nextTournament}</h5>
                            <p className="text-sm text-gray-600">{playerStats.nextTournamentDate}</p>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>

                    {/* Tournament Statistics */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Tournament Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{playerStats.tournamentsPlayed}</div>
                          <div className="text-sm text-gray-600">Total Played</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{playerStats.tournamentsWon}</div>
                          <div className="text-sm text-gray-600">Won</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className="h-12"
                          onClick={() => navigate('/tournaments')}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Find Tournaments
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-12"
                          onClick={() => navigate('/rankings')}
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          View Results
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'tournament' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'match' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'tournament' ? <Trophy className="h-5 w-5" /> :
                         activity.type === 'match' ? <Users className="h-5 w-5" /> :
                         <TrendingUp className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{activity.result}</p>
                      <p className="text-sm text-green-600">{activity.points}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => navigate('/tournaments')}
                >
                  <Calendar className="h-6 w-6" />
                  <span>Find Tournaments</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => navigate('/player-finder')}
                >
                  <Users className="h-6 w-6" />
                  <span>Find Players</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => navigate('/court-reservations')}
                >
                  <MapPin className="h-6 w-6" />
                  <span>Book Court</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard; 