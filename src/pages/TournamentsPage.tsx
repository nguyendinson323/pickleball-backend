import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchTournaments, registerForTournament } from '../store/slices/tournamentsSlice';
import { motion } from 'framer-motion';
import { getAnimationVariants } from '../lib/animations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Star, CalendarDays } from 'lucide-react';
import { Tournament } from '../types/api';
import { toast } from 'sonner';

const TournamentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tournaments, loading, error, pagination } = useSelector((state: RootState) => state.tournaments);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    tournament_type: '' | 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
    category: '' | 'singles' | 'doubles' | 'mixed_doubles' | 'team';
    status: '' | 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
    state: string;
    city: string;
    search: string;
  }>({
    page: 1,
    limit: 12,
    tournament_type: '',
    category: '',
    status: '',
    state: '',
    city: '',
    search: ''
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      tournament_type: filters.tournament_type || undefined,
      category: filters.category || undefined,
      status: filters.status || undefined
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isRegistrationOpen = (tournament: Tournament) => {
    return tournament.status === 'registration_open' && 
           new Date(tournament.registration_deadline) > new Date();
  };

  if (loading && tournaments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tournaments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('up', 0.7, 0.1)}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tournament Central
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover and compete in the best pickleball tournaments across the nation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('up', 0.7, 0.2)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <Input
                placeholder="Search tournaments..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={filters.tournament_type} onValueChange={(value) => handleFilterChange('tournament_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tournament Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="league">League</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="singles">Singles</SelectItem>
                  <SelectItem value="doubles">Doubles</SelectItem>
                  <SelectItem value="mixed_doubles">Mixed Doubles</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="registration_open">Registration Open</SelectItem>
                  <SelectItem value="registration_closed">Registration Closed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tournaments Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={getAnimationVariants('up', 0.7, 0.1)}
              className="text-center py-8"
            >
              <p className="text-red-600 text-lg">{error}</p>
            </motion.div>
          )}

          {tournaments.length === 0 && !loading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={getAnimationVariants('up', 0.7, 0.1)}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tournaments found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or check back later for new tournaments.
                </p>
                <Button onClick={() => setFilters({ page: 1, limit: 12, tournament_type: '', category: '', status: '', state: '', city: '', search: '' })}>
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament: Tournament, index: number) => (
                  <motion.div
                    key={tournament.id}
                    initial="hidden"
                    animate="visible"
                    variants={getAnimationVariants('up', 0.7, 0.1 + index * 0.1)}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                            {tournament.name}
                          </CardTitle>
                          <div className="flex flex-col gap-1">
                            <Badge className={getTournamentTypeColor(tournament.tournament_type)}>
                              {tournament.tournament_type}
                            </Badge>
                            <Badge className={getStatusColor(tournament.status)}>
                              {tournament.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {tournament.venue_name}, {tournament.city}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {tournament.description && (
                          <p className="text-gray-700 line-clamp-3">
                            {tournament.description}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(tournament.start_date)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            {tournament.current_participants}/{tournament.max_participants || '∞'}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {tournament.category.replace('_', ' ')}
                          </Badge>
                          {tournament.entry_fee && (
                            <Badge variant="secondary" className="text-xs">
                              ${tournament.entry_fee}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <CalendarDays className="w-4 h-4 mr-2" />
                            Registration Deadline: {formatDate(tournament.registration_deadline)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {tournament.total_matches} matches
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-500">
                            Organized by {tournament.organizer_name}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            {isRegistrationOpen(tournament) && (
                              <Button 
                                size="sm" 
                                onClick={() => handleRegister(tournament.id)}
                                disabled={tournament.current_participants >= (tournament.max_participants || Infinity)}
                              >
                                {tournament.current_participants >= (tournament.max_participants || Infinity) ? 'Full' : 'Register'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={getAnimationVariants('up', 0.7, 0.3)}
                  className="flex justify-center mt-12"
                >
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TournamentsPage; 