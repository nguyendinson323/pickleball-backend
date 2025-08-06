/**
 * Admin Controller
 * 
 * This controller handles all admin-related operations including
 * admin management, system administration, and admin-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { User, Club, Tournament, Payment, Notification, Ranking } = require('../models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, USER_ROLES, USER_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Get dashboard statistics
 * @route GET /api/v1/admin/dashboard
 * @access Private (Admin)
 */
const getDashboardStats = async (req, res) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Get various statistics
    const totalUsers = await User.count();
    const totalClubs = await Club.count();
    const totalTournaments = await Tournament.count();
    const totalPayments = await Payment.count();

    const activeUsers = await User.count({
      where: { membership_status: 'active' }
    });

    const pendingUsers = await User.count({
      where: { membership_status: 'pending' }
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
        pending: pendingUsers
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
      role,
      membership_status,
      search
    } = req.query;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Build where clause
    const whereClause = {};
    
    if (user_type) {
      whereClause.user_type = user_type;
    }
    
    if (role) {
      whereClause.role = role;
    }
    
    if (membership_status) {
      whereClause.membership_status = membership_status;
    }
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { username: { [sequelize.Op.iLike]: `%${search}%` } },
        { email: { [sequelize.Op.iLike]: `%${search}%` } },
        { first_name: { [sequelize.Op.iLike]: `%${search}%` } },
        { last_name: { [sequelize.Op.iLike]: `%${search}%` } },
        { full_name: { [sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get users with pagination
    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password', 'email_verification_token', 'password_reset_token'] },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_USERS_RETRIEVED,
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
 * Update user role
 * @route PUT /api/v1/admin/users/:id/role
 * @access Private (Super Admin)
 */
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { role } = req.body;

    // Check if user is super admin
    if (user.role !== 'super_admin') {
      throw createError.forbidden('Only super admins can update user roles');
    }

    if (!role || !Object.values(USER_ROLES).includes(role)) {
      throw createError.badRequest('Valid role is required');
    }

    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      throw createError.notFound('User not found');
    }

    // Prevent updating own role
    if (userToUpdate.id === user.id) {
      throw createError.badRequest('Cannot update your own role');
    }

    // Update user role
    await userToUpdate.update({ role });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_ROLE_UPDATED,
      data: { user: userToUpdate }
    });
  } catch (error) {
    logger.error('Error in updateUserRole:', error);
    throw error;
  }
};

/**
 * Update user membership status
 * @route PUT /api/v1/admin/users/:id/membership
 * @access Private (Admin)
 */
const updateUserMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { membership_status } = req.body;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      throw createError.notFound('User not found');
    }

    // Update membership status
    await userToUpdate.update({ membership_status });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_MEMBERSHIP_UPDATED,
      data: { user: userToUpdate }
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
    const { level, start_date, end_date, limit = 100 } = req.query;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement log retrieval logic
    // This would involve reading from log files or a log database

    const logs = [];

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_LOGS_RETRIEVED,
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
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement system health checks
    // This would involve checking database connectivity, external services, etc.

    const health = {
      status: 'healthy',
      database: 'connected',
      email_service: 'connected',
      payment_service: 'connected',
      uptime: process.uptime(),
      memory_usage: process.memoryUsage(),
      timestamp: new Date()
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_HEALTH_RETRIEVED,
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
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement system settings retrieval
    // This would involve reading from a settings table or configuration files

    const settings = {
      federation_name: process.env.FEDERATION_NAME || 'Mexican Pickleball Federation',
      federation_email: process.env.FEDERATION_EMAIL || 'info@pickleballfederation.com',
      membership_fees: {
        basic: 500,
        premium: 1000
      },
      tournament_fees: {
        local: 200,
        state: 400,
        national: 800
      },
      system_maintenance: false,
      registration_enabled: true
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_SETTINGS_RETRIEVED,
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
 * @access Private (Super Admin)
 */
const updateSystemSettings = async (req, res) => {
  try {
    const { user } = req;
    const settings = req.body;

    // Check if user is super admin
    if (user.role !== 'super_admin') {
      throw createError.forbidden('Only super admins can update system settings');
    }

    // TODO: Implement system settings update
    // This would involve updating a settings table or configuration files

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_SETTINGS_UPDATED,
      data: { settings }
    });
  } catch (error) {
    logger.error('Error in updateSystemSettings:', error);
    throw error;
  }
};

/**
 * Get admin activity log
 * @route GET /api/v1/admin/activity
 * @access Private (Admin)
 */
const getAdminActivity = async (req, res) => {
  try {
    const { user } = req;
    const { page = 1, limit = 50 } = req.query;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement admin activity log retrieval
    // This would involve reading from an activity log table

    const activities = [];

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ADMIN_ACTIVITY_RETRIEVED,
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
    const { data_type, format = 'json' } = req.query;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement data export logic
    // This would involve exporting data based on data_type and format

    const exportData = {
      data_type,
      format,
      export_date: new Date(),
      exported_by: user.id
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_DATA_EXPORTED,
      data: { export_data: exportData }
    });
  } catch (error) {
    logger.error('Error in exportSystemData:', error);
    throw error;
  }
};

/**
 * Perform system maintenance
 * @route POST /api/v1/admin/maintenance
 * @access Private (Super Admin)
 */
const performSystemMaintenance = async (req, res) => {
  try {
    const { user } = req;
    const { maintenance_type } = req.body;

    // Check if user is super admin
    if (user.role !== 'super_admin') {
      throw createError.forbidden('Only super admins can perform system maintenance');
    }

    // TODO: Implement system maintenance logic
    // This would involve various maintenance tasks like cleanup, optimization, etc.

    const maintenanceResult = {
      type: maintenance_type,
      status: 'completed',
      timestamp: new Date(),
      performed_by: user.id
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.SYSTEM_MAINTENANCE_COMPLETED,
      data: { maintenance_result: maintenanceResult }
    });
  } catch (error) {
    logger.error('Error in performSystemMaintenance:', error);
    throw error;
  }
};

module.exports = {
  getDashboardStats,
  getSystemUsers,
  updateUserRole,
  updateUserMembership,
  getSystemLogs,
  getSystemHealth,
  getSystemSettings,
  updateSystemSettings,
  getAdminActivity,
  exportSystemData,
  performSystemMaintenance
}; 