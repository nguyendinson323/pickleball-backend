/**
 * Admin Routes
 * 
 * This file defines all admin-related routes including
 * admin management, system administration, and admin-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const adminController = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const systemUsersValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('user_type').optional().isIn(['player', 'coach', 'club', 'partner', 'state', 'federation']).withMessage('Invalid user type'),
  query('role').optional().isIn(['user', 'moderator', 'admin', 'super_admin']).withMessage('Invalid role'),
  query('membership_status').optional().isIn(['active', 'expired', 'suspended', 'cancelled', 'pending']).withMessage('Invalid membership status'),
  query('search').optional().isString().withMessage('Search must be a string')
];

const updateUserRoleValidation = [
  body('role').isIn(['user', 'moderator', 'admin', 'super_admin']).withMessage('Valid role is required')
];

const updateUserMembershipValidation = [
  body('membership_status').isIn(['active', 'expired', 'suspended', 'cancelled', 'pending']).withMessage('Valid membership status is required')
];

const systemSettingsValidation = [
  body('federation_name').optional().isString().withMessage('Federation name must be a string'),
  body('federation_email').optional().isEmail().withMessage('Valid federation email is required'),
  body('membership_fees').optional().isObject().withMessage('Membership fees must be an object'),
  body('tournament_fees').optional().isObject().withMessage('Tournament fees must be an object'),
  body('system_maintenance').optional().isBoolean().withMessage('System maintenance must be a boolean'),
  body('registration_enabled').optional().isBoolean().withMessage('Registration enabled must be a boolean')
];

const systemMaintenanceValidation = [
  body('maintenance_type').isIn(['cleanup', 'optimization', 'backup', 'migration']).withMessage('Valid maintenance type is required')
];

/**
 * @route   GET /admin/dashboard
 * @desc    Get dashboard statistics
 * @access  Private (Admin)
 */
router.get('/dashboard', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(adminController.getDashboardStats)
);

/**
 * @route   GET /admin/users
 * @desc    Get system users (admin view)
 * @access  Private (Admin)
 */
router.get('/users', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  systemUsersValidation,
  asyncHandler(adminController.getSystemUsers)
);

/**
 * @route   PUT /admin/users/:id/role
 * @desc    Update user role
 * @access  Private (Super Admin)
 */
router.put('/users/:id/role', 
  authenticateToken,
  requireRole(['super_admin']),
  updateUserRoleValidation,
  asyncHandler(adminController.updateUserRole)
);

/**
 * @route   PUT /admin/users/:id/membership
 * @desc    Update user membership status
 * @access  Private (Admin)
 */
router.put('/users/:id/membership', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  updateUserMembershipValidation,
  asyncHandler(adminController.updateUserMembership)
);

/**
 * @route   GET /admin/logs
 * @desc    Get system logs
 * @access  Private (Admin)
 */
router.get('/logs', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(adminController.getSystemLogs)
);

/**
 * @route   GET /admin/health
 * @desc    Get system health
 * @access  Private (Admin)
 */
router.get('/health', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(adminController.getSystemHealth)
);

/**
 * @route   GET /admin/settings
 * @desc    Get system settings
 * @access  Private (Admin)
 */
router.get('/settings', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(adminController.getSystemSettings)
);

/**
 * @route   PUT /admin/settings
 * @desc    Update system settings
 * @access  Private (Super Admin)
 */
router.put('/settings', 
  authenticateToken,
  requireRole(['super_admin']),
  systemSettingsValidation,
  asyncHandler(adminController.updateSystemSettings)
);

/**
 * @route   GET /admin/activity
 * @desc    Get admin activity log
 * @access  Private (Admin)
 */
router.get('/activity', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(adminController.getAdminActivity)
);

/**
 * @route   GET /admin/export
 * @desc    Export system data
 * @access  Private (Admin)
 */
router.get('/export', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  asyncHandler(adminController.exportSystemData)
);

/**
 * @route   POST /admin/maintenance
 * @desc    Perform system maintenance
 * @access  Private (Super Admin)
 */
router.post('/maintenance', 
  authenticateToken,
  requireRole(['super_admin']),
  systemMaintenanceValidation,
  asyncHandler(adminController.performSystemMaintenance)
);

module.exports = router; 