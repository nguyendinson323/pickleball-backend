/**
 * Payment Model
 * 
 * This model represents payments in the Pickleball Federation system.
 * It handles all types of payments including membership fees, tournament fees, and court rentals.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { PAYMENT_STATUS } = require('../../config/constants');

const Payment = sequelize.define('Payment', {
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
    comment: 'ID of the user making the payment'
  },

  club_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the club (for club-related payments)'
  },

  tournament_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the tournament (for tournament fees)'
  },

  // Payment details
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Payment amount'
  },

  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'MXN',
    allowNull: false,
    comment: 'Payment currency (MXN, USD, etc.)'
  },

  payment_type: {
    type: DataTypes.ENUM(
      'membership_fee',
      'tournament_registration',
      'court_rental',
      'equipment_purchase',
      'donation',
      'subscription_upgrade',
      'other'
    ),
    allowNull: false,
    comment: 'Type of payment'
  },

  payment_method: {
    type: DataTypes.ENUM(
      'stripe',
      'paypal',
      'bank_transfer',
      'cash',
      'check',
      'other'
    ),
    allowNull: false,
    comment: 'Payment method used'
  },

  status: {
    type: DataTypes.ENUM(Object.values(PAYMENT_STATUS)),
    defaultValue: PAYMENT_STATUS.PENDING,
    allowNull: false,
    comment: 'Payment status'
  },

  // Stripe specific fields
  stripe_payment_intent_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe payment intent ID'
  },

  stripe_charge_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe charge ID'
  },

  stripe_customer_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe customer ID'
  },

  // Payment processing
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When payment was processed'
  },

  failed_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When payment failed'
  },

  failure_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Reason for payment failure'
  },

  // Refund information
  refunded_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When payment was refunded'
  },

  refund_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Refund amount'
  },

  refund_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Reason for refund'
  },

  // Payment metadata
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Payment description'
  },

  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional payment metadata'
  },

  // Billing information
  billing_address: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Billing address information'
  },

  receipt_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL to payment receipt'
  },

  invoice_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Invoice number'
  },

  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the payment'
  }

}, {
  tableName: 'payments',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['club_id']
    },
    {
      fields: ['tournament_id']
    },
    {
      fields: ['payment_type']
    },
    {
      fields: ['status']
    },
    {
      fields: ['stripe_payment_intent_id']
    },
    {
      fields: ['created_at']
    }
  ]
});

// Instance methods
Payment.prototype.isSuccessful = function() {
  return this.status === PAYMENT_STATUS.COMPLETED;
};

Payment.prototype.isPending = function() {
  return this.status === PAYMENT_STATUS.PENDING;
};

Payment.prototype.isFailed = function() {
  return this.status === PAYMENT_STATUS.FAILED;
};

Payment.prototype.isRefunded = function() {
  return this.status === PAYMENT_STATUS.REFUNDED;
};

Payment.prototype.canRefund = function() {
  return this.status === PAYMENT_STATUS.COMPLETED && !this.refunded_at;
};

Payment.prototype.getRefundAmount = function() {
  return this.refund_amount || this.amount;
};

// Class methods
Payment.findByUser = function(userId) {
  return this.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']]
  });
};

Payment.findByClub = function(clubId) {
  return this.findAll({
    where: { club_id: clubId },
    order: [['created_at', 'DESC']]
  });
};

Payment.findByTournament = function(tournamentId) {
  return this.findAll({
    where: { tournament_id: tournamentId },
    order: [['created_at', 'DESC']]
  });
};

Payment.findSuccessful = function() {
  return this.findAll({
    where: { status: PAYMENT_STATUS.COMPLETED }
  });
};

Payment.findPending = function() {
  return this.findAll({
    where: { status: PAYMENT_STATUS.PENDING }
  });
};

module.exports = Payment; 