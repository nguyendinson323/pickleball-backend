import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  TrendingUp,
  Settings,
  BarChart3,
  Activity
} from 'lucide-react';
import CourtCalendar from '../../../components/CourtCalendar';
import axiosInstance from '../../../config/axios';
import { toast } from 'sonner';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface CourtStats {
  total_courts: number;
  active_courts: number;
  total_reservations: number;
  weekly_revenue: number;
  occupancy_rate: number;
  average_booking_duration: number;
  peak_hours: string[];
  popular_activities: Array<{ activity: string; count: number }>;
}

interface RecentReservation {
  id: string;
  user_name: string;
  court_name: string;
  start_time: string;
  duration_hours: number;
  purpose: string;
  status: string;
  amount: number;
}

interface CourtCalendarDashboardProps {
  clubId: string;
}

const CourtCalendarDashboard: React.FC<CourtCalendarDashboardProps> = ({ clubId }) => {
  const [stats, setStats] = useState<CourtStats | null>(null);
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  useEffect(() => {
    fetchDashboardData();
  }, [clubId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch court statistics
      const statsResponse = await axiosInstance.get(`/clubs/${clubId}/court-stats`);
      setStats(statsResponse.data.data.stats);

      // Fetch recent reservations
      const reservationsResponse = await axiosInstance.get('/court-reservations', {
        params: {
          club_id: clubId,
          limit: 10,
          start_date: format(startOfWeek(new Date()), 'yyyy-MM-dd'),
          end_date: format(endOfWeek(new Date()), 'yyyy-MM-dd')
        }
      });
      setRecentReservations(reservationsResponse.data.data.reservations || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Court Calendar</h1>
          <p className="text-gray-600">Manage court bookings and availability</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'day'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total_courts}</p>
                <p className="text-xs text-green-600">{stats.active_courts} active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Weekly Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total_reservations}</p>
                <p className="text-xs text-gray-500">{stats.occupancy_rate.toFixed(1)}% occupancy</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Weekly Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">${stats.weekly_revenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% from last week
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.average_booking_duration}h</p>
                <p className="text-xs text-gray-500">per booking</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Court Calendar */}
      <div className="mb-8">
        <CourtCalendar 
          clubId={clubId}
          viewMode={viewMode}
          showBookingForm={true}
          isAdmin={true}
        />
      </div>

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Reservations
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{reservation.user_name}</p>
                        <p className="text-xs text-gray-500">
                          {reservation.court_name} • {format(new Date(reservation.start_time), 'MMM dd, h:mm a')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">${reservation.amount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{reservation.purpose}</p>
                  </div>
                </div>
              ))}
              
              {recentReservations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent reservations</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Peak Hours & Popular Activities */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Usage Analytics
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {stats && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Peak Hours</h4>
                    <div className="flex flex-wrap gap-2">
                      {stats.peak_hours.map((hour) => (
                        <span
                          key={hour}
                          className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Activities</h4>
                    <div className="space-y-2">
                      {stats.popular_activities.map((activity) => (
                        <div key={activity.activity} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">{activity.activity}</span>
                          <span className="text-sm font-medium text-gray-900">{activity.count} bookings</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtCalendarDashboard;