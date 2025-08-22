/**
 * User Model
 * 
 * This model represents all users in the Pickleball Federation system.
 * It handles players, coaches, clubs, partners, states, and federation users.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../config/database');
const { USER_TYPES, USER_ROLES, SKILL_LEVELS, MEMBERSHIP_STATUS, MEXICAN_STATES } = require('../../config/constants');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50],
      is: /^[a-zA-Z0-9_]+$/
    },
    comment: 'Unique username for login'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    comment: 'Primary email address'
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Hashed password'
  },
  full_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Full name'
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Date of birth'
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    allowNull: true,
    comment: 'Gender'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Phone number'
  },
  profile_photo: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Profile photo URL'
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'User biography'
  },
  user_type: {
    type: DataTypes.ENUM('player', 'coach', 'club', 'partner', 'state', 'admin'),
    allowNull: false,
    defaultValue: 'player',
    comment: 'Type of user: player, coach, club, partner, state, admin'
  },
  skill_level: {
    type: DataTypes.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
    allowNull: true,
    comment: 'NRTP skill level (for players and coaches)'
  },
  membership_status: {
    type: DataTypes.ENUM('free', 'basic', 'premium', 'elite'),
    defaultValue: 'free',
    allowNull: false,
    comment: 'Current membership status'
  },
  membership_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Membership expiration date'
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Email verification status'
  },
  email_verification_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Email verification token'
  },
  email_verification_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Email verification token expiration'
  },
  password_reset_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Password reset token'
  },
  password_reset_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Password reset token expiration'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Account active status'
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Account verification status'
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last login timestamp'
  },
  login_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of failed login attempts'
  },
  locked_until: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Account lockout until timestamp'
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'State of residence or operation'
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'City of residence or operation'
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Full address'
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
    comment: 'Latitude for location-based features'
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
    comment: 'Longitude for location-based features'
  },
  timezone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'User timezone'
  },
  business_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Business name (for clubs, partners, states)'
  },
  contact_person: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Contact person name (for organizations)'
  },
  job_title: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Job title of contact person'
  },
  curp: {
    type: DataTypes.STRING(18),
    allowNull: true,
    unique: true,
    validate: {
      len: [18, 18]
    },
    comment: 'CURP (Mexican population registry code)'
  },
  rfc: {
    type: DataTypes.STRING(13),
    allowNull: true,
    comment: 'RFC (Mexican tax ID for organizations)'
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    },
    comment: 'Website URL'
  },
  verification_documents: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Verification documents (INE, passport, etc.)'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the user'
  },
  preferences: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'User preferences and settings'
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional metadata for the user'
  },
  club_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'Reference to club if user belongs to one'
  },
  can_be_found: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether player can be found in player search (privacy setting)'
  },

  // Coach-specific fields
  is_findable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether coach can be found in coach search (privacy setting)'
  },

  coaching_experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Years of coaching experience'
  },

  specializations: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of coaching specializations (serve, volley, strategy, etc.)'
  },

  hourly_rate: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Hourly coaching rate'
  },

  available_for_lessons: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether coach is currently accepting new students'
  },

  coaching_languages: {
    type: DataTypes.JSON,
    defaultValue: ['English'],
    allowNull: false,
    comment: 'Languages coach can teach in'
  },

  coaching_locations: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Preferred coaching locations or travel radius'
  },

  lesson_types_offered: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Types of lessons offered (individual, group, clinic, etc.)'
  },

  coaching_schedule: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Available days and times for coaching'
  },

  coaching_bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Coach biography and teaching philosophy'
  },

  certifications: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of coaching certifications and credentials'
  },

  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0.0,
      max: 5.0
    },
    comment: 'Average rating from students (0.0 to 5.0)'
  },

  reviews_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of reviews received'
  },

  total_students: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of students coached'
  },

  active_students: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Current number of active students'
  },

  // Microsite Management Fields
  microsite_status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending', 'maintenance', 'suspended'),
    defaultValue: 'active',
    allowNull: false,
    comment: 'Microsite status for admin supervision'
  },

  microsite_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Custom microsite URL if different from default'
  },

  microsite_settings: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Microsite configuration and settings'
  },

  content_moderation_flags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Content moderation flags and issues'
  },

  last_content_update: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last time microsite content was updated'
  },

  organization_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Organization name for display purposes'
  }

}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['username']
    },
    {
      fields: ['user_type']
    },
    {
      fields: ['skill_level']
    },
    {
      fields: ['membership_status']
    },
    {
      fields: ['state']
    },
    {
      fields: ['city']
    },
    {
      fields: ['latitude', 'longitude']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['can_be_found']
    }
  ],
  hooks: {
    // Generate full name for organizations
    beforeCreate: (user) => {
      if (user.user_type === 'club' || user.user_type === 'partner') {
        user.full_name = user.business_name;
      }
    },

    beforeUpdate: (user) => {
      if (user.changed('business_name')) {
        if (user.user_type === 'club' || user.user_type === 'partner') {
          user.full_name = user.business_name;
        }
      }
    }
  }
});

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash);
};

User.prototype.isMembershipActive = function() {
  if (this.membership_status === 'free') {
    return true;
  }
  if (this.membership_expires_at && new Date() > this.membership_expires_at) {
    return false;
  }
  return true;
};

User.prototype.getDisplayName = function() {
  if (this.full_name) {
    return this.full_name;
  }
  return this.username;
};

User.prototype.canAccessPremiumFeatures = function() {
  return this.membership_status === 'premium' || this.membership_status === 'elite';
};

// Class methods
User.findByEmail = function(email) {
  return this.findOne({ where: { email: email.toLowerCase() } });
};

User.findByUsername = function(username) {
  return this.findOne({ where: { username: username.toLowerCase() } });
};

User.findActiveMembers = function() {
  return this.findAll({
    where: {
      is_active: true
    }
  });
};

User.findByState = function(state) {
  return this.findAll({
    where: {
      state: state,
      is_active: true
    }
  });
};

module.exports = User; 