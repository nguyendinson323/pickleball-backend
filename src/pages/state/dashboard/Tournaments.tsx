import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Plus, 
  Eye, 
  Edit3, 
  BarChart3,
  Calendar,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../../../config/axios';
import { format, parseISO } from 'date-fns';

interface Tournament {
  id: string;
  name: string;
  tournament_type: 'local' | 'state' | 'national';
  category: 'singles' | 'doubles' | 'mixed_doubles' | 'team';
  description?: string;
  organizer_id: string;
  organizer_type: string;
  organizer_name: string;
  venue_name: string;
  venue_address: string;
  state: string;
  city: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  max_participants?: number;
  current_participants: number;
  min_participants: number;
  skill_levels?: string[];
  age_groups?: string[];
  gender_categories?: string[];
  format: 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss_system' | 'custom';
  entry_fee: number;
  prize_pool: number;
  prize_distribution?: Record<string, number>;
  status: 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
  rules?: string;
  equipment_requirements?: string;
  dress_code?: string;
  contact_email?: string;
  contact_phone?: string;
  registration_requirements?: any;
  registration_notes?: string;
  banner_image?: string;
  created_at: string;
  updated_at: string;
}

interface TournamentsProps {
  stateId?: string;
}

const Tournaments: React.FC<TournamentsProps> = ({ stateId }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  
  const [newTournament, setNewTournament] = useState({
    name: '',
    tournament_type: 'state' as 'local' | 'state' | 'national',
    category: 'doubles' as 'singles' | 'doubles' | 'mixed_doubles' | 'team',
    description: '',
    venue_name: '',
    venue_address: '',
    state: '',
    city: '',
    start_date: '',
    end_date: '',
    registration_deadline: '',
    max_participants: 64,
    min_participants: 16,
    skill_levels: ['all'],
    age_groups: [],
    gender_categories: ['mixed'],
    format: 'single_elimination' as 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss_system' | 'custom',
    entry_fee: 75,
    prize_pool: 0,
    prize_distribution: { '1st': 40, '2nd': 25, '3rd': 15, '4th': 10, 'Semifinalists': 5 },
    rules: '',
    equipment_requirements: '',
    dress_code: '',
    contact_email: '',
    contact_phone: '',
    registration_notes: '',
    banner_image: ''
  });

  useEffect(() => {
    fetchTournaments();
  }, [stateId]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/tournaments', {
        params: {
          organizer_type: 'state',
          organizer_id: stateId
        }
      });
      setTournaments(response.data.data.tournaments || []);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      toast.error('Failed to load tournaments');
    } finally {
      setLoading(false);
    }
  };
  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      case 'registration_open': return 'bg-green-100 text-green-800';
      case 'registration_closed': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleCreateTournament = async () => {
    if (!newTournament.name || !newTournament.start_date || !newTournament.venue_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const tournamentData = {
        ...newTournament,
        organizer_type: 'state',
        status: 'draft'
      };

      const response = await axiosInstance.post('/tournaments', tournamentData);
      
      if (response.data.success) {
        toast.success('State tournament created successfully!');
        setShowCreateModal(false);
        resetForm();
        fetchTournaments();
      }
    } catch (error: any) {
      console.error('Error creating tournament:', error);
      toast.error(error.response?.data?.message || 'Failed to create tournament');
    }
  };

  const resetForm = () => {
    setNewTournament({
      name: '',
      tournament_type: 'state',
      category: 'doubles',
      description: '',
      venue_name: '',
      venue_address: '',
      state: '',
      city: '',
      start_date: '',
      end_date: '',
      registration_deadline: '',
      max_participants: 64,
      min_participants: 16,
      skill_levels: ['all'],
      age_groups: [],
      gender_categories: ['mixed'],
      format: 'single_elimination',
      entry_fee: 75,
      prize_pool: 0,
      prize_distribution: { '1st': 40, '2nd': 25, '3rd': 15, '4th': 10, 'Semifinalists': 5 },
      rules: '',
      equipment_requirements: '',
      dress_code: '',
      contact_email: '',
      contact_phone: '',
      registration_notes: '',
      banner_image: ''
    });
  };

  const handleTournamentAction = async (tournament: Tournament, action: string) => {
    switch (action) {
      case 'view':
        // Navigate to tournament details
        window.open(`/tournaments/${tournament.id}`, '_blank');
        break;
      case 'edit':
        setEditingTournament(tournament);
        setShowCreateModal(true);
        break;
      case 'publish':
        try {
          await axiosInstance.put(`/tournaments/${tournament.id}`, { status: 'published' });
          toast.success('Tournament published successfully!');
          fetchTournaments();
        } catch (error: any) {
          toast.error('Failed to publish tournament');
        }
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this tournament?')) {
          try {
            await axiosInstance.delete(`/tournaments/${tournament.id}`);
            toast.success('Tournament deleted successfully!');
            fetchTournaments();
          } catch (error: any) {
            toast.error('Failed to delete tournament');
          }
        }
        break;
    }
  };

  const generateReport = async (type: string) => {
    try {
      const response = await axiosInstance.get('/tournaments/reports', {
        params: {
          type,
          organizer_type: 'state',
          organizer_id: stateId
        }
      });
      
      const reportData = response.data.data;
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `state-tournaments-${type}-report.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${type} report downloaded successfully!`);
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span>Tournament Management</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Organize State-Level Tournaments</h3>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Tournament</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tournament</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participants</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Entry Fee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{tournament.name}</div>
                      <div className="text-sm text-gray-500">{tournament.category.replace('_', ' ')} • {tournament.tournament_type}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-700">{format(parseISO(tournament.start_date), 'MMM dd, yyyy')}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {tournament.city}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{tournament.venue_name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-gray-700">
                        <Users className="h-4 w-4 mr-1" />
                        {tournament.current_participants}/{tournament.max_participants || 'Unlimited'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-gray-700">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {tournament.entry_fee}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTournamentStatusColor(tournament.status)}`}>
                        {formatStatus(tournament.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-green-600">
                        ${(tournament.current_participants * tournament.entry_fee).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleTournamentAction(tournament, 'view')}
                          className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTournamentAction(tournament, 'edit')}
                          className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                          title="Edit Tournament"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        {tournament.status === 'draft' && (
                          <button
                            onClick={() => handleTournamentAction(tournament, 'publish')}
                            className="p-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200"
                            title="Publish Tournament"
                          >
                            <span className="text-xs font-bold">✓</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleTournamentAction(tournament, 'delete')}
                          className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                          title="Delete Tournament"
                        >
                          <span className="text-xs font-bold">×</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tournament Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Tournaments</p>
                  <p className="text-2xl font-bold text-blue-900">{tournaments.length}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-900">
                    ${tournaments.reduce((sum, t) => sum + (t.current_participants * t.entry_fee), 0).toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Participants</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {tournaments.reduce((sum, t) => sum + t.current_participants, 0).toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-semibold">👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Generation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Generate Reports</h4>
            <div className="flex space-x-3">
              <button
                onClick={() => generateReport('participants')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Participant Report
              </button>
              <button
                onClick={() => generateReport('revenue')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Revenue Report
              </button>
              <button
                onClick={() => generateReport('schedule')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Tournament Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-5 mx-auto p-5 border w-[800px] max-h-[90vh] overflow-y-auto shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTournament ? 'Edit State Tournament' : 'Create New State Tournament'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tournament Name *</label>
                  <input
                    type="text"
                    value={newTournament.name}
                    onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter tournament name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTournament.category}
                    onChange={(e) => setNewTournament({...newTournament, category: e.target.value as any})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="singles">Singles</option>
                    <option value="doubles">Doubles</option>
                    <option value="mixed_doubles">Mixed Doubles</option>
                    <option value="team">Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={newTournament.start_date}
                    onChange={(e) => setNewTournament({...newTournament, start_date: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    value={newTournament.end_date}
                    onChange={(e) => setNewTournament({...newTournament, end_date: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline *</label>
                  <input
                    type="date"
                    value={newTournament.registration_deadline}
                    onChange={(e) => setNewTournament({...newTournament, registration_deadline: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input
                    type="number"
                    value={newTournament.max_participants}
                    onChange={(e) => setNewTournament({...newTournament, max_participants: parseInt(e.target.value) || 0})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee ($)</label>
                  <input
                    type="number"
                    value={newTournament.entry_fee}
                    onChange={(e) => setNewTournament({...newTournament, entry_fee: parseFloat(e.target.value) || 0})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prize Pool ($)</label>
                  <input
                    type="number"
                    value={newTournament.prize_pool}
                    onChange={(e) => setNewTournament({...newTournament, prize_pool: parseFloat(e.target.value) || 0})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tournament Format</label>
                  <select
                    value={newTournament.format}
                    onChange={(e) => setNewTournament({...newTournament, format: e.target.value as any})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="single_elimination">Single Elimination</option>
                    <option value="double_elimination">Double Elimination</option>
                    <option value="round_robin">Round Robin</option>
                    <option value="swiss_system">Swiss System</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    value={newTournament.venue_name}
                    onChange={(e) => setNewTournament({...newTournament, venue_name: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter venue name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={newTournament.city}
                    onChange={(e) => setNewTournament({...newTournament, city: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={newTournament.state}
                    onChange={(e) => setNewTournament({...newTournament, state: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter state"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Address</label>
                  <input
                    type="text"
                    value={newTournament.venue_address}
                    onChange={(e) => setNewTournament({...newTournament, venue_address: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full venue address"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTournament.description}
                    onChange={(e) => setNewTournament({...newTournament, description: e.target.value})}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter tournament description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={newTournament.contact_email}
                    onChange={(e) => setNewTournament({...newTournament, contact_email: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contact email for participants"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={newTournament.contact_phone}
                    onChange={(e) => setNewTournament({...newTournament, contact_phone: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contact phone number"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingTournament(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateTournament}
                >
                  {editingTournament ? 'Update Tournament' : 'Create Tournament'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments; 