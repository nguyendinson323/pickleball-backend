import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Activity, 
  BarChart3, 
  PieChart, 
  LineChart,
  Download,
  Filter,
  Eye,
  Globe,
  Target,
  Award,
  Clock,
  Star,
  Zap,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';

const AdminAnalytics = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [timeRange, setTimeRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 15420,
      activeUsers: 14230,
      totalClubs: 456,
      totalCourts: 2340,
      totalTournaments: 189,
      monthlyRevenue: 234500,
      systemUptime: 99.97,
      averageResponseTime: 45
    },
    userGrowth: {
      daily: [120, 135, 142, 128, 156, 168, 145],
      weekly: [850, 920, 1050, 980, 1120, 1080, 1150],
      monthly: [3200, 3500, 3800, 4100, 4400, 4700, 5000]
    },
    userDemographics: {
      byType: [
        { type: 'Players', count: 12450, percentage: 80.8 },
        { type: 'Coaches', count: 1850, percentage: 12.0 },
        { type: 'Club Managers', count: 680, percentage: 4.4 },
        { type: 'Partners', count: 320, percentage: 2.1 },
        { type: 'State Federations', count: 120, percentage: 0.7 }
      ],
      byRegion: [
        { region: 'Northeast', count: 4200, percentage: 27.2 },
        { region: 'Southeast', count: 3800, percentage: 24.6 },
        { region: 'Midwest', count: 3200, percentage: 20.8 },
        { region: 'West', count: 2800, percentage: 18.2 },
        { region: 'Southwest', count: 1420, percentage: 9.2 }
      ],
      byAge: [
        { range: '18-25', count: 1850, percentage: 12.0 },
        { range: '26-35', count: 3200, percentage: 20.8 },
        { range: '36-45', count: 4100, percentage: 26.6 },
        { range: '46-55', count: 3800, percentage: 24.7 },
        { range: '55+', count: 2470, percentage: 16.0 }
      ]
    },
    performance: {
      responseTime: [42, 45, 38, 41, 39, 43, 40, 44, 37, 42, 45, 41],
      errorRate: [0.02, 0.01, 0.03, 0.01, 0.02, 0.01, 0.02, 0.01, 0.03, 0.01, 0.02, 0.01],
      uptime: [99.98, 99.97, 99.99, 99.96, 99.98, 99.97, 99.99, 99.96, 99.98, 99.97, 99.99, 99.96],
      activeUsers: [12400, 12800, 13100, 13500, 13800, 14100, 14400, 14700, 15000, 15200, 15400, 15420]
    },
    revenue: {
      monthly: [180000, 195000, 210000, 225000, 240000, 235000, 230000, 232000, 235000, 238000, 240000, 234500],
      bySource: [
        { source: 'Player Memberships', amount: 125000, percentage: 53.3 },
        { source: 'Club Subscriptions', amount: 68000, percentage: 29.0 },
        { source: 'Tournament Fees', amount: 25000, percentage: 10.7 },
        { source: 'Premium Features', amount: 16500, percentage: 7.0 }
      ],
      growth: 12.5
    },
    engagement: {
      dailyActiveUsers: 12470,
      weeklyActiveUsers: 18900,
      monthlyActiveUsers: 15420,
      averageSessionDuration: 28,
      pagesPerSession: 12.5,
      bounceRate: 23.4
    }
  };

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7': return 'Last 7 Days';
      case '30': return 'Last 30 Days';
      case '90': return 'Last 90 Days';
      case '365': return 'Last Year';
      default: return 'Last 30 Days';
    }
  };

  const getGrowthIndicator = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive: growth >= 0,
      color: growth >= 0 ? 'text-green-600' : 'text-red-600'
    };
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'users': return <Users className="h-5 w-5" />;
      case 'clubs': return <Building2 className="h-5 w-5" />;
      case 'courts': return <MapPin className="h-5 w-5" />;
      case 'tournaments': return <Award className="h-5 w-5" />;
      case 'revenue': return <DollarSign className="h-5 w-5" />;
      case 'performance': return <Activity className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getMetricData = (metric: string) => {
    switch (metric) {
      case 'users':
        return {
          current: analyticsData.overview.totalUsers,
          previous: analyticsData.overview.totalUsers - 500,
          label: 'Total Users',
          description: 'Registered users across all types'
        };
      case 'clubs':
        return {
          current: analyticsData.overview.totalClubs,
          previous: analyticsData.overview.totalClubs - 25,
          label: 'Total Clubs',
          description: 'Affiliated pickleball clubs'
        };
      case 'courts':
        return {
          current: analyticsData.overview.totalCourts,
          previous: analyticsData.overview.totalCourts - 120,
          label: 'Total Courts',
          description: 'Available pickleball courts'
        };
      case 'tournaments':
        return {
          current: analyticsData.overview.totalTournaments,
          previous: analyticsData.overview.totalTournaments - 15,
          label: 'Total Tournaments',
          description: 'Tournaments this year'
        };
      case 'revenue':
        return {
          current: analyticsData.overview.monthlyRevenue,
          previous: analyticsData.overview.monthlyRevenue - 15000,
          label: 'Monthly Revenue',
          description: 'Total monthly revenue'
        };
      case 'performance':
        return {
          current: analyticsData.overview.averageResponseTime,
          previous: analyticsData.overview.averageResponseTime + 5,
          label: 'Response Time',
          description: 'Average system response time'
        };
      default:
        return {
          current: 0,
          previous: 0,
          label: 'Metric',
          description: 'Description'
        };
    }
  };

  const currentMetric = getMetricData(selectedMetric);
  const growth = getGrowthIndicator(currentMetric.current, currentMetric.previous);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into system performance and user metrics</p>
          </div>
          <div className="flex space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
                <SelectItem value="365">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </div>

        {/* Metric Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span>Select Metric</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {['users', 'clubs', 'courts', 'tournaments', 'revenue', 'performance'].map((metric) => (
                <Button
                  key={metric}
                  variant={selectedMetric === metric ? 'default' : 'outline'}
                  className="flex flex-col items-center space-y-2 h-20"
                  onClick={() => setSelectedMetric(metric)}
                >
                  {getMetricIcon(metric)}
                  <span className="text-xs capitalize">{metric}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Metric Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getMetricIcon(selectedMetric)}
              <span>{currentMetric.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {typeof currentMetric.current === 'number' && currentMetric.current > 1000 
                    ? currentMetric.current.toLocaleString() 
                    : currentMetric.current}
                </div>
                <p className="text-sm text-gray-600">{currentMetric.description}</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {growth.isPositive ? '+' : '-'}{growth.value}%
                </div>
                <p className="text-sm text-gray-600">Growth</p>
                <div className={`flex items-center justify-center mt-1 ${growth.color}`}>
                  {growth.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {getTimeRangeLabel(timeRange)}
                </div>
                <p className="text-sm text-gray-600">Time Range</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{analyticsData.overview.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{analyticsData.overview.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Zap className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{analyticsData.overview.systemUptime}%</div>
              <p className="text-xs text-gray-600">reliability</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${analyticsData.overview.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">total revenue</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Demographics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-blue-500" />
                <span>User Demographics by Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.userDemographics.byType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.count.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>Revenue Sources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.revenue.bySource.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{source.source}</span>
                    <div className="text-right">
                      <div className="font-medium">${source.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Revenue</span>
                    <div className="text-right">
                      <div className="font-medium">${analyticsData.overview.monthlyRevenue.toLocaleString()}</div>
                      <div className="text-xs text-green-600">+{analyticsData.revenue.growth}% growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-purple-500" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                             <div className="text-center p-4 bg-gray-50 rounded-lg">
                 <div className="text-2xl font-bold text-blue-600">{analyticsData.performance.responseTime[0]}ms</div>
                 <p className="text-sm text-gray-600">Avg Response Time</p>
                 <Activity className="h-8 w-8 text-blue-500 mx-auto mt-2" />
               </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analyticsData.performance.uptime[0]}%</div>
                <p className="text-sm text-gray-600">System Uptime</p>
                <Zap className="h-8 w-8 text-green-500 mx-auto mt-2" />
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{analyticsData.performance.errorRate[0]}%</div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mt-2" />
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analyticsData.performance.activeUsers[0].toLocaleString()}</div>
                <p className="text-sm text-gray-600">Active Users</p>
                <Users className="h-8 w-8 text-purple-500 mx-auto mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-orange-500" />
              <span>User Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analyticsData.engagement.dailyActiveUsers.toLocaleString()}
                </div>
                <p className="text-gray-600">Daily Active Users</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {analyticsData.engagement.averageSessionDuration} min
                </div>
                <p className="text-gray-600">Avg Session Duration</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {analyticsData.engagement.pagesPerSession}
                </div>
                <p className="text-gray-600">Pages per Session</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Bounce Rate: {analyticsData.engagement.bounceRate}% | 
                Weekly Active Users: {analyticsData.engagement.weeklyActiveUsers.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics; 