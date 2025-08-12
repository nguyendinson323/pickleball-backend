import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { Notification, NotificationsQueryParams } from '../../types/api';

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
  unreadCount: number;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
  pagination: null,
  unreadCount: 0,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (params: NotificationsQueryParams) => {
    const response = await apiService.getNotifications(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId: string) => {
    const response = await apiService.markNotificationAsRead(notificationId);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllNotificationsAsRead',
  async () => {
    const response = await apiService.markAllNotificationsAsRead();
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.pagination = null;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.is_read) {
        state.unreadCount += 1;
      }
    },
    removeNotification: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        if (!state.notifications[index].is_read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    updateUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
        // Calculate unread count
        state.unreadCount = state.notifications.filter(n => !n.is_read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      // Mark Notification as Read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        // Update notification in the list
        const index = state.notifications.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
        // Update unread count if notification was unread
        if (action.payload.is_read && state.unreadCount > 0) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to mark notification as read';
      })
      // Mark All Notifications as Read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.loading = false;
        // Mark all notifications as read
        state.notifications = state.notifications.map(n => ({ ...n, is_read: true }));
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to mark all notifications as read';
      });
  },
});

export const { clearError, clearNotifications, addNotification, removeNotification, updateUnreadCount } = notificationsSlice.actions;
export default notificationsSlice.reducer; 