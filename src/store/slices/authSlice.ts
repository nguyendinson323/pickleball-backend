import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest } from '../../types/api';
import { apiService } from '../../services/api';

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
  isAuthenticated: false,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    const response = await apiService.login(credentials);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest) => {
    const response = await apiService.register(userData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async () => {
    const response = await apiService.getProfile();
    if (!response.success) throw new Error(response.message);
    return response.data;
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
      apiService.clearToken();
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      apiService.setToken(action.payload);
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
        state.user = action.payload.user;
        state.token = action.payload.tokens.accessToken;
        state.refresh_token = action.payload.tokens.refreshToken;
        state.isAuthenticated = true;
        apiService.setToken(action.payload.tokens.accessToken);
        localStorage.setItem('token', action.payload.tokens.accessToken);
        localStorage.setItem('refresh_token', action.payload.tokens.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens.accessToken;
        state.refresh_token = action.payload.tokens.refreshToken;
        state.isAuthenticated = true;
        apiService.setToken(action.payload.tokens.accessToken);
        localStorage.setItem('token', action.payload.tokens.accessToken);
        localStorage.setItem('refresh_token', action.payload.tokens.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
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