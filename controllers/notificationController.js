/**
 * Notification Controller
 * 
 * This controller handles all notification-related operations including
 * notification management, sending, and notification-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Notification, User } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, NOTIFICATION_TYPES, PAGINATION } = require('../config/constants');
const { sendEmail } = require('../services/emailService');
const logger = require('../config/logger');

/**
 * Get user notifications
 * @route GET /api/v1/notifications
 * @access Private
 */
const getNotifications = async (req, res) => {
  try {
    const { user } = req;
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      type,
      unread_only = false
    } = req.query;

    // Build where clause
    const whereClause = { user_id: user.id };
    
    if (type) {
      whereClause.type = type;
    }
    
    if (unread_only === 'true') {
      whereClause.is_read = false;
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get notifications with pagination
    const { count, rows: notifications } = await Notification.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATIONS_RETRIEVED,
      data: {
        notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getNotifications:', error);
    throw createError.server('Failed to retrieve notifications');
  }
};

/**
 * Get specific notification by ID
 * @route GET /api/v1/notifications/:id
 * @access Private
 */
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw createError.notFound('Notification not found');
    }

    // Check if user owns this notification
    if (notification.user_id !== user.id) {
      throw createError.forbidden('Access denied');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATION_RETRIEVED,
      data: { notification }
    });
  } catch (error) {
    logger.error('Error in getNotificationById:', error);
    throw error;
  }
};

/**
 * Mark notification as read
 * @route PUT /api/v1/notifications/:id/read
 * @access Private
 */
const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw createError.notFound('Notification not found');
    }

    // Check if user owns this notification
    if (notification.user_id !== user.id) {
      throw createError.forbidden('Access denied');
    }

    // Mark as read
    await notification.markAsRead();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATION_MARKED_READ,
      data: { notification }
    });
  } catch (error) {
    logger.error('Error in markNotificationAsRead:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read
 * @route PUT /api/v1/notifications/read-all
 * @access Private
 */
const markAllNotificationsAsRead = async (req, res) => {
  try {
    const { user } = req;

    // Update all unread notifications for the user
    const result = await Notification.update(
      { 
        is_read: true,
        read_at: new Date()
      },
      {
        where: {
          user_id: user.id,
          is_read: false
        }
      }
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ALL_NOTIFICATIONS_MARKED_READ,
      data: { updated_count: result[0] }
    });
  } catch (error) {
    logger.error('Error in markAllNotificationsAsRead:', error);
    throw error;
  }
};

/**
 * Delete notification
 * @route DELETE /api/v1/notifications/:id
 * @access Private
 */
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw createError.notFound('Notification not found');
    }

    // Check if user owns this notification
    if (notification.user_id !== user.id) {
      throw createError.forbidden('Access denied');
    }

    // Soft delete notification
    await notification.destroy();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATION_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteNotification:', error);
    throw error;
  }
};

/**
 * Send notification
 * @route POST /api/v1/notifications/send
 * @access Private (Admin)
 */
const sendNotification = async (req, res) => {
  try {
    const { user } = req;
    const { user_ids, type, title, message, priority = 'normal', send_email = false } = req.body;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
      throw createError.badRequest('User IDs are required');
    }

    if (!type || !title || !message) {
      throw createError.badRequest('Type, title, and message are required');
    }

    const notifications = [];
    const emailPromises = [];

    // Create notifications for each user
    for (const userId of user_ids) {
      const notification = await Notification.create({
        user_id: userId,
        type,
        title,
        message,
        priority,
        metadata: {
          sent_by: user.id,
          sent_at: new Date()
        }
      });

      notifications.push(notification);

      // Send email if requested
      if (send_email) {
        const userData = await User.findByPk(userId);
        if (userData && userData.email) {
          const emailPromise = sendEmail({
            to: userData.email,
            subject: title,
            text: message,
            html: `<p>${message}</p>`
          }).catch(error => {
            logger.error(`Failed to send email to ${userData.email}:`, error);
          });

          emailPromises.push(emailPromise);
        }
      }
    }

    // Wait for all emails to be sent
    if (emailPromises.length > 0) {
      await Promise.all(emailPromises);
    }

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATIONS_SENT,
      data: {
        notifications_created: notifications.length,
        emails_sent: emailPromises.length
      }
    });
  } catch (error) {
    logger.error('Error in sendNotification:', error);
    throw error;
  }
};

/**
 * Get notification statistics
 * @route GET /api/v1/notifications/stats
 * @access Private
 */
const getNotificationStats = async (req, res) => {
  try {
    const { user } = req;

    // Get notification statistics for the user
    const totalNotifications = await Notification.count({
      where: { user_id: user.id }
    });

    const unreadNotifications = await Notification.count({
      where: {
        user_id: user.id,
        is_read: false
      }
    });

    const urgentNotifications = await Notification.count({
      where: {
        user_id: user.id,
        priority: 'urgent',
        is_read: false
      }
    });

    const stats = {
      total: totalNotifications,
      unread: unreadNotifications,
      urgent: urgentNotifications,
      read_rate: totalNotifications > 0 ? ((totalNotifications - unreadNotifications) / totalNotifications) * 100 : 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATION_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getNotificationStats:', error);
    throw error;
  }
};

/**
 * Get notification preferences
 * @route GET /api/v1/notifications/preferences
 * @access Private
 */
const getNotificationPreferences = async (req, res) => {
  try {
    const { user } = req;

    // TODO: Implement notification preferences
    // For now, return default preferences
    const preferences = {
      email_notifications: true,
      sms_notifications: false,
      push_notifications: true,
      tournament_updates: true,
      payment_notifications: true,
      membership_reminders: true,
      marketing_emails: false
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATION_PREFERENCES_RETRIEVED,
      data: { preferences }
    });
  } catch (error) {
    logger.error('Error in getNotificationPreferences:', error);
    throw error;
  }
};

/**
 * Update notification preferences
 * @route PUT /api/v1/notifications/preferences
 * @access Private
 */
const updateNotificationPreferences = async (req, res) => {
  try {
    const { user } = req;
    const preferences = req.body;

    // TODO: Implement notification preferences update
    // This would involve updating user settings or a separate preferences table

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NOTIFICATION_PREFERENCES_UPDATED,
      data: { preferences }
    });
  } catch (error) {
    logger.error('Error in updateNotificationPreferences:', error);
    throw error;
  }
};

/**
 * Send system notification
 * @route POST /api/v1/notifications/system
 * @access Private (Admin)
 */
const sendSystemNotification = async (req, res) => {
  try {
    const { user } = req;
    const { type, title, message, target_users = 'all' } = req.body;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    if (!type || !title || !message) {
      throw createError.badRequest('Type, title, and message are required');
    }

    let userQuery = {};
    
    // Build user query based on target_users
    if (target_users === 'all') {
      // Send to all users
    } else if (target_users === 'players') {
      userQuery.user_type = 'player';
    } else if (target_users === 'coaches') {
      userQuery.user_type = 'coach';
    } else if (target_users === 'clubs') {
      userQuery.user_type = 'club';
    }

    // Get target users
    const targetUserIds = await User.findAll({
      where: userQuery,
      attributes: ['id']
    });

    const userIds = targetUserIds.map(user => user.id);

    if (userIds.length === 0) {
      throw createError.badRequest('No users found for the specified criteria');
    }

    // Create notifications
    const notifications = [];
    for (const userId of userIds) {
      const notification = await Notification.create({
        user_id: userId,
        type,
        title,
        message,
        priority: 'normal',
        metadata: {
          sent_by: user.id,
          sent_at: new Date(),
          system_notification: true
        }
      });

      notifications.push(notification);
    }

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_NOTIFICATION_SENT,
      data: {
        notifications_created: notifications.length,
        target_users: userIds.length
      }
    });
  } catch (error) {
    logger.error('Error in sendSystemNotification:', error);
    throw error;
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  sendNotification,
  getNotificationStats,
  getNotificationPreferences,
  updateNotificationPreferences,
  sendSystemNotification
}; 