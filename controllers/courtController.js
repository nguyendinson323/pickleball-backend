/**
 * Court Controller
 * 
 * This controller handles all court-related operations including
 * court management, availability, and court-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Op } = require('sequelize');
const { Court, Club, Match } = require('../db/models');
const CourtReservation = require('../db/models/CourtReservation');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, COURT_TYPES, COURT_SURFACES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Get paginated list of courts
 * @route GET /api/v1/courts
 * @access Public
 */
const getCourts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      club_id,
      court_type,
      surface,
      is_available,
      search
    } = req.query;

    // Build where clause
    const whereClause = {};
    
    if (club_id) {
      whereClause.club_id = club_id;
    }
    
    if (court_type) {
      whereClause.court_type = court_type;
    }
    
    if (surface) {
      whereClause.surface = surface;
    }
    
    if (is_available !== undefined) {
      whereClause.is_available = is_available === 'true';
    }
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get courts with pagination
    const { count, rows: courts } = await Court.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type', 'state', 'city']
        }
      ],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURTS_RETRIEVED,
      data: {
        courts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getCourts:', error);
    throw createError.server('Failed to retrieve courts');
  }
};

/**
 * Get specific court by ID
 * @route GET /api/v1/courts/:id
 * @access Public
 */
const getCourtById = async (req, res) => {
  try {
    const { id } = req.params;

    const court = await Court.findByPk(id, {
      include: [
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type', 'state', 'city', 'contact_email', 'contact_phone']
        }
      ]
    });

    if (!court) {
      throw createError.notFound('Court not found');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_RETRIEVED,
      data: { court }
    });
  } catch (error) {
    logger.error('Error in getCourtById:', error);
    throw error;
  }
};

/**
 * Create new court
 * @route POST /api/v1/courts
 * @access Private (Club Owner)
 */
const createCourt = async (req, res) => {
  try {
    const { user } = req;
    const courtData = req.body;

    // Check if user is a club owner
    if (user.user_type !== 'club') {
      throw createError.forbidden('Only club owners can create courts');
    }

    // Verify club ownership
    const club = await Club.findOne({
      where: { owner_id: user.id }
    });

    if (!club) {
      throw createError.forbidden('User does not own a club');
    }

    // Create court
    const court = await Court.create({
      ...courtData,
      club_id: club.id
    });

    // Get created court with club info
    const createdCourt = await Court.findByPk(court.id, {
      include: [
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type', 'state', 'city']
        }
      ]
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_CREATED,
      data: { court: createdCourt }
    });
  } catch (error) {
    logger.error('Error in createCourt:', error);
    throw error;
  }
};

/**
 * Update court
 * @route PUT /api/v1/courts/:id
 * @access Private (Club Owner/Admin)
 */
const updateCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const updateData = req.body;

    const court = await Court.findByPk(id, {
      include: [
        {
          model: Club,
          as: 'club'
        }
      ]
    });

    if (!court) {
      throw createError.notFound('Court not found');
    }

    // Check if user is club owner or admin
    if (court.club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Update court
    await court.update(updateData);

    // Get updated court
    const updatedCourt = await Court.findByPk(id, {
      include: [
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type', 'state', 'city']
        }
      ]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_UPDATED,
      data: { court: updatedCourt }
    });
  } catch (error) {
    logger.error('Error in updateCourt:', error);
    throw error;
  }
};

/**
 * Delete court
 * @route DELETE /api/v1/courts/:id
 * @access Private (Club Owner/Admin)
 */
const deleteCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const court = await Court.findByPk(id, {
      include: [
        {
          model: Club,
          as: 'club'
        }
      ]
    });

    if (!court) {
      throw createError.notFound('Court not found');
    }

    // Check if user is club owner or admin
    if (court.club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Check if court has scheduled matches
    const matchCount = await Match.count({
      where: { court_id: id }
    });

    if (matchCount > 0) {
      throw createError.badRequest('Cannot delete court with scheduled matches');
    }

    // Soft delete court
    await court.destroy();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteCourt:', error);
    throw error;
  }
};

/**
 * Get court availability
 * @route GET /api/v1/courts/:id/availability
 * @access Public
 */
const getCourtAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    const court = await Court.findByPk(id);
    if (!court) {
      throw createError.notFound('Court not found');
    }

    // TODO: Implement availability logic based on bookings and operating hours
    // For now, return basic availability
    const availability = {
      court_id: id,
      date: date || new Date().toISOString().split('T')[0],
      is_available: court.is_available && !court.is_maintenance,
      operating_hours: court.operating_hours || {},
      bookings: []
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_AVAILABILITY_RETRIEVED,
      data: { availability }
    });
  } catch (error) {
    logger.error('Error in getCourtAvailability:', error);
    throw error;
  }
};

/**
 * Get court bookings
 * @route GET /api/v1/courts/:id/bookings
 * @access Private (Court Owner/Admin)
 */
const getCourtBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { page = 1, limit = 20 } = req.query;

    const court = await Court.findByPk(id, {
      include: [
        {
          model: Club,
          as: 'club'
        }
      ]
    });

    if (!court) {
      throw createError.notFound('Court not found');
    }

    // Check if user is court owner or admin
    if (court.club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement booking retrieval logic
    // For now, return empty bookings
    const bookings = [];

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_BOOKINGS_RETRIEVED,
      data: { bookings }
    });
  } catch (error) {
    logger.error('Error in getCourtBookings:', error);
    throw error;
  }
};

/**
 * Book court
 * @route POST /api/v1/courts/:id/book
 * @access Private
 */
const bookCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { 
      start_time, 
      end_time, 
      purpose, 
      match_type, 
      participants, 
      guest_count,
      special_requests,
      equipment_needed,
      notes 
    } = req.body;

    const court = await Court.findByPk(id, {
      include: [{ model: Club, as: 'club', attributes: ['id', 'name'] }]
    });
    if (!court) {
      throw createError.notFound('Court not found');
    }

    // Check if court is available
    if (!court.is_available) {
      throw createError.badRequest('Court is not available for booking');
    }

    // Validate booking times
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);
    const now = new Date();

    if (startDate <= now) {
      throw createError.badRequest('Start time must be in the future');
    }

    if (endDate <= startDate) {
      throw createError.badRequest('End time must be after start time');
    }

    // Calculate duration
    const durationHours = (endDate - startDate) / (1000 * 60 * 60);

    // Create reservation object
    const reservationData = {
      court_id: id,
      user_id: user.id,
      club_id: court.club.id,
      start_time: startDate,
      end_time: endDate,
      reservation_date: startDate.toISOString().split('T')[0],
      duration_hours: durationHours,
      purpose,
      match_type,
      participants,
      guest_count: guest_count || 0,
      special_requests,
      equipment_needed,
      notes,
      hourly_rate: court.hourly_rate || 0,
      total_amount: (court.hourly_rate || 0) * durationHours,
      member_discount: 0, // TODO: Calculate based on user membership
      final_amount: (court.hourly_rate || 0) * durationHours,
      booking_source: 'web',
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    };

    // Check for overlapping reservations
    const overlapping = await CourtReservation.findOne({
      where: {
        court_id: id,
        status: { [Op.in]: ['confirmed', 'pending'] },
        [Op.or]: [
          {
            start_time: { [Op.lt]: endDate },
            end_time: { [Op.gt]: startDate }
          }
        ]
      }
    });

    if (overlapping) {
      throw createError.badRequest('Court is already booked for this time period');
    }

    // Create the reservation
    const reservation = await CourtReservation.create(reservationData);

    logger.info(`Court booked: Court ${id} by User ${user.id} for ${startDate}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_BOOKED,
      data: {
        reservation,
        payment_required: reservation.final_amount > 0,
        payment_amount: reservation.final_amount
      }
    });
  } catch (error) {
    logger.error('Error in bookCourt:', error);
    throw error;
  }
};

/**
 * Get court statistics
 * @route GET /api/v1/courts/:id/stats
 * @access Private (Court Owner/Admin)
 */
const getCourtStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const court = await Court.findByPk(id, {
      include: [
        {
          model: Club,
          as: 'club'
        }
      ]
    });

    if (!court) {
      throw createError.notFound('Court not found');
    }

    // Check if user is court owner or admin
    if (court.club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Get court statistics
    const matchCount = await Match.count({
      where: { court_id: id }
    });

    const completedMatches = await Match.count({
      where: { 
        court_id: id,
        status: 'completed'
      }
    });

    const stats = {
      total_matches: matchCount,
      completed_matches: completedMatches,
      utilization_rate: court.total_hours > 0 ? (court.used_hours / court.total_hours) * 100 : 0,
      average_rating: court.average_rating || 0,
      total_bookings: court.total_bookings || 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getCourtStats:', error);
    throw error;
  }
};

module.exports = {
  getCourts,
  getCourtById,
  createCourt,
  updateCourt,
  deleteCourt,
  getCourtAvailability,
  getCourtBookings,
  bookCourt,
  getCourtStats
}; 