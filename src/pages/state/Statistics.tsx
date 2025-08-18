import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
        { type: 'State Championship', count: 8, percentage: 34.8 },
        { type: 'Regional', count: 12, percentage: 52.2 },
        { type: 'Local', count: 3, percentage: 13.0 }
      ],
      bySeason: [
        { season: 'Spring', count: 8, percentage: 34.8 },
        { season: 'Summer', count: 6, percentage: 26.1 },
        { season: 'Fall', count: 6, percentage: 26.1 },
        { season: 'Winter', count: 3, percentage: 13.0 }
      ],
      monthlyCount: [2, 1, 3, 2, 2, 1, 2, 3, 2, 2, 2, 1]
    },
    revenue: {
      bySource: [
        { source: 'Memberships', amount: 28900, percentage: 63.4 },
        { source: 'Tournaments', amount: 8900, percentage: 19.5 },
        { source: 'Training Programs', amount: 5600, percentage: 12.3 },
        { source: 'Equipment Sales', amount: 2200, percentage: 4.8 }
      ],
      monthlyRevenue: [42000, 43500, 44100, 44800, 45200, 45600, 45900, 46200, 46500, 46800, 47100, 47400],
      growthRate: 12.5
    }
  };

  const getGrowthIcon = (value: number) => {
    if (value > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (value < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Target className="h-4 w-4 text-gray-500" />;
  };

  const getGrowthColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Federation Statistics</h1>
            <p className="text-gray-600">Comprehensive overview of your federation's performance and growth</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="northern">Northern CA</option>
              <option value="central">Central CA</option>
              <option value="southern">Southern CA</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-on-scroll">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.overview.totalMembers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getGrowthIcon(statisticsData.overview.memberGrowth)}
              <span className={`ml-2 ${getGrowthColor(statisticsData.overview.memberGrowth)}`}>
                {statisticsData.overview.memberGrowth > 0 ? '+' : ''}{statisticsData.overview.memberGrowth}%
              </span>
              <span className="ml-2 text-gray-600">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clubs</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.overview.totalClubs}</p>
              </div>
              <Building2 className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getGrowthIcon(statisticsData.overview.clubGrowth)}
              <span className={`ml-2 ${getGrowthColor(statisticsData.overview.clubGrowth)}`}>
                {statisticsData.overview.clubGrowth > 0 ? '+' : ''}{statisticsData.overview.clubGrowth}%
              </span>
              <span className="ml-2 text-gray-600">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courts</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.overview.totalCourts}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Available for play</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${statisticsData.overview.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getGrowthIcon(statisticsData.overview.revenueGrowth)}
              <span className={`ml-2 ${getGrowthColor(statisticsData.overview.revenueGrowth)}`}>
                {statisticsData.overview.revenueGrowth > 0 ? '+' : ''}{statisticsData.overview.revenueGrowth}%
              </span>
              <span className="ml-2 text-gray-600">from last month</span>
            </div>
          </div>
        </div>

        {/* Detailed Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Membership Breakdown */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Membership Breakdown</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Type</h4>
                  <div className="space-y-2">
                    {statisticsData.membership.byType.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Skill Level</h4>
                  <div className="space-y-2">
                    {statisticsData.membership.bySkillLevel.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.level}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Club Statistics */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-green-500" />
                <span>Club Statistics</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Type</h4>
                  <div className="space-y-2">
                    {statisticsData.clubs.byType.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Region</h4>
                  <div className="space-y-2">
                    {statisticsData.clubs.byRegion.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.region}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.clubs}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Court Information */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span>Court Information</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Type</h4>
                  <div className="space-y-2">
                    {statisticsData.courts.byType.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Surface</h4>
                  <div className="space-y-2">
                    {statisticsData.courts.bySurface.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.surface}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Statistics */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span>Tournament Statistics</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Type</h4>
                  <div className="space-y-2">
                    {statisticsData.tournaments.byType.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">By Season</h4>
                  <div className="space-y-2">
                    {statisticsData.tournaments.bySeason.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.season}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Analysis */}
        <div className="mt-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span>Revenue Analysis</span>
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Revenue by Source</h4>
                <div className="space-y-2">
                  {statisticsData.revenue.bySource.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monthly Revenue Trend</h4>
                <div className="h-32 flex items-end space-x-1">
                  {statisticsData.revenue.monthlyRevenue.map((amount, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-blue-500 rounded-t"
                      style={{
                        height: `${(amount / Math.max(...statisticsData.revenue.monthlyRevenue)) * 100}%`
                      }}
                      title={`${new Date(2024, index, 1).toLocaleDateString('en-US', { month: 'short' })}: $${amount.toLocaleString()}`}
                    />
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600 text-center">
                  Monthly revenue trend over the past year
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 