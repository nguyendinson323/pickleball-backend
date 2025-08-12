import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { Court, CourtsQueryParams, CreateCourtRequest, BookCourtRequest, CourtReservation } from '../../types/api';

interface CourtWithDetails extends Court {
  availability?: Array<{
    start_time: string;
    end_time: string;
    available: boolean;
  }>;
  bookings?: CourtReservation[];
}

interface CourtsState {
  courts: Court[];
  currentCourt: CourtWithDetails | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: CourtsState = {
  courts: [],
  currentCourt: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchCourts = createAsyncThunk(
  'courts/fetchCourts',
  async (params: CourtsQueryParams) => {
    const response = await apiService.getCourts(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const fetchCourt = createAsyncThunk(
  'courts/fetchCourt',
  async (id: string) => {
    const response = await apiService.getCourt(id);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const createCourt = createAsyncThunk(
  'courts/createCourt',
  async (courtData: CreateCourtRequest) => {
    const response = await apiService.createCourt(courtData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const bookCourt = createAsyncThunk(
  'courts/bookCourt',
  async ({ courtId, bookingData }: { courtId: string; bookingData: BookCourtRequest }) => {
    const response = await apiService.bookCourt(courtId, bookingData);
    if (!response.success) throw new Error(response.message);
    return { courtId, reservation: response.data.reservation };
  }
);

export const getCourtAvailability = createAsyncThunk(
  'courts/getCourtAvailability',
  async ({ courtId, params }: { courtId: string; params: { date: string; duration?: number } }) => {
    const response = await apiService.getCourtAvailability(courtId, params);
    if (!response.success) throw new Error(response.message);
    return { courtId, availability: response.data || [] };
  }
);

export const getCourtBookings = createAsyncThunk(
  'courts/getCourtBookings',
  async ({ courtId, params }: { courtId: string; params: { date?: string; status?: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no_show' } }) => {
    const response = await apiService.getCourtBookings(courtId, params);
    if (!response.success) throw new Error(response.message);
    return { courtId, bookings: response.data || [] };
  }
);

const courtsSlice = createSlice({
  name: 'courts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentCourt: (state, action) => {
      state.currentCourt = action.payload;
    },
    clearCourts: (state) => {
      state.courts = [];
      state.pagination = null;
    },
    addCourt: (state, action) => {
      state.courts.unshift(action.payload);
    },
    updateCourt: (state, action) => {
      const index = state.courts.findIndex(court => court.id === action.payload.id);
      if (index !== -1) {
        state.courts[index] = action.payload;
      }
      if (state.currentCourt && state.currentCourt.id === action.payload.id) {
        state.currentCourt = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courts
      .addCase(fetchCourts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourts.fulfilled, (state, action) => {
        state.loading = false;
        state.courts = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchCourts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courts';
      })
      // Fetch Court
      .addCase(fetchCourt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourt = action.payload;
      })
      .addCase(fetchCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch court';
      })
      // Create Court
      .addCase(createCourt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourt.fulfilled, (state, action) => {
        state.loading = false;
        state.courts.unshift(action.payload);
        state.currentCourt = action.payload;
      })
      .addCase(createCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create court';
      })
      // Book Court
      .addCase(bookCourt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookCourt.fulfilled, (state, action) => {
        state.loading = false;
        // Update current court if it's the same court
        if (state.currentCourt && state.currentCourt.id === action.payload.courtId) {
          state.currentCourt = {
            ...state.currentCourt,
            total_bookings: state.currentCourt.total_bookings + 1
          };
        }
        // Update court in courts array if exists
        const index = state.courts.findIndex(c => c.id === action.payload.courtId);
        if (index !== -1) {
          state.courts[index] = {
            ...state.courts[index],
            total_bookings: state.courts[index].total_bookings + 1
          };
        }
      })
      .addCase(bookCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to book court';
      })
      // Get Court Availability
      .addCase(getCourtAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourtAvailability.fulfilled, (state, action) => {
        state.loading = false;
        // Update current court with availability if it's the same court
        if (state.currentCourt && state.currentCourt.id === action.payload.courtId) {
          state.currentCourt = { ...state.currentCourt, availability: action.payload.availability };
        }
      })
      .addCase(getCourtAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get court availability';
      })
      // Get Court Bookings
      .addCase(getCourtBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourtBookings.fulfilled, (state, action) => {
        state.loading = false;
        // Update current court with bookings if it's the same court
        if (state.currentCourt && state.currentCourt.id === action.payload.courtId) {
          state.currentCourt = { ...state.currentCourt, bookings: action.payload.bookings };
        }
      })
      .addCase(getCourtBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get court bookings';
      });
  },
});

export const { clearError, setCurrentCourt, clearCourts, addCourt, updateCourt } = courtsSlice.actions;
export default courtsSlice.reducer; 