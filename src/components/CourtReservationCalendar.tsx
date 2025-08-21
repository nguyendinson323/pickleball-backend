import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  getCourtBookings, 
  getCourtAvailability,
  createCourtReservation,
  cancelCourtReservation,
  clearCourtBookings,
  clearCourtAvailability
} from '../store/slices/courtReservationsSlice';
import { fetchCourts } from '../store/slices/courtsSlice';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Plus,
  X,
  Check,
  AlertTriangle,
  Filter,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

interface TimeSlot {
  time: string;
  hour: number;
  available: boolean;
  booking?: any;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasBookings: boolean;
}

const CourtReservationCalendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courtBookings, courtAvailability, loading } = useSelector((state: RootState) => state.courtReservations);
  const { courts } = useSelector((state: RootState) => state.courts);
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'booked' | 'maintenance'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [bookingForm, setBookingForm] = useState({
    purpose: '',
    match_type: 'practice' as const,
    participants: [''],
    guest_count: 0,
    special_requests: '',
    notes: ''
  });

  useEffect(() => {
    dispatch(fetchCourts({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourt && selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      dispatch(getCourtBookings({
        courtId: selectedCourt,
        params: { date: dateStr }
      }));
      dispatch(getCourtAvailability({
        courtId: selectedCourt,
        params: { date: dateStr }
      }));
    }
  }, [selectedCourt, selectedDate, dispatch]);

  const timeSlots: TimeSlot[] = useMemo(() => {
    const slots: TimeSlot[] = [];
    for (let hour = 6; hour <= 22; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      const booking = courtBookings.find(b => {
        const bookingStart = new Date(b.start_time);
        return bookingStart.getHours() === hour;
      });
      
      const availability = courtAvailability.find(a => {
        const availStart = new Date(a.start_time);
        return availStart.getHours() === hour;
      });

      slots.push({
        time: timeStr,
        hour,
        available: availability?.available ?? true,
        booking
      });
    }
    return slots;
  }, [courtBookings, courtAvailability]);

  const calendarDays: CalendarDay[] = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      
      days.push({
        date,
        isCurrentMonth,
        isToday,
        isSelected,
        hasBookings: false
      });
    }
    
    return days;
  }, [selectedDate]);

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'available' && court.is_available) ||
      (filterStatus === 'maintenance' && court.is_maintenance);
    return matchesSearch && matchesFilter;
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    if (!selectedCourt) {
      toast.error('Please select a court first');
      return;
    }
    
    if (!timeSlot.available) {
      toast.error('This time slot is not available');
      return;
    }

    if (timeSlot.booking) {
      toast.info('This time slot is already booked');
      return;
    }

    setSelectedTimeSlot(timeSlot.time);
    setShowBookingModal(true);
  };

  const handleCreateBooking = async () => {
    if (!selectedCourt || !selectedTimeSlot) {
      toast.error('Please select a court and time slot');
      return;
    }

    const [hour] = selectedTimeSlot.split(':').map(Number);
    const startTime = new Date(selectedDate);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(hour + 1, 0, 0, 0);

    const bookingData = {
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      purpose: bookingForm.purpose,
      match_type: bookingForm.match_type,
      participants: bookingForm.participants.filter(p => p.trim()),
      guest_count: bookingForm.guest_count,
      special_requests: bookingForm.special_requests,
      notes: bookingForm.notes
    };

    try {
      await dispatch(createCourtReservation({ 
        courtId: selectedCourt, 
        bookingData 
      })).unwrap();
      
      toast.success('Court reservation created successfully');
      setShowBookingModal(false);
      setBookingForm({
        purpose: '',
        match_type: 'practice',
        participants: [''],
        guest_count: 0,
        special_requests: '',
        notes: ''
      });
      
      // Refresh bookings
      const dateStr = selectedDate.toISOString().split('T')[0];
      dispatch(getCourtBookings({
        courtId: selectedCourt,
        params: { date: dateStr }
      }));
    } catch (error) {
      toast.error('Failed to create reservation');
    }
  };

  const handleCancelBooking = async (reservationId: string) => {
    try {
      await dispatch(cancelCourtReservation(reservationId)).unwrap();
      toast.success('Reservation cancelled successfully');
      
      // Refresh bookings
      const dateStr = selectedDate.toISOString().split('T')[0];
      dispatch(getCourtBookings({
        courtId: selectedCourt,
        params: { date: dateStr }
      }));
    } catch (error) {
      toast.error('Failed to cancel reservation');
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const getTimeSlotColor = (slot: TimeSlot) => {
    if (slot.booking) {
      if (slot.booking.user_id === user?.id) {
        return 'bg-blue-500 text-white';
      }
      return 'bg-red-500 text-white';
    }
    if (!slot.available) {
      return 'bg-gray-300 text-gray-500';
    }
    return 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer';
  };

  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const selectedCourt_obj = courts.find(c => c.id === selectedCourt);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Court Selection and Filters */}
        <div className="lg:w-1/3 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Select Court
            </h3>
            
            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courts</option>
                <option value="available">Available Only</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>

            {/* Court List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCourts.map(court => (
                <div
                  key={court.id}
                  onClick={() => setSelectedCourt(court.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCourt === court.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{court.name}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {court.court_type} • ${court.hourly_rate}/hr
                  </div>
                  <div className={`text-xs mt-1 ${
                    court.is_available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {court.is_available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Court Info */}
          {selectedCourt_obj && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">{selectedCourt_obj.name}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Type: {selectedCourt_obj.court_type}</div>
                <div>Surface: {selectedCourt_obj.surface}</div>
                <div>Rate: ${selectedCourt_obj.hourly_rate}/hour</div>
                <div>Capacity: {selectedCourt_obj.capacity} players</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Calendar and Time Slots */}
        <div className="lg:w-2/3">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Court Reservations
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-sm rounded ${
                  viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm rounded ${
                  viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 text-sm rounded ${
                  viewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Day
              </button>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">{monthName}</h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {viewMode === 'month' && (
            /* Month View */
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDateSelect(day.date)}
                  className={`
                    p-2 text-center cursor-pointer rounded transition-colors min-h-[2.5rem] flex items-center justify-center
                    ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${day.isToday ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                    ${day.isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                    ${day.hasBookings ? 'ring-2 ring-green-200' : ''}
                  `}
                >
                  <span className="text-sm">{day.date.getDate()}</span>
                </div>
              ))}
            </div>
          )}

          {/* Time Slots View */}
          {selectedCourt && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">
                  Available Times - {selectedDate.toLocaleDateString()}
                </h4>
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={!slot.available || !!slot.booking}
                    className={`
                      p-2 text-sm rounded-md border transition-all
                      ${getTimeSlotColor(slot)}
                      ${!slot.available || slot.booking ? 'cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <Clock className="h-3 w-3 mb-1" />
                      <span>{slot.time}</span>
                      {slot.booking && (
                        <div className="text-xs mt-1 truncate w-full">
                          {slot.booking.user_id === user?.id ? 'Your booking' : 'Booked'}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Your Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>Unavailable</span>
                </div>
              </div>
            </div>
          )}

          {!selectedCourt && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a court to view available time slots</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowBookingModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Book Court Reservation</h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">
                      <div><strong>Court:</strong> {selectedCourt_obj?.name}</div>
                      <div><strong>Date:</strong> {selectedDate.toLocaleDateString()}</div>
                      <div><strong>Time:</strong> {selectedTimeSlot}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purpose
                    </label>
                    <input
                      type="text"
                      value={bookingForm.purpose}
                      onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
                      placeholder="e.g., Practice session, Tournament prep"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Match Type
                    </label>
                    <select
                      value={bookingForm.match_type}
                      onChange={(e) => setBookingForm({...bookingForm, match_type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="practice">Practice</option>
                      <option value="singles">Singles Match</option>
                      <option value="doubles">Doubles Match</option>
                      <option value="mixed_doubles">Mixed Doubles</option>
                      <option value="lesson">Lesson</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={bookingForm.guest_count}
                      onChange={(e) => setBookingForm({...bookingForm, guest_count: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      value={bookingForm.special_requests}
                      onChange={(e) => setBookingForm({...bookingForm, special_requests: e.target.value})}
                      placeholder="Any special equipment or setup requests"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCreateBooking}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Bookings List */}
      {courtBookings.length > 0 && (
        <div className="mt-6 border-t pt-6">
          <h4 className="font-medium mb-3">Current Reservations</h4>
          <div className="space-y-2">
            {courtBookings.map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">
                      {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-xs text-gray-600">{booking.purpose}</div>
                  </div>
                </div>
                {booking.user_id === user?.id && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtReservationCalendar;