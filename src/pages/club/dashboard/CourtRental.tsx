import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';

interface CourtBooking {
  status: 'available' | 'booked' | 'maintenance' | 'reserved';
  price: number;
  player?: string;
  bookingId?: string;
  startTime: string;
  endTime: string;
}

interface CourtRentalProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedCourt: string;
  setSelectedCourt: (court: string) => void;
  timeSlots: string[];
  courtBookings: Record<string, Record<string, CourtBooking>>;
}

const CourtRental: React.FC<CourtRentalProps> = ({
  selectedDate,
  setSelectedDate,
  selectedCourt,
  setSelectedCourt,
  timeSlots,
  courtBookings
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedCourtForBooking, setSelectedCourtForBooking] = useState<string>('');
  const [bookingData, setBookingData] = useState({
    playerName: '',
    playerEmail: '',
    playerPhone: '',
    duration: '1',
    specialRequests: ''
  });

  // Generate calendar dates for the current month
  const calendarDates = useMemo(() => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || dates.length < 42) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }, [selectedDate]);

  const handleCourtBooking = (court: string, time: string) => {
    setSelectedCourtForBooking(court);
    setSelectedTimeSlot(time);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingData.playerName || !bookingData.playerEmail) {
      toast.error('Please fill in player name and email');
      return;
    }

    // In a real app, this would make an API call to create the booking
    toast.success(`Court ${selectedCourtForBooking} booked for ${bookingData.playerName} at ${selectedTimeSlot}`);
    
    // Reset form
    setBookingData({
      playerName: '',
      playerEmail: '',
      playerPhone: '',
      duration: '1',
      specialRequests: ''
    });
    setShowBookingModal(false);
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 cursor-pointer';
      case 'booked': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
      case 'booked': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      case 'maintenance': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      );
      default: return null;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    return date.toISOString().split('T')[0] === selectedDate;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Court Rental & Booking</h2>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="court" className="block text-sm font-medium text-gray-700 mb-1">Filter Court</label>
            <select 
              id="court"
              value={selectedCourt} 
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Courts</option>
              {Object.keys(courtBookings).map(court => (
                <option key={court} value={court}>{court}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Court Availability Calendar</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              const date = new Date(selectedDate);
              date.setMonth(date.getMonth() - 1);
              setSelectedDate(date.toISOString().split('T')[0]);
            }}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h4 className="text-lg font-medium text-gray-900">
            {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h4>
          <button
            onClick={() => {
              const date = new Date(selectedDate);
              date.setMonth(date.getMonth() + 1);
              setSelectedDate(date.toISOString().split('T')[0]);
            }}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}
          
          {calendarDates.map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const isCurrentMonth = date.getMonth() === new Date(selectedDate).getMonth();
            const isCurrentDate = isToday(date);
            const isSelected = isSelectedDate(date);
            
            return (
              <div
                key={index}
                className={`p-2 min-h-[80px] border border-gray-200 cursor-pointer transition-colors ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-50'
                } ${isCurrentDate ? 'ring-2 ring-blue-500' : ''} ${isSelected ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  if (isCurrentMonth) {
                    setSelectedDate(dateString);
                  }
                }}
              >
                <div className="text-sm font-medium mb-1">{date.getDate()}</div>
                {isCurrentMonth && (
                  <div className="text-xs space-y-1">
                    {Object.keys(courtBookings).slice(0, 2).map(court => {
                      const courtBookingsForDate = courtBookings[court][dateString];
                      if (courtBookingsForDate) {
                        return (
                          <div key={court} className="text-xs truncate">
                            {court}: {courtBookingsForDate.status}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Time Slots Grid */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Time Slots for {new Date(selectedDate).toLocaleDateString()}</h4>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 gap-4">
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-6 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{time}</div>
                  {Object.keys(courtBookings).map(court => {
                    if (selectedCourt !== 'all' && selectedCourt !== court) return null;
                    
                    const booking = courtBookings[court][time];
                    if (!booking) return (
                      <div key={court} className="text-center text-gray-400">-</div>
                    );

                    return (
                      <div key={court} className="text-center">
                        <div
                          className={`p-2 rounded border transition-all duration-200 ${getBookingStatusColor(booking.status)}`}
                          onClick={() => {
                            if (booking.status === 'available') {
                              handleCourtBooking(court, time);
                            }
                          }}
                        >
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            {getStatusIcon(booking.status)}
                            <span className="text-xs font-medium">
                              {booking.status === 'available' ? 'Available' : 
                               booking.status === 'booked' ? 'Booked' :
                               booking.status === 'maintenance' ? 'Maintenance' : 'Reserved'}
                            </span>
                          </div>
                          <div className="text-sm font-bold">${booking.price}</div>
                          {booking.status === 'booked' && (
                            <div className="text-xs text-gray-600 truncate">{booking.player}</div>
                          )}
                          {booking.status === 'available' && (
                            <div className="text-xs text-green-600 font-medium">Click to Book</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Available Slots</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(courtBookings).reduce((total, court) => 
                  total + Object.values(court).filter(booking => booking.status === 'available').length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Booked Slots</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(courtBookings).reduce((total, court) => 
                  total + Object.values(court).filter(booking => booking.status === 'booked').length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Maintenance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(courtBookings).reduce((total, court) => 
                  total + Object.values(court).filter(booking => booking.status === 'maintenance').length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue Today</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${Object.values(courtBookings).reduce((total, court) => 
                  total + Object.values(court).filter(booking => booking.status === 'booked')
                    .reduce((courtTotal, booking) => courtTotal + booking.price, 0), 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Book Court {selectedCourtForBooking} at {selectedTimeSlot}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player Name *</label>
                  <input
                    type="text"
                    value={bookingData.playerName}
                    onChange={(e) => setBookingData({...bookingData, playerName: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter player name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={bookingData.playerEmail}
                    onChange={(e) => setBookingData({...bookingData, playerEmail: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={bookingData.playerPhone}
                    onChange={(e) => setBookingData({...bookingData, playerPhone: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special requests or notes"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtRental; 