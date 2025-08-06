/**
 * Clubs Routes
 * 
 * This file defines all club-related routes including
 * club management, listings, and club-specific operations.
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
const clubController = require('../controllers/clubController');

// Validation schemas
const clubListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('state').optional().isString().withMessage('State must be a string'),
  query('city').optional().isString().withMessage('City must be a string'),
  query('club_type').optional().isIn(['recreational', 'competitive', 'training', 'mixed']).withMessage('Invalid club type'),
  query('has_courts').optional().isBoolean().withMessage('has_courts must be a boolean'),
  query('subscription_plan').optional().isIn(['basic', 'premium']).withMessage('Invalid subscription plan')
];

/**
 * @route   GET /clubs
 * @desc    Get paginated list of clubs
 * @access  Public
 */
router.get('/', 
  clubListValidation,
  asyncHandler(clubController.getClubs)
);

/**
 * @route   GET /clubs/:id
 * @desc    Get specific club details
 * @access  Public
 */
router.get('/:id', 
  asyncHandler(clubController.getClubById)
);

/**
 * @route   POST /clubs
 * @desc    Create new club
 * @access  Private (Authenticated)
 */
router.post('/', 
  authenticateToken,
  asyncHandler(clubController.createClub)
);

/**
 * @route   PUT /clubs/:id
 * @desc    Update club (owner or admin)
 * @access  Private (Owner/Admin)
 */
router.put('/:id', 
  authenticateToken,
  asyncHandler(clubController.updateClub)
);

/**
 * @route   DELETE /clubs/:id
 * @desc    Delete club (owner or admin)
 * @access  Private (Owner/Admin)
 */
router.delete('/:id', 
  authenticateToken,
  asyncHandler(clubController.deleteClub)
);

/**
 * @route   GET /clubs/search
 * @desc    Search clubs
 * @access  Public
 */
router.get('/search', 
  asyncHandler(clubController.searchClubs)
);

/**
 * @route   GET /clubs/nearby
 * @desc    Get clubs near a location
 * @access  Public
 */
router.get('/nearby', 
  asyncHandler(clubController.getNearbyClubs)
);

/**
 * @route   GET /clubs/:id/courts
 * @desc    Get courts for a specific club
 * @access  Public
 */
router.get('/:id/courts', 
  asyncHandler(clubController.getClubCourts)
);

/**
 * @route   GET /clubs/:id/tournaments
 * @desc    Get tournaments organized by a club
 * @access  Public
 */
router.get('/:id/tournaments', 
  asyncHandler(clubController.getClubTournaments)
);

/**
 * @route   GET /clubs/:id/members
 * @desc    Get members of a club
 * @access  Private (Club Owner/Admin)
 */
router.get('/:id/members', 
  authenticateToken,
  asyncHandler(clubController.getClubMembers)
);

/**
 * @route   GET /clubs/:id/stats
 * @desc    Get club statistics
 * @access  Private (Club Owner/Admin)
 */
router.get('/:id/stats', 
  authenticateToken,
  asyncHandler(clubController.getClubStats)
);

module.exports = router; 