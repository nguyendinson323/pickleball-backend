import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest } from '../../types/api';
import { api } from '../../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refresh_token: localStorage.getItem('refresh_token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    return await api.post('/auth/login', credentials);
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest) => {
    return await api.post('/auth/register', userData);
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async () => {
    return await api.get('/auth/profile');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.user && payload?.tokens) {
          state.user = payload.user;
          state.token = payload.tokens.accessToken;
          state.refresh_token = payload.tokens.refreshToken;
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.tokens.accessToken);
          localStorage.setItem('refresh_token', payload.tokens.refreshToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.user && payload?.tokens) {
          state.user = payload.user;
          state.token = payload.tokens.accessToken;
          state.refresh_token = payload.tokens.refreshToken;
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.tokens.accessToken);
          localStorage.setItem('refresh_token', payload.tokens.refreshToken);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
        state.isAuthenticated = false;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload) {
          state.user = payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get profile';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setToken, updateUser } = authSlice.actions;
export default authSlice.reducer; 