import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Court, CourtsQueryParams, CreateCourtRequest, BookCourtRequest } from '../../types/api';
import { apiService } from '../../services/api';

interface CourtsState {
  courts: Court[];
  currentCourt: Court | null;
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

// Async thunks
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
    return { courtId, booking: response.data };
  }
);

const courtsSlice = createSlice({
  name: 'courts',
  initialState,
  reducers: {
    clearCourts: (state) => {
      state.courts = [];
      state.pagination = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentCourt: (state, action) => {
      state.currentCourt = action.payload;
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
        // Update court with new booking
        const courtIndex = state.courts.findIndex(c => c.id === action.payload.courtId);
        if (courtIndex !== -1) {
          state.courts[courtIndex] = {
            ...state.courts[courtIndex],
            total_bookings: state.courts[courtIndex].total_bookings + 1
          };
        }
        if (state.currentCourt && state.currentCourt.id === action.payload.courtId) {
          state.currentCourt = {
            ...state.currentCourt,
            total_bookings: state.currentCourt.total_bookings + 1
          };
        }
      })
      .addCase(bookCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to book court';
      });
  },
});

export const { clearCourts, clearError, setCurrentCourt } = courtsSlice.actions;
export default courtsSlice.reducer; 