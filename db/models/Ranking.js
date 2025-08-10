/**
 * Ranking Model
 * 
 * This model represents player rankings in the Pickleball Federation system.
 * It handles ranking points, positions, and historical ranking data.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Ranking = sequelize.define('Ranking', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Foreign keys
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the ranked user'
  },

  // Ranking details
  category: {
    type: DataTypes.ENUM('singles', 'doubles', 'mixed_doubles'),
    allowNull: false,
    comment: 'Ranking category'
  },

  skill_level: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'Skill level for this ranking'
  },

  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'State ranking (if applicable)'
  },

  // Ranking position and points
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Current ranking position'
  },

  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total ranking points'
  },

  previous_position: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Previous ranking position'
  },

  previous_points: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Previous ranking points'
  },

  // Tournament performance
  tournaments_played: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of tournaments played'
  },

  tournaments_won: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of tournaments won'
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

  win_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Win percentage'
  },

  // Recent performance
  recent_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Points earned in last 12 months'
  },

  best_finish: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Best tournament finish (1st, 2nd, etc.)'
  },

  // Ranking period
  ranking_period: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Date of this ranking calculation'
  },

  is_current: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether this is the current ranking'
  },

  // Ranking history
  ranking_history: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Historical ranking data'
  },

  // Metadata
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Notes about the ranking'
  }

}, {
  tableName: 'rankings',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'category', 'skill_level', 'state', 'ranking_period']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['category']
    },
    {
      fields: ['skill_level']
    },
    {
      fields: ['state']
    },
    {
      fields: ['position']
    },
    {
      fields: ['is_current']
    },
    {
      fields: ['ranking_period']
    }
  ]
});

// Instance methods
Ranking.prototype.getWinPercentage = function() {
  if (this.matches_played === 0) return 0;
  return (this.matches_won / this.matches_played) * 100;
};

Ranking.prototype.hasImproved = function() {
  if (!this.previous_position) return null;
  return this.position < this.previous_position;
};

Ranking.prototype.getPositionChange = function() {
  if (!this.previous_position) return 0;
  return this.previous_position - this.position;
};

Ranking.prototype.getPointsChange = function() {
  if (!this.previous_points) return 0;
  return this.points - this.previous_points;
};

Ranking.prototype.updateWinPercentage = function() {
  this.win_percentage = this.getWinPercentage();
};

// Class methods
Ranking.findByUser = function(userId, options = {}) {
  const where = { user_id: userId };
  
  if (options.currentOnly) {
    where.is_current = true;
  }
  
  if (options.category) {
    where.category = options.category;
  }

  return this.findAll({
    where,
    order: [['ranking_period', 'DESC']]
  });
};

Ranking.findByCategory = function(category, options = {}) {
  const where = { 
    category: category,
    is_current: true
  };
  
  if (options.skillLevel) {
    where.skill_level = options.skillLevel;
  }
  
  if (options.state) {
    where.state = options.state;
  }

  return this.findAll({
    where,
    order: [['position', 'ASC']],
    limit: options.limit || 100
  });
};

Ranking.findTopPlayers = function(category, limit = 10) {
  return this.findAll({
    where: {
      category: category,
      is_current: true
    },
    order: [['position', 'ASC']],
    limit: limit
  });
};

Ranking.findByState = function(state, category = null) {
  const where = {
    state: state,
    is_current: true
  };
  
  if (category) {
    where.category = category;
  }

  return this.findAll({
    where,
    order: [['position', 'ASC']]
  });
};

Ranking.findBySkillLevel = function(skillLevel, category = null) {
  const where = {
    skill_level: skillLevel,
    is_current: true
  };
  
  if (category) {
    where.category = category;
  }

  return this.findAll({
    where,
    order: [['position', 'ASC']]
  });
};

module.exports = Ranking; 