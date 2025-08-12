import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Ranking, RankingsQueryParams } from '../../types/api';
import { api } from '../../lib/api';

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

export const fetchRankings = createAsyncThunk(
  'rankings/fetchRankings',
  async (params: RankingsQueryParams) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return await api.get(`/rankings?${queryString}`);
  }
);

export const fetchTopPlayers = createAsyncThunk(
  'rankings/fetchTopPlayers',
  async (params: Partial<RankingsQueryParams>) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const data = await api.get(`/rankings/top?${queryString}`);
    return data || [];
  }
);

export const fetchUserRankings = createAsyncThunk(
  'rankings/fetchUserRankings',
  async (userId: string) => {
    const data = await api.get(`/rankings/user/${userId}`);
    return data || [];
  }
);

const rankingsSlice = createSlice({
  name: 'rankings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRankings: (state) => {
      state.rankings = [];
      state.pagination = null;
    },
    clearTopPlayers: (state) => {
      state.topPlayers = [];
    },
    clearUserRankings: (state) => {
      state.userRankings = [];
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
        const payload = action.payload as any;
        state.rankings = payload?.data || [];
        state.pagination = payload?.pagination || null;
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
        const payload = action.payload as any;
        state.topPlayers = payload || [];
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
        const payload = action.payload as any;
        state.userRankings = payload || [];
      })
      .addCase(fetchUserRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user rankings';
      });
  },
});

export const { clearError, clearRankings, clearTopPlayers, clearUserRankings } = rankingsSlice.actions;
export default rankingsSlice.reducer; 