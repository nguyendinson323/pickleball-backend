import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { 
  fetchCourtReservations,
  cancelCourtReservation,
  clearReservations
} from '../../store/slices/courtReservationsSlice';
import { fetchCourts } from '../../store/slices/courtsSlice';
import {
  Calendar,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

const CourtReservationDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reservations, loading } = useSelector((state: RootState) => state.courtReservations);
  const { courts } = useSelector((state: RootState) => state.courts);
  
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCourt, setFilterCourt] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCourts({ page: 1, limit: 100 }));
    loadReservations();
  }, [dispatch]);

  useEffect(() => {
    loadReservations();
  }, [dateRange, filterStatus, filterCourt]);

  const loadReservations = () => {
    const params: any = {
      page: 1,
      limit: 200
    };
    
    if (filterStatus !== 'all') {
      params.status = filterStatus;
    }
    if (filterCourt !== 'all') {
      params.court_id = filterCourt;
    }
    
    dispatch(fetchCourtReservations(params));
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      const matchesSearch = !searchQuery || 
        reservation.purpose?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.court_id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const reservationDate = new Date(reservation.reservation_date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const withinDateRange = reservationDate >= startDate && reservationDate <= endDate;
      
      return matchesSearch && withinDateRange;
    });
  }, [reservations, searchQuery, dateRange]);

  const analytics = useMemo(() => {
    const today = new Date();
    const thisMonth = reservations.filter(r => {
      const date = new Date(r.reservation_date);
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    
    const revenue = filteredReservations.reduce((sum, r) => sum + (r.final_amount || 0), 0);
    const totalHours = filteredReservations.reduce((sum, r) => sum + r.duration_hours, 0);
    
    // Peak hours analysis
    const hourlyBookings: Record<number, number> = {};
    filteredReservations.forEach(r => {
      const hour = new Date(r.start_time).getHours();
      hourlyBookings[hour] = (hourlyBookings[hour] || 0) + 1;
    });
    
    const peakHour = Object.entries(hourlyBookings).reduce((a, b) => 
      hourlyBookings[parseInt(a[0])] > hourlyBookings[parseInt(b[0])] ? a : b
    )?.[0];

    // Court utilization
    const courtUsage: Record<string, number> = {};
    filteredReservations.forEach(r => {
      courtUsage[r.court_id] = (courtUsage[r.court_id] || 0) + 1;
    });

    const statusBreakdown = {
      confirmed: filteredReservations.filter(r => r.status === 'confirmed').length,
      pending: filteredReservations.filter(r => r.status === 'pending').length,
      cancelled: filteredReservations.filter(r => r.status === 'cancelled').length,
      completed: filteredReservations.filter(r => r.status === 'completed').length,
      no_show: filteredReservations.filter(r => r.status === 'no_show').length
    };

    return {
      totalReservations: filteredReservations.length,
      thisMonthReservations: thisMonth.length,
      revenue,
      totalHours,
      averageRevenue: revenue / (filteredReservations.length || 1),
      peakHour: peakHour ? `${peakHour}:00` : 'N/A',
      courtUsage,
      statusBreakdown,
      hourlyBookings
    };
  }, [filteredReservations, reservations]);

  const handleCancelReservation = async (reservationId: string) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await dispatch(cancelCourtReservation(reservationId)).unwrap();
        toast.success('Reservation cancelled successfully');
        loadReservations();
      } catch (error) {
        toast.error('Failed to cancel reservation');
      }
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Court ID', 'Start Time', 'End Time', 'Duration', 'Purpose', 'Status', 'Revenue', 'User ID', 'Guest Count'].join(','),
      ...filteredReservations.map(r => [
        r.reservation_date,
        r.court_id,
        new Date(r.start_time).toLocaleTimeString(),
        new Date(r.end_time).toLocaleTimeString(),
        `${r.duration_hours}h`,
        r.purpose || 'N/A',
        r.status,
        `$${r.final_amount || 0}`,
        r.user_id,
        r.guest_count.toString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `court-reservations-admin-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Reservation Dashboard</h1>
              <p className="text-gray-600">Monitor and manage all court reservations across the federation</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={loadReservations}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportData}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reservations</p>
                  <p className="text-2xl font-bold text-blue-600">{analytics.totalReservations}</p>
                  <p className="text-xs text-gray-500 mt-1">This Month: {analytics.thisMonthReservations}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${analytics.revenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">Avg: ${analytics.averageRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-purple-600">{analytics.totalHours}h</p>
                  <p className="text-xs text-gray-500 mt-1">Peak: {analytics.peakHour}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-indigo-600">{analytics.statusBreakdown.confirmed}</p>
                  <p className="text-xs text-gray-500 mt-1">Pending: {analytics.statusBreakdown.pending}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reservations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                  <option value="no_show">No Show</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Court</label>
                <select
                  value={filterCourt}
                  onChange={(e) => setFilterCourt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Courts</option>
                  {courts.map(court => (
                    <option key={court.id} value={court.id}>{court.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Reservation Status
            </h3>
            <div className="space-y-3">
              {Object.entries(analytics.statusBreakdown).map(([status, count]) => {
                const percentage = analytics.totalReservations > 0 ? (count / analytics.totalReservations) * 100 : 0;
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'confirmed' ? 'bg-green-500' :
                        status === 'pending' ? 'bg-yellow-500' :
                        status === 'cancelled' ? 'bg-red-500' :
                        status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium capitalize">{status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            status === 'confirmed' ? 'bg-green-500' :
                            status === 'pending' ? 'bg-yellow-500' :
                            status === 'cancelled' ? 'bg-red-500' :
                            status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Peak Booking Hours
            </h3>
            <div className="space-y-2">
              {Object.entries(analytics.hourlyBookings)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([hour, count]) => {
                  const maxCount = Math.max(...Object.values(analytics.hourlyBookings));
                  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  
                  return (
                    <div key={hour} className="flex items-center space-x-3">
                      <div className="w-16 text-sm text-gray-600">
                        {hour.padStart(2, '0')}:00
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm text-gray-600">{count}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Court Utilization */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Court Utilization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(analytics.courtUsage)
              .sort(([,a], [,b]) => b - a)
              .map(([courtId, usage]) => {
                const court = courts.find(c => c.id === courtId);
                const maxUsage = Math.max(...Object.values(analytics.courtUsage));
                const percentage = maxUsage > 0 ? (usage / maxUsage) * 100 : 0;
                
                return (
                  <div key={courtId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">{court?.name || `Court ${courtId}`}</div>
                      <div className="text-sm text-gray-600">{usage} bookings</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 mr-2" />
              All Reservations
              {loading && (
                <div className="ml-3 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              )}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reservation Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Court & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.purpose || 'No purpose specified'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reservation.match_type} • {reservation.guest_count} guests
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Court {reservation.court_id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(reservation.reservation_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(reservation.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(reservation.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        ({reservation.duration_hours}h)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">User ID: {reservation.user_id}</div>
                      <div className="text-sm text-gray-500">Club: {reservation.club_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        reservation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reservation.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Payment: {reservation.payment_status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${reservation.final_amount?.toFixed(2) || '0.00'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rate: ${reservation.hourly_rate}/hr
                      </div>
                      {reservation.member_discount > 0 && (
                        <div className="text-xs text-green-600">
                          Discount: ${reservation.member_discount}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {reservation.status === 'confirmed' || reservation.status === 'pending' ? (
                        <button
                          onClick={() => handleCancelReservation(reservation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-400">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReservations.length === 0 && !loading && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No reservations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtReservationDashboard;