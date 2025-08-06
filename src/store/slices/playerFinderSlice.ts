import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import {
  User,
  PlayerFinder,
  SearchPlayersQueryParams,
  UpdatePlayerFinderPreferencesRequest,
  SendMatchRequestRequest,
  SearchPlayersResponse,
  NearbyPlayersResponse,
  PlayerFinderPreferencesResponse,
  UpdatePlayerFinderPreferencesResponse,
  TogglePlayerFinderResponse,
  PlayerFinderStatsResponse,
  SendMatchRequestResponse,
} from '../../types/api';

interface PlayerFinderState {
  searchResults: User[];
  nearbyPlayers: Array<User & { distance_km: number }>;
  preferences: PlayerFinder | null;
  stats: any;
  loading: boolean;
  error: string | null;
}

const initialState: PlayerFinderState = {
  searchResults: [],
  nearbyPlayers: [],
  preferences: null,
  stats: null,
  loading: false,
  error: null,
};

// Async thunks
export const searchPlayers = createAsyncThunk(
  'playerFinder/searchPlayers',
  async (params: SearchPlayersQueryParams) => {
    const response = await apiService.searchPlayers(params);
    return response.data;
  }
);

export const getNearbyPlayers = createAsyncThunk(
  'playerFinder/getNearbyPlayers',
  async (limit: number = 10) => {
    const response = await apiService.getNearbyPlayers(limit);
    return response.data;
  }
);

export const getPlayerFinderPreferences = createAsyncThunk(
  'playerFinder/getPreferences',
  async () => {
    const response = await apiService.getPlayerFinderPreferences();
    return response.data;
  }
);

export const updatePlayerFinderPreferences = createAsyncThunk(
  'playerFinder/updatePreferences',
  async (preferences: UpdatePlayerFinderPreferencesRequest) => {
    const response = await apiService.updatePlayerFinderPreferences(preferences);
    return response.data;
  }
);

export const togglePlayerFinderStatus = createAsyncThunk(
  'playerFinder/toggleStatus',
  async () => {
    const response = await apiService.togglePlayerFinderStatus();
    return response.data;
  }
);

export const getPlayerFinderStats = createAsyncThunk(
  'playerFinder/getStats',
  async () => {
    const response = await apiService.getPlayerFinderStats();
    return response.data;
  }
);

export const sendMatchRequest = createAsyncThunk(
  'playerFinder/sendMatchRequest',
  async ({ targetUserId, requestData }: { targetUserId: string; requestData: SendMatchRequestRequest }) => {
    const response = await apiService.sendMatchRequest(targetUserId, requestData);
    return response.data;
  }
);

const playerFinderSlice = createSlice({
  name: 'playerFinder',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearNearbyPlayers: (state) => {
      state.nearbyPlayers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Search players
      .addCase(searchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search players';
      })
      // Get nearby players
      .addCase(getNearbyPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNearbyPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyPlayers = action.payload;
      })
      .addCase(getNearbyPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get nearby players';
      })
      // Get preferences
      .addCase(getPlayerFinderPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerFinderPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(getPlayerFinderPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get preferences';
      })
      // Update preferences
      .addCase(updatePlayerFinderPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlayerFinderPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(updatePlayerFinderPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update preferences';
      })
      // Toggle status
      .addCase(togglePlayerFinderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePlayerFinderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(togglePlayerFinderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle status';
      })
      // Get stats
      .addCase(getPlayerFinderStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerFinderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getPlayerFinderStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get stats';
      })
      // Send match request
      .addCase(sendMatchRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMatchRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMatchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send match request';
      });
  },
});

export const { clearError, clearSearchResults, clearNearbyPlayers } = playerFinderSlice.actions;
export default playerFinderSlice.reducer; 