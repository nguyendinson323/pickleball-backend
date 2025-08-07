/**
 * Player Finder Model
 * 
 * This model handles location-based player matching and search functionality.
 * It stores player preferences, search criteria, and match results.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const PlayerFinder = sequelize.define('PlayerFinder', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Player who is searching
  searcher_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the player searching for matches'
  },

  // Search preferences
  skill_level_min: {
    type: DataTypes.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
    allowNull: true,
    comment: 'Minimum skill level preference'
  },

  skill_level_max: {
    type: DataTypes.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
    allowNull: true,
    comment: 'Maximum skill level preference'
  },

  preferred_gender: {
    type: DataTypes.ENUM('male', 'female', 'any'),
    defaultValue: 'any',
    allowNull: false,
    comment: 'Preferred gender for matches'
  },

  age_range_min: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 13,
      max: 100
    },
    comment: 'Minimum age preference'
  },

  age_range_max: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 13,
      max: 100
    },
    comment: 'Maximum age preference'
  },

  // Location preferences
  search_radius_km: {
    type: DataTypes.INTEGER,
    defaultValue: 50,
    allowNull: false,
    validate: {
      min: 1,
      max: 500
    },
    comment: 'Search radius in kilometers'
  },

  preferred_locations: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of preferred location coordinates or addresses'
  },

  // Match preferences
  match_type: {
    type: DataTypes.ENUM('singles', 'doubles', 'mixed_doubles', 'any'),
    defaultValue: 'any',
    allowNull: false,
    comment: 'Preferred match type'
  },

  availability_days: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of available days (0-6, Sunday-Saturday)'
  },

  availability_time_start: {
    type: DataTypes.TIME,
    allowNull: true,
    comment: 'Preferred start time for matches'
  },

  availability_time_end: {
    type: DataTypes.TIME,
    allowNull: true,
    comment: 'Preferred end time for matches'
  },

  // Communication preferences
  contact_method: {
    type: DataTypes.ENUM('email', 'phone', 'whatsapp', 'any'),
    defaultValue: 'any',
    allowNull: false,
    comment: 'Preferred contact method'
  },

  auto_notify: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether to automatically notify of new matches'
  },

  // Search status
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether the search is active'
  },

  last_search_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last time search was performed'
  },

  // Match results
  total_matches_found: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of matches found'
  },

  matches_contacted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of matches contacted'
  },

  successful_matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of successful matches'
  },

  // Metadata
  search_criteria: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Stored search criteria for quick re-search'
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional notes about search preferences'
  }

}, {
  tableName: 'player_finders',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['searcher_id']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['skill_level_min', 'skill_level_max']
    },
    {
      fields: ['match_type']
    }
  ]
});

// Instance methods
PlayerFinder.prototype.performSearch = async function() {
  // This method would implement the actual search logic
  // using Google Maps API and player matching algorithms
  this.last_search_date = new Date();
  await this.save();
};

PlayerFinder.prototype.getMatchScore = function(otherPlayer) {
  // Calculate compatibility score with another player
  let score = 0;
  
  // Skill level compatibility
  if (this.skill_level_min && this.skill_level_max) {
    const otherSkill = otherPlayer.skill_level;
    if (otherSkill >= this.skill_level_min && otherSkill <= this.skill_level_max) {
      score += 30;
    }
  }
  
  // Gender preference
  if (this.preferred_gender === 'any' || this.preferred_gender === otherPlayer.gender) {
    score += 20;
  }
  
  // Age compatibility
  if (this.age_range_min && this.age_range_max && otherPlayer.age) {
    if (otherPlayer.age >= this.age_range_min && otherPlayer.age <= this.age_range_max) {
      score += 25;
    }
  }
  
  // Location proximity (would use Google Maps API)
  // score += calculateDistanceScore(this.location, otherPlayer.location);
  
  return score;
};

// Class methods
PlayerFinder.findMatches = async function(searcherId, options = {}) {
  const {
    skillLevel,
    gender,
    ageRange,
    location,
    radius,
    matchType,
    limit = 20
  } = options;

  // This would implement the actual search logic
  // using Google Maps API for location-based search
  // and player matching algorithms
  
  return [];
};

PlayerFinder.getActiveSearches = async function() {
  return await this.findAll({
    where: {
      is_active: true
    },
    order: [['last_search_date', 'DESC']]
  });
};

module.exports = PlayerFinder; 