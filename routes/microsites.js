/**
 * Microsite Management Routes
 * 
 * This file defines all routes for admin microsite supervision functionality
 * including content moderation, status management, and deactivation capabilities.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');

// Import controllers and middleware
const micrositeController = require('../controllers/micrositeController');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const getMicrositesValidation = [
  query('type')
    .optional()
    .isIn(['all', 'state', 'club', 'partner'])
    .withMessage('Invalid type filter'),
    
  query('status')
    .optional()
    .isIn(['all', 'active', 'inactive', 'pending', 'maintenance', 'suspended'])
    .withMessage('Invalid status filter'),
    
  query('has_content_issues')
    .optional()
    .isBoolean()
    .withMessage('has_content_issues must be a boolean'),
    
  query('needs_review')
    .optional()
    .isBoolean()
    .withMessage('needs_review must be a boolean'),
    
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be 1-100 characters')
];

const micrositeIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid microsite ID')
];

const updateStatusValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid microsite ID'),
    
  body('status')
    .isIn(['active', 'inactive', 'pending', 'maintenance', 'suspended'])
    .withMessage('Invalid status'),
    
  body('reason')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Reason must be 1-500 characters')
];

const addModerationFlagValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid microsite ID'),
    
  body('flag_type')
    .isIn(['inappropriate_content', 'spam', 'false_information', 'copyright_violation', 'terms_violation', 'other'])
    .withMessage('Invalid flag type'),
    
  body('description')
    .notEmpty()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description is required and must be 1-1000 characters'),
    
  body('severity')
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Invalid severity level'),
    
  body('auto_action')
    .optional()
    .isBoolean()
    .withMessage('auto_action must be a boolean')
];

const removeModerationFlagValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid microsite ID'),
    
  param('flagId')
    .notEmpty()
    .withMessage('Flag ID is required'),
    
  body('resolution_note')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Resolution note must be max 1000 characters')
];

const bulkActionValidation = [
  body('action')
    .isIn(['activate', 'deactivate', 'suspend', 'maintenance'])
    .withMessage('Invalid bulk action'),
    
  body('microsite_ids')
    .isArray({ min: 1 })
    .withMessage('microsite_ids must be a non-empty array'),
    
  body('microsite_ids.*')
    .isUUID()
    .withMessage('All microsite IDs must be valid UUIDs'),
    
  body('reason')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Reason must be 1-500 characters')
];

// Apply authentication and admin authorization to all routes
router.use(authenticateToken);
router.use(requireAdmin);

// Routes

/**
 * @route   GET /api/v1/admin/microsites
 * @desc    Get all microsites with filtering and pagination
 * @access  Private (Admin)
 */
router.get(
  '/',
  getMicrositesValidation,
  asyncHandler(micrositeController.getAllMicrosites)
);

/**
 * @route   GET /api/v1/admin/microsites/analytics
 * @desc    Get microsite analytics and statistics
 * @access  Private (Admin)
 */
router.get(
  '/analytics',
  asyncHandler(micrositeController.getMicrositeAnalytics)
);

/**
 * @route   GET /api/v1/admin/microsites/:id
 * @desc    Get single microsite details
 * @access  Private (Admin)
 */
router.get(
  '/:id',
  micrositeIdValidation,
  asyncHandler(micrositeController.getMicrositeById)
);

/**
 * @route   PUT /api/v1/admin/microsites/:id/status
 * @desc    Update microsite status (activate/deactivate/maintenance/suspend)
 * @access  Private (Admin)
 */
router.put(
  '/:id/status',
  updateStatusValidation,
  asyncHandler(micrositeController.updateMicrositeStatus)
);

/**
 * @route   POST /api/v1/admin/microsites/:id/moderation
 * @desc    Add content moderation flag to microsite
 * @access  Private (Admin)
 */
router.post(
  '/:id/moderation',
  addModerationFlagValidation,
  asyncHandler(micrositeController.addModerationFlag)
);

/**
 * @route   DELETE /api/v1/admin/microsites/:id/moderation/:flagId
 * @desc    Remove/resolve content moderation flag
 * @access  Private (Admin)
 */
router.delete(
  '/:id/moderation/:flagId',
  removeModerationFlagValidation,
  asyncHandler(micrositeController.removeModerationFlag)
);

/**
 * @route   POST /api/v1/admin/microsites/bulk-action
 * @desc    Perform bulk actions on multiple microsites
 * @access  Private (Admin)
 */
router.post(
  '/bulk-action',
  bulkActionValidation,
  asyncHandler(micrositeController.bulkMicrositeAction)
);

module.exports = router;