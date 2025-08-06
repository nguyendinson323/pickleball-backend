/**
 * Court Model
 * 
 * This model represents courts in the Pickleball Federation system.
 * It handles court information, availability, and reservations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { COURT_TYPES, COURT_SURFACES } = require('../../config/constants');

const Court = sequelize.define('Court', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Court information
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Court name or number'
  },

  court_type: {
    type: DataTypes.ENUM(Object.values(COURT_TYPES)),
    allowNull: false,
    defaultValue: COURT_TYPES.OUTDOOR,
    comment: 'Type of court: indoor, outdoor, covered'
  },

  surface: {
    type: DataTypes.ENUM(Object.values(COURT_SURFACES)),
    allowNull: false,
    defaultValue: COURT_SURFACES.CONCRETE,
    comment: 'Court surface type'
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Court description'
  },

  // Location and dimensions
  dimensions: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Court dimensions (length, width, height)'
  },

  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
    allowNull: false,
    comment: 'Maximum number of players allowed'
  },

  // Club association
  club_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the club that owns this court'
  },

  // Availability and scheduling
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether court is available for booking'
  },

  is_maintenance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether court is under maintenance'
  },

  maintenance_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Maintenance notes and details'
  },

  maintenance_start: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Maintenance start date'
  },

  maintenance_end: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Maintenance end date'
  },

  // Operating hours
  operating_hours: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Operating hours for each day of the week'
  },

  // Pricing
  hourly_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Hourly rental rate'
  },

  daily_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Daily rental rate'
  },

  member_discount: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Discount percentage for club members'
  },

  // Equipment and amenities
  equipment_included: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Equipment included with court rental'
  },

  amenities: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Available amenities (lighting, seating, etc.)'
  },

  // Court features
  has_lighting: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether court has lighting'
  },

  has_net: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether court has nets'
  },

  has_equipment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether court provides equipment'
  },

  // Media
  photos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of court photo URLs'
  },

  // Statistics
  total_bookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of bookings'
  },

  total_hours_booked: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Total hours booked'
  },

  average_rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Average rating from users'
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
    comment: 'Court active status'
  },

  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether court is featured'
  },

  // Settings
  settings: {
    type: DataTypes.JSON,
    defaultValue: {},
    allowNull: false,
    comment: 'Court settings and preferences'
  },

  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional notes about the court'
  }

}, {
  tableName: 'courts',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['club_id']
    },
    {
      fields: ['court_type']
    },
    {
      fields: ['surface']
    },
    {
      fields: ['is_available']
    },
    {
      fields: ['is_active']
    }
  ]
});

// Instance methods
Court.prototype.isAvailableForBooking = function(startTime, endTime) {
  if (!this.is_available || this.is_maintenance) {
    return false;
  }

  // Check if court is under maintenance during the requested time
  if (this.maintenance_start && this.maintenance_end) {
    const maintenanceStart = new Date(this.maintenance_start);
    const maintenanceEnd = new Date(this.maintenance_end);
    const bookingStart = new Date(startTime);
    const bookingEnd = new Date(endTime);

    if (bookingStart < maintenanceEnd && bookingEnd > maintenanceStart) {
      return false;
    }
  }

  return true;
};

Court.prototype.getMemberPrice = function(originalPrice) {
  if (!originalPrice) return this.hourly_rate;
  const discount = this.member_discount / 100;
  return originalPrice * (1 - discount);
};

Court.prototype.updateBookingStats = async function() {
  const { CourtReservation } = require('./index');
  const stats = await CourtReservation.findOne({
    where: { court_id: this.id },
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'total_bookings'],
      [sequelize.fn('SUM', sequelize.col('duration_hours')), 'total_hours']
    ],
    raw: true
  });

  if (stats) {
    this.total_bookings = parseInt(stats.total_bookings) || 0;
    this.total_hours_booked = parseFloat(stats.total_hours) || 0.00;
    await this.save();
  }
};

// Class methods
Court.findAvailable = function(clubId = null) {
  const where = {
    is_available: true,
    is_maintenance: false,
    is_active: true
  };

  if (clubId) {
    where.club_id = clubId;
  }

  return this.findAll({ where });
};

Court.findByType = function(courtType) {
  return this.findAll({
    where: {
      court_type: courtType,
      is_active: true
    }
  });
};

Court.findBySurface = function(surface) {
  return this.findAll({
    where: {
      surface: surface,
      is_active: true
    }
  });
};

module.exports = Court; 