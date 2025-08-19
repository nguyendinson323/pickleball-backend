import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../lib/api';
import { 
  DigitalCredential, 
  CreateDigitalCredentialResponse, 
  GetDigitalCredentialResponse,
  UpdateDigitalCredentialResponse,
  RegenerateQRCodeResponse
} from '../../types/api';

// Async thunks
export const createDigitalCredential = createAsyncThunk(
  'digitalCredentials/create',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.digitalCredentials.create();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create digital credential');
    }
  }
);

export const fetchMyDigitalCredential = createAsyncThunk(
  'digitalCredentials/fetchMyCredential',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.digitalCredentials.getMyCredential();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch digital credential');
    }
  }
);

export const updateDigitalCredential = createAsyncThunk(
  'digitalCredentials/update',
  async ({ id, data }: { id: string; data: Partial<DigitalCredential> }, { rejectWithValue }) => {
    try {
      const response = await api.digitalCredentials.update(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update digital credential');
    }
  }
);

export const regenerateQRCode = createAsyncThunk(
  'digitalCredentials/regenerateQR',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.digitalCredentials.regenerateQR(id);
      return { id, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to regenerate QR code');
    }
  }
);

export const getAllDigitalCredentials = createAsyncThunk(
  'digitalCredentials/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.digitalCredentials.getAll();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all digital credentials');
    }
  }
);

// State interface
interface DigitalCredentialsState {
  myCredential: DigitalCredential | null;
  allCredentials: DigitalCredential[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  regeneratingQR: boolean;
}

// Initial state
const initialState: DigitalCredentialsState = {
  myCredential: null,
  allCredentials: [],
  loading: false,
  error: null,
  creating: false,
  updating: false,
  regeneratingQR: false,
};

// Slice
const digitalCredentialsSlice = createSlice({
  name: 'digitalCredentials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCredential: (state) => {
      state.myCredential = null;
    },
  },
  extraReducers: (builder) => {
    // Create digital credential
    builder
      .addCase(createDigitalCredential.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createDigitalCredential.fulfilled, (state, action: PayloadAction<DigitalCredential>) => {
        state.creating = false;
        state.myCredential = action.payload;
        state.error = null;
      })
      .addCase(createDigitalCredential.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      });

    // Fetch my digital credential
    builder
      .addCase(fetchMyDigitalCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyDigitalCredential.fulfilled, (state, action: PayloadAction<DigitalCredential>) => {
        state.loading = false;
        state.myCredential = action.payload;
        state.error = null;
      })
      .addCase(fetchMyDigitalCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update digital credential
    builder
      .addCase(updateDigitalCredential.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateDigitalCredential.fulfilled, (state, action: PayloadAction<DigitalCredential>) => {
        state.updating = false;
        state.myCredential = action.payload;
        state.error = null;
      })
      .addCase(updateDigitalCredential.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });

    // Regenerate QR code
    builder
      .addCase(regenerateQRCode.pending, (state) => {
        state.regeneratingQR = true;
        state.error = null;
      })
      .addCase(regenerateQRCode.fulfilled, (state, action: PayloadAction<{ id: string; qr_code_url: string; qr_code_data: string }>) => {
        state.regeneratingQR = false;
        if (state.myCredential && state.myCredential.id === action.payload.id) {
          state.myCredential.qr_code_url = action.payload.qr_code_url;
          state.myCredential.qr_code_data = action.payload.qr_code_data;
        }
        state.error = null;
      })
      .addCase(regenerateQRCode.rejected, (state, action) => {
        state.regeneratingQR = false;
        state.error = action.payload as string;
      });

    // Get all digital credentials
    builder
      .addCase(getAllDigitalCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDigitalCredentials.fulfilled, (state, action: PayloadAction<DigitalCredential[]>) => {
        state.loading = false;
        state.allCredentials = action.payload;
        state.error = null;
      })
      .addCase(getAllDigitalCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, clearCredential } = digitalCredentialsSlice.actions;

// Export selectors
export const selectMyDigitalCredential = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.myCredential;
export const selectDigitalCredentialsLoading = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.loading;
export const selectDigitalCredentialsError = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.error;
export const selectDigitalCredentialsCreating = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.creating;
export const selectDigitalCredentialsUpdating = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.updating;
export const selectDigitalCredentialsRegeneratingQR = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.regeneratingQR;
export const selectAllDigitalCredentials = (state: { digitalCredentials: DigitalCredentialsState }) => 
  state.digitalCredentials.allCredentials;

// Export reducer
export default digitalCredentialsSlice.reducer; 