/**
 * Club Model
 * 
 * This model represents clubs in the Pickleball Federation system.
 * Clubs can be recreational, competitive, training, or mixed types.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { CLUB_TYPES, MEMBERSHIP_STATUS } = require('../../config/constants');

const Club = sequelize.define('Club', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Club information
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Club name'
  },

  club_type: {
    type: DataTypes.ENUM(Object.values(CLUB_TYPES)),
    allowNull: false,
    defaultValue: CLUB_TYPES.RECREATIONAL,
    comment: 'Type of club: recreational, competitive, training, mixed'
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Club description'
  },

  // Contact information
  contact_person: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Primary contact person name'
  },

  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true
    },
    comment: 'Primary contact email'
  },

  contact_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Primary contact phone'
  },

  contact_whatsapp: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Primary contact WhatsApp'
  },

  // Location information
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'State where club operates'
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'City where club operates'
  },

  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Club address'
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

  // Club details
  founded_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Date when club was founded'
  },

  member_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of active members'
  },

  max_members: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Maximum number of members allowed'
  },

  // Facilities
  has_courts: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether club has its own courts'
  },

  court_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of courts available'
  },

  court_types: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Types of courts available (indoor, outdoor, etc.)'
  },

  // Services and features
  offers_training: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether club offers training programs'
  },

  offers_tournaments: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether club organizes tournaments'
  },

  offers_equipment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether club provides equipment'
  },

  // Membership and subscription
  membership_status: {
    type: DataTypes.ENUM(Object.values(MEMBERSHIP_STATUS)),
    defaultValue: MEMBERSHIP_STATUS.PENDING,
    allowNull: false,
    comment: 'Club membership status'
  },

  membership_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Membership expiration date'
  },

  subscription_plan: {
    type: DataTypes.ENUM('basic', 'premium'),
    defaultValue: 'basic',
    allowNull: false,
    comment: 'Subscription plan type'
  },

  // Financial information
  membership_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Monthly/annual membership fee'
  },

  court_rental_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Hourly court rental fee'
  },

  // Media and branding
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Club logo URL'
  },

  banner_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Club banner image URL'
  },

  photos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of club photo URLs'
  },

  // Social media and web presence
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    },
    comment: 'Club website URL'
  },

  social_media: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Social media links (Facebook, Instagram, etc.)'
  },

  // Schedule and availability
  operating_hours: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Operating hours for each day of the week'
  },

  availability: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Availability schedule and restrictions'
  },

  // Policies and rules
  club_rules: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Club rules and policies'
  },

  dress_code: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Dress code requirements'
  },

  // Statistics and metrics
  total_tournaments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total tournaments organized'
  },

  total_matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total matches played at club'
  },

  average_rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Average club rating'
  },

  review_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of reviews'
  },

  // Status and metadata
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Club active status'
  },

  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Club verification status'
  },

  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether club is featured on platform'
  },

  // Settings and preferences
  settings: {
    type: DataTypes.JSON,
    defaultValue: {},
    allowNull: false,
    comment: 'Club settings and preferences'
  },

  // Admin notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the club'
  }

}, {
  tableName: 'clubs',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      unique: true,
      fields: ['name', 'state', 'city']
    },
    {
      fields: ['club_type']
    },
    {
      fields: ['state']
    },
    {
      fields: ['city']
    },
    {
      fields: ['membership_status']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['is_featured']
    }
  ]
});

// Instance methods
Club.prototype.isMembershipActive = function() {
  if (this.membership_status !== MEMBERSHIP_STATUS.ACTIVE) {
    return false;
  }
  if (this.membership_expires_at && new Date() > this.membership_expires_at) {
    return false;
  }
  return true;
};

Club.prototype.canOrganizeTournaments = function() {
  return this.subscription_plan === 'premium' && this.isMembershipActive();
};

Club.prototype.canRentCourts = function() {
  return this.has_courts && this.subscription_plan === 'premium' && this.isMembershipActive();
};

Club.prototype.getFullAddress = function() {
  const parts = [this.address, this.city, this.state].filter(Boolean);
  return parts.join(', ');
};

Club.prototype.updateMemberCount = async function() {
  const { User } = require('./index');
  const count = await User.count({
    where: {
      user_type: 'player',
      club_id: this.id,
      membership_status: 'active'
    }
  });
  this.member_count = count;
  await this.save();
};

// Class methods
Club.findByLocation = function(state, city = null) {
  const where = { state, is_active: true };
  if (city) {
    where.city = city;
  }
  return this.findAll({ where });
};

Club.findActiveClubs = function() {
  return this.findAll({
    where: {
      membership_status: MEMBERSHIP_STATUS.ACTIVE,
      is_active: true
    }
  });
};

Club.findPremiumClubs = function() {
  return this.findAll({
    where: {
      subscription_plan: 'premium',
      membership_status: MEMBERSHIP_STATUS.ACTIVE,
      is_active: true
    }
  });
};

Club.findByType = function(clubType) {
  return this.findAll({
    where: {
      club_type: clubType,
      is_active: true
    }
  });
};

module.exports = Club; 