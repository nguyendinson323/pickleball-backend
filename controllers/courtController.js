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
      data: courts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
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

    res.status(HTTP_STATUS.OK).json(court);
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

    res.status(HTTP_STATUS.CREATED).json(createdCourt);
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

    const queryDate = date || new Date().toISOString().split('T')[0];
    
    // Get available time slots using the model method
    const availableSlots = await CourtReservation.getAvailableSlots(id, queryDate, 1);
    
    // Format availability data
    const availability = availableSlots.map(slot => ({
      start_time: slot.start_time.toISOString(),
      end_time: slot.end_time.toISOString(),
      available: slot.available
    }));

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_AVAILABILITY_RETRIEVED,
      data: availability
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

    const { date } = req.query;
    const queryDate = date || new Date().toISOString().split('T')[0];
    
    // Get actual bookings for the court
    const bookings = await CourtReservation.getCourtReservations(id, queryDate);
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    const totalBookings = bookings.length;
    const paginatedBookings = bookings.slice(offset, offset + parseInt(limit));
    const totalPages = Math.ceil(totalBookings / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_BOOKINGS_RETRIEVED,
      bookings: paginatedBookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalBookings,
        pages: totalPages
      }
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

/**
 * Get paginated list of court reservations
 * @route GET /api/v1/court-reservations
 * @access Private
 */
const getCourtReservations = async (req, res) => {
  try {
    const user = req.user;
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      user_id,
      court_id,
      club_id,
      status,
      start_date,
      end_date
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const whereClause = {};
    
    // Filter by user if not admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      whereClause.user_id = user.id;
    } else if (user_id) {
      whereClause.user_id = user_id;
    }
    
    if (court_id) {
      whereClause.court_id = court_id;
    }
    
    if (status) {
      whereClause.status = status;
    }
    
    // Date range filter
    if (start_date && end_date) {
      whereClause.start_time = {
        [Op.between]: [new Date(start_date), new Date(end_date)]
      };
    } else if (start_date) {
      whereClause.start_time = {
        [Op.gte]: new Date(start_date)
      };
    } else if (end_date) {
      whereClause.start_time = {
        [Op.lte]: new Date(end_date)
      };
    }

    // Include court, club, and user information
    const include = [
      {
        model: Court,
        as: 'court',
        attributes: ['id', 'name', 'court_type', 'surface', 'club_id'],
        include: [
          {
            model: Club,
            as: 'club',
            attributes: ['id', 'name', 'city', 'state'],
            where: club_id ? { id: club_id } : undefined
          }
        ]
      },
      {
        model: require('../db/models/User'),
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }
    ];

    const { count, rows: reservations } = await CourtReservation.findAndCountAll({
      where: whereClause,
      include,
      limit: parseInt(limit),
      offset,
      order: [['start_time', 'DESC']],
      distinct: true
    });

    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / parseInt(limit))
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_RESERVATIONS_RETRIEVED,
      data: reservations,
      pagination
    });
  } catch (error) {
    logger.error('Error in getCourtReservations:', error);
    throw error;
  }
};

/**
 * Cancel a court reservation
 * @route PUT /api/v1/court-reservations/:id/cancel
 * @access Private (Owner/Admin)
 */
const cancelCourtReservation = async (req, res) => {
  try {
    const user = req.user;
    const { id: reservationId } = req.params;

    // Find the reservation
    const reservation = await CourtReservation.findByPk(reservationId, {
      include: [
        {
          model: Court,
          as: 'court',
          include: [
            {
              model: Club,
              as: 'club'
            }
          ]
        }
      ]
    });

    if (!reservation) {
      throw createError.notFound('Reservation not found');
    }

    // Check if user can cancel this reservation
    const isOwner = reservation.user_id === user.id;
    const isClubOwner = reservation.court?.club?.owner_id === user.id;
    const isAdmin = ['admin', 'super_admin'].includes(user.role);

    if (!isOwner && !isClubOwner && !isAdmin) {
      throw createError.forbidden('You can only cancel your own reservations');
    }

    // Check if reservation can be cancelled
    if (reservation.status === 'cancelled') {
      throw createError.badRequest('Reservation is already cancelled');
    }

    if (reservation.status === 'completed') {
      throw createError.badRequest('Cannot cancel completed reservation');
    }

    // Update reservation status
    await reservation.update({
      status: 'cancelled',
      updated_at: new Date()
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.COURT_RESERVATION_CANCELLED,
      data: { reservation }
    });
  } catch (error) {
    logger.error('Error in cancelCourtReservation:', error);
    throw error;
  }
};

/**
 * Create a court reservation (alternative endpoint for frontend compatibility)
 * @route POST /api/v1/court-reservations
 * @access Private
 */
const createCourtReservation = async (req, res) => {
  try {
    const { user } = req;
    const { court_id } = req.body;
    
    // Forward to the existing bookCourt function
    req.params.id = court_id;
    return await bookCourt(req, res);
  } catch (error) {
    logger.error('Error in createCourtReservation:', error);
    throw error;
  }
};

/**
 * Check for booking conflicts
 * @route POST /api/v1/court-reservations/check-conflicts
 * @access Private
 */
const checkBookingConflicts = async (req, res) => {
  try {
    const { court_id, dates, start_time, duration_hours } = req.body;

    const court = await Court.findByPk(court_id);
    if (!court) {
      throw createError.notFound('Court not found');
    }

    const conflicts = [];

    for (const dateStr of dates) {
      const [hours, minutes] = start_time.split(':').map(Number);
      const startDateTime = new Date(dateStr);
      startDateTime.setHours(hours, minutes, 0, 0);
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setTime(endDateTime.getTime() + (duration_hours * 60 * 60 * 1000));

      // Check for existing reservations
      const existingReservation = await CourtReservation.findOne({
        where: {
          court_id: court_id,
          status: { [Op.in]: ['confirmed', 'pending'] },
          [Op.or]: [
            {
              start_time: { [Op.lt]: endDateTime },
              end_time: { [Op.gt]: startDateTime }
            }
          ]
        }
      });

      if (existingReservation) {
        conflicts.push({
          date: dateStr,
          time: start_time,
          existing_reservation_id: existingReservation.id
        });
      }
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Conflict check completed',
      data: { conflicts }
    });
  } catch (error) {
    logger.error('Error in checkBookingConflicts:', error);
    throw error;
  }
};

/**
 * Create recurring court reservations
 * @route POST /api/v1/court-reservations/recurring
 * @access Private
 */
const createRecurringReservation = async (req, res) => {
  try {
    const { user } = req;
    const { 
      court_id, 
      start_time, 
      duration_hours, 
      purpose, 
      match_type, 
      participants, 
      guest_count, 
      special_requests, 
      equipment_needed,
      recurrence 
    } = req.body;

    const court = await Court.findByPk(court_id, {
      include: [{ model: require('../db/models/Club'), as: 'club', attributes: ['id', 'name'] }]
    });
    if (!court) {
      throw createError.notFound('Court not found');
    }

    const startDate = new Date(start_time);
    const reservations = [];
    const conflicts = [];
    
    // Generate dates based on recurrence pattern
    const dates = [];
    let currentDate = new Date(startDate);
    let count = 0;
    const maxOccurrences = recurrence.max_occurrences || 10;
    const endDate = recurrence.end_date ? new Date(recurrence.end_date) : null;

    while (count < maxOccurrences && (!endDate || currentDate <= endDate)) {
      if (recurrence.pattern === 'daily') {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + recurrence.interval);
        count++;
      } else if (recurrence.pattern === 'weekly') {
        const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        if (recurrence.days_of_week && recurrence.days_of_week.includes(dayName)) {
          dates.push(new Date(currentDate));
          count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
        
        // Move to next week interval when we complete a week
        if (currentDate.getDay() === startDate.getDay() && count > 0) {
          currentDate.setDate(currentDate.getDate() + (7 * (recurrence.interval - 1)));
        }
      } else if (recurrence.pattern === 'monthly') {
        dates.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + recurrence.interval);
        count++;
      }

      // Safety break
      if (dates.length > 100) break;
    }

    // Create reservations for each date
    for (const reservationDate of dates) {
      const reservationStart = new Date(reservationDate);
      const [hours, minutes] = start_time.split('T')[1].split(':').slice(0, 2).map(Number);
      reservationStart.setHours(hours, minutes, 0, 0);
      
      const reservationEnd = new Date(reservationStart);
      reservationEnd.setTime(reservationEnd.getTime() + (duration_hours * 60 * 60 * 1000));

      // Check for conflicts
      const existingReservation = await CourtReservation.findOne({
        where: {
          court_id: court_id,
          status: { [Op.in]: ['confirmed', 'pending'] },
          [Op.or]: [
            {
              start_time: { [Op.lt]: reservationEnd },
              end_time: { [Op.gt]: reservationStart }
            }
          ]
        }
      });

      if (existingReservation) {
        conflicts.push({
          date: reservationDate.toISOString().split('T')[0],
          time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        });
        continue;
      }

      // Create reservation
      const reservationData = {
        court_id: court_id,
        user_id: user.id,
        club_id: court.club.id,
        start_time: reservationStart,
        end_time: reservationEnd,
        reservation_date: reservationDate.toISOString().split('T')[0],
        duration_hours: duration_hours,
        purpose,
        match_type,
        participants,
        guest_count: guest_count || 0,
        special_requests,
        equipment_needed,
        hourly_rate: court.hourly_rate || 0,
        total_amount: (court.hourly_rate || 0) * duration_hours,
        member_discount: 0,
        final_amount: (court.hourly_rate || 0) * duration_hours,
        booking_source: 'web',
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      };

      const reservation = await CourtReservation.create(reservationData);
      reservations.push(reservation);
    }

    logger.info(`Recurring reservations created: ${reservations.length} reservations for user ${user.id}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: `${reservations.length} recurring reservations created successfully`,
      data: { 
        reservations,
        conflicts,
        created_count: reservations.length,
        conflict_count: conflicts.length
      }
    });
  } catch (error) {
    logger.error('Error in createRecurringReservation:', error);
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
  getCourtStats,
  getCourtReservations,
  cancelCourtReservation,
  createCourtReservation,
  checkBookingConflicts,
  createRecurringReservation
}; 