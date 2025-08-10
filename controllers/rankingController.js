/**
 * Ranking Controller
 * 
 * This controller handles all ranking-related operations including
 * ranking management, calculations, and ranking-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Ranking, User, Tournament, TournamentRegistration } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, RANKING_POINTS, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Get rankings by category
 * @route GET /api/v1/rankings
 * @access Public
 */
const getRankings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      category,
      skill_level,
      state,
      search
    } = req.query;

    // Build where clause
    const whereClause = { is_current: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }
    
    if (state) {
      whereClause.state = state;
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get rankings with pagination
    const { count, rows: rankings } = await Ranking.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'skill_level', 'state']
        }
      ],
      order: [['position', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.RANKINGS_RETRIEVED,
      data: {
        rankings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getRankings:', error);
    throw createError.server('Failed to retrieve rankings');
  }
};

/**
 * Get top players
 * @route GET /api/v1/rankings/top
 * @access Public
 */
const getTopPlayers = async (req, res) => {
  try {
    const { category, skill_level, limit = 10 } = req.query;

    const whereClause = { is_current: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    const rankings = await Ranking.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'skill_level', 'state', 'profile_image']
        }
      ],
      order: [['position', 'ASC']],
      limit: parseInt(limit)
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOP_PLAYERS_RETRIEVED,
      data: { rankings }
    });
  } catch (error) {
    logger.error('Error in getTopPlayers:', error);
    throw error;
  }
};

/**
 * Get user rankings
 * @route GET /api/v1/rankings/user/:userId
 * @access Public
 */
const getUserRankings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { current_only = true } = req.query;

    const whereClause = { user_id: userId };
    
    if (current_only === 'true') {
      whereClause.is_current = true;
    }

    const rankings = await Ranking.findAll({
      where: whereClause,
      order: [['ranking_period', 'DESC']]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_RANKINGS_RETRIEVED,
      data: { rankings }
    });
  } catch (error) {
    logger.error('Error in getUserRankings:', error);
    throw error;
  }
};

/**
 * Get rankings by state
 * @route GET /api/v1/rankings/state/:state
 * @access Public
 */
const getStateRankings = async (req, res) => {
  try {
    const { state } = req.params;
    const { category, skill_level, limit = 50 } = req.query;

    const whereClause = { 
      state: state,
      is_current: true
    };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }

    const rankings = await Ranking.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'skill_level', 'profile_image']
        }
      ],
      order: [['position', 'ASC']],
      limit: parseInt(limit)
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.STATE_RANKINGS_RETRIEVED,
      data: { rankings }
    });
  } catch (error) {
    logger.error('Error in getStateRankings:', error);
    throw error;
  }
};

/**
 * Calculate rankings
 * @route POST /api/v1/rankings/calculate
 * @access Private (Admin)
 */
const calculateRankings = async (req, res) => {
  try {
    const { user } = req;
    const { category, skill_level, state } = req.body;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // TODO: Implement ranking calculation logic
    // This would involve:
    // 1. Getting all tournament results for the specified criteria
    // 2. Calculating points based on tournament performance
    // 3. Updating or creating ranking records
    // 4. Updating positions based on total points

    const calculationResult = {
      category: category || 'all',
      skill_level: skill_level || 'all',
      state: state || 'all',
      players_ranked: 0,
      calculation_date: new Date()
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.RANKINGS_CALCULATED,
      data: { calculation_result: calculationResult }
    });
  } catch (error) {
    logger.error('Error in calculateRankings:', error);
    throw error;
  }
};

/**
 * Update tournament results and recalculate rankings
 * @route POST /api/v1/rankings/update-tournament/:tournamentId
 * @access Private (Admin)
 */
const updateTournamentResults = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { user } = req;
    const { results } = req.body;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // TODO: Implement tournament results update logic
    // This would involve:
    // 1. Updating tournament registration results
    // 2. Calculating points for each participant
    // 3. Triggering ranking recalculation for affected categories

    const updateResult = {
      tournament_id: tournamentId,
      results_updated: results.length,
      rankings_affected: 0
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOURNAMENT_RESULTS_UPDATED,
      data: { update_result: updateResult }
    });
  } catch (error) {
    logger.error('Error in updateTournamentResults:', error);
    throw error;
  }
};

/**
 * Get ranking history
 * @route GET /api/v1/rankings/history
 * @access Public
 */
const getRankingHistory = async (req, res) => {
  try {
    const { user_id, category, skill_level, state, limit = 20 } = req.query;

    const whereClause = {};
    
    if (user_id) {
      whereClause.user_id = user_id;
    }
    
    if (category) {
      whereClause.category = category;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }
    
    if (state) {
      whereClause.state = state;
    }

    const rankings = await Ranking.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ],
      order: [['ranking_period', 'DESC']],
      limit: parseInt(limit)
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.RANKING_HISTORY_RETRIEVED,
      data: { rankings }
    });
  } catch (error) {
    logger.error('Error in getRankingHistory:', error);
    throw error;
  }
};

/**
 * Get ranking statistics
 * @route GET /api/v1/rankings/stats
 * @access Public
 */
const getRankingStats = async (req, res) => {
  try {
    const { category, skill_level, state } = req.query;

    const whereClause = { is_current: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }
    
    if (state) {
      whereClause.state = state;
    }

    // Get ranking statistics
    const totalRankings = await Ranking.count({ where: whereClause });
    
    const avgPointsResult = await Ranking.findOne({
      where: whereClause,
      attributes: [
        [sequelize.fn('AVG', sequelize.col('points')), 'average_points']
      ]
    });

    const avgPoints = parseFloat(avgPointsResult?.dataValues?.average_points || 0);

    const stats = {
      total_rankings: totalRankings,
      average_points: avgPoints,
      categories: ['singles', 'doubles', 'mixed_doubles'],
      skill_levels: ['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.RANKING_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getRankingStats:', error);
    throw error;
  }
};

/**
 * Export rankings
 * @route GET /api/v1/rankings/export
 * @access Private (Admin)
 */
const exportRankings = async (req, res) => {
  try {
    const { user } = req;
    const { category, skill_level, state, format = 'json' } = req.query;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const whereClause = { is_current: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (skill_level) {
      whereClause.skill_level = skill_level;
    }
    
    if (state) {
      whereClause.state = state;
    }

    const rankings = await Ranking.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name', 'skill_level', 'state']
        }
      ],
      order: [['position', 'ASC']]
    });

    // TODO: Implement export logic for different formats (CSV, Excel, etc.)
    const exportData = {
      rankings,
      export_date: new Date(),
      criteria: { category, skill_level, state }
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.RANKINGS_EXPORTED,
      data: { export_data: exportData }
    });
  } catch (error) {
    logger.error('Error in exportRankings:', error);
    throw error;
  }
};

module.exports = {
  getRankings,
  getTopPlayers,
  getUserRankings,
  getStateRankings,
  calculateRankings,
  updateTournamentResults,
  getRankingHistory,
  getRankingStats,
  exportRankings
}; 