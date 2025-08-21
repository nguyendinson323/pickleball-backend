/**
 * Player Finder Controller
 * 
 * Handles location-based player matching, search functionality,
 * and player discovery features.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Op } = require('sequelize');
const createError = require('http-errors');
const PlayerFinder = require('../db/models/PlayerFinder');
const User = require('../db/models/User');
const { HTTP_STATUS, API_MESSAGES } = require('../config/constants');
const logger = require('../config/logger');
const { asyncHandler } = require('../middlewares/errorHandler');
const playerFinderService = require('../services/playerFinderService');

/**
 * Search for players based on location and criteria
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchPlayers = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      radius = 50,
      skill_level,
      gender,
      age_min,
      age_max,
      match_type,
      page = 1,
      limit = 20
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {
      user_type: 'player',
      is_active: true,
      email_verified: true,
      can_be_found: true  // Only show players who have enabled visibility
    };

    // Apply filters
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    if (gender && gender !== 'any') {
      whereClause.gender = gender;
    }

    if (age_min || age_max) {
      whereClause.date_of_birth = {};
      
      if (age_max) {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - age_max - 1);
        whereClause.date_of_birth[Op.gte] = minDate;
      }
      
      if (age_min) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - age_min);
        whereClause.date_of_birth[Op.lte] = maxDate;
      }
    }

    // Location-based search (simplified - would use Google Maps API)
    if (latitude && longitude) {
      // This is a simplified version. In production, you would:
      // 1. Use Google Maps API to calculate distances
      // 2. Filter by actual distance within radius
      // 3. Sort by distance
      whereClause[Op.and] = [
        { latitude: { [Op.not]: null } },
        { longitude: { [Op.not]: null } }
      ];
    }

    const { count, rows: players } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id',
        'username',
        'first_name',
        'last_name',
        'full_name',
        'skill_level',
        'gender',
        'age',
        'state',
        'city',
        'latitude',
        'longitude',
        'profile_photo',
        'membership_status',
        'last_login'
      ],
      order: [
        ['last_login', 'DESC'],
        ['created_at', 'DESC']
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Calculate distances and filter by radius (simplified)
    let filteredPlayers = players;
    if (latitude && longitude) {
      filteredPlayers = players.filter(player => {
        if (!player.latitude || !player.longitude) return false;
        
        // Simple distance calculation (Haversine formula would be better)
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(player.latitude),
          parseFloat(player.longitude)
        );
        
        return distance <= radius;
      });
    }

    const totalPages = Math.ceil(count / limit);

    logger.info(`Player search performed: ${filteredPlayers.length} results`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: filteredPlayers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Create or update player finder preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateFinderPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      skill_level_min,
      skill_level_max,
      preferred_gender,
      age_range_min,
      age_range_max,
      search_radius_km,
      preferred_locations,
      match_type,
      availability_days,
      availability_time_start,
      availability_time_end,
      contact_method,
      auto_notify,
      notes
    } = req.body;

    // Find existing preferences or create new ones
    let finder = await PlayerFinder.findOne({
      where: { searcher_id: userId }
    });

    if (finder) {
      await finder.update({
        skill_level_min,
        skill_level_max,
        preferred_gender,
        age_range_min,
        age_range_max,
        search_radius_km,
        preferred_locations,
        match_type,
        availability_days,
        availability_time_start,
        availability_time_end,
        contact_method,
        auto_notify,
        notes
      });
    } else {
      finder = await PlayerFinder.create({
        searcher_id: userId,
        skill_level_min,
        skill_level_max,
        preferred_gender,
        age_range_min,
        age_range_max,
        search_radius_km,
        preferred_locations,
        match_type,
        availability_days,
        availability_time_start,
        availability_time_end,
        contact_method,
        auto_notify,
        notes
      });
    }

    logger.info(`Player finder preferences updated: ${userId}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Player finder preferences updated successfully',
      data: finder
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get player finder preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFinderPreferences = async (req, res) => {
  try {
    const userId = req.user.id;

    const finder = await PlayerFinder.findOne({
      where: { searcher_id: userId }
    });

    if (!finder) {
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'No preferences found',
        data: null
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: finder
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Toggle player finder active status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const toggleFinderStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const finder = await PlayerFinder.findOne({
      where: { searcher_id: userId }
    });

    if (!finder) {
      throw createError.notFound('Player finder preferences not found');
    }

    finder.is_active = !finder.is_active;
    await finder.save();

    logger.info(`Player finder status toggled: ${userId} - ${finder.is_active ? 'active' : 'inactive'}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: finder.is_active ? 'Player finder activated' : 'Player finder deactivated',
      data: finder
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get nearby players for a specific user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getNearbyPlayers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

    // Get user's location
    const user = await User.findByPk(userId, {
      attributes: ['latitude', 'longitude', 'skill_level', 'gender']
    });

    if (!user || !user.latitude || !user.longitude) {
      throw createError.badRequest('User location not available');
    }

    // Get user's finder preferences
    const finder = await PlayerFinder.findOne({
      where: { searcher_id: userId }
    });

    const whereClause = {
      user_type: 'player',
      is_active: true,
      email_verified: true,
      id: { [Op.ne]: userId }, // Exclude self
      latitude: { [Op.not]: null },
      longitude: { [Op.not]: null }
    };

    // Apply preferences if available
    if (finder) {
      if (finder.skill_level_min && finder.skill_level_max) {
        whereClause.skill_level = {
          [Op.between]: [finder.skill_level_min, finder.skill_level_max]
        };
      }

      if (finder.preferred_gender && finder.preferred_gender !== 'any') {
        whereClause.gender = finder.preferred_gender;
      }
    }

    const players = await User.findAll({
      where: whereClause,
      attributes: [
        'id',
        'username',
        'first_name',
        'last_name',
        'full_name',
        'skill_level',
        'gender',
        'age',
        'state',
        'city',
        'latitude',
        'longitude',
        'profile_photo',
        'last_login'
      ],
      limit: parseInt(limit)
    });

    // Calculate distances and sort by proximity
    const playersWithDistance = players.map(player => {
      const distance = calculateDistance(
        user.latitude,
        user.longitude,
        player.latitude,
        player.longitude
      );

      return {
        ...player.toJSON(),
        distance_km: distance
      };
    });

    // Sort by distance
    playersWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    logger.info(`Nearby players found: ${playersWithDistance.length} for user ${userId}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: playersWithDistance
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Send match request to another player
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendMatchRequest = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const { message, preferred_date, preferred_time, match_type } = req.body;
    const senderId = req.user.id;

    // Validate target user
    const targetUser = await User.findByPk(targetUserId);
    if (!targetUser || targetUser.user_type !== 'player') {
      throw createError.notFound('Target player not found');
    }

    // Check if user is not sending request to themselves
    if (targetUserId === senderId) {
      throw createError.badRequest('Cannot send match request to yourself');
    }

    // TODO: Create match request model and save the request
    // For now, we'll just return a success response

    logger.info(`Match request sent: ${senderId} to ${targetUserId}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Match request sent successfully',
      data: {
        target_user: {
          id: targetUser.id,
          username: targetUser.username,
          full_name: targetUser.full_name
        },
        message,
        preferred_date,
        preferred_time,
        match_type
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get player finder statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFinderStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const finder = await PlayerFinder.findOne({
      where: { searcher_id: userId }
    });

    if (!finder) {
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'No finder statistics available',
        data: {
          total_matches_found: 0,
          matches_contacted: 0,
          successful_matches: 0,
          is_active: false
        }
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: {
        total_matches_found: finder.total_matches_found,
        matches_contacted: finder.matches_contacted,
        successful_matches: finder.successful_matches,
        is_active: finder.is_active,
        last_search_date: finder.last_search_date
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

/**
 * Find nearby coaches
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const findCoaches = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      radius = 50,
      skill_level,
      specialization,
      page = 1,
      limit = 20
    } = req.query;

    const userId = req.user ? req.user.id : null;

    const coaches = await playerFinderService.findNearbyCoaches({
      searcherId: userId,
      latitude,
      longitude,
      radius,
      skillLevel: skill_level ? { exact: skill_level } : null,
      specialization
    });

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedCoaches = coaches.slice(startIndex, endIndex);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: paginatedCoaches,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: coaches.length,
        pages: Math.ceil(coaches.length / limit)
      }
    });

  } catch (error) {
    logger.error('Error finding coaches:', error);
    throw error;
  }
};

/**
 * Update player visibility (can be found) setting
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateVisibility = async (req, res) => {
  try {
    const { can_be_found } = req.body;
    const userId = req.user.id;

    if (typeof can_be_found !== 'boolean') {
      throw createError.badRequest('can_be_found must be a boolean value');
    }

    const result = await playerFinderService.updatePlayerVisibility(userId, can_be_found);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Player visibility ${can_be_found ? 'enabled' : 'disabled'} successfully`,
      data: result
    });

  } catch (error) {
    logger.error('Error updating player visibility:', error);
    throw error;
  }
};

/**
 * Create a player finder request with automatic matching
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createFinderRequest = async (req, res) => {
  try {
    const searchRequest = {
      searcher_id: req.user.id,
      ...req.body,
      search_location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      },
      is_active: true
    };

    const savedRequest = await playerFinderService.saveSearchRequest(searchRequest);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Player finder request created. You will be notified when matches are found.',
      data: savedRequest
    });

  } catch (error) {
    logger.error('Error creating finder request:', error);
    throw error;
  }
};

module.exports = {
  searchPlayers,
  updateFinderPreferences,
  getFinderPreferences,
  toggleFinderStatus,
  getNearbyPlayers,
  sendMatchRequest,
  getFinderStats,
  findCoaches,
  updateVisibility,
  createFinderRequest
}; 