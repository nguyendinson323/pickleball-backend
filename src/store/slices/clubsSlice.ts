import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Club {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  founded: string;
  type: 'public' | 'private' | 'semi-private';
  category: 'recreation' | 'competitive' | 'social' | 'training';
  website?: string;
  location: string;
  rating: number;
  memberCount: number;
  courtCount: number;
  amenities: string[];
  courts?: any[];
  tournaments?: any[];
}

interface ClubsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
  location?: string;
}

interface CreateClubRequest {
  name: string;
  description: string;
  type: string;
  category: string;
  location: string;
  website?: string;
}

interface ClubsState {
  clubs: Club[];
  currentClub: Club | null;
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

// Async thunks
export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (params: ClubsQueryParams) => {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryString.append(key, value.toString());
    });
    
    const response = await fetch(`/api/clubs?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch clubs');
    return response.json();
  }
);

export const fetchClub = createAsyncThunk(
  'clubs/fetchClub',
  async (id: string) => {
    const response = await fetch(`/api/clubs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch club');
    return response.json();
  }
);

export const createClub = createAsyncThunk(
  'clubs/createClub',
  async (clubData: CreateClubRequest) => {
    const response = await fetch('/api/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubData),
    });
    if (!response.ok) throw new Error('Failed to create club');
    return response.json();
  }
);

export const fetchClubCourts = createAsyncThunk(
  'clubs/fetchClubCourts',
  async (clubId: string) => {
    const response = await fetch(`/api/clubs/${clubId}/courts`);
    if (!response.ok) throw new Error('Failed to fetch club courts');
    return { clubId, courts: await response.json() };
  }
);

export const fetchClubTournaments = createAsyncThunk(
  'clubs/fetchClubTournaments',
  async (clubId: string) => {
    const response = await fetch(`/api/clubs/${clubId}/tournaments`);
    if (!response.ok) throw new Error('Failed to fetch club tournaments');
    return { clubId, tournaments: await response.json() };
  }
);

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    clearClubs: (state) => {
      state.clubs = [];
      state.pagination = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentClub: (state, action: PayloadAction<Club>) => {
      state.currentClub = action.payload;
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
        // Update the club with courts data
        const clubIndex = state.clubs.findIndex(club => club.id === action.payload.clubId);
        if (clubIndex !== -1) {
          state.clubs[clubIndex] = { ...state.clubs[clubIndex], courts: action.payload.courts };
        }
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
        // Update the club with tournaments data
        const clubIndex = state.clubs.findIndex(club => club.id === action.payload.clubId);
        if (clubIndex !== -1) {
          state.clubs[clubIndex] = { ...state.clubs[clubIndex], tournaments: action.payload.tournaments };
        }
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

export const { clearClubs, clearError, setCurrentClub } = clubsSlice.actions;
export default clubsSlice.reducer; 