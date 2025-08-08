import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchClubs } from '../store/slices/clubsSlice';
import { motion } from 'framer-motion';
import { getAnimationVariants } from '../lib/animations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { MapPin, Users, Calendar, Star, Phone, Mail, Globe, Clock } from 'lucide-react';
import { Club } from '../types/api';

const ClubsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, loading, error, pagination } = useSelector((state: RootState) => state.clubs);
  
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    state: string;
    city: string;
    club_type: '' | 'recreational' | 'competitive' | 'training' | 'mixed';
    has_courts: string;
    subscription_plan: '' | 'basic' | 'premium';
    search: string;
  }>({
    page: 1,
    limit: 12,
    state: '',
    city: '',
    club_type: '',
    has_courts: '',
    subscription_plan: '',
    search: ''
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      club_type: filters.club_type || undefined,
      has_courts: filters.has_courts ? filters.has_courts === 'true' : undefined,
      subscription_plan: filters.subscription_plan || undefined
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('up', 0.7, 0.1)}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Pickleball Club
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover clubs near you, join communities, and take your game to the next level
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
                placeholder="Search clubs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  <SelectItem value="Jalisco">Jalisco</SelectItem>
                  <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                  <SelectItem value="CDMX">CDMX</SelectItem>
                  <SelectItem value="Baja California">Baja California</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.club_type} onValueChange={(value) => handleFilterChange('club_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Club Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="recreational">Recreational</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.has_courts} onValueChange={(value) => handleFilterChange('has_courts', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Courts Available" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Clubs</SelectItem>
                  <SelectItem value="true">With Courts</SelectItem>
                  <SelectItem value="false">Without Courts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clubs Grid */}
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

          {clubs.length === 0 && !loading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={getAnimationVariants('up', 0.7, 0.1)}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No clubs found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or check back later for new clubs in your area.
                </p>
                <Button onClick={() => setFilters({ page: 1, limit: 12, state: '', city: '', club_type: '', has_courts: '', subscription_plan: '', search: '' })}>
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club: Club, index: number) => (
                  <motion.div
                    key={club.id}
                    initial="hidden"
                    animate="visible"
                    variants={getAnimationVariants('up', 0.7, 0.1 + index * 0.1)}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                            {club.name}
                          </CardTitle>
                          <Badge className={getClubTypeColor(club.club_type)}>
                            {club.club_type}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {club.city}, {club.state}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {club.description && (
                          <p className="text-gray-700 line-clamp-3">
                            {club.description}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            {club.member_count} members
                          </div>
                          {club.has_courts && (
                            <div className="flex items-center text-gray-600">
                              <Star className="w-4 h-4 mr-2" />
                              {club.court_count} courts
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {club.offers_training && (
                            <Badge variant="secondary" className="text-xs">Training</Badge>
                          )}
                          {club.offers_tournaments && (
                            <Badge variant="secondary" className="text-xs">Tournaments</Badge>
                          )}
                          {club.offers_equipment && (
                            <Badge variant="secondary" className="text-xs">Equipment</Badge>
                          )}
                        </div>

                        {club.founded_date && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            Founded {formatDate(club.founded_date)}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-4 text-sm">
                            {club.contact_phone && (
                              <a href={`tel:${club.contact_phone}`} className="flex items-center text-blue-600 hover:text-blue-800">
                                <Phone className="w-4 h-4 mr-1" />
                                Contact
                              </a>
                            )}
                            {club.contact_email && (
                              <a href={`mailto:${club.contact_email}`} className="flex items-center text-blue-600 hover:text-blue-800">
                                <Mail className="w-4 h-4 mr-1" />
                                Email
                              </a>
                            )}
                            {club.website && (
                              <a href={club.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                                <Globe className="w-4 h-4 mr-1" />
                                Website
                              </a>
                            )}
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
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

export default ClubsPage; 