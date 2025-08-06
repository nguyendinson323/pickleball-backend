import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Payment, PaymentsQueryParams, CreatePaymentRequest, ProcessPaymentRequest } from '../../types/api';
import { apiService } from '../../services/api';

interface PaymentsState {
  payments: Payment[];
  currentPayment: Payment | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

const initialState: PaymentsState = {
  payments: [],
  currentPayment: null,
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (params: PaymentsQueryParams) => {
    const response = await apiService.getPayments(params);
    if (!response.success) throw new Error(response.message);
    return response;
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData: CreatePaymentRequest) => {
    const response = await apiService.createPayment(paymentData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

export const processPayment = createAsyncThunk(
  'payments/processPayment',
  async ({ paymentId, processData }: { paymentId: string; processData: ProcessPaymentRequest }) => {
    const response = await apiService.processPayment(paymentId, processData);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearPayments: (state) => {
      state.payments = [];
      state.pagination = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Payments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payments';
      })
      // Create Payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.unshift(action.payload);
        state.currentPayment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create payment';
      })
      // Process Payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        // Update payment in the list
        const paymentIndex = state.payments.findIndex(p => p.id === action.payload.payment.id);
        if (paymentIndex !== -1) {
          state.payments[paymentIndex] = action.payload.payment;
        }
        state.currentPayment = action.payload.payment;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to process payment';
      });
  },
});

export const { clearPayments, clearError, setCurrentPayment } = paymentsSlice.actions;
export default paymentsSlice.reducer; 