import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCourts } from '../../store/slices/courtsSlice';
import { bookCourt, getCourtAvailability, getCourtBookings } from '../../store/slices/courtReservationsSlice';
import { Court, BookCourtRequest } from '../../types/api';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Calendar } from '../../components/ui/calendar';
import { toast } from 'sonner';
import { useAnimation } from '../../hooks/useAnimation';

const CourtReservationsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courts } = useSelector((state: RootState) => state.courts);
  const { reservations, availability, loading, error } = useSelector((state: RootState) => state.courtReservations);
  const { elementRef: headerRef } = useAnimation();
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<BookCourtRequest>>({
    start_time: '',
    end_time: '',
    purpose: '',
    match_type: 'singles',
    guest_count: 0,
  });

  useEffect(() => {
    dispatch(fetchCourts({ page: 1, limit: 50 }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourt && selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      dispatch(getCourtAvailability({
        courtId: selectedCourt.id,
        params: { date: dateString, duration: 2 }
      }));
      dispatch(getCourtBookings({
        courtId: selectedCourt.id,
        params: { date: dateString }
      }));
    }
  }, [dispatch, selectedCourt, selectedDate]);

  const handleBookCourt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourt) return;

    try {
      await dispatch(bookCourt({
        courtId: selectedCourt.id,
        bookingData: bookingData as BookCourtRequest
      })).unwrap();
      toast.success('Court booked successfully!');
      setShowBookingForm(false);
      setBookingData({
        start_time: '',
        end_time: '',
        purpose: '',
        match_type: 'singles',
        guest_count: 0,
      });
    } catch (error) {
      toast.error('Failed to book court');
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isTimeSlotAvailable = (startTime: string, endTime: string) => {
    return availability.some(slot => 
      slot.start_time === startTime && 
      slot.end_time === endTime && 
      slot.available
    );
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 2).toString().padStart(2, '0')}:00`;
      slots.push({ startTime, endTime });
    }
    return slots;
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 ref={headerRef} className="animate-on-scroll text-3xl font-bold mb-6">
        Court Reservations
      </h1>

      {/* Court Selection */}
      <div className="animate-on-scroll">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select a Court</CardTitle>
            <CardDescription>Choose a court to view availability and make reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courts.map((court, index) => (
                <div key={court.id} className="animate-on-scroll">
                  <Card 
                    className={`cursor-pointer transition-colors ${
                      selectedCourt?.id === court.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedCourt(court)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{court.name}</CardTitle>
                      <CardDescription>
                        {court.club_name} • {court.court_type} • {court.surface}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={court.is_available ? 'text-green-600' : 'text-red-600'}>
                            {court.is_available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hourly Rate:</span>
                          <span>${court.hourly_rate || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Member Rate:</span>
                          <span>${court.member_rate || 'N/A'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedCourt && (
        <>
          {/* Date Selection */}
          <div className="animate-on-scroll">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose a date to view court availability</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>
          </div>

          {/* Availability and Booking */}
          <div className="animate-on-scroll grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Availability */}
            <div className="animate-on-scroll">
              <Card>
                <CardHeader>
                  <CardTitle>Court Availability</CardTitle>
                  <CardDescription>
                    {selectedDate?.toLocaleDateString()} • {selectedCourt.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {generateTimeSlots().map((slot) => {
                      const isAvailable = isTimeSlotAvailable(slot.startTime, slot.endTime);
                      return (
                        <div
                          key={slot.startTime}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            isAvailable 
                              ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                              : 'bg-red-50 border-red-200'
                          }`}
                          onClick={() => {
                            if (isAvailable) {
                              setBookingData({
                                ...bookingData,
                                start_time: slot.startTime,
                                end_time: slot.endTime,
                              });
                              setShowBookingForm(true);
                            }
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </span>
                            <span className={`text-sm font-medium ${
                              isAvailable ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {isAvailable ? 'Available' : 'Booked'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            {showBookingForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Book Court</CardTitle>
                  <CardDescription>
                    Complete your reservation for {selectedCourt.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookCourt} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_time">Start Time</Label>
                        <Input
                          id="start_time"
                          value={bookingData.start_time}
                          onChange={(e) => setBookingData({ ...bookingData, start_time: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_time">End Time</Label>
                        <Input
                          id="end_time"
                          value={bookingData.end_time}
                          onChange={(e) => setBookingData({ ...bookingData, end_time: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input
                        id="purpose"
                        value={bookingData.purpose}
                        onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                        placeholder="e.g., Practice, Match, Lesson"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="match_type">Match Type</Label>
                        <Select
                          value={bookingData.match_type}
                          onValueChange={(value) => setBookingData({ ...bookingData, match_type: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="singles">Singles</SelectItem>
                            <SelectItem value="doubles">Doubles</SelectItem>
                            <SelectItem value="mixed_doubles">Mixed Doubles</SelectItem>
                            <SelectItem value="practice">Practice</SelectItem>
                            <SelectItem value="lesson">Lesson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="guest_count">Guest Count</Label>
                        <Input
                          id="guest_count"
                          type="number"
                          min="0"
                          max="10"
                          value={bookingData.guest_count}
                          onChange={(e) => setBookingData({ ...bookingData, guest_count: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1">
                        Book Court
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowBookingForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Current Bookings */}
            {reservations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Bookings</CardTitle>
                  <CardDescription>
                    Bookings for {selectedDate?.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {formatTime(reservation.start_time)} - {formatTime(reservation.end_time)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {reservation.match_type} • {reservation.guest_count} guests
                            </div>
                            {reservation.purpose && (
                              <div className="text-sm text-gray-500 mt-1">
                                {reservation.purpose}
                              </div>
                            )}
                          </div>
                          <div className="text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {reservation.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CourtReservationsPage; 