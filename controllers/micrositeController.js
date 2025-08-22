/**
 * Microsite Management Controller
 * 
 * This controller handles admin supervision of all microsites including
 * content moderation, status management, and deactivation capabilities.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { User } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, USER_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');
const { Op } = require('sequelize');

/**
 * Get all microsites with admin supervision data
 * @route GET /api/v1/admin/microsites
 * @access Private (Admin)
 */
const getAllMicrosites = async (req, res) => {
  try {
    const { user } = req;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const {
      type,
      status,
      has_content_issues,
      needs_review,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      search
    } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = {
      user_type: { [Op.in]: ['state', 'club', 'partner'] },
      is_active: true
    };

    // Apply filters
    if (type && type !== 'all') {
      whereClause.user_type = type;
    }

    if (search) {
      whereClause[Op.or] = [
        { full_name: { [Op.iLike]: `%${search}%` } },
        { username: { [Op.iLike]: `%${search}%` } },
        { organization_name: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'full_name', 'email', 'user_type', 'is_active',
        'microsite_status', 'microsite_url', 'microsite_settings', 
        'content_moderation_flags', 'last_content_update', 'organization_name',
        'state', 'city', 'created_at', 'updated_at'
      ],
      order: [['updated_at', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    // Transform data for microsite management
    const microsites = users.map(user => ({
      id: user.id,
      name: user.organization_name || user.full_name,
      type: user.user_type,
      status: user.microsite_status || 'active',
      url: user.microsite_url || `/${user.user_type}s/${user.username}`,
      owner: user.full_name,
      region: `${user.city || ''}, ${user.state || ''}`.trim().replace(/^,\s*|,\s*$/g, '') || 'Not specified',
      lastUpdated: user.last_content_update || user.updated_at,
      contentIssues: user.content_moderation_flags ? Object.keys(user.content_moderation_flags).length : 0,
      needsReview: user.content_moderation_flags?.needs_review || false,
      isActive: user.is_active,
      settings: user.microsite_settings || {},
      moderationFlags: user.content_moderation_flags || {},
      createdAt: user.created_at
    }));

    // Apply additional filters
    let filteredMicrosites = microsites;
    
    if (status && status !== 'all') {
      filteredMicrosites = filteredMicrosites.filter(m => m.status === status);
    }
    
    if (has_content_issues === 'true') {
      filteredMicrosites = filteredMicrosites.filter(m => m.contentIssues > 0);
    }
    
    if (needs_review === 'true') {
      filteredMicrosites = filteredMicrosites.filter(m => m.needsReview);
    }

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        microsites: filteredMicrosites,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit)
        },
        stats: {
          total: microsites.length,
          active: microsites.filter(m => m.status === 'active').length,
          pending: microsites.filter(m => m.status === 'pending').length,
          inactive: microsites.filter(m => m.status === 'inactive').length,
          issues: microsites.reduce((sum, m) => sum + m.contentIssues, 0)
        }
      }
    });
  } catch (error) {
    logger.error('Error in getAllMicrosites:', error);
    throw error;
  }
};

/**
 * Get single microsite details
 * @route GET /api/v1/admin/microsites/:id
 * @access Private (Admin)
 */
const getMicrositeById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const micrositeUser = await User.findByPk(id, {
      attributes: [
        'id', 'username', 'full_name', 'email', 'user_type', 'is_active',
        'microsite_status', 'microsite_url', 'microsite_settings', 
        'content_moderation_flags', 'last_content_update', 'organization_name',
        'state', 'city', 'phone', 'created_at', 'updated_at'
      ]
    });

    if (!micrositeUser) {
      throw createError.notFound('Microsite not found');
    }

    const micrositeData = {
      id: micrositeUser.id,
      name: micrositeUser.organization_name || micrositeUser.full_name,
      type: micrositeUser.user_type,
      status: micrositeUser.microsite_status || 'active',
      url: micrositeUser.microsite_url || `/${micrositeUser.user_type}s/${micrositeUser.username}`,
      owner: {
        id: micrositeUser.id,
        name: micrositeUser.full_name,
        email: micrositeUser.email,
        phone: micrositeUser.phone,
        username: micrositeUser.username
      },
      location: {
        city: micrositeUser.city,
        state: micrositeUser.state
      },
      lastUpdated: micrositeUser.last_content_update || micrositeUser.updated_at,
      contentIssues: micrositeUser.content_moderation_flags ? Object.keys(micrositeUser.content_moderation_flags).length : 0,
      needsReview: micrositeUser.content_moderation_flags?.needs_review || false,
      isActive: micrositeUser.is_active,
      settings: micrositeUser.microsite_settings || {},
      moderationFlags: micrositeUser.content_moderation_flags || {},
      createdAt: micrositeUser.created_at,
      updatedAt: micrositeUser.updated_at
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { microsite: micrositeData }
    });
  } catch (error) {
    logger.error('Error in getMicrositeById:', error);
    throw error;
  }
};

/**
 * Update microsite status (activate/deactivate/maintenance)
 * @route PUT /api/v1/admin/microsites/:id/status
 * @access Private (Admin)
 */
const updateMicrositeStatus = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { status, reason } = req.body;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const validStatuses = ['active', 'inactive', 'pending', 'maintenance', 'suspended'];
    if (!validStatuses.includes(status)) {
      throw createError.validation('Invalid status. Must be one of: ' + validStatuses.join(', '));
    }

    const micrositeUser = await User.findByPk(id);
    if (!micrositeUser) {
      throw createError.notFound('Microsite not found');
    }

    // Update microsite status
    await micrositeUser.update({
      microsite_status: status,
      is_active: status === 'active',
      updated_at: new Date()
    });

    // Log the action
    logger.info(`Admin ${user.username} changed microsite ${id} status to ${status}. Reason: ${reason || 'No reason provided'}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Microsite status updated to ${status}`,
      data: {
        id: micrositeUser.id,
        status: status,
        isActive: status === 'active'
      }
    });
  } catch (error) {
    logger.error('Error in updateMicrositeStatus:', error);
    throw error;
  }
};

/**
 * Add content moderation flag
 * @route POST /api/v1/admin/microsites/:id/moderation
 * @access Private (Admin)
 */
const addModerationFlag = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { flag_type, description, severity, auto_action } = req.body;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const validFlags = ['inappropriate_content', 'spam', 'false_information', 'copyright_violation', 'terms_violation', 'other'];
    const validSeverities = ['low', 'medium', 'high', 'critical'];

    if (!validFlags.includes(flag_type)) {
      throw createError.validation('Invalid flag type');
    }

    if (!validSeverities.includes(severity)) {
      throw createError.validation('Invalid severity level');
    }

    const micrositeUser = await User.findByPk(id);
    if (!micrositeUser) {
      throw createError.notFound('Microsite not found');
    }

    const existingFlags = micrositeUser.content_moderation_flags || {};
    const flagId = Date.now().toString();

    const newFlag = {
      id: flagId,
      type: flag_type,
      description,
      severity,
      flagged_by: user.id,
      flagged_by_name: user.full_name || user.username,
      flagged_at: new Date().toISOString(),
      status: 'active',
      auto_action: auto_action || false
    };

    existingFlags[flagId] = newFlag;
    existingFlags.needs_review = true;

    await micrositeUser.update({
      content_moderation_flags: existingFlags,
      last_content_update: new Date()
    });

    // Auto-action if specified
    if (auto_action && (severity === 'high' || severity === 'critical')) {
      await micrositeUser.update({
        microsite_status: severity === 'critical' ? 'suspended' : 'maintenance',
        is_active: false
      });
    }

    logger.info(`Admin ${user.username} added moderation flag to microsite ${id}: ${flag_type} (${severity})`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Moderation flag added successfully',
      data: { flag: newFlag }
    });
  } catch (error) {
    logger.error('Error in addModerationFlag:', error);
    throw error;
  }
};

/**
 * Remove content moderation flag
 * @route DELETE /api/v1/admin/microsites/:id/moderation/:flagId
 * @access Private (Admin)
 */
const removeModerationFlag = async (req, res) => {
  try {
    const { user } = req;
    const { id, flagId } = req.params;
    const { resolution_note } = req.body;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const micrositeUser = await User.findByPk(id);
    if (!micrositeUser) {
      throw createError.notFound('Microsite not found');
    }

    const existingFlags = micrositeUser.content_moderation_flags || {};
    
    if (!existingFlags[flagId]) {
      throw createError.notFound('Moderation flag not found');
    }

    // Mark flag as resolved instead of deleting
    existingFlags[flagId].status = 'resolved';
    existingFlags[flagId].resolved_by = user.id;
    existingFlags[flagId].resolved_by_name = user.full_name || user.username;
    existingFlags[flagId].resolved_at = new Date().toISOString();
    existingFlags[flagId].resolution_note = resolution_note;

    // Check if any active flags remain
    const activeFlags = Object.values(existingFlags).filter(flag => flag.status === 'active' && flag.id !== 'needs_review');
    existingFlags.needs_review = activeFlags.length > 0;

    await micrositeUser.update({
      content_moderation_flags: existingFlags,
      last_content_update: new Date()
    });

    logger.info(`Admin ${user.username} resolved moderation flag ${flagId} for microsite ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Moderation flag resolved successfully'
    });
  } catch (error) {
    logger.error('Error in removeModerationFlag:', error);
    throw error;
  }
};

/**
 * Bulk actions on microsites
 * @route POST /api/v1/admin/microsites/bulk-action
 * @access Private (Admin)
 */
const bulkMicrositeAction = async (req, res) => {
  try {
    const { user } = req;
    const { action, microsite_ids, reason } = req.body;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const validActions = ['activate', 'deactivate', 'suspend', 'maintenance'];
    if (!validActions.includes(action)) {
      throw createError.validation('Invalid bulk action');
    }

    if (!Array.isArray(microsite_ids) || microsite_ids.length === 0) {
      throw createError.validation('microsite_ids must be a non-empty array');
    }

    const statusMap = {
      activate: { microsite_status: 'active', is_active: true },
      deactivate: { microsite_status: 'inactive', is_active: false },
      suspend: { microsite_status: 'suspended', is_active: false },
      maintenance: { microsite_status: 'maintenance', is_active: false }
    };

    const updateData = {
      ...statusMap[action],
      updated_at: new Date()
    };

    const result = await User.update(updateData, {
      where: {
        id: { [Op.in]: microsite_ids },
        user_type: { [Op.in]: ['state', 'club', 'partner'] }
      },
      returning: true
    });

    logger.info(`Admin ${user.username} performed bulk action ${action} on ${microsite_ids.length} microsites. Reason: ${reason || 'No reason provided'}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Bulk ${action} completed successfully`,
      data: {
        affected_count: result[0],
        action: action
      }
    });
  } catch (error) {
    logger.error('Error in bulkMicrositeAction:', error);
    throw error;
  }
};

/**
 * Generate microsite analytics report
 * @route GET /api/v1/admin/microsites/analytics
 * @access Private (Admin)
 */
const getMicrositeAnalytics = async (req, res) => {
  try {
    const { user } = req;
    
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get all microsites
    const allMicrosites = await User.findAll({
      where: {
        user_type: { [Op.in]: ['state', 'club', 'partner'] }
      },
      attributes: [
        'id', 'user_type', 'microsite_status', 'is_active', 
        'content_moderation_flags', 'created_at', 'updated_at'
      ]
    });

    const analytics = {
      overview: {
        total_microsites: allMicrosites.length,
        active_microsites: allMicrosites.filter(m => m.is_active).length,
        inactive_microsites: allMicrosites.filter(m => !m.is_active).length,
        flagged_microsites: allMicrosites.filter(m => m.content_moderation_flags && Object.keys(m.content_moderation_flags).length > 0).length
      },
      by_type: {
        states: allMicrosites.filter(m => m.user_type === 'state').length,
        clubs: allMicrosites.filter(m => m.user_type === 'club').length,
        partners: allMicrosites.filter(m => m.user_type === 'partner').length
      },
      by_status: {
        active: allMicrosites.filter(m => m.microsite_status === 'active').length,
        inactive: allMicrosites.filter(m => m.microsite_status === 'inactive').length,
        pending: allMicrosites.filter(m => m.microsite_status === 'pending').length,
        maintenance: allMicrosites.filter(m => m.microsite_status === 'maintenance').length,
        suspended: allMicrosites.filter(m => m.microsite_status === 'suspended').length
      },
      moderation: {
        total_flags: allMicrosites.reduce((sum, m) => {
          const flags = m.content_moderation_flags || {};
          return sum + Object.keys(flags).filter(key => key !== 'needs_review').length;
        }, 0),
        needs_review: allMicrosites.filter(m => m.content_moderation_flags?.needs_review).length,
        auto_suspended: allMicrosites.filter(m => m.microsite_status === 'suspended').length
      },
      recent_activity: {
        new_this_month: allMicrosites.filter(m => new Date(m.created_at) >= thirtyDaysAgo).length,
        updated_this_month: allMicrosites.filter(m => new Date(m.updated_at) >= thirtyDaysAgo).length
      }
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { analytics }
    });
  } catch (error) {
    logger.error('Error in getMicrositeAnalytics:', error);
    throw error;
  }
};

module.exports = {
  getAllMicrosites,
  getMicrositeById,
  updateMicrositeStatus,
  addModerationFlag,
  removeModerationFlag,
  bulkMicrositeAction,
  getMicrositeAnalytics
};