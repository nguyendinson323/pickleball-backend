/**
 * Users Routes
 * 
 * This file defines all user-related routes including
 * user management, profiles, and user-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query } = require('express-validator');

// Import controllers and middleware
const { authenticateToken, requireRole, requireUserType } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Import controllers
const userController = require('../controllers/userController');

// Validation schemas
const userListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('user_type').optional().isIn(['player', 'coach', 'club', 'partner', 'state', 'federation']).withMessage('Invalid user type'),
  query('state').optional().isString().withMessage('State must be a string'),
  query('skill_level').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid skill level'),
  query('membership_status').optional().isIn(['active', 'expired', 'suspended', 'cancelled', 'pending']).withMessage('Invalid membership status')
];

/**
 * @route   GET /users
 * @desc    Get paginated list of users (admin only)
 * @access  Private (Admin)
 */
router.get('/', 
  authenticateToken, 
  requireRole(['admin']), 
  userListValidation,
  asyncHandler(userController.getUsers)
);

/**
 * @route   GET /users/:id
 * @desc    Get specific user details
 * @access  Private
 */
router.get('/:id', 
  authenticateToken,
  asyncHandler(userController.getUserById)
);

/**
 * @route   PUT /users/:id
 * @desc    Update user (admin or owner)
 * @access  Private (Admin/Owner)
 */
router.put('/:id', 
  authenticateToken,
  asyncHandler(userController.updateUser)
);

/**
 * @route   DELETE /users/:id
 * @desc    Delete user (admin only)
 * @access  Private (Admin)
 */
router.delete('/:id', 
  authenticateToken, 
  requireRole(['admin']),
  asyncHandler(userController.deleteUser)
);

/**
 * @route   GET /users/search
 * @desc    Search users
 * @access  Private
 */
router.get('/search', 
  authenticateToken,
  asyncHandler(userController.searchUsers)
);

/**
 * @route   GET /users/players
 * @desc    Get list of players
 * @access  Public
 */
router.get('/players', 
  asyncHandler(userController.getPlayers)
);

/**
 * @route   GET /users/coaches
 * @desc    Get list of coaches
 * @access  Public
 */
router.get('/coaches', 
  asyncHandler(userController.getCoaches)
);

/**
 * @route   GET /users/clubs
 * @desc    Get list of clubs
 * @access  Public
 */
router.get('/clubs', 
  asyncHandler(userController.getClubs)
);

/**
 * @route   GET /users/states
 * @desc    Get list of states
 * @access  Public
 */
router.get('/states', 
  asyncHandler(userController.getStates)
);

/**
 * @route   GET /users/:id/stats
 * @desc    Get user statistics
 * @access  Private
 */
router.get('/:id/stats', 
  authenticateToken,
  asyncHandler(userController.getUserStats)
);

/**
 * @route   PUT /users/:id/toggle-visibility
 * @desc    Toggle player visibility in player finder
 * @access  Private (Owner or Admin)
 */
router.put('/:id/toggle-visibility', 
  authenticateToken,
  asyncHandler(userController.togglePlayerVisibility)
);

/**
 * @route   GET /users/players/find-nearby
 * @desc    Find nearby players for matching
 * @access  Private
 */
router.get('/players/find-nearby', 
  authenticateToken,
  query('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
  query('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required'),
  query('radius').optional().isInt({ min: 1, max: 500 }).withMessage('Radius must be between 1 and 500 km'),
  query('skill_level').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid skill level'),
  query('gender').optional().isIn(['male', 'female', 'any']).withMessage('Invalid gender'),
  query('age_min').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  query('age_max').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  asyncHandler(userController.findNearbyPlayers)
);

/**
 * @route   POST /users/players/:playerId/contact
 * @desc    Contact a player for match request
 * @access  Private
 */
router.post('/players/:playerId/contact', 
  authenticateToken,
  body('message').optional().isLength({ max: 500 }).withMessage('Message must be 500 characters or less'),
  body('contact_type').optional().isIn(['play_request', 'general']).withMessage('Invalid contact type'),
  asyncHandler(userController.contactPlayer)
);

module.exports = router; 