/**
 * Message Controller
 * 
 * Handles all messaging operations including direct messages,
 * system notifications, and message management.
 * 
 * @fileoverview Controller for message management
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Message, User, Announcement } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS } = require('../config/constants');
const logger = require('../config/logger');
const { Op } = require('sequelize');

/**
 * Send a direct message
 * @route POST /api/v1/messages
 * @access Private (Any authenticated user)
 */
const sendMessage = async (req, res) => {
  try {
    const { user_id } = req.user;
    const {
      recipient_id,
      subject,
      content,
      category = 'general',
      priority = 'medium'
    } = req.body;

    // Validate required fields
    if (!recipient_id || !subject || !content) {
      throw createError.badRequest('Recipient, subject, and content are required');
    }

    // Get sender and recipient info
    const [sender, recipient] = await Promise.all([
      User.findByPk(user_id, { attributes: ['id', 'full_name', 'username', 'user_type'] }),
      User.findByPk(recipient_id, { attributes: ['id', 'full_name', 'username', 'user_type', 'is_active'] })
    ]);

    if (!sender) {
      throw createError.notFound('Sender not found');
    }

    if (!recipient) {
      throw createError.notFound('Recipient not found');
    }

    if (!recipient.is_active) {
      throw createError.badRequest('Cannot send message to inactive user');
    }

    // Create message
    const message = await Message.create({
      sender_id: user_id,
      sender_name: sender.full_name || sender.username,
      sender_type: sender.user_type === 'admin' ? 'admin' : 'user',
      recipient_id,
      subject,
      content,
      category,
      priority,
      message_type: 'direct_message',
      status: 'sent'
    });

    logger.info(`Message sent from ${sender.username} to ${recipient.username}: ${message.id}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MESSAGE_SENT,
      data: message
    });
  } catch (error) {
    logger.error('Error in sendMessage:', error);
    throw error;
  }
};

/**
 * Get messages for current user
 * @route GET /api/v1/messages
 * @access Private (Any authenticated user)
 */
const getMessages = async (req, res) => {
  try {
    const { user_id } = req.user;
    const {
      type = 'inbox',
      category,
      priority,
      is_read,
      page = 1,
      limit = 20,
      search
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause based on message type
    let whereClause = {};
    
    if (type === 'inbox') {
      whereClause.recipient_id = user_id;
      whereClause.is_archived = false;
    } else if (type === 'sent') {
      whereClause.sender_id = user_id;
    } else if (type === 'starred') {
      whereClause.recipient_id = user_id;
      whereClause.is_starred = true;
    } else if (type === 'archived') {
      whereClause.recipient_id = user_id;
      whereClause.is_archived = true;
    }

    // Add filters
    whereClause.status = { [Op.ne]: 'deleted' };

    if (category) {
      whereClause.category = category;
    }

    if (priority) {
      whereClause.priority = priority;
    }

    if (is_read !== undefined) {
      whereClause.is_read = is_read === 'true';
    }

    if (search) {
      whereClause[Op.or] = [
        { subject: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { sender_name: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Get messages with pagination
    const { count, rows: messages } = await Message.findAndCountAll({
      where: whereClause,
      order: [
        ['priority', 'DESC'],
        ['created_at', 'DESC']
      ],
      limit: parseInt(limit),
      offset,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'full_name', 'username', 'profile_photo'],
          required: false
        },
        {
          model: User,
          as: 'recipient',
          attributes: ['id', 'full_name', 'username', 'profile_photo'],
          required: false
        }
      ]
    });

    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / parseInt(limit))
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MESSAGES_RETRIEVED,
      data: messages,
      pagination
    });
  } catch (error) {
    logger.error('Error in getMessages:', error);
    throw error;
  }
};

/**
 * Get unread message count
 * @route GET /api/v1/messages/unread-count
 * @access Private (Any authenticated user)
 */
const getUnreadCount = async (req, res) => {
  try {
    const { user_id } = req.user;

    const unreadCount = await Message.getUnreadCount(user_id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { unread_count: unreadCount }
    });
  } catch (error) {
    logger.error('Error in getUnreadCount:', error);
    throw error;
  }
};

/**
 * Mark message as read
 * @route PUT /api/v1/messages/:id/read
 * @access Private (Message recipient)
 */
const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const message = await Message.findOne({
      where: { 
        id, 
        recipient_id: user_id 
      }
    });

    if (!message) {
      throw createError.notFound('Message not found or access denied');
    }

    await message.markAsRead();
    await message.incrementOpenCount();

    logger.info(`Message marked as read: ${id} by user ${user_id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MESSAGE_READ,
      data: message
    });
  } catch (error) {
    logger.error('Error in markMessageAsRead:', error);
    throw error;
  }
};

/**
 * Mark all messages as read
 * @route PUT /api/v1/messages/read-all
 * @access Private (Any authenticated user)
 */
const markAllMessagesAsRead = async (req, res) => {
  try {
    const { user_id } = req.user;

    await Message.update(
      { 
        is_read: true, 
        read_at: new Date(),
        status: 'read'
      },
      {
        where: {
          recipient_id: user_id,
          is_read: false,
          status: { [Op.ne]: 'deleted' }
        }
      }
    );

    logger.info(`All messages marked as read for user: ${user_id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ALL_MESSAGES_READ
    });
  } catch (error) {
    logger.error('Error in markAllMessagesAsRead:', error);
    throw error;
  }
};

/**
 * Star/unstar a message
 * @route PUT /api/v1/messages/:id/star
 * @access Private (Message recipient)
 */
const toggleStarMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const { starred } = req.body;

    const message = await Message.findOne({
      where: { 
        id, 
        recipient_id: user_id 
      }
    });

    if (!message) {
      throw createError.notFound('Message not found or access denied');
    }

    await message.markAsStarred(starred);

    logger.info(`Message ${starred ? 'starred' : 'unstarred'}: ${id} by user ${user_id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: starred ? API_MESSAGES.SUCCESS.MESSAGE_STARRED : API_MESSAGES.SUCCESS.MESSAGE_UNSTARRED,
      data: message
    });
  } catch (error) {
    logger.error('Error in toggleStarMessage:', error);
    throw error;
  }
};

/**
 * Archive a message
 * @route PUT /api/v1/messages/:id/archive
 * @access Private (Message recipient)
 */
const archiveMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const message = await Message.findOne({
      where: { 
        id, 
        recipient_id: user_id 
      }
    });

    if (!message) {
      throw createError.notFound('Message not found or access denied');
    }

    await message.archive();

    logger.info(`Message archived: ${id} by user ${user_id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MESSAGE_ARCHIVED,
      data: message
    });
  } catch (error) {
    logger.error('Error in archiveMessage:', error);
    throw error;
  }
};

/**
 * Delete a message
 * @route DELETE /api/v1/messages/:id
 * @access Private (Message recipient or admin)
 */
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, user_type } = req.user;

    let whereClause = { id };
    
    // Non-admins can only delete their own received messages
    if (user_type !== 'admin') {
      whereClause.recipient_id = user_id;
    }

    const message = await Message.findOne({ where: whereClause });

    if (!message) {
      throw createError.notFound('Message not found or access denied');
    }

    // Soft delete by updating status
    await message.update({ status: 'deleted' });

    logger.info(`Message deleted: ${id} by user ${user_id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MESSAGE_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteMessage:', error);
    throw error;
  }
};

/**
 * Get message statistics for admin
 * @route GET /api/v1/messages/stats
 * @access Private (Admin)
 */
const getMessageStatistics = async (req, res) => {
  try {
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can view message statistics');
    }

    const { period = 'last_30_days' } = req.query;
    
    // Calculate date range
    let startDate = new Date();
    if (period === 'last_7_days') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'last_30_days') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === 'last_90_days') {
      startDate.setDate(startDate.getDate() - 90);
    }

    const whereClause = {
      created_at: { [Op.gte]: startDate }
    };

    // Get statistics
    const [
      totalMessages,
      directMessages,
      systemMessages,
      unreadMessages,
      messagesByCategory,
      messagesByPriority
    ] = await Promise.all([
      Message.count({ where: whereClause }),
      Message.count({ where: { ...whereClause, message_type: 'direct_message' } }),
      Message.count({ where: { ...whereClause, sender_type: 'system' } }),
      Message.count({ where: { ...whereClause, is_read: false } }),
      Message.findAll({
        where: whereClause,
        attributes: [
          'category',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['category'],
        raw: true
      }),
      Message.findAll({
        where: whereClause,
        attributes: [
          'priority',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['priority'],
        raw: true
      })
    ]);

    const statistics = {
      period,
      total_messages: totalMessages,
      direct_messages: directMessages,
      system_messages: systemMessages,
      unread_messages: unreadMessages,
      read_rate: totalMessages > 0 ? ((totalMessages - unreadMessages) / totalMessages * 100).toFixed(1) + '%' : '0%',
      messages_by_category: messagesByCategory.reduce((acc, item) => {
        acc[item.category] = parseInt(item.count);
        return acc;
      }, {}),
      messages_by_priority: messagesByPriority.reduce((acc, item) => {
        acc[item.priority] = parseInt(item.count);
        return acc;
      }, {}),
      generated_at: new Date()
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.STATISTICS_RETRIEVED,
      data: statistics
    });
  } catch (error) {
    logger.error('Error in getMessageStatistics:', error);
    throw error;
  }
};

/**
 * Send system notification
 * @route POST /api/v1/messages/system-notification
 * @access Private (Admin)
 */
const sendSystemNotification = async (req, res) => {
  try {
    const { user_id, user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can send system notifications');
    }

    const {
      recipient_ids,
      subject,
      content,
      category = 'system',
      priority = 'medium',
      action_button_text,
      action_button_url,
      related_entity_type,
      related_entity_id
    } = req.body;

    if (!recipient_ids || !Array.isArray(recipient_ids) || recipient_ids.length === 0) {
      throw createError.badRequest('Recipient IDs array is required');
    }

    if (!subject || !content) {
      throw createError.badRequest('Subject and content are required');
    }

    // Get sender info
    const sender = await User.findByPk(user_id, { 
      attributes: ['id', 'full_name', 'username'] 
    });

    // Verify recipients exist and are active
    const recipients = await User.findAll({
      where: {
        id: recipient_ids,
        is_active: true
      },
      attributes: ['id', 'full_name', 'username']
    });

    if (recipients.length === 0) {
      throw createError.badRequest('No valid recipients found');
    }

    // Create messages for each recipient
    const messages = recipients.map(recipient => ({
      sender_id: user_id,
      sender_name: sender.full_name || sender.username,
      sender_type: 'admin',
      recipient_id: recipient.id,
      subject,
      content,
      category,
      priority,
      message_type: 'system_notification',
      action_required: !!action_button_text,
      action_button_text,
      action_button_url,
      related_entity_type,
      related_entity_id,
      is_automated: true,
      automation_trigger: 'admin_system_notification',
      status: 'sent'
    }));

    // Bulk create messages
    const createdMessages = await Message.bulkCreate(messages, { returning: true });

    logger.info(`System notification sent to ${recipients.length} users by ${sender.username}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: `System notification sent to ${recipients.length} users`,
      data: {
        sent_count: recipients.length,
        message_ids: createdMessages.map(m => m.id),
        recipients: recipients.map(r => ({
          id: r.id,
          name: r.full_name || r.username
        }))
      }
    });
  } catch (error) {
    logger.error('Error in sendSystemNotification:', error);
    throw error;
  }
};

/**
 * Get message by ID
 * @route GET /api/v1/messages/:id
 * @access Private (Message participant)
 */
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, user_type } = req.user;

    let whereClause = { id };
    
    // Non-admins can only access messages they sent or received
    if (user_type !== 'admin') {
      whereClause[Op.or] = [
        { sender_id: user_id },
        { recipient_id: user_id }
      ];
    }

    const message = await Message.findOne({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'full_name', 'username', 'profile_photo', 'user_type']
        },
        {
          model: User,
          as: 'recipient',
          attributes: ['id', 'full_name', 'username', 'profile_photo', 'user_type']
        }
      ]
    });

    if (!message) {
      throw createError.notFound('Message not found or access denied');
    }

    // Mark as read if recipient is viewing
    if (message.recipient_id === user_id && !message.is_read) {
      await message.markAsRead();
      await message.incrementOpenCount();
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MESSAGE_RETRIEVED,
      data: message
    });
  } catch (error) {
    logger.error('Error in getMessageById:', error);
    throw error;
  }
};

/**
 * Send broadcast message to multiple users
 * @route POST /api/v1/messages/broadcast
 * @access Private (Admin)
 */
const sendBroadcastMessage = async (req, res) => {
  try {
    const { user_id, user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can send broadcast messages');
    }

    const {
      target_audience = 'all_members',
      target_states,
      subject,
      content,
      category = 'general',
      priority = 'medium',
      action_button_text,
      action_button_url
    } = req.body;

    if (!subject || !content) {
      throw createError.badRequest('Subject and content are required');
    }

    // Get sender info
    const sender = await User.findByPk(user_id, { 
      attributes: ['id', 'full_name', 'username'] 
    });

    // Build target user query
    let userWhere = { is_active: true };
    
    if (target_audience !== 'all_members') {
      if (target_audience === 'club_managers') {
        userWhere.user_type = 'club';
      } else {
        userWhere.user_type = target_audience.slice(0, -1); // Remove 's' from plural
      }
    }

    if (target_states && target_states.length > 0) {
      userWhere.state = { [Op.in]: target_states };
    }

    // Get target users
    const targetUsers = await User.findAll({
      where: userWhere,
      attributes: ['id', 'full_name', 'username']
    });

    if (targetUsers.length === 0) {
      throw createError.badRequest('No target users found');
    }

    // Create messages
    const messages = targetUsers.map(user => ({
      sender_id: user_id,
      sender_name: sender.full_name || sender.username,
      sender_type: 'admin',
      recipient_id: user.id,
      subject,
      content,
      category,
      priority,
      message_type: 'system_notification',
      action_required: !!action_button_text,
      action_button_text,
      action_button_url,
      is_automated: true,
      automation_trigger: 'admin_broadcast',
      status: 'sent'
    }));

    // Bulk create messages
    await Message.bulkCreate(messages);

    logger.info(`Broadcast message sent to ${targetUsers.length} users by ${sender.username}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: `Broadcast message sent to ${targetUsers.length} users`,
      data: {
        sent_count: targetUsers.length,
        target_audience,
        target_states: target_states || null
      }
    });
  } catch (error) {
    logger.error('Error in sendBroadcastMessage:', error);
    throw error;
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getUnreadCount,
  markMessageAsRead,
  markAllMessagesAsRead,
  toggleStarMessage,
  archiveMessage,
  deleteMessage,
  getMessageById,
  sendSystemNotification,
  sendBroadcastMessage,
  getMessageStatistics
};