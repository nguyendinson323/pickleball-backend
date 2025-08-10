/**
 * Courts Routes
 * 
 * This file defines all court-related routes including
 * court management, availability, and court-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const courtController = require('../controllers/courtController');
const { authenticateToken, requireRole, requireUserType } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const courtListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('club_id').optional().isUUID().withMessage('Invalid club ID'),
  query('court_type').optional().isIn(['indoor', 'outdoor', 'covered']).withMessage('Invalid court type'),
  query('surface').optional().isIn(['concrete', 'asphalt', 'synthetic', 'grass', 'clay']).withMessage('Invalid surface'),
  query('is_available').optional().isBoolean().withMessage('is_available must be a boolean'),
  query('search').optional().isString().withMessage('Search must be a string')
];

const createCourtValidation = [
  body('name').isLength({ min: 2, max: 100 }).withMessage('Court name must be 2-100 characters'),
  body('court_type').isIn(['indoor', 'outdoor', 'covered']).withMessage('Invalid court type'),
  body('surface').isIn(['concrete', 'asphalt', 'synthetic', 'grass', 'clay']).withMessage('Invalid surface'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('dimensions').optional().isString().withMessage('Dimensions must be a string'),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  body('hourly_rate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('is_available').optional().isBoolean().withMessage('is_available must be a boolean'),
  body('is_maintenance').optional().isBoolean().withMessage('is_maintenance must be a boolean')
];

const updateCourtValidation = [
  body('name').optional().isLength({ min: 2, max: 100 }).withMessage('Court name must be 2-100 characters'),
  body('court_type').optional().isIn(['indoor', 'outdoor', 'covered']).withMessage('Invalid court type'),
  body('surface').optional().isIn(['concrete', 'asphalt', 'synthetic', 'grass', 'clay']).withMessage('Invalid surface'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('dimensions').optional().isString().withMessage('Dimensions must be a string'),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  body('hourly_rate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('is_available').optional().isBoolean().withMessage('is_available must be a boolean'),
  body('is_maintenance').optional().isBoolean().withMessage('is_maintenance must be a boolean')
];

const bookCourtValidation = [
  body('start_time').isISO8601().withMessage('Valid start time is required'),
  body('end_time').isISO8601().withMessage('Valid end time is required'),
  body('purpose').optional().isString().withMessage('Purpose must be a string')
];

/**
 * @route   GET /courts
 * @desc    Get paginated list of courts
 * @access  Public
 */
router.get('/', 
  courtListValidation,
  asyncHandler(courtController.getCourts)
);

/**
 * @route   GET /courts/:id
 * @desc    Get specific court details
 * @access  Public
 */
router.get('/:id', 
  asyncHandler(courtController.getCourtById)
);

/**
 * @route   POST /courts
 * @desc    Create new court
 * @access  Private (Club Owner)
 */
router.post('/', 
  authenticateToken,
  requireUserType(['club']),
  createCourtValidation,
  asyncHandler(courtController.createCourt)
);

/**
 * @route   PUT /courts/:id
 * @desc    Update court (club owner or admin)
 * @access  Private (Club Owner/Admin)
 */
router.put('/:id', 
  authenticateToken,
  updateCourtValidation,
  asyncHandler(courtController.updateCourt)
);

/**
 * @route   DELETE /courts/:id
 * @desc    Delete court (club owner or admin)
 * @access  Private (Club Owner/Admin)
 */
router.delete('/:id', 
  authenticateToken,
  asyncHandler(courtController.deleteCourt)
);

/**
 * @route   GET /courts/:id/availability
 * @desc    Get court availability
 * @access  Public
 */
router.get('/:id/availability', 
  asyncHandler(courtController.getCourtAvailability)
);

/**
 * @route   GET /courts/:id/bookings
 * @desc    Get court bookings
 * @access  Private (Court Owner/Admin)
 */
router.get('/:id/bookings', 
  authenticateToken,
  asyncHandler(courtController.getCourtBookings)
);

/**
 * @route   POST /courts/:id/book
 * @desc    Book court
 * @access  Private
 */
router.post('/:id/book', 
  authenticateToken,
  bookCourtValidation,
  asyncHandler(courtController.bookCourt)
);

/**
 * @route   GET /courts/:id/stats
 * @desc    Get court statistics
 * @access  Private (Court Owner/Admin)
 */
router.get('/:id/stats', 
  authenticateToken,
  asyncHandler(courtController.getCourtStats)
);

module.exports = router; 