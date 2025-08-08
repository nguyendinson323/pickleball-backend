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
  requireRole(['admin', 'super_admin']), 
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
  requireRole(['admin', 'super_admin']),
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

module.exports = router; 