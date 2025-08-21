/**
 * Coach Finder Model
 * 
 * This model handles location-based coach search functionality.
 * It allows players to find qualified coaches near them for training.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { Op } = require('sequelize');

const CoachFinder = sequelize.define('CoachFinder', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Player searching for a coach
  searcher_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the player searching for a coach'
  },

  // Search preferences
  preferred_skill_focus: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of skills to focus on (e.g., ["serve", "volley", "strategy"])'
  },

  experience_level_required: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'professional', 'any'),
    defaultValue: 'any',
    allowNull: false,
    comment: 'Required coach experience level'
  },

  lesson_type: {
    type: DataTypes.ENUM('individual', 'group', 'clinic', 'any'),
    defaultValue: 'any',
    allowNull: false,
    comment: 'Preferred lesson type'
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

  travel_willing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether player is willing to travel for lessons'
  },

  // Scheduling preferences
  preferred_days: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of preferred days (0-6, Sunday-Saturday)'
  },

  preferred_time_start: {
    type: DataTypes.TIME,
    allowNull: true,
    comment: 'Preferred start time for lessons'
  },

  preferred_time_end: {
    type: DataTypes.TIME,
    allowNull: true,
    comment: 'Preferred end time for lessons'
  },

  // Budget preferences
  budget_min: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Minimum budget per lesson/hour'
  },

  budget_max: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Maximum budget per lesson/hour'
  },

  // Language preferences
  preferred_language: {
    type: DataTypes.STRING(50),
    defaultValue: 'English',
    allowNull: false,
    comment: 'Preferred coaching language'
  },

  // Communication preferences
  contact_method: {
    type: DataTypes.ENUM('email', 'phone', 'whatsapp', 'any'),
    defaultValue: 'any',
    allowNull: false,
    comment: 'Preferred contact method'
  },

  urgent_request: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether this is an urgent coaching request'
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

  // Results tracking
  total_coaches_found: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of coaches found'
  },

  coaches_contacted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of coaches contacted'
  },

  lessons_booked: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of lessons successfully booked'
  },

  // Additional information
  skill_level: {
    type: DataTypes.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
    allowNull: true,
    comment: 'Player current skill level'
  },

  goals: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Player training goals and objectives'
  },

  special_requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Any special requirements or accommodations needed'
  },

  // Search criteria storage
  search_criteria: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Stored search criteria for quick re-search'
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional notes about coaching preferences'
  }

}, {
  tableName: 'coach_finders',
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
      fields: ['experience_level_required']
    },
    {
      fields: ['lesson_type']
    },
    {
      fields: ['urgent_request']
    }
  ]
});

// Instance methods
CoachFinder.prototype.performSearch = async function() {
  const User = require('./User');
  
  try {
    // Build search criteria
    const whereClause = {
      user_type: 'coach',
      is_findable: true // Privacy setting
    };

    // Add location-based filtering if location data is available
    if (this.preferred_locations && this.preferred_locations.length > 0) {
      // This would integrate with Google Maps API for location filtering
      // For now, we'll filter by state/city if coordinates are provided
    }

    // Find matching coaches
    const coaches = await User.findAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'first_name', 'last_name', 'full_name',
        'state', 'city', 'skill_level', 'coaching_experience',
        'specializations', 'hourly_rate', 'available_for_lessons',
        'coaching_languages', 'profile_photo'
      ],
      limit: 50
    });

    // Calculate match scores and filter
    const scoredCoaches = coaches
      .map(coach => ({
        coach,
        score: this.getCoachScore(coach),
        distance: this.calculateDistance(coach) // Would use Google Maps API
      }))
      .filter(item => item.score >= 50) // Minimum compatibility threshold
      .sort((a, b) => b.score - a.score);

    // Update search statistics
    this.total_coaches_found = scoredCoaches.length;
    this.last_search_date = new Date();
    await this.save();

    return scoredCoaches;
  } catch (error) {
    console.error('Error performing coach search:', error);
    return [];
  }
};

CoachFinder.prototype.getCoachScore = function(coach) {
  let score = 0;

  // Experience level compatibility
  if (this.experience_level_required !== 'any') {
    const coachExp = coach.coaching_experience || 0;
    const requiredExp = {
      'beginner': 0,
      'intermediate': 2,
      'advanced': 5,
      'professional': 10
    }[this.experience_level_required];
    
    if (coachExp >= requiredExp) {
      score += 30;
    }
  } else {
    score += 20; // Neutral score for 'any'
  }

  // Skill focus compatibility
  if (this.preferred_skill_focus && coach.specializations) {
    const coachSpecializations = coach.specializations || [];
    const matchingSkills = this.preferred_skill_focus.filter(skill => 
      coachSpecializations.includes(skill)
    );
    score += matchingSkills.length * 10;
  }

  // Budget compatibility
  if (this.budget_max && coach.hourly_rate) {
    if (coach.hourly_rate <= this.budget_max) {
      score += 25;
    } else if (coach.hourly_rate <= this.budget_max * 1.2) {
      score += 15; // Slightly over budget but acceptable
    }
  }

  // Language compatibility
  if (coach.coaching_languages) {
    const languages = coach.coaching_languages || ['English'];
    if (languages.includes(this.preferred_language)) {
      score += 15;
    }
  }

  // Availability (simplified - would need more complex logic)
  if (coach.available_for_lessons) {
    score += 20;
  }

  return score;
};

CoachFinder.prototype.calculateDistance = function(coach) {
  // This would use Google Maps API to calculate actual distance
  // For now, return a placeholder based on state/city matching
  if (this.preferred_locations && this.preferred_locations.length > 0) {
    const searchLocation = this.preferred_locations[0];
    if (searchLocation.state === coach.state) {
      if (searchLocation.city === coach.city) {
        return 5; // Same city
      }
      return 25; // Same state, different city
    }
    return 100; // Different state
  }
  return 50; // Default distance
};

// Class methods
CoachFinder.findAvailableCoaches = async function(searchCriteria = {}) {
  const User = require('./User');
  const {
    location,
    radius = 50,
    experienceLevel,
    skillFocus,
    budget,
    language = 'English',
    lessonType,
    limit = 20
  } = searchCriteria;

  const whereClause = {
    user_type: 'coach',
    is_findable: true,
    available_for_lessons: true
  };

  // Add budget filter
  if (budget) {
    whereClause.hourly_rate = { [Op.lte]: budget };
  }

  // Add language filter
  if (language !== 'any') {
    whereClause[Op.or] = [
      { coaching_languages: { [Op.contains]: [language] } },
      { coaching_languages: null } // Default to English
    ];
  }

  try {
    const coaches = await User.findAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'first_name', 'last_name', 'full_name',
        'state', 'city', 'skill_level', 'coaching_experience',
        'specializations', 'hourly_rate', 'coaching_languages',
        'profile_photo', 'rating', 'reviews_count'
      ],
      limit: parseInt(limit),
      order: [['coaching_experience', 'DESC'], ['rating', 'DESC']]
    });

    return coaches;
  } catch (error) {
    console.error('Error finding available coaches:', error);
    return [];
  }
};

CoachFinder.getActiveSearches = async function() {
  return await this.findAll({
    where: {
      is_active: true
    },
    include: [
      {
        model: require('./User'),
        as: 'searcher',
        attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
      }
    ],
    order: [['last_search_date', 'DESC']]
  });
};

CoachFinder.getSearchStats = async function(searcherId) {
  const searches = await this.findAll({
    where: { searcher_id: searcherId },
    order: [['createdAt', 'DESC']]
  });

  const totalSearches = searches.length;
  const activeSearches = searches.filter(s => s.is_active).length;
  const totalCoachesFound = searches.reduce((sum, s) => sum + s.total_coaches_found, 0);
  const totalLessonsBooked = searches.reduce((sum, s) => sum + s.lessons_booked, 0);

  return {
    totalSearches,
    activeSearches,
    totalCoachesFound,
    totalLessonsBooked,
    successRate: totalSearches > 0 ? (totalLessonsBooked / totalSearches) * 100 : 0,
    recentSearches: searches.slice(0, 5)
  };
};

module.exports = CoachFinder;