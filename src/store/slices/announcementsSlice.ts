import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

interface AnnouncementState {
  announcements: any[];
  publicAnnouncements: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  publicAnnouncements: [],
  loading: false,
  error: null,
  pagination: null,
};

// Admin announcement management
export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async (params: any) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/announcements?${queryString}`);
  }
);

export const createAnnouncement = createAsyncThunk(
  'announcements/createAnnouncement',
  async (announcementData: any) => {
    return await api.post('/announcements', announcementData);
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcements/updateAnnouncement',
  async ({ id, data }: { id: string; data: any }) => {
    return await api.put(`/announcements/${id}`, data);
  }
);

export const publishAnnouncement = createAsyncThunk(
  'announcements/publishAnnouncement',
  async ({ id, send_notification = false }: { id: string; send_notification?: boolean }) => {
    return await api.post(`/announcements/${id}/publish`, { send_notification });
  }
);

export const archiveAnnouncement = createAsyncThunk(
  'announcements/archiveAnnouncement',
  async (id: string) => {
    return await api.post(`/announcements/${id}/archive`, {});
  }
);

export const deleteAnnouncement = createAsyncThunk(
  'announcements/deleteAnnouncement',
  async (id: string) => {
    return await api.delete(`/announcements/${id}`);
  }
);

export const togglePinAnnouncement = createAsyncThunk(
  'announcements/togglePinAnnouncement',
  async (id: string) => {
    return await api.post(`/announcements/${id}/pin`, {});
  }
);

export const sendBulkAnnouncement = createAsyncThunk(
  'announcements/sendBulkAnnouncement',
  async ({ id, user_ids, send_notification = true }: { 
    id: string; 
    user_ids: string[]; 
    send_notification?: boolean 
  }) => {
    return await api.post(`/announcements/${id}/send-bulk`, { user_ids, send_notification });
  }
);

export const getAnnouncementAnalytics = createAsyncThunk(
  'announcements/getAnnouncementAnalytics',
  async (id: string) => {
    return await api.get(`/announcements/${id}/analytics`);
  }
);

// Public announcements for users
export const fetchPublicAnnouncements = createAsyncThunk(
  'announcements/fetchPublicAnnouncements',
  async (params: any = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/announcements/public?${queryString}`);
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAnnouncements: (state) => {
      state.announcements = [];
      state.pagination = null;
    },
    clearPublicAnnouncements: (state) => {
      state.publicAnnouncements = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Announcements (Admin)
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.announcements = payload?.data || [];
        state.pagination = payload?.pagination || null;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch announcements';
      })
      // Create Announcement
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.data) {
          state.announcements.unshift(payload.data);
        }
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create announcement';
      })
      // Update Announcement
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.data) {
          const index = state.announcements.findIndex(a => a.id === payload.data.id);
          if (index !== -1) {
            state.announcements[index] = payload.data;
          }
        }
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update announcement';
      })
      // Publish Announcement
      .addCase(publishAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.data) {
          const index = state.announcements.findIndex(a => a.id === payload.data.id);
          if (index !== -1) {
            state.announcements[index] = payload.data;
          }
        }
      })
      .addCase(publishAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to publish announcement';
      })
      // Delete Announcement
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const announcementId = action.meta.arg;
        state.announcements = state.announcements.filter(a => a.id !== announcementId);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete announcement';
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

export const { clearError, clearAnnouncements, clearPublicAnnouncements } = announcementsSlice.actions;
export default announcementsSlice.reducer;