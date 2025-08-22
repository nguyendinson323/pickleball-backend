/**
 * Routes Index
 * 
 * This file centralizes all route modules and provides
 * a clean interface for the main server to import routes.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const clubRoutes = require('./clubs');
const tournamentRoutes = require('./tournaments');
const courtRoutes = require('./courts');
const paymentRoutes = require('./payments');
const rankingRoutes = require('./rankings');
const notificationRoutes = require('./notifications');
const adminRoutes = require('./admin');
const statsRoutes = require('./stats');
const bannerRoutes = require('./banners');
const playerFinderRoutes = require('./playerFinder');
const digitalCredentialRoutes = require('./digitalCredentials');
const courtReservationRoutes = require('./courtReservations');
const coachRoutes = require('./coaches');
const adminMessageRoutes = require('./adminMessages');
const micrositeRoutes = require('./microsites');
const expenseRoutes = require('./expenses');

// Define route prefixes
const API_PREFIX = '/api/v1';

// Mount all routes with their respective prefixes
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/users`, userRoutes);
router.use(`${API_PREFIX}/clubs`, clubRoutes);
router.use(`${API_PREFIX}/tournaments`, tournamentRoutes);
router.use(`${API_PREFIX}/courts`, courtRoutes);
router.use(`${API_PREFIX}/payments`, paymentRoutes);
router.use(`${API_PREFIX}/rankings`, rankingRoutes);
router.use(`${API_PREFIX}/notifications`, notificationRoutes);
router.use(`${API_PREFIX}/admin`, adminRoutes);
router.use(`${API_PREFIX}/stats`, statsRoutes);
router.use(`${API_PREFIX}/banners`, bannerRoutes);
router.use(`${API_PREFIX}/player-finder`, playerFinderRoutes);
router.use(`${API_PREFIX}/digital-credentials`, digitalCredentialRoutes);
router.use(`${API_PREFIX}/court-reservations`, courtReservationRoutes);
router.use(`${API_PREFIX}/coaches`, coachRoutes);
router.use(`${API_PREFIX}/admin/messages`, adminMessageRoutes);
router.use(`${API_PREFIX}/admin/microsites`, micrositeRoutes);
router.use(`${API_PREFIX}/expenses`, expenseRoutes);

// Health check endpoint
router.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Pickleball Federation API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API documentation endpoint
router.get(`${API_PREFIX}/docs`, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Documentation',
    data: {
      version: '1.0.0',
      base_url: `${req.protocol}://${req.get('host')}${API_PREFIX}`,
      endpoints: {
        auth: {
          base: '/auth',
          routes: [
            'POST /register - Register new user',
            'POST /login - User login',
            'POST /logout - User logout',
            'POST /refresh-token - Refresh JWT token',
            'GET /verify-email/:token - Verify email address',
            'POST /request-password-reset - Request password reset',
            'POST /reset-password - Reset password',
            'GET /profile - Get user profile',
            'PUT /profile - Update user profile'
          ]
        },
        users: {
          base: '/users',
          routes: [
            'GET / - Get all users (admin)',
            'GET /:id - Get user by ID',
            'PUT /:id - Update user',
            'DELETE /:id - Delete user (admin)',
            'GET /search - Search users',
            'GET /players - Get all players',
            'GET /coaches - Get all coaches',
            'GET /clubs - Get all clubs',
            'GET /:id/stats - Get user statistics'
          ]
        },
        clubs: {
          base: '/clubs',
          routes: [
            'GET / - Get all clubs',
            'GET /:id - Get club by ID',
            'POST / - Create new club',
            'PUT /:id - Update club',
            'DELETE /:id - Delete club',
            'GET /search - Search clubs',
            'GET /nearby - Get nearby clubs',
            'GET /:id/courts - Get club courts',
            'GET /:id/tournaments - Get club tournaments',
            'GET /:id/members - Get club members',
            'GET /:id/stats - Get club statistics'
          ]
        },
        tournaments: {
          base: '/tournaments',
          routes: [
            'GET / - Get all tournaments',
            'GET /upcoming - Get upcoming tournaments',
            'GET /:id - Get tournament by ID',
            'POST / - Create new tournament',
            'PUT /:id - Update tournament',
            'DELETE /:id - Delete tournament',
            'POST /:id/register - Register for tournament',
            'GET /:id/participants - Get tournament participants',
            'GET /:id/matches - Get tournament matches',
            'GET /:id/stats - Get tournament statistics'
          ]
        },
        courts: {
          base: '/courts',
          routes: [
            'GET / - Get all courts',
            'GET /:id - Get court by ID',
            'POST / - Create new court',
            'PUT /:id - Update court',
            'DELETE /:id - Delete court',
            'GET /:id/availability - Get court availability',
            'GET /:id/bookings - Get court bookings',
            'POST /:id/book - Book court',
            'GET /:id/stats - Get court statistics'
          ]
        },
        payments: {
          base: '/payments',
          routes: [
            'GET / - Get all payments',
            'GET /stats - Get payment statistics',
            'GET /user/:userId - Get user payment history',
            'GET /:id - Get payment by ID',
            'POST / - Create new payment',
            'POST /:id/process - Process payment',
            'POST /:id/refund - Refund payment',
            'POST /webhook/stripe - Stripe webhook'
          ]
        },
        rankings: {
          base: '/rankings',
          routes: [
            'GET / - Get rankings by category',
            'GET /top - Get top players',
            'GET /history - Get ranking history',
            'GET /stats - Get ranking statistics',
            'GET /export - Export rankings',
            'GET /user/:userId - Get user rankings',
            'GET /state/:state - Get state rankings',
            'POST /calculate - Calculate rankings',
            'POST /update-tournament/:tournamentId - Update tournament results'
          ]
        },
        notifications: {
          base: '/notifications',
          routes: [
            'GET / - Get user notifications',
            'GET /stats - Get notification statistics',
            'GET /preferences - Get notification preferences',
            'PUT /preferences - Update notification preferences',
            'GET /:id - Get specific notification',
            'PUT /:id/read - Mark notification as read',
            'PUT /read-all - Mark all notifications as read',
            'DELETE /:id - Delete notification',
            'POST /send - Send notification',
            'POST /system - Send system notification'
          ]
        },
        admin: {
          base: '/admin',
          routes: [
            'GET /dashboard - Get dashboard statistics',
            'GET /users - Get system users',
            'PUT /users/:id/role - Update user role',
            'PUT /users/:id/membership - Update user membership',
            'GET /logs - Get system logs',
            'GET /health - Get system health',
            'GET /settings - Get system settings',
            'PUT /settings - Update system settings',
            'GET /activity - Get admin activity',
            'GET /export - Export system data',
            'POST /maintenance - Perform system maintenance'
          ]
        },
        stats: {
          base: '/stats',
          routes: [
            'GET /overview - Get platform overview',
            'GET /users - Get user statistics',
            'GET /tournaments - Get tournament statistics',
            'GET /payments - Get payment statistics',
            'GET /rankings - Get ranking statistics',
            'GET /clubs - Get club statistics',
            'GET /analytics - Get detailed analytics',
            'GET /reports - Generate reports'
          ]
        },
        digitalCredentials: {
          base: '/digital-credentials',
          routes: [
            'GET /verify/:code - Verify digital credential (public)',
            'POST / - Create digital credential (player)',
            'GET /my-credential - Get my digital credential (player)',
            'PUT /:id - Update digital credential (player)',
            'POST /:id/regenerate-qr - Regenerate QR code (player)',
            'GET / - Get all digital credentials (admin)'
          ]
        },
        courtReservations: {
          base: '/court-reservations',
          routes: [
            'GET / - Get court reservations (filtered by user)',
            'PUT /:id/cancel - Cancel court reservation'
          ]
        },
        coaches: {
          base: '/coaches',
          routes: [
            'GET /search - Search coaches with filters (public)',
            'GET /:coachId/profile - Get coach profile by ID (public)',
            'POST /search/create - Create or update coach search preferences',
            'GET /search/my-searches - Get user coach searches',
            'POST /search/:searchId/perform - Perform search with existing criteria',
            'GET /search/stats - Get coach search statistics',
            'POST /:coachId/contact - Contact a coach'
          ]
        },
        expenses: {
          base: '/expenses',
          routes: [
            'POST / - Create new expense',
            'GET / - Get paginated list of expenses',
            'GET /:id - Get specific expense by ID',
            'PUT /:id - Update expense',
            'DELETE /:id - Delete expense',
            'GET /tournament/:tournamentId - Get expenses for tournament',
            'GET /club/:clubId - Get expenses for club'
          ]
        }
      }
    }
  });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: {
      code: 'ROUTE_NOT_FOUND',
      details: `The requested route ${req.originalUrl} does not exist`
    }
  });
});

module.exports = router; 