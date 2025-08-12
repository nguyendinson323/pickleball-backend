import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { Tournament, TournamentsQueryParams, CreateTournamentRequest, TournamentRegistrationRequest } from '../../types/api';

interface TournamentsState {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  upcomingTournaments: Tournament[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: TournamentsState = {
  tournaments: [],
  currentTournament: null,
  upcomingTournaments: [],
  loading: false,
  error: null,
  pagination: null,
};

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async (params: TournamentsQueryParams) => {
    const response = await apiService.getTournaments(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const fetchUpcomingTournaments = createAsyncThunk(
  'tournaments/fetchUpcomingTournaments',
  async (limit: number = 5) => {
    const response = await apiService.getUpcomingTournaments(limit);
    if (!response.success) throw new Error(response.message);
    return response.data || [];
  }
);

export const fetchTournament = createAsyncThunk(
  'tournaments/fetchTournament',
  async (id: string) => {
    const response = await apiService.getTournament(id);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async (tournamentData: CreateTournamentRequest) => {
    const response = await apiService.createTournament(tournamentData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const registerForTournament = createAsyncThunk(
  'tournaments/registerForTournament',
  async ({ tournamentId, registrationData }: { tournamentId: string; registrationData: TournamentRegistrationRequest }) => {
    const response = await apiService.registerForTournament(tournamentId, registrationData);
    if (!response.success) throw new Error(response.message);
    return { tournamentId, registration: response.data };
  }
);

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentTournament: (state, action) => {
      state.currentTournament = action.payload;
    },
    clearTournaments: (state) => {
      state.tournaments = [];
      state.pagination = null;
    },
    addTournament: (state, action) => {
      state.tournaments.unshift(action.payload);
    },
    updateTournament: (state, action) => {
      const index = state.tournaments.findIndex(tournament => tournament.id === action.payload.id);
      if (index !== -1) {
        state.tournaments[index] = action.payload;
      }
      if (state.currentTournament && state.currentTournament.id === action.payload.id) {
        state.currentTournament = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tournaments
      .addCase(fetchTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tournaments';
      })
      // Fetch Upcoming Tournaments
      .addCase(fetchUpcomingTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingTournaments.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingTournaments = action.payload;
      })
      .addCase(fetchUpcomingTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch upcoming tournaments';
      })
      // Fetch Tournament
      .addCase(fetchTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTournament = action.payload;
      })
      .addCase(fetchTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tournament';
      })
      // Create Tournament
      .addCase(createTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments.unshift(action.payload);
        state.currentTournament = action.payload;
      })
      .addCase(createTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create tournament';
      })
      // Register for Tournament
      .addCase(registerForTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForTournament.fulfilled, (state, action) => {
        state.loading = false;
        // Update current tournament if it's the same tournament
        if (state.currentTournament && state.currentTournament.id === action.payload.tournamentId) {
          state.currentTournament = {
            ...state.currentTournament,
            current_participants: state.currentTournament.current_participants + 1
          };
        }
        // Update tournament in tournaments array if exists
        const index = state.tournaments.findIndex(t => t.id === action.payload.tournamentId);
        if (index !== -1) {
          state.tournaments[index] = {
            ...state.tournaments[index],
            current_participants: state.tournaments[index].current_participants + 1
          };
        }
      })
      .addCase(registerForTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register for tournament';
      });
  },
});

export const { clearError, setCurrentTournament, clearTournaments, addTournament, updateTournament } = tournamentsSlice.actions;
export default tournamentsSlice.reducer; 