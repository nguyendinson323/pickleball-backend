import React, { useState } from 'react';

interface CourtRentalProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedCourt: string;
  setSelectedCourt: (court: string) => void;
  timeSlots: string[];
  courtBookings: Record<string, Record<string, {
    status: string;
    price: number;
    player?: string;
  }>>;
}

const CourtRental: React.FC<CourtRentalProps> = ({
  selectedDate,
  setSelectedDate,
  selectedCourt,
  setSelectedCourt,
  timeSlots,
  courtBookings
}) => {
  const handleCourtBooking = (court: string, time: string) => {
    console.log(`Booking ${court} at ${time}`);
    // In real app, this would open a booking modal
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'booked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="animate-on-scroll text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Court Rental & Booking</span>
        </h2>
      </div>
      <div className="px-6 py-4">
        <div className="space-y-6">
          {/* Date and Court Selection */}
          <div className="flex space-x-4">
            <div>
              <label htmlFor="date" className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="court" className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Select Court</label>
              <select 
                id="court"
                value={selectedCourt} 
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="animate-on-scroll block w-32 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Courts</option>
                <option value="Court 1">Court 1</option>
                <option value="Court 2">Court 2</option>
              </select>
            </div>
          </div>

          {/* Court Availability Calendar */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  {Object.keys(courtBookings).map(court => (
                    <th key={court} className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{court}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map(time => (
                  <tr key={time} className="hover:bg-gray-50">
                    <td className="animate-on-scroll px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{time}</td>
                    {Object.keys(courtBookings).map(court => {
                      const booking = courtBookings[court][time];
                      return (
                        <td key={court} className="px-6 py-4 whitespace-nowrap">
                          {booking ? (
                            <div className={`animate-on-scroll p-2 rounded border ${getBookingStatusColor(booking.status)}`}>
                              <div className="text-center">
                                <div className="animate-on-scroll font-medium">
                                  {booking.status === 'available' ? 'Available' : 'Booked'}
                                </div>
                                <div className="animate-on-scroll text-sm">${booking.price}</div>
                                {booking.status === 'booked' && (
                                  <div className="animate-on-scroll text-xs text-gray-600">{booking.player}</div>
                                )}
                                {booking.status === 'available' && (
                                  <button
                                    className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1"
                                    onClick={() => handleCourtBooking(court, time)}
                                  >
                                    Book
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="animate-on-scroll p-2 text-center text-gray-400">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtRental; 