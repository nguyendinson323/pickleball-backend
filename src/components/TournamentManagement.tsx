import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTournaments } from '../store/slices/tournamentsSlice';
import { 
  Tournament, 
  Match, 
  User, 
  AssignRefereeRequest, 
  AssignMatchRefereeRequest,
  RefereeStats 
} from '../types/api';
import {
  Calendar,
  Users,
  Trophy,
  User as UserIcon,
  MapPin,
  XCircle,
  UserCheck,
  Search,
  Download,
  Eye,
  Edit,
  UserPlus,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';

interface TournamentManagementProps {
  userRole: 'admin' | 'organizer' | 'participant';
  userId: string;
}

const TournamentManagement: React.FC<TournamentManagementProps> = ({ userRole, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tournaments, loading } = useSelector((state: RootState) => state.tournaments);
  
  const [activeTab, setActiveTab] = useState<'tournaments' | 'matches' | 'referees' | 'analytics'>('tournaments');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Referee management state
  const [availableReferees, setAvailableReferees] = useState<User[]>([]);
  const [selectedReferee, setSelectedReferee] = useState<string>('');
  const [assistantReferees, setAssistantReferees] = useState<string[]>([]);
  const [refereeCompensation, setRefereeCompensation] = useState<number>(0);
  const [showRefereeModal, setShowRefereeModal] = useState(false);
  const [showMatchRefereeModal, setShowMatchRefereeModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [refereeStats, setRefereeStats] = useState<Record<string, RefereeStats>>({});
  
  // Tournament matches
  const [tournamentMatches, setTournamentMatches] = useState<Match[]>([]);

  useEffect(() => {
    dispatch(fetchTournaments({ page: 1, limit: 50 }));
  }, [dispatch]);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(tournament => {
      const matchesSearch = !searchQuery || 
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.venue_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.organizer_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || tournament.status === filterStatus;
      const matchesType = filterType === 'all' || tournament.tournament_type === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [tournaments, searchQuery, filterStatus, filterType]);

  const loadTournamentMatches = async (tournamentId: string) => {
    try {
      const response = await api.get(`/tournaments/${tournamentId}/matches`);
      setTournamentMatches((response as any).data.matches || []);
    } catch (error) {
      toast.error('Failed to load tournament matches');
    }
  };

  const loadAvailableReferees = async (tournamentId: string, date?: string) => {
    try {
      const params = date ? `?date=${date}` : '';
      const response = await api.get(`/tournaments/${tournamentId}/available-referees${params}`);
      setAvailableReferees((response as any).data.referees || []);
    } catch (error) {
      toast.error('Failed to load available referees');
    }
  };

  const loadRefereeStats = async (refereeId: string) => {
    try {
      const response = await api.get(`/tournaments/referee-stats/${refereeId}`);
      setRefereeStats(prev => ({
        ...prev,
        [refereeId]: (response as any).data.stats
      }));
    } catch (error) {
      console.error('Failed to load referee stats:', error);
    }
  };

  const handleAssignTournamentReferee = async () => {
    if (!selectedTournament) return;

    const requestData: AssignRefereeRequest = {
      head_referee_id: selectedReferee || undefined,
      assistant_referees: assistantReferees,
      referee_compensation: refereeCompensation
    };

    try {
      await api.put(`/tournaments/${selectedTournament.id}/assign-referee`, requestData);
      toast.success('Referee assigned successfully');
      setShowRefereeModal(false);
      
      // Refresh tournament data
      dispatch(fetchTournaments({ page: 1, limit: 50 }));
    } catch (error) {
      toast.error('Failed to assign referee');
    }
  };

  const handleAssignMatchReferee = async () => {
    if (!selectedMatch || !selectedTournament || !selectedReferee) return;

    const requestData: AssignMatchRefereeRequest = {
      referee_id: selectedReferee
    };

    try {
      await api.put(
        `/tournaments/${selectedTournament.id}/matches/${selectedMatch.id}/assign-referee`,
        requestData
      );
      toast.success('Match referee assigned successfully');
      setShowMatchRefereeModal(false);
      
      // Refresh matches
      loadTournamentMatches(selectedTournament.id);
    } catch (error) {
      toast.error('Failed to assign match referee');
    }
  };

  const openRefereeModal = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setSelectedReferee(tournament.head_referee_id || '');
    setAssistantReferees(tournament.assistant_referees || []);
    setRefereeCompensation(tournament.referee_compensation || 0);
    loadAvailableReferees(tournament.id, tournament.start_date);
    setShowRefereeModal(true);
  };

  const openMatchRefereeModal = (match: Match, tournament: Tournament) => {
    setSelectedMatch(match);
    setSelectedTournament(tournament);
    setSelectedReferee(match.referee_id || '');
    loadAvailableReferees(tournament.id, match.scheduled_time);
    setShowMatchRefereeModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      case 'registration_open': return 'bg-green-100 text-green-800';
      case 'registration_closed': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'postponed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournament Management</h1>
              <p className="text-gray-600">
                {userRole === 'admin' ? 'Comprehensive tournament administration with referee tracking' :
                 userRole === 'organizer' ? 'Manage your tournaments and assign referees' :
                 'View tournaments and referee assignments'}
              </p>
            </div>
            {(userRole === 'admin' || userRole === 'organizer') && (
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>New Tournament</span>
                </button>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'tournaments'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Trophy className="h-4 w-4 mr-2 inline" />
              Tournaments
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'matches'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Target className="h-4 w-4 mr-2 inline" />
              Matches
            </button>
            <button
              onClick={() => setActiveTab('referees')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'referees'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UserCheck className="h-4 w-4 mr-2 inline" />
              Referees
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-2 inline" />
              Analytics
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tournaments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="registration_open">Registration Open</option>
                  <option value="registration_closed">Registration Closed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="local">Local</option>
                  <option value="state">State</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                  <option value="exhibition">Exhibition</option>
                  <option value="league">League</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'tournaments' && (
          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTournaments.map((tournament) => (
                  <div key={tournament.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tournament.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                            {tournament.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => loadTournamentMatches(tournament.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {(userRole === 'admin' || tournament.organizer_id === userId) && (
                            <>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openRefereeModal(tournament)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Assign Referee"
                              >
                                <UserPlus className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(tournament.start_date).toLocaleDateString()} - {new Date(tournament.end_date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{tournament.venue_name}, {tournament.city}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{tournament.current_participants}/{tournament.max_participants || '∞'} participants</span>
                        </div>

                        {tournament.headReferee && (
                          <div className="flex items-center text-sm text-green-600">
                            <UserCheck className="h-4 w-4 mr-2" />
                            <span>Referee: {tournament.headReferee.full_name}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3">
                          <div className="text-sm">
                            <span className="text-gray-500">Entry:</span>
                            <span className="font-medium ml-1">${tournament.entry_fee || 0}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Type:</span>
                            <span className="font-medium ml-1 capitalize">{tournament.tournament_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Match Management</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Players
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tournamentMatches.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Round {match.round}, Match {match.match_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {match.scheduled_time && new Date(match.scheduled_time).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {match.player1?.full_name} vs {match.player2?.full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {match.match_type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {match.referee ? (
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-900">{match.referee.full_name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No referee assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchStatusColor(match.status)}`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {(userRole === 'admin' || userRole === 'organizer') && selectedTournament && (
                          <button
                            onClick={() => openMatchRefereeModal(match, selectedTournament)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Assign Referee
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'referees' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Referee Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableReferees.map((referee) => (
                  <div key={referee.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{referee.full_name}</h4>
                        <p className="text-sm text-gray-500">{referee.state}, {referee.city}</p>
                      </div>
                    </div>
                    
                    {refereeStats[referee.id] && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tournaments:</span>
                          <span>{refereeStats[referee.id].total_tournaments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Matches:</span>
                          <span>{refereeStats[referee.id].total_matches_refereed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion:</span>
                          <span>{refereeStats[referee.id].completion_rate.toFixed(1)}%</span>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => loadRefereeStats(referee.id)}
                      className="w-full mt-3 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm"
                    >
                      View Stats
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tournaments</p>
                    <p className="text-2xl font-bold text-blue-600">{tournaments.length}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Tournaments</p>
                    <p className="text-2xl font-bold text-green-600">
                      {tournaments.filter(t => t.status === 'in_progress').length}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Referees</p>
                    <p className="text-2xl font-bold text-purple-600">{availableReferees.length}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Matches</p>
                    <p className="text-2xl font-bold text-orange-600">{tournamentMatches.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Referee Assignment Modal */}
      {showRefereeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowRefereeModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Assign Tournament Referee</h3>
                  <button
                    onClick={() => setShowRefereeModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Head Referee</label>
                    <select
                      value={selectedReferee}
                      onChange={(e) => setSelectedReferee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a referee</option>
                      {availableReferees.map(referee => (
                        <option key={referee.id} value={referee.id}>
                          {referee.full_name} - {referee.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referee Compensation</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={refereeCompensation}
                      onChange={(e) => setRefereeCompensation(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAssignTournamentReferee}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Assign Referee
                </button>
                <button
                  onClick={() => setShowRefereeModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Match Referee Assignment Modal */}
      {showMatchRefereeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowMatchRefereeModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Assign Match Referee</h3>
                  <button
                    onClick={() => setShowMatchRefereeModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                {selectedMatch && (
                  <div className="bg-gray-50 p-3 rounded mb-4">
                    <div className="text-sm text-gray-600">
                      <div><strong>Match:</strong> Round {selectedMatch.round}, Match {selectedMatch.match_number}</div>
                      <div><strong>Players:</strong> {selectedMatch.player1?.full_name} vs {selectedMatch.player2?.full_name}</div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Referee</label>
                  <select
                    value={selectedReferee}
                    onChange={(e) => setSelectedReferee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a referee</option>
                    {availableReferees.map(referee => (
                      <option key={referee.id} value={referee.id}>
                        {referee.full_name} - {referee.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAssignMatchReferee}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Assign Referee
                </button>
                <button
                  onClick={() => setShowMatchRefereeModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentManagement;