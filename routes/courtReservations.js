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
const { query } = require('express-validator');

// Import controllers and middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Import controller methods
const { 
  getCourtReservations, 
  cancelCourtReservation 
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
 * @route   PUT /court-reservations/:id/cancel
 * @desc    Cancel a court reservation
 * @access  Private (Owner/Admin)
 */
router.put('/:id/cancel', 
  authenticateToken,
  asyncHandler(cancelCourtReservation)
);

module.exports = router;