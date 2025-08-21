import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

interface MessagesState {
  messages: any[];
  currentMessage: any | null;
  loading: boolean;
  error: string | null;
  unreadCount: number;
  statistics: any | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: MessagesState = {
  messages: [],
  currentMessage: null,
  loading: false,
  error: null,
  unreadCount: 0,
  statistics: null,
  pagination: null,
};

// Message operations
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (messageData: any) => {
    return await api.post('/messages', messageData);
  }
);

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (params: any) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/messages?${queryString}`);
  }
);

export const getMessageById = createAsyncThunk(
  'messages/getMessageById',
  async (id: string) => {
    return await api.get(`/messages/${id}`);
  }
);

export const markMessageAsRead = createAsyncThunk(
  'messages/markMessageAsRead',
  async (id: string) => {
    return await api.put(`/messages/${id}/read`);
  }
);

export const markAllMessagesAsRead = createAsyncThunk(
  'messages/markAllMessagesAsRead',
  async () => {
    return await api.put('/messages/read-all');
  }
);

export const toggleStarMessage = createAsyncThunk(
  'messages/toggleStarMessage',
  async ({ id, starred }: { id: string; starred: boolean }) => {
    return await api.put(`/messages/${id}/star`, { starred });
  }
);

export const archiveMessage = createAsyncThunk(
  'messages/archiveMessage',
  async (id: string) => {
    return await api.put(`/messages/${id}/archive`);
  }
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (id: string) => {
    return await api.delete(`/messages/${id}`);
  }
);

export const getUnreadCount = createAsyncThunk(
  'messages/getUnreadCount',
  async () => {
    return await api.get('/messages/unread-count');
  }
);

// Admin-specific operations
export const sendSystemNotification = createAsyncThunk(
  'messages/sendSystemNotification',
  async (notificationData: any) => {
    return await api.post('/messages/system-notification', notificationData);
  }
);

export const sendBroadcastMessage = createAsyncThunk(
  'messages/sendBroadcastMessage',
  async (broadcastData: any) => {
    return await api.post('/messages/broadcast', broadcastData);
  }
);

export const getMessageStatistics = createAsyncThunk(
  'messages/getMessageStatistics',
  async (period: string = 'last_30_days') => {
    return await api.get(`/messages/stats?period=${period}`);
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.pagination = null;
    },
    clearCurrentMessage: (state) => {
      state.currentMessage = null;
    },
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
      if (!action.payload.is_read) {
        state.unreadCount += 1;
      }
    },
    removeMessage: (state, action) => {
      const index = state.messages.findIndex(m => m.id === action.payload);
      if (index !== -1) {
        if (!state.messages[index].is_read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.messages.splice(index, 1);
      }
    },
    updateUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.data) {
          state.messages.unshift(payload.data);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send message';
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.messages = payload?.data || [];
        state.pagination = payload?.pagination || null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      })
      // Get Message By ID
      .addCase(getMessageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageById.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.currentMessage = payload?.data || null;
      })
      .addCase(getMessageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch message';
      })
      // Mark as Read
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const payload = action.payload as any;
        if (payload?.data) {
          const messageIndex = state.messages.findIndex(m => m.id === payload.data.id);
          if (messageIndex !== -1) {
            state.messages[messageIndex] = payload.data;
            if (!state.messages[messageIndex].is_read) {
              state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
          }
          if (state.currentMessage && state.currentMessage.id === payload.data.id) {
            state.currentMessage = payload.data;
          }
        }
      })
      // Mark All as Read
      .addCase(markAllMessagesAsRead.fulfilled, (state) => {
        state.messages.forEach(message => {
          message.is_read = true;
        });
        state.unreadCount = 0;
      })
      // Toggle Star
      .addCase(toggleStarMessage.fulfilled, (state, action) => {
        const payload = action.payload as any;
        if (payload?.data) {
          const messageIndex = state.messages.findIndex(m => m.id === payload.data.id);
          if (messageIndex !== -1) {
            state.messages[messageIndex] = payload.data;
          }
        }
      })
      // Archive Message
      .addCase(archiveMessage.fulfilled, (state, action) => {
        const payload = action.payload as any;
        if (payload?.data) {
          const messageIndex = state.messages.findIndex(m => m.id === payload.data.id);
          if (messageIndex !== -1) {
            state.messages[messageIndex] = payload.data;
          }
        }
      })
      // Delete Message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageId = action.meta.arg;
        state.messages = state.messages.filter(m => m.id !== messageId);
      })
      // Get Unread Count
      .addCase(getUnreadCount.fulfilled, (state, action) => {
        const payload = action.payload as any;
        state.unreadCount = payload?.data?.unread_count || 0;
      })
      // Send System Notification
      .addCase(sendSystemNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSystemNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendSystemNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send system notification';
      })
      // Send Broadcast Message
      .addCase(sendBroadcastMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendBroadcastMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendBroadcastMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send broadcast message';
      })
      // Get Message Statistics
      .addCase(getMessageStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageStatistics.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.statistics = payload?.data || null;
      })
      .addCase(getMessageStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch message statistics';
      })
      // Fetch Public Announcements
      .addCase(fetchPublicAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.publicAnnouncements = payload?.data || [];
      })
      .addCase(fetchPublicAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch public announcements';
      });
  },
});

export const { 
  clearError, 
  clearMessages, 
  clearCurrentMessage, 
  addMessage, 
  removeMessage, 
  updateUnreadCount 
} = messagesSlice.actions;

export default messagesSlice.reducer;