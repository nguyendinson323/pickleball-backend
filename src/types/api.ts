// Base API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details: string;
  };
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Paginated Response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

// User Types
export interface User {
  id: string;
  user_type: 'player' | 'coach' | 'club' | 'partner' | 'state' | 'federation';
  role: 'super_admin' | 'admin' | 'moderator' | 'user';
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  date_of_birth?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  state?: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsapp?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  curp?: string;
  rfc?: string;
  business_name?: string;
  contact_person?: string;
  job_title?: string;
  website?: string;
  social_media?: object;
  profile_photo?: string;
  logo?: string;
  membership_status: 'active' | 'expired' | 'suspended' | 'cancelled' | 'pending';
  membership_expires_at?: string;
  subscription_plan: 'basic' | 'premium' | 'federation';
  email_verified: boolean;
  last_login?: string;
  preferences: object;
  is_active: boolean;
  is_verified: boolean;
  verification_documents?: object;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Club Types
export interface Club {
  id: string;
  name: string;
  club_type: 'recreational' | 'competitive' | 'training' | 'mixed';
  description?: string;
  contact_person: string;
  contact_email: string;
  contact_phone?: string;
  contact_whatsapp?: string;
  state: string;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  founded_date?: string;
  member_count: number;
  max_members?: number;
  has_courts: boolean;
  court_count: number;
  court_types?: object;
  offers_training: boolean;
  offers_tournaments: boolean;
  offers_equipment: boolean;
  membership_status: 'active' | 'expired' | 'suspended' | 'cancelled' | 'pending';
  membership_expires_at?: string;
  subscription_plan: 'basic' | 'premium';
  membership_fee?: number;
  court_rental_fee?: number;
  logo?: string;
  banner_image?: string;
  photos?: object;
  website?: string;
  social_media?: object;
  operating_hours?: object;
  availability?: object;
  club_rules?: string;
  dress_code?: string;
  total_tournaments: number;
  total_matches: number;
  courts?: any[];
  tournaments?: any[];
  created_at: string;
  updated_at: string;
}

// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  tournament_type: 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
  category: 'singles' | 'doubles' | 'mixed_doubles' | 'team';
  description?: string;
  organizer_id: string;
  organizer_type: 'club' | 'partner' | 'state' | 'federation';
  organizer_name: string;
  venue_name: string;
  venue_address: string;
  state: string;
  city: string;
  latitude?: number;
  longitude?: number;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  entry_fee?: number;
  max_participants?: number;
  current_participants: number;
  max_teams?: number;
  current_teams: number;
  skill_levels?: string[];
  age_categories?: string[];
  gender_categories?: string[];
  tournament_format?: string;
  points_to_win?: number;
  win_by?: number;
  status: 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
  rules?: string;
  schedule?: object;
  court_assignments?: object;
  banner_image?: string;
  logo?: string;
  photos?: object;
  contact_email?: string;
  contact_phone?: string;
  registration_requirements?: object;
  registration_notes?: string;
  total_matches: number;
  completed_matches: number;
  settings?: object;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Court Types
export interface Court {
  id: string;
  name: string;
  court_type: 'indoor' | 'outdoor' | 'covered';
  surface: 'concrete' | 'asphalt' | 'synthetic' | 'grass' | 'clay';
  description?: string;
  dimensions?: string;
  capacity?: number;
  club_id: string;
  club_name: string;
  is_available: boolean;
  is_maintenance: boolean;
  maintenance_notes?: string;
  maintenance_start?: string;
  maintenance_end?: string;
  operating_hours?: object;
  hourly_rate?: number;
  member_rate?: number;
  equipment?: object;
  amenities?: object;
  photos?: object;
  total_bookings: number;
  total_hours: number;
  created_at: string;
  updated_at: string;
}

// Payment Types
export interface Payment {
  id: string;
  user_id: string;
  club_id?: string;
  tournament_id?: string;
  amount: number;
  currency: string;
  payment_type: 'membership_fee' | 'tournament_registration' | 'court_rental' | 'equipment_purchase' | 'donation' | 'subscription_upgrade' | 'other';
  payment_method: 'stripe' | 'paypal' | 'bank_transfer' | 'cash' | 'check' | 'other';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  processing_fee?: number;
  failure_reason?: string;
  refund_amount?: number;
  refund_reason?: string;
  refunded_at?: string;
  description?: string;
  metadata?: object;
  billing_address?: object;
  receipt_url?: string;
  invoice_number?: string;
  created_at: string;
  updated_at: string;
}

// Ranking Types
export interface Ranking {
  id: string;
  user_id: string;
  user_name: string;
  category: 'singles' | 'doubles' | 'mixed_doubles';
  skill_level: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  state?: string;
  current_position: number;
  current_points: number;
  previous_position?: number;
  previous_points?: number;
  tournaments_played: number;
  tournaments_won: number;
  matches_played: number;
  matches_won: number;
  matches_lost: number;
  win_percentage: number;
  recent_points: number;
  best_finish?: string;
  ranking_period: string;
  is_current: boolean;
  ranking_history?: object;
  created_at: string;
  updated_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  read_at?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  related_id?: string;
  related_type?: string;
  action_url?: string;
  action_text?: string;
  email_sent: boolean;
  sms_sent: boolean;
  metadata?: object;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// File Upload Types
export interface FileUpload {
  id: string;
  user_id?: string;
  tournament_id?: string;
  original_name: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  file_extension: string;
  width?: number;
  height?: number;
  thumbnail_url?: string;
  is_public: boolean;
  is_approved: boolean;
  is_deleted: boolean;
  description?: string;
  tags?: string[];
  metadata?: object;
  access_token?: string;
  expires_at?: string;
  download_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  user_type: 'player' | 'coach' | 'club' | 'partner' | 'state' | 'federation';
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  state?: string;
  city?: string;
  phone?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  curp?: string;
  business_name?: string;
  contact_person?: string;
  rfc?: string;
  website?: string;
}

export interface LoginResponse extends ApiResponse<{
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}> {}

export interface RegisterResponse extends ApiResponse<{
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}> {}

export interface ProfileResponse extends ApiResponse<User> {}

// Query Parameters
export interface UsersQueryParams {
  page?: number;
  limit?: number;
  user_type?: 'player' | 'coach' | 'club' | 'partner' | 'state' | 'federation';
  state?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  membership_status?: 'active' | 'expired' | 'suspended' | 'cancelled' | 'pending';
  search?: string;
}

export interface ClubsQueryParams {
  page?: number;
  limit?: number;
  state?: string;
  city?: string;
  club_type?: 'recreational' | 'competitive' | 'training' | 'mixed';
  has_courts?: boolean;
  subscription_plan?: 'basic' | 'premium';
  search?: string;
}

export interface TournamentsQueryParams {
  page?: number;
  limit?: number;
  tournament_type?: 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
  category?: 'singles' | 'doubles' | 'mixed_doubles' | 'team';
  status?: 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
  state?: string;
  city?: string;
  search?: string;
}

export interface CourtsQueryParams {
  page?: number;
  limit?: number;
  club_id?: string;
  court_type?: 'indoor' | 'outdoor' | 'covered';
  surface?: 'concrete' | 'asphalt' | 'synthetic' | 'grass' | 'clay';
  is_available?: boolean;
  search?: string;
}

export interface PaymentsQueryParams {
  page?: number;
  limit?: number;
  payment_type?: 'membership_fee' | 'tournament_registration' | 'court_rental' | 'equipment_purchase' | 'donation' | 'subscription_upgrade' | 'other';
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  user_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface RankingsQueryParams {
  page?: number;
  limit?: number;
  category?: 'singles' | 'doubles' | 'mixed_doubles';
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  state?: string;
  search?: string;
}

export interface NotificationsQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  unread_only?: boolean;
}

// Response Types
export interface UsersResponse extends PaginatedResponse<User> {}
export interface ClubsResponse extends PaginatedResponse<Club> {}
export interface TournamentsResponse extends PaginatedResponse<Tournament> {}
export interface CourtsResponse extends PaginatedResponse<Court> {}
export interface PaymentsResponse extends PaginatedResponse<Payment> {}
export interface RankingsResponse extends PaginatedResponse<Ranking> {}
export interface NotificationsResponse extends PaginatedResponse<Notification> {}

export interface UserResponse extends ApiResponse<User> {}
export interface ClubResponse extends ApiResponse<Club> {}
export interface TournamentResponse extends ApiResponse<Tournament> {}
export interface CourtResponse extends ApiResponse<Court> {}
export interface PaymentResponse extends ApiResponse<Payment> {}
export interface RankingResponse extends ApiResponse<Ranking> {}
export interface NotificationResponse extends ApiResponse<Notification> {}

// Create/Update Request Types
export interface CreateClubRequest {
  name: string;
  club_type: 'recreational' | 'competitive' | 'training' | 'mixed';
  description?: string;
  contact_person: string;
  contact_email: string;
  contact_phone?: string;
  contact_whatsapp?: string;
  state: string;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  founded_date?: string;
  max_members?: number;
  has_courts: boolean;
  court_count: number;
  court_types?: object;
  offers_training: boolean;
  offers_tournaments: boolean;
  offers_equipment: boolean;
  membership_fee?: number;
  court_rental_fee?: number;
  website?: string;
  social_media?: object;
  operating_hours?: object;
  club_rules?: string;
  dress_code?: string;
}

export interface CreateTournamentRequest {
  name: string;
  tournament_type: 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
  category: 'singles' | 'doubles' | 'mixed_doubles' | 'team';
  description?: string;
  organizer_type: 'club' | 'partner' | 'state' | 'federation';
  venue_name: string;
  venue_address: string;
  state: string;
  city: string;
  latitude?: number;
  longitude?: number;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  entry_fee?: number;
  max_participants?: number;
  max_teams?: number;
  skill_levels?: string[];
  age_categories?: string[];
  gender_categories?: string[];
  tournament_format?: string;
  points_to_win?: number;
  win_by?: number;
  rules?: string;
  contact_email?: string;
  contact_phone?: string;
  registration_requirements?: object;
  registration_notes?: string;
}

export interface TournamentRegistrationRequest {
  category?: 'singles' | 'doubles' | 'mixed_doubles';
  division?: string;
  partner_id?: string;
  partner_name?: string;
  special_requests?: string;
  dietary_restrictions?: string;
}

export interface TournamentRegistrationResponse extends ApiResponse<{
  registration: any;
  payment_required: boolean;
  payment_amount?: number;
}> {}

export interface CreateCourtRequest {
  name: string;
  court_type: 'indoor' | 'outdoor' | 'covered';
  surface: 'concrete' | 'asphalt' | 'synthetic' | 'grass' | 'clay';
  description?: string;
  dimensions?: string;
  capacity?: number;
  is_available?: boolean;
  is_maintenance?: boolean;
  maintenance_notes?: string;
  maintenance_start?: string;
  maintenance_end?: string;
  operating_hours?: object;
  hourly_rate?: number;
  member_rate?: number;
  equipment?: object;
  amenities?: object;
}

export interface BookCourtRequest {
  start_time: string;
  end_time: string;
  purpose?: string;
}

export interface BookCourtResponse extends ApiResponse<{
  booking: any;
  payment_required: boolean;
  payment_amount?: number;
}> {}

export interface CreatePaymentRequest {
  amount: number;
  currency?: string;
  payment_type: 'membership_fee' | 'tournament_registration' | 'court_rental' | 'equipment_purchase' | 'donation' | 'subscription_upgrade' | 'other';
  payment_method: 'stripe' | 'paypal' | 'bank_transfer' | 'cash' | 'check' | 'other';
  description?: string;
  club_id?: string;
  tournament_id?: string;
}

export interface ProcessPaymentRequest {
  payment_method_id: string;
  billing_address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface ProcessPaymentResponse extends ApiResponse<{
  payment: Payment;
  client_secret?: string;
}> {}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  state?: string;
  city?: string;
  phone?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
}

export interface UpdateUserResponse extends ApiResponse<User> {}

export interface MarkReadResponse extends ApiResponse<Notification> {}

export interface MarkAllReadResponse extends ApiResponse<{
  updated_count: number;
}> {}

// Dashboard and Statistics Types
export interface DashboardStats {
  total_users: number;
  total_clubs: number;
  total_tournaments: number;
  total_revenue: number;
  active_memberships: number;
  new_users_this_month: number;
  upcoming_tournaments: number;
  pending_payments: number;
}

export interface DashboardStatsResponse extends ApiResponse<DashboardStats> {}

export interface OverviewStats {
  total_users: number;
  total_clubs: number;
  total_tournaments: number;
  total_revenue: number;
  active_memberships: number;
}

export interface OverviewStatsResponse extends ApiResponse<OverviewStats> {}

export interface UserStats {
  total_users: number;
  new_users_this_month: number;
  active_users: number;
  users_by_type: Record<string, number>;
  users_by_state: Record<string, number>;
}

export interface UserStatsResponse extends ApiResponse<UserStats> {} 