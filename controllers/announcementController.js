/**
 * Announcement Controller
 * 
 * Handles all announcement-related operations including creation,
 * management, publishing, and analytics for admin messaging system.
 * 
 * @fileoverview Controller for announcement management
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Announcement, User, Message } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS } = require('../config/constants');
const logger = require('../config/logger');
const { Op } = require('sequelize');

/**
 * Create a new announcement
 * @route POST /api/v1/announcements
 * @access Private (Admin)
 */
const createAnnouncement = async (req, res) => {
  try {
    const { user_id, user_type } = req.user;
    
    // Only admins can create announcements
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can create announcements');
    }

    const {
      title,
      content,
      excerpt,
      category = 'general',
      priority = 'medium',
      target_audience = 'all_members',
      target_groups,
      target_states,
      publish_date,
      expiry_date,
      display_style = 'standard',
      send_notification = false,
      action_button_text,
      action_button_url,
      external_link,
      tags,
      banner_image
    } = req.body;

    // Validate required fields
    if (!title || !content) {
      throw createError.badRequest('Title and content are required');
    }

    // Get author information
    const author = await User.findByPk(user_id);
    if (!author) {
      throw createError.notFound('Author not found');
    }

    // Generate excerpt if not provided
    const finalExcerpt = excerpt || content.substring(0, 200) + (content.length > 200 ? '...' : '');

    // Create announcement
    const announcement = await Announcement.create({
      title,
      content,
      excerpt: finalExcerpt,
      category,
      priority,
      target_audience,
      target_groups: target_groups || null,
      target_states: target_states || null,
      publish_date: publish_date ? new Date(publish_date) : null,
      expiry_date: expiry_date ? new Date(expiry_date) : null,
      author_id: user_id,
      author_name: author.full_name || author.username,
      author_title: author.title || 'Administrator',
      display_style,
      send_notification,
      action_button_text,
      action_button_url,
      external_link,
      tags: tags || [],
      banner_image,
      status: publish_date ? 'scheduled' : 'draft'
    });

    // If publishing immediately and notification requested, send notifications
    if (!publish_date && send_notification) {
      await sendAnnouncementNotifications(announcement);
    }

    logger.info(`Announcement created: ${announcement.id} by ${author.username}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENT_CREATED,
      data: announcement
    });
  } catch (error) {
    logger.error('Error in createAnnouncement:', error);
    throw error;
  }
};

/**
 * Get all announcements with filtering and pagination
 * @route GET /api/v1/announcements
 * @access Private (Admin)
 */
const getAnnouncements = async (req, res) => {
  try {
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can manage announcements');
    }

    const {
      page = 1,
      limit = 10,
      status,
      category,
      priority,
      target_audience,
      search
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    let whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    if (category) {
      whereClause.category = category;
    }
    
    if (priority) {
      whereClause.priority = priority;
    }
    
    if (target_audience) {
      whereClause.target_audience = target_audience;
    }
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Get announcements with pagination
    const { count, rows: announcements } = await Announcement.findAndCountAll({
      where: whereClause,
      order: [
        ['is_pinned', 'DESC'],
        ['priority', 'DESC'],
        ['created_at', 'DESC']
      ],
      limit: parseInt(limit),
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'full_name', 'username', 'email']
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
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENTS_RETRIEVED,
      data: announcements,
      pagination
    });
  } catch (error) {
    logger.error('Error in getAnnouncements:', error);
    throw error;
  }
};

/**
 * Get public announcements for users
 * @route GET /api/v1/announcements/public
 * @access Private (Any authenticated user)
 */
const getPublicAnnouncements = async (req, res) => {
  try {
    const { user_id, user_type, state } = req.user;
    
    const {
      page = 1,
      limit = 10,
      category,
      priority
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Get user groups for targeting (implement based on your group system)
    const userGroups = []; // TODO: Implement user groups

    // Build where clause for public announcements
    let whereClause = {
      status: 'published'
    };

    const now = new Date();
    whereClause[Op.and] = [
      {
        [Op.or]: [
          { publish_date: null },
          { publish_date: { [Op.lte]: now } }
        ]
      },
      {
        [Op.or]: [
          { expiry_date: null },
          { expiry_date: { [Op.gt]: now } }
        ]
      }
    ];

    if (category) {
      whereClause.category = category;
    }

    if (priority) {
      whereClause.priority = priority;
    }

    // Get announcements
    const { count, rows: allAnnouncements } = await Announcement.findAndCountAll({
      where: whereClause,
      order: [
        ['is_pinned', 'DESC'],
        ['priority', 'DESC'],
        ['publish_date', 'DESC'],
        ['created_at', 'DESC']
      ],
      limit: parseInt(limit),
      offset
    });

    // Filter by user permissions
    const announcements = allAnnouncements.filter(announcement => 
      announcement.canBeViewedBy(user_type, state, userGroups)
    );

    // Update view counts for displayed announcements
    const announcementIds = announcements.map(a => a.id);
    if (announcementIds.length > 0) {
      await Announcement.update(
        { view_count: sequelize.literal('view_count + 1') },
        { where: { id: announcementIds } }
      );
    }

    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / parseInt(limit))
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENTS_RETRIEVED,
      data: announcements,
      pagination
    });
  } catch (error) {
    logger.error('Error in getPublicAnnouncements:', error);
    throw error;
  }
};

/**
 * Update an announcement
 * @route PUT /api/v1/announcements/:id
 * @access Private (Admin)
 */
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can update announcements');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    const updateData = { ...req.body };
    
    // Handle date fields
    if (updateData.publish_date) {
      updateData.publish_date = new Date(updateData.publish_date);
    }
    if (updateData.expiry_date) {
      updateData.expiry_date = new Date(updateData.expiry_date);
    }

    await announcement.update(updateData);

    logger.info(`Announcement updated: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENT_UPDATED,
      data: announcement
    });
  } catch (error) {
    logger.error('Error in updateAnnouncement:', error);
    throw error;
  }
};

/**
 * Publish an announcement
 * @route POST /api/v1/announcements/:id/publish
 * @access Private (Admin)
 */
const publishAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    const { send_notification = false } = req.body;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can publish announcements');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    await announcement.update({
      status: 'published',
      publish_date: new Date(),
      send_notification
    });

    // Send notifications if requested
    if (send_notification) {
      await sendAnnouncementNotifications(announcement);
    }

    logger.info(`Announcement published: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENT_PUBLISHED,
      data: announcement
    });
  } catch (error) {
    logger.error('Error in publishAnnouncement:', error);
    throw error;
  }
};

/**
 * Archive an announcement
 * @route POST /api/v1/announcements/:id/archive
 * @access Private (Admin)
 */
const archiveAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can archive announcements');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    await announcement.update({ status: 'archived' });

    logger.info(`Announcement archived: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENT_ARCHIVED,
      data: announcement
    });
  } catch (error) {
    logger.error('Error in archiveAnnouncement:', error);
    throw error;
  }
};

/**
 * Delete an announcement
 * @route DELETE /api/v1/announcements/:id
 * @access Private (Admin)
 */
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can delete announcements');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    await announcement.destroy();

    logger.info(`Announcement deleted: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANNOUNCEMENT_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteAnnouncement:', error);
    throw error;
  }
};

/**
 * Toggle pin status of an announcement
 * @route POST /api/v1/announcements/:id/pin
 * @access Private (Admin)
 */
const togglePinAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can pin announcements');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    await announcement.update({ is_pinned: !announcement.is_pinned });

    logger.info(`Announcement pin toggled: ${id} - ${announcement.is_pinned ? 'pinned' : 'unpinned'}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: announcement.is_pinned ? 
        API_MESSAGES.SUCCESS.ANNOUNCEMENT_PINNED : 
        API_MESSAGES.SUCCESS.ANNOUNCEMENT_UNPINNED,
      data: announcement
    });
  } catch (error) {
    logger.error('Error in togglePinAnnouncement:', error);
    throw error;
  }
};

/**
 * Get announcement analytics
 * @route GET /api/v1/announcements/:id/analytics
 * @access Private (Admin)
 */
const getAnnouncementAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can view analytics');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    // Get related notifications sent
    const notificationsSent = await Message.count({
      where: {
        related_entity_type: 'announcement',
        related_entity_id: id,
        message_type: 'announcement_notification'
      }
    });

    // Get notifications read
    const notificationsRead = await Message.count({
      where: {
        related_entity_type: 'announcement',
        related_entity_id: id,
        message_type: 'announcement_notification',
        is_read: true
      }
    });

    // Calculate engagement metrics
    const analytics = {
      announcement_id: id,
      view_count: announcement.view_count,
      click_count: announcement.click_count,
      like_count: announcement.like_count,
      notifications_sent: notificationsSent,
      notifications_read: notificationsRead,
      read_rate: notificationsSent > 0 ? (notificationsRead / notificationsSent * 100).toFixed(1) + '%' : '0%',
      engagement_score: calculateEngagementScore(announcement),
      created_at: announcement.created_at,
      published_at: announcement.publish_date,
      days_active: announcement.publish_date ? 
        Math.ceil((new Date() - new Date(announcement.publish_date)) / (1000 * 60 * 60 * 24)) : 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ANALYTICS_RETRIEVED,
      data: analytics
    });
  } catch (error) {
    logger.error('Error in getAnnouncementAnalytics:', error);
    throw error;
  }
};

/**
 * Send notifications for an announcement
 * @param {Object} announcement - Announcement object
 */
const sendAnnouncementNotifications = async (announcement) => {
  try {
    // Get target users based on audience settings
    let targetUsers = [];
    
    if (announcement.target_audience === 'all_members') {
      targetUsers = await User.findAll({
        where: { is_active: true },
        attributes: ['id', 'full_name', 'username', 'email', 'user_type', 'state']
      });
    } else if (announcement.target_audience !== 'specific_groups') {
      targetUsers = await User.findAll({
        where: { 
          user_type: announcement.target_audience === 'club_managers' ? 'club' : announcement.target_audience.slice(0, -1), // Remove 's' from plural
          is_active: true 
        },
        attributes: ['id', 'full_name', 'username', 'email', 'user_type', 'state']
      });
    }

    // Filter by state if specified
    if (announcement.target_states && announcement.target_states.length > 0) {
      targetUsers = targetUsers.filter(user => 
        announcement.target_states.includes(user.state)
      );
    }

    // Create notification messages
    const notifications = targetUsers.map(user => ({
      recipient_id: user.id,
      sender_id: announcement.author_id,
      sender_name: announcement.author_name,
      sender_type: 'admin',
      subject: `New Announcement: ${announcement.title}`,
      content: announcement.excerpt || announcement.content.substring(0, 200),
      message_type: 'announcement_notification',
      category: announcement.category,
      priority: announcement.priority,
      related_entity_type: 'announcement',
      related_entity_id: announcement.id,
      action_required: !!announcement.action_button_text,
      action_button_text: announcement.action_button_text,
      action_button_url: announcement.action_button_url,
      is_automated: true,
      automation_trigger: 'announcement_published'
    }));

    // Bulk create notifications
    await Message.bulkCreate(notifications);

    // Update announcement notification status
    await announcement.update({
      notification_sent: true,
      notification_sent_at: new Date()
    });

    logger.info(`Sent ${notifications.length} notifications for announcement: ${announcement.id}`);
    
    return notifications.length;
  } catch (error) {
    logger.error('Error sending announcement notifications:', error);
    throw error;
  }
};

/**
 * Calculate engagement score for announcement
 * @param {Object} announcement - Announcement object
 * @returns {number} Engagement score (0-100)
 */
const calculateEngagementScore = (announcement) => {
  const views = announcement.view_count || 0;
  const clicks = announcement.click_count || 0;
  const likes = announcement.like_count || 0;
  
  if (views === 0) return 0;
  
  const clickRate = clicks / views;
  const likeRate = likes / views;
  
  // Weighted score: clicks (60%), likes (40%)
  const score = (clickRate * 60) + (likeRate * 40);
  
  return Math.min(100, Math.round(score * 100));
};

/**
 * Bulk send announcements to selected users
 * @route POST /api/v1/announcements/:id/send-bulk
 * @access Private (Admin)
 */
const sendBulkAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_type } = req.user;
    const { user_ids, send_notification = true } = req.body;
    
    if (user_type !== 'admin') {
      throw createError.forbidden('Only administrators can send bulk announcements');
    }

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw createError.notFound('Announcement not found');
    }

    if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
      throw createError.badRequest('User IDs array is required');
    }

    // Get target users
    const targetUsers = await User.findAll({
      where: { 
        id: user_ids,
        is_active: true 
      },
      attributes: ['id', 'full_name', 'username', 'email']
    });

    if (targetUsers.length === 0) {
      throw createError.badRequest('No valid target users found');
    }

    // Create notification messages
    const notifications = targetUsers.map(user => ({
      recipient_id: user.id,
      sender_id: announcement.author_id,
      sender_name: announcement.author_name,
      sender_type: 'admin',
      subject: `Announcement: ${announcement.title}`,
      content: announcement.excerpt || announcement.content.substring(0, 200),
      message_type: 'announcement_notification',
      category: announcement.category,
      priority: announcement.priority,
      related_entity_type: 'announcement',
      related_entity_id: announcement.id,
      action_required: !!announcement.action_button_text,
      action_button_text: announcement.action_button_text,
      action_button_url: announcement.action_button_url,
      is_automated: true,
      automation_trigger: 'bulk_announcement'
    }));

    // Send notifications
    await Message.bulkCreate(notifications);

    logger.info(`Sent ${notifications.length} bulk notifications for announcement: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Announcement sent to ${notifications.length} users`,
      data: {
        sent_count: notifications.length,
        target_users: targetUsers.map(u => ({
          id: u.id,
          name: u.full_name || u.username,
          email: u.email
        }))
      }
    });
  } catch (error) {
    logger.error('Error in sendBulkAnnouncement:', error);
    throw error;
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getPublicAnnouncements,
  updateAnnouncement,
  publishAnnouncement,
  archiveAnnouncement,
  deleteAnnouncement,
  togglePinAnnouncement,
  getAnnouncementAnalytics,
  sendBulkAnnouncement
};