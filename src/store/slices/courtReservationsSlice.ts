import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import {
  CourtReservation,
  BookCourtRequest,
  CourtAvailabilityQueryParams,
  CourtBookingsQueryParams,
  BookCourtResponse,
  CourtAvailabilityResponse,
  CourtBookingsResponse,
} from '../../types/api';

interface CourtReservationsState {
  reservations: CourtReservation[];
  availability: Array<{
    start_time: string;
    end_time: string;
    available: boolean;
  }>;
  currentReservation: CourtReservation | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourtReservationsState = {
  reservations: [],
  availability: [],
  currentReservation: null,
  loading: false,
  error: null,
};

// Async thunks
export const bookCourt = createAsyncThunk(
  'courtReservations/bookCourt',
  async ({ courtId, bookingData }: { courtId: string; bookingData: BookCourtRequest }) => {
    const response = await apiService.bookCourt(courtId, bookingData);
    return response.data;
  }
);

export const getCourtAvailability = createAsyncThunk(
  'courtReservations/getAvailability',
  async ({ courtId, params }: { courtId: string; params: CourtAvailabilityQueryParams }) => {
    const response = await apiService.getCourtAvailability(courtId, params);
    return response.data;
  }
);

export const getCourtBookings = createAsyncThunk(
  'courtReservations/getBookings',
  async ({ courtId, params }: { courtId: string; params: CourtBookingsQueryParams }) => {
    const response = await apiService.getCourtBookings(courtId, params);
    return response.data;
  }
);

const courtReservationsSlice = createSlice({
  name: 'courtReservations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentReservation: (state) => {
      state.currentReservation = null;
    },
    clearAvailability: (state) => {
      state.availability = [];
    },
    clearBookings: (state) => {
      state.reservations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Book court
      .addCase(bookCourt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookCourt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReservation = action.payload.reservation;
        state.reservations.push(action.payload.reservation);
      })
      .addCase(bookCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to book court';
      })
      // Get court availability
      .addCase(getCourtAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourtAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
      })
      .addCase(getCourtAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get court availability';
      })
      // Get court bookings
      .addCase(getCourtBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourtBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(getCourtBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get court bookings';
      });
  },
});

export const { clearError, clearCurrentReservation, clearAvailability, clearBookings } = courtReservationsSlice.actions;
export default courtReservationsSlice.reducer; 