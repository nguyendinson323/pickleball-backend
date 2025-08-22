/**
 * Admin Messages Routes
 * 
 * This file defines all routes for admin broadcast messaging functionality
 * including CRUD operations, sending, analytics, and recipient management.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');

// Import controllers and middleware
const adminMessageController = require('../controllers/adminMessageController');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validation schemas
const createMessageValidation = [
  body('title')
    .notEmpty()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title is required and must be 1-255 characters'),
    
  body('content')
    .notEmpty()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content is required and must be 1-10000 characters'),
    
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt must be max 500 characters'),
    
  body('message_type')
    .optional()
    .isIn(['announcement', 'notification', 'alert', 'reminder', 'newsletter'])
    .withMessage('Invalid message type'),
    
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority level'),
    
  body('target_audience')
    .isIn([
      'all_users', 'players', 'coaches', 'clubs', 'partners', 'states',
      'players_coaches', 'business_users', 'specific_users', 'by_location', 'by_membership'
    ])
    .withMessage('Invalid target audience'),
    
  body('target_filters')
    .optional()
    .isObject()
    .withMessage('Target filters must be an object'),
    
  body('scheduled_send_at')
    .optional()
    .isISO8601()
    .withMessage('Scheduled send time must be a valid date'),
    
  body('expires_at')
    .optional()
    .isISO8601()
    .withMessage('Expiry time must be a valid date'),
    
  body('is_pinned')
    .optional()
    .isBoolean()
    .withMessage('is_pinned must be a boolean'),
    
  body('send_via_email')
    .optional()
    .isBoolean()
    .withMessage('send_via_email must be a boolean'),
    
  body('send_via_notification')
    .optional()
    .isBoolean()
    .withMessage('send_via_notification must be a boolean'),
    
  body('action_button_text')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Action button text must be max 100 characters'),
    
  body('action_button_url')
    .optional()
    .isURL()
    .withMessage('Action button URL must be a valid URL'),
    
  body('attachments')
    .optional()
    .isArray()
    .withMessage('Attachments must be an array'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

const updateMessageValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid message ID'),
    
  ...createMessageValidation.filter(validation => 
    !validation.toString().includes('notEmpty') // Make fields optional for updates
  )
];

const messageIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid message ID')
];

const getMessagesValidation = [
  query('status')
    .optional()
    .isIn(['draft', 'scheduled', 'sending', 'sent', 'cancelled'])
    .withMessage('Invalid status filter'),
    
  query('target_audience')
    .optional()
    .isIn([
      'all_users', 'players', 'coaches', 'clubs', 'partners', 'states',
      'players_coaches', 'business_users', 'specific_users', 'by_location', 'by_membership'
    ])
    .withMessage('Invalid target audience filter'),
    
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority filter'),
    
  query('message_type')
    .optional()
    .isIn(['announcement', 'notification', 'alert', 'reminder', 'newsletter'])
    .withMessage('Invalid message type filter'),
    
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const previewRecipientsValidation = [
  body('target_audience')
    .isIn([
      'all_users', 'players', 'coaches', 'clubs', 'partners', 'states',
      'players_coaches', 'business_users', 'specific_users', 'by_location', 'by_membership'
    ])
    .withMessage('Invalid target audience'),
    
  body('target_filters')
    .optional()
    .isObject()
    .withMessage('Target filters must be an object'),
    
  body('target_filters.user_ids')
    .if(body('target_audience').equals('specific_users'))
    .isArray()
    .withMessage('user_ids is required for specific_users targeting'),
    
  body('target_filters.states')
    .if(body('target_audience').equals('by_location'))
    .optional()
    .isArray()
    .withMessage('states must be an array for location targeting'),
    
  body('target_filters.cities')
    .if(body('target_audience').equals('by_location'))
    .optional()
    .isArray()
    .withMessage('cities must be an array for location targeting'),
    
  body('target_filters.membership_levels')
    .if(body('target_audience').equals('by_membership'))
    .isArray()
    .withMessage('membership_levels is required for membership targeting')
];

const sendMessageValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid message ID'),
    
  body('send_immediately')
    .optional()
    .isBoolean()
    .withMessage('send_immediately must be a boolean')
];

// Apply authentication and admin authorization to all routes
router.use(authenticateToken);
router.use(requireAdmin);

// Routes

/**
 * @route   POST /api/v1/admin/messages
 * @desc    Create a new admin message (draft)
 * @access  Private (Admin)
 */
router.post(
  '/',
  createMessageValidation,
  asyncHandler(adminMessageController.createMessage)
);

/**
 * @route   GET /api/v1/admin/messages
 * @desc    Get all admin messages with filtering and pagination
 * @access  Private (Admin)
 */
router.get(
  '/',
  getMessagesValidation,
  asyncHandler(adminMessageController.getMessages)
);

/**
 * @route   GET /api/v1/admin/messages/:id
 * @desc    Get single admin message by ID
 * @access  Private (Admin)
 */
router.get(
  '/:id',
  messageIdValidation,
  asyncHandler(adminMessageController.getMessageById)
);

/**
 * @route   PUT /api/v1/admin/messages/:id
 * @desc    Update admin message (only if draft/scheduled)
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  updateMessageValidation,
  asyncHandler(adminMessageController.updateMessage)
);

/**
 * @route   DELETE /api/v1/admin/messages/:id
 * @desc    Delete admin message (only if draft/scheduled)
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  messageIdValidation,
  asyncHandler(adminMessageController.deleteMessage)
);

/**
 * @route   POST /api/v1/admin/messages/preview-recipients
 * @desc    Preview recipients for targeting criteria
 * @access  Private (Admin)
 */
router.post(
  '/preview-recipients',
  previewRecipientsValidation,
  asyncHandler(adminMessageController.previewRecipients)
);

/**
 * @route   POST /api/v1/admin/messages/:id/send
 * @desc    Send admin message immediately or schedule it
 * @access  Private (Admin)
 */
router.post(
  '/:id/send',
  sendMessageValidation,
  asyncHandler(adminMessageController.sendMessage)
);

/**
 * @route   GET /api/v1/admin/messages/:id/analytics
 * @desc    Get message analytics and statistics
 * @access  Private (Admin)
 */
router.get(
  '/:id/analytics',
  messageIdValidation,
  asyncHandler(adminMessageController.getMessageAnalytics)
);

/**
 * @route   POST /api/v1/admin/messages/process-scheduled
 * @desc    Process scheduled messages (for cron job)
 * @access  Private (Admin/System)
 */
router.post(
  '/process-scheduled',
  asyncHandler(adminMessageController.processScheduledMessages)
);

// Additional utility routes

/**
 * @route   GET /api/v1/admin/messages/stats/overview
 * @desc    Get messaging overview statistics
 * @access  Private (Admin)
 */
router.get('/stats/overview', asyncHandler(async (req, res) => {
  try {
    const { AdminMessage } = require('../db/models/AdminMessage');
    const { sequelize } = require('../config/database');
    
    // Get message counts by status
    const messageStats = await AdminMessage.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentActivity = await AdminMessage.findAll({
      where: {
        created_at: { [require('sequelize').Op.gte]: thirtyDaysAgo }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: [sequelize.fn('DATE', sequelize.col('created_at'))],
      order: [[sequelize.fn('DATE', sequelize.col('created_at')), 'DESC']],
      raw: true
    });

    // Get top performing messages (by read rate)
    const topMessages = await AdminMessage.findAll({
      where: {
        status: 'sent',
        sent_count: { [require('sequelize').Op.gt]: 0 }
      },
      attributes: [
        'id', 'title', 'sent_count', 'read_count',
        [sequelize.literal('ROUND(read_count::DECIMAL / sent_count * 100, 1)'), 'read_rate']
      ],
      order: [[sequelize.literal('read_count::DECIMAL / sent_count'), 'DESC']],
      limit: 10,
      raw: true
    });

    const stats = {
      message_counts: messageStats.reduce((acc, item) => {
        acc[item.status] = parseInt(item.count);
        return acc;
      }, {}),
      recent_activity: recentActivity,
      top_performing_messages: topMessages,
      total_messages: messageStats.reduce((sum, item) => sum + parseInt(item.count), 0)
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    throw error;
  }
}));

/**
 * @route   GET /api/v1/admin/messages/templates
 * @desc    Get message templates for common scenarios
 * @access  Private (Admin)
 */
router.get('/templates', asyncHandler(async (req, res) => {
  const templates = [
    {
      id: 'tournament_announcement',
      name: 'Tournament Announcement',
      title: '🏆 New Tournament: [Tournament Name]',
      content: 'We\'re excited to announce our upcoming tournament! Register now to secure your spot.\n\n📅 Date: [Date]\n📍 Location: [Location]\n💰 Entry Fee: [Fee]\n\nRegistration deadline: [Deadline]',
      message_type: 'announcement',
      priority: 'high',
      target_audience: 'players_coaches',
      action_button_text: 'Register Now',
      tags: ['tournament', 'registration']
    },
    {
      id: 'maintenance_notice',
      name: 'Maintenance Notice',
      title: '⚠️ Scheduled Maintenance: [Facility Name]',
      content: 'Please be advised that [Facility Name] will be undergoing maintenance.\n\n🔧 Maintenance Period: [Start Date] - [End Date]\n📋 Work Description: [Description]\n\nWe apologize for any inconvenience.',
      message_type: 'alert',
      priority: 'medium',
      target_audience: 'all_users',
      tags: ['maintenance', 'facility']
    },
    {
      id: 'membership_renewal',
      name: 'Membership Renewal Reminder',
      title: '📋 Membership Renewal Reminder',
      content: 'Your federation membership will expire soon. Renew now to continue enjoying all benefits.\n\n⏰ Expires: [Expiry Date]\n💳 Renewal Fee: [Fee]\n\nRenew today to avoid service interruption.',
      message_type: 'reminder',
      priority: 'high',
      target_audience: 'by_membership',
      action_button_text: 'Renew Now',
      tags: ['membership', 'renewal']
    },
    {
      id: 'new_feature',
      name: 'New Feature Announcement',
      title: '🎉 New Feature: [Feature Name]',
      content: 'We\'re excited to introduce a new feature to enhance your experience!\n\n✨ What\'s New: [Description]\n🚀 Benefits: [Benefits]\n\nTry it out today and let us know what you think!',
      message_type: 'announcement',
      priority: 'medium',
      target_audience: 'all_users',
      action_button_text: 'Learn More',
      tags: ['feature', 'announcement']
    },
    {
      id: 'safety_update',
      name: 'Safety Guidelines Update',
      title: '🛡️ Updated Safety Guidelines',
      content: 'We\'ve updated our safety guidelines to ensure everyone\'s wellbeing.\n\n📋 Key Changes:\n• [Change 1]\n• [Change 2]\n• [Change 3]\n\nPlease review the full guidelines.',
      message_type: 'alert',
      priority: 'high',
      target_audience: 'all_users',
      action_button_text: 'View Guidelines',
      tags: ['safety', 'guidelines']
    }
  ];

  res.status(200).json({
    success: true,
    data: { templates }
  });
}));

module.exports = router;