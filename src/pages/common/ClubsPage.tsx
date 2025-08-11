import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchClubs } from '../../store/slices/clubsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { MapPin, Users, Calendar, Star, Phone, Mail, Globe, Clock } from 'lucide-react';
import { Club } from '../../types/api';
import { useAnimation } from '../../hooks/useAnimation';

const ClubsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, loading, error, pagination } = useSelector((state: RootState) => state.clubs);
  const { elementRef: headerRef } = useAnimation();
  
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    state: string;
    city: string;
    club_type: 'all' | 'recreational' | 'competitive' | 'training' | 'mixed';
    has_courts: string;
    subscription_plan: 'all' | 'basic' | 'premium';
    search: string;
  }>({
    page: 1,
    limit: 12,
    state: 'all',
    city: 'all',
    club_type: 'all',
    has_courts: 'all',
    subscription_plan: 'all',
    search: ''
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      state: filters.state === 'all' ? undefined : filters.state,
      city: filters.city === 'all' ? undefined : filters.city,
      club_type: filters.club_type === 'all' ? undefined : filters.club_type,
      has_courts: filters.has_courts === 'all' ? undefined : (filters.has_courts === 'true'),
      subscription_plan: filters.subscription_plan === 'all' ? undefined : filters.subscription_plan
    } as any;
    dispatch(fetchClubs(apiFilters));
  }, [dispatch, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const getClubTypeColor = (type: string) => {
    switch (type) {
      case 'competitive': return 'bg-red-100 text-red-800';
      case 'recreational': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'mixed': return 'bg-purple-100 text-purple-800';
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

  if (loading && clubs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading clubs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section 
        className="relative text-white py-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(150, 200, 200, 0.4), rgba(147, 200, 234, 0.9)), url('/img/clubs-facility.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Find Your Perfect Pickleball Club
            </h1>
            <p className="animate-on-scroll text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
              Discover clubs near you, join communities, and take your game to the next level
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search clubs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="animate-on-scroll w-full"
              />
            </div>
            <div>
              <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                <SelectTrigger className="animate-on-scroll">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="Jalisco">Jalisco</SelectItem>
                  <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                  <SelectItem value="CDMX">CDMX</SelectItem>
                  <SelectItem value="Baja California">Baja California</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.club_type} onValueChange={(value) => handleFilterChange('club_type', value)}>
                <SelectTrigger className="animate-on-scroll">
                  <SelectValue placeholder="Club Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="recreational">Recreational</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.has_courts} onValueChange={(value) => handleFilterChange('has_courts', value)}>
                <SelectTrigger className="animate-on-scroll">
                  <SelectValue placeholder="Courts Available" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  <SelectItem value="true">With Courts</SelectItem>
                  <SelectItem value="false">Without Courts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-8">
              <p className="animate-on-scroll text-red-600 text-lg">{error}</p>
            </div>
          )}

          {clubs.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <MapPin className="animate-on-scroll w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="animate-on-scroll text-xl font-semibold text-gray-900 mb-2">No clubs found</h3>
                <p className="animate-on-scroll text-gray-600 mb-6">
                  Try adjusting your search criteria or check back later for new clubs in your area.
                </p>
                <Button onClick={() => setFilters({ page: 1, limit: 12, state: 'all', city: 'all', club_type: 'all', has_courts: 'all', subscription_plan: 'all', search: '' })}>
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club: Club, index: number) => (
                  <div key={club.id}>
                    <Card className="animate-on-scroll card h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="animate-on-scroll text-xl font-bold text-gray-900 line-clamp-2">
                            {club.name}
                          </CardTitle>
                          <Badge className={`animate-on-scroll ${getClubTypeColor(club.club_type)}`}>
                            {club.club_type}
                          </Badge>
                        </div>
                        <CardDescription className="animate-on-scroll flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {club.city}, {club.state}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {club.description && (
                          <p className="animate-on-scroll text-gray-700 line-clamp-3">
                            {club.description}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="animate-on-scroll flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            {club.member_count} members
                          </div>
                          {club.has_courts && (
                            <div className="animate-on-scroll flex items-center text-gray-600">
                              <Star className="w-4 h-4 mr-2" />
                              {club.court_count} courts
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {club.offers_training && (
                            <Badge variant="secondary" className="animate-on-scroll text-xs">Training</Badge>
                          )}
                          {club.offers_tournaments && (
                            <Badge variant="secondary" className="animate-on-scroll text-xs">Tournaments</Badge>
                          )}
                          {club.offers_equipment && (
                            <Badge variant="secondary" className="animate-on-scroll text-xs">Equipment</Badge>
                          )}
                        </div>

                        {club.founded_date && (
                          <div className="animate-on-scroll flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            Founded {formatDate(club.founded_date)}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-4 text-sm">
                            {club.contact_phone && (
                              <a href={`tel:${club.contact_phone}`} className="animate-on-scroll flex items-center text-blue-600 hover:text-blue-800 hover:scale-105 transition-transform duration-300">
                                <Phone className="w-4 h-4 mr-1" />
                                Contact
                              </a>
                            )}
                            {club.contact_email && (
                              <a href={`mailto:${club.contact_email}`} className="animate-on-scroll flex items-center text-blue-600 hover:text-blue-800 hover:scale-105 transition-transform duration-300">
                                <Mail className="w-4 h-4 mr-1" />
                                Email
                              </a>
                            )}
                            {club.website && (
                              <a href={club.website} target="_blank" rel="noopener noreferrer" className="animate-on-scroll flex items-center text-blue-600 hover:text-blue-800 hover:scale-105 transition-transform duration-300">
                                <Globe className="w-4 h-4 mr-1" />
                                Website
                              </a>
                            )}
                          </div>
                          <Button size="sm" variant="outline" className="animate-on-scroll hover:scale-105 transition-transform duration-300">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="animate-on-scroll hover:scale-105 transition-transform duration-300"
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
                          className="animate-on-scroll hover:scale-105 transition-transform duration-300"
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
                      className="animate-on-scroll hover:scale-105 transition-transform duration-300"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClubsPage; 