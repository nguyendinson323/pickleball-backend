/**
 * Tournaments Routes
 * 
 * This file defines all tournament-related routes including
 * tournament management, registration, and tournament-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const tournamentController = require('../controllers/tournamentController');
const { authenticateToken, requireRole, requireUserType } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const tournamentListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('tournament_type').optional().isIn(['local', 'state', 'national', 'international', 'exhibition', 'league']).withMessage('Invalid tournament type'),
  query('category').optional().isIn(['singles', 'doubles', 'mixed_doubles', 'team']).withMessage('Invalid category'),
  query('status').optional().isIn(['draft', 'published', 'registration_open', 'registration_closed', 'in_progress', 'completed', 'cancelled']).withMessage('Invalid status'),
  query('state').optional().isString().withMessage('State must be a string'),
  query('city').optional().isString().withMessage('City must be a string'),
  query('search').optional().isString().withMessage('Search must be a string')
];

const createTournamentValidation = [
  body('name').isLength({ min: 3, max: 200 }).withMessage('Tournament name must be 3-200 characters'),
  body('tournament_type').isIn(['local', 'state', 'national', 'international', 'exhibition', 'league']).withMessage('Invalid tournament type'),
  body('category').isIn(['singles', 'doubles', 'mixed_doubles', 'team']).withMessage('Invalid category'),
  body('venue_name').isLength({ min: 2, max: 200 }).withMessage('Venue name must be 2-200 characters'),
  body('start_date').isISO8601().withMessage('Valid start date is required'),
  body('end_date').isISO8601().withMessage('Valid end date is required'),
  body('registration_deadline').isISO8601().withMessage('Valid registration deadline is required'),
  body('state').isLength({ min: 2, max: 100 }).withMessage('State must be 2-100 characters'),
  body('city').isLength({ min: 2, max: 100 }).withMessage('City must be 2-100 characters'),
  body('entry_fee').optional().isFloat({ min: 0 }).withMessage('Entry fee must be a positive number'),
  body('max_participants').optional().isInt({ min: 1 }).withMessage('Max participants must be a positive integer')
];

const updateTournamentValidation = [
  body('name').optional().isLength({ min: 3, max: 200 }).withMessage('Tournament name must be 3-200 characters'),
  body('tournament_type').optional().isIn(['local', 'state', 'national', 'international', 'exhibition', 'league']).withMessage('Invalid tournament type'),
  body('category').optional().isIn(['singles', 'doubles', 'mixed_doubles', 'team']).withMessage('Invalid category'),
  body('venue_name').optional().isLength({ min: 2, max: 200 }).withMessage('Venue name must be 2-200 characters'),
  body('start_date').optional().isISO8601().withMessage('Valid start date is required'),
  body('end_date').optional().isISO8601().withMessage('Valid end date is required'),
  body('registration_deadline').optional().isISO8601().withMessage('Valid registration deadline is required'),
  body('entry_fee').optional().isFloat({ min: 0 }).withMessage('Entry fee must be a positive number'),
  body('max_participants').optional().isInt({ min: 1 }).withMessage('Max participants must be a positive integer')
];

const registrationValidation = [
  body('category').optional().isIn(['singles', 'doubles', 'mixed_doubles']).withMessage('Invalid category'),
  body('division').optional().isString().withMessage('Division must be a string'),
  body('partner_id').optional().isUUID().withMessage('Valid partner ID is required'),
  body('partner_name').optional().isString().withMessage('Partner name must be a string'),
  body('special_requests').optional().isString().withMessage('Special requests must be a string'),
  body('dietary_restrictions').optional().isString().withMessage('Dietary restrictions must be a string')
];

/**
 * @route   GET /tournaments
 * @desc    Get paginated list of tournaments
 * @access  Public
 */
router.get('/', 
  tournamentListValidation,
  asyncHandler(tournamentController.getTournaments)
);

/**
 * @route   GET /tournaments/upcoming
 * @desc    Get upcoming tournaments
 * @access  Public
 */
router.get('/upcoming', 
  asyncHandler(tournamentController.getUpcomingTournaments)
);

/**
 * @route   GET /tournaments/:id
 * @desc    Get specific tournament details
 * @access  Public
 */
router.get('/:id', 
  asyncHandler(tournamentController.getTournamentById)
);

/**
 * @route   POST /tournaments
 * @desc    Create new tournament
 * @access  Private (Club/Partner/State/Federation)
 */
router.post('/', 
  authenticateToken,
  requireUserType(['club', 'partner', 'state', 'federation']),
  createTournamentValidation,
  asyncHandler(tournamentController.createTournament)
);

/**
 * @route   PUT /tournaments/:id
 * @desc    Update tournament (organizer or admin)
 * @access  Private (Organizer/Admin)
 */
router.put('/:id', 
  authenticateToken,
  updateTournamentValidation,
  asyncHandler(tournamentController.updateTournament)
);

/**
 * @route   DELETE /tournaments/:id
 * @desc    Delete tournament (organizer or admin)
 * @access  Private (Organizer/Admin)
 */
router.delete('/:id', 
  authenticateToken,
  asyncHandler(tournamentController.deleteTournament)
);

/**
 * @route   POST /tournaments/:id/register
 * @desc    Register for tournament
 * @access  Private (Player)
 */
router.post('/:id/register', 
  authenticateToken,
  requireUserType(['player']),
  registrationValidation,
  asyncHandler(tournamentController.registerForTournament)
);

/**
 * @route   GET /tournaments/:id/participants
 * @desc    Get tournament participants
 * @access  Public
 */
router.get('/:id/participants', 
  asyncHandler(tournamentController.getTournamentParticipants)
);

/**
 * @route   GET /tournaments/:id/matches
 * @desc    Get tournament matches
 * @access  Public
 */
router.get('/:id/matches', 
  asyncHandler(tournamentController.getTournamentMatches)
);

/**
 * @route   GET /tournaments/:id/stats
 * @desc    Get tournament statistics
 * @access  Public
 */
router.get('/:id/stats', 
  asyncHandler(tournamentController.getTournamentStats)
);

/**
 * @route   PUT /tournaments/:id/assign-referee
 * @desc    Assign referee to tournament
 * @access  Private (Admin/Organizer)
 */
router.put('/:id/assign-referee', 
  authenticateToken,
  body('head_referee_id').optional().isUUID().withMessage('Invalid referee ID'),
  body('assistant_referees').optional().isArray().withMessage('Assistant referees must be an array'),
  body('referee_compensation').optional().isFloat({ min: 0 }).withMessage('Compensation must be a positive number'),
  asyncHandler(tournamentController.assignRefereeToTournament)
);

/**
 * @route   PUT /tournaments/:tournamentId/matches/:matchId/assign-referee
 * @desc    Assign referee to specific match
 * @access  Private (Admin/Organizer)
 */
router.put('/:tournamentId/matches/:matchId/assign-referee', 
  authenticateToken,
  body('referee_id').isUUID().withMessage('Valid referee ID is required'),
  asyncHandler(tournamentController.assignRefereeToMatch)
);

/**
 * @route   GET /tournaments/:id/available-referees
 * @desc    Get available referees for tournament
 * @access  Private (Admin/Organizer)
 */
router.get('/:id/available-referees', 
  authenticateToken,
  query('date').optional().isISO8601().withMessage('Valid date is required'),
  asyncHandler(tournamentController.getAvailableReferees)
);

/**
 * @route   GET /tournaments/referee-stats/:refereeId
 * @desc    Get referee statistics
 * @access  Private
 */
router.get('/referee-stats/:refereeId', 
  authenticateToken,
  asyncHandler(tournamentController.getRefereeStats)
);

/**
 * @route   GET /tournaments/reports
 * @desc    Get tournament reports
 * @access  Private (Admin/Organizer)
 */
router.get('/reports', 
  authenticateToken,
  query('start_date').optional().isISO8601().withMessage('Valid start date required'),
  query('end_date').optional().isISO8601().withMessage('Valid end date required'),
  query('organizer_type').optional().isIn(['club', 'state', 'federation']).withMessage('Invalid organizer type'),
  query('tournament_type').optional().isIn(['local', 'state', 'national', 'international', 'exhibition', 'league']).withMessage('Invalid tournament type'),
  query('format').optional().isIn(['summary', 'detailed', 'financial']).withMessage('Invalid report format'),
  asyncHandler(tournamentController.getTournamentReports)
);

module.exports = router; 