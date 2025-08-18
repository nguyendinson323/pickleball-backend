import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Award } from 'lucide-react';

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
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Next Tournament</span>
          </h3>
        </div>
        <div className="p-6">
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
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg">
              View Tournament Details
            </button>
          </div>
        </div>
      </div>

      {/* Tournament Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-on-scroll">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Tournaments Played</h3>
            <Trophy className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{playerStats.tournamentsPlayed}</div>
          <p className="text-xs text-gray-600">total tournaments</p>
        </div>

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Tournaments Won</h3>
            <Award className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">{playerStats.tournamentsWon}</div>
          <p className="text-xs text-gray-600">championships</p>
        </div>
      </div>

      {/* Tournament History */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Tournament Results</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Winter League Finals</h5>
                <p className="text-sm text-gray-600">March 2024</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Winner
                </span>
                <p className="text-sm text-green-600 mt-1">+150 points</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Club Championship</h5>
                <p className="text-sm text-gray-600">February 2024</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                  Semi-Final
                </span>
                <p className="text-sm text-blue-600 mt-1">+100 points</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Fall Classic</h5>
                <p className="text-sm text-gray-600">November 2023</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                  Quarter-Final
                </span>
                <p className="text-sm text-gray-600 mt-1">+75 points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button 
              className="h-12 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 hover:shadow-lg flex items-center justify-center"
              onClick={() => navigate('/tournaments')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Find Tournaments
            </button>
            <button 
              className="h-12 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 hover:shadow-lg flex items-center justify-center"
              onClick={() => navigate('/rankings')}
            >
              <Trophy className="h-4 w-4 mr-2" />
              View Rankings
            </button>
          </div>
        </div>
      </div>

      {/* Tournament Calendar Placeholder */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Tournament Calendar</h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Tournament calendar will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournaments; 