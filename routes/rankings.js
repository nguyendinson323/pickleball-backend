/**
 * Rankings Routes
 * 
 * This file defines all ranking-related routes including
 * ranking management, calculations, and ranking-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const rankingController = require('../controllers/rankingController');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const rankingListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['singles', 'doubles', 'mixed_doubles']).withMessage('Invalid category'),
  query('skill_level').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid skill level'),
  query('state').optional().isString().withMessage('State must be a string'),
  query('search').optional().isString().withMessage('Search must be a string')
];

const calculateRankingsValidation = [
  body('category').optional().isIn(['singles', 'doubles', 'mixed_doubles']).withMessage('Invalid category'),
  body('skill_level').optional().isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']).withMessage('Invalid skill level'),
  body('state').optional().isString().withMessage('State must be a string')
];

const updateTournamentResultsValidation = [
  body('results').isArray().withMessage('Results must be an array'),
  body('results.*.user_id').isUUID().withMessage('Valid user ID is required'),
  body('results.*.position').isInt({ min: 1 }).withMessage('Position must be a positive integer'),
  body('results.*.points').isInt({ min: 0 }).withMessage('Points must be a non-negative integer')
];

/**
 * @route   GET /rankings
 * @desc    Get rankings by category
 * @access  Public
 */
router.get('/', 
  rankingListValidation,
  asyncHandler(rankingController.getRankings)
);

/**
 * @route   GET /rankings/top
 * @desc    Get top players
 * @access  Public
 */
router.get('/top', 
  asyncHandler(rankingController.getTopPlayers)
);

/**
 * @route   GET /rankings/history
 * @desc    Get ranking history
 * @access  Public
 */
router.get('/history', 
  asyncHandler(rankingController.getRankingHistory)
);

/**
 * @route   GET /rankings/stats
 * @desc    Get ranking statistics
 * @access  Public
 */
router.get('/stats', 
  asyncHandler(rankingController.getRankingStats)
);

/**
 * @route   GET /rankings/export
 * @desc    Export rankings
 * @access  Private (Admin)
 */
router.get('/export', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(rankingController.exportRankings)
);

/**
 * @route   GET /rankings/user/:userId
 * @desc    Get user rankings
 * @access  Public
 */
router.get('/user/:userId', 
  asyncHandler(rankingController.getUserRankings)
);

/**
 * @route   GET /rankings/state/:state
 * @desc    Get rankings by state
 * @access  Public
 */
router.get('/state/:state', 
  asyncHandler(rankingController.getStateRankings)
);

/**
 * @route   POST /rankings/calculate
 * @desc    Calculate rankings
 * @access  Private (Admin)
 */
router.post('/calculate', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  calculateRankingsValidation,
  asyncHandler(rankingController.calculateRankings)
);

/**
 * @route   POST /rankings/update-tournament/:tournamentId
 * @desc    Update tournament results and recalculate rankings
 * @access  Private (Admin)
 */
router.post('/update-tournament/:tournamentId', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  updateTournamentResultsValidation,
  asyncHandler(rankingController.updateTournamentResults)
);

module.exports = router; 