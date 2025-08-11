import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Award,
  Clock,
  Target
} from 'lucide-react';

const PlayerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

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

        {/* Main Content Grid */}
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
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Find Tournaments</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Find Players</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
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