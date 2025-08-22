/**
 * Admin Message Controller
 * 
 * This controller handles admin broadcast messaging functionality including
 * creating, sending, and managing announcements to different user groups.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { AdminMessage, AdminMessageRecipient } = require('../db/models/AdminMessage');
const { User } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, USER_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');
const { Op } = require('sequelize');
const { sendEmail } = require('../services/emailService');

/**
 * Create a new admin message (draft)
 * @route POST /api/v1/admin/messages
 * @access Private (Admin)
 */
const createMessage = async (req, res) => {
  try {
    const { user } = req;
    
    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const {
      title,
      content,
      excerpt,
      message_type = 'announcement',
      priority = 'medium',
      target_audience = 'all_users',
      target_filters = {},
      scheduled_send_at,
      expires_at,
      is_pinned = false,
      send_via_email = false,
      send_via_notification = true,
      action_button_text,
      action_button_url,
      attachments = [],
      tags = []
    } = req.body;

    // Validate required fields
    if (!title || !content) {
      throw createError.validation('Title and content are required');
    }

    // Create message as draft
    const message = await AdminMessage.create({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200),
      message_type,
      priority,
      status: 'draft',
      sender_id: user.id,
      sender_name: user.full_name || user.username,
      target_audience,
      target_filters,
      scheduled_send_at: scheduled_send_at ? new Date(scheduled_send_at) : null,
      expires_at: expires_at ? new Date(expires_at) : null,
      is_pinned,
      send_via_email,
      send_via_notification,
      action_button_text,
      action_button_url,
      attachments,
      metadata: {
        created_by_admin: user.username,
        created_at_timestamp: new Date().toISOString()
      },
      tags
    });

    logger.info(`Admin message created: ${message.id} by ${user.username}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Admin message created successfully',
      data: { message }
    });
  } catch (error) {
    logger.error('Error in createMessage:', error);
    throw error;
  }
};

/**
 * Get all admin messages with filtering
 * @route GET /api/v1/admin/messages
 * @access Private (Admin)
 */
const getMessages = async (req, res) => {
  try {
    const { user } = req;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const {
      status,
      target_audience,
      priority,
      message_type,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Apply filters
    if (status) where.status = status;
    if (target_audience) where.target_audience = target_audience;
    if (priority) where.priority = priority;
    if (message_type) where.message_type = message_type;

    const { count, rows: messages } = await AdminMessage.findAndCountAll({
      where,
      order: [
        ['created_at', 'DESC']
      ],
      limit: parseInt(limit),
      offset,
      include: [{
        model: AdminMessageRecipient,
        as: 'recipients',
        attributes: ['delivery_status'],
        separate: true
      }]
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        messages,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Error in getMessages:', error);
    throw error;
  }
};

/**
 * Get single admin message by ID
 * @route GET /api/v1/admin/messages/:id
 * @access Private (Admin)
 */
const getMessageById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const message = await AdminMessage.findByPk(id, {
      include: [{
        model: AdminMessageRecipient,
        as: 'recipients',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'full_name', 'username', 'email', 'user_type']
        }]
      }]
    });

    if (!message) {
      throw createError.notFound('Message not found');
    }

    // Get message statistics
    const stats = await AdminMessage.getMessageStats(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { message, stats }
    });
  } catch (error) {
    logger.error('Error in getMessageById:', error);
    throw error;
  }
};

/**
 * Update admin message
 * @route PUT /api/v1/admin/messages/:id
 * @access Private (Admin)
 */
const updateMessage = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const message = await AdminMessage.findByPk(id);
    if (!message) {
      throw createError.notFound('Message not found');
    }

    // Check if message can be edited
    if (!message.canBeEdited()) {
      throw createError.conflict('Message cannot be edited in its current status');
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.sender_id;
    delete updateData.status; // Status changes handled by separate endpoints

    await message.update(updateData);

    logger.info(`Admin message updated: ${message.id} by ${user.username}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Message updated successfully',
      data: { message }
    });
  } catch (error) {
    logger.error('Error in updateMessage:', error);
    throw error;
  }
};

/**
 * Delete admin message
 * @route DELETE /api/v1/admin/messages/:id
 * @access Private (Admin)
 */
const deleteMessage = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const message = await AdminMessage.findByPk(id);
    if (!message) {
      throw createError.notFound('Message not found');
    }

    // Check if message can be deleted
    if (!message.canBeDeleted()) {
      throw createError.conflict('Message cannot be deleted in its current status');
    }

    await message.destroy();

    logger.info(`Admin message deleted: ${id} by ${user.username}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    logger.error('Error in deleteMessage:', error);
    throw error;
  }
};

/**
 * Get recipients for a message based on targeting criteria
 * @route POST /api/v1/admin/messages/preview-recipients
 * @access Private (Admin)
 */
const previewRecipients = async (req, res) => {
  try {
    const { user } = req;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const { target_audience, target_filters = {} } = req.body;
    
    const recipients = await getRecipientUsers(target_audience, target_filters);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        total_recipients: recipients.length,
        recipients: recipients.slice(0, 100), // Limit preview to first 100
        breakdown: getRecipientBreakdown(recipients)
      }
    });
  } catch (error) {
    logger.error('Error in previewRecipients:', error);
    throw error;
  }
};

/**
 * Send admin message immediately or schedule it
 * @route POST /api/v1/admin/messages/:id/send
 * @access Private (Admin)
 */
const sendMessage = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { send_immediately = true } = req.body;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const message = await AdminMessage.findByPk(id);
    if (!message) {
      throw createError.notFound('Message not found');
    }

    // Check if message can be sent
    if (!message.canBeSent()) {
      throw createError.conflict('Message cannot be sent in its current status');
    }

    if (send_immediately) {
      await processMessageSending(message);
      logger.info(`Admin message sent immediately: ${id} by ${user.username}`);
    } else {
      await message.update({ 
        status: 'scheduled',
        scheduled_send_at: message.scheduled_send_at || new Date()
      });
      logger.info(`Admin message scheduled: ${id} by ${user.username}`);
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: send_immediately ? 'Message sent successfully' : 'Message scheduled successfully',
      data: { message }
    });
  } catch (error) {
    logger.error('Error in sendMessage:', error);
    throw error;
  }
};

/**
 * Get message analytics/statistics
 * @route GET /api/v1/admin/messages/:id/analytics
 * @access Private (Admin)
 */
const getMessageAnalytics = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const stats = await AdminMessage.getMessageStats(id);
    if (!stats) {
      throw createError.notFound('Message not found');
    }

    // Get recipient analytics by user type
    const recipientAnalytics = await AdminMessageRecipient.findAll({
      where: { admin_message_id: id },
      attributes: [
        'recipient_type',
        'delivery_status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['recipient_type', 'delivery_status'],
      raw: true
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        ...stats,
        recipient_analytics: recipientAnalytics
      }
    });
  } catch (error) {
    logger.error('Error in getMessageAnalytics:', error);
    throw error;
  }
};

/**
 * Process scheduled messages (called by cron job)
 * @route POST /api/v1/admin/messages/process-scheduled
 * @access Private (Admin/System)
 */
const processScheduledMessages = async (req, res) => {
  try {
    const scheduledMessages = await AdminMessage.getScheduledMessages();
    
    let processedCount = 0;
    
    for (const message of scheduledMessages) {
      try {
        await processMessageSending(message);
        processedCount++;
      } catch (error) {
        logger.error(`Failed to process scheduled message ${message.id}:`, error);
      }
    }

    logger.info(`Processed ${processedCount} scheduled messages`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Processed ${processedCount} scheduled messages`
    });
  } catch (error) {
    logger.error('Error in processScheduledMessages:', error);
    throw error;
  }
};

// Helper Functions

/**
 * Get users based on targeting criteria
 */
async function getRecipientUsers(target_audience, target_filters = {}) {
  let whereClause = {
    is_active: true,
    email_verified: true
  };

  switch (target_audience) {
    case 'all_users':
      // No additional filtering
      break;
      
    case 'players':
      whereClause.user_type = 'player';
      break;
      
    case 'coaches':
      whereClause.user_type = 'coach';
      break;
      
    case 'clubs':
      whereClause.user_type = 'club';
      break;
      
    case 'partners':
      whereClause.user_type = 'partner';
      break;
      
    case 'states':
      whereClause.user_type = 'state';
      break;
      
    case 'players_coaches':
      whereClause.user_type = { [Op.in]: ['player', 'coach'] };
      break;
      
    case 'business_users':
      whereClause.user_type = { [Op.in]: ['club', 'partner', 'state'] };
      break;
      
    case 'specific_users':
      if (target_filters.user_ids && target_filters.user_ids.length > 0) {
        whereClause.id = { [Op.in]: target_filters.user_ids };
      }
      break;
      
    case 'by_location':
      const locationFilters = [];
      if (target_filters.states && target_filters.states.length > 0) {
        locationFilters.push({ state: { [Op.in]: target_filters.states } });
      }
      if (target_filters.cities && target_filters.cities.length > 0) {
        locationFilters.push({ city: { [Op.in]: target_filters.cities } });
      }
      if (locationFilters.length > 0) {
        whereClause[Op.or] = locationFilters;
      }
      break;
      
    case 'by_membership':
      if (target_filters.membership_levels && target_filters.membership_levels.length > 0) {
        whereClause.membership_status = { [Op.in]: target_filters.membership_levels };
      }
      break;
  }

  return await User.findAll({
    where: whereClause,
    attributes: ['id', 'username', 'full_name', 'email', 'user_type', 'state', 'city', 'membership_status'],
    order: [['full_name', 'ASC']]
  });
}

/**
 * Get recipient breakdown by user type
 */
function getRecipientBreakdown(recipients) {
  const breakdown = {};
  
  recipients.forEach(recipient => {
    const type = recipient.user_type;
    breakdown[type] = (breakdown[type] || 0) + 1;
  });
  
  return breakdown;
}

/**
 * Process sending a message to all recipients
 */
async function processMessageSending(message) {
  try {
    // Update message status
    await message.update({ status: 'sending' });
    
    // Get recipients
    const recipients = await getRecipientUsers(message.target_audience, message.target_filters);
    
    // Create recipient records
    const recipientRecords = recipients.map(user => ({
      admin_message_id: message.id,
      recipient_id: user.id,
      recipient_email: user.email,
      recipient_name: user.full_name || user.username,
      recipient_type: user.user_type,
      delivery_status: 'pending'
    }));

    await AdminMessageRecipient.bulkCreate(recipientRecords, {
      ignoreDuplicates: true
    });

    // Update message counts
    await message.update({
      total_recipients: recipients.length,
      sent_count: recipients.length,
      status: 'sent',
      sent_at: new Date()
    });

    // Send email notifications if enabled
    if (message.send_via_email) {
      await sendEmailNotifications(message, recipients);
    }

    // Update recipient status to sent
    await AdminMessageRecipient.update(
      { 
        delivery_status: 'sent',
        sent_at: new Date()
      },
      {
        where: { admin_message_id: message.id }
      }
    );

    logger.info(`Admin message sent to ${recipients.length} recipients: ${message.id}`);
    
  } catch (error) {
    // Update message status to failed
    await message.update({ status: 'draft' });
    logger.error(`Failed to send admin message ${message.id}:`, error);
    throw error;
  }
}

/**
 * Send email notifications
 */
async function sendEmailNotifications(message, recipients) {
  const emailPromises = recipients.map(async (recipient) => {
    try {
      await sendEmail({
        to: recipient.email,
        template: 'adminMessage',
        data: {
          title: message.title,
          content: message.content,
          recipient_name: recipient.full_name || recipient.username,
          action_button_text: message.action_button_text,
          action_button_url: message.action_button_url,
          sender_name: message.sender_name
        }
      });
    } catch (error) {
      logger.error(`Failed to send email to ${recipient.email}:`, error);
      
      // Update recipient status
      await AdminMessageRecipient.update(
        { 
          delivery_status: 'failed',
          error_message: error.message
        },
        {
          where: { 
            admin_message_id: message.id,
            recipient_id: recipient.id
          }
        }
      );
    }
  });

  await Promise.allSettled(emailPromises);
}

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  previewRecipients,
  sendMessage,
  getMessageAnalytics,
  processScheduledMessages
};