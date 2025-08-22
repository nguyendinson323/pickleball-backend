import React, { useState, useEffect } from 'react';
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
  clubId?: string;
}

const Tournaments: React.FC<TournamentsProps> = ({ clubId }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, [clubId]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/tournaments', {
        params: {
          organizer_type: 'club',
          organizer_id: clubId
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

  const [newTournament, setNewTournament] = useState({
    name: '',
    tournament_type: 'local' as 'local' | 'state' | 'national',
    category: 'doubles' as 'singles' | 'doubles' | 'mixed_doubles' | 'team',
    description: '',
    venue_name: '',
    venue_address: '',
    state: '',
    city: '',
    start_date: '',
    end_date: '',
    registration_deadline: '',
    max_participants: 32,
    min_participants: 8,
    skill_levels: ['all'],
    age_groups: [],
    gender_categories: ['mixed'],
    format: 'single_elimination' as 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss_system' | 'custom',
    entry_fee: 50,
    prize_pool: 0,
    prize_distribution: { '1st': 50, '2nd': 30, '3rd': 20 },
    rules: '',
    equipment_requirements: '',
    dress_code: '',
    contact_email: '',
    contact_phone: '',
    registration_notes: '',
    banner_image: ''
  });

  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: 0
  });

  const [invoiceData, setInvoiceData] = useState({
    items: [
      { description: 'Tournament Entry Fee', quantity: 1, unit_price: 0 }
    ],
    due_date: '',
    notes: ''
  });

  const handleCreateTournament = async () => {
    if (!newTournament.name || !newTournament.start_date || !newTournament.venue_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const tournamentData = {
        ...newTournament,
        organizer_type: 'club',
        status: 'draft'
      };

      const response = await axiosInstance.post('/tournaments', tournamentData);
      
      if (response.data.success) {
        toast.success('Tournament created successfully!');
        setShowCreateForm(false);
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
      tournament_type: 'local',
      category: 'doubles',
      description: '',
      venue_name: '',
      venue_address: '',
      state: '',
      city: '',
      start_date: '',
      end_date: '',
      registration_deadline: '',
      max_participants: 32,
      min_participants: 8,
      skill_levels: ['all'],
      age_groups: [],
      gender_categories: ['mixed'],
      format: 'single_elimination',
      entry_fee: 50,
      prize_pool: 0,
      prize_distribution: { '1st': 50, '2nd': 30, '3rd': 20 },
      rules: '',
      equipment_requirements: '',
      dress_code: '',
      contact_email: '',
      contact_phone: '',
      registration_notes: '',
      banner_image: ''
    });
  };

  const handleEditTournament = (tournament: Tournament) => {
    setEditingTournament(tournament);
    setNewTournament({
      name: tournament.name,
      tournament_type: tournament.tournament_type,
      category: tournament.category,
      description: tournament.description || '',
      venue_name: tournament.venue_name,
      venue_address: tournament.venue_address,
      state: tournament.state,
      city: tournament.city,
      start_date: tournament.start_date ? format(parseISO(tournament.start_date), 'yyyy-MM-dd') : '',
      end_date: tournament.end_date ? format(parseISO(tournament.end_date), 'yyyy-MM-dd') : '',
      registration_deadline: tournament.registration_deadline ? format(parseISO(tournament.registration_deadline), 'yyyy-MM-dd') : '',
      max_participants: tournament.max_participants || 32,
      min_participants: tournament.min_participants,
      skill_levels: tournament.skill_levels || ['all'],
      age_groups: tournament.age_groups || [],
      gender_categories: tournament.gender_categories || ['mixed'],
      format: tournament.format,
      entry_fee: tournament.entry_fee,
      prize_pool: tournament.prize_pool,
      prize_distribution: tournament.prize_distribution || { '1st': 50, '2nd': 30, '3rd': 20 },
      rules: tournament.rules || '',
      equipment_requirements: tournament.equipment_requirements || '',
      dress_code: tournament.dress_code || '',
      contact_email: tournament.contact_email || '',
      contact_phone: tournament.contact_phone || '',
      registration_notes: tournament.registration_notes || '',
      banner_image: tournament.banner_image || ''
    });
    setShowCreateForm(true);
  };

  const handleUpdateTournament = async () => {
    if (!editingTournament) return;

    try {
      const response = await axiosInstance.put(`/tournaments/${editingTournament.id}`, newTournament);
      
      if (response.data.success) {
        toast.success('Tournament updated successfully!');
        setShowCreateForm(false);
        setEditingTournament(null);
        resetForm();
        fetchTournaments();
      }
    } catch (error: any) {
      console.error('Error updating tournament:', error);
      toast.error(error.response?.data?.message || 'Failed to update tournament');
    }
  };

  const handleAddExpense = async () => {
    if (!selectedTournament || !expenseData.description || expenseData.amount <= 0) {
      toast.error('Please fill in expense details');
      return;
    }

    try {
      // Create expense record via API
      const expensePayload = {
        tournament_id: selectedTournament.id,
        description: expenseData.description,
        amount: expenseData.amount,
        category: 'tournament_expense'
      };

      await axiosInstance.post('/expenses', expensePayload);
      
      setShowExpenseModal(false);
      setExpenseData({ description: '', amount: 0 });
      setSelectedTournament(null);
      toast.success('Expense added successfully!');
      fetchTournaments();
    } catch (error: any) {
      console.error('Error adding expense:', error);
      toast.error(error.response?.data?.message || 'Failed to add expense');
    }
  };

  const generateReport = async (tournament: Tournament) => {
    try {
      const response = await axiosInstance.get(`/tournaments/${tournament.id}/stats`);
      const stats = response.data.data.stats;
      
      const report = `
Tournament Report: ${tournament.name}
Date: ${format(parseISO(tournament.start_date), 'MMMM dd, yyyy')}
Location: ${tournament.venue_name}, ${tournament.city}
Participants: ${tournament.current_participants}/${tournament.max_participants || 'Unlimited'}
Entry Fee: $${tournament.entry_fee}
Prize Pool: $${tournament.prize_pool}
Total Revenue: $${(tournament.current_participants * tournament.entry_fee).toLocaleString()}
Status: ${tournament.status}
Registration Rate: ${stats.registration_rate?.toFixed(1)}%
Completion Rate: ${stats.completion_rate?.toFixed(1)}%
      `;
      
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tournament-${tournament.name.replace(/\s+/g, '-')}-report.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    }
  };

  const getStatusColor = (status: string) => {
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

  const handleCreateInvoice = async () => {
    if (!selectedTournament) return;

    try {
      const invoicePayload = {
        ...invoiceData,
        tournament_id: selectedTournament.id,
        amount: invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
      };

      const response = await axiosInstance.post('/payments/invoice', invoicePayload);
      
      if (response.data.success) {
        toast.success('Invoice created successfully!');
        setShowInvoiceModal(false);
        setInvoiceData({
          items: [{ description: 'Tournament Entry Fee', quantity: 1, unit_price: 0 }],
          due_date: '',
          notes: ''
        });
        setSelectedTournament(null);
      }
    } catch (error: any) {
      console.error('Error creating invoice:', error);
      toast.error(error.response?.data?.message || 'Failed to create invoice');
    }
  };

  const handlePublishTournament = async (tournament: Tournament) => {
    try {
      const response = await axiosInstance.put(`/tournaments/${tournament.id}`, {
        status: 'published'
      });
      
      if (response.data.success) {
        toast.success('Tournament published successfully!');
        fetchTournaments();
      }
    } catch (error: any) {
      console.error('Error publishing tournament:', error);
      toast.error(error.response?.data?.message || 'Failed to publish tournament');
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
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tournament Management</h2>
        <button 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowCreateForm(true)}
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Tournament
        </button>
      </div>

      {/* Create/Edit Tournament Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTournament ? 'Edit Tournament' : 'Create New Tournament'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Tournament Type</label>
              <select
                value={newTournament.tournament_type}
                onChange={(e) => setNewTournament({...newTournament, tournament_type: e.target.value as any})}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="local">Local</option>
                <option value="state">State</option>
                <option value="national">National</option>
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
                onChange={(e) => setNewTournament({...newTournament, max_participants: parseInt(e.target.value)})}
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prizes</label>
              <textarea
                value={newTournament.prizes}
                onChange={(e) => setNewTournament({...newTournament, prizes: e.target.value})}
                rows={2}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe prizes and awards"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rules & Regulations</label>
              <textarea
                value={newTournament.rules}
                onChange={(e) => setNewTournament({...newTournament, rules: e.target.value})}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tournament rules and regulations"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                setShowCreateForm(false);
                setEditingTournament(null);
                setNewTournament({
                  name: '', date: '', startTime: '', endTime: '', maxParticipants: 32,
                  entryFee: 50, description: '', location: '', tournamentType: 'doubles',
                  skillLevel: 'all', prizes: '', rules: ''
                });
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              onClick={editingTournament ? handleUpdateTournament : handleCreateTournament}
            >
              {editingTournament ? 'Update Tournament' : 'Create Tournament'}
            </button>
          </div>
        </div>
      )}

      {/* Tournaments List */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Tournaments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tournament</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Pool</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{tournament.name}</div>
                      <div className="text-sm text-gray-500">{tournament.category.replace('_', ' ')} • {tournament.tournament_type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{format(parseISO(tournament.start_date), 'MMM dd, yyyy')}</div>
                    <div className="text-sm text-gray-500">{tournament.venue_name}, {tournament.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tournament.current_participants}/{tournament.max_participants || 'Unlimited'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${tournament.entry_fee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${tournament.prize_pool}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ${(tournament.current_participants * tournament.entry_fee).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tournament.status)}`}>
                      {formatStatus(tournament.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => handleEditTournament(tournament)}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      {tournament.status === 'draft' && (
                        <button
                          className="inline-flex items-center px-3 py-1 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100"
                          onClick={() => handlePublishTournament(tournament)}
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Publish
                        </button>
                      )}
                      <button
                        className="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
                        onClick={() => {
                          setSelectedTournament(tournament);
                          setInvoiceData({
                            ...invoiceData,
                            items: [{ description: 'Tournament Entry Fee', quantity: 1, unit_price: tournament.entry_fee }]
                          });
                          setShowInvoiceModal(true);
                        }}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Create Invoice
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => {
                          setSelectedTournament(tournament);
                          setShowExpenseModal(true);
                        }}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Expense
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => generateReport(tournament)}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Report
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showExpenseModal && selectedTournament && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Expense for {selectedTournament.name}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expense Description</label>
                  <input
                    type="text"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Equipment rental, prizes, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({...expenseData, amount: parseFloat(e.target.value) || 0})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleAddExpense}
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showInvoiceModal && selectedTournament && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create Invoice for {selectedTournament.name}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Items</label>
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 mb-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...invoiceData.items];
                          newItems[index].description = e.target.value;
                          setInvoiceData({...invoiceData, items: newItems});
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...invoiceData.items];
                          newItems[index].quantity = parseInt(e.target.value) || 0;
                          setInvoiceData({...invoiceData, items: newItems});
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Qty"
                        min="1"
                      />
                      <input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => {
                          const newItems = [...invoiceData.items];
                          newItems[index].unit_price = parseFloat(e.target.value) || 0;
                          setInvoiceData({...invoiceData, items: newItems});
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unit Price"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => {
                      setInvoiceData({
                        ...invoiceData,
                        items: [...invoiceData.items, { description: '', quantity: 1, unit_price: 0 }]
                      });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Item
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={invoiceData.due_date}
                    onChange={(e) => setInvoiceData({...invoiceData, due_date: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes for the invoice..."
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      Total: ${invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    setShowInvoiceModal(false);
                    setInvoiceData({
                      items: [{ description: 'Tournament Entry Fee', quantity: 1, unit_price: 0 }],
                      due_date: '',
                      notes: ''
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateInvoice}
                >
                  Create Invoice
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