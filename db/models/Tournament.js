/**
 * Tournament Model
 * 
 * This model represents tournaments in the Pickleball Federation system.
 * It handles different types of tournaments with various categories and skill levels.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { 
  TOURNAMENT_TYPES, 
  TOURNAMENT_CATEGORIES, 
  TOURNAMENT_STATUS, 
  SKILL_LEVELS 
} = require('../../config/constants');

const Tournament = sequelize.define('Tournament', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Tournament information
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Tournament name'
  },

  tournament_type: {
    type: DataTypes.ENUM(Object.values(TOURNAMENT_TYPES)),
    allowNull: false,
    defaultValue: TOURNAMENT_TYPES.LOCAL,
    comment: 'Type of tournament: local, state, national, international, exhibition, league'
  },

  category: {
    type: DataTypes.ENUM(Object.values(TOURNAMENT_CATEGORIES)),
    allowNull: false,
    defaultValue: TOURNAMENT_CATEGORIES.SINGLES,
    comment: 'Tournament category: singles, doubles, mixed_doubles, team'
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Tournament description'
  },

  // Organizer information
  organizer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the organizing entity (club, partner, state, federation)'
  },

  organizer_type: {
    type: DataTypes.ENUM('club', 'partner', 'state', 'federation'),
    allowNull: false,
    comment: 'Type of organizing entity'
  },

  organizer_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Name of the organizing entity'
  },

  // Location information
  venue_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Tournament venue name'
  },

  venue_address: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Tournament venue address'
  },

  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'State where tournament is held'
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'City where tournament is held'
  },

  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
    comment: 'Venue latitude'
  },

  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
    comment: 'Venue longitude'
  },

  // Tournament details
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Tournament start date and time'
  },

  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Tournament end date and time'
  },

  registration_deadline: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Registration deadline'
  },

  // Capacity and participants
  max_participants: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Maximum number of participants'
  },

  current_participants: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Current number of registered participants'
  },

  min_participants: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
    allowNull: false,
    comment: 'Minimum participants required for tournament'
  },

  // Skill level requirements
  skill_levels: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of allowed skill levels'
  },

  age_groups: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of age groups (e.g., ["18-30", "31-50", "50+"])'
  },

  gender_categories: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of gender categories (e.g., ["male", "female", "mixed"])'
  },

  // Tournament format
  format: {
    type: DataTypes.ENUM('single_elimination', 'double_elimination', 'round_robin', 'swiss_system', 'custom'),
    defaultValue: 'single_elimination',
    allowNull: false,
    comment: 'Tournament format'
  },

  max_teams: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Maximum number of teams (for team tournaments)'
  },

  current_teams: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Current number of registered teams'
  },

  // Financial information
  entry_fee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Tournament entry fee'
  },

  prize_pool: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Total prize pool amount'
  },

  prize_distribution: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Prize distribution structure (e.g., {"1st": 50, "2nd": 30, "3rd": 20})'
  },

  // Tournament status
  status: {
    type: DataTypes.ENUM(Object.values(TOURNAMENT_STATUS)),
    defaultValue: TOURNAMENT_STATUS.DRAFT,
    allowNull: false,
    comment: 'Current tournament status'
  },

  // Rules and regulations
  rules: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Tournament rules and regulations'
  },

  equipment_requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Equipment requirements for participants'
  },

  dress_code: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Dress code requirements'
  },

  // Schedule and logistics
  schedule: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Detailed tournament schedule'
  },

  court_assignments: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Court assignments for matches'
  },

  // Media and branding
  banner_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Tournament banner image URL'
  },

  logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Tournament logo URL'
  },

  photos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of tournament photo URLs'
  },

  // Communication
  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true
    },
    comment: 'Tournament contact email'
  },

  contact_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Tournament contact phone'
  },

  // Registration and participation
  registration_requirements: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Registration requirements (documents, forms, etc.)'
  },

  registration_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional registration notes'
  },

  // Statistics and metrics
  total_matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of matches in tournament'
  },

  completed_matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of completed matches'
  },

  // Settings and configuration
  settings: {
    type: DataTypes.JSON,
    defaultValue: {},
    allowNull: false,
    comment: 'Tournament settings and configuration'
  },

  // Admin notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the tournament'
  }

}, {
  tableName: 'tournaments',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['tournament_type']
    },
    {
      fields: ['category']
    },
    {
      fields: ['status']
    },
    {
      fields: ['start_date']
    },
    {
      fields: ['state']
    },
    {
      fields: ['city']
    },
    {
      fields: ['organizer_id']
    },
    {
      fields: ['organizer_type']
    }
  ]
});

// Instance methods
Tournament.prototype.isRegistrationOpen = function() {
  return this.status === TOURNAMENT_STATUS.REGISTRATION_OPEN && 
         new Date() < this.registration_deadline;
};

Tournament.prototype.isFull = function() {
  if (!this.max_participants) return false;
  return this.current_participants >= this.max_participants;
};

Tournament.prototype.canStart = function() {
  return this.current_participants >= this.min_participants;
};

Tournament.prototype.getDuration = function() {
  const start = new Date(this.start_date);
  const end = new Date(this.end_date);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

Tournament.prototype.updateParticipantCount = async function() {
  const { TournamentRegistration } = require('./index');
  const count = await TournamentRegistration.count({
    where: {
      tournament_id: this.id,
      status: 'confirmed'
    }
  });
  this.current_participants = count;
  await this.save();
};

Tournament.prototype.updateTeamCount = async function() {
  const { TournamentTeam } = require('./index');
  const count = await TournamentTeam.count({
    where: {
      tournament_id: this.id,
      status: 'confirmed'
    }
  });
  this.current_teams = count;
  await this.save();
};

// Class methods
Tournament.findUpcoming = function() {
  return this.findAll({
    where: {
      start_date: {
        [sequelize.Op.gt]: new Date()
      },
      status: {
        [sequelize.Op.in]: [TOURNAMENT_STATUS.PUBLISHED, TOURNAMENT_STATUS.REGISTRATION_OPEN]
      }
    },
    order: [['start_date', 'ASC']]
  });
};

Tournament.findByLocation = function(state, city = null) {
  const where = { state };
  if (city) {
    where.city = city;
  }
  return this.findAll({ where });
};

Tournament.findByOrganizer = function(organizerId, organizerType) {
  return this.findAll({
    where: {
      organizer_id: organizerId,
      organizer_type: organizerType
    },
    order: [['start_date', 'DESC']]
  });
};

Tournament.findByStatus = function(status) {
  return this.findAll({
    where: { status },
    order: [['start_date', 'ASC']]
  });
};

Tournament.findByType = function(tournamentType) {
  return this.findAll({
    where: { tournament_type: tournamentType },
    order: [['start_date', 'ASC']]
  });
};

module.exports = Tournament; 