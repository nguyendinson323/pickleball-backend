import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Flag,
  Building2,
  Award
} from 'lucide-react';

const Statistics = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [timeRange, setTimeRange] = useState('30');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock statistics data
  const statisticsData = {
    overview: {
      totalMembers: 1247,
      activeMembers: 1189,
      totalClubs: 89,
      totalCourts: 456,
      totalTournaments: 23,
      monthlyRevenue: 45600,
      memberGrowth: 15.2,
      clubGrowth: 8.7,
      revenueGrowth: 12.5
    },
    membership: {
      byType: [
        { type: 'Players', count: 987, percentage: 79.1 },
        { type: 'Coaches', count: 156, percentage: 12.5 },
        { type: 'Club Managers', count: 89, percentage: 7.1 },
        { type: 'Tournament Directors', count: 15, percentage: 1.2 }
      ],
      bySkillLevel: [
        { level: 'Beginner', count: 423, percentage: 33.9 },
        { level: 'Intermediate', count: 598, percentage: 47.9 },
        { level: 'Advanced', count: 198, percentage: 15.9 },
        { level: 'Elite', count: 28, percentage: 2.2 }
      ],
      byMembershipLevel: [
        { level: 'Standard', count: 756, percentage: 60.6 },
        { level: 'Premium', count: 389, percentage: 31.2 },
        { level: 'Professional', count: 102, percentage: 8.2 }
      ],
      monthlyGrowth: [45, 52, 48, 67, 73, 89, 95, 87, 92, 98, 105, 112]
    },
    clubs: {
      byType: [
        { type: 'Recreational', count: 34, percentage: 38.2 },
        { type: 'Competitive', count: 28, percentage: 31.5 },
        { type: 'Training', count: 18, percentage: 20.2 },
        { type: 'Mixed', count: 9, percentage: 10.1 }
      ],
      byRegion: [
        { region: 'Northern CA', count: 32, clubs: 36.0 },
        { region: 'Central CA', count: 24, clubs: 27.0 },
        { region: 'Southern CA', count: 33, clubs: 37.1 }
      ],
      bySize: [
        { size: 'Small (1-50 members)', count: 23, percentage: 25.8 },
        { size: 'Medium (51-200 members)', count: 41, percentage: 46.1 },
        { size: 'Large (200+ members)', count: 25, percentage: 28.1 }
      ]
    },
    courts: {
      byType: [
        { type: 'Indoor', count: 234, percentage: 51.3 },
        { type: 'Outdoor', count: 222, percentage: 48.7 }
      ],
      bySurface: [
        { surface: 'Professional', count: 189, percentage: 41.4 },
        { surface: 'Concrete', count: 178, percentage: 39.0 },
        { surface: 'Asphalt', count: 89, percentage: 19.5 }
      ],
      byRegion: [
        { region: 'Northern CA', count: 156, percentage: 34.2 },
        { region: 'Central CA', count: 134, percentage: 29.4 },
        { region: 'Southern CA', count: 166, percentage: 36.4 }
      ]
    },
    tournaments: {
      byType: [
        { type: 'State Championship', count: 3, participants: 456 },
        { type: 'Regional', count: 8, participants: 892 },
        { type: 'Local', count: 12, participants: 1234 }
      ],
      byCategory: [
        { category: 'Singles', count: 15, percentage: 65.2 },
        { category: 'Doubles', count: 6, percentage: 26.1 },
        { category: 'Mixed', count: 2, percentage: 8.7 }
      ],
      monthlySchedule: [
        { month: 'Jan', count: 2, participants: 234 },
        { month: 'Feb', count: 1, participants: 156 },
        { month: 'Mar', count: 3, participants: 345 },
        { month: 'Apr', count: 2, participants: 267 },
        { month: 'May', count: 4, participants: 456 },
        { month: 'Jun', count: 3, participants: 378 },
        { month: 'Jul', count: 2, participants: 289 },
        { month: 'Aug', count: 1, participants: 198 },
        { month: 'Sep', count: 2, participants: 234 },
        { month: 'Oct', count: 2, participants: 267 },
        { month: 'Nov', count: 1, participants: 189 },
        { month: 'Dec', count: 0, participants: 0 }
      ]
    },
    revenue: {
      bySource: [
        { source: 'Membership Fees', amount: 28900, percentage: 63.4 },
        { source: 'Tournament Fees', amount: 8900, percentage: 19.5 },
        { source: 'Coach Certifications', amount: 5600, percentage: 12.3 },
        { source: 'Club Affiliations', amount: 2200, percentage: 4.8 }
      ],
      monthlyTrend: [
        { month: 'Jan', amount: 38900 },
        { month: 'Feb', amount: 41200 },
        { month: 'Mar', amount: 45600 },
        { month: 'Apr', amount: 42300 },
        { month: 'May', amount: 47800 },
        { month: 'Jun', amount: 51200 },
        { month: 'Jul', amount: 48900 },
        { month: 'Aug', amount: 45600 },
        { month: 'Sep', amount: 52300 },
        { month: 'Oct', amount: 49800 },
        { month: 'Nov', amount: 53400 },
        { month: 'Dec', amount: 56700 }
      ]
    }
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Federation Statistics</h1>
            <p className="text-gray-600">Comprehensive analytics and performance metrics for your state federation</p>
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="timeRange">Time Range:</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="region">Region:</Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="northern">Northern CA</SelectItem>
                <SelectItem value="central">Central CA</SelectItem>
                <SelectItem value="southern">Southern CA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statisticsData.overview.totalMembers.toLocaleString()}</div>
              <div className={`flex items-center text-sm ${getGrowthColor(statisticsData.overview.memberGrowth)}`}>
                {getGrowthIcon(statisticsData.overview.memberGrowth)}
                <span className="ml-1">+{statisticsData.overview.memberGrowth}%</span>
              </div>
              <p className="text-xs text-gray-600">vs previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
              <Building2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statisticsData.overview.totalClubs}</div>
              <div className={`flex items-center text-sm ${getGrowthColor(statisticsData.overview.clubGrowth)}`}>
                {getGrowthIcon(statisticsData.overview.clubGrowth)}
                <span className="ml-1">+{statisticsData.overview.clubGrowth}%</span>
              </div>
              <p className="text-xs text-gray-600">vs previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{statisticsData.overview.totalCourts}</div>
              <p className="text-xs text-gray-600">available courts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${statisticsData.overview.monthlyRevenue.toLocaleString()}
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(statisticsData.overview.revenueGrowth)}`}>
                {getGrowthIcon(statisticsData.overview.revenueGrowth)}
                <span className="ml-1">+{statisticsData.overview.revenueGrowth}%</span>
              </div>
              <p className="text-xs text-gray-600">vs previous period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Membership Demographics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Membership Demographics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.membership.byType.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="font-medium">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Club Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-green-500" />
                <span>Club Distribution by Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.clubs.byType.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="font-medium">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Court Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span>Court Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">By Type</h4>
                  {statisticsData.courts.byType.map((item) => (
                    <div key={item.type} className="flex items-center justify-between mb-2">
                      <span className="text-sm">{item.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">By Surface</h4>
                  {statisticsData.courts.bySurface.map((item) => (
                    <div key={item.surface} className="flex items-center justify-between mb-2">
                      <span className="text-sm">{item.surface}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tournament Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Tournament Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.tournaments.byType.map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.type}</h4>
                      <p className="text-sm text-gray-600">{item.participants} participants</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-yellow-600">{item.count}</div>
                      <p className="text-xs text-gray-600">tournaments</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>Revenue Sources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.revenue.bySource.map((item) => (
                  <div key={item.source} className="flex items-center justify-between">
                    <span className="font-medium">{item.source}</span>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">${item.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5 text-red-500" />
                <span>Regional Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.clubs.byRegion.map((item) => (
                  <div key={item.region} className="flex items-center justify-between">
                    <span className="font-medium">{item.region}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${(item.count / statisticsData.overview.totalClubs) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Monthly Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Trend */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Revenue Trend</h4>
                <div className="space-y-2">
                  {statisticsData.revenue.monthlyTrend.map((item) => (
                    <div key={item.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(item.amount / 56700) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">${(item.amount / 1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tournament Schedule */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Tournament Schedule</h4>
                <div className="space-y-2">
                  {statisticsData.tournaments.monthlySchedule.map((item) => (
                    <div key={item.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-600 h-2 rounded-full" 
                            style={{ width: `${(item.count / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statisticsData.overview.activeMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tournaments</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{statisticsData.overview.totalTournaments}</div>
              <p className="text-xs text-gray-600">this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Court Utilization</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <p className="text-xs text-gray-600">average utilization</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 