/**
 * Court Reservation Model
 * 
 * This model handles court reservations and booking functionality.
 * It manages court availability, booking times, and reservation status.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourtReservation = sequelize.define('CourtReservation', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Reservation details
  court_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the court being reserved'
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the user making the reservation'
  },

  club_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of the club where the court is located'
  },

  // Booking times
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Start time of the reservation'
  },

  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'End time of the reservation'
  },

  // Reservation details
  reservation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Date of the reservation'
  },

  duration_hours: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    comment: 'Duration of reservation in hours'
  },

  // Purpose and details
  purpose: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Purpose of the reservation (practice, match, lesson, etc.)'
  },

  match_type: {
    type: DataTypes.ENUM('singles', 'doubles', 'mixed_doubles', 'practice', 'lesson', 'other'),
    allowNull: true,
    comment: 'Type of activity planned'
  },

  participants: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of participant user IDs'
  },

  guest_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of guests (non-members)'
  },

  // Pricing and payment
  hourly_rate: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    comment: 'Hourly rate for the reservation'
  },

  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Total amount for the reservation'
  },

  member_discount: {
    type: DataTypes.DECIMAL(8, 2),
    defaultValue: 0,
    allowNull: false,
    comment: 'Discount amount for members'
  },

  final_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Final amount after discounts'
  },

  // Payment status
  payment_status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
    comment: 'Payment status for the reservation'
  },

  payment_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the associated payment'
  },

  // Reservation status
  status: {
    type: DataTypes.ENUM('confirmed', 'pending', 'cancelled', 'completed', 'no_show'),
    defaultValue: 'pending',
    allowNull: false,
    comment: 'Status of the reservation'
  },

  // Cancellation and changes
  cancelled_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the reservation was cancelled'
  },

  cancelled_by: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'User ID who cancelled the reservation'
  },

  cancellation_reason: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Reason for cancellation'
  },

  refund_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
    comment: 'Amount refunded if cancelled'
  },

  // Special requests and notes
  special_requests: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Special requests for the reservation'
  },

  equipment_needed: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Equipment needed for the reservation'
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional notes about the reservation'
  },

  // Check-in/out tracking
  checked_in_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the user checked in'
  },

  checked_out_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the user checked out'
  },

  actual_start_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Actual start time (may differ from booked time)'
  },

  actual_end_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Actual end time (may differ from booked time)'
  },

  // Rating and feedback
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    },
    comment: 'User rating for the reservation (1-5)'
  },

  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'User feedback for the reservation'
  },

  // Metadata
  booking_source: {
    type: DataTypes.ENUM('web', 'mobile', 'phone', 'in_person'),
    defaultValue: 'web',
    allowNull: false,
    comment: 'Source of the booking'
  },

  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true,
    comment: 'IP address of the booking user'
  },

  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'User agent of the booking user'
  }

}, {
  tableName: 'court_reservations',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['court_id', 'reservation_date', 'start_time']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['club_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['payment_status']
    },
    {
      fields: ['start_time', 'end_time']
    }
  ]
});

// Instance methods
CourtReservation.prototype.isOverlapping = async function() {
  const overlapping = await CourtReservation.findOne({
    where: {
      court_id: this.court_id,
      status: { [sequelize.Op.in]: ['confirmed', 'pending'] },
      [sequelize.Op.or]: [
        {
          start_time: { [sequelize.Op.lt]: this.end_time },
          end_time: { [sequelize.Op.gt]: this.start_time }
        }
      ]
    }
  });
  
  return overlapping !== null;
};

CourtReservation.prototype.calculateDuration = function() {
  const start = new Date(this.start_time);
  const end = new Date(this.end_time);
  const durationMs = end - start;
  return durationMs / (1000 * 60 * 60); // Convert to hours
};

CourtReservation.prototype.canBeCancelled = function() {
  const now = new Date();
  const reservationStart = new Date(this.start_time);
  const hoursUntilStart = (reservationStart - now) / (1000 * 60 * 60);
  
  // Can cancel up to 24 hours before start time
  return hoursUntilStart >= 24 && this.status === 'confirmed';
};

CourtReservation.prototype.calculateRefund = function() {
  if (!this.canBeCancelled()) {
    return 0;
  }
  
  const now = new Date();
  const reservationStart = new Date(this.start_time);
  const hoursUntilStart = (reservationStart - now) / (1000 * 60 * 60);
  
  // Full refund if cancelled more than 48 hours before
  if (hoursUntilStart >= 48) {
    return this.final_amount;
  }
  
  // 50% refund if cancelled between 24-48 hours before
  if (hoursUntilStart >= 24) {
    return this.final_amount * 0.5;
  }
  
  return 0;
};

// Class methods
CourtReservation.getAvailableSlots = async function(courtId, date, duration = 1) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  // Get existing reservations for the day
  const existingReservations = await CourtReservation.findAll({
    where: {
      court_id: courtId,
      reservation_date: date,
      status: { [sequelize.Op.in]: ['confirmed', 'pending'] }
    },
    order: [['start_time', 'ASC']]
  });
  
  // Generate available time slots
  const slots = [];
  const courtOpenTime = 6; // 6 AM
  const courtCloseTime = 22; // 10 PM
  
  for (let hour = courtOpenTime; hour <= courtCloseTime - duration; hour++) {
    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);
    
    const slotEnd = new Date(date);
    slotEnd.setHours(hour + duration, 0, 0, 0);
    
    // Check if slot conflicts with existing reservations
    const hasConflict = existingReservations.some(reservation => {
      const reservationStart = new Date(reservation.start_time);
      const reservationEnd = new Date(reservation.end_time);
      
      return (slotStart < reservationEnd && slotEnd > reservationStart);
    });
    
    if (!hasConflict) {
      slots.push({
        start_time: slotStart,
        end_time: slotEnd,
        available: true
      });
    }
  }
  
  return slots;
};

CourtReservation.getUserReservations = async function(userId, options = {}) {
  const {
    status,
    startDate,
    endDate,
    page = 1,
    limit = 10
  } = options;
  
  const whereClause = { user_id: userId };
  
  if (status) {
    whereClause.status = status;
  }
  
  if (startDate || endDate) {
    whereClause.reservation_date = {};
    
    if (startDate) {
      whereClause.reservation_date[sequelize.Op.gte] = startDate;
    }
    
    if (endDate) {
      whereClause.reservation_date[sequelize.Op.lte] = endDate;
    }
  }
  
  const offset = (page - 1) * limit;
  
  return await CourtReservation.findAndCountAll({
    where: whereClause,
    order: [['start_time', 'ASC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
};

CourtReservation.getCourtReservations = async function(courtId, date) {
  return await CourtReservation.findAll({
    where: {
      court_id: courtId,
      reservation_date: date,
      status: { [sequelize.Op.in]: ['confirmed', 'pending'] }
    },
    order: [['start_time', 'ASC']]
  });
};

module.exports = CourtReservation; 