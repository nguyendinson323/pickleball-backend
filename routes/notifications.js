/**
 * Notifications Routes
 * 
 * This file defines all notification-related routes including
 * notification management, sending, and notification-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');

// Import controllers and middleware
const notificationController = require('../controllers/notificationController');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const notificationListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('type').optional().isString().withMessage('Type must be a string'),
  query('unread_only').optional().isBoolean().withMessage('unread_only must be a boolean')
];

const sendNotificationValidation = [
  body('user_ids').isArray().withMessage('User IDs must be an array'),
  body('user_ids.*').isUUID().withMessage('Valid user ID is required'),
  body('type').isString().withMessage('Type is required'),
  body('title').isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('message').isLength({ min: 1 }).withMessage('Message is required'),
  body('priority').optional().isIn(['low', 'normal', 'high', 'urgent']).withMessage('Invalid priority'),
  body('send_email').optional().isBoolean().withMessage('send_email must be a boolean')
];

const systemNotificationValidation = [
  body('type').isString().withMessage('Type is required'),
  body('title').isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('message').isLength({ min: 1 }).withMessage('Message is required'),
  body('target_users').optional().isIn(['all', 'players', 'coaches', 'clubs']).withMessage('Invalid target users')
];

const updatePreferencesValidation = [
  body('email_notifications').optional().isBoolean().withMessage('email_notifications must be a boolean'),
  body('sms_notifications').optional().isBoolean().withMessage('sms_notifications must be a boolean'),
  body('push_notifications').optional().isBoolean().withMessage('push_notifications must be a boolean'),
  body('tournament_updates').optional().isBoolean().withMessage('tournament_updates must be a boolean'),
  body('payment_notifications').optional().isBoolean().withMessage('payment_notifications must be a boolean'),
  body('membership_reminders').optional().isBoolean().withMessage('membership_reminders must be a boolean'),
  body('marketing_emails').optional().isBoolean().withMessage('marketing_emails must be a boolean')
];

/**
 * @route   GET /notifications
 * @desc    Get user notifications
 * @access  Private
 */
router.get('/', 
  authenticateToken,
  notificationListValidation,
  asyncHandler(notificationController.getNotifications)
);

/**
 * @route   GET /notifications/stats
 * @desc    Get notification statistics
 * @access  Private
 */
router.get('/stats', 
  authenticateToken,
  asyncHandler(notificationController.getNotificationStats)
);

/**
 * @route   GET /notifications/preferences
 * @desc    Get notification preferences
 * @access  Private
 */
router.get('/preferences', 
  authenticateToken,
  asyncHandler(notificationController.getNotificationPreferences)
);

/**
 * @route   PUT /notifications/preferences
 * @desc    Update notification preferences
 * @access  Private
 */
router.put('/preferences', 
  authenticateToken,
  updatePreferencesValidation,
  asyncHandler(notificationController.updateNotificationPreferences)
);

/**
 * @route   GET /notifications/:id
 * @desc    Get specific notification
 * @access  Private
 */
router.get('/:id', 
  authenticateToken,
  asyncHandler(notificationController.getNotificationById)
);

/**
 * @route   PUT /notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put('/:id/read', 
  authenticateToken,
  asyncHandler(notificationController.markNotificationAsRead)
);

/**
 * @route   PUT /notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.put('/read-all', 
  authenticateToken,
  asyncHandler(notificationController.markAllNotificationsAsRead)
);

/**
 * @route   DELETE /notifications/:id
 * @desc    Delete notification
 * @access  Private
 */
router.delete('/:id', 
  authenticateToken,
  asyncHandler(notificationController.deleteNotification)
);

/**
 * @route   POST /notifications/send
 * @desc    Send notification
 * @access  Private (Admin)
 */
router.post('/send', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  sendNotificationValidation,
  asyncHandler(notificationController.sendNotification)
);

/**
 * @route   POST /notifications/system
 * @desc    Send system notification
 * @access  Private (Admin)
 */
router.post('/system', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  systemNotificationValidation,
  asyncHandler(notificationController.sendSystemNotification)
);

module.exports = router; 