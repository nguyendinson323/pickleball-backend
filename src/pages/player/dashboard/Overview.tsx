import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Target,
  MapPin,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface PlayerStats {
  tournamentsPlayed: number;
  tournamentsWon: number;
  currentRanking: number;
  rankingChange: string;
  totalPoints: number;
  matchesPlayed: number;
  winRate: number;
  nextTournament: string;
  nextTournamentDate: string;
  upcomingMatches: number;
  recentAchievements: string[];
}

interface ProfileCompletion {
  photo: boolean;
  idDocument: boolean;
  bio: boolean;
  contactInfo: boolean;
  location: boolean;
  total: number;
  completed: number;
}

interface AffiliationData {
  location: {
    state?: string;
    city?: string;
  };
  club?: any;
  membershipStatus?: string;
}

interface OverviewProps {
  playerStats: PlayerStats;
  profileCompletion: ProfileCompletion;
  affiliationData: AffiliationData;
}

const Overview: React.FC<OverviewProps> = ({ 
  playerStats, 
  profileCompletion, 
  affiliationData 
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  {affiliationData.location.state && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>State:</strong> {affiliationData.location.state}
                      </span>
                    </div>
                  )}
                  {affiliationData.location.city && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>City:</strong> {affiliationData.location.city}
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
                  {affiliationData.club ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          <strong>Club Member:</strong> Yes
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          <strong>Club:</strong> {affiliationData.club.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          <strong>Location:</strong> {affiliationData.club.city}, {affiliationData.club.state}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>Club Member:</strong> No
                      </span>
                    </div>
                  )}
                  {affiliationData.membershipStatus && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>Membership:</strong> 
                        <Badge variant="outline" className="ml-2 capitalize">
                          {affiliationData.membershipStatus}
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

      {/* Profile Completion Status */}
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

      {/* Quick Actions */}
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
              <Trophy className="h-6 w-6" />
              <span>Find Tournaments</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/player-finder')}
            >
              <Award className="h-6 w-6" />
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
  );
};

export default Overview; 