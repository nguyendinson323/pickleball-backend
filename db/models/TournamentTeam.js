/**
 * Tournament Team Model
 * 
 * This model represents tournament teams in the Pickleball Federation system.
 * It handles team registrations for team tournaments.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const TournamentTeam = sequelize.define('TournamentTeam', {
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

  captain_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the team captain'
  },

  // Team information
  team_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Team name'
  },

  team_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Team number in tournament'
  },

  // Team details
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Team category'
  },

  division: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Team division'
  },

  skill_level: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Team skill level'
  },

  // Registration details
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    comment: 'Date and time of registration'
  },

  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'waitlist'),
    defaultValue: 'pending',
    allowNull: false,
    comment: 'Team registration status'
  },

  // Payment information
  entry_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Team entry fee'
  },

  payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
    defaultValue: 'pending',
    allowNull: false,
    comment: 'Payment status'
  },

  payment_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the payment record'
  },

  // Team composition
  max_players: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
    allowNull: false,
    comment: 'Maximum number of players allowed'
  },

  current_players: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Current number of players'
  },

  // Team performance
  final_position: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Final position in tournament'
  },

  points_earned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Ranking points earned'
  },

  matches_played: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of matches played'
  },

  matches_won: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of matches won'
  },

  // Team information
  team_logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Team logo URL'
  },

  team_colors: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Team colors'
  },

  // Additional information
  special_requests: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Special requests or notes'
  },

  // Metadata
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the team'
  }

}, {
  tableName: 'tournament_teams',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      unique: true,
      fields: ['tournament_id', 'team_name']
    },
    {
      fields: ['tournament_id']
    },
    {
      fields: ['captain_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['payment_status']
    }
  ]
});

// Instance methods
TournamentTeam.prototype.isConfirmed = function() {
  return this.status === 'confirmed';
};

TournamentTeam.prototype.isPaid = function() {
  return this.payment_status === 'paid';
};

TournamentTeam.prototype.canAddPlayer = function() {
  return this.current_players < this.max_players;
};

TournamentTeam.prototype.getWinPercentage = function() {
  if (this.matches_played === 0) return 0;
  return (this.matches_won / this.matches_played) * 100;
};

// Class methods
TournamentTeam.findByTournament = function(tournamentId) {
  return this.findAll({
    where: { tournament_id: tournamentId },
    order: [['registration_date', 'ASC']]
  });
};

TournamentTeam.findByCaptain = function(captainId) {
  return this.findAll({
    where: { captain_id: captainId },
    order: [['registration_date', 'DESC']]
  });
};

TournamentTeam.findConfirmed = function(tournamentId) {
  return this.findAll({
    where: {
      tournament_id: tournamentId,
      status: 'confirmed'
    }
  });
};

module.exports = TournamentTeam; 