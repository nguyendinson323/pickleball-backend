/**
 * Match Model
 * 
 * This model represents matches in the Pickleball Federation system.
 * It handles tournament matches with scores, results, and scheduling.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Match = sequelize.define('Match', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Foreign keys
  tournament_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the tournament'
  },

  court_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the court where match is played'
  },

  player1_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of player 1'
  },

  player2_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of player 2'
  },

  // Match details
  match_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Match number in tournament'
  },

  round: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Tournament round number'
  },

  match_type: {
    type: DataTypes.ENUM('singles', 'doubles', 'mixed_doubles'),
    allowNull: false,
    comment: 'Type of match'
  },

  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Match category (age group, skill level)'
  },

  // Scheduling
  scheduled_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Scheduled match time'
  },

  actual_start_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Actual match start time'
  },

  actual_end_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Actual match end time'
  },

  // Match status
  status: {
    type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled', 'postponed'),
    defaultValue: 'scheduled',
    allowNull: false,
    comment: 'Match status'
  },

  // Scoring
  player1_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Player 1 final score'
  },

  player2_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Player 2 final score'
  },

  // Game scores (best of 3 or 5)
  game_scores: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Individual game scores'
  },

  // Match result
  winner_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the winning player'
  },

  winner_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Winning score'
  },

  loser_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the losing player'
  },

  loser_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Losing score'
  },

  // Match duration
  duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Match duration in minutes'
  },

  // Match details
  format: {
    type: DataTypes.ENUM('best_of_3', 'best_of_5', 'single_game'),
    defaultValue: 'best_of_3',
    allowNull: false,
    comment: 'Match format'
  },

  points_to_win: {
    type: DataTypes.INTEGER,
    defaultValue: 11,
    allowNull: false,
    comment: 'Points needed to win a game'
  },

  win_by: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
    allowNull: false,
    comment: 'Points needed to win by'
  },

  // Officials
  referee_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the referee'
  },

  line_judges: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of line judge IDs'
  },

  // Match notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Match notes and comments'
  },

  // Disputes and appeals
  has_dispute: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether match has a dispute'
  },

  dispute_details: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Details of any dispute'
  },

  // Statistics
  total_rallies: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of rallies'
  },

  longest_rally: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Longest rally count'
  }

}, {
  tableName: 'matches',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['tournament_id']
    },
    {
      fields: ['court_id']
    },
    {
      fields: ['player1_id']
    },
    {
      fields: ['player2_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['scheduled_time']
    },
    {
      fields: ['winner_id']
    }
  ]
});

// Instance methods
Match.prototype.isCompleted = function() {
  return this.status === 'completed';
};

Match.prototype.isInProgress = function() {
  return this.status === 'in_progress';
};

Match.prototype.getWinner = function() {
  return this.winner_id;
};

Match.prototype.getLoser = function() {
  return this.loser_id;
};

Match.prototype.getDuration = function() {
  if (this.actual_start_time && this.actual_end_time) {
    const start = new Date(this.actual_start_time);
    const end = new Date(this.actual_end_time);
    return Math.round((end - start) / (1000 * 60)); // Duration in minutes
  }
  return null;
};

Match.prototype.updateScores = function(player1Score, player2Score) {
  this.player1_score = player1Score;
  this.player2_score = player2Score;
  
  if (player1Score > player2Score) {
    this.winner_id = this.player1_id;
    this.winner_score = player1Score;
    this.loser_id = this.player2_id;
    this.loser_score = player2Score;
  } else if (player2Score > player1Score) {
    this.winner_id = this.player2_id;
    this.winner_score = player2Score;
    this.loser_id = this.player1_id;
    this.loser_score = player1Score;
  }
};

// Class methods
Match.findByTournament = function(tournamentId) {
  return this.findAll({
    where: { tournament_id: tournamentId },
    order: [['round', 'ASC'], ['match_number', 'ASC']]
  });
};

Match.findByPlayer = function(playerId) {
  return this.findAll({
    where: {
      [sequelize.Op.or]: [
        { player1_id: playerId },
        { player2_id: playerId }
      ]
    },
    order: [['scheduled_time', 'DESC']]
  });
};

Match.findByCourt = function(courtId) {
  return this.findAll({
    where: { court_id: courtId },
    order: [['scheduled_time', 'ASC']]
  });
};

Match.findCompleted = function(tournamentId) {
  return this.findAll({
    where: {
      tournament_id: tournamentId,
      status: 'completed'
    },
    order: [['actual_end_time', 'DESC']]
  });
};

Match.findScheduled = function(tournamentId) {
  return this.findAll({
    where: {
      tournament_id: tournamentId,
      status: 'scheduled'
    },
    order: [['scheduled_time', 'ASC']]
  });
};

module.exports = Match; 