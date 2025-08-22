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
      data: tournaments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
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

    res.status(HTTP_STATUS.OK).json(tournament);
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

    res.status(HTTP_STATUS.CREATED).json(createdTournament);
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

    res.status(HTTP_STATUS.OK).json(tournaments);
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

/**
 * Assign referee to tournament
 * @route PUT /api/v1/tournaments/:id/assign-referee
 * @access Private (Admin/Organizer)
 */
const assignRefereeToTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { head_referee_id, assistant_referees = [], referee_compensation = 0 } = req.body;
    const { user } = req;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Check permissions
    const isAdmin = ['admin', 'super_admin'].includes(user.role);
    const isOrganizer = tournament.organizer_id === user.id;
    if (!isAdmin && !isOrganizer) {
      throw createError.forbidden('Access denied');
    }

    // Verify head referee is a coach
    if (head_referee_id) {
      const referee = await User.findByPk(head_referee_id);
      if (!referee || referee.user_type !== 'coach') {
        throw createError.badRequest('Head referee must be a registered coach');
      }
    }

    // Verify assistant referees are coaches
    if (assistant_referees.length > 0) {
      const assistantRefs = await User.findAll({
        where: { id: assistant_referees, user_type: 'coach' }
      });
      if (assistantRefs.length !== assistant_referees.length) {
        throw createError.badRequest('All assistant referees must be registered coaches');
      }
    }

    // Update tournament with referee assignments
    await tournament.update({
      head_referee_id,
      assistant_referees,
      referee_compensation
    });

    const updatedTournament = await Tournament.findByPk(id, {
      include: [
        {
          model: User,
          as: 'headReferee',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    logger.info(`Referee assigned to tournament ${id} by user ${user.id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Referee assigned successfully',
      data: { tournament: updatedTournament }
    });
  } catch (error) {
    logger.error('Error in assignRefereeToTournament:', error);
    throw error;
  }
};

/**
 * Assign referee to specific match
 * @route PUT /api/v1/tournaments/:tournamentId/matches/:matchId/assign-referee
 * @access Private (Admin/Organizer)
 */
const assignRefereeToMatch = async (req, res) => {
  try {
    const { tournamentId, matchId } = req.params;
    const { referee_id } = req.body;
    const { user } = req;

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    const match = await Match.findOne({
      where: { id: matchId, tournament_id: tournamentId }
    });
    if (!match) {
      throw createError.notFound('Match not found');
    }

    // Check permissions
    const isAdmin = ['admin', 'super_admin'].includes(user.role);
    const isOrganizer = tournament.organizer_id === user.id;
    if (!isAdmin && !isOrganizer) {
      throw createError.forbidden('Access denied');
    }

    // Verify referee is a coach
    if (referee_id) {
      const referee = await User.findByPk(referee_id);
      if (!referee || referee.user_type !== 'coach') {
        throw createError.badRequest('Referee must be a registered coach');
      }
    }

    // Update match with referee
    await match.update({ referee_id });

    const updatedMatch = await Match.findByPk(matchId, {
      include: [
        {
          model: User,
          as: 'referee',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        },
        {
          model: User,
          as: 'player1',
          attributes: ['id', 'username', 'first_name', 'last_name']
        },
        {
          model: User,
          as: 'player2',
          attributes: ['id', 'username', 'first_name', 'last_name']
        }
      ]
    });

    logger.info(`Referee ${referee_id} assigned to match ${matchId} by user ${user.id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Referee assigned to match successfully',
      data: { match: updatedMatch }
    });
  } catch (error) {
    logger.error('Error in assignRefereeToMatch:', error);
    throw error;
  }
};

/**
 * Get referee statistics
 * @route GET /api/v1/tournaments/referee-stats/:refereeId
 * @access Private
 */
const getRefereeStats = async (req, res) => {
  try {
    const { refereeId } = req.params;
    const { user } = req;

    // Check if requesting own stats or if admin
    const isAdmin = ['admin', 'super_admin'].includes(user.role);
    const isOwnStats = user.id === refereeId;
    if (!isAdmin && !isOwnStats) {
      throw createError.forbidden('Access denied');
    }

    const referee = await User.findByPk(refereeId);
    if (!referee || referee.user_type !== 'coach') {
      throw createError.notFound('Referee not found');
    }

    // Get tournament statistics
    const tournamentsAsHead = await Tournament.count({
      where: { head_referee_id: refereeId }
    });

    const tournamentsAsAssistant = await Tournament.count({
      where: {
        assistant_referees: {
          [require('sequelize').Op.contains]: [refereeId]
        }
      }
    });

    // Get match statistics
    const matchesRefereed = await Match.findAll({
      where: { referee_id: refereeId },
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'name', 'tournament_type', 'start_date', 'end_date']
        }
      ],
      order: [['actual_start_time', 'DESC']]
    });

    const totalMatches = matchesRefereed.length;
    const completedMatches = matchesRefereed.filter(m => m.status === 'completed').length;
    
    // Calculate total compensation
    const totalCompensation = await Tournament.sum('referee_compensation', {
      where: {
        [require('sequelize').Op.or]: [
          { head_referee_id: refereeId },
          {
            assistant_referees: {
              [require('sequelize').Op.contains]: [refereeId]
            }
          }
        ]
      }
    });

    const stats = {
      tournaments_as_head_referee: tournamentsAsHead,
      tournaments_as_assistant: tournamentsAsAssistant,
      total_tournaments: tournamentsAsHead + tournamentsAsAssistant,
      total_matches_refereed: totalMatches,
      completed_matches: completedMatches,
      completion_rate: totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0,
      total_compensation: totalCompensation || 0,
      recent_matches: matchesRefereed.slice(0, 10)
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Referee statistics retrieved successfully',
      data: { referee, stats }
    });
  } catch (error) {
    logger.error('Error in getRefereeStats:', error);
    throw error;
  }
};

/**
 * Get available referees for tournament
 * @route GET /api/v1/tournaments/:id/available-referees
 * @access Private (Admin/Organizer)
 */
const getAvailableReferees = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    const { user } = req;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Check permissions
    const isAdmin = ['admin', 'super_admin'].includes(user.role);
    const isOrganizer = tournament.organizer_id === user.id;
    if (!isAdmin && !isOrganizer) {
      throw createError.forbidden('Access denied');
    }

    // Get all coaches (potential referees)
    const allReferees = await User.findAll({
      where: { user_type: 'coach' },
      attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'state', 'city'],
      include: [
        {
          model: Match,
          as: 'refereeMatches',
          attributes: ['id', 'scheduled_time', 'status'],
          required: false
        },
        {
          model: Tournament,
          as: 'refereeTournaments',
          attributes: ['id', 'name', 'start_date', 'end_date'],
          required: false
        }
      ]
    });

    // Filter based on availability if date provided
    let availableReferees = allReferees;
    if (date) {
      const tournamentDate = new Date(date);
      availableReferees = allReferees.filter(referee => {
        const hasConflict = referee.refereeMatches.some(match => {
          if (match.status === 'cancelled') return false;
          const matchDate = new Date(match.scheduled_time);
          return matchDate.toDateString() === tournamentDate.toDateString();
        });
        return !hasConflict;
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Available referees retrieved successfully',
      data: { referees: availableReferees }
    });
  } catch (error) {
    logger.error('Error in getAvailableReferees:', error);
    throw error;
  }
};

/**
 * Get tournament reports
 * @route GET /api/v1/tournaments/reports
 * @access Private (Admin/Organizer)
 */
const getTournamentReports = async (req, res) => {
  try {
    const { user } = req;
    const {
      start_date,
      end_date,
      organizer_type,
      tournament_type,
      format = 'summary'
    } = req.query;

    // Build where clause
    const whereClause = {};
    
    if (start_date && end_date) {
      whereClause.start_date = {
        [sequelize.Op.between]: [start_date, end_date]
      };
    } else if (start_date) {
      whereClause.start_date = {
        [sequelize.Op.gte]: start_date
      };
    } else if (end_date) {
      whereClause.start_date = {
        [sequelize.Op.lte]: end_date
      };
    }

    if (tournament_type) {
      whereClause.tournament_type = tournament_type;
    }

    if (organizer_type) {
      whereClause.organizer_type = organizer_type;
    }

    // If not admin, filter by user's tournaments
    if (!['admin', 'super_admin'].includes(user.role)) {
      whereClause.organizer_id = user.id;
    }

    const tournaments = await Tournament.findAll({
      where: whereClause,
      include: [
        {
          model: TournamentRegistration,
          as: 'registrations',
          attributes: ['id', 'registration_date', 'status']
        }
      ],
      order: [['start_date', 'DESC']]
    });

    // Calculate report data
    const reportData = tournaments.map(tournament => {
      const registrations = tournament.registrations || [];
      const totalRegistrations = registrations.length;

      const baseData = {
        tournament_id: tournament.id,
        tournament_name: tournament.name,
        tournament_type: tournament.tournament_type,
        organizer_type: tournament.organizer_type,
        start_date: tournament.start_date,
        end_date: tournament.end_date,
        status: tournament.status,
        venue_name: tournament.venue_name,
        city: tournament.city,
        state: tournament.state,
        total_registrations: totalRegistrations
      };

      if (format === 'detailed') {
        return {
          ...baseData,
          registrations: {
            total: totalRegistrations,
            confirmed: registrations.filter(r => r.status === 'confirmed').length,
            pending: registrations.filter(r => r.status === 'pending').length,
            cancelled: registrations.filter(r => r.status === 'cancelled').length
          }
        };
      }

      return baseData;
    });

    // Calculate summary statistics
    const summary = {
      total_tournaments: tournaments.length,
      total_registrations: reportData.reduce((sum, t) => sum + t.total_registrations, 0),
      average_registrations_per_tournament: tournaments.length > 0 ? 
        reportData.reduce((sum, t) => sum + t.total_registrations, 0) / tournaments.length : 0,
      tournament_types: tournaments.reduce((acc, t) => {
        acc[t.tournament_type] = (acc[t.tournament_type] || 0) + 1;
        return acc;
      }, {}),
      organizer_types: tournaments.reduce((acc, t) => {
        acc[t.organizer_type] = (acc[t.organizer_type] || 0) + 1;
        return acc;
      }, {})
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Tournament reports retrieved successfully',
      data: {
        summary,
        tournaments: reportData,
        filters: {
          start_date,
          end_date,
          organizer_type,
          tournament_type,
          format
        }
      }
    });
  } catch (error) {
    logger.error('Error in getTournamentReports:', error);
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
  getTournamentStats,
  assignRefereeToTournament,
  assignRefereeToMatch,
  getRefereeStats,
  getAvailableReferees,
  getTournamentReports
}; 