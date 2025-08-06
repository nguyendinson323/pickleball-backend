/**
 * Tournament Registration Model
 * 
 * This model represents tournament registrations in the Pickleball Federation system.
 * It handles player registrations for tournaments with payment tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const TournamentRegistration = sequelize.define('TournamentRegistration', {
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

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the registered user'
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
    comment: 'Registration status'
  },

  // Payment information
  entry_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Entry fee amount'
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

  // Tournament category and division
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Tournament category (singles, doubles, etc.)'
  },

  division: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Division (age group, skill level, etc.)'
  },

  skill_level: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Player skill level at time of registration'
  },

  // Partner information (for doubles)
  partner_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of doubles partner'
  },

  partner_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Name of doubles partner'
  },

  // Additional information
  special_requests: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Special requests or notes'
  },

  dietary_restrictions: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Dietary restrictions for tournament meals'
  },

  emergency_contact: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Emergency contact information'
  },

  // Tournament performance
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

  // Metadata
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the registration'
  }

}, {
  tableName: 'tournament_registrations',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      unique: true,
      fields: ['tournament_id', 'user_id']
    },
    {
      fields: ['tournament_id']
    },
    {
      fields: ['user_id']
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
TournamentRegistration.prototype.isConfirmed = function() {
  return this.status === 'confirmed';
};

TournamentRegistration.prototype.isPaid = function() {
  return this.payment_status === 'paid';
};

TournamentRegistration.prototype.canCancel = function() {
  return this.status === 'pending' || this.status === 'confirmed';
};

// Class methods
TournamentRegistration.findByTournament = function(tournamentId) {
  return this.findAll({
    where: { tournament_id: tournamentId },
    order: [['registration_date', 'ASC']]
  });
};

TournamentRegistration.findByUser = function(userId) {
  return this.findAll({
    where: { user_id: userId },
    order: [['registration_date', 'DESC']]
  });
};

TournamentRegistration.findConfirmed = function(tournamentId) {
  return this.findAll({
    where: {
      tournament_id: tournamentId,
      status: 'confirmed'
    }
  });
};

module.exports = TournamentRegistration; 