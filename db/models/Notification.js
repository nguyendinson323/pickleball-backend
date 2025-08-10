/**
 * Notification Model
 * 
 * This model represents notifications in the Pickleball Federation system.
 * It handles all types of notifications sent to users.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { NOTIFICATION_TYPES } = require('../../config/constants');

const Notification = sequelize.define('Notification', {
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
    comment: 'ID of the user receiving the notification'
  },

  // Notification details
  type: {
    type: DataTypes.ENUM(Object.values(NOTIFICATION_TYPES)),
    allowNull: false,
    comment: 'Type of notification'
  },

  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Notification title'
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Notification message'
  },

  // Notification status
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether notification has been read'
  },

  read_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When notification was read'
  },

  // Notification priority
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high', 'urgent'),
    defaultValue: 'normal',
    allowNull: false,
    comment: 'Notification priority level'
  },

  // Related data
  related_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of related entity (tournament, payment, etc.)'
  },

  related_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Type of related entity'
  },

  // Action data
  action_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL for notification action'
  },

  action_text: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Text for action button'
  },

  // Delivery status
  email_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether email was sent'
  },

  email_sent_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When email was sent'
  },

  sms_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether SMS was sent'
  },

  sms_sent_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When SMS was sent'
  },

  // Metadata
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional notification metadata'
  },

  // Expiration
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When notification expires'
  },

  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the notification'
  }

}, {
  tableName: 'notifications',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['type']
    },
    {
      fields: ['is_read']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['created_at']
    }
  ]
});

// Instance methods
Notification.prototype.markAsRead = async function() {
  this.is_read = true;
  this.read_at = new Date();
  await this.save();
};

Notification.prototype.isExpired = function() {
  if (!this.expires_at) return false;
  return new Date() > this.expires_at;
};

Notification.prototype.isUrgent = function() {
  return this.priority === 'urgent';
};

Notification.prototype.canSendEmail = function() {
  return !this.email_sent;
};

Notification.prototype.canSendSMS = function() {
  return !this.sms_sent;
};

// Class methods
Notification.findByUser = function(userId, options = {}) {
  const where = { user_id: userId };
  
  if (options.unreadOnly) {
    where.is_read = false;
  }
  
  if (options.type) {
    where.type = options.type;
  }

  return this.findAll({
    where,
    order: [['created_at', 'DESC']],
    limit: options.limit || 50
  });
};

Notification.findUnread = function(userId) {
  return this.findAll({
    where: {
      user_id: userId,
      is_read: false
    },
    order: [['created_at', 'DESC']]
  });
};

Notification.findByType = function(type) {
  return this.findAll({
    where: { type },
    order: [['created_at', 'DESC']]
  });
};

Notification.findUrgent = function() {
  return this.findAll({
    where: { priority: 'urgent' },
    order: [['created_at', 'DESC']]
  });
};

module.exports = Notification; 