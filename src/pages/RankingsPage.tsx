import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchRankings, fetchTopPlayers } from '../store/slices/rankingsSlice';
import { motion } from 'framer-motion';
import { getAnimationVariants } from '../lib/animations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Minus, Target, Users, Award } from 'lucide-react';
import { Ranking } from '../types/api';

const RankingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rankings, topPlayers, loading, error, pagination } = useSelector((state: RootState) => state.rankings);
  
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
      <section className="bg-white shadow-lg rounded-lg mx-4 my-8 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('up', 0.7, 0.1)}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Player Rankings
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Track your progress and compete with the best players in the nation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('up', 0.7, 0.2)}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Players - {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
            </h2>
            <p className="text-gray-600">
              The highest-ranked players in {filters.category} competition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPlayers.slice(0, 6).map((player: Ranking, index: number) => (
              <motion.div
                key={player.id}
                initial="hidden"
                animate="visible"
                variants={getAnimationVariants('up', 0.7, 0.1 + index * 0.1)}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {getPositionIcon(player.current_position)}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {player.user_name}
                    </CardTitle>
                    <CardDescription>
                      <Badge className={getSkillLevelColor(player.skill_level)}>
                        {player.skill_level}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Points</p>
                        <p className="font-semibold text-lg">{player.current_points}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Win %</p>
                        <p className="font-semibold text-lg">{formatWinPercentage(player.win_percentage)}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {player.tournaments_played} tournaments • {player.matches_played} matches
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-100 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants('up', 0.7, 0.3)}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="5.5">5.5</SelectItem>
                  <SelectItem value="5.0">5.0</SelectItem>
                  <SelectItem value="4.5">4.5</SelectItem>
                  <SelectItem value="4.0">4.0</SelectItem>
                  <SelectItem value="3.5">3.5</SelectItem>
                  <SelectItem value="3.0">3.0</SelectItem>
                  <SelectItem value="2.5">2.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
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
              <Button 
                variant="outline" 
                onClick={() => setFilters({ page: 1, limit: 20, category: 'singles', skill_level: '', state: '', search: '' })}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rankings Table */}
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

          {rankings.length === 0 && !loading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={getAnimationVariants('up', 0.7, 0.1)}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No rankings found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or check back later for updated rankings.
                </p>
                <Button onClick={() => setFilters({ page: 1, limit: 20, category: 'singles', skill_level: '', state: '', search: '' })}>
                  Reset Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={getAnimationVariants('up', 0.7, 0.4)}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Player
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Win %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Matches
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tournaments
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rankings.map((ranking: Ranking, index: number) => (
                        <motion.tr
                          key={ranking.id}
                          initial="hidden"
                          animate="visible"
                          variants={getAnimationVariants('up', 0.7, 0.1 + index * 0.05)}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getPositionIcon(ranking.current_position)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {ranking.user_name}
                            </div>
                            {ranking.state && (
                              <div className="text-sm text-gray-500">
                                {ranking.state}
                              </div>
                            )}
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
                                <span className="ml-1 text-sm text-gray-500">
                                  {Math.abs(ranking.current_position - ranking.previous_position)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatWinPercentage(ranking.win_percentage)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ranking.matches_won}/{ranking.matches_played}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ranking.tournaments_played}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={getAnimationVariants('up', 0.7, 0.5)}
                  className="flex justify-center mt-8"
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

export default RankingsPage; 