import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { getMessageStatistics } from '../store/slices/messagesSlice';
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Bell,
  Eye,
  MousePointer,
  Star,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsProps {
  announcementId?: string;
  showExport?: boolean;
}

const MessagingAnalytics: React.FC<AnalyticsProps> = ({ 
  announcementId, 
  showExport = true 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { statistics, loading } = useSelector((state: RootState) => state.messages);
  
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [announcementAnalytics, setAnnouncementAnalytics] = useState<any>(null);

  useEffect(() => {
    if (announcementId) {
      fetchAnnouncementAnalytics();
    } else {
      dispatch(getMessageStatistics(selectedPeriod));
    }
  }, [announcementId, selectedPeriod, dispatch]);

  const fetchAnnouncementAnalytics = async () => {
    if (!announcementId) return;
    
    try {
      // TODO: Replace with actual API call
      const mockAnalytics = {
        announcement_id: announcementId,
        view_count: 345,
        click_count: 87,
        like_count: 23,
        notifications_sent: 1250,
        notifications_read: 1089,
        read_rate: '87.1%',
        engagement_score: 76,
        created_at: '2024-03-20T10:00:00Z',
        published_at: '2024-03-20T10:00:00Z',
        days_active: 5
      };
      setAnnouncementAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to fetch announcement analytics:', error);
    }
  };

  const handleRefresh = () => {
    if (announcementId) {
      fetchAnnouncementAnalytics();
    } else {
      dispatch(getMessageStatistics(selectedPeriod));
    }
  };

  const handleExport = () => {
    // TODO: Implement analytics export
    const data = announcementId ? announcementAnalytics : statistics;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messaging-analytics-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render announcement-specific analytics
  if (announcementId && announcementAnalytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Announcement Analytics</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            {showExport && (
              <button
                onClick={handleExport}
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Views</p>
                <p className="text-xl font-semibold text-gray-900">{announcementAnalytics.view_count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MousePointer className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Clicks</p>
                <p className="text-xl font-semibold text-gray-900">{announcementAnalytics.click_count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Notifications</p>
                <p className="text-xl font-semibold text-gray-900">{announcementAnalytics.notifications_sent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Read Rate</p>
                <p className="text-xl font-semibold text-gray-900">{announcementAnalytics.read_rate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Score */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Engagement Score</h4>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${announcementAnalytics.engagement_score}%` }}
              ></div>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">
              {announcementAnalytics.engagement_score}/100
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Based on view-to-click ratio and user interactions
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Activity Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{new Date(announcementAnalytics.created_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Published:</span>
              <span className="font-medium">{new Date(announcementAnalytics.published_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Days Active:</span>
              <span className="font-medium">{announcementAnalytics.days_active} days</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render system-wide analytics
  if (!statistics) {
    return (
      <div className="text-center py-8 text-gray-500">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Messaging Analytics</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
          </select>
          
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          {showExport && (
            <button
              onClick={handleExport}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{statistics.total_messages?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Direct Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{statistics.direct_messages?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Bell className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">System Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{statistics.system_messages?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Read Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{statistics.read_rate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category and Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages by Category */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Messages by Category</h4>
          <div className="space-y-3">
            {Object.entries(statistics.messages_by_category || {}).map(([category, count]) => {
              const total = statistics.total_messages || 1;
              const percentage = ((count as number) / total * 100).toFixed(1);
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{count as number}</span>
                    <span className="text-xs text-gray-500">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Messages by Priority */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Messages by Priority</h4>
          <div className="space-y-3">
            {Object.entries(statistics.messages_by_priority || {}).map(([priority, count]) => {
              const total = statistics.total_messages || 1;
              const percentage = ((count as number) / total * 100).toFixed(1);
              
              const priorityColors = {
                urgent: 'bg-red-500',
                high: 'bg-orange-500',
                medium: 'bg-yellow-500',
                low: 'bg-green-500'
              };
              
              return (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${priorityColors[priority as keyof typeof priorityColors] || 'bg-gray-500'}`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{priority}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{count as number}</span>
                    <span className="text-xs text-gray-500">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Engagement Trends */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Engagement Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {statistics.total_messages?.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Messages Sent</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {statistics.read_rate}
            </div>
            <p className="text-sm text-gray-600">Overall Read Rate</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {statistics.unread_messages?.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Unread Messages</p>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Performance Insights</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900">Read Rate Analysis</p>
              <p className="text-blue-700">
                Your {statistics.read_rate} read rate is {
                  parseFloat(statistics.read_rate) > 85 ? 'excellent' :
                  parseFloat(statistics.read_rate) > 70 ? 'good' :
                  parseFloat(statistics.read_rate) > 50 ? 'average' : 'below average'
                }. 
                {parseFloat(statistics.read_rate) < 70 && ' Consider adjusting message timing or content relevance.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900">Message Distribution</p>
              <p className="text-blue-700">
                {statistics.system_messages > statistics.direct_messages 
                  ? 'System messages dominate your communication. Consider balancing with more personal messages.'
                  : 'Good balance between system and direct messages.'
                }
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900">Timing Optimization</p>
              <p className="text-blue-700">
                Based on your {selectedPeriod.replace('_', ' ')} data, consider sending important announcements 
                during peak engagement hours for better visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingAnalytics;