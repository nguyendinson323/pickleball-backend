import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTournaments, registerForTournament } from '../../store/slices/tournamentsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Star, CalendarDays } from 'lucide-react';
import { Tournament } from '../../types/api';
import { toast } from 'sonner';
import { useAnimation } from '../../hooks/useAnimation';

const TournamentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tournaments, loading, error, pagination } = useSelector((state: RootState) => state.tournaments);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { elementRef: headerRef } = useAnimation();
  
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    tournament_type: 'all' | 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
    category: 'all' | 'singles' | 'doubles' | 'mixed_doubles' | 'team';
    status: 'all' | 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
    state: string;
    city: string;
    search: string;
  }>({
    page: 1,
    limit: 12,
    tournament_type: 'all',
    category: 'all',
    status: 'all',
    state: '',
    city: '',
    search: ''
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      tournament_type: filters.tournament_type === 'all' ? undefined : filters.tournament_type,
      category: filters.category === 'all' ? undefined : filters.category,
      status: filters.status === 'all' ? undefined : filters.status
    } as any;
    dispatch(fetchTournaments(apiFilters));
  }, [dispatch, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleRegister = async (tournamentId: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to register for tournaments');
      return;
    }

    try {
      await dispatch(registerForTournament({ tournamentId, registrationData: {} })).unwrap();
      toast.success('Successfully registered for tournament!');
    } catch (error) {
      toast.error('Failed to register for tournament');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration_open': return 'bg-green-100 text-green-800';
      case 'registration_closed': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTournamentTypeColor = (type: string) => {
    switch (type) {
      case 'national': return 'bg-purple-100 text-purple-800';
      case 'international': return 'bg-indigo-100 text-indigo-800';
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'local': return 'bg-green-100 text-green-800';
      case 'exhibition': return 'bg-orange-100 text-orange-800';
      case 'league': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const isRegistrationOpen = (tournament: Tournament) => {
    if (!tournament.registration_deadline) return false;
    try {
      return tournament.status === 'registration_open' && 
             new Date(tournament.registration_deadline) > new Date();
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="animate-on-scroll text-4xl font-bold text-gray-900 mb-6">
            Tournaments
          </h1>
          <p className="animate-on-scroll text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and register for pickleball tournaments near you. From local competitions 
            to national championships, find your next challenge.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Input
              placeholder="Search tournaments..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="animate-on-scroll"
            />
            <Select value={filters.tournament_type} onValueChange={(value) => handleFilterChange('tournament_type', value)}>
              <SelectTrigger className="animate-on-scroll">
                <SelectValue placeholder="Tournament Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="exhibition">Exhibition</SelectItem>
                <SelectItem value="league">League</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger className="animate-on-scroll">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="singles">Singles</SelectItem>
                <SelectItem value="doubles">Doubles</SelectItem>
                <SelectItem value="mixed_doubles">Mixed Doubles</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="animate-on-scroll">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="registration_open">Registration Open</SelectItem>
                <SelectItem value="registration_closed">Registration Closed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="animate-on-scroll"
            />
            <Input
              placeholder="State"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="animate-on-scroll"
            />
          </div>
        </div>

        {/* Tournaments Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tournaments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600">Error loading tournaments: {error}</p>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tournaments found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new tournaments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {tournaments.map((tournament, index) => (
              <div key={tournament.id}>
                <Card className="animate-on-scroll card h-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getTournamentTypeColor(tournament.tournament_type)}>
                        {tournament.tournament_type}
                      </Badge>
                      <Badge className={getStatusColor(tournament.status)}>
                        {tournament.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {tournament.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {tournament.description || 'No description available'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{tournament.city || 'TBD'}, {tournament.state || 'TBD'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{tournament.max_participants || 'Unlimited'} participants max</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Trophy className="w-4 h-4 mr-2" />
                        <span>{tournament.category}</span>
                      </div>
                      {tournament.entry_fee && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span>Entry Fee: ${tournament.entry_fee}</span>
                        </div>
                      )}
                      {tournament.registration_deadline && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Registration Deadline: {formatDate(tournament.registration_deadline)}</span>
                        </div>
                      )}
                    </div>
                    

                    
                    <div className="pt-4">
                      {isRegistrationOpen(tournament) ? (
                        <Button 
                          onClick={() => handleRegister(tournament.id)}
                          className="w-full hover:scale-105 transition-transform duration-300"
                        >
                          Register Now
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          disabled 
                          className="w-full"
                        >
                          Registration Closed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
              className="hover:scale-105 transition-transform duration-300"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-gray-600">
              Page {filters.page} of {pagination.pages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === pagination.pages}
              className="hover:scale-105 transition-transform duration-300"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentsPage; 