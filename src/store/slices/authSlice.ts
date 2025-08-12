import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, ProfileResponse } from '../../types/api';
import { api } from '../../lib/api';
import { setPending, clearPending } from './pendingSlice';

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

// Action creators that manage pending state
export const loginUser = (credentials: LoginRequest) => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'auth/loginStart' });
    
    const result = await api.post<LoginResponse>('/auth/login', credentials);
    
    dispatch({ type: 'auth/loginSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'auth/loginFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
};

export const registerUser = (userData: RegisterRequest) => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'auth/registerStart' });
    
    const result = await api.post<RegisterResponse>('/auth/register', userData);
    
    dispatch({ type: 'auth/registerSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'auth/registerFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
};

export const getProfile = () => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'auth/getProfileStart' });
    
    const result = await api.get<ProfileResponse>('/auth/profile');
    
    dispatch({ type: 'auth/getProfileSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'auth/getProfileFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
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
      .addCase('auth/loginStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('auth/loginSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as LoginResponse;
        if (payload?.data) {
          state.user = payload.data.user;
          state.token = payload.data.tokens.accessToken;
          state.refresh_token = payload.data.tokens.refreshToken;
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', payload.data.tokens.refreshToken);
        }
      })
      .addCase('auth/loginFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Register
      .addCase('auth/registerStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('auth/registerSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as RegisterResponse;
        if (payload?.data) {
          state.user = payload.data.user;
          state.token = payload.data.tokens.accessToken;
          state.refresh_token = payload.data.tokens.refreshToken;
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.data.tokens.accessToken);
          localStorage.setItem('refresh_token', payload.data.tokens.refreshToken);
        }
      })
      .addCase('auth/registerFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
        state.isAuthenticated = false;
      })
      // Get Profile
      .addCase('auth/getProfileStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('auth/getProfileSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as ProfileResponse;
        if (payload?.data) {
          state.user = payload.data;
          state.isAuthenticated = true;
        }
      })
      .addCase('auth/getProfileFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get profile';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setToken, updateUser } = authSlice.actions;
export default authSlice.reducer; 