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
const { API_MESSAGES, HTTP_STATUS, USER_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');
const { Op } = require('sequelize');

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
      whereClause[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { full_name: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get users with pagination
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

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] },
      include: [
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'business_name', 'state', 'city']
        }
      ]
    });

    if (!user) {
      throw createError.notFound('User not found');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_RETRIEVED,
      data: { user }
    });
  } catch (error) {
    logger.error('Error in getUserById:', error);
    throw error;
  }
};

/**
 * Update user
 * @route PUT /api/v1/users/:id
 * @access Private (Admin)
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      date_of_birth,
      gender,
      phone,
      profile_photo,
      bio,
      skill_level,
      state,
      city,
      address,
      latitude,
      longitude,
      timezone,
      business_name,
      contact_person,
      job_title,
      curp,
      rfc,
      website,
      membership_status,
      membership_expires_at,
      is_active,
      is_verified,
      club_id
    } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      throw createError.notFound('User not found');
    }

    // Prepare update data
    const updateData = {};
    
    if (full_name !== undefined) updateData.full_name = full_name;
    if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth;
    if (gender !== undefined) updateData.gender = gender;
    if (phone !== undefined) updateData.phone = phone;
    if (profile_photo !== undefined) updateData.profile_photo = profile_photo;
    if (bio !== undefined) updateData.bio = bio;
    if (skill_level !== undefined) updateData.skill_level = skill_level;
    if (state !== undefined) updateData.state = state;
    if (city !== undefined) updateData.city = city;
    if (address !== undefined) updateData.address = address;
    if (latitude !== undefined) updateData.latitude = latitude;
    if (longitude !== undefined) updateData.longitude = longitude;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (business_name !== undefined) updateData.business_name = business_name;
    if (contact_person !== undefined) updateData.contact_person = contact_person;
    if (job_title !== undefined) updateData.job_title = job_title;
    if (curp !== undefined) updateData.curp = curp;
    if (rfc !== undefined) updateData.rfc = rfc;
    if (website !== undefined) updateData.website = website;
    if (membership_status !== undefined) updateData.membership_status = membership_status;
    if (membership_expires_at !== undefined) updateData.membership_expires_at = membership_expires_at;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (is_verified !== undefined) updateData.is_verified = is_verified;
    if (club_id !== undefined) updateData.club_id = club_id;

    await User.update(updateData, { where: { id } });

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] }
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
 * Delete user (soft delete)
 * @route DELETE /api/v1/users/:id
 * @access Private (Admin)
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      throw createError.notFound('User not found');
    }

    // Soft delete
    await User.destroy({ where: { id } });

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
    const {
      q,
      user_type,
      skill_level,
      state,
      city,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query;

    if (!q) {
      throw createError.validation('Search query is required');
    }

    const whereClause = {
      [Op.or]: [
        { username: { [Op.iLike]: `%${q}%` } },
        { full_name: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } }
      ],
      is_active: true
    };

    if (user_type) {
      whereClause.user_type = user_type;
    }

    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    if (state) {
      whereClause.state = state;
    }

    if (city) {
      whereClause.city = city;
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
      message: API_MESSAGES.SUCCESS.USERS_SEARCHED,
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
    logger.error('Error in searchUsers:', error);
    throw error;
  }
};

/**
 * Get players
 * @route GET /api/v1/users/players
 * @access Private
 */
const getPlayers = async (req, res) => {
  try {
    const {
      skill_level,
      state,
      city,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query;

    const whereClause = {
      user_type: 'player',
      is_active: true
    };

    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    if (state) {
      whereClause.state = state;
    }

    if (city) {
      whereClause.city = city;
    }

    const offset = (page - 1) * limit;

    const { count, rows: players } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'full_name', 'profile_photo', 'bio', 'skill_level',
        'state', 'city', 'latitude', 'longitude', 'membership_status',
        'created_at'
      ],
      order: [['created_at', 'DESC']],
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
    throw error;
  }
};

/**
 * Get coaches
 * @route GET /api/v1/users/coaches
 * @access Private
 */
const getCoaches = async (req, res) => {
  try {
    const {
      skill_level,
      state,
      city,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query;

    const whereClause = {
      user_type: 'coach',
      is_active: true
    };

    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    if (state) {
      whereClause.state = state;
    }

    if (city) {
      whereClause.city = city;
    }

    const offset = (page - 1) * limit;

    const { count, rows: coaches } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'full_name', 'profile_photo', 'bio', 'skill_level',
        'state', 'city', 'latitude', 'longitude', 'website', 'membership_status',
        'created_at'
      ],
      order: [['created_at', 'DESC']],
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
    throw error;
  }
};

/**
 * Get clubs
 * @route GET /api/v1/users/clubs
 * @access Private
 */
const getClubs = async (req, res) => {
  try {
    const {
      state,
      city,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query;

    const whereClause = {
      user_type: 'club',
      is_active: true
    };

    if (state) {
      whereClause.state = state;
    }

    if (city) {
      whereClause.city = city;
    }

    const offset = (page - 1) * limit;

    const { count, rows: clubs } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'business_name', 'profile_photo', 'bio',
        'state', 'city', 'address', 'latitude', 'longitude', 'website',
        'contact_person', 'job_title', 'membership_status', 'created_at'
      ],
      order: [['created_at', 'DESC']],
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
    throw error;
  }
};

/**
 * Get states
 * @route GET /api/v1/users/states
 * @access Private
 */
const getStates = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      state,
      city
    } = req.query;

    // Build where clause
    const whereClause = {
      user_type: 'state',
      is_active: true
    };

    if (state) {
      whereClause.state = { [Op.iLike]: `%${state}%` };
    }

    if (city) {
      whereClause.city = { [Op.iLike]: `%${city}%` };
    }

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Get states with pagination
    const { count, rows: states } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'business_name', 'profile_photo', 'bio',
        'state', 'city', 'address', 'latitude', 'longitude', 'website',
        'contact_person', 'job_title', 'membership_status', 'created_at'
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.STATES_RETRIEVED,
      data: {
        states,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getStates:', error);
    throw error;
  }
};

/**
 * Get user statistics
 * @route GET /api/v1/users/stats
 * @access Private (Admin)
 */
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { is_active: true } });
    const verifiedUsers = await User.count({ where: { is_verified: true } });

    const userTypeStats = await User.findAll({
      attributes: [
        'user_type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['user_type']
    });

    const membershipStats = await User.findAll({
      attributes: [
        'membership_status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['membership_status']
    });

    const stateStats = await User.findAll({
      attributes: [
        'state',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { state: { [Op.ne]: null } },
      group: ['state'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 10
    });

    const stats = {
      total: totalUsers,
      active: activeUsers,
      verified: verifiedUsers,
      byType: userTypeStats,
      byMembership: membershipStats,
      byState: stateStats
    };

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
  getStates,
  getUserStats
}; 