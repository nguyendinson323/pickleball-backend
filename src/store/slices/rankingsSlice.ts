import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Ranking, RankingsQueryParams } from '../../types/api';
import { apiService } from '../../services/api';

interface RankingsState {
  rankings: Ranking[];
  topPlayers: Ranking[];
  userRankings: Ranking[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: RankingsState = {
  rankings: [],
  topPlayers: [],
  userRankings: [],
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchRankings = createAsyncThunk(
  'rankings/fetchRankings',
  async (params: RankingsQueryParams) => {
    const response = await apiService.getRankings(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const fetchTopPlayers = createAsyncThunk(
  'rankings/fetchTopPlayers',
  async (params: Partial<RankingsQueryParams>) => {
    const response = await apiService.getTopPlayers(params);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const fetchUserRankings = createAsyncThunk(
  'rankings/fetchUserRankings',
  async (userId: string) => {
    const response = await apiService.getUserRankings(userId);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

const rankingsSlice = createSlice({
  name: 'rankings',
  initialState,
  reducers: {
    clearRankings: (state) => {
      state.rankings = [];
      state.pagination = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Rankings
      .addCase(fetchRankings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.loading = false;
        state.rankings = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rankings';
      })
      // Fetch Top Players
      .addCase(fetchTopPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.topPlayers = action.payload || [];
      })
      .addCase(fetchTopPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top players';
      })
      // Fetch User Rankings
      .addCase(fetchUserRankings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRankings.fulfilled, (state, action) => {
        state.loading = false;
        state.userRankings = action.payload || [];
      })
      .addCase(fetchUserRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user rankings';
      });
  },
});

export const { clearRankings, clearError } = rankingsSlice.actions;
export default rankingsSlice.reducer; 