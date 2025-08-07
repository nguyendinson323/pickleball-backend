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
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // User type and role
  user_type: {
    type: DataTypes.ENUM(Object.values(USER_TYPES)),
    allowNull: false,
    comment: 'Type of user: player, coach, club, partner, state, federation'
  },

  role: {
    type: DataTypes.ENUM(Object.values(USER_ROLES)),
    defaultValue: USER_ROLES.USER,
    allowNull: false,
    comment: 'User role in the system'
  },

  // Basic information
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

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Hashed password'
  },

  // Personal information (for players and coaches)
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'First name (for players and coaches)'
  },

  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Last name (for players and coaches)'
  },

  full_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Full name (for organizations)'
  },

  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Date of birth (for players and coaches)'
  },

  age: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.date_of_birth) {
        const today = new Date();
        const birthDate = new Date(this.date_of_birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
      return null;
    }
  },

  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    allowNull: true,
    comment: 'Gender (for players and coaches)'
  },

  // Location information
  state: {
    type: DataTypes.ENUM(MEXICAN_STATES),
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

  // Contact information
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Phone number'
  },

  whatsapp: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'WhatsApp number'
  },

  // Player/Coach specific fields
  skill_level: {
    type: DataTypes.ENUM(Object.values(SKILL_LEVELS)),
    allowNull: true,
    comment: 'NRTP skill level (for players and coaches)'
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

  // Organization specific fields
  rfc: {
    type: DataTypes.STRING(13),
    allowNull: true,
    comment: 'RFC (Mexican tax ID for organizations)'
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

  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    },
    comment: 'Website URL'
  },

  social_media: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Social media links (Facebook, Instagram, etc.)'
  },

  // Profile and media
  profile_photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Profile photo URL'
  },

  logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Organization logo URL'
  },

  // Membership and subscription
  membership_status: {
    type: DataTypes.ENUM(Object.values(MEMBERSHIP_STATUS)),
    defaultValue: MEMBERSHIP_STATUS.PENDING,
    allowNull: false,
    comment: 'Current membership status'
  },

  membership_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Membership expiration date'
  },

  subscription_plan: {
    type: DataTypes.ENUM('basic', 'premium', 'federation'),
    defaultValue: 'basic',
    allowNull: false,
    comment: 'Subscription plan type'
  },

  // Verification and security
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

  email_verification_expires: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Email verification token expiration'
  },

  password_reset_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Password reset token'
  },

  password_reset_expires: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Password reset token expiration'
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

  // Preferences and settings
  preferences: {
    type: DataTypes.JSON,
    defaultValue: {},
    allowNull: false,
    comment: 'User preferences and settings'
  },

  // Status and metadata
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

  verification_documents: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Verification documents (INE, passport, etc.)'
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the user'
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
      fields: ['state']
    },
    {
      fields: ['membership_status']
    },
    {
      fields: ['skill_level']
    }
  ],
  hooks: {
    // Hash password before saving
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    },

    // Generate full name for organizations
    beforeCreate: (user) => {
      if (user.user_type === 'club' || user.user_type === 'partner' || user.user_type === 'state') {
        user.full_name = user.business_name;
      } else if (user.first_name && user.last_name) {
        user.full_name = `${user.first_name} ${user.last_name}`;
      }
    },

    beforeUpdate: (user) => {
      if (user.changed('first_name') || user.changed('last_name') || user.changed('business_name')) {
        if (user.user_type === 'club' || user.user_type === 'partner' || user.user_type === 'state') {
          user.full_name = user.business_name;
        } else if (user.first_name && user.last_name) {
          user.full_name = `${user.first_name} ${user.last_name}`;
        }
      }
    }
  }
});

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.isMembershipActive = function() {
  if (this.membership_status !== MEMBERSHIP_STATUS.ACTIVE) {
    return false;
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
  if (this.first_name && this.last_name) {
    return `${this.first_name} ${this.last_name}`;
  }
  return this.username;
};

User.prototype.canAccessPremiumFeatures = function() {
  return this.subscription_plan === 'premium' || this.subscription_plan === 'federation';
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
      membership_status: MEMBERSHIP_STATUS.ACTIVE,
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