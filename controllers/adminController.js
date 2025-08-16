/**
 * Admin Controller
 * 
 * This controller handles all admin-related operations including
 * admin management, system administration, and admin-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { User, Club, Tournament, Payment, Notification, Ranking } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, USER_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');
const { Op } = require('sequelize');

/**
 * Get dashboard statistics
 * @route GET /api/v1/admin/dashboard
 * @access Private (Admin)
 */
const getDashboardStats = async (req, res) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // Get various statistics
    const totalUsers = await User.count();
    const totalClubs = await Club.count();
    const totalTournaments = await Tournament.count();
    const totalPayments = await Payment.count();

    const activeUsers = await User.count({
      where: { is_active: true }
    });

    const verifiedUsers = await User.count({
      where: { is_verified: true }
    });

    const successfulPayments = await Payment.count({
      where: { status: 'completed' }
    });

    const totalRevenue = await Payment.findOne({
      where: { status: 'completed' },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_revenue']
      ]
    });

    const revenue = parseFloat(totalRevenue?.dataValues?.total_revenue || 0);

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        verified: verifiedUsers
      },
      clubs: {
        total: totalClubs
      },
      tournaments: {
        total: totalTournaments
      },
      payments: {
        total: totalPayments,
        successful: successfulPayments,
        revenue: revenue
      }
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DASHBOARD_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getDashboardStats:', error);
    throw error;
  }
};

/**
 * Get system users (admin view)
 * @route GET /api/v1/admin/users
 * @access Private (Admin)
 */
const getSystemUsers = async (req, res) => {
  try {
    const { user } = req;
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      user_type,
      membership_status,
      is_active,
      is_verified,
      search
    } = req.query;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // Build where clause
    const whereClause = {};
    
    if (user_type) {
      whereClause.user_type = user_type;
    }
    
    if (membership_status) {
      whereClause.membership_status = membership_status;
    }
    
    if (is_active !== undefined) {
      whereClause.is_active = is_active === 'true';
    }
    
    if (is_verified !== undefined) {
      whereClause.is_verified = is_verified === 'true';
    }
    
    if (search) {
      whereClause[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { full_name: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USERS_RETRIEVED,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getSystemUsers:', error);
    throw error;
  }
};

/**
 * Update user membership
 * @route PUT /api/v1/admin/users/:id/membership
 * @access Private (Admin)
 */
const updateUserMembership = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { membership_status, membership_expires_at } = req.body;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    if (!membership_status) {
      throw createError.validation('Membership status is required');
    }

    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      throw createError.notFound('User not found');
    }

    const updateData = {
      membership_status,
      membership_expires_at
    };

    await User.update(updateData, { where: { id } });

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_MEMBERSHIP_UPDATED,
      data: { user: updatedUser }
    });
  } catch (error) {
    logger.error('Error in updateUserMembership:', error);
    throw error;
  }
};

/**
 * Get system logs
 * @route GET /api/v1/admin/logs
 * @access Private (Admin)
 */
const getSystemLogs = async (req, res) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // This would typically connect to a logging service
    // For now, return a placeholder response
    const logs = [
      {
        timestamp: new Date(),
        level: 'info',
        message: 'System logs endpoint accessed',
        user_id: user.id
      }
    ];

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.LOGS_RETRIEVED,
      data: { logs }
    });
  } catch (error) {
    logger.error('Error in getSystemLogs:', error);
    throw error;
  }
};

/**
 * Get system health
 * @route GET /api/v1/admin/health
 * @access Private (Admin)
 */
const getSystemHealth = async (req, res) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // Check database connection
    let dbStatus = 'healthy';
    try {
      await User.count();
    } catch (error) {
      dbStatus = 'unhealthy';
    }

    const health = {
      status: 'healthy',
      timestamp: new Date(),
      services: {
        database: dbStatus,
        api: 'healthy'
      },
      uptime: process.uptime()
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.HEALTH_RETRIEVED,
      data: { health }
    });
  } catch (error) {
    logger.error('Error in getSystemHealth:', error);
    throw error;
  }
};

/**
 * Get system settings
 * @route GET /api/v1/admin/settings
 * @access Private (Admin)
 */
const getSystemSettings = async (req, res) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // This would typically fetch from a settings table
    const settings = {
      maintenance_mode: false,
      registration_enabled: true,
      email_verification_required: true,
      max_login_attempts: 5,
      lockout_duration: 30, // minutes
      session_timeout: 24 // hours
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SETTINGS_RETRIEVED,
      data: { settings }
    });
  } catch (error) {
    logger.error('Error in getSystemSettings:', error);
    throw error;
  }
};

/**
 * Update system settings
 * @route PUT /api/v1/admin/settings
 * @access Private (Admin)
 */
const updateSystemSettings = async (req, res) => {
  try {
    const { user } = req;
    const settings = req.body;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // This would typically update a settings table
    // For now, just return success

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SETTINGS_UPDATED,
      data: { settings }
    });
  } catch (error) {
    logger.error('Error in updateSystemSettings:', error);
    throw error;
  }
};

/**
 * Get admin activity
 * @route GET /api/v1/admin/activity
 * @access Private (Admin)
 */
const getAdminActivity = async (req, res) => {
  try {
    const { user } = req;
    const { page = 1, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // This would typically fetch from an activity log table
    const activities = [
      {
        id: 1,
        admin_id: user.id,
        action: 'viewed_dashboard',
        details: 'Accessed admin dashboard',
        timestamp: new Date()
      }
    ];

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ACTIVITY_RETRIEVED,
      data: { activities }
    });
  } catch (error) {
    logger.error('Error in getAdminActivity:', error);
    throw error;
  }
};

/**
 * Export system data
 * @route GET /api/v1/admin/export
 * @access Private (Admin)
 */
const exportSystemData = async (req, res) => {
  try {
    const { user } = req;
    const { type } = req.query;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    // This would typically generate and return a file
    const exportData = {
      type: type || 'users',
      timestamp: new Date(),
      data: []
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_EXPORTED,
      data: { export: exportData }
    });
  } catch (error) {
    logger.error('Error in exportSystemData:', error);
    throw error;
  }
};

/**
 * Perform system maintenance
 * @route POST /api/v1/admin/maintenance
 * @access Private (Admin)
 */
const performSystemMaintenance = async (req, res) => {
  try {
    const { user } = req;
    const { action } = req.body;

    // Check if user is admin
    if (user.user_type !== 'admin') {
      throw createError.forbidden('Access denied');
    }

    if (!action) {
      throw createError.validation('Maintenance action is required');
    }

    // This would typically perform various maintenance tasks
    const result = {
      action,
      status: 'completed',
      timestamp: new Date(),
      details: `Maintenance action '${action}' completed successfully`
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.MAINTENANCE_COMPLETED,
      data: { result }
    });
  } catch (error) {
    logger.error('Error in performSystemMaintenance:', error);
    throw error;
  }
};

module.exports = {
  getDashboardStats,
  getSystemUsers,
  updateUserMembership,
  getSystemLogs,
  getSystemHealth,
  getSystemSettings,
  updateSystemSettings,
  getAdminActivity,
  exportSystemData,
  performSystemMaintenance
}; 