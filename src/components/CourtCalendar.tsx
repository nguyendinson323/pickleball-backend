import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Plus,
  Edit,
  X,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../config/axios';
import { format, parseISO, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';

interface Court {
  id: string;
  name: string;
  court_type: string;
  surface: string;
  club_id: string;
  is_available: boolean;
  is_maintenance: boolean;
  hourly_rate: number;
  capacity: number;
  has_lighting: boolean;
  amenities: string[];
}

interface Reservation {
  id: string;
  court_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  reservation_date: string;
  duration_hours: number;
  purpose: string;
  match_type: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no_show';
  total_amount: number;
  final_amount: number;
  participants: string[];
  guest_count: number;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
  court: {
    id: string;
    name: string;
  };
}

interface AvailableSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

interface CourtCalendarProps {
  clubId?: string;
  courtId?: string;
  viewMode?: 'week' | 'day';
  showBookingForm?: boolean;
  isAdmin?: boolean;
}

const CourtCalendar: React.FC<CourtCalendarProps> = ({ 
  clubId, 
  courtId, 
  viewMode = 'week',
  showBookingForm = true,
  isAdmin = false
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [courts, setCourts] = useState<Court[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Record<string, AvailableSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const [bookingForm, setBookingForm] = useState({
    purpose: '',
    match_type: 'practice' as 'singles' | 'doubles' | 'mixed_doubles' | 'practice' | 'lesson' | 'other',
    participants: [] as string[],
    guest_count: 0,
    special_requests: '',
    equipment_needed: [] as string[]
  });

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 6; // Start from 6 AM
    return {
      hour,
      time: `${hour.toString().padStart(2, '0')}:00`,
      display: hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`
    };
  });

  useEffect(() => {
    fetchCourts();
  }, [clubId]);

  useEffect(() => {
    if (courts.length > 0) {
      fetchReservations();
      fetchAvailableSlots();
    }
  }, [currentDate, courts]);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const params = clubId ? { club_id: clubId } : {};
      if (courtId) params.court_id = courtId;

      const response = await axiosInstance.get('/courts', { params });
      setCourts(response.data.data.courts || []);
    } catch (error) {
      console.error('Error fetching courts:', error);
      toast.error('Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    try {
      const startDate = viewMode === 'week' 
        ? startOfWeek(currentDate, { weekStartsOn: 1 }) 
        : currentDate;
      const endDate = viewMode === 'week' 
        ? addDays(startDate, 6) 
        : currentDate;

      const params = {
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: format(endDate, 'yyyy-MM-dd'),
        ...(clubId && { club_id: clubId }),
        ...(courtId && { court_id: courtId })
      };

      const response = await axiosInstance.get('/court-reservations', { params });
      setReservations(response.data.data.reservations || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Failed to load reservations');
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const slots: Record<string, AvailableSlot[]> = {};
      
      for (const court of courts) {
        if (viewMode === 'week') {
          const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
          for (let i = 0; i < 7; i++) {
            const date = addDays(weekStart, i);
            const dateStr = format(date, 'yyyy-MM-dd');
            const key = `${court.id}-${dateStr}`;
            
            const response = await axiosInstance.get(`/courts/${court.id}/availability`, {
              params: { date: dateStr }
            });
            slots[key] = response.data.data.slots || [];
          }
        } else {
          const dateStr = format(currentDate, 'yyyy-MM-dd');
          const key = `${court.id}-${dateStr}`;
          
          const response = await axiosInstance.get(`/courts/${court.id}/availability`, {
            params: { date: dateStr }
          });
          slots[key] = response.data.data.slots || [];
        }
      }
      
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleSlotClick = (court: Court, slot: AvailableSlot) => {
    if (!showBookingForm) return;
    
    setSelectedCourt(court);
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowReservationModal(true);
  };

  const handleBookCourt = async () => {
    if (!selectedCourt || !selectedSlot) return;

    try {
      const bookingData = {
        court_id: selectedCourt.id,
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        ...bookingForm
      };

      const response = await axiosInstance.post('/court-reservations', bookingData);
      
      if (response.data.success) {
        toast.success('Court booked successfully!');
        setShowBookingModal(false);
        resetBookingForm();
        fetchReservations();
        fetchAvailableSlots();
      }
    } catch (error: any) {
      console.error('Error booking court:', error);
      toast.error(error.response?.data?.message || 'Failed to book court');
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      const response = await axiosInstance.put(`/court-reservations/${reservationId}/cancel`);
      
      if (response.data.success) {
        toast.success('Reservation cancelled successfully!');
        setShowReservationModal(false);
        fetchReservations();
        fetchAvailableSlots();
      }
    } catch (error: any) {
      console.error('Error cancelling reservation:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel reservation');
    }
  };

  const resetBookingForm = () => {
    setBookingForm({
      purpose: '',
      match_type: 'practice',
      participants: [],
      guest_count: 0,
      special_requests: '',
      equipment_needed: []
    });
    setSelectedCourt(null);
    setSelectedSlot(null);
  };

  const getReservationForSlot = (courtId: string, slotStart: string) => {
    return reservations.find(r => 
      r.court_id === courtId && 
      new Date(r.start_time).getTime() === new Date(slotStart).getTime()
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'no_show': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const weekStart = viewMode === 'week' ? startOfWeek(currentDate, { weekStartsOn: 1 }) : currentDate;
  const days = viewMode === 'week' 
    ? Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
    : [currentDate];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Court Calendar
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <span className="text-lg font-medium text-gray-900 px-4">
              {viewMode === 'week' 
                ? `${format(weekStart, 'MMM dd')} - ${format(addDays(weekStart, 6), 'MMM dd, yyyy')}`
                : format(currentDate, 'MMMM dd, yyyy')
              }
            </span>
            
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
            <div className="p-3 font-medium text-gray-900">Court / Time</div>
            {days.map(day => (
              <div key={day.toISOString()} className="p-3 text-center">
                <div className="font-medium text-gray-900">
                  {format(day, 'EEE')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(day, 'MMM dd')}
                </div>
              </div>
            ))}
          </div>

          {/* Court Rows */}
          {courts.map(court => (
            <div key={court.id} className="border-b border-gray-200">
              {timeSlots.map(slot => (
                <div key={`${court.id}-${slot.hour}`} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50">
                  <div className="p-3 border-r border-gray-200 bg-gray-50">
                    {slot.hour === 6 && (
                      <div>
                        <div className="font-medium text-gray-900">{court.name}</div>
                        <div className="text-xs text-gray-500">
                          {court.court_type} • {court.surface}
                        </div>
                        {!court.is_available && (
                          <div className="text-xs text-red-500 mt-1">Unavailable</div>
                        )}
                      </div>
                    )}
                    {slot.hour !== 6 && (
                      <div className="text-sm text-gray-500">{slot.display}</div>
                    )}
                  </div>

                  {days.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const slotStart = new Date(day);
                    slotStart.setHours(slot.hour, 0, 0, 0);
                    
                    const reservation = getReservationForSlot(court.id, slotStart.toISOString());
                    const slotsKey = `${court.id}-${dateStr}`;
                    const availableSlot = availableSlots[slotsKey]?.find(s => 
                      new Date(s.start_time).getHours() === slot.hour
                    );

                    return (
                      <div key={`${court.id}-${day.toISOString()}-${slot.hour}`} className="p-1 border-r border-gray-200 h-16">
                        {reservation ? (
                          <button
                            onClick={() => handleReservationClick(reservation)}
                            className={`w-full h-full rounded p-2 text-xs font-medium border transition-colors ${getStatusColor(reservation.status)}`}
                          >
                            <div className="truncate">{reservation.user.full_name}</div>
                            <div className="truncate text-xs opacity-75">{reservation.purpose}</div>
                          </button>
                        ) : availableSlot?.available && court.is_available ? (
                          <button
                            onClick={() => handleSlotClick(court, availableSlot)}
                            className="w-full h-full rounded border-2 border-dashed border-green-300 text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                            <X className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedCourt && selectedSlot && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Book Court: {selectedCourt.name}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex items-center text-blue-800">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {format(parseISO(selectedSlot.start_time), 'MMM dd, yyyy h:mm a')} - 
                      {format(parseISO(selectedSlot.end_time), 'h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center text-blue-800 mt-1">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      ${selectedCourt.hourly_rate}/hour
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <input
                    type="text"
                    value={bookingForm.purpose}
                    onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Practice session, Match, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Match Type</label>
                  <select
                    value={bookingForm.match_type}
                    onChange={(e) => setBookingForm({...bookingForm, match_type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="practice">Practice</option>
                    <option value="singles">Singles</option>
                    <option value="doubles">Doubles</option>
                    <option value="mixed_doubles">Mixed Doubles</option>
                    <option value="lesson">Lesson</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <input
                    type="number"
                    value={bookingForm.guest_count}
                    onChange={(e) => setBookingForm({...bookingForm, guest_count: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max={selectedCourt.capacity}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    value={bookingForm.special_requests}
                    onChange={(e) => setBookingForm({...bookingForm, special_requests: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    setShowBookingModal(false);
                    resetBookingForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleBookCourt}
                >
                  Book Court
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Details Modal */}
      {showReservationModal && selectedReservation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reservation Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{selectedReservation.user.full_name}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{selectedReservation.court.name}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">
                    {format(parseISO(selectedReservation.start_time), 'MMM dd, yyyy h:mm a')} - 
                    {format(parseISO(selectedReservation.end_time), 'h:mm a')}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">${selectedReservation.final_amount}</span>
                </div>

                <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedReservation.status)}`}>
                  {selectedReservation.status.replace('_', ' ').toUpperCase()}
                </div>

                {selectedReservation.purpose && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Purpose:</p>
                    <p className="text-sm text-gray-600">{selectedReservation.purpose}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowReservationModal(false)}
                >
                  Close
                </button>
                
                {(isAdmin || selectedReservation.status === 'confirmed') && (
                  <button
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    onClick={() => handleCancelReservation(selectedReservation.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtCalendar;