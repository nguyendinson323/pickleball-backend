import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { MapPin } from 'lucide-react';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span>Court Rental & Booking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Date and Court Selection */}
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="court">Select Court</Label>
              <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                <SelectTrigger className="mt-1 w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courts</SelectItem>
                  <SelectItem value="Court 1">Court 1</SelectItem>
                  <SelectItem value="Court 2">Court 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Court Availability Calendar */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  {Object.keys(courtBookings).map(court => (
                    <TableHead key={court}>{court}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map(time => (
                  <TableRow key={time}>
                    <TableCell className="font-medium">{time}</TableCell>
                    {Object.keys(courtBookings).map(court => {
                      const booking = courtBookings[court][time];
                      return (
                        <TableCell key={court}>
                          {booking ? (
                            <div className={`p-2 rounded border ${getBookingStatusColor(booking.status)}`}>
                              <div className="text-center">
                                <div className="font-medium">
                                  {booking.status === 'available' ? 'Available' : 'Booked'}
                                </div>
                                <div className="text-sm">${booking.price}</div>
                                {booking.status === 'booked' && (
                                  <div className="text-xs text-gray-600">{booking.player}</div>
                                )}
                                {booking.status === 'available' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="mt-1 w-full"
                                    onClick={() => handleCourtBooking(court, time)}
                                  >
                                    Book
                                  </Button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 text-center text-gray-400">-</div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourtRental; 