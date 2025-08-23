import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  user_type: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  profile_photo?: string;
  verification_documents?: string[];
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  membership_type?: string;
  membership_expiry?: string;
  skill_level?: string;
  play_frequency?: string;
  preferred_play_time?: string;
  coach_certification?: string;
  coach_experience?: string;
  club_name?: string;
  club_type?: string;
  club_address?: string;
  partner_business_name?: string;
  partner_business_type?: string;
  state_organization_name?: string;
  state_region?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  user_type: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.auth.login(credentials);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterData | FormData>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = userData instanceof FormData ? 
        Object.fromEntries(userData.entries()) as unknown as RegisterData : 
        userData;
      const response = await api.auth.register(data as RegisterData);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk<ProfileResponse>(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.auth.getProfile();
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to get profile';
      return rejectWithValue(message);
    }
  }
);

export const refreshUserData = createAsyncThunk<ProfileResponse>(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.auth.getProfile();
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to refresh user data';
      return rejectWithValue(message);
    }
  }
);

export const restoreAuthState = createAsyncThunk<ProfileResponse>(
  'auth/restoreAuthState',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!token || !refreshToken) {
      return rejectWithValue('No authentication tokens found');
    }
    
    try {
      const response = await api.auth.getProfile();
      return response;
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      const message = error.response?.data?.message || error.message || 'Session expired';
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk<void>(
  'auth/logoutUser',
  async () => {
    try {
      await api.auth.logout();
    } catch (error: any) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }
);

export const updateProfile = createAsyncThunk<ProfileResponse, Partial<User>>(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.auth.updateProfile(profileData);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to update profile';
      return rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk<AuthResponse>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return rejectWithValue('No refresh token found');
    }
    
    try {
      const response = await api.auth.refreshToken(refreshToken);
      return response;
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      const message = error.response?.data?.message || error.message || 'Token refresh failed';
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk<any, string>(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.auth.verifyEmail(token);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Email verification failed';
      return rejectWithValue(message);
    }
  }
);

export const requestPasswordReset = createAsyncThunk<any, string>(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.auth.requestPasswordReset(email);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to request password reset';
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk<any, { token: string; password: string }>(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.auth.resetPassword(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to reset password';
      return rejectWithValue(message);
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refresh_token: localStorage.getItem('refresh_token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
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
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data?.user && action.payload?.data?.tokens) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.tokens.accessToken;
          state.refresh_token = action.payload.data.tokens.refreshToken;
          state.isAuthenticated = true;
          
          localStorage.setItem('token', action.payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', action.payload.data.tokens.refreshToken);
          localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refresh_token = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data?.user && action.payload?.data?.tokens) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.tokens.accessToken;
          state.refresh_token = action.payload.data.tokens.refreshToken;
          state.isAuthenticated = true;
          
          localStorage.setItem('token', action.payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', action.payload.data.tokens.refreshToken);
          localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refresh_token = null;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(action.payload.data));
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(restoreAuthState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.isAuthenticated = true;
          
          const storedToken = localStorage.getItem('token');
          const storedRefreshToken = localStorage.getItem('refresh_token');
          
          if (storedToken) state.token = storedToken;
          if (storedRefreshToken) state.refresh_token = storedRefreshToken;
          
          localStorage.setItem('user', JSON.stringify(action.payload.data));
        }
      })
      .addCase(restoreAuthState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refresh_token = null;
      })
      .addCase(refreshUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(action.payload.data));
        }
      })
      .addCase(refreshUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refresh_token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data) {
          state.user = { ...state.user, ...action.payload.data } as User;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload?.data?.tokens) {
          state.token = action.payload.data.tokens.accessToken;
          state.refresh_token = action.payload.data.tokens.refreshToken;
          
          localStorage.setItem('token', action.payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', action.payload.data.tokens.refreshToken);
        }
        
        if (action.payload?.data?.user) {
          state.user = action.payload.data.user;
          localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
        state.refresh_token = null;
        state.user = null;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        
        if (state.user) {
          state.user.is_verified = true;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setToken, updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;