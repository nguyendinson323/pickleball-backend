import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { RefereeStats } from '../types/api';
import {
  Award,
  DollarSign,
  TrendingUp,
  Target,
  CheckCircle,
  Trophy,
  Star,
  BarChart3,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';

const RefereeDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [refereeStats, setRefereeStats] = useState<RefereeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'year' | 'month'>('all');

  useEffect(() => {
    if (user && user.user_type === 'coach') {
      loadRefereeStats();
    }
  }, [user]);

  const loadRefereeStats = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await api.get(`/tournaments/referee-stats/${user.id}`);
      setRefereeStats((response as any).data.stats);
    } catch (error) {
      toast.error('Failed to load referee statistics');
    } finally {
      setLoading(false);
    }
  };

  const exportRefereeHistory = () => {
    if (!refereeStats) return;

    const csvContent = [
      ['Date', 'Tournament', 'Match', 'Players', 'Status', 'Duration'].join(','),
      ...refereeStats.recent_matches.map(match => [
        new Date(match.scheduled_time || '').toLocaleDateString(),
        match.tournament?.name || 'N/A',
        `Round ${match.round}, Match ${match.match_number}`,
        `${match.player1?.full_name} vs ${match.player2?.full_name}`,
        match.status,
        match.duration_minutes ? `${match.duration_minutes} min` : 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referee-history-${user?.username}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!user || user.user_type !== 'coach') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Referee dashboard is only available for coaches.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!refereeStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No referee statistics available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Referee Dashboard</h1>
              <p className="text-gray-600">
                Track your referee performance and tournament history
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
              </select>
              <button
                onClick={exportRefereeHistory}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tournaments</p>
                  <p className="text-2xl font-bold text-blue-600">{refereeStats.total_tournaments}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Head: {refereeStats.tournaments_as_head_referee} | Assistant: {refereeStats.tournaments_as_assistant}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Matches Refereed</p>
                  <p className="text-2xl font-bold text-green-600">{refereeStats.total_matches_refereed}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Completed: {refereeStats.completed_matches}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{refereeStats.completion_rate.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Performance metric
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Compensation</p>
                  <p className="text-2xl font-bold text-orange-600">${refereeStats.total_compensation.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Earnings to date
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Matches
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Tournament
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Players
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refereeStats.recent_matches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {match.scheduled_time && new Date(match.scheduled_time).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {match.tournament?.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {match.tournament?.tournament_type} • {match.tournament?.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Round {match.round}, Match {match.match_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        {match.match_type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {match.player1?.full_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        vs {match.player2?.full_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        match.status === 'completed' ? 'bg-green-100 text-green-800' :
                        match.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        match.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {match.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {match.duration_minutes ? `${match.duration_minutes} min` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {refereeStats.recent_matches.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No matches refereed yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tournament Types */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Tournament Experience
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Head Referee Positions</span>
                <span className="font-semibold">{refereeStats.tournaments_as_head_referee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assistant Referee Positions</span>
                <span className="font-semibold">{refereeStats.tournaments_as_assistant}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average per Tournament</span>
                <span className="font-semibold">
                  {refereeStats.total_tournaments > 0 
                    ? (refereeStats.total_matches_refereed / refereeStats.total_tournaments).toFixed(1)
                    : '0'} matches
                </span>
              </div>
            </div>
          </div>

          {/* Career Highlights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Career Highlights
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-blue-900">Completion Rate</div>
                    <div className="text-sm text-blue-700">
                      {refereeStats.completion_rate.toFixed(1)}% of assigned matches completed
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium text-green-900">Total Earnings</div>
                    <div className="text-sm text-green-700">
                      ${refereeStats.total_compensation.toFixed(2)} from referee activities
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="font-medium text-purple-900">Experience Level</div>
                    <div className="text-sm text-purple-700">
                      {refereeStats.total_tournaments >= 10 ? 'Experienced' :
                       refereeStats.total_tournaments >= 5 ? 'Intermediate' : 'Beginner'} Referee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeDashboard;