import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OverviewStats, UserStats } from '../../types/api';
import { apiService } from '../../services/api';

interface StatsState {
  overviewStats: OverviewStats | null;
  userStats: UserStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  overviewStats: null,
  userStats: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchOverviewStats = createAsyncThunk(
  'stats/fetchOverviewStats',
  async () => {
    const response = await apiService.getOverviewStats();
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const fetchUserStats = createAsyncThunk(
  'stats/fetchUserStats',
  async (params: {
    start_date?: string;
    end_date?: string;
    state?: string;
    category?: string;
  }) => {
    const response = await apiService.getUserStats(params);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats: (state) => {
      state.overviewStats = null;
      state.userStats = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Overview Stats
      .addCase(fetchOverviewStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverviewStats.fulfilled, (state, action) => {
        state.loading = false;
        state.overviewStats = action.payload;
      })
      .addCase(fetchOverviewStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch overview stats';
      })
      // Fetch User Stats
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.userStats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user stats';
      });
  },
});

export const { clearStats, clearError } = statsSlice.actions;
export default statsSlice.reducer; 