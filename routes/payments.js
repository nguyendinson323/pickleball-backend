/**
 * Payments Routes
 * 
 * This file defines all payment-related routes including
 * payment processing, management, and payment-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const paymentController = require('../controllers/paymentController');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const paymentListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('payment_type').optional().isIn(['membership_fee', 'tournament_registration', 'court_rental', 'equipment_purchase', 'donation', 'subscription_upgrade', 'other']).withMessage('Invalid payment type'),
  query('status').optional().isIn(['pending', 'completed', 'failed', 'refunded', 'cancelled']).withMessage('Invalid payment status'),
  query('user_id').optional().isUUID().withMessage('Invalid user ID'),
  query('start_date').optional().isISO8601().withMessage('Valid start date is required'),
  query('end_date').optional().isISO8601().withMessage('Valid end date is required')
];

const createPaymentValidation = [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
  body('payment_type').isIn(['membership_fee', 'tournament_registration', 'court_rental', 'equipment_purchase', 'donation', 'subscription_upgrade', 'other']).withMessage('Invalid payment type'),
  body('payment_method').isIn(['stripe', 'paypal', 'bank_transfer', 'cash', 'check', 'other']).withMessage('Invalid payment method'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('club_id').optional().isUUID().withMessage('Invalid club ID'),
  body('tournament_id').optional().isUUID().withMessage('Invalid tournament ID')
];

const processPaymentValidation = [
  body('payment_method_id').notEmpty().withMessage('Payment method ID is required'),
  body('billing_address').optional().isObject().withMessage('Billing address must be an object')
];

const refundPaymentValidation = [
  body('refund_amount').optional().isFloat({ min: 0.01 }).withMessage('Refund amount must be a positive number'),
  body('refund_reason').optional().isString().withMessage('Refund reason must be a string')
];

/**
 * @route   GET /payments
 * @desc    Get paginated list of payments
 * @access  Private (User/Admin)
 */
router.get('/', 
  authenticateToken,
  paymentListValidation,
  asyncHandler(paymentController.getPayments)
);

/**
 * @route   GET /payments/stats
 * @desc    Get payment statistics
 * @access  Private (Admin)
 */
router.get('/stats', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(paymentController.getPaymentStats)
);

/**
 * @route   GET /payments/user/:userId
 * @desc    Get user payment history
 * @access  Private (User/Admin)
 */
router.get('/user/:userId', 
  authenticateToken,
  asyncHandler(paymentController.getUserPaymentHistory)
);

/**
 * @route   GET /payments/:id
 * @desc    Get specific payment details
 * @access  Private (User/Admin)
 */
router.get('/:id', 
  authenticateToken,
  asyncHandler(paymentController.getPaymentById)
);

/**
 * @route   POST /payments
 * @desc    Create new payment
 * @access  Private
 */
router.post('/', 
  authenticateToken,
  createPaymentValidation,
  asyncHandler(paymentController.createPayment)
);

/**
 * @route   POST /payments/:id/process
 * @desc    Process payment with Stripe
 * @access  Private
 */
router.post('/:id/process', 
  authenticateToken,
  processPaymentValidation,
  asyncHandler(paymentController.processPayment)
);

/**
 * @route   POST /payments/:id/refund
 * @desc    Refund payment
 * @access  Private (Admin)
 */
router.post('/:id/refund', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  refundPaymentValidation,
  asyncHandler(paymentController.refundPayment)
);

/**
 * @route   POST /payments/webhook/stripe
 * @desc    Stripe webhook endpoint
 * @access  Public
 */
router.post('/webhook/stripe', 
  asyncHandler(paymentController.stripeWebhook)
);

module.exports = router; 