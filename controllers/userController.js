/**
 * User Controller
 * 
 * This controller handles all user-related operations including
 * user management, profiles, search, and user-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { User, Club, Tournament, Payment, Ranking } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, USER_TYPES, USER_ROLES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Get paginated list of users
 * @route GET /api/v1/users
 * @access Private (Admin)
 */
const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      user_type,
      state,
      skill_level,
      membership_status,
      search
    } = req.query;

    // Build where clause
    const whereClause = {};
    
    if (user_type) {
      whereClause.user_type = user_type;
    }
    
    if (state) {
      whereClause.state = state;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
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
    logger.error('Error in getUsers:', error);
    throw createError.server('Failed to retrieve users');
  }
};

/**
 * Get specific user by ID
 * @route GET /api/v1/users/:id
 * @access Private
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // Check if user is requesting their own profile or is admin
    if (user.id !== id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const userData = await User.findByPk(id, {
      attributes: { exclude: ['password', 'email_verification_token', 'password_reset_token'] },
      include: [
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type', 'state', 'city']
        }
      ]
    });

    if (!userData) {
      throw createError.notFound('User not found');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_RETRIEVED,
      data: { user: userData }
    });
  } catch (error) {
    logger.error('Error in getUserById:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @route PUT /api/v1/users/:id
 * @access Private (Owner/Admin)
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const updateData = req.body;

    // Check if user is updating their own profile or is admin
    if (user.id !== id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      throw createError.notFound('User not found');
    }

    // Remove sensitive fields from update data
    delete updateData.password;
    delete updateData.email;
    delete updateData.role;
    delete updateData.user_type;

    // Update user
    await userToUpdate.update(updateData);

    // Get updated user data
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password', 'email_verification_token', 'password_reset_token'] }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_UPDATED,
      data: { user: updatedUser }
    });
  } catch (error) {
    logger.error('Error in updateUser:', error);
    throw error;
  }
};

/**
 * Delete user
 * @route DELETE /api/v1/users/:id
 * @access Private (Admin)
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await User.findByPk(id);
    if (!userToDelete) {
      throw createError.notFound('User not found');
    }

    // Check if user is trying to delete themselves
    if (req.user.id === id) {
      throw createError.badRequest('Cannot delete your own account');
    }

    // Soft delete user
    await userToDelete.destroy();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteUser:', error);
    throw error;
  }
};

/**
 * Search users
 * @route GET /api/v1/users/search
 * @access Private
 */
const searchUsers = async (req, res) => {
  try {
    const { q, user_type, state, skill_level, limit = 20 } = req.query;

    if (!q) {
      throw createError.badRequest('Search query is required');
    }

    const whereClause = {
      [sequelize.Op.or]: [
        { username: { [sequelize.Op.iLike]: `%${q}%` } },
        { first_name: { [sequelize.Op.iLike]: `%${q}%` } },
        { last_name: { [sequelize.Op.iLike]: `%${q}%` } },
        { full_name: { [sequelize.Op.iLike]: `%${q}%` } }
      ]
    };

    if (user_type) {
      whereClause.user_type = user_type;
    }

    if (state) {
      whereClause.state = state;
    }

    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    const users = await User.findAll({
      where: whereClause,
      attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'user_type', 'state', 'skill_level', 'profile_image'],
      limit: parseInt(limit),
      order: [['full_name', 'ASC']]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USERS_SEARCHED,
      data: { users }
    });
  } catch (error) {
    logger.error('Error in searchUsers:', error);
    throw error;
  }
};

/**
 * Get list of players
 * @route GET /api/v1/users/players
 * @access Public
 */
const getPlayers = async (req, res) => {
  try {
    const { page = 1, limit = 20, state, skill_level, search } = req.query;

    const whereClause = { user_type: USER_TYPES.PLAYER };
    
    if (state) {
      whereClause.state = state;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { username: { [sequelize.Op.iLike]: `%${search}%` } },
        { first_name: { [sequelize.Op.iLike]: `%${search}%` } },
        { last_name: { [sequelize.Op.iLike]: `%${search}%` } },
        { full_name: { [sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;
    
    const { count, rows: players } = await User.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'state', 'skill_level', 'profile_image', 'membership_status'],
      order: [['full_name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PLAYERS_RETRIEVED,
      data: {
        players,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getPlayers:', error);
    throw createError.server('Failed to retrieve players');
  }
};

/**
 * Get list of coaches
 * @route GET /api/v1/users/coaches
 * @access Public
 */
const getCoaches = async (req, res) => {
  try {
    const { page = 1, limit = 20, state, search } = req.query;

    const whereClause = { user_type: USER_TYPES.COACH };
    
    if (state) {
      whereClause.state = state;
    }
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { username: { [sequelize.Op.iLike]: `%${search}%` } },
        { first_name: { [sequelize.Op.iLike]: `%${search}%` } },
        { last_name: { [sequelize.Op.iLike]: `%${search}%` } },
        { full_name: { [sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;
    
    const { count, rows: coaches } = await User.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'state', 'profile_image', 'membership_status', 'certification_level'],
      order: [['full_name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COACHES_RETRIEVED,
      data: {
        coaches,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getCoaches:', error);
    throw createError.server('Failed to retrieve coaches');
  }
};

/**
 * Get list of clubs
 * @route GET /api/v1/users/clubs
 * @access Public
 */
const getClubs = async (req, res) => {
  try {
    const { page = 1, limit = 20, state, city, club_type, has_courts } = req.query;

    const whereClause = { user_type: USER_TYPES.CLUB };
    
    if (state) {
      whereClause.state = state;
    }
    
    if (city) {
      whereClause.city = city;
    }
    
    if (club_type) {
      whereClause.club_type = club_type;
    }
    
    if (has_courts !== undefined) {
      whereClause.has_courts = has_courts === 'true';
    }

    const offset = (page - 1) * limit;
    
    const { count, rows: clubs } = await User.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'username', 'club_name', 'club_type', 'state', 'city', 'profile_image', 'membership_status', 'has_courts', 'subscription_plan'],
      order: [['club_name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUBS_RETRIEVED,
      data: {
        clubs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getClubs:', error);
    throw createError.server('Failed to retrieve clubs');
  }
};

/**
 * Get user statistics
 * @route GET /api/v1/users/:id/stats
 * @access Private
 */
const getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // Check if user is requesting their own stats or is admin
    if (user.id !== id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const userData = await User.findByPk(id);
    if (!userData) {
      throw createError.notFound('User not found');
    }

    // Get user statistics based on user type
    let stats = {};

    if (userData.user_type === USER_TYPES.PLAYER) {
      // Get tournament participations
      const tournamentCount = await TournamentRegistration.count({
        where: { user_id: id }
      });

      // Get ranking data
      const rankings = await Ranking.findAll({
        where: { user_id: id, is_current: true }
      });

      // Get payment history
      const payments = await Payment.findAll({
        where: { user_id: id },
        attributes: ['amount', 'payment_type', 'status', 'created_at']
      });

      stats = {
        tournaments_participated: tournamentCount,
        rankings: rankings,
        total_payments: payments.length,
        total_spent: payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
      };
    } else if (userData.user_type === USER_TYPES.CLUB) {
      // Get club statistics
      const memberCount = await User.count({
        where: { club_id: id }
      });

      const tournamentCount = await Tournament.count({
        where: { organizer_id: id }
      });

      stats = {
        members: memberCount,
        tournaments_organized: tournamentCount
      };
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getUserStats:', error);
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  getPlayers,
  getCoaches,
  getClubs,
  getUserStats
}; 