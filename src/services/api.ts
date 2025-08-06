import { store } from '../store';
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  ProfileResponse,
  UsersQueryParams,
  UsersResponse,
  UserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  ClubsQueryParams,
  ClubsResponse,
  ClubResponse,
  CreateClubRequest,
  TournamentsQueryParams,
  TournamentsResponse,
  TournamentResponse,
  CreateTournamentRequest,
  TournamentRegistrationRequest,
  TournamentRegistrationResponse,
  CourtsQueryParams,
  CourtsResponse,
  CourtResponse,
  CreateCourtRequest,
  BookCourtRequest,
  BookCourtResponse,
  PaymentsQueryParams,
  PaymentsResponse,
  PaymentResponse,
  CreatePaymentRequest,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  RankingsQueryParams,
  RankingsResponse,
  RankingResponse,
  NotificationsQueryParams,
  NotificationsResponse,
  NotificationResponse,
  MarkReadResponse,
  MarkAllReadResponse,
  DashboardStatsResponse,
  OverviewStatsResponse,
  UserStatsResponse,
} from '../types/api';

class ApiService {
  private baseURL = '/api/v1';
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Handle token refresh or logout
        store.dispatch({ type: 'auth/logout' });
      }
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(): Promise<ProfileResponse> {
    return this.request<ProfileResponse>('/auth/profile');
  }

  // Users methods
  async getUsers(params: UsersQueryParams): Promise<UsersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<UsersResponse>(`/users?${queryString}`);
  }

  async getUser(id: string): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}`);
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.request<UpdateUserResponse>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getPlayers(params: Partial<UsersQueryParams>): Promise<UsersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<UsersResponse>(`/users/players?${queryString}`);
  }

  // Clubs methods
  async getClubs(params: ClubsQueryParams): Promise<ClubsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<ClubsResponse>(`/clubs?${queryString}`);
  }

  async getClub(id: string): Promise<ClubResponse> {
    return this.request<ClubResponse>(`/clubs/${id}`);
  }

  async createClub(clubData: CreateClubRequest): Promise<ClubResponse> {
    return this.request<ClubResponse>('/clubs', {
      method: 'POST',
      body: JSON.stringify(clubData),
    });
  }

  async getClubCourts(clubId: string): Promise<ApiResponse<any[]>> {
    return this.request<ApiResponse<any[]>>(`/clubs/${clubId}/courts`);
  }

  async getClubTournaments(clubId: string): Promise<ApiResponse<any[]>> {
    return this.request<ApiResponse<any[]>>(`/clubs/${clubId}/tournaments`);
  }

  // Tournaments methods
  async getTournaments(params: TournamentsQueryParams): Promise<TournamentsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<TournamentsResponse>(`/tournaments?${queryString}`);
  }

  async getTournament(id: string): Promise<TournamentResponse> {
    return this.request<TournamentResponse>(`/tournaments/${id}`);
  }

  async createTournament(tournamentData: CreateTournamentRequest): Promise<TournamentResponse> {
    return this.request<TournamentResponse>('/tournaments', {
      method: 'POST',
      body: JSON.stringify(tournamentData),
    });
  }

  async registerForTournament(
    tournamentId: string,
    registrationData: TournamentRegistrationRequest
  ): Promise<TournamentRegistrationResponse> {
    return this.request<TournamentRegistrationResponse>(`/tournaments/${tournamentId}/register`, {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  }

  async getUpcomingTournaments(limit: number = 5): Promise<ApiResponse<any[]>> {
    return this.request<ApiResponse<any[]>>(`/tournaments/upcoming?limit=${limit}`);
  }

  // Courts methods
  async getCourts(params: CourtsQueryParams): Promise<CourtsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<CourtsResponse>(`/courts?${queryString}`);
  }

  async getCourt(id: string): Promise<CourtResponse> {
    return this.request<CourtResponse>(`/courts/${id}`);
  }

  async createCourt(courtData: CreateCourtRequest): Promise<CourtResponse> {
    return this.request<CourtResponse>('/courts', {
      method: 'POST',
      body: JSON.stringify(courtData),
    });
  }

  async bookCourt(courtId: string, bookingData: BookCourtRequest): Promise<BookCourtResponse> {
    return this.request<BookCourtResponse>(`/courts/${courtId}/book`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // Payments methods
  async getPayments(params: PaymentsQueryParams): Promise<PaymentsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<PaymentsResponse>(`/payments?${queryString}`);
  }

  async createPayment(paymentData: CreatePaymentRequest): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async processPayment(paymentId: string, processData: ProcessPaymentRequest): Promise<ProcessPaymentResponse> {
    return this.request<ProcessPaymentResponse>(`/payments/${paymentId}/process`, {
      method: 'POST',
      body: JSON.stringify(processData),
    });
  }

  // Rankings methods
  async getRankings(params: RankingsQueryParams): Promise<RankingsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<RankingsResponse>(`/rankings?${queryString}`);
  }

  async getTopPlayers(limit: number = 10, category?: string, skillLevel?: string): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (category) params.append('category', category);
    if (skillLevel) params.append('skill_level', skillLevel);
    return this.request<ApiResponse<any[]>>(`/rankings/top?${params.toString()}`);
  }

  async getUserRankings(userId: string): Promise<ApiResponse<any[]>> {
    return this.request<ApiResponse<any[]>>(`/rankings/user/${userId}`);
  }

  // Notifications methods
  async getNotifications(params: NotificationsQueryParams): Promise<NotificationsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<NotificationsResponse>(`/notifications?${queryString}`);
  }

  async markNotificationAsRead(notificationId: string): Promise<MarkReadResponse> {
    return this.request<MarkReadResponse>(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead(): Promise<MarkAllReadResponse> {
    return this.request<MarkAllReadResponse>('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Admin methods
  async getDashboardStats(): Promise<DashboardStatsResponse> {
    return this.request<DashboardStatsResponse>('/admin/dashboard');
  }

  async getAdminUsers(params: Partial<UsersQueryParams>): Promise<UsersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<UsersResponse>(`/admin/users?${queryString}`);
  }

  async updateUserRole(userId: string, role: string): Promise<UserResponse> {
    return this.request<UserResponse>(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  // Statistics methods
  async getOverviewStats(): Promise<OverviewStatsResponse> {
    return this.request<OverviewStatsResponse>('/stats/overview');
  }

  async getUserStats(params: {
    start_date?: string;
    end_date?: string;
    state?: string;
    category?: string;
  }): Promise<UserStatsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<UserStatsResponse>(`/stats/users?${queryString}`);
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return this.token;
  }
}

export const apiService = new ApiService(); 