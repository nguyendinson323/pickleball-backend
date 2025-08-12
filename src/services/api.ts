import { store } from '../store';
import {
  // Core types
  ApiResponse,
  User,
  Club,
  Tournament,
  Court,
  Payment,
  Ranking,
  Notification,
  Banner,
  PlayerFinder,
  CourtReservation,
  
  // Auth types
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  ProfileResponse,
  
  // User types
  UsersQueryParams,
  UpdateUserRequest,
  UsersResponse,
  PlayersResponse,
  UserResponse,
  UpdateUserResponse,
  
  // Club types
  ClubsQueryParams,
  CreateClubRequest,
  ClubsResponse,
  ClubResponse,
  CreateClubResponse,
  ClubCourtsResponse,
  ClubTournamentsResponse,
  
  // Tournament types
  TournamentsQueryParams,
  CreateTournamentRequest,
  TournamentRegistrationRequest,
  TournamentsResponse,
  UpcomingTournamentsResponse,
  TournamentResponse,
  CreateTournamentResponse,
  TournamentRegistrationResponse,
  
  // Court types
  CourtsQueryParams,
  CreateCourtRequest,
  BookCourtRequest,
  CourtsResponse,
  CourtResponse,
  CreateCourtResponse,
  BookCourtResponse,
  
  // Payment types
  PaymentsQueryParams,
  CreatePaymentRequest,
  ProcessPaymentRequest,
  PaymentsResponse,
  CreatePaymentResponse,
  ProcessPaymentResponse,
  
  // Ranking types
  RankingsQueryParams,
  RankingsResponse,
  TopPlayersResponse,
  UserRankingsResponse,
  
  // Notification types
  NotificationsQueryParams,
  NotificationsResponse,
  MarkReadResponse,
  MarkAllReadResponse,
  
  // Banner types
  ActiveBannersQueryParams,
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
  
  // Player Finder types
  SearchPlayersQueryParams,
  UpdatePlayerFinderPreferencesRequest,
  SendMatchRequestRequest,
  SearchPlayersResponse,
  NearbyPlayersResponse,
  PlayerFinderPreferencesResponse,
  UpdatePlayerFinderPreferencesResponse,
  TogglePlayerFinderResponse,
  PlayerFinderStatsResponse,
  SendMatchRequestResponse,
  
  // Court Reservation types
  CourtAvailabilityQueryParams,
  CourtBookingsQueryParams,
  CourtAvailabilityResponse,
  CourtBookingsResponse,
  
  // Admin types
  DashboardStatsResponse,
  UpdateUserRoleRequest,
  AdminUsersResponse,
  UpdateUserRoleResponse,
  
  // Statistics types
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

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Handle token refresh or logout
          store.dispatch({ type: 'auth/logout' });
        }
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
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

  async getPlayers(params: Partial<UsersQueryParams>): Promise<PlayersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<PlayersResponse>(`/users/players?${queryString}`);
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

  // Clubs methods
  async getClubs(params: ClubsQueryParams): Promise<ClubsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<ClubsResponse>(`/clubs?${queryString}`);
  }

  async getClub(id: string): Promise<ClubResponse> {
    return this.request<ClubResponse>(`/clubs/${id}`);
  }

  async createClub(clubData: CreateClubRequest): Promise<CreateClubResponse> {
    return this.request<CreateClubResponse>('/clubs', {
      method: 'POST',
      body: JSON.stringify(clubData),
    });
  }

  async getClubCourts(clubId: string): Promise<ClubCourtsResponse> {
    return this.request<ClubCourtsResponse>(`/clubs/${clubId}/courts`);
  }

  async getClubTournaments(clubId: string): Promise<ClubTournamentsResponse> {
    return this.request<ClubTournamentsResponse>(`/clubs/${clubId}/tournaments`);
  }

  // Tournaments methods
  async getTournaments(params: TournamentsQueryParams): Promise<TournamentsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<TournamentsResponse>(`/tournaments?${queryString}`);
  }

  async getUpcomingTournaments(limit: number = 5): Promise<UpcomingTournamentsResponse> {
    return this.request<UpcomingTournamentsResponse>(`/tournaments/upcoming?limit=${limit}`);
  }

  async getTournament(id: string): Promise<TournamentResponse> {
    return this.request<TournamentResponse>(`/tournaments/${id}`);
  }

  async createTournament(tournamentData: CreateTournamentRequest): Promise<CreateTournamentResponse> {
    return this.request<CreateTournamentResponse>('/tournaments', {
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

  // Courts methods
  async getCourts(params: CourtsQueryParams): Promise<CourtsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<CourtsResponse>(`/courts?${queryString}`);
  }

  async getCourt(id: string): Promise<CourtResponse> {
    return this.request<CourtResponse>(`/courts/${id}`);
  }

  async createCourt(courtData: CreateCourtRequest): Promise<CreateCourtResponse> {
    return this.request<CreateCourtResponse>('/courts', {
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

  async getCourtAvailability(courtId: string, params: CourtAvailabilityQueryParams): Promise<CourtAvailabilityResponse> {
    const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
    return this.request<CourtAvailabilityResponse>(`/courts/${courtId}/availability?${queryString}`);
  }

  async getCourtBookings(courtId: string, params: CourtBookingsQueryParams): Promise<CourtBookingsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<CourtBookingsResponse>(`/courts/${courtId}/bookings?${queryString}`);
  }

  // Payments methods
  async getPayments(params: PaymentsQueryParams): Promise<PaymentsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<PaymentsResponse>(`/payments?${queryString}`);
  }

  async createPayment(paymentData: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    return this.request<CreatePaymentResponse>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async processPayment(paymentId: string, paymentData: ProcessPaymentRequest): Promise<ProcessPaymentResponse> {
    return this.request<ProcessPaymentResponse>(`/payments/${paymentId}/process`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Rankings methods
  async getRankings(params: RankingsQueryParams): Promise<RankingsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<RankingsResponse>(`/rankings?${queryString}`);
  }

  async getTopPlayers(params: Partial<RankingsQueryParams>): Promise<TopPlayersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<TopPlayersResponse>(`/rankings/top?${queryString}`);
  }

  async getUserRankings(userId: string): Promise<UserRankingsResponse> {
    return this.request<UserRankingsResponse>(`/rankings/user/${userId}`);
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

  // Banner methods
  async getCarouselBanners(): Promise<CarouselBannersResponse> {
    return this.request<CarouselBannersResponse>('/banners/carousel');
  }

  async getActiveBanners(params: ActiveBannersQueryParams): Promise<ActiveBannersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<ActiveBannersResponse>(`/banners/active?${queryString}`);
  }

  async getBanners(params: BannersQueryParams): Promise<BannersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<BannersResponse>(`/banners?${queryString}`);
  }

  async createBanner(bannerData: CreateBannerRequest): Promise<CreateBannerResponse> {
    return this.request<CreateBannerResponse>('/banners', {
      method: 'POST',
      body: JSON.stringify(bannerData),
    });
  }

  async updateBanner(id: string, bannerData: UpdateBannerRequest): Promise<UpdateBannerResponse> {
    return this.request<UpdateBannerResponse>(`/banners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bannerData),
    });
  }

  async deleteBanner(id: string): Promise<DeleteBannerResponse> {
    return this.request<DeleteBannerResponse>(`/banners/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleBannerStatus(id: string): Promise<ToggleBannerResponse> {
    return this.request<ToggleBannerResponse>(`/banners/${id}/toggle`, {
      method: 'PATCH',
    });
  }

  async updateBannerPosition(id: string, position: number): Promise<UpdateBannerPositionResponse> {
    return this.request<UpdateBannerPositionResponse>(`/banners/${id}/position`, {
      method: 'PATCH',
      body: JSON.stringify({ position }),
    });
  }

  async trackBannerView(id: string): Promise<TrackBannerViewResponse> {
    return this.request<TrackBannerViewResponse>(`/banners/${id}/view`, {
      method: 'POST',
    });
  }

  async trackBannerClick(id: string): Promise<TrackBannerClickResponse> {
    return this.request<TrackBannerClickResponse>(`/banners/${id}/click`, {
      method: 'POST',
    });
  }

  async getBannerAnalytics(params: { start_date?: string; end_date?: string }): Promise<BannerAnalyticsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<BannerAnalyticsResponse>(`/banners/analytics/overview?${queryString}`);
  }

  // Player Finder methods
  async searchPlayers(params: SearchPlayersQueryParams): Promise<SearchPlayersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<SearchPlayersResponse>(`/player-finder/search?${queryString}`);
  }

  async getNearbyPlayers(limit: number = 10): Promise<NearbyPlayersResponse> {
    return this.request<NearbyPlayersResponse>(`/player-finder/nearby?limit=${limit}`);
  }

  async getPlayerFinderPreferences(): Promise<PlayerFinderPreferencesResponse> {
    return this.request<PlayerFinderPreferencesResponse>('/player-finder/preferences');
  }

  async updatePlayerFinderPreferences(preferences: UpdatePlayerFinderPreferencesRequest): Promise<UpdatePlayerFinderPreferencesResponse> {
    return this.request<UpdatePlayerFinderPreferencesResponse>('/player-finder/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async togglePlayerFinderStatus(): Promise<TogglePlayerFinderResponse> {
    return this.request<TogglePlayerFinderResponse>('/player-finder/toggle', {
      method: 'PATCH',
    });
  }

  async getPlayerFinderStats(): Promise<PlayerFinderStatsResponse> {
    return this.request<PlayerFinderStatsResponse>('/player-finder/stats');
  }

  async sendMatchRequest(targetUserId: string, requestData: SendMatchRequestRequest): Promise<SendMatchRequestResponse> {
    return this.request<SendMatchRequestResponse>(`/player-finder/match-request/${targetUserId}`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  // Admin methods
  async getDashboardStats(): Promise<DashboardStatsResponse> {
    return this.request<DashboardStatsResponse>('/admin/dashboard');
  }

  async getAdminUsers(params: UsersQueryParams): Promise<AdminUsersResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<AdminUsersResponse>(`/admin/users?${queryString}`);
  }

  async updateUserRole(userId: string, roleData: UpdateUserRoleRequest): Promise<UpdateUserRoleResponse> {
    return this.request<UpdateUserRoleResponse>(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify(roleData),
    });
  }

  // Statistics methods
  async getOverviewStats(): Promise<OverviewStatsResponse> {
    return this.request<OverviewStatsResponse>('/stats/overview');
  }

  async getUserStats(params: { start_date?: string; end_date?: string; state?: string; category?: string }): Promise<UserStatsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<UserStatsResponse>(`/stats/users?${queryString}`);
  }

  // Token management methods
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

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Error handling
  handleError(error: any): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred';
  }
}

export const apiService = new ApiService(); 