import axios, { AxiosRequestConfig } from 'axios';
import { baseURL } from './const';
import { 
  DigitalCredential,
  CreateDigitalCredentialResponse,
  GetDigitalCredentialResponse,
  VerifyDigitalCredentialResponse,
  UpdateDigitalCredentialResponse,
  RegenerateQRCodeResponse,
  GetAllDigitalCredentialsResponse
} from '../types/api';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor: always set the latest token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  
  // Automatically set Content-Type for FormData (file uploads)
  if (config.data instanceof FormData) {
    // Remove the hardcoded Content-Type to let axios set it automatically for FormData
    delete config.headers['Content-Type'];
  }
  
  return config;
});

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await apiClient.post('/auth/refresh-token', { 
            refreshToken 
          });
          
          if (response.data?.success && response.data?.data?.tokens) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
            
            // Update tokens in localStorage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refresh_token', newRefreshToken);
            
            // Update the authorization header
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            
            // Retry the original request
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          
          // Dispatch logout action to Redux store
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          
          throw refreshError;
        }
      }
    }
    
    throw error;
  }
);

/**
 * GET request
 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed`, error);
    throw error;
  }
}

/**
 * POST request
 */
export async function post<T, U = unknown>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed`, error);
    throw error;
  }
}

/**
 * PUT request
 */
export async function put<T, U = unknown>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`PUT ${url} failed`, error);
    throw error;
  }
}

/**
 * DELETE request
 */
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${url} failed`, error);
    throw error;
  }
}

// Digital Credential API functions
export const digitalCredentialApi = {
  // Create a new digital credential
  create: () => post<CreateDigitalCredentialResponse>('/digital-credentials', {}),
  
  // Get the authenticated user's digital credential
  getMyCredential: () => get<GetDigitalCredentialResponse>('/digital-credentials/my-credential'),
  
  // Verify a digital credential by verification code (public)
  verify: (verificationCode: string) => get<VerifyDigitalCredentialResponse>(`/digital-credentials/verify/${verificationCode}`),
  
  // Update a digital credential
  update: (id: string, data: Partial<DigitalCredential>) => put<UpdateDigitalCredentialResponse>(`/digital-credentials/${id}`, data),
  
  // Regenerate QR code for a digital credential
  regenerateQR: (id: string) => post<RegenerateQRCodeResponse>(`/digital-credentials/${id}/regenerate-qr`, {}),
  
  // Get all digital credentials (admin only)
  getAll: (params?: { page?: number; limit?: number; affiliation_status?: string; state_affiliation?: string; is_verified?: boolean }) => 
    get<GetAllDigitalCredentialsResponse>('/digital-credentials', { params })
};

export const api = {
  get,
  post,
  put,
  delete: del,
  digitalCredentials: digitalCredentialApi,
};
