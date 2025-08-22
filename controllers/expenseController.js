/**
 * Expense Controller
 * 
 * This controller handles all expense-related operations including
 * expense creation, tracking, reporting, and expense-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Expense, Tournament, Club, User, sequelize } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Create new expense
 * @route POST /api/v1/expenses
 * @access Private
 */
const createExpense = async (req, res) => {
  try {
    const { user } = req;
    const {
      description,
      amount,
      category,
      tournament_id,
      club_id,
      expense_date,
      receipt_url,
      notes
    } = req.body;

    // Validate that either tournament_id or club_id is provided
    if (!tournament_id && !club_id) {
      throw createError.badRequest('Either tournament_id or club_id must be provided');
    }

    // If tournament_id is provided, verify tournament exists and user has access
    if (tournament_id) {
      const tournament = await Tournament.findByPk(tournament_id);
      if (!tournament) {
        throw createError.notFound('Tournament not found');
      }

      // Check if user is tournament organizer or admin
      if (tournament.organizer_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
        throw createError.forbidden('Access denied');
      }
    }

    // If club_id is provided, verify club exists and user has access
    if (club_id) {
      const club = await Club.findByPk(club_id);
      if (!club) {
        throw createError.notFound('Club not found');
      }

      // Check if user is club owner or admin
      if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
        throw createError.forbidden('Access denied');
      }
    }

    // Create expense
    const expense = await Expense.create({
      description,
      amount,
      category,
      tournament_id,
      club_id,
      expense_date: expense_date || new Date(),
      receipt_url,
      notes,
      created_by: user.id
    });

    // Get created expense with related data
    const createdExpense = await Expense.findByPk(expense.id, {
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'name', 'tournament_type']
        },
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Expense created successfully',
      data: { expense: createdExpense }
    });
  } catch (error) {
    logger.error('Error in createExpense:', error);
    throw error;
  }
};

/**
 * Get paginated list of expenses
 * @route GET /api/v1/expenses
 * @access Private
 */
const getExpenses = async (req, res) => {
  try {
    const { user } = req;
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      category,
      start_date,
      end_date,
      tournament_id,
      club_id
    } = req.query;

    // Build where clause
    const whereClause = {};

    // If not admin, filter by user's tournaments and clubs
    if (!['admin', 'super_admin'].includes(user.role)) {
      const userTournaments = await Tournament.findAll({
        where: { organizer_id: user.id },
        attributes: ['id']
      });
      
      const userClubs = await Club.findAll({
        where: { owner_id: user.id },
        attributes: ['id']
      });

      const tournamentIds = userTournaments.map(t => t.id);
      const clubIds = userClubs.map(c => c.id);

      whereClause[sequelize.Op.or] = [
        { tournament_id: { [sequelize.Op.in]: tournamentIds } },
        { club_id: { [sequelize.Op.in]: clubIds } }
      ];
    }

    if (category) {
      whereClause.category = category;
    }

    if (start_date && end_date) {
      whereClause.expense_date = {
        [sequelize.Op.between]: [start_date, end_date]
      };
    } else if (start_date) {
      whereClause.expense_date = {
        [sequelize.Op.gte]: start_date
      };
    } else if (end_date) {
      whereClause.expense_date = {
        [sequelize.Op.lte]: end_date
      };
    }

    if (tournament_id) {
      whereClause.tournament_id = tournament_id;
    }

    if (club_id) {
      whereClause.club_id = club_id;
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get expenses with pagination
    const { count, rows: expenses } = await Expense.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'name', 'tournament_type']
        },
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }
      ],
      order: [['expense_date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Expenses retrieved successfully',
      data: {
        expenses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getExpenses:', error);
    throw error;
  }
};

/**
 * Get specific expense by ID
 * @route GET /api/v1/expenses/:id
 * @access Private
 */
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'name', 'tournament_type', 'organizer_id']
        },
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type', 'owner_id']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }
      ]
    });

    if (!expense) {
      throw createError.notFound('Expense not found');
    }

    // Check access permissions
    let hasAccess = false;
    if (['admin', 'super_admin'].includes(user.role)) {
      hasAccess = true;
    } else if (expense.tournament && expense.tournament.organizer_id === user.id) {
      hasAccess = true;
    } else if (expense.club && expense.club.owner_id === user.id) {
      hasAccess = true;
    }

    if (!hasAccess) {
      throw createError.forbidden('Access denied');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Expense retrieved successfully',
      data: { expense }
    });
  } catch (error) {
    logger.error('Error in getExpenseById:', error);
    throw error;
  }
};

/**
 * Update expense
 * @route PUT /api/v1/expenses/:id
 * @access Private
 */
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const updateData = req.body;

    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'organizer_id']
        },
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'owner_id']
        }
      ]
    });

    if (!expense) {
      throw createError.notFound('Expense not found');
    }

    // Check access permissions
    let hasAccess = false;
    if (['admin', 'super_admin'].includes(user.role)) {
      hasAccess = true;
    } else if (expense.tournament && expense.tournament.organizer_id === user.id) {
      hasAccess = true;
    } else if (expense.club && expense.club.owner_id === user.id) {
      hasAccess = true;
    }

    if (!hasAccess) {
      throw createError.forbidden('Access denied');
    }

    // Update expense
    await expense.update(updateData);

    // Get updated expense
    const updatedExpense = await Expense.findByPk(id, {
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'name', 'tournament_type']
        },
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'name', 'club_type']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Expense updated successfully',
      data: { expense: updatedExpense }
    });
  } catch (error) {
    logger.error('Error in updateExpense:', error);
    throw error;
  }
};

/**
 * Delete expense
 * @route DELETE /api/v1/expenses/:id
 * @access Private
 */
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'organizer_id']
        },
        {
          model: Club,
          as: 'club',
          attributes: ['id', 'owner_id']
        }
      ]
    });

    if (!expense) {
      throw createError.notFound('Expense not found');
    }

    // Check access permissions
    let hasAccess = false;
    if (['admin', 'super_admin'].includes(user.role)) {
      hasAccess = true;
    } else if (expense.tournament && expense.tournament.organizer_id === user.id) {
      hasAccess = true;
    } else if (expense.club && expense.club.owner_id === user.id) {
      hasAccess = true;
    }

    if (!hasAccess) {
      throw createError.forbidden('Access denied');
    }

    // Delete expense
    await expense.destroy();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    logger.error('Error in deleteExpense:', error);
    throw error;
  }
};

/**
 * Get expenses for a specific tournament
 * @route GET /api/v1/expenses/tournament/:tournamentId
 * @access Private
 */
const getExpensesByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { user } = req;

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      throw createError.notFound('Tournament not found');
    }

    // Check access permissions
    if (tournament.organizer_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const expenses = await Expense.findAll({
      where: { tournament_id: tournamentId },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }
      ],
      order: [['expense_date', 'DESC']]
    });

    // Calculate total
    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Tournament expenses retrieved successfully',
      data: {
        expenses,
        summary: {
          total_expenses: expenses.length,
          total_amount: totalAmount
        }
      }
    });
  } catch (error) {
    logger.error('Error in getExpensesByTournament:', error);
    throw error;
  }
};

/**
 * Get expenses for a specific club
 * @route GET /api/v1/expenses/club/:clubId
 * @access Private
 */
const getExpensesByClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { user } = req;

    const club = await Club.findByPk(clubId);
    if (!club) {
      throw createError.notFound('Club not found');
    }

    // Check access permissions
    if (club.owner_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const expenses = await Expense.findAll({
      where: { club_id: clubId },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }
      ],
      order: [['expense_date', 'DESC']]
    });

    // Calculate total
    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Club expenses retrieved successfully',
      data: {
        expenses,
        summary: {
          total_expenses: expenses.length,
          total_amount: totalAmount
        }
      }
    });
  } catch (error) {
    logger.error('Error in getExpensesByClub:', error);
    throw error;
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByTournament,
  getExpensesByClub
};