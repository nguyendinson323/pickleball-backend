/**
 * Application Constants
 * 
 * This file contains all constants, enums, and configuration values used throughout the application.
 * Centralizing these values makes the application more maintainable and consistent.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

// User Types and Roles
const USER_TYPES = {
  PLAYER: 'player',
  COACH: 'coach',
  CLUB: 'club',
  PARTNER: 'partner',
  STATE: 'state',
  ADMIN: 'admin'
};

const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user'
};

// Player Skill Levels (NRTP - National Rating Tournament Player)
const SKILL_LEVELS = {
  BEGINNER: '2.5',
  INTERMEDIATE_LOW: '3.0',
  INTERMEDIATE: '3.5',
  INTERMEDIATE_HIGH: '4.0',
  ADVANCED: '4.5',
  PROFESSIONAL: '5.0',
  ELITE: '5.5'
};

// Tournament Types
const TOURNAMENT_TYPES = {
  LOCAL: 'local',
  STATE: 'state',
  NATIONAL: 'national',
  INTERNATIONAL: 'international',
  EXHIBITION: 'exhibition',
  LEAGUE: 'league'
};

// Tournament Categories
const TOURNAMENT_CATEGORIES = {
  SINGLES: 'singles',
  DOUBLES: 'doubles',
  MIXED_DOUBLES: 'mixed_doubles',
  TEAM: 'team'
};

// Tournament Status
const TOURNAMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  REGISTRATION_OPEN: 'registration_open',
  REGISTRATION_CLOSED: 'registration_closed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Payment Status
const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
};

// Membership Status
const MEMBERSHIP_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  SUSPENDED: 'suspended',
  CANCELLED: 'cancelled',
  PENDING: 'pending'
};

// Club Types
const CLUB_TYPES = {
  RECREATIONAL: 'recreational',
  COMPETITIVE: 'competitive',
  TRAINING: 'training',
  MIXED: 'mixed'
};

// Partner Types
const PARTNER_TYPES = {
  HOTEL: 'hotel',
  RESORT: 'resort',
  SPORTS_CENTER: 'sports_center',
  PRIVATE_COURT: 'private_court',
  SPONSOR: 'sponsor',
  PROVIDER: 'provider'
};

// Court Types
const COURT_TYPES = {
  INDOOR: 'indoor',
  OUTDOOR: 'outdoor',
  COVERED: 'covered'
};

const COURT_SURFACES = {
  CONCRETE: 'concrete',
  ASPHALT: 'asphalt',
  SYNTHETIC: 'synthetic',
  GRASS: 'grass',
  CLAY: 'clay'
};

// Notification Types
const NOTIFICATION_TYPES = {
  TOURNAMENT_REGISTRATION: 'tournament_registration',
  PAYMENT_CONFIRMATION: 'payment_confirmation',
  MATCH_SCHEDULE: 'match_schedule',
  TOURNAMENT_UPDATE: 'tournament_update',
  MEMBERSHIP_RENEWAL: 'membership_renewal',
  SYSTEM_ANNOUNCEMENT: 'system_announcement',
  PLAYER_MATCH_REQUEST: 'player_match_request'
};

// File Upload Types
const UPLOAD_TYPES = {
  PROFILE_PHOTO: 'profile_photo',
  DOCUMENT: 'document',
  TOURNAMENT_BANNER: 'tournament_banner',
  CLUB_LOGO: 'club_logo',
  COURT_PHOTO: 'court_photo'
};

// Mexican States (32 states)
const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León',
  'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas'
];

// Ranking Point System
const RANKING_POINTS = {
  NATIONAL_CHAMPIONSHIP: {
    '2.5': 100,
    '3.0': 150,
    '3.5': 200,
    '4.0': 250,
    '4.5': 300,
    '5.0': 350,
    '5.5': 400
  },
  STATE_CHAMPIONSHIP: {
    '2.5': 50,
    '3.0': 75,
    '3.5': 100,
    '4.0': 125,
    '4.5': 150,
    '5.0': 175,
    '5.5': 200
  },
  LOCAL_TOURNAMENT: {
    '2.5': 25,
    '3.0': 35,
    '3.5': 45,
    '4.0': 55,
    '4.5': 65,
    '5.0': 75,
    '5.5': 85
  }
};

// Membership Fees (in MXN pesos)
const MEMBERSHIP_FEES = {
  PLAYER: {
    ANNUAL: 500,
    MONTHLY: 50
  },
  COACH: {
    ANNUAL: 800,
    MONTHLY: 80
  },
  CLUB: {
    BASIC_ANNUAL: 2000,
    PREMIUM_ANNUAL: 5000
  },
  PARTNER: {
    PREMIUM_ANNUAL: 8000
  },
  STATE: {
    ANNUAL: 15000
  }
};

// API Response Messages
const API_MESSAGES = {
  SUCCESS: {
    USER_CREATED: 'User created successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DELETED: 'User deleted successfully',
    USER_REGISTERED: 'User registered successfully',
    EMAIL_VERIFIED: 'Email verified successfully',
    PASSWORD_RESET: 'Password reset successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    TOURNAMENT_CREATED: 'Tournament created successfully',
    TOURNAMENT_UPDATED: 'Tournament updated successfully',
    TOURNAMENT_RETRIEVED: 'Tournament retrieved successfully',
    PAYMENT_SUCCESS: 'Payment processed successfully',
    EMAIL_SENT: 'Email sent successfully',
    USERS_RETRIEVED: 'Users retrieved successfully',
    USER_RETRIEVED: 'User retrieved successfully',
    PLAYERS_RETRIEVED: 'Players retrieved successfully',
    COACHES_RETRIEVED: 'Coaches retrieved successfully',
    CLUBS_RETRIEVED: 'Clubs retrieved successfully',
    STATES_RETRIEVED: 'States retrieved successfully',
    USER_STATS_RETRIEVED: 'User statistics retrieved successfully',
    NOTIFICATIONS_RETRIEVED: 'Notifications retrieved successfully',
    NOTIFICATION_RETRIEVED: 'Notification retrieved successfully',
    NOTIFICATIONS_SENT: 'Notifications sent successfully',
    SYSTEM_NOTIFICATION_SENT: 'System notification sent successfully',
    NOTIFICATION_STATS_RETRIEVED: 'Notification statistics retrieved successfully',
    NOTIFICATION_PREFERENCES_RETRIEVED: 'Notification preferences retrieved successfully',
    NOTIFICATION_PREFERENCES_UPDATED: 'Notification preferences updated successfully'
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    TOURNAMENT_NOT_FOUND: 'Tournament not found',
    PAYMENT_FAILED: 'Payment processing failed',
    EMAIL_FAILED: 'Email sending failed',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    BANNER_CREATED: 'Banner created successfully',
    BANNER_UPDATED: 'Banner updated successfully',
    BANNER_DELETED: 'Banner deleted successfully',
    COURT_BOOKED: 'Court booked successfully',
    COURT_RESERVATIONS_RETRIEVED: 'Court reservations retrieved successfully',
    COURT_RESERVATION_CANCELLED: 'Court reservation cancelled successfully',
    PLAYER_MATCH_FOUND: 'Player match found successfully',
    PLAYER_FINDER_UPDATED: 'Player finder preferences updated successfully',
    DIGITAL_CREDENTIAL_CREATED: 'Digital credential created successfully',
    DIGITAL_CREDENTIAL_RETRIEVED: 'Digital credential retrieved successfully',
    DIGITAL_CREDENTIAL_VERIFIED: 'Digital credential verified successfully',
    DIGITAL_CREDENTIAL_UPDATED: 'Digital credential updated successfully',
    DIGITAL_CREDENTIALS_RETRIEVED: 'Digital credentials retrieved successfully',
    QR_CODE_REGENERATED: 'QR code regenerated successfully'
  }
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Pagination Defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// JWT Token Expiration
const JWT_EXPIRATION = {
  ACCESS_TOKEN: '7d',
  REFRESH_TOKEN: '30d',
  EMAIL_VERIFICATION: '24h',
  PASSWORD_RESET: '1h'
};

// File Upload Limits
const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  MAX_FILES: 10
};

// Email Templates
const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  VERIFICATION: 'verification',
  PASSWORD_RESET: 'password_reset',
  TOURNAMENT_REGISTRATION: 'tournament_registration',
  PAYMENT_CONFIRMATION: 'payment_confirmation',
  MEMBERSHIP_RENEWAL: 'membership_renewal'
};

// Cache Keys
const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  TOURNAMENT_LIST: 'tournament_list',
  RANKINGS: 'rankings',
  CLUB_LIST: 'club_list',
  STATS: 'stats'
};

// Cache TTL (Time To Live) in seconds
const CACHE_TTL = {
  SHORT: 300,    // 5 minutes
  MEDIUM: 1800,  // 30 minutes
  LONG: 3600,    // 1 hour
  VERY_LONG: 86400 // 24 hours
};

module.exports = {
  USER_TYPES,
  USER_ROLES,
  SKILL_LEVELS,
  TOURNAMENT_TYPES,
  TOURNAMENT_CATEGORIES,
  TOURNAMENT_STATUS,
  PAYMENT_STATUS,
  MEMBERSHIP_STATUS,
  CLUB_TYPES,
  PARTNER_TYPES,
  COURT_TYPES,
  COURT_SURFACES,
  NOTIFICATION_TYPES,
  UPLOAD_TYPES,
  MEXICAN_STATES,
  RANKING_POINTS,
  MEMBERSHIP_FEES,
  API_MESSAGES,
  HTTP_STATUS,
  PAGINATION,
  JWT_EXPIRATION,
  FILE_LIMITS,
  EMAIL_TEMPLATES,
  CACHE_KEYS,
  CACHE_TTL
}; 