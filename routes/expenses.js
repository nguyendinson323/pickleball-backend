/**
 * Expenses Routes
 * 
 * This file defines all expense-related routes including
 * expense tracking, reporting, and expense-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');

// Import controllers and middleware
const { authenticateToken } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Import controller methods
const { 
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByTournament,
  getExpensesByClub
} = require('../controllers/expenseController');

// Validation schemas
const createExpenseValidation = [
  body('description').isLength({ min: 3, max: 255 }).withMessage('Description must be 3-255 characters'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').isIn(['tournament_expense', 'club_expense', 'court_maintenance', 'equipment', 'facility', 'other']).withMessage('Invalid expense category'),
  body('tournament_id').optional().isUUID().withMessage('Valid tournament ID is required'),
  body('club_id').optional().isUUID().withMessage('Valid club ID is required'),
  body('expense_date').optional().isISO8601().withMessage('Valid expense date is required'),
  body('receipt_url').optional().isURL().withMessage('Valid receipt URL is required'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

const updateExpenseValidation = [
  body('description').optional().isLength({ min: 3, max: 255 }).withMessage('Description must be 3-255 characters'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').optional().isIn(['tournament_expense', 'club_expense', 'court_maintenance', 'equipment', 'facility', 'other']).withMessage('Invalid expense category'),
  body('expense_date').optional().isISO8601().withMessage('Valid expense date is required'),
  body('receipt_url').optional().isURL().withMessage('Valid receipt URL is required'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

const expenseListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['tournament_expense', 'club_expense', 'court_maintenance', 'equipment', 'facility', 'other']).withMessage('Invalid expense category'),
  query('start_date').optional().isISO8601().withMessage('Valid start date is required'),
  query('end_date').optional().isISO8601().withMessage('Valid end date is required'),
  query('tournament_id').optional().isUUID().withMessage('Valid tournament ID is required'),
  query('club_id').optional().isUUID().withMessage('Valid club ID is required')
];

/**
 * @route   POST /expenses
 * @desc    Create a new expense
 * @access  Private
 */
router.post('/', 
  authenticateToken,
  createExpenseValidation,
  asyncHandler(createExpense)
);

/**
 * @route   GET /expenses
 * @desc    Get paginated list of expenses
 * @access  Private
 */
router.get('/', 
  authenticateToken,
  expenseListValidation,
  asyncHandler(getExpenses)
);

/**
 * @route   GET /expenses/:id
 * @desc    Get specific expense by ID
 * @access  Private
 */
router.get('/:id', 
  authenticateToken,
  asyncHandler(getExpenseById)
);

/**
 * @route   PUT /expenses/:id
 * @desc    Update expense
 * @access  Private
 */
router.put('/:id', 
  authenticateToken,
  updateExpenseValidation,
  asyncHandler(updateExpense)
);

/**
 * @route   DELETE /expenses/:id
 * @desc    Delete expense
 * @access  Private
 */
router.delete('/:id', 
  authenticateToken,
  asyncHandler(deleteExpense)
);

/**
 * @route   GET /expenses/tournament/:tournamentId
 * @desc    Get expenses for a specific tournament
 * @access  Private
 */
router.get('/tournament/:tournamentId', 
  authenticateToken,
  asyncHandler(getExpensesByTournament)
);

/**
 * @route   GET /expenses/club/:clubId
 * @desc    Get expenses for a specific club
 * @access  Private
 */
router.get('/club/:clubId', 
  authenticateToken,
  asyncHandler(getExpensesByClub)
);

module.exports = router;