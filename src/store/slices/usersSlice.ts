import { createSlice } from '@reduxjs/toolkit';
import { User, UsersQueryParams, UpdateUserRequest, UsersResponse, PlayersResponse, UserResponse, UpdateUserResponse } from '../../types/api';
import { api } from '../../lib/api';
import { setPending, clearPending } from './pendingSlice';

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

// Action creators that manage pending state
export const fetchUsers = (params: UsersQueryParams) => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'users/fetchUsersStart' });
    
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const result = await api.get<UsersResponse>(`/users?${queryString}`);
    
    dispatch({ type: 'users/fetchUsersSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'users/fetchUsersFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
};

export const fetchPlayers = (params: Partial<UsersQueryParams>) => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'users/fetchPlayersStart' });
    
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const result = await api.get<PlayersResponse>(`/users/players?${queryString}`);
    
    dispatch({ type: 'users/fetchPlayersSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'users/fetchPlayersFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
};

export const fetchUser = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'users/fetchUserStart' });
    
    const result = await api.get<UserResponse>(`/users/${id}`);
    
    dispatch({ type: 'users/fetchUserSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'users/fetchUserFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
};

export const updateUser = ({ id, userData }: { id: string; userData: UpdateUserRequest }) => async (dispatch: any) => {
  try {
    dispatch(setPending());
    dispatch({ type: 'users/updateUserStart' });
    
    const result = await api.put<UpdateUserResponse>(`/users/${id}`, userData);
    
    dispatch({ type: 'users/updateUserSuccess', payload: result });
    
    return result;
  } catch (error) {
    dispatch({ type: 'users/updateUserFailure', payload: error });
    throw error;
  } finally {
    dispatch(clearPending());
  }
};

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
      .addCase('users/fetchUsersStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('users/fetchUsersSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as any;
        state.users = payload?.data || [];
        state.pagination = payload?.pagination || null;
      })
      .addCase('users/fetchUsersFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users';
      })
      // Fetch Players
      .addCase('users/fetchPlayersStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('users/fetchPlayersSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as any;
        state.users = payload?.data || [];
        state.pagination = payload?.pagination || null;
      })
      .addCase('users/fetchPlayersFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch players';
      })
      // Fetch User
      .addCase('users/fetchUserStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('users/fetchUserSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.data) {
          state.currentUser = payload.data;
        }
      })
      .addCase('users/fetchUserFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user';
      })
      // Update User
      .addCase('users/updateUserStart', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('users/updateUserSuccess', (state, action: any) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.data) {
          state.currentUser = payload.data;
          // Update user in users array if exists
          const index = state.users.findIndex(user => user.id === payload.data.id);
          if (index !== -1) {
            state.users[index] = payload.data;
          }
        }
      })
      .addCase('users/updateUserFailure', (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update user';
      });
  },
});

export const { clearError, setCurrentUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer; 