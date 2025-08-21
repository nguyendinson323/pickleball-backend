import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchCourtReservations } from '../../store/slices/courtReservationsSlice';
import CourtReservationCalendar from '../../components/CourtReservationCalendar';
import {
  Calendar,
  Download,
  BarChart3,
  Clock,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Search
} from 'lucide-react';

const CourtReservations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reservations } = useSelector((state: RootState) => state.courtReservations);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [activeTab, setActiveTab] = useState<'calendar' | 'list' | 'analytics'>('calendar');
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCourtReservations({
      page: 1,
      limit: 50,
      user_id: user?.id
    }));
  }, [dispatch, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const reservationStats = {
    total: reservations.length,
    thisWeek: reservations.filter(r => {
      const reservationDate = new Date(r.reservation_date);
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return reservationDate >= weekStart;
    }).length,
    totalHours: reservations.reduce((sum, r) => sum + r.duration_hours, 0),
    totalSpent: reservations.reduce((sum, r) => sum + (r.final_amount || 0), 0),
    upcomingReservations: reservations.filter(r => 
      new Date(r.reservation_date) > new Date()
    ).length
  };

  const exportReservations = () => {
    const csvContent = [
      ['Date', 'Court', 'Time', 'Duration', 'Purpose', 'Status', 'Cost'].join(','),
      ...reservations.map(r => [
        r.reservation_date,
        'Court ' + r.court_id,
        `${new Date(r.start_time).toLocaleTimeString()} - ${new Date(r.end_time).toLocaleTimeString()}`,
        `${r.duration_hours}h`,
        r.purpose || 'N/A',
        r.status,
        `$${r.final_amount || 0}`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `court-reservations-${new Date().toISOString().split('T')[0]}.csv`;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Reservations</h1>
              <p className="text-gray-600">Manage your court bookings and view availability</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={exportReservations}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reservations</p>
                  <p className="text-2xl font-bold text-blue-600">{reservationStats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-green-600">{reservationStats.thisWeek}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-purple-600">{reservationStats.totalHours}h</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-orange-600">${reservationStats.totalSpent}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-indigo-600">{reservationStats.upcomingReservations}</p>
                </div>
                <Activity className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              Calendar View
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4 mr-2 inline" />
              List View
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              Analytics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'calendar' && (
          <CourtReservationCalendar />
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reservations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Reservations Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Court
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations
                    .filter(r => 
                      r.purpose?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      r.court_id?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(reservation.reservation_date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(reservation.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(reservation.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">Court {reservation.court_id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reservation.purpose || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{reservation.match_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reservation.duration_hours}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${reservation.final_amount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Usage Analytics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Reservation Analytics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{reservationStats.total}</div>
                  <div className="text-sm text-gray-600">Total Reservations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{reservationStats.totalHours}</div>
                  <div className="text-sm text-gray-600">Hours Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${reservationStats.totalSpent}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{reservationStats.upcomingReservations}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
              </div>
            </div>

            {/* Peak Hours Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="font-medium mb-4">Peak Booking Hours</h4>
              <div className="space-y-2">
                {Array.from({ length: 17 }, (_, i) => i + 6).map(hour => {
                  const hourBookings = reservations.filter(r => 
                    new Date(r.start_time).getHours() === hour
                  ).length;
                  const maxBookings = Math.max(...Array.from({ length: 17 }, (_, i) => 
                    reservations.filter(r => new Date(r.start_time).getHours() === i + 6).length
                  ));
                  const percentage = maxBookings > 0 ? (hourBookings / maxBookings) * 100 : 0;
                  
                  return (
                    <div key={hour} className="flex items-center space-x-3">
                      <div className="w-16 text-sm text-gray-600">
                        {hour.toString().padStart(2, '0')}:00
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm text-gray-600">{hourBookings}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="font-medium mb-4">Weekly Activity</h4>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                  const dayBookings = reservations.filter(r => 
                    new Date(r.reservation_date).getDay() === index
                  ).length;
                  const maxDayBookings = Math.max(...Array.from({ length: 7 }, (_, i) => 
                    reservations.filter(r => new Date(r.reservation_date).getDay() === i).length
                  ));
                  const percentage = maxDayBookings > 0 ? (dayBookings / maxDayBookings) * 100 : 0;
                  
                  return (
                    <div key={day} className="text-center">
                      <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                      <div className="h-20 bg-gray-200 rounded relative">
                        <div 
                          className="bg-blue-500 rounded absolute bottom-0 w-full transition-all duration-300"
                          style={{ height: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{dayBookings}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtReservations;