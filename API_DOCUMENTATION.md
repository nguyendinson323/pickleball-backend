# Pickleball Federation API Documentation

## Overview

This API documentation is specifically designed for React + TypeScript + Vite + Redux frontend development. It includes accurate TypeScript interfaces, Redux action types, and detailed examples for seamless integration.

**Base URL**: `http://localhost:5000/api/v1`  
**Content-Type**: `application/json`  
**Authentication**: Bearer Token (JWT)

---

## Table of Contents

1. [TypeScript Interfaces](#typescript-interfaces)
2. [Redux Action Types](#redux-action-types)
3. [Authentication](#authentication)
4. [Users](#users)
5. [Clubs](#clubs)
6. [Tournaments](#tournaments)
7. [Courts](#courts)
8. [Payments](#payments)
9. [Rankings](#rankings)
10. [Notifications](#notifications)
11. [Admin](#admin)
12. [Statistics](#statistics)
13. [Error Handling](#error-handling)
14. [Frontend Integration Examples](#frontend-integration-examples)

---

## TypeScript Interfaces

### Core Types

```typescript
// Base API Response
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details: string;
  };
}

// Pagination
interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Paginated Response
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

// User Types - CORRECTED TO MATCH ACTUAL MODEL
interface User {
  id: string;
  user_type: 'player' | 'coach' | 'club' | 'partner' | 'state' | 'federation';
  role: 'super_admin' | 'admin' | 'moderator' | 'user';
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  date_of_birth?: string;
  age?: number; // Virtual field
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  state?: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsapp?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  curp?: string; // Mexican population registry
  rfc?: string; // Mexican tax ID
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

// Club Types - CORRECTED TO MATCH ACTUAL MODEL
interface Club {
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
  created_at: string;
  updated_at: string;
}

// Tournament Types - CORRECTED TO MATCH ACTUAL MODEL
interface Tournament {
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

// Court Types - CORRECTED TO MATCH ACTUAL MODEL
interface Court {
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

// Payment Types - CORRECTED TO MATCH ACTUAL MODEL
interface Payment {
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

// Ranking Types - CORRECTED TO MATCH ACTUAL MODEL
interface Ranking {
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

// Notification Types - CORRECTED TO MATCH ACTUAL MODEL
interface Notification {
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

// File Upload Types - CORRECTED TO MATCH ACTUAL MODEL
interface FileUpload {
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
```

---

## Redux Action Types

```typescript
// Auth Actions
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE';
export const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN';
export const AUTH_UPDATE_PROFILE = 'AUTH_UPDATE_PROFILE';

// User Actions
export const USERS_FETCH_REQUEST = 'USERS_FETCH_REQUEST';
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS';
export const USERS_FETCH_FAILURE = 'USERS_FETCH_FAILURE';
export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

// Club Actions
export const CLUBS_FETCH_REQUEST = 'CLUBS_FETCH_REQUEST';
export const CLUBS_FETCH_SUCCESS = 'CLUBS_FETCH_SUCCESS';
export const CLUBS_FETCH_FAILURE = 'CLUBS_FETCH_FAILURE';
export const CLUB_FETCH_REQUEST = 'CLUB_FETCH_REQUEST';
export const CLUB_FETCH_SUCCESS = 'CLUB_FETCH_SUCCESS';
export const CLUB_FETCH_FAILURE = 'CLUB_FETCH_FAILURE';
export const CLUB_CREATE_REQUEST = 'CLUB_CREATE_REQUEST';
export const CLUB_CREATE_SUCCESS = 'CLUB_CREATE_SUCCESS';
export const CLUB_CREATE_FAILURE = 'CLUB_CREATE_FAILURE';

// Tournament Actions
export const TOURNAMENTS_FETCH_REQUEST = 'TOURNAMENTS_FETCH_REQUEST';
export const TOURNAMENTS_FETCH_SUCCESS = 'TOURNAMENTS_FETCH_SUCCESS';
export const TOURNAMENTS_FETCH_FAILURE = 'TOURNAMENTS_FETCH_FAILURE';
export const TOURNAMENT_FETCH_REQUEST = 'TOURNAMENT_FETCH_REQUEST';
export const TOURNAMENT_FETCH_SUCCESS = 'TOURNAMENT_FETCH_SUCCESS';
export const TOURNAMENT_FETCH_FAILURE = 'TOURNAMENT_FETCH_FAILURE';
export const TOURNAMENT_REGISTER_REQUEST = 'TOURNAMENT_REGISTER_REQUEST';
export const TOURNAMENT_REGISTER_SUCCESS = 'TOURNAMENT_REGISTER_SUCCESS';
export const TOURNAMENT_REGISTER_FAILURE = 'TOURNAMENT_REGISTER_FAILURE';

// Payment Actions
export const PAYMENTS_FETCH_REQUEST = 'PAYMENTS_FETCH_REQUEST';
export const PAYMENTS_FETCH_SUCCESS = 'PAYMENTS_FETCH_SUCCESS';
export const PAYMENTS_FETCH_FAILURE = 'PAYMENTS_FETCH_FAILURE';
export const PAYMENT_PROCESS_REQUEST = 'PAYMENT_PROCESS_REQUEST';
export const PAYMENT_PROCESS_SUCCESS = 'PAYMENT_PROCESS_SUCCESS';
export const PAYMENT_PROCESS_FAILURE = 'PAYMENT_PROCESS_FAILURE';

// Ranking Actions
export const RANKINGS_FETCH_REQUEST = 'RANKINGS_FETCH_REQUEST';
export const RANKINGS_FETCH_SUCCESS = 'RANKINGS_FETCH_SUCCESS';
export const RANKINGS_FETCH_FAILURE = 'RANKINGS_FETCH_FAILURE';

// Notification Actions
export const NOTIFICATIONS_FETCH_REQUEST = 'NOTIFICATIONS_FETCH_REQUEST';
export const NOTIFICATIONS_FETCH_SUCCESS = 'NOTIFICATIONS_FETCH_SUCCESS';
export const NOTIFICATIONS_FETCH_FAILURE = 'NOTIFICATIONS_FETCH_FAILURE';
export const NOTIFICATION_MARK_READ = 'NOTIFICATION_MARK_READ';
export const NOTIFICATION_MARK_ALL_READ = 'NOTIFICATION_MARK_ALL_READ';
```

---

## Authentication

### Register User

**POST** `/auth/register`

```typescript
interface RegisterRequest {
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

interface RegisterResponse extends ApiResponse<{
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}> {}
```

**Example Request:**
```typescript
const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};
```

### Login User

**POST** `/auth/login`

```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse extends ApiResponse<{
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}> {}
```

**Example Request:**
```typescript
const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};
```

### Get Profile

**GET** `/auth/profile`

```typescript
interface ProfileResponse extends ApiResponse<User> {}
```

**Example Request:**
```typescript
const getProfile = async (): Promise<ProfileResponse> => {
  const response = await fetch('/api/v1/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
```

---

## Users

### Get All Users (Admin)

**GET** `/users?page=1&limit=10&user_type=player&state=Jalisco&skill_level=4.0&membership_status=active&search=john`

```typescript
interface UsersQueryParams {
  page?: number;
  limit?: number;
  user_type?: 'player' | 'coach' | 'club' | 'partner' | 'state' | 'federation';
  state?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  membership_status?: 'active' | 'expired' | 'suspended' | 'cancelled' | 'pending';
  search?: string;
}

interface UsersResponse extends PaginatedResponse<User> {}
```

**Example Request:**
```typescript
const getUsers = async (params: UsersQueryParams): Promise<UsersResponse> => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  const response = await fetch(`/api/v1/users?${queryString}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
```

### Get Players

**GET** `/users/players?page=1&limit=20&state=Jalisco&skill_level=4.0&search=john`

```typescript
interface PlayersResponse extends PaginatedResponse<User> {}
```

### Get User by ID

**GET** `/users/:id`

```typescript
interface UserResponse extends ApiResponse<User> {}
```

### Update User

**PUT** `/users/:id`

```typescript
interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  state?: string;
  city?: string;
  phone?: string;
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
}

interface UpdateUserResponse extends ApiResponse<User> {}
```

---

## Clubs

### Get All Clubs

**GET** `/clubs?page=1&limit=10&state=Jalisco&city=Guadalajara&club_type=competitive&has_courts=true&subscription_plan=premium&search=tennis`

```typescript
interface ClubsQueryParams {
  page?: number;
  limit?: number;
  state?: string;
  city?: string;
  club_type?: 'recreational' | 'competitive' | 'training' | 'mixed';
  has_courts?: boolean;
  subscription_plan?: 'basic' | 'premium';
  search?: string;
}

interface ClubsResponse extends PaginatedResponse<Club> {}
```

### Get Club by ID

**GET** `/clubs/:id`

```typescript
interface ClubResponse extends ApiResponse<Club> {}
```

### Create Club

**POST** `/clubs`

```typescript
interface CreateClubRequest {
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

interface CreateClubResponse extends ApiResponse<Club> {}
```

### Get Club Courts

**GET** `/clubs/:id/courts`

```typescript
interface ClubCourtsResponse extends ApiResponse<Court[]> {}
```

### Get Club Tournaments

**GET** `/clubs/:id/tournaments`

```typescript
interface ClubTournamentsResponse extends ApiResponse<Tournament[]> {}
```

---

## Tournaments

### Get All Tournaments

**GET** `/tournaments?page=1&limit=10&tournament_type=state&category=doubles&status=registration_open&state=Jalisco&city=Guadalajara&search=championship`

```typescript
interface TournamentsQueryParams {
  page?: number;
  limit?: number;
  tournament_type?: 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
  category?: 'singles' | 'doubles' | 'mixed_doubles' | 'team';
  status?: 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
  state?: string;
  city?: string;
  search?: string;
}

interface TournamentsResponse extends PaginatedResponse<Tournament> {}
```

### Get Upcoming Tournaments

**GET** `/tournaments/upcoming?limit=5`

```typescript
interface UpcomingTournamentsResponse extends ApiResponse<Tournament[]> {}
```

### Get Tournament by ID

**GET** `/tournaments/:id`

```typescript
interface TournamentResponse extends ApiResponse<Tournament> {}
```

### Create Tournament

**POST** `/tournaments`

```typescript
interface CreateTournamentRequest {
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

interface CreateTournamentResponse extends ApiResponse<Tournament> {}
```

### Register for Tournament

**POST** `/tournaments/:id/register`

```typescript
interface TournamentRegistrationRequest {
  category?: 'singles' | 'doubles' | 'mixed_doubles';
  division?: string;
  partner_id?: string;
  partner_name?: string;
  special_requests?: string;
  dietary_restrictions?: string;
}

interface TournamentRegistrationResponse extends ApiResponse<{
  registration: any;
  payment_required: boolean;
  payment_amount?: number;
}> {}
```

---

## Courts

### Get All Courts

**GET** `/courts?page=1&limit=10&club_id=uuid&court_type=indoor&surface=concrete&is_available=true&search=court1`

```typescript
interface CourtsQueryParams {
  page?: number;
  limit?: number;
  club_id?: string;
  court_type?: 'indoor' | 'outdoor' | 'covered';
  surface?: 'concrete' | 'asphalt' | 'synthetic' | 'grass' | 'clay';
  is_available?: boolean;
  search?: string;
}

interface CourtsResponse extends PaginatedResponse<Court> {}
```

### Get Court by ID

**GET** `/courts/:id`

```typescript
interface CourtResponse extends ApiResponse<Court> {}
```

### Create Court

**POST** `/courts`

```typescript
interface CreateCourtRequest {
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

interface CreateCourtResponse extends ApiResponse<Court> {}
```

### Book Court

**POST** `/courts/:id/book`

```typescript
interface BookCourtRequest {
  start_time: string;
  end_time: string;
  purpose?: string;
}

interface BookCourtResponse extends ApiResponse<{
  booking: any;
  payment_required: boolean;
  payment_amount?: number;
}> {}
```

---

## Payments

### Get All Payments

**GET** `/payments?page=1&limit=10&payment_type=membership_fee&status=completed&user_id=uuid&start_date=2024-01-01&end_date=2024-12-31`

```typescript
interface PaymentsQueryParams {
  page?: number;
  limit?: number;
  payment_type?: 'membership_fee' | 'tournament_registration' | 'court_rental' | 'equipment_purchase' | 'donation' | 'subscription_upgrade' | 'other';
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  user_id?: string;
  start_date?: string;
  end_date?: string;
}

interface PaymentsResponse extends PaginatedResponse<Payment> {}
```

### Create Payment

**POST** `/payments`

```typescript
interface CreatePaymentRequest {
  amount: number;
  currency?: string;
  payment_type: 'membership_fee' | 'tournament_registration' | 'court_rental' | 'equipment_purchase' | 'donation' | 'subscription_upgrade' | 'other';
  payment_method: 'stripe' | 'paypal' | 'bank_transfer' | 'cash' | 'check' | 'other';
  description?: string;
  club_id?: string;
  tournament_id?: string;
}

interface CreatePaymentResponse extends ApiResponse<Payment> {}
```

### Process Payment (Stripe)

**POST** `/payments/:id/process`

```typescript
interface ProcessPaymentRequest {
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

interface ProcessPaymentResponse extends ApiResponse<{
  payment: Payment;
  client_secret?: string;
}> {}
```

---

## Rankings

### Get Rankings

**GET** `/rankings?page=1&limit=20&category=singles&skill_level=4.0&state=Jalisco&search=john`

```typescript
interface RankingsQueryParams {
  page?: number;
  limit?: number;
  category?: 'singles' | 'doubles' | 'mixed_doubles';
  skill_level?: '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  state?: string;
  search?: string;
}

interface RankingsResponse extends PaginatedResponse<Ranking> {}
```

### Get Top Players

**GET** `/rankings/top?limit=10&category=singles&skill_level=4.0`

```typescript
interface TopPlayersResponse extends ApiResponse<Ranking[]> {}
```

### Get User Rankings

**GET** `/rankings/user/:userId`

```typescript
interface UserRankingsResponse extends ApiResponse<Ranking[]> {}
```

---

## Notifications

### Get User Notifications

**GET** `/notifications?page=1&limit=20&type=system&unread_only=true`

```typescript
interface NotificationsQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  unread_only?: boolean;
}

interface NotificationsResponse extends PaginatedResponse<Notification> {}
```

### Mark Notification as Read

**PUT** `/notifications/:id/read`

```typescript
interface MarkReadResponse extends ApiResponse<Notification> {}
```

### Mark All Notifications as Read

**PUT** `/notifications/read-all`

```typescript
interface MarkAllReadResponse extends ApiResponse<{
  updated_count: number;
}> {}
```

---

## Admin

### Get Dashboard Stats

**GET** `/admin/dashboard`

```typescript
interface DashboardStatsResponse extends ApiResponse<{
  total_users: number;
  total_clubs: number;
  total_tournaments: number;
  total_revenue: number;
  active_memberships: number;
  new_users_this_month: number;
  upcoming_tournaments: number;
  pending_payments: number;
}> {}
```

### Get System Users

**GET** `/admin/users?page=1&limit=20&user_type=player&role=user&membership_status=active&search=john`

```typescript
interface AdminUsersResponse extends PaginatedResponse<User> {}
```

### Update User Role

**PUT** `/admin/users/:id/role`

```typescript
interface UpdateUserRoleRequest {
  role: 'user' | 'moderator' | 'admin' | 'super_admin';
}

interface UpdateUserRoleResponse extends ApiResponse<User> {}
```

---

## Statistics

### Get Platform Overview

**GET** `/stats/overview`

```typescript
interface OverviewStatsResponse extends ApiResponse<{
  total_users: number;
  total_clubs: number;
  total_tournaments: number;
  total_revenue: number;
  active_memberships: number;
}> {}
```

### Get User Statistics

**GET** `/stats/users?start_date=2024-01-01&end_date=2024-12-31&state=Jalisco&category=users`

```typescript
interface UserStatsResponse extends ApiResponse<{
  total_users: number;
  new_users_this_month: number;
  active_users: number;
  users_by_type: Record<string, number>;
  users_by_state: Record<string, number>;
}> {}
```

---

## Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details: string;
  };
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists
- `PAYMENT_ERROR` - Payment processing failed
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Server error

### Example Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Email must be a valid email address"
  }
}
```

---

## Frontend Integration Examples

### Redux Store Setup

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import clubsReducer from './slices/clubsSlice';
import tournamentsReducer from './slices/tournamentsSlice';
import paymentsReducer from './slices/paymentsSlice';
import rankingsReducer from './slices/rankingsSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    clubs: clubsReducer,
    tournaments: tournamentsReducer,
    payments: paymentsReducer,
    rankings: rankingsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Auth Slice Example

```typescript
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest } from '../../types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refresh_token: localStorage.getItem('refresh_token'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest) => {
    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens.accessToken;
        state.refresh_token = action.payload.tokens.refreshToken;
        localStorage.setItem('token', action.payload.tokens.accessToken);
        localStorage.setItem('refresh_token', action.payload.tokens.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

### API Service Example

```typescript
// services/api.ts
import { store } from '../store';

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

  // Clubs methods
  async getClubs(params: ClubsQueryParams): Promise<ClubsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<ClubsResponse>(`/clubs?${queryString}`);
  }

  async getClub(id: string): Promise<ClubResponse> {
    return this.request<ClubResponse>(`/clubs/${id}`);
  }

  // Tournaments methods
  async getTournaments(params: TournamentsQueryParams): Promise<TournamentsResponse> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<TournamentsResponse>(`/tournaments?${queryString}`);
  }

  async getTournament(id: string): Promise<TournamentResponse> {
    return this.request<TournamentResponse>(`/tournaments/${id}`);
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
}

export const apiService = new ApiService();
```

### React Component Example

```typescript
// components/TournamentList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchTournaments } from '../store/slices/tournamentsSlice';
import { Tournament } from '../types/api';

const TournamentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tournaments, loading, error } = useSelector(
    (state: RootState) => state.tournaments
  );
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: 'registration_open',
  });

  useEffect(() => {
    dispatch(fetchTournaments(filters));
  }, [dispatch, filters]);

  if (loading) return <div>Loading tournaments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tournament-list">
      <h2>Tournaments</h2>
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="registration_open">Registration Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="tournaments">
        {tournaments.map((tournament: Tournament) => (
          <div key={tournament.id} className="tournament-card">
            <h3>{tournament.name}</h3>
            <p>{tournament.description}</p>
            <p>Venue: {tournament.venue_name}</p>
            <p>Date: {new Date(tournament.start_date).toLocaleDateString()}</p>
            <p>Entry Fee: ${tournament.entry_fee}</p>
            <button onClick={() => handleRegister(tournament.id)}>
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentList;
```

### Custom Hook Example

```typescript
// hooks/useApi.ts
import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export function useApi<T, P = void>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params?: P) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiService.request<T>(params as any);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, execute };
}

// Usage example
export function useTournaments() {
  return useApi<TournamentsResponse, TournamentsQueryParams>();
}
```

---

## Environment Setup

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

This corrected API documentation now accurately reflects the actual models and controller responses, providing precise TypeScript interfaces for seamless frontend integration. 