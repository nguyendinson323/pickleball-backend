import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';
import { LoginRequest, RegisterRequest, ProfileResponse, LoginResponse, RegisterResponse } from '../../types/api';

// Action creators that manage pending state
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest) => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterRequest | FormData) => {
    const response = await api.post<RegisterResponse>('/auth/register', userData);
    return response;
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async () => {
    const response = await api.get<ProfileResponse>('/auth/profile');
    return response;
  }
);

export const restoreAuthState = createAsyncThunk(
  'auth/restoreAuthState',
  async () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (token && refreshToken) {
      try {
        const response = await api.get<ProfileResponse>('/auth/profile');
        return response;
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        throw error;
      }
    } else {
      throw new Error('No authentication tokens found');
    }
  }
);

// Initial state
const initialState = {
  user: null as any,
  token: null as string | null,
  refresh_token: null as string | null,
  loading: false,
  error: null as string | null,
  isAuthenticated: false,
};

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
        const payload = action.payload;
        
        // Backend sends: { success: true, message: "...", data: { user: {...}, tokens: { accessToken, refreshToken } } }
        if (payload?.data?.user && payload?.data?.tokens) {
          state.user = payload.data.user;
          state.token = payload.data.tokens.accessToken;
          state.refresh_token = payload.data.tokens.refreshToken;
          state.isAuthenticated = true;
          
          // Store tokens in localStorage
          localStorage.setItem('token', payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', payload.data.tokens.refreshToken);
          
          console.log('Login successful - User and tokens stored in Redux:', {
            user: payload.data.user,
            hasToken: !!payload.data.tokens.accessToken,
            hasRefreshToken: !!payload.data.tokens.refreshToken,
            profilePhoto: payload.data.user.profile_photo,
            verificationDocuments: payload.data.user.verification_documents
          });
        } else {
          console.error('Invalid login response structure:', payload);
          state.error = 'Invalid response from server';
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        
        // Backend sends: { success: true, message: "...", data: { user: {...}, tokens: { accessToken, refreshToken } } }
        if (payload?.data?.user && payload?.data?.tokens) {
          state.user = payload.data.user;
          state.token = payload.data.tokens.accessToken;
          state.refresh_token = payload.data.tokens.refreshToken;
          state.isAuthenticated = true;
          
          // Store tokens in localStorage
          localStorage.setItem('token', payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', payload.data.tokens.refreshToken);
          
          console.log('Registration successful - User and tokens stored in Redux:', {
            user: payload.data.user,
            hasToken: !!payload.data.tokens.accessToken,
            hasRefreshToken: !!payload.data.tokens.refreshToken,
            profilePhoto: payload.data.user.profile_photo,
            verificationDocuments: payload.data.user.verification_documents
          });
        } else {
          console.error('Invalid register response structure:', payload);
          state.error = 'Invalid response from server';
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Registration failed';
        state.isAuthenticated = false;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (payload?.data) {
          state.user = payload.data;
          state.isAuthenticated = true;
          
          console.log('Profile retrieved successfully:', {
            user: payload.data,
            profilePhoto: payload.data.profile_photo,
            verificationDocuments: payload.data.verification_documents
          });
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to get profile';
        state.isAuthenticated = false;
      })
      // Restore Auth State
      .addCase(restoreAuthState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        
        if (payload?.data) {
          state.user = payload.data;
          state.isAuthenticated = true;
          console.log('Auth state restored successfully:', {
            user: payload.data,
            profilePhoto: payload.data.profile_photo,
            verificationDocuments: payload.data.verification_documents
          });
        }
      })
      .addCase(restoreAuthState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to restore authentication';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setToken, updateUser } = authSlice.actions;
export default authSlice.reducer; 