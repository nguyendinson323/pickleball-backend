import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import {
  Banner,
  BannersQueryParams,
  CreateBannerRequest,
  UpdateBannerRequest,
  UpdateBannerPositionRequest,
  CarouselBannersResponse,
  ActiveBannersResponse,
  BannersResponse,
  CreateBannerResponse,
  UpdateBannerResponse,
  DeleteBannerResponse,
  ToggleBannerResponse,
  UpdateBannerPositionResponse,
  TrackBannerViewResponse,
  TrackBannerClickResponse,
  BannerAnalyticsResponse,
} from '../../types/api';

interface BannersState {
  carouselBanners: Banner[];
  activeBanners: Banner[];
  banners: Banner[];
  currentBanner: Banner | null;
  analytics: any;
  loading: boolean;
  error: string | null;
}

const initialState: BannersState = {
  carouselBanners: [],
  activeBanners: [],
  banners: [],
  currentBanner: null,
  analytics: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCarouselBanners = createAsyncThunk(
  'banners/fetchCarouselBanners',
  async () => {
    const response = await apiService.getCarouselBanners();
    return response.data;
  }
);

export const fetchActiveBanners = createAsyncThunk(
  'banners/fetchActiveBanners',
  async (params: { display_type?: 'carousel' | 'sidebar' | 'popup' | 'notification'; target_audience?: 'all' | 'players' | 'coaches' | 'clubs' | 'partners' | 'admins' }) => {
    const response = await apiService.getActiveBanners(params);
    return response.data;
  }
);

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (params: BannersQueryParams) => {
    const response = await apiService.getBanners(params);
    return response;
  }
);

export const createBanner = createAsyncThunk(
  'banners/createBanner',
  async (bannerData: CreateBannerRequest) => {
    const response = await apiService.createBanner(bannerData);
    return response.data;
  }
);

export const updateBanner = createAsyncThunk(
  'banners/updateBanner',
  async ({ id, bannerData }: { id: string; bannerData: UpdateBannerRequest }) => {
    const response = await apiService.updateBanner(id, bannerData);
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  'banners/deleteBanner',
  async (id: string) => {
    await apiService.deleteBanner(id);
    return id;
  }
);

export const toggleBannerStatus = createAsyncThunk(
  'banners/toggleBannerStatus',
  async (id: string) => {
    const response = await apiService.toggleBannerStatus(id);
    return response.data;
  }
);

export const updateBannerPosition = createAsyncThunk(
  'banners/updateBannerPosition',
  async ({ id, position }: { id: string; position: number }) => {
    const response = await apiService.updateBannerPosition(id, position);
    return response.data;
  }
);

export const trackBannerView = createAsyncThunk(
  'banners/trackBannerView',
  async (id: string) => {
    await apiService.trackBannerView(id);
    return id;
  }
);

export const trackBannerClick = createAsyncThunk(
  'banners/trackBannerClick',
  async (id: string) => {
    await apiService.trackBannerClick(id);
    return id;
  }
);

export const fetchBannerAnalytics = createAsyncThunk(
  'banners/fetchBannerAnalytics',
  async (params: { start_date?: string; end_date?: string }) => {
    const response = await apiService.getBannerAnalytics(params);
    return response.data;
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBanner: (state) => {
      state.currentBanner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch carousel banners
      .addCase(fetchCarouselBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarouselBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselBanners = action.payload;
      })
      .addCase(fetchCarouselBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch carousel banners';
      })
      // Fetch active banners
      .addCase(fetchActiveBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBanners = action.payload;
      })
      .addCase(fetchActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch active banners';
      })
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data || [];
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      })
      // Create banner
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create banner';
      })
      // Update banner
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
        if (state.currentBanner?.id === action.payload.id) {
          state.currentBanner = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update banner';
      })
      // Delete banner
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter(banner => banner.id !== action.payload);
        if (state.currentBanner?.id === action.payload) {
          state.currentBanner = null;
        }
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete banner';
      })
      // Toggle banner status
      .addCase(toggleBannerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBannerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
        if (state.currentBanner?.id === action.payload.id) {
          state.currentBanner = action.payload;
        }
      })
      .addCase(toggleBannerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle banner status';
      })
      // Update banner position
      .addCase(updateBannerPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBannerPosition.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
        if (state.currentBanner?.id === action.payload.id) {
          state.currentBanner = action.payload;
        }
      })
      .addCase(updateBannerPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update banner position';
      })
      // Track banner view
      .addCase(trackBannerView.fulfilled, (state, action) => {
        const banner = state.banners.find(b => b.id === action.payload);
        if (banner) {
          banner.view_count += 1;
        }
      })
      // Track banner click
      .addCase(trackBannerClick.fulfilled, (state, action) => {
        const banner = state.banners.find(b => b.id === action.payload);
        if (banner) {
          banner.click_count += 1;
        }
      })
      // Fetch banner analytics
      .addCase(fetchBannerAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBannerAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchBannerAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banner analytics';
      });
  },
});

export const { clearError, clearCurrentBanner } = bannersSlice.actions;
export default bannersSlice.reducer; 