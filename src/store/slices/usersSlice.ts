import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UsersQueryParams, UpdateUserRequest } from '../../types/api';
import { api } from '../../lib/api';

interface UsersState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: UsersQueryParams) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return await api.get(`/users?${queryString}`);
  }
);

export const fetchPlayers = createAsyncThunk(
  'users/fetchPlayers',
  async (params: Partial<UsersQueryParams>) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return await api.get(`/users/players?${queryString}`);
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: string) => {
    return await api.get(`/users/${id}`);
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: string; userData: UpdateUserRequest }) => {
    return await api.put(`/users/${id}`, userData);
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.users = payload?.data || [];
        state.pagination = payload?.pagination || null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // Fetch Players
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.users = payload?.data || [];
        state.pagination = payload?.pagination || null;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch players';
      })
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload) {
          state.currentUser = payload;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload) {
          state.currentUser = payload;
          // Update user in users array if exists
          const index = state.users.findIndex(user => user.id === payload.id);
          if (index !== -1) {
            state.users[index] = payload;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

export const { clearError, setCurrentUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer; 