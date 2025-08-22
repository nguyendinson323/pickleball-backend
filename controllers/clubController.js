/**
 * Club Controller
 * 
 * This controller handles all club-related operations including
 * club management, listings, search, and club-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Club, User, Court, Tournament, CourtReservation, sequelize } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, CLUB_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Get paginated list of clubs
 * @route GET /api/v1/clubs
 * @access Public
 */
const getClubs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      state,
      city,
      club_type,
      has_courts,
      subscription_plan,
      search
    } = req.query;

    // Build where clause
    const whereClause = {};
    
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
    
    if (subscription_plan) {
      whereClause.subscription_plan = subscription_plan;
    }
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { name: { [sequelize.Op.iLike]: `%${search}%` } },
        { description: { [sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get clubs with pagination
    const { count, rows: clubs } = await Club.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUBS_RETRIEVED,
      data: clubs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
      }
    });
  } catch (error) {
    logger.error('Error in getClubs:', error);
    throw createError.server('Failed to retrieve clubs');
  }
};

/**
 * Get specific club by ID
 * @route GET /api/v1/clubs/:id
 * @access Public
 */
const getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name', 'email', 'phone']
        },
        {
          model: Court,
          as: 'courts',
          attributes: ['id', 'name', 'court_type', 'surface', 'is_available', 'hourly_rate']
        }
      ]
    });

    if (!club) {
      throw createError.notFound('Club not found');
    }

    res.status(HTTP_STATUS.OK).json(club);
  } catch (error) {
    logger.error('Error in getClubById:', error);
    throw error;
  }
};

/**
 * Create new club
 * @route POST /api/v1/clubs
 * @access Private (Authenticated)
 */
const createClub = async (req, res) => {
  try {
    const { user } = req;
    const clubData = req.body;

    // Check if user already has a club
    const existingClub = await Club.findOne({
      where: { owner_id: user.id }
    });

    if (existingClub) {
      throw createError.badRequest('User already has a club');
    }

    // Create club
    const club = await Club.create({
      ...clubData,
      owner_id: user.id
    });

    // Get created club with owner info
    const createdClub = await Club.findByPk(club.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.CREATED).json(createdClub);
  } catch (error) {
    logger.error('Error in createClub:', error);
    throw error;
  }
};

/**
 * Update club
 * @route PUT /api/v1/clubs/:id
 * @access Private (Owner/Admin)
 */
const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const updateData = req.body;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    // Check if user is owner or admin
    if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Update club
    await club.update(updateData);

    // Get updated club
    const updatedClub = await Club.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUB_UPDATED,
      data: { club: updatedClub }
    });
  } catch (error) {
    logger.error('Error in updateClub:', error);
    throw error;
  }
};

/**
 * Delete club
 * @route DELETE /api/v1/clubs/:id
 * @access Private (Owner/Admin)
 */
const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    // Check if user is owner or admin
    if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Soft delete club
    await club.destroy();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUB_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteClub:', error);
    throw error;
  }
};

/**
 * Search clubs
 * @route GET /api/v1/clubs/search
 * @access Public
 */
const searchClubs = async (req, res) => {
  try {
    const { q, state, city, club_type, limit = 20 } = req.query;

    if (!q) {
      throw createError.badRequest('Search query is required');
    }

    const whereClause = {
      [sequelize.Op.or]: [
        { name: { [sequelize.Op.iLike]: `%${q}%` } },
        { description: { [sequelize.Op.iLike]: `%${q}%` } }
      ]
    };

    if (state) {
      whereClause.state = state;
    }

    if (city) {
      whereClause.city = city;
    }

    if (club_type) {
      whereClause.club_type = club_type;
    }

    const clubs = await Club.findAll({
      where: whereClause,
      attributes: ['id', 'name', 'club_type', 'state', 'city', 'has_courts', 'subscription_plan', 'profile_image'],
      limit: parseInt(limit),
      order: [['name', 'ASC']]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUBS_SEARCHED,
      data: { clubs }
    });
  } catch (error) {
    logger.error('Error in searchClubs:', error);
    throw error;
  }
};

/**
 * Get clubs near a location
 * @route GET /api/v1/clubs/nearby
 * @access Public
 */
const getNearbyClubs = async (req, res) => {
  try {
    const { lat, lng, radius = 50, limit = 20 } = req.query;

    if (!lat || !lng) {
      throw createError.badRequest('Latitude and longitude are required');
    }

    // TODO: Implement location-based search using Google Maps API
    // For now, return all clubs
    const clubs = await Club.findAll({
      attributes: ['id', 'name', 'club_type', 'state', 'city', 'has_courts', 'latitude', 'longitude'],
      limit: parseInt(limit),
      order: [['name', 'ASC']]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.NEARBY_CLUBS_RETRIEVED,
      data: { clubs }
    });
  } catch (error) {
    logger.error('Error in getNearbyClubs:', error);
    throw error;
  }
};

/**
 * Get courts for a specific club
 * @route GET /api/v1/clubs/:id/courts
 * @access Public
 */
const getClubCourts = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    const courts = await Court.findAll({
      where: { club_id: id },
      order: [['name', 'ASC']]
    });

    res.status(HTTP_STATUS.OK).json(courts);
  } catch (error) {
    logger.error('Error in getClubCourts:', error);
    throw error;
  }
};

/**
 * Get tournaments organized by a club
 * @route GET /api/v1/clubs/:id/tournaments
 * @access Public
 */
const getClubTournaments = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    const offset = (page - 1) * limit;

    const { count, rows: tournaments } = await Tournament.findAndCountAll({
      where: { organizer_id: id, organizer_type: 'club' },
      order: [['start_date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json(tournaments);
  } catch (error) {
    logger.error('Error in getClubTournaments:', error);
    throw error;
  }
};

/**
 * Get members of a club
 * @route GET /api/v1/clubs/:id/members
 * @access Private (Club Owner/Admin)
 */
const getClubMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { page = 1, limit = 20 } = req.query;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    // Check if user is club owner or admin
    if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const offset = (page - 1) * limit;

    const { count, rows: members } = await User.findAndCountAll({
      where: { club_id: id },
      attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'user_type', 'skill_level', 'membership_status', 'joined_date'],
      order: [['joined_date', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUB_MEMBERS_RETRIEVED,
      data: {
        members,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getClubMembers:', error);
    throw error;
  }
};

/**
 * Get club statistics
 * @route GET /api/v1/clubs/:id/stats
 * @access Private (Club Owner/Admin)
 */
const getClubStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    // Check if user is club owner or admin
    if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Get club statistics
    const memberCount = await User.count({
      where: { club_id: id }
    });

    const courtCount = await Court.count({
      where: { club_id: id }
    });

    const tournamentCount = await Tournament.count({
      where: { organizer_id: id, organizer_type: 'club' }
    });

    const activeMembers = await User.count({
      where: { 
        club_id: id,
        membership_status: 'active'
      }
    });

    const stats = {
      total_members: memberCount,
      active_members: activeMembers,
      courts: courtCount,
      tournaments_organized: tournamentCount,
      membership_rate: memberCount > 0 ? (activeMembers / memberCount) * 100 : 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CLUB_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getClubStats:', error);
    throw error;
  }
};

/**
 * Get club court statistics
 * @route GET /api/v1/clubs/:id/court-stats
 * @access Private (Club Owner/Admin)
 */
const getClubCourtStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const club = await Club.findByPk(id);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    // Check if user is club owner or admin
    if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Get all courts for this club
    const courts = await Court.findAll({
      where: { club_id: id },
      attributes: ['id', 'name', 'court_type', 'surface', 'is_available', 'hourly_rate']
    });

    // Get detailed stats for each court
    const courtStats = await Promise.all(courts.map(async (court) => {
      const totalReservations = await CourtReservation.count({
        where: { court_id: court.id }
      });

      const completedReservations = await CourtReservation.count({
        where: { 
          court_id: court.id,
          status: 'completed'
        }
      });

      const upcomingReservations = await CourtReservation.count({
        where: { 
          court_id: court.id,
          status: 'confirmed',
          start_time: {
            [sequelize.Op.gte]: new Date()
          }
        }
      });

      const cancelledReservations = await CourtReservation.count({
        where: { 
          court_id: court.id,
          status: 'cancelled'
        }
      });

      return {
        court_id: court.id,
        court_name: court.name,
        court_type: court.court_type,
        surface: court.surface,
        is_available: court.is_available,
        hourly_rate: court.hourly_rate,
        total_reservations: totalReservations,
        completed_reservations: completedReservations,
        upcoming_reservations: upcomingReservations,
        cancelled_reservations: cancelledReservations,
        utilization_rate: totalReservations > 0 ? (completedReservations / totalReservations) * 100 : 0,
        cancellation_rate: totalReservations > 0 ? (cancelledReservations / totalReservations) * 100 : 0
      };
    }));

    // Calculate overall club court statistics
    const totalCourts = courts.length;
    const availableCourts = courts.filter(court => court.is_available).length;
    const totalReservationsAll = courtStats.reduce((sum, stat) => sum + stat.total_reservations, 0);
    const completedReservationsAll = courtStats.reduce((sum, stat) => sum + stat.completed_reservations, 0);
    const upcomingReservationsAll = courtStats.reduce((sum, stat) => sum + stat.upcoming_reservations, 0);

    const summary = {
      total_courts: totalCourts,
      available_courts: availableCourts,
      total_reservations: totalReservationsAll,
      completed_reservations: completedReservationsAll,
      upcoming_reservations: upcomingReservationsAll,
      overall_utilization_rate: totalReservationsAll > 0 ? (completedReservationsAll / totalReservationsAll) * 100 : 0,
      average_hourly_rate: courts.length > 0 ? courts.reduce((sum, court) => sum + (court.hourly_rate || 0), 0) / courts.length : 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Club court statistics retrieved successfully',
      data: {
        summary,
        court_stats: courtStats
      }
    });
  } catch (error) {
    logger.error('Error in getClubCourtStats:', error);
    throw error;
  }
};

module.exports = {
  getClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  searchClubs,
  getNearbyClubs,
  getClubCourts,
  getClubTournaments,
  getClubMembers,
  getClubStats,
  getClubCourtStats
}; 