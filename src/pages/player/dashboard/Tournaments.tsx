import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Trophy, Calendar, Award } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

interface PlayerStats {
  tournamentsPlayed: number;
  tournamentsWon: number;
  nextTournament: string;
  nextTournamentDate: string;
  upcomingMatches: number;
}

interface TournamentsProps {
  playerStats: PlayerStats;
}

const Tournaments: React.FC<TournamentsProps> = ({ playerStats }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Next Tournament */}
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

      {/* Tournament Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournaments Played</CardTitle>
            <Trophy className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{playerStats.tournamentsPlayed}</div>
            <p className="text-xs text-gray-600">total tournaments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournaments Won</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{playerStats.tournamentsWon}</div>
            <p className="text-xs text-gray-600">championships</p>
          </CardContent>
        </Card>
      </div>

      {/* Tournament History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tournament Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Winter League Finals</h5>
                <p className="text-sm text-gray-600">March 2024</p>
              </div>
              <div className="text-right">
                <Badge variant="default" className="bg-green-100 text-green-800">Winner</Badge>
                <p className="text-sm text-green-600 mt-1">+150 points</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Club Championship</h5>
                <p className="text-sm text-gray-600">February 2024</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">Semi-Final</Badge>
                <p className="text-sm text-blue-600 mt-1">+100 points</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Fall Classic</h5>
                <p className="text-sm text-gray-600">November 2023</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">Quarter-Final</Badge>
                <p className="text-sm text-gray-600 mt-1">+75 points</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
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
              View Rankings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tournament Calendar Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Tournament Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Tournament calendar will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tournaments; 