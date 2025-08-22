import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Repeat, 
  X,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../config/axios';
import { format, addDays, addWeeks, addMonths, parseISO } from 'date-fns';

interface Court {
  id: string;
  name: string;
  hourly_rate: number;
}

interface RecurringBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  court: Court | null;
  initialDate?: string;
  initialTime?: string;
  onSuccess?: () => void;
}

type RecurrencePattern = 'daily' | 'weekly' | 'monthly';
type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface RecurringBookingData {
  court_id: string;
  start_time: string;
  duration_hours: number;
  purpose: string;
  match_type: 'singles' | 'doubles' | 'mixed_doubles' | 'practice' | 'lesson' | 'other';
  participants: string[];
  guest_count: number;
  special_requests: string;
  recurrence: {
    pattern: RecurrencePattern;
    interval: number;
    days_of_week?: WeekDay[];
    end_date?: string;
    max_occurrences?: number;
  };
}

const RecurringBookingModal: React.FC<RecurringBookingModalProps> = ({
  isOpen,
  onClose,
  court,
  initialDate,
  initialTime,
  onSuccess
}) => {
  const [formData, setFormData] = useState<RecurringBookingData>({
    court_id: court?.id || '',
    start_time: '',
    duration_hours: 1,
    purpose: '',
    match_type: 'practice',
    participants: [],
    guest_count: 0,
    special_requests: '',
    recurrence: {
      pattern: 'weekly',
      interval: 1,
      days_of_week: ['monday'],
      end_date: '',
      max_occurrences: 10
    }
  });

  const [selectedDays, setSelectedDays] = useState<WeekDay[]>(['monday']);
  const [endType, setEndType] = useState<'date' | 'occurrences'>('occurrences');
  const [loading, setLoading] = useState(false);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [previewDates, setPreviewDates] = useState<string[]>([]);

  const weekDays: { key: WeekDay; label: string }[] = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ];

  React.useEffect(() => {
    if (initialDate && initialTime) {
      const startDateTime = `${initialDate}T${initialTime}:00`;
      setFormData(prev => ({ ...prev, start_time: startDateTime }));
    }
  }, [initialDate, initialTime]);

  React.useEffect(() => {
    if (formData.start_time && formData.recurrence.pattern) {
      generatePreviewDates();
    }
  }, [formData.start_time, formData.recurrence, selectedDays]);

  const generatePreviewDates = () => {
    if (!formData.start_time) return;

    const dates: string[] = [];
    const startDate = new Date(formData.start_time);
    const maxDates = formData.recurrence.max_occurrences || 10;
    const endDate = formData.recurrence.end_date ? new Date(formData.recurrence.end_date) : null;

    let currentDate = new Date(startDate);
    let count = 0;

    while (count < maxDates && (!endDate || currentDate <= endDate)) {
      if (formData.recurrence.pattern === 'weekly') {
        const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as WeekDay;
        if (selectedDays.includes(dayName)) {
          dates.push(format(currentDate, 'yyyy-MM-dd'));
          count++;
        }
        currentDate = addDays(currentDate, 1);
      } else if (formData.recurrence.pattern === 'daily') {
        dates.push(format(currentDate, 'yyyy-MM-dd'));
        count++;
        currentDate = addDays(currentDate, formData.recurrence.interval);
      } else if (formData.recurrence.pattern === 'monthly') {
        dates.push(format(currentDate, 'yyyy-MM-dd'));
        count++;
        currentDate = addMonths(currentDate, formData.recurrence.interval);
      }

      // Safety break to prevent infinite loops
      if (dates.length > 100) break;
    }

    setPreviewDates(dates);
  };

  const handleDayToggle = (day: WeekDay) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    setSelectedDays(newDays);
    setFormData(prev => ({
      ...prev,
      recurrence: { ...prev.recurrence, days_of_week: newDays }
    }));
  };

  const checkForConflicts = async () => {
    if (!court || previewDates.length === 0) return;

    try {
      const response = await axiosInstance.post('/court-reservations/check-conflicts', {
        court_id: court.id,
        dates: previewDates,
        start_time: format(parseISO(formData.start_time), 'HH:mm'),
        duration_hours: formData.duration_hours
      });

      setConflicts(response.data.data.conflicts || []);
    } catch (error) {
      console.error('Error checking conflicts:', error);
    }
  };

  const handleSubmit = async () => {
    if (!court || !formData.start_time) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedDays.length === 0 && formData.recurrence.pattern === 'weekly') {
      toast.error('Please select at least one day of the week');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        court_id: court.id,
        recurrence: {
          ...formData.recurrence,
          days_of_week: formData.recurrence.pattern === 'weekly' ? selectedDays : undefined,
          end_date: endType === 'date' ? formData.recurrence.end_date : undefined,
          max_occurrences: endType === 'occurrences' ? formData.recurrence.max_occurrences : undefined
        }
      };

      const response = await axiosInstance.post('/court-reservations/recurring', bookingData);

      if (response.data.success) {
        toast.success(`${response.data.data.created_count} recurring bookings created successfully!`);
        onClose();
        onSuccess?.();
        resetForm();
      }
    } catch (error: any) {
      console.error('Error creating recurring booking:', error);
      toast.error(error.response?.data?.message || 'Failed to create recurring booking');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      court_id: '',
      start_time: '',
      duration_hours: 1,
      purpose: '',
      match_type: 'practice',
      participants: [],
      guest_count: 0,
      special_requests: '',
      recurrence: {
        pattern: 'weekly',
        interval: 1,
        days_of_week: ['monday'],
        end_date: '',
        max_occurrences: 10
      }
    });
    setSelectedDays(['monday']);
    setEndType('occurrences');
    setConflicts([]);
    setPreviewDates([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-[800px] max-h-[90vh] overflow-y-auto shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Repeat className="h-5 w-5 mr-2" />
            Create Recurring Booking
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Court Info */}
          {court && (
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="font-medium text-blue-900">{court.name}</p>
                  <p className="text-sm text-blue-700">${court.hourly_rate}/hour</p>
                </div>
              </div>
            </div>
          )}

          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time *</label>
              <input
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours) *</label>
              <select
                value={formData.duration_hours}
                onChange={(e) => setFormData({ ...formData, duration_hours: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0.5}>30 minutes</option>
                <option value={1}>1 hour</option>
                <option value={1.5}>1.5 hours</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
                <option value={4}>4 hours</option>
              </select>
            </div>
          </div>

          {/* Recurrence Pattern */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Recurrence Pattern</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Pattern</label>
                <select
                  value={formData.recurrence.pattern}
                  onChange={(e) => setFormData({
                    ...formData,
                    recurrence: { ...formData.recurrence, pattern: e.target.value as RecurrencePattern }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Every</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={formData.recurrence.interval}
                    onChange={(e) => setFormData({
                      ...formData,
                      recurrence: { ...formData.recurrence, interval: parseInt(e.target.value) || 1 }
                    })}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    {formData.recurrence.pattern === 'daily' && 'day(s)'}
                    {formData.recurrence.pattern === 'weekly' && 'week(s)'}
                    {formData.recurrence.pattern === 'monthly' && 'month(s)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Days of Week (for weekly pattern) */}
            {formData.recurrence.pattern === 'weekly' && (
              <div className="mt-4">
                <label className="block text-sm text-gray-600 mb-2">Days of the week</label>
                <div className="flex space-x-2">
                  {weekDays.map((day) => (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => handleDayToggle(day.key)}
                      className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                        selectedDays.includes(day.key)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* End Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">End Condition</label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="end-occurrences"
                  checked={endType === 'occurrences'}
                  onChange={() => setEndType('occurrences')}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="end-occurrences" className="ml-2 flex items-center">
                  <span className="text-sm text-gray-600 mr-2">After</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.recurrence.max_occurrences}
                    onChange={(e) => setFormData({
                      ...formData,
                      recurrence: { ...formData.recurrence, max_occurrences: parseInt(e.target.value) || 10 }
                    })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                    disabled={endType !== 'occurrences'}
                  />
                  <span className="text-sm text-gray-600 ml-2">occurrences</span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="end-date"
                  checked={endType === 'date'}
                  onChange={() => setEndType('date')}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="end-date" className="ml-2 flex items-center">
                  <span className="text-sm text-gray-600 mr-2">On</span>
                  <input
                    type="date"
                    value={formData.recurrence.end_date}
                    onChange={(e) => setFormData({
                      ...formData,
                      recurrence: { ...formData.recurrence, end_date: e.target.value }
                    })}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                    disabled={endType !== 'date'}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <input
                type="text"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Weekly practice session"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Match Type</label>
              <select
                value={formData.match_type}
                onChange={(e) => setFormData({ ...formData, match_type: e.target.value as any })}
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
          </div>

          {/* Preview */}
          {previewDates.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Preview ({previewDates.length} bookings)
              </h4>
              <div className="bg-gray-50 p-4 rounded-md max-h-40 overflow-y-auto">
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {previewDates.slice(0, 20).map((date, index) => (
                    <div key={index} className="bg-white px-2 py-1 rounded border text-center">
                      {format(new Date(date), 'MMM dd')}
                    </div>
                  ))}
                  {previewDates.length > 20 && (
                    <div className="text-gray-500 text-center py-1">
                      +{previewDates.length - 20} more
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={checkForConflicts}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Check for conflicts
              </button>
            </div>
          )}

          {/* Conflicts */}
          {conflicts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Conflicts Found</h4>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{conflicts.length} booking(s) conflict with existing reservations:</p>
                    <ul className="mt-1 space-y-1">
                      {conflicts.slice(0, 5).map((conflict, index) => (
                        <li key={index}>
                          • {format(new Date(conflict.date), 'MMM dd, yyyy')} at {conflict.time}
                        </li>
                      ))}
                      {conflicts.length > 5 && <li>• ... and {conflicts.length - 5} more</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special requests or requirements..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !court || !formData.start_time}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : `Create ${previewDates.length} Bookings`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringBookingModal;