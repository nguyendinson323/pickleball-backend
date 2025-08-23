import axios, { AxiosRequestConfig, AxiosError } from 'axios';
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

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await apiClient.post('/api/v1/auth/refresh-token', { 
            refreshToken 
          });
          
          if (response.data?.success && response.data?.data?.tokens) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
            
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refresh_token', newRefreshToken);
            
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          
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

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed`, error);
    throw error;
  }
}

export async function post<T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed`, error);
    throw error;
  }
}

export async function put<T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`PUT ${url} failed`, error);
    throw error;
  }
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${url} failed`, error);
    throw error;
  }
}

export async function patch<T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`PATCH ${url} failed`, error);
    throw error;
  }
}

export const authApi = {
  register: (data: { 
    email: string; 
    password: string; 
    username: string; 
    user_type: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  }) => post<any>('/api/v1/auth/register', data),
  
  login: (data: { email: string; password: string }) => 
    post<any>('/api/v1/auth/login', data),
  
  logout: () => post<any>('/api/v1/auth/logout'),
  
  refreshToken: (refreshToken: string) => 
    post<any>('/api/v1/auth/refresh-token', { refreshToken }),
  
  verifyEmail: (token: string) => 
    get<any>(`/api/v1/auth/verify-email/${token}`),
  
  requestPasswordReset: (email: string) => 
    post<any>('/api/v1/auth/request-password-reset', { email }),
  
  resetPassword: (data: { token: string; password: string }) => 
    post<any>('/api/v1/auth/reset-password', data),
  
  getProfile: () => get<any>('/api/v1/auth/profile'),
  
  updateProfile: (data: any) => put<any>('/api/v1/auth/profile', data),
};

export const userApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; user_type?: string }) => 
    get<any>('/api/v1/users', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/users/${id}`),
  
  update: (id: string, data: any) => put<any>(`/api/v1/users/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/users/${id}`),
  
  search: (query: string) => get<any>('/api/v1/users/search', { params: { q: query } }),
  
  getPlayers: (params?: any) => get<any>('/api/v1/users/players', { params }),
  
  getCoaches: (params?: any) => get<any>('/api/v1/users/coaches', { params }),
  
  getClubs: (params?: any) => get<any>('/api/v1/users/clubs', { params }),
  
  getStats: (id: string) => get<any>(`/api/v1/users/${id}/stats`),
};

export const clubApi = {
  getAll: (params?: any) => get<any>('/api/v1/clubs', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/clubs/${id}`),
  
  create: (data: any) => post<any>('/api/v1/clubs', data),
  
  update: (id: string, data: any) => put<any>(`/api/v1/clubs/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/clubs/${id}`),
  
  search: (query: string) => get<any>('/api/v1/clubs/search', { params: { q: query } }),
  
  getNearby: (lat: number, lng: number, radius?: number) => 
    get<any>('/api/v1/clubs/nearby', { params: { lat, lng, radius } }),
  
  getCourts: (id: string) => get<any>(`/api/v1/clubs/${id}/courts`),
  
  getTournaments: (id: string) => get<any>(`/api/v1/clubs/${id}/tournaments`),
  
  getMembers: (id: string) => get<any>(`/api/v1/clubs/${id}/members`),
  
  getStats: (id: string) => get<any>(`/api/v1/clubs/${id}/stats`),
};

export const tournamentApi = {
  getAll: (params?: any) => get<any>('/api/v1/tournaments', { params }),
  
  getUpcoming: () => get<any>('/api/v1/tournaments/upcoming'),
  
  getById: (id: string) => get<any>(`/api/v1/tournaments/${id}`),
  
  create: (data: any) => post<any>('/api/v1/tournaments', data),
  
  update: (id: string, data: any) => put<any>(`/api/v1/tournaments/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/tournaments/${id}`),
  
  register: (id: string, data: any) => post<any>(`/api/v1/tournaments/${id}/register`, data),
  
  getParticipants: (id: string) => get<any>(`/api/v1/tournaments/${id}/participants`),
  
  getMatches: (id: string) => get<any>(`/api/v1/tournaments/${id}/matches`),
  
  getStats: (id: string) => get<any>(`/api/v1/tournaments/${id}/stats`),
};

export const courtApi = {
  getAll: (params?: any) => get<any>('/api/v1/courts', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/courts/${id}`),
  
  create: (data: any) => post<any>('/api/v1/courts', data),
  
  update: (id: string, data: any) => put<any>(`/api/v1/courts/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/courts/${id}`),
  
  getAvailability: (id: string, date?: string) => 
    get<any>(`/api/v1/courts/${id}/availability`, { params: { date } }),
  
  getBookings: (id: string) => get<any>(`/api/v1/courts/${id}/bookings`),
  
  book: (id: string, data: any) => post<any>(`/api/v1/courts/${id}/book`, data),
  
  getStats: (id: string) => get<any>(`/api/v1/courts/${id}/stats`),
};

export const paymentApi = {
  getAll: (params?: any) => get<any>('/api/v1/payments', { params }),
  
  getStats: () => get<any>('/api/v1/payments/stats'),
  
  getUserPayments: (userId: string) => get<any>(`/api/v1/payments/user/${userId}`),
  
  getById: (id: string) => get<any>(`/api/v1/payments/${id}`),
  
  create: (data: any) => post<any>('/api/v1/payments', data),
  
  process: (id: string, data?: any) => post<any>(`/api/v1/payments/${id}/process`, data),
  
  refund: (id: string, data?: any) => post<any>(`/api/v1/payments/${id}/refund`, data),
};

export const rankingApi = {
  getAll: (params?: { category?: string; state?: string; page?: number; limit?: number }) => 
    get<any>('/api/v1/rankings', { params }),
  
  getTop: (limit?: number) => get<any>('/api/v1/rankings/top', { params: { limit } }),
  
  getHistory: (userId?: string) => get<any>('/api/v1/rankings/history', { params: { userId } }),
  
  getStats: () => get<any>('/api/v1/rankings/stats'),
  
  export: (format?: string) => get<any>('/api/v1/rankings/export', { params: { format } }),
  
  getUserRankings: (userId: string) => get<any>(`/api/v1/rankings/user/${userId}`),
  
  getStateRankings: (state: string) => get<any>(`/api/v1/rankings/state/${state}`),
  
  calculate: () => post<any>('/api/v1/rankings/calculate'),
  
  updateTournamentResults: (tournamentId: string, data: any) => 
    post<any>(`/api/v1/rankings/update-tournament/${tournamentId}`, data),
};

export const notificationApi = {
  getAll: (params?: { unread?: boolean; page?: number; limit?: number }) => 
    get<any>('/api/v1/notifications', { params }),
  
  getStats: () => get<any>('/api/v1/notifications/stats'),
  
  getPreferences: () => get<any>('/api/v1/notifications/preferences'),
  
  updatePreferences: (data: any) => put<any>('/api/v1/notifications/preferences', data),
  
  getById: (id: string) => get<any>(`/api/v1/notifications/${id}`),
  
  markAsRead: (id: string) => put<any>(`/api/v1/notifications/${id}/read`),
  
  markAllAsRead: () => put<any>('/api/v1/notifications/read-all'),
  
  delete: (id: string) => del<any>(`/api/v1/notifications/${id}`),
  
  send: (data: any) => post<any>('/api/v1/notifications/send', data),
  
  sendSystemNotification: (data: any) => post<any>('/api/v1/notifications/system', data),
};

export const adminApi = {
  getDashboard: () => get<any>('/api/v1/admin/dashboard'),
  
  getUsers: (params?: any) => get<any>('/api/v1/admin/users', { params }),
  
  updateUserRole: (id: string, role: string) => 
    put<any>(`/api/v1/admin/users/${id}/role`, { role }),
  
  updateUserMembership: (id: string, membership: any) => 
    put<any>(`/api/v1/admin/users/${id}/membership`, membership),
  
  getLogs: (params?: any) => get<any>('/api/v1/admin/logs', { params }),
  
  getHealth: () => get<any>('/api/v1/admin/health'),
  
  getSettings: () => get<any>('/api/v1/admin/settings'),
  
  updateSettings: (data: any) => put<any>('/api/v1/admin/settings', data),
  
  getActivity: (params?: any) => get<any>('/api/v1/admin/activity', { params }),
  
  exportData: (format?: string) => get<any>('/api/v1/admin/export', { params: { format } }),
  
  performMaintenance: (task: string) => post<any>('/api/v1/admin/maintenance', { task }),
};

export const statsApi = {
  getOverview: () => get<any>('/api/v1/stats/overview'),
  
  getUserStats: (params?: any) => get<any>('/api/v1/stats/users', { params }),
  
  getTournamentStats: (params?: any) => get<any>('/api/v1/stats/tournaments', { params }),
  
  getPaymentStats: (params?: any) => get<any>('/api/v1/stats/payments', { params }),
  
  getRankingStats: (params?: any) => get<any>('/api/v1/stats/rankings', { params }),
  
  getClubStats: (params?: any) => get<any>('/api/v1/stats/clubs', { params }),
  
  getAnalytics: (params?: any) => get<any>('/api/v1/stats/analytics', { params }),
  
  generateReports: (type: string, params?: any) => 
    get<any>('/api/v1/stats/reports', { params: { type, ...params } }),
};

export const bannerApi = {
  getAll: (params?: any) => get<any>('/api/v1/banners', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/banners/${id}`),
  
  create: (data: FormData) => post<any>('/api/v1/banners', data),
  
  update: (id: string, data: FormData) => put<any>(`/api/v1/banners/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/banners/${id}`),
  
  updateStatus: (id: string, isActive: boolean) => 
    patch<any>(`/api/v1/banners/${id}/status`, { isActive }),
};

export const playerFinderApi = {
  search: (params: any) => get<any>('/api/v1/player-finder/search', { params }),
  
  createProfile: (data: any) => post<any>('/api/v1/player-finder/profile', data),
  
  updateProfile: (data: any) => put<any>('/api/v1/player-finder/profile', data),
  
  getProfile: () => get<any>('/api/v1/player-finder/profile'),
  
  deleteProfile: () => del<any>('/api/v1/player-finder/profile'),
  
  contactPlayer: (playerId: string, message: string) => 
    post<any>(`/api/v1/player-finder/contact/${playerId}`, { message }),
};

export const digitalCredentialApi = {
  create: () => post<CreateDigitalCredentialResponse>('/api/v1/digital-credentials', {}),
  
  getMyCredential: () => get<GetDigitalCredentialResponse>('/api/v1/digital-credentials/my-credential'),
  
  verify: (verificationCode: string) => 
    get<VerifyDigitalCredentialResponse>(`/api/v1/digital-credentials/verify/${verificationCode}`),
  
  update: (id: string, data: Partial<DigitalCredential>) => 
    put<UpdateDigitalCredentialResponse>(`/api/v1/digital-credentials/${id}`, data),
  
  regenerateQR: (id: string) => 
    post<RegenerateQRCodeResponse>(`/api/v1/digital-credentials/${id}/regenerate-qr`, {}),
  
  getAll: (params?: { 
    page?: number; 
    limit?: number; 
    affiliation_status?: string; 
    state_affiliation?: string; 
    is_verified?: boolean 
  }) => get<GetAllDigitalCredentialsResponse>('/api/v1/digital-credentials', { params })
};

export const courtReservationApi = {
  getAll: (params?: any) => get<any>('/api/v1/court-reservations', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/court-reservations/${id}`),
  
  create: (data: any) => post<any>('/api/v1/court-reservations', data),
  
  update: (id: string, data: any) => put<any>(`/api/v1/court-reservations/${id}`, data),
  
  cancel: (id: string) => put<any>(`/api/v1/court-reservations/${id}/cancel`),
  
  getMyReservations: () => get<any>('/api/v1/court-reservations/my-reservations'),
};

export const coachApi = {
  search: (params: any) => get<any>('/api/v1/coaches/search', { params }),
  
  getProfile: (coachId: string) => get<any>(`/api/v1/coaches/${coachId}/profile`),
  
  createSearchPreferences: (data: any) => post<any>('/api/v1/coaches/search/create', data),
  
  getMySearches: () => get<any>('/api/v1/coaches/search/my-searches'),
  
  performSearch: (searchId: string) => post<any>(`/api/v1/coaches/search/${searchId}/perform`),
  
  getSearchStats: () => get<any>('/api/v1/coaches/search/stats'),
  
  contactCoach: (coachId: string, data: any) => 
    post<any>(`/api/v1/coaches/${coachId}/contact`, data),
};

export const messageApi = {
  getAll: (params?: any) => get<any>('/api/v1/messages', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/messages/${id}`),
  
  send: (data: any) => post<any>('/api/v1/messages', data),
  
  markAsRead: (id: string) => put<any>(`/api/v1/messages/${id}/read`),
  
  delete: (id: string) => del<any>(`/api/v1/messages/${id}`),
  
  getConversation: (userId: string) => get<any>(`/api/v1/messages/conversation/${userId}`),
};

export const announcementApi = {
  getAll: (params?: any) => get<any>('/api/v1/announcements', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/announcements/${id}`),
  
  create: (data: any) => post<any>('/api/v1/announcements', data),
  
  update: (id: string, data: any) => put<any>(`/api/v1/announcements/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/announcements/${id}`),
  
  publish: (id: string) => post<any>(`/api/v1/announcements/${id}/publish`),
  
  unpublish: (id: string) => post<any>(`/api/v1/announcements/${id}/unpublish`),
};

export const micrositeApi = {
  getAll: (params?: any) => get<any>('/api/v1/admin/microsites', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/admin/microsites/${id}`),
  
  create: (data: any) => post<any>('/api/v1/admin/microsites', data),
  
  update: (id: string, data: any) => put<any>(`/api/v1/admin/microsites/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/admin/microsites/${id}`),
  
  publish: (id: string) => post<any>(`/api/v1/admin/microsites/${id}/publish`),
  
  unpublish: (id: string) => post<any>(`/api/v1/admin/microsites/${id}/unpublish`),
};

export const expenseApi = {
  create: (data: any) => post<any>('/api/v1/expenses', data),
  
  getAll: (params?: any) => get<any>('/api/v1/expenses', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/expenses/${id}`),
  
  update: (id: string, data: any) => put<any>(`/api/v1/expenses/${id}`, data),
  
  delete: (id: string) => del<any>(`/api/v1/expenses/${id}`),
  
  getTournamentExpenses: (tournamentId: string) => 
    get<any>(`/api/v1/expenses/tournament/${tournamentId}`),
  
  getClubExpenses: (clubId: string) => 
    get<any>(`/api/v1/expenses/club/${clubId}`),
};

export const playerApi = {
  getAll: (params?: any) => get<any>('/api/v1/players', { params }),
  
  getById: (id: string) => get<any>(`/api/v1/players/${id}`),
  
  getProfile: (id: string) => get<any>(`/api/v1/players/${id}/profile`),
  
  updateProfile: (id: string, data: any) => put<any>(`/api/v1/players/${id}/profile`, data),
  
  getStats: (id: string) => get<any>(`/api/v1/players/${id}/stats`),
  
  getMatches: (id: string) => get<any>(`/api/v1/players/${id}/matches`),
  
  getTournaments: (id: string) => get<any>(`/api/v1/players/${id}/tournaments`),
};

export const api = {
  get,
  post,
  put,
  delete: del,
  patch,
  auth: authApi,
  users: userApi,
  clubs: clubApi,
  tournaments: tournamentApi,
  courts: courtApi,
  payments: paymentApi,
  rankings: rankingApi,
  notifications: notificationApi,
  admin: adminApi,
  stats: statsApi,
  banners: bannerApi,
  playerFinder: playerFinderApi,
  digitalCredentials: digitalCredentialApi,
  courtReservations: courtReservationApi,
  coaches: coachApi,
  messages: messageApi,
  announcements: announcementApi,
  microsites: micrositeApi,
  expenses: expenseApi,
  players: playerApi,
};

export default api;