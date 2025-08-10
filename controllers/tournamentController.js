/**
 * Tournament Controller
 * 
 * This controller handles all tournament-related operations including
 * tournament management, registration, and tournament-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Tournament, User, TournamentRegistration, Match, Club } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, TOURNAMENT_STATUS, TOURNAMENT_TYPES, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Get paginated list of tournaments
 * @route GET /api/v1/tournaments
 * @access Public
 */
const getTournaments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      tournament_type,
      category,
      status,
      state,
      city,
      search
    } = req.query;

    // Build where clause
    const whereClause = {};
    
    if (tournament_type) {
      whereClause.tournament_type = tournament_type;
    }
    
    if (category) {
      whereClause.category = category;
    }
    
    if (status) {
      whereClause.status = status;
    }
    
    if (state) {
      whereClause.state = state;
    }
    
    if (city) {
      whereClause.city = city;
    }
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { name: { [sequelize.Op.iLike]: `%${search}%` } },
        { description: { [sequelize.Op.iLike]: `%${search}%` } },
        { venue_name: { [sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get tournaments with pagination
    const { count, rows: tournaments } = await Tournament.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ],
      order: [['start_date', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENTS_RETRIEVED,
      data: {
        tournaments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getTournaments:', error);
    throw createError.server('Failed to retrieve tournaments');
  }
};

/**
 * Get specific tournament by ID
 * @route GET /api/v1/tournaments/:id
 * @access Public
 */
const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findByPk(id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'username', 'full_name', 'email', 'phone']
        },
        {
          model: TournamentRegistration,
          as: 'registrations',
          include: [
            {
              model: User,
              as: 'participant',
              attributes: ['id', 'username', 'full_name', 'skill_level']
            }
          ]
        }
      ]
    });

    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_RETRIEVED,
      data: { tournament }
    });
  } catch (error) {
    logger.error('Error in getTournamentById:', error);
    throw error;
  }
};

/**
 * Create new tournament
 * @route POST /api/v1/tournaments
 * @access Private (Club/Partner/State/Federation)
 */
const createTournament = async (req, res) => {
  try {
    const { user } = req;
    const tournamentData = req.body;

    // Validate organizer permissions
    if (!['club', 'partner', 'state', 'federation'].includes(user.user_type)) {
      throw createError.forbidden('Only clubs, partners, states, and federation can create tournaments');
    }

    // Create tournament
    const tournament = await Tournament.create({
      ...tournamentData,
      organizer_id: user.id,
      organizer_type: user.user_type
    });

    // Get created tournament with organizer info
    const createdTournament = await Tournament.findByPk(tournament.id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'username', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_CREATED,
      data: { tournament: createdTournament }
    });
  } catch (error) {
    logger.error('Error in createTournament:', error);
    throw error;
  }
};

/**
 * Update tournament
 * @route PUT /api/v1/tournaments/:id
 * @access Private (Organizer/Admin)
 */
const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const updateData = req.body;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Check if user is organizer or admin
    if (tournament.organizer_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Update tournament
    await tournament.update(updateData);

    // Get updated tournament
    const updatedTournament = await Tournament.findByPk(id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_UPDATED,
      data: { tournament: updatedTournament }
    });
  } catch (error) {
    logger.error('Error in updateTournament:', error);
    throw error;
  }
};

/**
 * Delete tournament
 * @route DELETE /api/v1/tournaments/:id
 * @access Private (Organizer/Admin)
 */
const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Check if user is organizer or admin
    if (tournament.organizer_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Check if tournament has registrations
    const registrationCount = await TournamentRegistration.count({
      where: { tournament_id: id }
    });

    if (registrationCount > 0) {
      throw createError.badRequest('Cannot delete tournament with existing registrations');
    }

    // Soft delete tournament
    await tournament.destroy();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_DELETED
    });
  } catch (error) {
    logger.error('Error in deleteTournament:', error);
    throw error;
  }
};

/**
 * Register for tournament
 * @route POST /api/v1/tournaments/:id/register
 * @access Private (Player)
 */
const registerForTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const registrationData = req.body;

    // Check if user is a player
    if (user.user_type !== 'player') {
      throw createError.forbidden('Only players can register for tournaments');
    }

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Check if registration is open
    if (!tournament.isRegistrationOpen()) {
      throw createError.badRequest('Tournament registration is closed');
    }

    // Check if tournament is full
    if (tournament.isFull()) {
      throw createError.badRequest('Tournament is full');
    }

    // Check if user is already registered
    const existingRegistration = await TournamentRegistration.findOne({
      where: {
        tournament_id: id,
        user_id: user.id
      }
    });

    if (existingRegistration) {
      throw createError.badRequest('Already registered for this tournament');
    }

    // Create registration
    const registration = await TournamentRegistration.create({
      tournament_id: id,
      user_id: user.id,
      entry_fee: tournament.entry_fee,
      skill_level: user.skill_level,
      ...registrationData
    });

    // Update tournament participant count
    await tournament.increment('current_participants');

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_REGISTRATION_SUCCESSFUL,
      data: { registration }
    });
  } catch (error) {
    logger.error('Error in registerForTournament:', error);
    throw error;
  }
};

/**
 * Get tournament participants
 * @route GET /api/v1/tournaments/:id/participants
 * @access Public
 */
const getTournamentParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    const offset = (page - 1) * limit;

    const { count, rows: participants } = await TournamentRegistration.findAndCountAll({
      where: { tournament_id: id },
      include: [
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'skill_level', 'state']
        }
      ],
      order: [['registration_date', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_PARTICIPANTS_RETRIEVED,
      data: {
        participants,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getTournamentParticipants:', error);
    throw error;
  }
};

/**
 * Get tournament matches
 * @route GET /api/v1/tournaments/:id/matches
 * @access Public
 */
const getTournamentMatches = async (req, res) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    const matches = await Match.findAll({
      where: { tournament_id: id },
      include: [
        {
          model: User,
          as: 'player1',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        },
        {
          model: User,
          as: 'player2',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ],
      order: [['round', 'ASC'], ['match_number', 'ASC']]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_MATCHES_RETRIEVED,
      data: { matches }
    });
  } catch (error) {
    logger.error('Error in getTournamentMatches:', error);
    throw error;
  }
};

/**
 * Get upcoming tournaments
 * @route GET /api/v1/tournaments/upcoming
 * @access Public
 */
const getUpcomingTournaments = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const tournaments = await Tournament.findAll({
      where: {
        start_date: {
          [sequelize.Op.gte]: new Date()
        },
        status: {
          [sequelize.Op.in]: ['published', 'registration_open']
        }
      },
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ],
      order: [['start_date', 'ASC']],
      limit: parseInt(limit)
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.UPCOMING_TOURNAMENTS_RETRIEVED,
      data: { tournaments }
    });
  } catch (error) {
    logger.error('Error in getUpcomingTournaments:', error);
    throw error;
  }
};

/**
 * Get tournament statistics
 * @route GET /api/v1/tournaments/:id/stats
 * @access Public
 */
const getTournamentStats = async (req, res) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Get tournament statistics
    const participantCount = await TournamentRegistration.count({
      where: { tournament_id: id, status: 'confirmed' }
    });

    const matchCount = await Match.count({
      where: { tournament_id: id }
    });

    const completedMatches = await Match.count({
      where: { 
        tournament_id: id,
        status: 'completed'
      }
    });

    const stats = {
      total_participants: participantCount,
      total_matches: matchCount,
      completed_matches: completedMatches,
      completion_rate: matchCount > 0 ? (completedMatches / matchCount) * 100 : 0,
      registration_rate: tournament.max_participants > 0 ? (participantCount / tournament.max_participants) * 100 : 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getTournamentStats:', error);
    throw error;
  }
};

module.exports = {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  registerForTournament,
  getTournamentParticipants,
  getTournamentMatches,
  getUpcomingTournaments,
  getTournamentStats
}; 