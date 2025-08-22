/**
 * Court Reservations Routes
 * 
 * This file defines all court reservation-related routes including
 * reservation management, listing, and reservation-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const { authenticateToken } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Import controller methods
const { 
  getCourtReservations, 
  cancelCourtReservation,
  createCourtReservation,
  checkBookingConflicts,
  createRecurringReservation
} = require('../controllers/courtController');

// Validation schemas
const courtReservationsListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('user_id').optional().isUUID().withMessage('Invalid user ID'),
  query('court_id').optional().isUUID().withMessage('Invalid court ID'),
  query('club_id').optional().isUUID().withMessage('Invalid club ID'),
  query('status').optional().isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status'),
  query('start_date').optional().isISO8601().withMessage('Valid start date is required'),
  query('end_date').optional().isISO8601().withMessage('Valid end date is required')
];

const createReservationValidation = [
  body('court_id').isUUID().withMessage('Valid court ID is required'),
  body('start_time').isISO8601().withMessage('Valid start time is required'),
  body('end_time').isISO8601().withMessage('Valid end time is required'),
  body('purpose').optional().isString().withMessage('Purpose must be a string'),
  body('match_type').optional().isIn(['singles', 'doubles', 'mixed_doubles', 'practice', 'lesson', 'other']).withMessage('Invalid match type'),
  body('participants').optional().isArray().withMessage('Participants must be an array'),
  body('guest_count').optional().isInt({ min: 0 }).withMessage('Guest count must be a positive integer'),
  body('special_requests').optional().isString().withMessage('Special requests must be a string'),
  body('equipment_needed').optional().isArray().withMessage('Equipment needed must be an array')
];

const recurringReservationValidation = [
  ...createReservationValidation,
  body('recurrence.pattern').isIn(['daily', 'weekly', 'monthly']).withMessage('Invalid recurrence pattern'),
  body('recurrence.interval').isInt({ min: 1 }).withMessage('Interval must be a positive integer'),
  body('recurrence.days_of_week').optional().isArray().withMessage('Days of week must be an array'),
  body('recurrence.end_date').optional().isISO8601().withMessage('Valid end date is required'),
  body('recurrence.max_occurrences').optional().isInt({ min: 1 }).withMessage('Max occurrences must be a positive integer')
];

const conflictCheckValidation = [
  body('court_id').isUUID().withMessage('Valid court ID is required'),
  body('dates').isArray({ min: 1 }).withMessage('Dates array is required'),
  body('start_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time is required (HH:MM)'),
  body('duration_hours').isFloat({ min: 0.5 }).withMessage('Duration must be at least 0.5 hours')
];

/**
 * @route   GET /court-reservations
 * @desc    Get paginated list of court reservations
 * @access  Private
 */
router.get('/', 
  authenticateToken,
  courtReservationsListValidation,
  asyncHandler(getCourtReservations)
);

/**
 * @route   POST /court-reservations
 * @desc    Create a new court reservation
 * @access  Private
 */
router.post('/', 
  authenticateToken,
  createReservationValidation,
  asyncHandler(createCourtReservation)
);

/**
 * @route   POST /court-reservations/check-conflicts
 * @desc    Check for booking conflicts
 * @access  Private
 */
router.post('/check-conflicts', 
  authenticateToken,
  conflictCheckValidation,
  asyncHandler(checkBookingConflicts)
);

/**
 * @route   POST /court-reservations/recurring
 * @desc    Create recurring court reservations
 * @access  Private
 */
router.post('/recurring', 
  authenticateToken,
  recurringReservationValidation,
  asyncHandler(createRecurringReservation)
);

/**
 * @route   PUT /court-reservations/:id/cancel
 * @desc    Cancel a court reservation
 * @access  Private (Owner/Admin)
 */
router.put('/:id/cancel', 
  authenticateToken,
  asyncHandler(cancelCourtReservation)
);

module.exports = router;