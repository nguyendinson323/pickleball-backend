import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-on-scroll">Analytics Dashboard</h1>
          <p className="text-gray-600 mb-6 animate-on-scroll">
            Comprehensive insights into platform performance, user behavior, and business metrics
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 animate-on-scroll">Time Range:</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 animate-on-scroll">Metric:</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
              >
                <option value="users">Users</option>
                <option value="revenue">Revenue</option>
                <option value="performance">Performance</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
            
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll">
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll">
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 animate-on-scroll">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 animate-on-scroll">{formatNumber(analyticsData.overview.totalUsers)}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${getGrowthColor(12.5)} animate-on-scroll`}>
                    +12.5%
                  </span>
                  <span className="ml-1 text-gray-500 animate-on-scroll">vs last month</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 animate-on-scroll">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 animate-on-scroll">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 animate-on-scroll">{formatNumber(analyticsData.overview.activeUsers)}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${getGrowthColor(8.2)} animate-on-scroll`}>
                    +8.2%
                  </span>
                  <span className="ml-1 text-gray-500 animate-on-scroll">vs last month</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-green-100 text-green-600 animate-on-scroll">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 animate-on-scroll">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900 animate-on-scroll">{formatCurrency(analyticsData.overview.monthlyRevenue)}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${getGrowthColor(analyticsData.revenue.growth)} animate-on-scroll`}>
                    +{analyticsData.revenue.growth}%
                  </span>
                  <span className="ml-1 text-gray-500 animate-on-scroll">vs last month</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 animate-on-scroll">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 animate-on-scroll">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900 animate-on-scroll">{analyticsData.overview.systemUptime}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-green-600 animate-on-scroll">
                    +0.03%
                  </span>
                  <span className="ml-1 text-gray-500 animate-on-scroll">vs last month</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-orange-100 text-orange-600 animate-on-scroll">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Demographics */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-on-scroll">User Demographics</h3>
            <div className="space-y-4">
              {analyticsData.userDemographics.byType.map((item, index) => (
                <div key={index} className="animate-on-scroll">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 animate-on-scroll">{item.type}</span>
                    <span className="text-sm text-gray-600 animate-on-scroll">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 animate-on-scroll">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500 animate-on-scroll">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Sources */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-on-scroll">Revenue Sources</h3>
            <div className="space-y-4">
              {analyticsData.revenue.bySource.map((item, index) => (
                <div key={index} className="animate-on-scroll">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 animate-on-scroll">{item.source}</span>
                    <span className="text-sm text-gray-600 animate-on-scroll">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 animate-on-scroll">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500 animate-on-scroll">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8 animate-on-scroll">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 animate-on-scroll">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center animate-on-scroll">
              <div className="text-3xl font-bold text-blue-600 mb-2 animate-on-scroll">
                {analyticsData.overview.averageResponseTime}ms
              </div>
              <p className="text-sm text-gray-600 animate-on-scroll">Average Response Time</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-medium text-green-600 animate-on-scroll">-3ms</span>
                <svg className="w-4 h-4 ml-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="text-3xl font-bold text-green-600 mb-2 animate-on-scroll">
                {analyticsData.engagement.averageSessionDuration}m
              </div>
              <p className="text-sm text-gray-600 animate-on-scroll">Avg Session Duration</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-medium text-green-600 animate-on-scroll">+2m</span>
                <svg className="w-4 h-4 ml-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="text-3xl font-bold text-purple-600 mb-2 animate-on-scroll">
                {analyticsData.engagement.pagesPerSession}
              </div>
              <p className="text-sm text-gray-600 animate-on-scroll">Pages per Session</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-medium text-green-600 animate-on-scroll">+0.5</span>
                <svg className="w-4 h-4 ml-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 animate-on-scroll">Regional Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {analyticsData.userDemographics.byRegion.map((region, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="text-2xl font-bold text-gray-900 mb-2 animate-on-scroll">
                  {formatNumber(region.count)}
                </div>
                <p className="text-sm text-gray-600 mb-2 animate-on-scroll">{region.region}</p>
                <div className="text-xs text-gray-500 animate-on-scroll">{region.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics; 