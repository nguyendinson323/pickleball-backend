/**
 * Player Finder Routes
 * 
 * API routes for location-based player matching and search functionality.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');

const { authenticateToken, requireRole, requireUserType } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');
const playerFinderController = require('../controllers/playerFinderController');

// Validation schemas
const searchPlayersValidation = [
  query('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
  query('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required'),
  query('radius').optional().isInt({ min: 1, max: 500 }).withMessage('Radius must be between 1 and 500 km'),
  query('skill_level').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid skill level'),
  query('gender').optional().isIn(['male', 'female', 'any']).withMessage('Invalid gender'),
  query('age_min').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  query('age_max').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  query('match_type').optional().isIn(['singles', 'doubles', 'mixed_doubles', 'any']).withMessage('Invalid match type'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

const finderPreferencesValidation = [
  body('skill_level_min').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid minimum skill level'),
  body('skill_level_max').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid maximum skill level'),
  body('preferred_gender').optional().isIn(['male', 'female', 'any']).withMessage('Invalid preferred gender'),
  body('age_range_min').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  body('age_range_max').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  body('search_radius_km').optional().isInt({ min: 1, max: 500 }).withMessage('Search radius must be between 1 and 500 km'),
  body('preferred_locations').optional().isArray().withMessage('Preferred locations must be an array'),
  body('match_type').optional().isIn(['singles', 'doubles', 'mixed_doubles', 'any']).withMessage('Invalid match type'),
  body('availability_days').optional().isArray().withMessage('Availability days must be an array'),
  body('availability_time_start').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (HH:MM)'),
  body('availability_time_end').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (HH:MM)'),
  body('contact_method').optional().isIn(['email', 'phone', 'whatsapp', 'any']).withMessage('Invalid contact method'),
  body('auto_notify').optional().isBoolean().withMessage('Auto notify must be a boolean'),
  body('notes').optional().isLength({ max: 1000 }).withMessage('Notes must be 1000 characters or less')
];

const matchRequestValidation = [
  body('message').optional().isLength({ max: 500 }).withMessage('Message must be 500 characters or less'),
  body('preferred_date').optional().isISO8601().withMessage('Preferred date must be a valid date'),
  body('preferred_time').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (HH:MM)'),
  body('match_type').optional().isIn(['singles', 'doubles', 'mixed_doubles']).withMessage('Invalid match type')
];

const userIdValidation = [
  param('targetUserId').isUUID().withMessage('Invalid user ID')
];

// Public routes (no authentication required)
router.get('/search', searchPlayersValidation, asyncHandler(playerFinderController.searchPlayers));

// Authenticated routes
router.get('/nearby', authenticateToken, asyncHandler(playerFinderController.getNearbyPlayers));
router.get('/preferences', authenticateToken, asyncHandler(playerFinderController.getFinderPreferences));
router.put('/preferences', authenticateToken, finderPreferencesValidation, asyncHandler(playerFinderController.updateFinderPreferences));
router.patch('/toggle', authenticateToken, asyncHandler(playerFinderController.toggleFinderStatus));
router.get('/stats', authenticateToken, asyncHandler(playerFinderController.getFinderStats));

// Match request routes
router.post('/match-request/:targetUserId', authenticateToken, userIdValidation, matchRequestValidation, asyncHandler(playerFinderController.sendMatchRequest));

// Coach finding routes
router.get('/coaches', searchPlayersValidation, asyncHandler(playerFinderController.findCoaches));

// Visibility settings
router.patch('/visibility', authenticateToken, 
  body('can_be_found').isBoolean().withMessage('can_be_found must be a boolean'),
  asyncHandler(playerFinderController.updateVisibility)
);

// Create finder request with automatic matching
router.post('/request', authenticateToken, finderPreferencesValidation, asyncHandler(playerFinderController.createFinderRequest));

module.exports = router; 