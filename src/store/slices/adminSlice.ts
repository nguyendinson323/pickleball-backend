import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UsersQueryParams, UpdateUserRoleRequest } from '../../types/api';
import { apiService } from '../../services/api';

interface AdminState {
  dashboardStats: {
    total_users: number;
    total_clubs: number;
    total_tournaments: number;
    total_revenue: number;
    active_memberships: number;
    new_users_this_month: number;
    upcoming_tournaments: number;
    pending_payments: number;
  } | null;
  adminUsers: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: AdminState = {
  dashboardStats: null,
  adminUsers: [],
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async () => {
    const response = await apiService.getDashboardStats();
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchAdminUsers',
  async (params: Partial<UsersQueryParams>) => {
    const response = await apiService.getAdminUsers(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }: { userId: string; role: string }) => {
    const response = await apiService.updateUserRole(userId, { role: role as 'user' | 'moderator' | 'admin' | 'super_admin' });
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminData: (state) => {
      state.dashboardStats = null;
      state.adminUsers = [];
      state.pagination = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      })
      // Fetch Admin Users
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.adminUsers = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin users';
      })
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        // Update user in the admin users list
        const index = state.adminUsers.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.adminUsers[index] = action.payload;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user role';
      });
  },
});

export const { clearAdminData, clearError } = adminSlice.actions;
export default adminSlice.reducer; 