import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { Banner, BannersQueryParams, CreateBannerRequest, UpdateBannerRequest, UpdateBannerPositionRequest } from '../../types/api';

interface BannersState {
  banners: Banner[];
  carouselBanners: Banner[];
  activeBanners: Banner[];
  currentBanner: Banner | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: BannersState = {
  banners: [],
  carouselBanners: [],
  activeBanners: [],
  currentBanner: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (params: BannersQueryParams) => {
    const response = await apiService.getBanners(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const fetchCarouselBanners = createAsyncThunk(
  'banners/fetchCarouselBanners',
  async () => {
    const response = await apiService.getCarouselBanners();
    if (!response.success) throw new Error(response.message);
    return response.data || [];
  }
);

export const fetchActiveBanners = createAsyncThunk(
  'banners/fetchActiveBanners',
  async (params: { display_type?: 'carousel' | 'sidebar' | 'popup' | 'notification'; target_audience?: 'all' | 'players' | 'coaches' | 'clubs' | 'partners' | 'admins' }) => {
    const response = await apiService.getActiveBanners(params);
    if (!response.success) throw new Error(response.message);
    return response.data || [];
  }
);

export const createBanner = createAsyncThunk(
  'banners/createBanner',
  async (bannerData: CreateBannerRequest) => {
    const response = await apiService.createBanner(bannerData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const updateBanner = createAsyncThunk(
  'banners/updateBanner',
  async ({ id, bannerData }: { id: string; bannerData: UpdateBannerRequest }) => {
    const response = await apiService.updateBanner(id, bannerData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  'banners/deleteBanner',
  async (id: string) => {
    const response = await apiService.deleteBanner(id);
    if (!response.success) throw new Error(response.message);
    return id;
  }
);

export const toggleBannerStatus = createAsyncThunk(
  'banners/toggleBannerStatus',
  async (id: string) => {
    const response = await apiService.toggleBannerStatus(id);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const updateBannerPosition = createAsyncThunk(
  'banners/updateBannerPosition',
  async ({ id, position }: { id: string; position: number }) => {
    const response = await apiService.updateBannerPosition(id, position);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const trackBannerView = createAsyncThunk(
  'banners/trackBannerView',
  async (id: string) => {
    const response = await apiService.trackBannerView(id);
    if (!response.success) throw new Error(response.message);
    return id;
  }
);

export const trackBannerClick = createAsyncThunk(
  'banners/trackBannerClick',
  async (id: string) => {
    const response = await apiService.trackBannerClick(id);
    if (!response.success) throw new Error(response.message);
    return id;
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBanner: (state, action) => {
      state.currentBanner = action.payload;
    },
    clearBanners: (state) => {
      state.banners = [];
      state.pagination = null;
    },
    clearCarouselBanners: (state) => {
      state.carouselBanners = [];
    },
    clearActiveBanners: (state) => {
      state.activeBanners = [];
    },
    addBanner: (state, action) => {
      state.banners.unshift(action.payload);
    },
    updateBannerInList: (state, action) => {
      const index = state.banners.findIndex(banner => banner.id === action.payload.id);
      if (index !== -1) {
        state.banners[index] = action.payload;
      }
      if (state.currentBanner && state.currentBanner.id === action.payload.id) {
        state.currentBanner = action.payload;
      }
      // Update in other arrays if exists
      const carouselIndex = state.carouselBanners.findIndex(b => b.id === action.payload.id);
      if (carouselIndex !== -1) {
        state.carouselBanners[carouselIndex] = action.payload;
      }
      const activeIndex = state.activeBanners.findIndex(b => b.id === action.payload.id);
      if (activeIndex !== -1) {
        state.activeBanners[activeIndex] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      })
      // Fetch Carousel Banners
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
      // Fetch Active Banners
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
      // Create Banner
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.unshift(action.payload);
        state.currentBanner = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create banner';
      })
      // Update Banner
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBanner = action.payload;
        // Update banner in banners array if exists
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
        // Update in other arrays if exists
        const carouselIndex = state.carouselBanners.findIndex(b => b.id === action.payload.id);
        if (carouselIndex !== -1) {
          state.carouselBanners[carouselIndex] = action.payload;
        }
        const activeIndex = state.activeBanners.findIndex(b => b.id === action.payload.id);
        if (activeIndex !== -1) {
          state.activeBanners[activeIndex] = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update banner';
      })
      // Delete Banner
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        // Remove banner from all arrays
        state.banners = state.banners.filter(b => b.id !== action.payload);
        state.carouselBanners = state.carouselBanners.filter(b => b.id !== action.payload);
        state.activeBanners = state.activeBanners.filter(b => b.id !== action.payload);
        if (state.currentBanner && state.currentBanner.id === action.payload) {
          state.currentBanner = null;
        }
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete banner';
      })
      // Toggle Banner Status
      .addCase(toggleBannerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBannerStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update banner in all arrays
        const updatedBanner = action.payload;
        const index = state.banners.findIndex(b => b.id === updatedBanner.id);
        if (index !== -1) {
          state.banners[index] = updatedBanner;
        }
        const carouselIndex = state.carouselBanners.findIndex(b => b.id === updatedBanner.id);
        if (carouselIndex !== -1) {
          state.carouselBanners[carouselIndex] = updatedBanner;
        }
        const activeIndex = state.activeBanners.findIndex(b => b.id === updatedBanner.id);
        if (activeIndex !== -1) {
          state.activeBanners[activeIndex] = updatedBanner;
        }
        if (state.currentBanner && state.currentBanner.id === updatedBanner.id) {
          state.currentBanner = updatedBanner;
        }
      })
      .addCase(toggleBannerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle banner status';
      })
      // Update Banner Position
      .addCase(updateBannerPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBannerPosition.fulfilled, (state, action) => {
        state.loading = false;
        // Update banner in all arrays
        const updatedBanner = action.payload;
        const index = state.banners.findIndex(b => b.id === updatedBanner.id);
        if (index !== -1) {
          state.banners[index] = updatedBanner;
        }
        const carouselIndex = state.carouselBanners.findIndex(b => b.id === updatedBanner.id);
        if (carouselIndex !== -1) {
          state.carouselBanners[carouselIndex] = updatedBanner;
        }
        const activeIndex = state.activeBanners.findIndex(b => b.id === updatedBanner.id);
        if (activeIndex !== -1) {
          state.activeBanners[activeIndex] = updatedBanner;
        }
        if (state.currentBanner && state.currentBanner.id === updatedBanner.id) {
          state.currentBanner = updatedBanner;
        }
      })
      .addCase(updateBannerPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update banner position';
      })
      // Track Banner View
      .addCase(trackBannerView.fulfilled, (state, action) => {
        // Update view count in all arrays
        const bannerId = action.payload;
        const updateViewCount = (banner: Banner) => {
          if (banner.id === bannerId) {
            return { ...banner, view_count: banner.view_count + 1 };
          }
          return banner;
        };
        state.banners = state.banners.map(updateViewCount);
        state.carouselBanners = state.carouselBanners.map(updateViewCount);
        state.activeBanners = state.activeBanners.map(updateViewCount);
        if (state.currentBanner && state.currentBanner.id === bannerId) {
          state.currentBanner = { ...state.currentBanner, view_count: state.currentBanner.view_count + 1 };
        }
      })
      // Track Banner Click
      .addCase(trackBannerClick.fulfilled, (state, action) => {
        // Update click count in all arrays
        const bannerId = action.payload;
        const updateClickCount = (banner: Banner) => {
          if (banner.id === bannerId) {
            return { ...banner, click_count: banner.click_count + 1 };
          }
          return banner;
        };
        state.banners = state.banners.map(updateClickCount);
        state.carouselBanners = state.carouselBanners.map(updateClickCount);
        state.activeBanners = state.activeBanners.map(updateClickCount);
        if (state.currentBanner && state.currentBanner.id === bannerId) {
          state.currentBanner = { ...state.currentBanner, click_count: state.currentBanner.click_count + 1 };
        }
      });
  },
});

export const { clearError, setCurrentBanner, clearBanners, clearCarouselBanners, clearActiveBanners, addBanner, updateBannerInList } = bannersSlice.actions;
export default bannersSlice.reducer; 