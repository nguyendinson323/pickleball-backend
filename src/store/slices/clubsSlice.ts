import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { Club, ClubsQueryParams, CreateClubRequest, Court, Tournament } from '../../types/api';

interface ClubWithDetails extends Club {
  courts?: Court[];
  tournaments?: Tournament[];
}

interface ClubsState {
  clubs: Club[];
  currentClub: ClubWithDetails | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: ClubsState = {
  clubs: [],
  currentClub: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (params: ClubsQueryParams) => {
    const response = await apiService.getClubs(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const fetchClub = createAsyncThunk(
  'clubs/fetchClub',
  async (id: string) => {
    const response = await apiService.getClub(id);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const createClub = createAsyncThunk(
  'clubs/createClub',
  async (clubData: CreateClubRequest) => {
    const response = await apiService.createClub(clubData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const fetchClubCourts = createAsyncThunk(
  'clubs/fetchClubCourts',
  async (clubId: string) => {
    const response = await apiService.getClubCourts(clubId);
    if (!response.success) throw new Error(response.message);
    return { clubId, courts: response.data || [] };
  }
);

export const fetchClubTournaments = createAsyncThunk(
  'clubs/fetchClubTournaments',
  async (clubId: string) => {
    const response = await apiService.getClubTournaments(clubId);
    if (!response.success) throw new Error(response.message);
    return { clubId, tournaments: response.data || [] };
  }
);

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentClub: (state, action) => {
      state.currentClub = action.payload;
    },
    clearClubs: (state) => {
      state.clubs = [];
      state.pagination = null;
    },
    addClub: (state, action) => {
      state.clubs.unshift(action.payload);
    },
    updateClub: (state, action) => {
      const index = state.clubs.findIndex(club => club.id === action.payload.id);
      if (index !== -1) {
        state.clubs[index] = action.payload;
      }
      if (state.currentClub && state.currentClub.id === action.payload.id) {
        state.currentClub = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clubs
      .addCase(fetchClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clubs';
      })
      // Fetch Club
      .addCase(fetchClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClub.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClub = action.payload;
      })
      .addCase(fetchClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch club';
      })
      // Create Club
      .addCase(createClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs.unshift(action.payload);
        state.currentClub = action.payload;
      })
      .addCase(createClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create club';
      })
      // Fetch Club Courts
      .addCase(fetchClubCourts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubCourts.fulfilled, (state, action) => {
        state.loading = false;
        // Update current club with courts if it's the same club
        if (state.currentClub && state.currentClub.id === action.payload.clubId) {
          state.currentClub = { ...state.currentClub, courts: action.payload.courts };
        }
      })
      .addCase(fetchClubCourts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch club courts';
      })
      // Fetch Club Tournaments
      .addCase(fetchClubTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubTournaments.fulfilled, (state, action) => {
        state.loading = false;
        // Update current club with tournaments if it's the same club
        if (state.currentClub && state.currentClub.id === action.payload.clubId) {
          state.currentClub = { ...state.currentClub, tournaments: action.payload.tournaments };
        }
      })
      .addCase(fetchClubTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch club tournaments';
      });
  },
});

export const { clearError, setCurrentClub, clearClubs, addClub, updateClub } = clubsSlice.actions;
export default clubsSlice.reducer; 