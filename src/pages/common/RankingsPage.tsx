import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchRankings, fetchTopPlayers } from '../../store/slices/rankingsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Minus, Target, Users, Award } from 'lucide-react';
import { Ranking } from '../../types/api';
import { useAnimation } from '../../hooks/useAnimation';

const RankingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rankings, topPlayers, loading, error, pagination } = useSelector((state: RootState) => state.rankings);
  const { elementRef: headerRef } = useAnimation();
  
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    category: '' | 'singles' | 'doubles' | 'mixed_doubles';
    skill_level: '' | '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
    state: string;
    search: string;
  }>({
    page: 1,
    limit: 20,
    category: 'singles',
    skill_level: '',
    state: '',
    search: ''
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      category: filters.category || undefined,
      skill_level: filters.skill_level || undefined
    } as any;
    dispatch(fetchRankings(apiFilters));
    dispatch(fetchTopPlayers({ limit: 10, category: filters.category || 'singles' }));
  }, [dispatch, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">{position}</span>;
    }
  };

  const getPositionChange = (current: number, previous?: number) => {
    if (!previous) return <Minus className="w-4 h-4 text-gray-400" />;
    if (current < previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current > previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case '5.5': return 'bg-purple-100 text-purple-800';
      case '5.0': return 'bg-red-100 text-red-800';
      case '4.5': return 'bg-orange-100 text-orange-800';
      case '4.0': return 'bg-blue-100 text-blue-800';
      case '3.5': return 'bg-green-100 text-green-800';
      case '3.0': return 'bg-yellow-100 text-yellow-800';
      case '2.5': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatWinPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  if (loading && rankings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading rankings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section ref={headerRef} className="animate-on-scroll bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Player Rankings
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the top pickleball players and track your ranking progress
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="animate-on-scroll">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="singles">Singles</SelectItem>
                  <SelectItem value="doubles">Doubles</SelectItem>
                  <SelectItem value="mixed_doubles">Mixed Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.skill_level} onValueChange={(value) => handleFilterChange('skill_level', value)}>
                <SelectTrigger className="animate-on-scroll">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="2.5">2.5</SelectItem>
                  <SelectItem value="3.0">3.0</SelectItem>
                  <SelectItem value="3.5">3.5</SelectItem>
                  <SelectItem value="4.0">4.0</SelectItem>
                  <SelectItem value="4.5">4.5</SelectItem>
                  <SelectItem value="5.0">5.0</SelectItem>
                  <SelectItem value="5.5">5.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search players..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="animate-on-scroll w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="State"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="animate-on-scroll w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="animate-on-scroll text-3xl font-bold text-gray-900 mb-4">
              Top 10 Players
            </h2>
            <p className="animate-on-scroll text-gray-600">
              The highest-ranked players in {filters.category.replace('_', ' ')} category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {topPlayers.map((player, index) => (
              <div key={player.id}>
                <Card className="animate-on-scroll card hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {getPositionIcon(index + 1)}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {player.user_name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {player.state || 'Unknown State'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Skill Level:</span>
                      <Badge className={getSkillLevelColor(player.skill_level)}>
                        {player.skill_level}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Points:</span>
                      <span className="font-semibold text-blue-600">{player.current_points}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Win Rate:</span>
                      <span className="font-semibold text-green-600">
                        {formatWinPercentage(player.win_percentage)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tournaments:</span>
                      <span className="font-semibold">{player.tournaments_played}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings Table Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          )}

          {rankings.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No rankings found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or check back later for new rankings.
                </p>
                <Button onClick={() => setFilters({ page: 1, limit: 20, category: 'singles', skill_level: '', state: '', search: '' })}>
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Player
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Skill Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Win Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tournaments
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rankings.map((ranking, index) => (
                        <tr key={ranking.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getPositionIcon(ranking.current_position)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {ranking.user_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {ranking.state || 'Unknown State'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getSkillLevelColor(ranking.skill_level)}>
                              {ranking.skill_level}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ranking.current_points}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getPositionChange(ranking.current_position, ranking.previous_position)}
                              {ranking.previous_position && (
                                <span className="ml-2 text-sm text-gray-600">
                                  {ranking.current_position < ranking.previous_position ? '+' : ''}
                                  {ranking.previous_position - ranking.current_position}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatWinPercentage(ranking.win_percentage)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ranking.tournaments_played}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                      className="hover:scale-105 transition-transform duration-300"
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
                          className="hover:scale-105 transition-transform duration-300"
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
                      className="hover:scale-105 transition-transform duration-300"
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

export default RankingsPage; 